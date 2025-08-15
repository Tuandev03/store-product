// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ====== 1. API ĐĂNG KÝ ======
export const signUpAsync = createAsyncThunk(
  "auth/signUpAsync",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post("https://api.escuelajs.co/api/v1/users/", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        avatar: "https://i.pravatar.cc/150?img=1",
      });
      return res.data; // Trả về thông tin user vừa đăng ký
    } catch (error) {
      return rejectWithValue(error.response?.data || "Đăng ký thất bại");
    }
  }
);

// ====== 2. API ĐĂNG NHẬP ======
export const signInAsync = createAsyncThunk(
  "auth/signInAsync",
  async (loginData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          email: loginData.email,
          password: loginData.password,
        }
      );

      // Lấy token xong, gọi API lấy thông tin user
      const profileRes = await axios.get(
        "https://api.escuelajs.co/api/v1/auth/profile",
        {
          headers: { Authorization: `Bearer ${res.data.access_token}` },
        }
      );

      return { ...profileRes.data, token: res.data.access_token };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Đăng nhập thất bại");
    }
  }
);

const initialState = {
  auth: null, // Lưu thông tin user + token
  loading: false,
  error: null,
};

// ====== 3. Slice ======
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.auth = null;
      localStorage.removeItem("auth"); // Xóa khỏi localStorage nếu muốn
    },
  },
  extraReducers: (builder) => {
    builder
      // ====== SIGN UP ======
      .addCase(signUpAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.auth = action.payload;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ====== SIGN IN ======
      .addCase(signInAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.auth = action.payload;
        localStorage.setItem("auth", JSON.stringify(action.payload)); // Lưu lại
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { signOut } = authSlice.actions;
export default authSlice.reducer;
