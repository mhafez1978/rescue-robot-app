"use client";
import React, { useState, useEffect } from "react";

const CheckBox = ({ userId }) => {
  const [checked, setChecked] = useState(false);
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
  };
  return (
    <input
      id={userId}
      type="checkbox"
      checked={checked}
      onChange={handleChecked}
      className="checkbox checkbox-secondary"
    />
  );
};

export default CheckBox;
