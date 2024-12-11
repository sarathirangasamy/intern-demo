import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userLogin } from './authActions';

interface AuthState {
  loading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userInfo: any | null;
  userToken: string | null;
  error: string | null;
  success: boolean;
}

// Initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const initialState: AuthState = {
  loading: false,
  userInfo: null,
  userToken: userToken,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    console.log(userLogin,'userLogin')
    // login user
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(userLogin.fulfilled, (state, action: any) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.userToken = action.payload.userToken; // Adjust if userToken is part of userInfo
        state.success = true; // Optionally set success to true
      })
      .addCase(
        userLogin.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || 'Login failed';
        }
      );
    // You can add additional cases for the register user and other actions here...
  },
});

export default authSlice.reducer;
