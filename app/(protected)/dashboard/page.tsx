"use client";

import { useDashboardStats } from "@/features/dashboard/useDashboardStats";
import StatCard from "@/components/dashboard/StatCard";
import { Users, UserPlus, IndianRupee, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { data: stats, isLoading, isError } = useDashboardStats();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[120px] rounded-xl" />
          ))}
        </div>
      ) : isError ? (
        <div className="text-destructive">Failed to load dashboard data.</div>
      ) : stats ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Students"
            value={stats.totalStudents}
            icon={Users}
          />
          <StatCard
            title="New Students"
            value={stats.newStudents}
            icon={UserPlus}
            description="This academic year"
          />
          <StatCard
            title="Fee Collected"
            value={`₹${stats.feeCollected.toLocaleString("en-IN")}`}
            icon={IndianRupee}
          />
          <StatCard
            title="Pending Fee"
            value={`₹${stats.pendingFee.toLocaleString("en-IN")}`}
            icon={AlertCircle}
          />
        </div>
      ) : null}
    </div>
  );
}
