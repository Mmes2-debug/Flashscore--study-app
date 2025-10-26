
"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import LoadingSkeleton from './LoadingSkeleton';

// Dynamically import all heavy components
const NavBar = dynamic(() => import('./NavBar'), {
  loading: () => <LoadingSkeleton />,
  ssr: false
});

const BottomNavigation = dynamic(() => import('./BottomNavigation'), {
  loading: () => <LoadingSkeleton />,
  ssr: false
});

const AppDrawer = dynamic(() => import('./AppDrawer'), {
  loading: () => <LoadingSkeleton />,
  ssr: false
});

const MobileOptimizationWrapper = dynamic(() => import('./MobileOptimizationWrapper'), {
  loading: () => <LoadingSkeleton />,
  ssr: false
});

const SessionProvider = dynamic(() => import('@/app/providers/SessionProvider').then(mod => mod.SessionProvider), {
  loading: () => <LoadingSkeleton />,
  ssr: false
});

const UserPreferencesProvider = dynamic(() => import('@/app/providers/UserPreferencesProvider').then(mod => mod.UserPreferencesProvider), {
  loading: () => <LoadingSkeleton />,
  ssr: false
});

interface DIYFProps {
  children: React.ReactNode;
}

export function DIYF({ children }: DIYFProps) {
  const pathname = usePathname();
  
  // Check if we're on an auth page
  const isAuthPage = pathname?.includes('/auth/');
  
  // For auth pages, skip all navigation wrappers
  if (isAuthPage) {
    return (
      <MobileOptimizationWrapper>
        <SessionProvider>
          <UserPreferencesProvider>
            {children}
          </UserPreferencesProvider>
        </SessionProvider>
      </MobileOptimizationWrapper>
    );
  }
  
  // For regular pages, include all navigation
  return (
    <MobileOptimizationWrapper>
      <SessionProvider>
        <UserPreferencesProvider>
          <NavBar />
          <AppDrawer />
          <div className="pt-16 pb-20 md:pb-0" style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}>
            {children}
          </div>
          <BottomNavigation />
        </UserPreferencesProvider>
      </SessionProvider>
    </MobileOptimizationWrapper>
  );
}
