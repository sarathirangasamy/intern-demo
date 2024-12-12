import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RowData } from ".";

export const StudentDetail: React.FC = () => {
  const { studentId } = useParams();
  const [studentData, setStudentData] = useState<RowData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchStudentData();
  }, [studentId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!studentData) {
    return <div>No data found</div>;
  }

  return (
    <div>
      {/* <p>Name: {studentData.name}</p>
      <p>Email: {studentData.email}</p>
      <p>Mobile: {studentData.mobile}</p>
      <p>College: {studentData.college}</p>
      <p>Degree: {studentData.degree}</p>
      <p>Course: {studentData.course}</p>
      <p>Date of Birth: {studentData.dob}</p>
      <p>Passing Year: {studentData.poy}</p>
      <p>Payment Mode: {studentData.paymentMode}</p>
      <p>Referral: {studentData.referral || 'N/A'}</p> */}

      <div className="container relative flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0 mt-5">
        <h2 className="mb-1 text-3xl font-extrabold leading-tight text-gray-900">
          Student Detail
        </h2>
        <div className="w-full">
          <div className="flex flex-col w-full mb-10 sm:flex-row">
            <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
              <div className="relative h-full ml-0 mr-0 sm:mr-10">
                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg"></span>
                <div className="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
                  <div className="flex items-center -mt-1">
                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">
                      Student Detail
                    </h3>
                  </div>
                  <p className="mt-3 mb-1 text-xs font-medium text-indigo-500 uppercase">
                    ------------
                  </p>
                  <p className="mb-2 text-gray-600">
                    Name: <b>{studentData.name}</b>
                  </p>
                  <p className="mb-2 text-gray-600">
                    Email: <b>{studentData.email}</b>
                  </p>
                  <p className="mb-2 text-gray-600">
                    Mobile: <b>{studentData.mobile}</b>
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
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md ml-0 sm:ml-10"
                    style={{ width: "auto" }}
                  >
                    Update Status
                  </button>
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
