import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { api } from "@/api";
import { type ApiError, type AuthResponse, isApiError } from "@/types";

interface User {
  id: number;
  email: string;
  age?: number | null;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("accessToken"),
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: ApiError }
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post<AuthResponse>("/auth/login", data);
    return res.data;
  } catch (error: unknown) {
    if (error && typeof error === "object" && "response" in error) {
      const responseData = (error as any).response?.data;
      if (isApiError(responseData)) {
        return rejectWithValue(responseData);
      }
    }
  }
  const res = await api.post("/auth/login", data);
  return res.data;
});

export const registerUser = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: ApiError }
>("auth/register", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post<AuthResponse>("/auth/login", data);
    return res.data;
  } catch (error: unknown) {
    const responseData = (error as any).response?.data;
    if (isApiError(responseData)) {
      return rejectWithValue(responseData);
    }
  }
  const res = await api.post("/auth/register", data);
  return res.data;
});

export const fetchUserProfile = createAsyncThunk<
  User,
  void,
  { rejectValue: ApiError }
>("auth/me", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<User>("/auth/me");
    return res.data;
  } catch (error: unknown) {
    const responseData = (error as any).response?.data;
    if (isApiError(responseData)) {
      return rejectWithValue(responseData);
    }
  }
  const res = await api.get("/auth/me");
  return res.data;
});

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data: { oldPassword: string; newPassword: string }) => {
    await api.post("/auth/change-password", data);
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
