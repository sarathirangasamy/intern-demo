import axios from "axios";

export const LoginCheckApi = async () => {
  return await axios({
    method: "get",
    url: "auth/get-user-info",
  });
};

