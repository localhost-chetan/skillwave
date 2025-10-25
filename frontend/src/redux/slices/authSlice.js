import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginService, signupService } from "../../services/authService";

export const login = createAsyncThunk("auth/login", async (formData, { rejectWithValue }) => {
  const res = await loginService(formData);
  if (!res.success) return rejectWithValue(res.error);
  return res.data;
});

export const signup = createAsyncThunk("auth/signup", async (formData, { rejectWithValue }) => {
  const res = await signupService(formData);
  if (!res.success) return rejectWithValue(res.error);
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => { 
        state.loading = false; 
        state.user = action.payload; 
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // signup
      .addCase(signup.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(signup.fulfilled, (state) => { state.loading = false; })
      .addCase(signup.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
