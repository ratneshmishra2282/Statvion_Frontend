import { api } from "./api";
import { store } from "@/store/store";
import { logout, setTokens } from "@/features/auth/auth.slice";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

export function setupInterceptors() {
  api.interceptors.request.use(
    (config) => {
      const state = store.getState();
      const token = state.auth.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      const schoolId = state.auth.user?.schoolId;
      if (schoolId) {
        config.headers["X-School-Id"] = schoolId;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const refreshToken = store.getState().auth.refreshToken;
          const response = await api.post(
            "/auth/refresh",
            { refreshToken },
            { _retry: true } as any
          );
          const { accessToken, refreshToken: newRefreshToken } = response.data;
          store.dispatch(
            setTokens({ accessToken, refreshToken: newRefreshToken })
          );
          processQueue(null, accessToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          store.dispatch(logout());
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      if (error.response?.status === 403) {
        if (typeof window !== "undefined") {
          window.location.href = "/no-permission";
        }
      }

      if (error.response?.status === 500) {
        if (typeof window !== "undefined") {
          window.location.href = "/error";
        }
      }

      return Promise.reject(error);
    }
  );
}
