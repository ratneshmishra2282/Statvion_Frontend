"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setMobileSidebarOpen, toggleSidebar } from "@/features/ui/ui.slice";
import {
  SUPER_ADMIN_MENU,
  ADMIN_MENU,
  UserRole,
  type MenuItem,
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
  PanelLeftClose,
  PanelLeft,
  CalendarCheck,
  FileText,
  MessageCircle,
  Smartphone,
  Mail,
  ChevronDown,
  Receipt,
  History,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  School,
  GraduationCap,
  IndianRupee,
  MessageSquare,
  Settings,
  BarChart3,
  CalendarCheck,
  FileText,
  MessageCircle,
  Smartphone,
  Mail,
  Receipt,
  History,
};

function DesktopSidebar() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const user = useAppSelector((state) => state.auth.user);
  const collapsed = useAppSelector((state) => state.ui.sidebarCollapsed);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const menuItems =
    user?.role === UserRole.SUPER_ADMIN ? SUPER_ADMIN_MENU : ADMIN_MENU;

  const toggleExpanded = (label: string) => {
    setExpandedMenus((prev) =>
      prev.includes(label)
        ? prev.filter((l) => l !== label)
        : [...prev, label]
    );
  };

  const isMenuActive = (item: MenuItem) => {
    if (pathname === item.href || pathname.startsWith(item.href + "/")) return true;
    if (item.children) {
      return item.children.some(
        (child) => pathname === child.href || pathname.startsWith(child.href + "/")
      );
    }
    return false;
  };

  return (
    <aside
      className={cn(
        "hidden md:flex h-screen bg-card border-r flex-col transition-all duration-300 flex-shrink-0",
        collapsed ? "w-[68px]" : "w-64"
      )}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between border-b px-3">
        {!collapsed && (
          <span className="font-bold text-lg truncate">
            {user?.schoolName || "Statvion ERP"}
          </span>
        )}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className={cn(
            "p-2 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors",
            collapsed && "mx-auto"
          )}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeft className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = ICON_MAP[item.icon];
          const isActive = isMenuActive(item);
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedMenus.includes(item.label);

          if (hasChildren) {
            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleExpanded(item.label)}
                  className={cn(
                    "flex items-center w-full rounded-md transition-colors",
                    collapsed ? "justify-center p-2" : "gap-3 px-3 py-2",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-accent text-muted-foreground hover:text-foreground"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
                  {!collapsed && (
                    <>
                      <span className="text-sm flex-1 text-left">{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          isExpanded && "rotate-180"
                        )}
                      />
                    </>
                  )}
                </button>
                {!collapsed && isExpanded && (
                  <div className="ml-4 mt-1 space-y-1 border-l pl-2">
                    {item.children!.map((child) => {
                      const ChildIcon = ICON_MAP[child.icon];
                      const isChildActive =
                        pathname === child.href ||
                        pathname.startsWith(child.href + "/");
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                            isChildActive
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-accent text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {ChildIcon && <ChildIcon className="h-4 w-4 flex-shrink-0" />}
                          <span>{child.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-md transition-colors",
                collapsed ? "justify-center p-2" : "gap-3 px-3 py-2",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent text-muted-foreground hover:text-foreground"
              )}
              title={collapsed ? item.label : undefined}
            >
              {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
              {!collapsed && (
                <span className="text-sm">{item.label}</span>
              )}
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
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const menuItems =
    user?.role === UserRole.SUPER_ADMIN ? SUPER_ADMIN_MENU : ADMIN_MENU;

  const toggleExpanded = (label: string) => {
    setExpandedMenus((prev) =>
      prev.includes(label)
        ? prev.filter((l) => l !== label)
        : [...prev, label]
    );
  };

  const isMenuActive = (item: MenuItem) => {
    if (pathname === item.href || pathname.startsWith(item.href + "/")) return true;
    if (item.children) {
      return item.children.some(
        (child) => pathname === child.href || pathname.startsWith(child.href + "/")
      );
    }
    return false;
  };

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
            const isActive = isMenuActive(item);
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedMenus.includes(item.label);

            if (hasChildren) {
              return (
                <div key={item.label}>
                  <button
                    onClick={() => toggleExpanded(item.label)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors w-full",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-accent text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        isExpanded && "rotate-180"
                      )}
                    />
                  </button>
                  {isExpanded && (
                    <div className="ml-4 mt-1 space-y-1 border-l pl-2">
                      {item.children!.map((child) => {
                        const ChildIcon = ICON_MAP[child.icon];
                        const isChildActive =
                          pathname === child.href ||
                          pathname.startsWith(child.href + "/");
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => dispatch(setMobileSidebarOpen(false))}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                              isChildActive
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-accent text-muted-foreground hover:text-foreground"
                            )}
                          >
                            {ChildIcon && <ChildIcon className="h-4 w-4 flex-shrink-0" />}
                            <span>{child.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

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
