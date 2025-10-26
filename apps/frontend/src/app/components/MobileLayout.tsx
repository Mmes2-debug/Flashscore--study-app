
'use client';

import { useEffect, useState } from 'react';
import { useMobile } from '@/app/hooks/useMobile';

interface MobileLayoutProps {
  children: React.ReactNode;
}

export function MobileLayout({ children }: MobileLayoutProps) {
  const isMobile = useMobile();
  const [isPWA, setIsPWA] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Detect if running as PWA
    const isPWAMode = window.matchMedia('(display-mode: standalone)').matches ||
                      (window.navigator as any).standalone === true;
    setIsPWA(isPWAMode);

    // Set viewport height variable for mobile
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    
    // Mobile optimizations
    if (isMobile) {
      // Prevent pull-to-refresh on mobile
      document.body.style.overscrollBehavior = 'none';
      
      // Enable smooth scrolling
      document.documentElement.style.scrollBehavior = 'smooth';
      
      // Add mobile class to body
      document.body.classList.add('mobile-view');
    } else {
      document.body.classList.add('desktop-view');
    }
    
    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, [isMobile, mounted]);

  if (!mounted) {
    return <div className="loading-layout">{children}</div>;
  }

  return (
    <div 
      className={`responsive-layout ${isMobile ? 'mobile-mode' : 'desktop-mode'} ${isPWA ? 'pwa-mode' : ''}`}
      style={{
        minHeight: isMobile ? 'calc(var(--vh, 1vh) * 100)' : '100vh',
        width: '100%',
        overflow: 'auto'
      }}
    >
      {children}
    </div>
  );
}
