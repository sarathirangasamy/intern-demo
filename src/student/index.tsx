import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { environment } from '../environments/environment';
import './style.css'

interface RowData {
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
}

export const StudentList: React.FC = () => {
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
          id: student._id || index,
          name: student.name,
          email: student.email,
          mobile: student.mobile,
          college: student.college,
          degree: student.degree,
          course: student.course,
          dob: new Date(student.dob).toLocaleDateString(),
          poy: new Date(student.poy).toLocaleDateString(),
          paymentMode: student.paymentMode,
          referral: student.referral || "N/A",
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
      <h1 className="text-2xl font-bold mb-4">Student List</h1>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left border-b">Name</th>
                <th className="px-4 py-2 text-left border-b">Email</th>
                <th className="px-4 py-2 text-left border-b">Mobile</th>
                <th className="px-4 py-2 text-left border-b">College</th>
                <th className="px-4 py-2 text-left border-b">Degree</th>
                <th className="px-4 py-2 text-left border-b">Course</th>
                <th className="px-4 py-2 text-left border-b">Date of Birth</th>
                <th className="px-4 py-2 text-left border-b">Passing Year</th>
                <th className="px-4 py-2 text-left border-b">Payment Mode</th>
                <th className="px-4 py-2 text-left border-b">Referral</th>
              </tr>
            </thead>
            <tbody>
              {rowData.map((student) => (
                <tr key={student.id} className="border-b">
                  <td className="px-4 py-2">{student.name}</td>
                  <td className="px-4 py-2">{student.email}</td>
                  <td className="px-4 py-2">{student.mobile}</td>
                  <td className="px-4 py-2">{student.college}</td>
                  <td className="px-4 py-2">{student.degree}</td>
                  <td className="px-4 py-2">{student.course}</td>
                  <td className="px-4 py-2">{student.dob}</td>
                  <td className="px-4 py-2">{student.poy}</td>
                  <td className="px-4 py-2">{student.paymentMode}</td>
                  <td className="px-4 py-2">{student.referral}</td>
                </tr>
              ))}
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
