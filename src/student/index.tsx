import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { environmentForStudent } from '../environments/environment.stag'; 

interface RowData {
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

interface ApiResponse {
  message: string;
  data: RowData[]; 
}

export const StudentList: React.FC = () => {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get<ApiResponse>(environmentForStudent.getstudent);
        const students = response.data.data || []; 

        setRowData(
          students.map((student) => ({
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
      } catch (error) {
        console.error("Error fetching student details:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchStudents();
  }, []); 

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', overflowX: 'auto' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '20px',
        }}
      >
        <thead>
          <tr>
            <th style={headerStyle}>Name</th>
            <th style={headerStyle}>Email</th>
            <th style={headerStyle}>Mobile</th>
            <th style={headerStyle}>College</th>
            <th style={headerStyle}>Degree</th>
            <th style={headerStyle}>Course</th>
            <th style={headerStyle}>Date of Birth</th>
            <th style={headerStyle}>Passing Year</th>
            <th style={headerStyle}>Payment Mode</th>
            <th style={headerStyle}>Referral</th>
          </tr>
        </thead>
        <tbody>
          {rowData.map((student, index) => (
            <tr key={index}>
              <td style={cellStyle}>{student.name}</td>
              <td style={cellStyle}>{student.email}</td>
              <td style={cellStyle}>{student.mobile}</td>
              <td style={cellStyle}>{student.college}</td>
              <td style={cellStyle}>{student.degree}</td>
              <td style={cellStyle}>{student.course}</td>
              <td style={cellStyle}>{student.dob}</td>
              <td style={cellStyle}>{student.poy}</td>
              <td style={cellStyle}>{student.paymentMode}</td>
              <td style={cellStyle}>{student.referral}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Styles
const headerStyle: React.CSSProperties = {
  padding: '10px',
  border: '1px solid #ddd',
  backgroundColor: '#f4f4f4',
  textAlign: 'left',
  fontWeight: 'bold',
};

const cellStyle: React.CSSProperties = {
  padding: '10px',
  border: '1px solid #ddd',
  textAlign: 'left',
};

