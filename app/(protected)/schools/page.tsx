"use client";

import { useAppSelector } from "@/store/hooks";
import { UserRole } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { School } from "lucide-react";

export default function SchoolsPage() {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== UserRole.SUPER_ADMIN) {
      router.replace("/no-permission");
    }
  }, [user, router]);

  if (!user || user.role !== UserRole.SUPER_ADMIN) {
    return null;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Schools</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder school cards */}
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <School className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">
                  Sample School {i}
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  school-{i}@example.com
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                This is a placeholder. Connect to the API to display real school
                data.
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
