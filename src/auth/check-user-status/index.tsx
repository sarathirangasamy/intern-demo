import { FormEvent, useState } from "react";
import axios from "axios";
import { environment } from "../../environments/environment";
import { RegisterFormDetails } from "../register/register-form";
import { Spin } from "../../common-components/spin";

export const CheckUserStatus: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [loading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<RegisterFormDetails | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors: { email?: string } = {};

    if (!email) {
      newErrors.email = "Enter Your Email";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid Email";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${environment.apiPort}/api/student/${email?.trim()}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setIsLoading(false);
        setUserData(response.data?.data);
        setToastMessage("User data fetched successfully!");
      } catch (error: any) {
        setUserData(null);
        setIsLoading(false);
        setToastMessage(error.response?.data?.message || "An error occurred");
      }
    }
  };

  return (
    <form
      style={{ maxWidth: "none" }}
      action="#"
      className="space-y-4 bg-transparent shadow-none"
    >
      {toastMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded shadow-lg">
          {toastMessage}
          <button
            onClick={() => setToastMessage(null)}
            className="ml-4 text-white font-bold"
          >
            ✕
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
        <div className="mb-0 mt-0">
          <label className="" htmlFor="email">
            Email
          </label>
          <input
            className={`w-full rounded-lg border-gray-200 p-2 text-sm ${
              errors.email ? "border-red-500" : "focus:border-green-500"
            } focus:outline-none`}
            placeholder="Please Enter Email Address"
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="mt-0 mb-0">
          <button
            type="button"
            disabled={loading}
            onClick={handleSubmit}
            className="inline-flex items-center justify-center w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
          >
            <span>Submit</span>
            {loading && <Spin />}
          </button>
        </div>
      </div>

      {userData && (
        <div className="mt-4 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">{userData?.name} Details</h2>

          <div className="grid gap-4 w-full max-w-md">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded shadow">
              <span className="font-semibold text-gray-700">Name:</span>
              <span className="text-gray-900">{userData?.name}</span>
            </div>

            <div className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded shadow">
              <span className="font-semibold text-gray-700">Email:</span>
              <span className="text-gray-900">{userData?.email}</span>
            </div>

            <div className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded shadow">
              <span className="font-semibold text-gray-700">Mobile:</span>
              <span className="text-gray-900">{userData?.mobile}</span>
            </div>

            <div className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded shadow">
              <span className="font-semibold text-gray-700">Status:</span>
              {/* <span className="text-gray-900">{userData?.status}</span> */}
            </div>
          </div>
        </div>
      )}
    </form>
  );
};
