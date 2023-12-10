"use client";

import React from "react";
import { useRouter } from "next/navigation";

const BackBtn: React.FC = () => {
  const router = useRouter();
  return (
    <button
      className="mt-4 py-3 px-8 text-red-600 border-2 border-red-700 rounded-md bg-red-500/80 text-white"
      onClick={() => {
        router.back();
      }}
    >
      Go Back
    </button>
  );
};

export default BackBtn;
