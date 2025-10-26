import { searchSchool, signupSchool, sendOtp, verifyOtp } from "@/api/school";

export const searchSchoolService = async (query) => {
  if (query.length < 3) {
    return { success: false, error: "School name must be at least 3 characters" };
  }
  try {
    const data = await searchSchool(query);
    return { success: true, data: data.data || [] };
  } catch (error) {
    return { success: false, error: error.response?.data?.errorDetails?.details || "Search failed" };
  }
};

export const signupService = async (formData) => {
  try {
    const data = await signupSchool(formData);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.response?.data?.message || "Signup failed" };
  }
};

export const sendOtpService = async (phone) => {
  try {
    const data = await sendOtp(phone);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.response?.data?.message || "OTP send failed" };
  }
};

export const verifyOtpService = async (phone, otp) => {
  try {
    const data = await verifyOtp(phone, otp);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.response?.data?.message || "OTP verification failed" };
  }
};