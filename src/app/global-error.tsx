"use client"; // Error components must be Client Components

import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error.message);
    setMsg(error.message);
  }, [error]);

  return (
    <>
      <Header />
      <div>
        <h2>Something went wrong!</h2>
        <p>{msg}</p>
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try Again ...
        </button>
      </div>
      <Footer />
    </>
  );
}
