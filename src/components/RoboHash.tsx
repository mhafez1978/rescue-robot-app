"use client";
import React, { FC, useState, useEffect } from "react";

interface RobotProps {
  name: string;
}

const RobotImage: FC<RobotProps> = ({ name }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImageUrl = async () => {
      const response = await fetch(
        `https://robohash.org/${encodeURIComponent(name)}.png`
      );
      const blob = await response.blob();
      setImageUrl(URL.createObjectURL(blob));
    };

    if (name) {
      fetchImageUrl();
    }
  }, [name]);

  return (
    <>
      {imageUrl && (
        <img
          className="object-cover"
          src={imageUrl}
          alt={`Robot representation of: ${name}`}
        />
      )}
    </>
  );
};

export default RobotImage;
