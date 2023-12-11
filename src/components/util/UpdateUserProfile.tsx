"use client";
import User from "@/database/models/User";
import { FormEvent } from "react";
import Toast from "@/components/Toast";
import InProgressToast from "@/components/InProgressToast";
import React, { useState } from "react";

const UpdateUserProfile: React.FC = () => {
  let [userPhone, setUserPhone] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [name, setName] = useState(firstname + " " + lastname);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [userRole, setUserRole] = useState("");
  const [missingField, setMissingField] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [validPhoneNumber, setValidPhoneNumber] = useState("yes");
  const [userCreated, setUserCreated] = useState(false);
  const [actionStarted, setActionStarted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === "first_name") {
      setFirstName(e.currentTarget.value);
      console.log(firstname);
      setName(e.currentTarget.value + " " + lastname);
    } else if (e.currentTarget.name === "last_name") {
      setLastName(e.currentTarget.value);
      console.log(lastname);
      setName(firstname + " " + e.currentTarget.value);
    } else if (e.currentTarget.name === "email") {
      setUserEmail(e.currentTarget.value);
      console.log(email);
    } else if (e.currentTarget.name === "phone") {
      setUserPhone(e.currentTarget.value);
      console.log(userPhone);
    } else if (e.currentTarget.name === "password") {
      setPassword(e.currentTarget.value);
      console.log(password);
    } else if (e.currentTarget.name === "verify_password") {
      setVerifyPassword(e.currentTarget.value);
      if (password === verifyPassword) {
        setPasswordsMatch(true);
      }
      console.log(verifyPassword);
    } else if (e.currentTarget.name === "profile_image") {
      setProfileImage(e.currentTarget.value);
      console.log(profileImage);
    } else if (e.currentTarget.name === "user_role") {
      setUserRole(e.currentTarget.value);
      console.log(userRole);
    } else if (e.currentTarget.name === "username") {
      setUsername(e.currentTarget.value);
      console.log(username);
    }
  };

  const isValidPhoneNumber = (userPhone) => {
    // This is a basic pattern and might need to be adjusted based on your specific requirements
    const pattern = /^\+?\d{1,3}[-\s]?\d{3}[-\s]?\d{3}[-\s]?\d{4}$/;
    const results = pattern.test(userPhone);
    console.log("Results", results);
    return results;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActionStarted(true);
    if (
      userPhone === "" ||
      firstname === "" ||
      lastname === "" ||
      username === "" ||
      email === "" ||
      password === "" ||
      verifyPassword === ""
    ) {
      console.log("All fields are required");
      setMissingField(true);
      return;
    }
    // Check if passwords match
    if (password !== verifyPassword) {
      console.log("Passwords do not match");
      setPasswordsMatch(false);
      return;
    }
    // trim extra spaces from phone number
    userPhone = userPhone.replace(/\D/g, "");

    // Check if phone number is valid
    if (!isValidPhoneNumber(userPhone)) {
      console.log("Invalid phone number");
      setValidPhoneNumber("no");
      return;
    } else {
      setValidPhoneNumber("yes");
      console.log("This is a Valid phone number");
    }

    try {
      const newUser = await fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          username: username,
          email: email,
          phone: userPhone,
          password: password,
          role: userRole,
          image: profileImage,
        }),
      })
        .then(async (res) => await res.json())
        .then((data) => {
          console.log(data);
          setUserCreated(true);
          setActionStarted(false);
          return data;
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormReset = (e: ReactFormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserPhone("");
    setFirstName("");
    setLastName("");
    setUserEmail("");
    setPassword("");
    setVerifyPassword("");
    setName("");
    setUsername("");
    setProfileImage("");
    setUserRole("");
    setUserCreated(false);
    console.log("Form has been reset...");
  };

  return (
    <>
      <h2 className="text-3xl">
        <em>Update your profile details here ...</em>
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-[100%] mt-12 flex flex-col justify-center"
      >
        <label className="text-lg" htmlFor="first_name">
          First Name:{" "}
          {missingField && firstname === "" ? (
            <span className="text-red-600 text-lg">
              *This field is required
            </span>
          ) : (
            <span></span>
          )}
        </label>
        <input
          id="first_name"
          className="mb-2 mt-2"
          type="text"
          placeholder="Enter your phone number ..."
          value={firstname}
          name="first_name"
          onChange={handleChange}
        />
        <label className="text-lg" htmlFor="last_name">
          Last Name:
          {missingField && lastname === "" ? (
            <span className="text-red-600 text-lg">
              *This field is required
            </span>
          ) : (
            <span></span>
          )}
        </label>
        <input
          id="last_name"
          className="mb-2 mt-2"
          type="text"
          placeholder="Enter your phone number ..."
          value={lastname}
          name="last_name"
          onChange={handleChange}
        />
        <label className="text-lg" htmlFor="name">
          Full Name:
        </label>
        <input
          id="name"
          className="mb-2 mt-2"
          type="text"
          placeholder={name}
          value={name}
          name="name"
          onChange={handleChange}
          disabled
        />
        <label className="text-lg" htmlFor="username">
          Username:
        </label>
        <input
          id="username"
          className="mb-2 mt-2"
          type="text"
          placeholder={"Choose a username ..."}
          value={username}
          name="username"
          onChange={handleChange}
        />
        <label className="text-lg" htmlFor="email">
          Email:
          {missingField && email === "" ? (
            <span className="text-red-600 text-lg">
              *This field is required
            </span>
          ) : (
            <span></span>
          )}
        </label>
        <input
          id="email"
          className="mb-2 mt-2"
          type="text"
          placeholder="update your email ..."
          value={email}
          name="email"
          onChange={handleChange}
        />
        <label className="text-lg" htmlFor="password">
          Password:
          {missingField && password === "" ? (
            <span className="text-red-600 text-lg">
              *You have to enter a password to make changes
            </span>
          ) : (
            <span></span>
          )}
          {passwordsMatch === false ? (
            <span className="text-red-600 text-lg">
              *Passwords do not match
            </span>
          ) : (
            <span></span>
          )}
        </label>
        <input
          id="password"
          className="mb-2 mt-2"
          type="password"
          placeholder="new password ..."
          value={password}
          name="password"
          onChange={handleChange}
        />
        <label className="text-lg" htmlFor="verify_password">
          Repeat Password:
          {missingField && verifyPassword === "" ? (
            <span className="text-red-600 text-lg">
              *Please verify your password
            </span>
          ) : (
            <span></span>
          )}
          {passwordsMatch === false ? (
            <span className="text-red-600 text-lg">
              *Passwords do not match
            </span>
          ) : (
            <span></span>
          )}
        </label>
        <input
          id="verify_password"
          className="mb-2 mt-2"
          type="password"
          placeholder="Verify your password ..."
          value={verifyPassword}
          name="verify_password"
          onChange={handleChange}
        />
        <label className="text-lg" htmlFor="phone">
          Phone: <span className="text-xs">+1 555 555 5555</span>
          {missingField && userPhone === "" ? (
            <span className="text-red-600 text-lg">
              *This field is required
            </span>
          ) : (
            <span></span>
          )}
          {validPhoneNumber === "no" ? (
            <span className="text-red-600 text-lg">
              *Phone needs to be valid ...
            </span>
          ) : (
            <span></span>
          )}
        </label>
        <input
          id="phone"
          className="mb-2 mt-2"
          type="text"
          placeholder="Enter your phone number ..."
          value={userPhone}
          name="phone"
          onChange={handleChange}
        />
        <label className="text-lg" htmlFor="user_role">
          Role:
        </label>
        <select
          id="user_role"
          className="mb-2 mt-2"
          type="text"
          placeholder={userRole}
          value={userRole}
          name="user_role"
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <label htmlFor="profile_image">Profile Image:</label>
        <input
          className=" mt-2"
          type="text"
          name="profile_image"
          id="profile_image"
          value={profileImage}
          onChange={handleChange}
        />
        <div className="flex flex-row justify-center items-center py-4">
          {actionStarted ? <InProgressToast /> : <span></span>}
          {userCreated && <Toast />}
        </div>

        <div className="flex flex-row justify-between">
          <button className="brn btn-primary" type="submit">
            Save
          </button>
          <button
            type="reset"
            className="btn btn-danger"
            onClick={handleFormReset}
          >
            Reset
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateUserProfile;
