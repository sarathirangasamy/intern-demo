import { createSlice } from "@reduxjs/toolkit";
import { LoginCheckApi } from "../api/api";

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
      state.currentUser = action?.payload?.userInfo;
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

// export const userLoginReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "LOGIN":
//       return {
//         ...initialState,
//         authChecked: true,
//         isPageLoaded: true,
//         loggedIn: true,
//         currentUser: action.payload,
//       };
//     case "LOGOUT":
//       return {
//         ...initialState,
//         isPageLoaded: true,
//         loggedIn: false,
//         currentUser: null,
//       };
//     default:
//       return state;
//   }
// };

export const initSession = () => async (dispatch: any) => {
  getLoginInfo(dispatch);
};

export const logoutSession = () => async (dispatch: any) => {
  localStorage.removeItem("userToken");
  dispatch(logout({} as any));
};

const getLoginInfo = async (dispatch: any) => {
  const wfmCookie = localStorage.getItem("userToken");
  const userInfo = await getLoginApiInfo();
  if (wfmCookie) {
    dispatch(login({ userInfo: userInfo?.data?.user } as any));
  } else {
    dispatch(logout({} as any));
  }
};

const getLoginApiInfo = async () => {
  return await LoginCheckApi();
};
