"use client";

import { useEffect } from "react";
import ReduxProvider from "./ReduxProvider";
import QueryProvider from "./QueryProvider";
import { Toaster } from "react-hot-toast";
import { setupInterceptors } from "@/services/axios.interceptor";
import ThemeProvider from "./ThemeProvider";

let interceptorsSetup = false;

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!interceptorsSetup) {
      setupInterceptors();
      interceptorsSetup = true;
    }
  }, []);

  return (
    <ReduxProvider>
      <QueryProvider>
        <ThemeProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: { background: "#363636", color: "#fff" },
              success: { duration: 3000 },
              error: { duration: 5000 },
            }}
          />
        </ThemeProvider>
      </QueryProvider>
    </ReduxProvider>
  );
}
