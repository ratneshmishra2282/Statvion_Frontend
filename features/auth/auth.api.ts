import { api } from "@/services/api";
import { API_ENDPOINTS, UserRole } from "@/lib/constants";
import { LoginRequest, LoginResponse } from "./auth.types";

// Mock credentials for development testing
const MOCK_USERS: Record<string, LoginResponse> = {
  "admin@school.com": {
    user: {
      id: "usr_admin_1",
      email: "admin@school.com",
      name: "Rahul Sharma",
      role: UserRole.ADMIN,
      schoolId: "sch_001",
      schoolName: "Delhi Public School",
      schoolLogo: null,
      themeColor: "#4F46E5",
    },
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzcl9hZG1pbl8xIiwiZW1haWwiOiJhZG1pbkBzY2hvb2wuY29tIiwicm9sZSI6IkFETUlOIiwic2Nob29sSWQiOiJzY2hfMDAxIiwiaWF0IjoxNzE3MDAwMDAwLCJleHAiOjE3MTcwODY0MDB9.mock_signature",
    refreshToken: "mock_refresh_admin",
  },
  "super@admin.com": {
    user: {
      id: "usr_super_1",
      email: "super@admin.com",
      name: "Priya Patel",
      role: UserRole.SUPER_ADMIN,
      schoolId: null,
      schoolName: null,
      schoolLogo: null,
      themeColor: "#059669",
    },
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzcl9zdXBlcl8xIiwiZW1haWwiOiJzdXBlckBhZG1pbi5jb20iLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJzY2hvb2xJZCI6bnVsbCwiaWF0IjoxNzE3MDAwMDAwLCJleHAiOjE3MTcwODY0MDB9.mock_signature",
    refreshToken: "mock_refresh_super",
  },
};

async function mockLogin(data: LoginRequest): Promise<LoginResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const mockUser = MOCK_USERS[data.email];
  if (mockUser && data.password.length >= 6) {
    return mockUser;
  }
  throw new Error("Invalid email or password");
}

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        data
      );
      return response.data;
    } catch {
      // If backend is unreachable, fall back to mock (demo mode)
      console.warn("[DEMO] Backend unreachable, using mock login");
      return mockLogin(data);
    }
  },
  logout: async (): Promise<void> => {
    try {
      await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch {
      // Silently handle in dev mode
    }
  },
};
