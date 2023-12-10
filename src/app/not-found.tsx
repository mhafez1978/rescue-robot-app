import BackBtn from "@/components/BackBtn";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import React from "react";

const NotFound: React.FC = () => {
  return (
    <>
      <Header />
      <div className="w-[100vw] py-8">
        <div className="flex flex-row mx-auto px-12 gap-x-4">
          <div className="w-1/2 flex flex-col justify-center items-start">
            <div className="p-8">
              <h1 className="mb-6">Oops, ...</h1>
              <h3 className="text-red-600 text-4xl">
                Error: 404 Resource Not Found
              </h3>
              <p className="text-gray-400">
                <BackBtn />
              </p>
            </div>
          </div>
          <div className="w-1/2">
            <div className="w-[80%] h-[80%] mx-auto ">
              <img src="/images/404.jpg" alt="404" className="object-cover" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
