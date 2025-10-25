import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signupService, sendOtpService, verifyOtpService } from "@/services/schoolService";

export const signup = createAsyncThunk("auth/signup", async (formData, { rejectWithValue }) => {
  const res = await signupService(formData);
  if (!res.success) return rejectWithValue(res.error);
  return res.data;
});

export const sendOtp = createAsyncThunk("auth/sendOtp", async (phone, { rejectWithValue }) => {
  const res = await sendOtpService(phone);
  if (!res.success) return rejectWithValue(res.error);
  return res.data;
});

export const verifyOtp = createAsyncThunk("auth/verifyOtp", async ({ phone, otp }, { rejectWithValue }) => {
  const res = await verifyOtpService(phone, otp);
  if (!res.success) return rejectWithValue(res.error);
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
    otpSent: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.otpSent = false;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(signup.fulfilled, (state) => { state.loading = false; })
      .addCase(signup.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(sendOtp.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(sendOtp.fulfilled, (state) => { state.loading = false; state.otpSent = true; })
      .addCase(sendOtp.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(verifyOtp.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(verifyOtp.fulfilled, (state, action) => { 
        state.loading = false; 
        state.user = action.payload; 
        state.otpSent = false;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(verifyOtp.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;