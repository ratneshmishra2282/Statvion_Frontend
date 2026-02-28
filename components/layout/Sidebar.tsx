"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { toggleSidebar } from "@/features/ui/ui.slice";
import {
  SUPER_ADMIN_MENU,
  ADMIN_MENU,
  UserRole,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
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

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const collapsed = useAppSelector((state) => state.ui.sidebarCollapsed);
  const user = useAppSelector((state) => state.auth.user);

  const menuItems =
    user?.role === UserRole.SUPER_ADMIN ? SUPER_ADMIN_MENU : ADMIN_MENU;

  return (
    <aside
      className={cn(
        "h-screen bg-card border-r transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b">
        {!collapsed && (
          <span className="font-bold text-lg truncate">
            {user?.schoolName || "Statvion ERP"}
          </span>
        )}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-1 rounded hover:bg-accent"
        >
          <ChevronLeft
            className={cn(
              "h-5 w-5 transition-transform",
              collapsed && "rotate-180"
            )}
          />
        </button>
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
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent text-muted-foreground hover:text-foreground"
              )}
              title={collapsed ? item.label : undefined}
            >
              {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
