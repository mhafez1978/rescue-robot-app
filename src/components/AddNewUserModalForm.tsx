"use client";
import React from "react";
import CreateUserAccount from "./util/CreateUserAccount";
import UpdateUserProfile from "./util/UpdateUserProfile";
import ProfileUpdateForm from "./util/ProfileUpdateForm";

const AddNewUserModalForm = () => {
  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-primary rounded-md"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Add User
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box min-w-[60vw] mx-auto">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <CreateUserAccount />
        </div>
      </dialog>
    </>
  );
};

export default AddNewUserModalForm;
