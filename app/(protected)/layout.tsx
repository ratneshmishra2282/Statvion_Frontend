import AuthGuard from "@/components/guards/AuthGuard";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { UserRole } from "@/lib/constants";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedRoles={[UserRole.SUPER_ADMIN, UserRole.ADMIN]}>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto p-4 md:p-6 bg-background">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
