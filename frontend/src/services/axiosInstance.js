import axios from "axios";
import { API_URL } from "@/hooks/constants";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(new Error(error.message || "Request setup error"))
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = "An unexpected error occurred";
    if (error.response) {
      const { status, data } = error.response;
      if (status === 404) {
        errorMessage = data?.message || "API endpoint not found. Please check the URL.";
      } else if (status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        errorMessage = "Unauthorized access, redirecting to login";
      } else if (status >= 400 && status < 500) {
        errorMessage = data?.message || "Invalid request, please check your input";
      } else if (status >= 500) {
        errorMessage = data?.message || "Server error, please try again later";
      }
    } else if (error.request) {
      errorMessage = "No response from server, please check your network";
    } else {
      errorMessage = error.message || "Request setup error";
    }
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosInstance;