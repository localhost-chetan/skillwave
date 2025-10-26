import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerSchool, sendResetOtp, resetPassword } from "@/services/schoolService";




export const signup = createAsyncThunk("auth/signup", async (data, { rejectWithValue }) => {
  try {
    if (!data) throw new Error("Signup data is missing");
    const response = await registerSchool(data);
    if (!response || !response.success) {
      throw new Error(response?.error || "Signup failed");
    }
    return response.data || {};
  } catch (error) {
    console.log("Signup thunk error:", error);
    return rejectWithValue(error.message || "Signup failed");
  }
});

export const sendOtp = createAsyncThunk("auth/sendOtp", async (phoneNumber, { rejectWithValue }) => {
  try {
    if (!phoneNumber) throw new Error("Phone number is missing");
    const response = await registerSchool({ phoneNumber }); // Adjust if separate OTP endpoint exists
    if (!response || !response.success) {
      throw new Error(response?.error || "OTP send failed");
    }
    return response.data || {};
  } catch (error) {
    console.log("Send OTP thunk error:", error);
    return rejectWithValue(error.message || "OTP send failed");
  }
});

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ phone, otp }, { rejectWithValue }) => {
    try {
      if (!phone || !otp) throw new Error("Phone or OTP is missing");
      // Simulate OTP verification (replace with actual API if needed)
      return { phone, otp };
    } catch (error) {
      console.log("Verify OTP thunk error:", error);
      return rejectWithValue(error.message || "OTP verification failed");
    }
  }
);

export const sendPasswordResetOtp = createAsyncThunk(
  "auth/sendResetOtp",
  async (phoneNumber, { rejectWithValue }) => {
    try {
      if (!phoneNumber) throw new Error("Phone number is missing");
      const response = await sendResetOtp(phoneNumber);
      if (!response || !response.success) {
        throw new Error(response?.error || "Reset OTP failed");
      }
      return response.data || {};
    } catch (error) {
      console.log("Send Reset OTP thunk error:", error);
      return rejectWithValue(error.message || "Reset OTP failed");
    }
  }
);

export const resetPasswordSubmit = createAsyncThunk(
  "auth/resetPassword",
  async ({ phoneNumber, otp, newPassword }, { rejectWithValue }) => {
    try {
      if (!phoneNumber || !otp || !newPassword) throw new Error("Missing required fields");
      const response = await resetPassword({ phoneNumber, otp, newPassword });
      if (!response || !response.success) {
        throw new Error(response?.error || "Password reset failed");
      }
      return response.data || {};
    } catch (error) {
      console.log("Reset Password thunk error:", error);
      return rejectWithValue(error.message || "Password reset failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload || null;
        state.error = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.error = action.payload || "OTP verification failed";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload || null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.payload || "Signup failed";
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.error = action.payload || "OTP send failed";
      })
      // .addCase(sendResetOtp.fulfilled, (state) => {
      //   state.error = null;
      // })
      // .addCase(sendResetOtp.rejected, (state, action) => {
      //   state.error = action.payload || "Reset OTP failed";
      // })
      // .addCase(resetPassword.fulfilled, (state, action) => {
      //   state.isAuthenticated = true;
      //   state.user = action.payload || null;
      //   state.error = null;
      // })
      // .addCase(resetPassword.rejected, (state, action) => {
      //   state.error = action.payload || "Password reset failed";
      // });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;