"use client";
import React, { useState, useEffect } from "react";

export const getData = async () => {
  const res = await fetch("https://api.ipify.org?format=json", {
    method: "GET",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log("failed to fetch ip");
    throw new Error("Failed to fetch IP");
  }
  // console.log(res)
  return res.json();
};

export default function GetIP() {
  const [ipAddress, setIpAddress] = useState("fetching.....");

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const ip = await getData();
        if (ip && ip.ip) {
          setIpAddress(ip.ip);
        }
      } catch (error) {
        console.error("Error fetching IP:", error);
        setIpAddress(""); // Set to empty string or handle error appropriately
      }
    };

    fetchIP();
  }, []);

  return (
    <>
      {ipAddress.length > 0 ? (
        <span className="text-emerald-600">{ipAddress}</span>
      ) : (
        <span className="text-red-500">IP not found</span>
      )}
    </>
  );
}
