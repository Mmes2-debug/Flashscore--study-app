"use client";

import React from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { LoadingSkeleton } from "./LoadingSkeleton";
// Import providers normally - they're needed immediately
import { SessionProvider } from "@/app/providers/SessionProvider";
import { UserPreferencesProvider } from "@/app/providers/UserPreferencesProvider";

// Only dynamic import UI components
const NavBar = dynamic(() => import("./NavBar").then(mod => ({ default: mod.NavBar })), {
  loading: () => <LoadingSkeleton />,
  ssr: false,
});

const BottomNavigation = dynamic(() => import("./BottomNavigation").then(mod => ({ default: mod.BottomNavigation })), {
  loading: () => <LoadingSkeleton />,
  ssr: false,
});

const MobileOptimizationWrapper = dynamic(
  () => import("./MobileOptimizationWrapper").then(mod => ({ default: mod.MobileOptimizationWrapper })),
  {
    loading: () => <LoadingSkeleton />,
    ssr: false,
  },
);

interface DIYFProps {
  children: React.ReactNode;
}

export function DIYF({ children }: DIYFProps) {
  const pathname = usePathname();
  const isAuthPage = pathname?.includes("/auth/");

  if (isAuthPage) {
    return (
      <MobileOptimizationWrapper>
        <SessionProvider>
          <UserPreferencesProvider>{children}</UserPreferencesProvider>
        </SessionProvider>
      </MobileOptimizationWrapper>
    );
  }

  return (
    <MobileOptimizationWrapper>
      <SessionProvider>
        <UserPreferencesProvider>
          <NavBar />
          <div
            className="pt-16 pb-20 md:pb-0"
            style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}
          >
            {children}
          </div>
          <BottomNavigation />
        </UserPreferencesProvider>
      </SessionProvider>
    </MobileOptimizationWrapper>
  );
}
