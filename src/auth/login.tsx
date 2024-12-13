import "./style.css";

import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { initSession } from "../store/sessionUserReducer";
import { environment } from "../environments/environment";
import Swal from "sweetalert2";
import { Spin } from "../common-components/spin";

// import { login } from '../store/authActions';
const Login: React.FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the request starts
    try {
      const { data } = await axios.post(`${environment.apiPort}/auth/login`, {
        email,
        password,
      });

      if (data?.token) {
        localStorage.setItem("userToken", data.token);
        setTimeout(() => {
          dispatch(initSession() as any);
        }, 2000);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
      });
    } finally {
      setLoading(false); // Set loading to false after the request is completed
    }
  };

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="mb-8">
                <h3 className="text-gray-800 dark:text-gray-50 text-3xl font-extrabold">
                  Sign in
                </h3>
                <p className="text-gray-500 dark:text-gray-200 text-sm mt-4 leading-relaxed">
                  Sign in to your account and explore a world of possibilities.
                  Your journey begins here.
                </p>
              </div>
              <div>
                <label className="text-gray-800 dark:text-gray-50 text-sm mb-2 block">
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                    placeholder="Enter Email Address"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle cx={10} cy={7} r={6} data-original="#000000" />
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <label className="text-gray-800 dark:text-gray-50 text-sm mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"} // Toggle between text and password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                    placeholder="Enter Password"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    onClick={() => setShowPassword(!showPassword)} // Toggle visibility on click
                    className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                    viewBox="0 0 24 24"
                  >
                    {showPassword ? (
                      // Eye icon for showing password
                      <path d="M12 3C7.58 3 3.66 6.32 2 11c1.66 4.68 5.58 8 10 8s8.34-3.32 10-8c-1.66-4.68-5.58-8-10-8zm0 14c-3.31 0-6.42-2.22-8-6 1.58-3.78 4.69-6 8-6s6.42 2.22 8 6c-1.58 3.78-4.69 6-8 6zm0-10a4 4 0 1 0 4 4 4 4 0 0 0-4-4zm0 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2z" />
                    ) : (
                      // Eye-off icon for hiding password
                      <path d="M12 5C7.8 5 4 7.58 2 12c1.92 4.42 5.58 7 10 7a9.88 9.88 0 0 0 4.58-1.12l2.47 2.47a1 1 0 1 0 1.41-1.41L4.41 3.39a1 1 0 0 0-1.41 1.41L6.1 8.91A9.88 9.88 0 0 0 2 12c1.92 4.42 5.58 7 10 7a9.91 9.91 0 0 0 5.69-1.78l2.48 2.48a1 1 0 0 0 1.41-1.41L4.41 3.39a1 1 0 0 0-1.41 1.41L8.91 10.9A9.8 9.8 0 0 0 2 12c1.92 4.42 5.58 7 10 7a9.91 9.91 0 0 0 5.69-1.78l2.48 2.48a1 1 0 0 0 1.41-1.41L5.82 4.32a1 1 0 0 0-1.41 1.41l1.78 1.78A9.8 9.8 0 0 0 2 12c1.92 4.42 5.58 7 10 7a9.91 9.91 0 0 0 5.69-1.78l2.48 2.48a1 1 0 0 0 1.41-1.41L5.82 4.32z" />
                    )}
                  </svg>
                </div>
              </div>
              <hr />
              <div className="flex flex-wrap items-center justify-between gap-4"></div>
              <div className="!-mt-0">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  Login {loading && <Spin />}
                </button>
              </div>
              {/* {otpState.status === 'failed' && (
                <p className="text-red-500">{otpState.error}</p>
              )} */}
            </form>
          </div>
          <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
            <img
              src="https://readymadeui.com/login-image.webp"
              className="w-full h-full max-md:w-4/5 mx-auto block object-cover rounded-xl"
              alt="Dining Experience"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
