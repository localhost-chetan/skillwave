import { searchSchool, signupSchool, sendOtp, verifyOtp } from "@/api/school";

export const searchSchoolService = async (query) => {
  try {
    // Only call API if query is 3+ characters
    if (query.length < 3) {
      return { success: false, error: "Please enter at least 3 characters to search" };
    }
    const data = await searchSchool(query);
    if (!data.status) {
      return { success: false, error: data.errorDetails?.details || "Search failed" };
    }
    return { success: true, data: data.data };
  } catch (error) {
    return { success: false, error: error.message || "Search failed" };
  }
};

export const signupService = async (formData) => {
  try {
    const data = await signupSchool(formData);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message || "Signup failed" };
  }
};

export const sendOtpService = async (phone) => {
  try {
    const data = await sendOtp(phone);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message || "OTP send failed" };
  }
};

export const verifyOtpService = async (phone, otp) => {
  try {
    const data = await verifyOtp(phone, otp);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message || "OTP verification failed" };
  }
};