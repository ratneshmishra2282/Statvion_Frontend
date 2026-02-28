"use client";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setAcademicYear } from "@/features/ui/ui.slice";
import { logout } from "@/features/auth/auth.slice";
import { ACADEMIC_YEARS } from "@/lib/constants";
import { useRouter } from "next/navigation";
import SchoolBrand from "./SchoolBrand";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";

export default function Header() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const academicYear = useAppSelector(
    (state) => state.ui.selectedAcademicYear
  );

  const handleLogout = () => {
    dispatch(logout());
    document.cookie = "accessToken=; path=/; max-age=0";
    router.push("/login");
  };

  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-6">
      <SchoolBrand />

      <div className="flex items-center gap-4">
        <Select
          value={academicYear}
          onValueChange={(v) => dispatch(setAcademicYear(v))}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ACADEMIC_YEARS.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem disabled>
              <User className="mr-2 h-4 w-4" />
              {user?.name}
            </DropdownMenuItem>
            <DropdownMenuItem disabled className="text-xs text-muted-foreground">
              {user?.role}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
