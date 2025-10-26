import axios from "../utils/axiosInstance";

export const registerUser = async (data) => {
  return axios.post("/auth/register", data);
};

export const loginUser = async (data) => {
  return axios.post("/auth/login", data);
};

export const logoutUser = async () => {
  return axios.post("/auth/logout");
};