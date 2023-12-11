import React from "react";

const InProgressToast = () => {
  return (
    <>
      <div
        className="max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700"
        role="alert"
      >
        <div className="flex items-center p-4">
          <div
            className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
          <p className="ms-3 text-sm text-gray-700 dark:text-gray-400">
            Action in progress
          </p>
        </div>
      </div>
    </>
  );
};

export default InProgressToast;
