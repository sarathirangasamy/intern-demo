import axios from "axios";

export const loginApi = async (data: any) => {
  return await axios({
    method: "post",
    url: "users/wfmLogin",
    data: {
      logonId: data?.userName,
      logonpwd: data?.password,
    },
  });
};

export const LoginCheckApi = async () => {
  return await axios({
    method: "get",
    url: "auth/get-user-info",
  });
};

