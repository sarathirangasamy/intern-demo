import { createSlice } from '@reduxjs/toolkit';

// import { LoginCheckApi } from "../api/api";
const backendURL = 'http://localhost:3000';


const initialState = {
  isPageLoaded: false,
  isAuthenticated: false,
  currentUser: null,
};

const sessionLogin = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    login: (state: any, action: any) => {
      state.isPageLoaded = true;
      state.isAuthenticated = true;
      state.currentUser = action?.payload;
    },
    logout: (state: any) => {
      state.isPageLoaded = true;
      state.isAuthenticated = false;
      state.currentUser = null;
    },
  },
});

export const { login, logout } = sessionLogin.actions;
export default sessionLogin.reducer;


export const initSession = () => async (dispatch: any) => {
  getLoginInfo(dispatch);
};

export const logoutSession = () => async (dispatch: any) => {
  dispatch(logout({} as any));
};

const getLoginInfo = async (dispatch: any) => {
  const wfmCookie = localStorage.getItem("userToken");
  if (wfmCookie) {
    dispatch(login({ id: "Welcome message from " } as any));
  } else {
    dispatch(logout({} as any));
  }


  // return;
  // LoginCheckApi()
  //   .then((data: any) => {
  //     if (data.status === "success") {
  //       dispatch(login(data?.data?.customer));
  //     } else {
  //       dispatch(logout());
  //     }
  //   })
  //   .catch((data: any) => {
  //     dispatch(logout());
  //   });
};