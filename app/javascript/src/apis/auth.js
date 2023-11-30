import axios from "axios";

const signup = payload =>
  axios.post("/api/v1/users", {
    user: payload,
  });

const authApi = {
  signup,
};

export default authApi;
