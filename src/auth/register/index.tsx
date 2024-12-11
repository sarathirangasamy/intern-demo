/* eslint-disable jsx-a11y/img-redundant-alt */
import './style.css';

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { CheckUserStatus } from '../check-user-status';
import { RegisterForm } from './register-form';

// Define form data interface

export const InternRegisterForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState("register");

  const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    useEffect(() => {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      handleResize(); // To set initial size on load

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return windowSize;
  };

  const { width, height } = useWindowSize();

  return (
    <>
      <section
        className={`${
          (window.innerWidth || 0) < 750
            ? "bg-gray-100 h-auto"
            : activeTab === "status"
            ? "bg-gray-100 h-screen"
            : "bg-gray-100 h-auto"
        }`}  
      >
        <div className="mx-auto max-w-screen-xl h-full px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-2 lg:py-12">
              <p className="max-w-xl text-lg">
                At the same time, the fact that we are wholly owned and totally
                confident that we will only recommend what is right for you.
              </p>
              <div className="mt-8">
                <a
                  href="tel:01514754450"
                  className="text-2xl font-bold text-pink-600"
                >
                  0151 475 4450
                </a>
                <address className="mt-2 not-italic">
                  282 Kevin Brook, Imogeneborough, CA 58517
                </address>
              </div>

              <div className="mt-8 flex flex-col items-center">
                <img
                  src="https://www.imgonline.com.ua/examples/qr-code-url.png"
                  alt="QR Code to Pay"
                  className="w-32 h-32 mb-4" // Adjust size as needed
                />
                <p className="text-lg font-semibold text-gray-800">
                  Scan to Pay
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              {/* Toggle Buttons */}
              <div className="flex justify-center space-x-6 mb-8">
                <button
                  className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm font-semibold transition duration-300 ${
                    activeTab === "register"
                      ? "bg-blue-600 text-white border-2 border-blue-600 shadow-lg"
                      : "bg-gray-200 text-gray-800 border-2 border-gray-300 hover:bg-gray-300"
                  }`}
                  onClick={() => setActiveTab("register")}
                >
                  Register
                </button>
                <button
                  className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm font-semibold transition duration-300 ${
                    activeTab === "status"
                      ? "bg-blue-600 text-white border-2 border-blue-600 shadow-lg"
                      : "bg-gray-200 text-gray-800 border-2 border-gray-300 hover:bg-gray-300"
                  }`}
                  onClick={() => setActiveTab("status")}
                >
                  Check Status
                </button>
              </div>

              {/* Toggle Components */}
              <div className="mt-6">
                {activeTab === "register" && (
                  <div className="p-6 bg-gray-50 rounded-lg">
                    {/* Register Form Component */}
                    <RegisterForm />
                  </div>
                )}
                {activeTab === "status" && (
                  <div className="p-6 bg-gray-50 rounded-lg">
                    {/* Check Status Component */}
                    <CheckUserStatus />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
