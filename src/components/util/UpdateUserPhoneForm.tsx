"use client";
import React, { useState } from "react";

const UpdateUserPhoneForm: React.FC = () => {
  const [userPhone, setUserPhone] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userPhone === "") {
      console.log("Phone number cannot be empty");
      return;
    }
    console.log("Submitted", userPhone);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPhone(e.currentTarget.value);
    console.log(userPhone);
  };
  return (
    <>
      <h2 className="text-3xl">
        <em>Update your profile details here ...</em>
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-[50%] mt-12 flex flex-col justify-center"
      >
        <label className="text-2xl font-bold" htmlFor="phone">
          Your Phone:
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
        <button className="brn btn-primary" type="submit">
          Save
        </button>
      </form>
    </>
  );
};

export default UpdateUserPhoneForm;
