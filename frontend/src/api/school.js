import axios from "axios";

const API_URL = "https://kys.udiseplus.gov.in/webapp/api";

export const searchSchool = async (query) => {
  const response = await axios.get(`${API_URL}/search-school/by-keyword`, {
    params: { schoolName: query },
  });
  return response.data;
};

export const signupSchool = async (data) => {
  // Placeholder for signup API
  const response = await axios.post(`${API_URL}/signup`, data);
  return response.data;
};

export const sendOtp = async (phone) => {
  // Placeholder for OTP API
  const response = await axios.post(`${API_URL}/send-otp`, { phone });
  return response.data;
};

export const verifyOtp = async (phone, otp) => {
  // Placeholder for OTP verification
  const response = await axios.post(`${API_URL}/verify-otp`, { phone, otp });
  return response.data;
};