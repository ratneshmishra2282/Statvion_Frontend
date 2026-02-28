import { UserRole } from "@/lib/constants";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  schoolId: string | null;
  schoolName: string | null;
  schoolLogo: string | null;
  themeColor: string | null;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
