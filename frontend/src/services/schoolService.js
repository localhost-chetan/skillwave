import { API_URL, SCHOOL_API_URL } from "@/hooks/constants";
import axiosInstance from "./axiosInstance";

export const registerSchool = async (data) => {
  try {
    if (!data) throw new Error("Data is missing");
    const response = await axiosInstance.post("/signup", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.log("registerSchool error:", error);
    return {
      success: false,
      error: error.message || "Failed to register school",
    };
  }
};


export const searchSchoolByName = async (query) => {
  try {
    if (!query) throw new Error("Query is missing");
     const response = await axiosInstance.get(`${SCHOOL_API_URL}/search-school/by-keyword`, {
    params: { schoolName: query },
  });
    return { success: true, data: response.data };
  } catch (error) {
    console.log("searchSchoolService error:", error);
    return {
      success: false,
      error: error.message || "Failed to search schools",
    };
  }
};


export const sendOtpToSchool = async (phone) => {
  try {
  const response = await axiosInstance.post(`${API_URL}/send-otp`, { phone });
  return { success: true, data: response.data };
  }
  catch (error) {
    return {
      success: false,
      error: error.message, 
    };
  }
};


export const verifyOtpForSchool = async (phone, otp) => {
  try {
  const response = await axiosInstance.post(`${API_URL}/verify-otp`, { phone, otp });
  return { success: true, data: response.data };
  }
  catch (error) {
    return {
      success: false,
      error: error.message, 
    };
  }
};

export const resetPassword = async ({ phoneNumber, otp, newPassword }) => {
  try {
    if (!phoneNumber || !otp || !newPassword) throw new Error("Missing required fields");
    const response = await axiosInstance.post("/reset-password", {
      phoneNumber,
      otp,
      newPassword,
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.log("resetPassword error:", error);
    return {
      success: false,
      error: error.message || "Failed to reset password",
    };
  }
};


export const sendResetOtp = async (phoneNumber) => {
  try {
    if (!phoneNumber) throw new Error("Phone number is missing");
    const response = await axiosInstance.post("/send-reset-otp", { phoneNumber });
    return { success: true, data: response.data };
  } catch (error) {
    console.log("sendResetOtp error:", error);
    return {
      success: false,
      error: error.message || "Failed to send reset OTP",
    };
  }
};

