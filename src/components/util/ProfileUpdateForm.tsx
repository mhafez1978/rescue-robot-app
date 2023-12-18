"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import clsx from "clsx";

//import { redirect } from "next/navigation";
//import sequelize from "@/database/sequelize";
//import User from "@/database/models/User";

const ProfileUpdateForm = ({ memberObj }: any) => {
  const { data: session } = useSession();
  //console.log({ data: session });
  const [newLastName, setNewLastName] = useState("");
  const [newEmailAddress, setNewEmailAddress] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [newProfileImage, setNewProfileImage] = useState("");
  const [newFullName, setNewFullName] = useState("");
  const [lockedForm, setLockedform] = useState(true);
  const [validEmailMessage, setValidEmailMessage] = useState(true);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState(false);
  const [userUpdated, setUserUpdated] = useState(false);
  const [noNewMsg, setNoNewMsg] = useState(false);

  useEffect(() => {
    if (userUpdated === true) {
      setTimeout(() => {
        setUserUpdated(!userUpdated);
      }, 2000);
    }
  }, [userUpdated]);

  useEffect(() => {
    if (noNewMsg === true) {
      setTimeout(() => {
        setNoNewMsg(!noNewMsg);
      }, 2000);
    }
  }, [noNewMsg]);

  const handleFormUnlock = (e) => {
    e.preventDefault();
    setLockedform(!lockedForm);
    console.log("form unlocked and you can edit");
  };

  const handleNewDataChange = (e) => {
    e.preventDefault();
    if (e.currentTarget.name === "lastname") {
      setNewLastName(e.currentTarget.value);
      console.log(newLastName);
      setNewFullName(session?.user?.firstname + " " + newLastName);
      console.log(newFullName);
    } else if (e.currentTarget.name === "email") {
      setNewEmailAddress(e.currentTarget.value);
      console.log(newEmailAddress);
    } else if (e.currentTarget.name === "phone") {
      setNewPhoneNumber(e.target.value);
      console.log(newPhoneNumber);
    } else if (e.currentTarget.name === "profile_image") {
      setNewProfileImage(e.target.value);
      console.log(newProfileImage);
    }
  };

  const isValidPhoneNumber = (newPhoneNumber: string) => {
    // This is a basic pattern and might need to be adjusted based on your specific requirements
    const pattern = /^\+?\d{1,3}[-\s]?\d{3}[-\s]?\d{3}[-\s]?\d{4}$/;
    const results = pattern.test(newPhoneNumber);
    console.log("Results", results);
    return results;
  };

  function isValidateEmail(newEmailAddress: string) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(newEmailAddress);
  }

  const handleFormUpdate = (e) => {
    e.preventDefault();

    let userData = {
      id: session?.user?.id as number,
      lastname: "" as string,
      email: "" as string,
      phone: "" as string,
      image: "" as string,
    };

    if (newLastName.length > 3 && newLastName !== session?.user.lastname) {
      userData.lastname = newLastName as string;
      //console.log(userData);
    }

    if (newLastName.length > 3 && newLastName === session?.user.lastname) {
      userData.lastname = newLastName as string;
    }

    if (newLastName.length < 3 && newLastName.length !== 0) {
      console.log("please enter a valid name ...");
      return;
    }

    // if (newPhoneNumber.length > 0) {
    //   if (!isValidPhoneNumber(newPhoneNumber)) {
    //     console.log("not valid number ...");
    //     setPhoneErrorMessage(true);
    //     return;
    //   }
    //   userData.phone = newPhoneNumber;
    // }

    //  if (newLastName.length === 0) {
    //    userData.lastname = session?.user?.lastname as string;
    //  }

    // if (newPhoneNumber.length === 0) {
    //   userData.phone = session?.user?.phone as string;
    // }

    if (!isValidateEmail) {
      console.log("this is not valid email ...");
      setValidEmailMessage(false);
      return;
    }

    if (newEmailAddress.length > 0) {
      if (!isValidateEmail(newEmailAddress)) {
        setValidEmailMessage(false);
        userData.email = session?.user?.email;
      }
      userData.email = newEmailAddress;
    }

    // if (newEmailAddress.length === 0) {
    //   userData.email = session?.user?.email as string;
    // }

    if (
      newProfileImage.length > 0 &&
      newProfileImage !== session?.user?.image
    ) {
      userData.image = newProfileImage;
      //console.log(userData);
    }

    // if (newProfileImage.length === 0) {
    //   userData.image = session?.user?.image as string;
    //   //console.log(userData);
    // }

    Object.keys(userData).forEach((key) => {
      if (userData[key] === session?.user[key] || userData[key] === "") {
        delete userData[key];
      }
    });

    if (Object.keys(userData).length === 0) {
      console.log("No changes were made.");
      // Optionally alert the user or handle this case as needed
      setNoNewMsg(true);
      return;
    }

    const saveUser = async (e) => {
      e.preventDefault();
      const id = session?.user?.id;
      console.log(id);
      try {
        const response = await fetch(`/api/users/update/user/${id}`, {
          method: "PUT",
          body: JSON.stringify({
            newLastName: newLastName,
            newEmailAddress: newEmailAddress,
            newPhoneNumber: newPhoneNumber,
            newProfileImage: newProfileImage,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update user");
        }

        const updatedUser = await response.json();

        console.log("User updated:", updatedUser);

        setUserUpdated(true);
      } catch (error) {
        console.error("Error updating user:", error);
        // Handle error (e.g., show error message)
      }
    };

    saveUser(e);
  };

  // const handleFormUpdate = async (e) => {
  //   e.preventDefault();

  //   let userData = {
  //     lastname: newLastName,
  //     phone: newPhoneNumber,
  //     email: newEmailAddress,
  //     image: newProfileImage,
  //   };

  //   // Remove fields that are not changed or are empty (for optional fields)
  //   Object.keys(userData).forEach((key) => {
  //     if (userData[key] === session?.user[key] || userData[key] === "") {
  //       delete userData[key];
  //     }
  //   });

  //   // Validate required fields
  //   if (userData.hasOwnProperty("email") && !isValidateEmail(userData.email)) {
  //     console.log("this is not valid email ...");
  //     setValidEmailMessage(false);
  //     return;
  //   }

  //   // Add other validation as needed...

  //   // Update user data
  //   try {
  //     const id = session?.user?.id;
  //     const response = await fetch(`/api/users/update/user/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(userData),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to update user");
  //     }

  //     const updatedUser = await response.json();
  //     console.log("User updated:", updatedUser);
  //     setUserUpdated(true);
  //   } catch (error) {
  //     console.error("Error updating user:", error);
  //     // Handle error (e.g., show error message)
  //   }
  // };

  if (session) {
    console.log(session);
    return (
      <>
        <div className="w-[80vw] flex flex-col px-8">
          <div className="w-[60vw]">
            <h3 className="text-black font-semibold text-lg">
              Update your profile details
            </h3>
            <h5>{session?.user?.id}</h5>
            <br />
            <form className="flex flex-col gap-2">
              {lockedForm === true ? (
                <>
                  <label htmlFor="firstname">First Name:</label>
                  <input
                    id="firstname"
                    type="text"
                    name="firstname"
                    placeholder={session?.user?.firstname}
                    disabled
                  />
                </>
              ) : (
                <>
                  <div className="hidden">
                    <label htmlFor="firstname">First Name:</label>
                    <input
                      id="firstname"
                      type="text"
                      name="firstname"
                      placeholder={session?.user?.firstname}
                      disabled
                    />
                  </div>
                </>
              )}

              {lockedForm === true ? (
                <>
                  <label htmlFor="lastname">
                    Last Name:{" "}
                    <span className="text-sm text-orange-700">
                      Unlock to modify
                    </span>
                  </label>
                  <input
                    id="lastname"
                    type="text"
                    name="lastname"
                    placeholder={
                      session?.user?.lastname === ""
                        ? "Not set ..."
                        : session?.user?.lastname
                    }
                    disabled
                  />
                </>
              ) : (
                <>
                  <label htmlFor="lastname">
                    Last Name:{" "}
                    <span className="text-sm text-emerald-600">
                      Can be modified
                    </span>
                  </label>
                  <input
                    id="lastname"
                    type="text"
                    name="lastname"
                    placeholder={
                      session?.user?.lastname === ""
                        ? "Not set ..."
                        : session?.user?.lastname
                    }
                    className="unlocked"
                    onChange={handleNewDataChange}
                    value={newLastName}
                  />
                </>
              )}

              {lockedForm === true ? (
                <>
                  <label htmlFor="name">Full Name:</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder={
                      session?.user?.firstname + " " + session?.user?.lastname
                    }
                    disabled
                  />
                </>
              ) : (
                <>
                  <div className="hidden">
                    <label htmlFor="name">Full Name:</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder={session?.user?.firstname + " " + newLastName}
                      disabled
                      value={newFullName}
                    />
                  </div>
                </>
              )}

              {lockedForm === true ? (
                <>
                  {" "}
                  <label htmlFor="username">Username:</label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    placeholder={session?.user?.username}
                    disabled
                  />
                </>
              ) : (
                <>
                  <div className="hidden">
                    <label htmlFor="username">Username:</label>
                    <input
                      id="username"
                      type="text"
                      name="username"
                      placeholder={session?.user?.username}
                      disabled
                    />
                  </div>
                </>
              )}

              {lockedForm === true ? (
                <>
                  <label htmlFor="email">
                    Email:{" "}
                    <span className="text-sm text-orange-700">
                      Unlock to modify
                    </span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder={
                      session?.user?.email === ""
                        ? "Email Not set ..."
                        : session?.user?.email
                    }
                    disabled
                  />
                </>
              ) : (
                <>
                  {validEmailMessage && (
                    <>
                      <label
                        htmlFor="email"
                        className="flex flex-row gap-4 items-center"
                      >
                        Email:{" "}
                        <span className="text-sm text-emerald-600">
                          Can be modified
                        </span>
                      </label>
                    </>
                  )}
                  {!validEmailMessage && (
                    <>
                      <label
                        htmlFor="email"
                        className="flex flex-row gap-4 items-center"
                      >
                        Email:{" "}
                        <span className="text-sm text-red-600">
                          This is not a valid email ...
                        </span>
                      </label>
                    </>
                  )}

                  <input
                    id="email"
                    type="text"
                    name="email"
                    placeholder={
                      session?.user?.email === ""
                        ? "Email Not set ..."
                        : session?.user?.email
                    }
                    className="unlocked"
                    onChange={handleNewDataChange}
                    value={newEmailAddress}
                  />
                </>
              )}

              {lockedForm === true ? (
                <>
                  <label htmlFor="phone">
                    Phone:{" "}
                    <span className="text-sm text-orange-700">
                      Unlock to modify
                    </span>
                  </label>
                  <input
                    id="phone"
                    type="text"
                    name="phone"
                    placeholder={session?.user?.phone}
                    disabled
                  />
                </>
              ) : (
                <>
                  {!phoneErrorMessage && (
                    <>
                      <label
                        htmlFor="phone"
                        className="flex flex-row gap-4 items-center"
                      >
                        Phone:{" "}
                        <span className="text-sm text-emerald-600">
                          Can be modified
                        </span>
                      </label>
                    </>
                  )}
                  {phoneErrorMessage && (
                    <>
                      <label
                        htmlFor="phone"
                        className="flex flex-row items-center"
                      >
                        Phone:{" "}
                        <span className="text-sm text-red-600">
                          Invalid Number
                        </span>
                      </label>
                    </>
                  )}

                  <input
                    id="phone"
                    type="text"
                    name="phone"
                    placeholder={session?.user?.phone}
                    className="unlocked"
                    value={newPhoneNumber}
                    onChange={handleNewDataChange}
                  />
                </>
              )}

              {lockedForm === true ? (
                <>
                  <label htmlFor="profile_image">
                    Profile Image URL:{" "}
                    <span className="text-sm text-orange-700">
                      Unlock to modify
                    </span>
                  </label>
                  <input
                    id="profile_image"
                    type="text"
                    name="profile_image"
                    placeholder={
                      session?.user?.image === ""
                        ? "Not set ..."
                        : session?.user?.image
                    }
                    disabled
                  />
                </>
              ) : (
                <>
                  <label htmlFor="profile_image">
                    Profile Image URL:{" "}
                    <span className="text-sm text-emerald-600">
                      Can be modified
                    </span>
                  </label>
                  <input
                    id="profile_image"
                    type="text"
                    name="profile_image"
                    placeholder={
                      session?.user?.image === ""
                        ? "Not set ..."
                        : session?.user?.image
                    }
                    className="unlocked"
                    value={newProfileImage}
                    onChange={handleNewDataChange}
                  />
                </>
              )}
              <div className="flex flex-row justify-between mt-4 mb-12">
                {lockedForm === true ? (
                  <>
                    <button
                      className={`btn btn-grey rounded-md`}
                      onClick={handleFormUnlock}
                    >
                      Unlock
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className={`btn btn-secondary rounded-md`}
                      onClick={handleFormUnlock}
                    >
                      Lock
                    </button>
                    {userUpdated ? (
                      <button className="btn text-center align-middle rounded h-[64px] text-sm">
                        Updates Applied ..
                      </button>
                    ) : (
                      <span className="text-sm hidden"></span>
                    )}
                    {noNewMsg ? (
                      <button className="btn text-center align-middle rounded h-[64px] text-xs">
                        No changes were made ..
                      </button>
                    ) : (
                      <span className="text-sm hidden"></span>
                    )}
                    <button
                      className={`btn btn-primary rounded-md`}
                      onClick={handleFormUpdate}
                    >
                      Save
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
};

export default ProfileUpdateForm;
