import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RowData } from ".";
import { environment } from "../environments/environment";
import { useSelector } from "react-redux";
import { Spin } from "../common-components/spin";
import Swal from "sweetalert2";

export const capitalizeName = (name: string) => {
  return name.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};
export const StudentDetail: React.FC = () => {
  const { studentId } = useParams();
  const [studentData, setStudentData] = useState<RowData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentUser } = useSelector((state: any) => state?.userAuth);

  useEffect(() => {
    if (!studentId) return;

    fetchStudentData();
  }, [studentId]);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3333/api/student/detail/${studentId}`
      );
      setStudentData(response?.data?.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="text-center text-gray-500"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Spin />
      </div>
    );
  }

  const confirmUpdateStatus = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the status to VERIFIED?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the updateStatus function
        updateStatus();
      }
    });
  };

  const updateStatus = async () => {
    try {
      setIsLoading(true);

      const modifyStatus = {
        status: "VERIFIED",
        userId: currentUser?._id,
        userName: currentUser?.name,
        studentId: studentId,
      };

      const response = await axios.post(
        `${environment.apiPort}/api/update-student-status`,
        modifyStatus,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Success",
        text: response?.data?.message || "Status updated successfully.",
      });

      setIsLoading(false);
      fetchStudentData(); // Refresh data after updating
    } catch (error: any) {
      // Show error message
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to update status.",
      });

      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="container relative flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0 mt-5">
        <h2 className="mb-1 text-3xl font-extrabold leading-tight text-gray-900">
          {studentData?.name ? capitalizeName(studentData.name) : ""} Student
          Detail
        </h2>
        <div className="w-full">
          <div className="flex flex-col w-full mb-10 sm:flex-row">
            <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
              <div className="relative h-full ml-0 mr-0 sm:mr-10">
                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg"></span>
                <div className="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
                  <div className="flex items-center -mt-1">
                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">
                      {studentData?.name
                        ? capitalizeName(studentData.name)
                        : ""}{" "}
                      Student Detail
                    </h3>
                  </div>
                  <p className="mt-3 mb-1 text-xs font-medium text-indigo-500 uppercase">
                    ------------
                  </p>
                  <p className="mb-2 text-gray-600">
                    Name: <b>{studentData?.name}</b>
                  </p>
                  <p className="mb-2 text-gray-600">
                    Email: <b>{studentData?.email}</b>
                  </p>
                  <p className="mb-2 text-gray-600">
                    Mobile: <b>{studentData?.mobile}</b>
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2">
              <div className="relative h-full ml-0 md:mr-10">
                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-purple-500 rounded-lg" />
                <div className="relative h-full p-5 bg-white border-2 border-purple-500 rounded-lg">
                  <div className="flex items-center -mt-1">
                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">
                      Educational Details
                    </h3>
                  </div>
                  <p className="mt-3 mb-1 text-xs font-medium text-purple-500 uppercase">
                    ------------
                  </p>
                  <p className="mb-2 text-gray-600">
                    College: <b>{studentData?.college}</b>
                  </p>
                  <p className="mb-2 text-gray-600">
                    Course: <b>{studentData?.course}</b>
                  </p>
                  <p className="mb-2 text-gray-600">
                    Degree: <b>{studentData?.degree}</b>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full mb-10 sm:flex-row">
            <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
              <div className="relative h-full ml-0 mr-0 sm:mr-10">
                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-500 rounded-lg" />
                <div className="relative h-full p-5 bg-white border-2 border-green-500 rounded-lg">
                  <div className="flex items-center -mt-1">
                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">
                      Payment Detail
                    </h3>
                  </div>
                  <p className="mt-3 mb-1 text-xs font-medium text-green-500 uppercase">
                    ------------
                  </p>
                  {studentData?.referral ? (
                    <p className="mb-2 text-gray-600">
                      Referral: <b>{studentData?.referral}</b>
                    </p>
                  ) : null}

                  <p className="mb-2 text-gray-600">
                    Payment Mode: <b>{studentData?.paymentMode}</b>
                  </p>
                  <p className="mb-2 text-gray-600">
                    Status:{" "}
                    <b>
                      {" "}
                      <span
                        className={`${
                          studentData?.status === "NOT_VERIFIED"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {studentData?.status === "NOT_VERIFIED"
                          ? "Not Verified"
                          : "Verified"}
                      </span>
                    </b>
                  </p>
                  {studentData?.status === "NOT_VERIFIED" ? (
                    <button
                      className="bg-blue-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md ml-0 sm:ml-10"
                      style={{ width: "auto", display: "flex" }}
                      onClick={confirmUpdateStatus}
                      disabled={isLoading}
                    >
                      Update Status {isLoading ? <Spin /> : null}
                    </button>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
              <div className="relative h-full ml-0 mr-0 sm:mr-10">
                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-pink-500 rounded-lg" />
                <div className="relative h-full p-5 bg-white border-2 border-pink-500 rounded-lg">
                  <div className="flex items-center -mt-1">
                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">
                      Payment ScreenShot
                    </h3>
                  </div>
                  <p className="mt-3 mb-1 text-xs font-medium text-pink-500 uppercase">
                    ------------
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
