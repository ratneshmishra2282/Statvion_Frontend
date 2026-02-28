import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginResponse } from "./auth.types";

function getInitialState(): AuthState {
  if (typeof window === "undefined") {
    return {
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: true,
    };
  }
  const stored = localStorage.getItem("auth");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return { ...parsed, isLoading: false };
    } catch {
      return {
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
      };
    }
  }
  return {
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
  };
}

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    loginSuccess(state, action: PayloadAction<LoginResponse>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.isLoading = false;
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: state.user,
            accessToken: state.accessToken,
            refreshToken: state.refreshToken,
            isAuthenticated: true,
          })
        );
      }
    },
    setTokens(
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      if (typeof window !== "undefined") {
        const stored = JSON.parse(localStorage.getItem("auth") || "{}");
        stored.accessToken = action.payload.accessToken;
        stored.refreshToken = action.payload.refreshToken;
        localStorage.setItem("auth", JSON.stringify(stored));
      }
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth");
      }
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { loginSuccess, setTokens, logout, setLoading } =
  authSlice.actions;
export default authSlice.reducer;
