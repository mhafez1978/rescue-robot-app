"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PrelineScript() {
  const path = usePathname();

  useEffect(() => {
    import("preline/preline");
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     HSStaticMethods.autoInit();
  //   }, 100);
  // }, [path]);

  useEffect(() => {
    setTimeout(() => {
      if (window.HSStaticMethods) {
        window.HSStaticMethods.autoInit();
      } else {
        console.error("HSStaticMethods is not defined");
      }
    }, 100);
  }, [path]);

  return null;
}
