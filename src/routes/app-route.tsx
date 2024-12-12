import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Login from '../auth/login';
import { InternRegisterForm } from '../auth/register';
import { Spin } from '../common-components/spin';
import { Home } from '../home';
import { initSession } from '../store/sessionUserReducer';
import { StudentList } from '../student';
import { StudentDetail } from '../student/student-detail';
import { PrivateRoute } from './private-route';

export const AppRouter: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isPageLoaded } = useSelector(
    (state: any) => state?.userAuth
  );

  useEffect(() => {
    dispatch(initSession() as any);
  }, [dispatch]);

  if (!isPageLoaded) {
    return (
      <div className="loader">
        <Spin />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<InternRegisterForm />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/home/dashboard" /> : <Login />
          }
        />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
          <Route path="dashboard" element={<Home />} />
          <Route path="student" element={<StudentList />} />
          <Route path="student/detail/:studentId" element={<StudentDetail />} />
          <Route path="*" element={<p>404 Not Found</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
