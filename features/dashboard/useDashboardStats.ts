import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "./dashboard.api";
import { useAppSelector } from "@/store/hooks";

export function useDashboardStats() {
  const academicYear = useAppSelector(
    (state) => state.ui.selectedAcademicYear
  );

  return useQuery({
    queryKey: ["dashboard", "stats", academicYear],
    queryFn: () => dashboardApi.getStats(academicYear),
    staleTime: 5 * 60 * 1000,
  });
}
