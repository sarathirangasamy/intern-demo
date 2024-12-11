import './style.css';

import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { initSession } from '../store/sessionUserReducer';

// import { login } from '../store/authActions';
const Login: React.FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("admin@blackflux.com");
  const [password, setPassword] = useState("123456");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`http://localhost:3333/user/login`, {
        email,
        password,
      });
  
      if (data?.token) {
        localStorage.setItem("userToken", data.token);
  
        setTimeout(() => {
          dispatch(initSession() as any);
        }, 2000);
      } else {
        console.error("Login failed, no token received.");
      }
    } catch (error: any) {
      console.error("An error occurred while logging in:", error);
      alert(error.message || "Login failed"); // Optionally display an alert to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
