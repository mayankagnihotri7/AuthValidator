import axios from "axios";

const login = payload =>
  axios.post("/api/v1/session", {
    login: payload,
  });

const signup = payload =>
  axios.post("/api/v1/users", {
    user: payload,
  });

const authApi = {
  signup,
  login,
};

export default authApi;
