import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import Swal from "sweetalert2";

import { Spin } from "../../common-components/spin";
import { environment } from "../../environments/environment.prod";

export interface RegisterFormDetails {
  email: string;
  name: string;
  mobile: string;
  college: string;
  degree: string;
  poy: string;
  course: string;
  paymentMode: string;
  referral: string;
  dob: string;
  status?: string;
  // paymentScreenShot: any | null;
  paymentScreenShot?: any | null;
}

export const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormDetails>({
    email: "",
    name: "",
    mobile: "",
    college: "",
    degree: "",
    poy: "",
    course: "",
    paymentMode: "",
    referral: "",
    dob: "",
    paymentScreenShot: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (!formData.name) {
      newErrors.name = "Enter Your Name";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Enter Your Email";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid Email";
      isValid = false;
    }

    if (!formData.mobile) {
      newErrors.mobile = "Enter Your Phone number";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be a 10-digit numeric value";
      isValid = false;
    }

    if (!formData.dob) {
      newErrors.dob = "Select Your DOB";
      isValid = false;
    }

    if (!formData.paymentMode) {
      newErrors.paymentMode = "Payment Mode";
      isValid = false;
    }

    if (!formData.college) {
      newErrors.college = "Enter College Name";
      isValid = false;
    }

    if (!formData.degree) {
      newErrors.degree = "Enter Degree Name";
      isValid = false;
    }

    if (!formData.course) {
      newErrors.course = "Enter Course Name";
      isValid = false;
    }

    if (!formData.poy) {
      newErrors.poy = "Select Passout Year";
      isValid = false;
    }

    if (formData?.paymentMode === "ONLINE") {
      if (!formData.paymentScreenShot) {
        newErrors.paymentScreenShot = "Upload Payment screenshot";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setIsLoading(true);
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          formDataToSend.append(key, value as any);
        });

        await axios
          .post(environment.registerStudent, formDataToSend, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: result?.data?.message || "Form submitted successfully.",
            });

            setFormData({
              email: "",
              name: "",
              mobile: "",
              college: "",
              degree: "",
              poy: "",
              course: "",
              paymentMode: "",
              referral: "",
              dob: "",
              paymentScreenShot: null,
            });
            setPreviewImage(null);
          })
          .catch((err) => {
            const errorMessage =
              err.response?.data?.message ||
              err.message ||
              "Something went wrong.";

            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: errorMessage, // This will display "Email already exists"
            });
          });
      } catch (err: any) {
        console.log(err, "2321312");

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err?.message || "Something went wrong.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const file = files?.[0];

    if (file) {
      const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/jpg",
      ];

      // Validate file type
      if (!validImageTypes.includes(file.type)) {
        alert("Only image files (JPEG, PNG, GIF) are allowed.");
        event.target.value = "";
        setPreviewImage(null);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as any);
      };

      reader.readAsDataURL(file);
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
    }
  };

  return (
    <>
      <form
        style={{ maxWidth: "none" }}
        action="#"
        className="bg-transparent shadow-none space-y-4"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="mb-0 mt-0">
            <label htmlFor="name">Name</label>
            <input
              className={`w-full rounded-lg border-gray-200 p-2 text-sm ${
                errors.name ? "border-red-500" : "focus:border-green-500"
              } focus:outline-none`}
              placeholder="Name"
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-sm error-text-font">{errors.name}</p>
            )}
          </div>

          <div className="mb-0 mt-0">
            <label className="" htmlFor="email">
              Email
            </label>
            <input
              className={`w-full rounded-lg border-gray-200 p-2 text-sm ${
                errors.email ? "border-red-500" : "focus:border-green-500"
              } focus:outline-none`}
              placeholder="Email address"
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />

            {errors.email && (
              <p className="text-sm error-text-font">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="mb-0 mt-0">
            <label className="" htmlFor="phone">
              Phone
            </label>
            <input
              className={`w-full rounded-lg border-gray-200 p-2 text-sm ${
                errors.mobile ? "border-red-500" : "focus:border-green-500"
              } focus:outline-none`}
              placeholder="Phone Number"
              type="tel"
              id="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
            {errors.mobile && (
              <p className="text-sm error-text-font">{errors.mobile}</p>
            )}
          </div>

          <div className="mb-0 mt-0">
            <label>DOB</label>
            <input
              className={`w-full rounded-lg border-gray-200 p-2 text-sm ${
                errors.dob ? "border-red-500" : "focus:border-green-500"
              } focus:outline-none`}
              type="date"
              id="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            {errors.dob && (
              <p className="text-sm error-text-font">{errors.dob}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="mb-0 mt-0">
            <label className="">College</label>
            <input
              className={`w-full rounded-lg border-gray-200 p-2 text-sm ${
                errors.college ? "border-red-500" : "focus:border-green-500"
              } focus:outline-none`}
              placeholder="College"
              type="text"
              id="college"
              value={formData.college}
              onChange={handleChange}
            />

            {errors.college && (
              <p className="text-sm error-text-font">{errors.college}</p>
            )}
          </div>

          <div className="mb-0 mt-0">
            <label>Degree</label>
            <input
              className={`w-full rounded-lg border-gray-200 p-2 text-sm ${
                errors.degree ? "border-red-500" : "focus:border-green-500"
              } focus:outline-none`}
              placeholder="Degree"
              type="text"
              id="degree"
              value={formData.degree}
              onChange={handleChange}
            />
            {errors.degree && (
              <p className="text-sm error-text-font">{errors.degree}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="mb-0 mt-0">
            <label>Course</label>
            <input
              // className="w-full rounded-lg  border-gray-200 p-2 text-sm focus:border-green-500 focus:outline-none"
              className={`w-full rounded-lg border-gray-200 p-2 text-sm ${
                errors.course ? "border-red-500" : "focus:border-green-500"
              } focus:outline-none`}
              placeholder="Course"
              type="text"
              id="course"
              value={formData.course}
              onChange={handleChange}
            />
            {errors.course && (
              <p className="text-sm error-text-font">{errors.course}</p>
            )}
          </div>

          <div className="mb-0 mt-0">
            <label>Passout Year</label>
            <input
              // className="w-full rounded-lg border-gray-200 p-2 text-sm focus:border-green-500 focus:outline-none"

              className={`w-full rounded-lg border-gray-200 p-2 text-sm ${
                errors.poy ? "border-red-500" : "focus:border-green-500"
              } focus:outline-none`}
              placeholder="Email address"
              type="month"
              id="poy"
              value={formData.poy}
              onChange={handleChange}
            />
            {errors.poy && (
              <p className="text-sm error-text-font">{errors.poy}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="mb-0 mt-0">
            <label htmlFor="paymentMode">Payment Mode</label>
            <select
              id="paymentMode"
              className={`w-full rounded-lg p-2 text-sm custom-select focus:border-green-500 focus:outline-none`}
              style={{
                border: errors.paymentMode
                  ? "1px solid red"
                  : "1px solid #E5E7EB",
                borderRadius: "8px",
                padding: "8px",
                width: "100%",
              }}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  [e.target.id]: e.target.value,
                }));

                setErrors((prev) => ({
                  ...prev,
                  [e.target.id]: "",
                }));
              }}
              value={formData.paymentMode}
            >
              <option value="">Payment Mode</option>
              <option value="ONLINE">Online</option>
              <option value="CASH">Cash</option>
            </select>

            {errors.paymentMode && (
              <p className="text-sm error-text-font">{errors.paymentMode}</p>
            )}
          </div>

          <div className="mb-0 mt-0">
            <label htmlFor="email">Referral</label>
            <input
              className="w-full rounded-lg border-gray-200 p-2 text-sm focus:border-green-500 focus:outline-none"
              placeholder="Referral"
              type="text"
              id="referral"
              value={formData.referral}
              onChange={handleChange}
            />
          </div>
        </div>

        {formData?.paymentMode === "ONLINE" ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="mb-0 mt-0">
              <label
                htmlFor="paymentScreenShot"
                className="block text-sm font-medium text-gray-700"
              >
                Payment Screenshot
              </label>
              <input
                onChange={handleFileChange}
                className="w-full rounded-lg border-gray-200 p-2 text-sm mb-4"
                type="file"
                id="paymentScreenShot"
                name="paymentScreenShot"
                accept="image/*"
              />

              {errors.paymentScreenShot && (
                <p className="text-sm error-text-font">
                  {errors.paymentScreenShot}
                </p>
              )}

              {previewImage && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-600 mb-2 ">
                    Preview:
                  </p>
                  <img
                    src={previewImage}
                    alt="Uploaded Preview"
                    className="w-full h-auto max-w-xs rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>
          </div>
        ) : null}

        <div className="mt-4">
          <button
            type="button"
            disabled={loading}
            onClick={handleSubmit}
            className="inline-flex items-center justify-center w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
          >
            <span>Register</span>
            {loading && <Spin />}
          </button>
        </div>
      </form>
    </>
  );
};
