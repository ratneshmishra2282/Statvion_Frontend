import { UserRole } from "./constants";

const ROUTE_PERMISSIONS: Record<string, UserRole[]> = {
  "/schools": [UserRole.SUPER_ADMIN],
  "/reports": [UserRole.SUPER_ADMIN],
  "/students": [UserRole.ADMIN],
  "/students/add": [UserRole.ADMIN],
  "/fee": [UserRole.ADMIN],
  "/sms": [UserRole.ADMIN],
  "/master": [UserRole.ADMIN],
  "/dashboard": [UserRole.SUPER_ADMIN, UserRole.ADMIN],
};

export function hasPermission(pathname: string, role: UserRole): boolean {
  const matchingRoute = Object.keys(ROUTE_PERMISSIONS)
    .sort((a, b) => b.length - a.length)
    .find((route) => pathname.startsWith(route));

  if (!matchingRoute) return false;
  return ROUTE_PERMISSIONS[matchingRoute].includes(role);
}

export function getDefaultRoute(role: UserRole): string {
  switch (role) {
    case UserRole.SUPER_ADMIN:
      return "/dashboard";
    case UserRole.ADMIN:
      return "/dashboard";
    default:
      return "/login";
  }
}
