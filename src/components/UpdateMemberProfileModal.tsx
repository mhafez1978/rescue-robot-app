"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import User from "@/database/models/User";

const UpdateMemberProfileModal = ({ id }: any) => {
  const { data: session } = useSession();
  const [newlastname, setNewlastname] = useState("");
  const [newemail, setNewEmail] = useState("");
  const [newphonenumber, setNewphonenumber] = useState("");
  const [newimage, setNewimage] = useState("");
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    image: "",
  });

  const getUser = async () => {
    const user: any = await fetch(
      `http://localhost:3000/api/users/update/user/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (user) {
      setUserData(user);
    }
  };

  getUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === "lastname") {
      setNewlastname(e.currentTarget.value);
      console.log(newlastname);
    } else if (e.currentTarget.name === "email") {
      setNewEmail(e.currentTarget.value);
      console.log(newemail);
    } else if (e.currentTarget.name === "phone") {
      setNewphonenumber(e.currentTarget.value);
      console.log(newphonenumber);
    } else if (e.currentTarget.name === "profile_image") {
      setNewimage(e.currentTarget.value);
      console.log(newimage);
    }
  };

  if (session && session.user?.role === "admin") {
    return (
      <>
        <button
          type="button"
          className="btn btn-primary rounded-md"
          data-hs-overlay="#hs-large-modal"
        >
          Update
        </button>
        <div
          id="hs-large-modal"
          className="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[60] overflow-x-hidden overflow-y-auto pointer-events-none"
        >
          <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:max-w-4xl lg:w-full m-3 lg:mx-auto">
            <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
              <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                <h3 className="font-bold text-gray-800 dark:text-white">
                  Update your profile info.
                </h3>
                <button
                  type="button"
                  className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  data-hs-overlay="#hs-large-modal"
                >
                  <span className="sr-only">Cancel</span>
                  <svg
                    className="flex-shrink-0 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4 overflow-y-auto">
                <p className="mt-1 text-gray-800 dark:text-gray-400">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content.
                </p>
                <div>
                  <form className="flex flex-col gap-2">
                    <label htmlFor="firstname">First Name:</label>
                    <input
                      type="text"
                      name="firstname"
                      value={userData?.firstname}
                      placeholder={userData?.firstname}
                      disabled
                    />
                    <label htmlFor="lastname">
                      Last Name:{" "}
                      <span className="text-sm text-orange-700">
                        Unlock to modify
                      </span>
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      placeholder={userData?.lastname}
                      onChange={handleChange}
                      value={newlastname}
                    />
                    <label htmlFor="name">Full Name:</label>
                    <input
                      type="text"
                      name="name"
                      placeholder={userData?.firstname + " " + newlastname}
                      disabled
                    />
                    <label htmlFor="email">
                      Email:{" "}
                      <span className="text-sm text-orange-700">
                        Unlock to modify
                      </span>
                    </label>
                    <input
                      type="text"
                      name="username"
                      placeholder={userData?.email}
                      onChange={handleChange}
                      value={newemail}
                    />
                    <label htmlFor="phone">
                      Phone:{" "}
                      <span className="text-xs text-orange-700">
                        Unlock to modify
                      </span>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      placeholder={userData?.phone}
                      onChange={handleChange}
                      value={newphonenumber}
                    />
                    <label htmlFor="profile_image">
                      Profile Image URL:{" "}
                      <span className="text-sm text-orange-700">
                        Unlock to modify
                      </span>
                    </label>
                    <input
                      type="text"
                      name="profile_image"
                      placeholder={
                        userData?.image === "" ? "Not set ..." : userData?.image
                      }
                      onChange={handleChange}
                      value={newimage}
                    />
                    <div className="flex flex-row justify-between mt-4 mb-12">
                      <button className="btn btn-secondary rounded-md">
                        Unlock
                      </button>

                      <button className="btn btn-grey rounded-md">
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default UpdateMemberProfileModal;
