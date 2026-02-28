import { api } from "@/services/api";
import { API_ENDPOINTS } from "@/lib/constants";
import { DashboardStats } from "./dashboard.types";

const MOCK_STATS: DashboardStats = {
  totalStudents: 1247,
  newStudents: 86,
  feeCollected: 2450000,
  pendingFee: 375000,
};

export const dashboardApi = {
  getStats: async (academicYear: string): Promise<DashboardStats> => {
    try {
      const response = await api.get<DashboardStats>(
        API_ENDPOINTS.DASHBOARD.STATS,
        { params: { academicYear } }
      );
      return response.data;
    } catch {
      if (process.env.NODE_ENV === "development") {
        console.warn("[DEV] Using mock dashboard stats");
        await new Promise((r) => setTimeout(r, 500));
        return MOCK_STATS;
      }
      throw new Error("Failed to fetch dashboard stats");
    }
  },
};
