export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
}

export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  NO_PERMISSION: "/no-permission",
  ERROR: "/error",
  SCHOOLS: "/schools",
  STUDENTS: "/students",
  ADD_STUDENT: "/students/add",
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
  },
  SCHOOLS: {
    LIST: "/schools",
    DETAIL: (id: string) => `/schools/${id}`,
    BRANDING: (id: string) => `/schools/${id}/branding`,
  },
  STUDENTS: {
    LIST: "/students",
    DETAIL: (id: string) => `/students/${id}`,
    CREATE: "/students",
    UPDATE: (id: string) => `/students/${id}`,
    DELETE: (id: string) => `/students/${id}`,
  },
  DASHBOARD: {
    STATS: "/dashboard/stats",
  },
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

export type MenuItem = {
  label: string;
  href: string;
  icon: string;
  children?: { label: string; href: string; icon: string }[];
};

export const SUPER_ADMIN_MENU: MenuItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Schools", href: "/schools", icon: "School" },
  { label: "Reports", href: "/reports", icon: "BarChart3" },
];

export const ADMIN_MENU: MenuItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Students", href: "/students", icon: "GraduationCap" },
  { label: "Attendance", href: "/attendance", icon: "CalendarCheck" },
  { label: "Fees", href: "/fees", icon: "IndianRupee" },
  { label: "Exams", href: "/exams", icon: "FileText" },
  {
    label: "Communication",
    href: "/communication",
    icon: "MessageSquare",
    children: [
      { label: "WhatsApp", href: "/communication/whatsapp", icon: "MessageCircle" },
      { label: "SMS", href: "/communication/sms", icon: "Smartphone" },
      { label: "Email", href: "/communication/email", icon: "Mail" },
    ],
  },
];

export const ACADEMIC_YEARS = [
  "2024-2025",
  "2025-2026",
  "2026-2027",
] as const;
