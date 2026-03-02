"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setMobileSidebarOpen } from "@/features/ui/ui.slice";
import {
  SUPER_ADMIN_MENU,
  ADMIN_MENU,
  UserRole,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  LayoutDashboard,
  School,
  GraduationCap,
  IndianRupee,
  MessageSquare,
  Settings,
  BarChart3,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  School,
  GraduationCap,
  IndianRupee,
  MessageSquare,
  Settings,
  BarChart3,
};

function DesktopSidebar() {
  const pathname = usePathname();
  const user = useAppSelector((state) => state.auth.user);

  const menuItems =
    user?.role === UserRole.SUPER_ADMIN ? SUPER_ADMIN_MENU : ADMIN_MENU;

  return (
    <aside className="hidden md:flex h-screen w-16 bg-card border-r flex-col">
      <div className="h-16 flex items-center justify-center border-b">
        <span className="font-bold text-lg">
          {user?.schoolName?.charAt(0)?.toUpperCase() || "S"}
        </span>
      </div>

      <nav className="flex-1 py-4 space-y-1 px-2">
        {menuItems.map((item) => {
          const Icon = ICON_MAP[item.icon];
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-center p-2 rounded-md transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent text-muted-foreground hover:text-foreground"
              )}
              title={item.label}
            >
              {Icon && <Icon className="h-5 w-5" />}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

function MobileSidebar() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const open = useAppSelector((state) => state.ui.mobileSidebarOpen);
  const user = useAppSelector((state) => state.auth.user);

  const menuItems =
    user?.role === UserRole.SUPER_ADMIN ? SUPER_ADMIN_MENU : ADMIN_MENU;

  return (
    <Sheet open={open} onOpenChange={(v) => dispatch(setMobileSidebarOpen(v))}>
      <SheetContent side="left" className="w-64 p-0">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="h-16 flex items-center px-4 border-b">
          <span className="font-bold text-lg truncate">
            {user?.schoolName || "Statvion ERP"}
          </span>
        </div>
        <nav className="flex-1 py-4 space-y-1 px-2">
          {menuItems.map((item) => {
            const Icon = ICON_MAP[item.icon];
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => dispatch(setMobileSidebarOpen(false))}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent text-muted-foreground hover:text-foreground"
                )}
              >
                {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default function Sidebar() {
  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
}
