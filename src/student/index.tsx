import axios from "axios";
import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";

import { environment } from "../environments/environment";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { Spin } from "../common-components/spin";

export interface RowData {
  id: string;
  name: string;
  email: string;
  mobile: string;
  college: string;
  degree: string;
  course: string;
  dob: string;
  poy: string;
  paymentMode: string;
  referral?: string;
  status?: string;
  paymentScreenShot?: string;
  createdAt?: string;
}

export const StudentList: React.FC = () => {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchStudents = async (currentPage: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${environment.apiPort}/api/student/details`,
        {
          params: { page: currentPage, limit: pageSize },
        }
      );
      const { data, totalPages } = response.data;

      setRowData(
        data.map((student: any, index: number) => ({
          id: student?._id || index,
          name: student?.name,
          email: student?.email,
          mobile: student?.mobile,
          college: student?.college,
          degree: student?.degree,
          course: student?.course,
          dob: new Date(student?.dob).toLocaleDateString(),
          poy: new Date(student?.poy).toLocaleDateString(),
          paymentMode: student?.paymentMode,
          referral: student?.referral || "N/A",
          status: student?.status || "Not Verified",
          createdAt: student?.createdAt || "N/A",
        }))
      );

      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on initial load and whenever `page` changes
  useEffect(() => {
    fetchStudents(page);
  }, [page]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Students List</h1>

      {loading ? (
        <div
          className="text-center text-gray-500"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Spin />
        </div>
      ) : (
        <div
          className="overflow-x-auto"
          style={{ fontFamily: "'Roboto', sans-serif" }}
        >
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left border-b">Name</th>
                <th className="px-4 py-2 text-left border-b">Email</th>
                <th className="px-4 py-2 text-left border-b">Mobile</th>
                <th className="px-4 py-2 text-left border-b">Date of Birth</th>
                <th className="px-4 py-2 text-left border-b">Passing Year</th>
                <th className="px-4 py-2 text-left border-b">Payment Mode</th>
                <th className="px-4 py-2 text-left border-b">Status</th>
                <th className="px-4 py-2 text-left border-b">Created At</th>
                <th className="px-4 py-2 text-left border-b flex items-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {rowData.length > 0 ? (
                rowData.map((student, index) => (
                  <tr
                    key={student?.id}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-2">{student?.name}</td>
                    <td className="px-4 py-2">{student?.email}</td>
                    <td className="px-4 py-2">{student?.mobile}</td>
                    <td className="px-4 py-2">{student?.dob}</td>
                    <td className="px-4 py-2">
                      {new Date(student?.poy).getFullYear()}
                    </td>
                    <td className="px-4 py-2">{student?.paymentMode}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`${
                          student?.status === "NOT_VERIFIED"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {student?.status === "NOT_VERIFIED"
                          ? "Not Verified"
                          : "Verified"}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {student?.createdAt &&
                        DateTime.fromISO(student?.createdAt).toFormat(
                          "dd MMM yyyy hh:mm a"
                        )}
                    </td>
                    <td
                      className="action-font"
                      onClick={() =>
                        navigate(`/home/student/detail/${student?.id}`)
                      }
                    >
                      View
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center p-6">
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-gray-500 text-lg">No data available</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-end items-center mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="custom-btn bg-gray-300 text-gray-700 text-sm rounded mr-1 disabled:opacity-50"
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="px-2 text-sm">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          className="custom-btn bg-gray-300 text-gray-700 text-sm rounded ml-1 disabled:opacity-50"
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
