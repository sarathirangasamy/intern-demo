import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the type for the login parameters
interface LoginParams {
  email: string;
  password: string;
}

// Define the response structure
interface LoginResponse {
  token: string;
}

const backendURL = 'http://localhost:3333';

export const userLogin = createAsyncThunk<
  LoginResponse,
  LoginParams,
  { rejectValue: string }
>('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post<LoginResponse>(
      `${backendURL}/user/login`,
      { email, password },
      config
    );

    localStorage.setItem('user Token', data.token);
    return data;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.data.message
    ) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue('error.message');
    }
  }
});
