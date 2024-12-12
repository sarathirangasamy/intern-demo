import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';

import Login from '../auth/login';
import { InternRegisterForm } from '../auth/register';
import { Home } from '../home';
import { initSession } from '../store/sessionUserReducer';
import { StudentList } from '../student';
import { PrivateRoute } from './private-route';

export const AppRouter: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isPageLoaded } = useSelector(
    (state: any) => state?.userAuth
  );

  useEffect(() => {
    dispatch(initSession() as any);
  }, [dispatch]);

  const  currentUser  = useSelector((state: any) => state.userAuth);

  if (!isPageLoaded) {
    return (
      <div className="loader" style={{display:'flex', margin:'auto'}}>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/student-register" element={<InternRegisterForm />} />

        <Route path="/" element={<Outlet />}>
          {/* Public Route */}
          <Route index element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/home/dashboard" /> : <Login />
            }
          />

          <Route
            path="/home"
            element={<PrivateRoute isAuthenticated={isAuthenticated} />}
          >
            <Route path="dashboard" element={<Home />} />
            <Route path="student" element={<StudentList />} />
            <Route path="*" element={<p>404 Not Found</p>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
