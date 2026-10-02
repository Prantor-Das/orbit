"use client";

import { ThemeProvider } from "next-themes";
import React from "react";
import { SessionProvider } from "next-auth/react";
import Provider from "@/app/provider";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <Provider>{children}</Provider>
      </ThemeProvider>
    </SessionProvider>
  );
}
