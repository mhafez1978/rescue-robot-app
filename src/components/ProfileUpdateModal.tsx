import User from "@/database/models/User";
import React from "react";
import ProfileUpdateForm from "./util/ProfileUpdateForm";

const ProfileUpdateModal = async ({ userId }) => {
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  return (
    <>
      {/* The button to open modal */}
      <label
        htmlFor="profile_update_modal"
        className="btn btn-primary rounded-md"
      >
        Edit
      </label>

      {/* The modal */}
      <input
        type="checkbox"
        id="profile_update_modal"
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            Update {user?.dataValues.fullname} information
          </h3>
          <hr className="my-4" />
          <ProfileUpdateForm />
        </div>
      </div>
    </>
  );
};

export default ProfileUpdateModal;
