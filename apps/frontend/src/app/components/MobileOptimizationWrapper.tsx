
'use client';

import { useEffect, useState } from 'react';

export function MobileOptimizationWrapper({ children }: { children: React.ReactNode }) {
  const [isOptimized, setIsOptimized] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    if (isMobile) {
      // Apply mobile-specific optimizations
      document.body.classList.add('mobile-optimized');
      
      // Disable hover effects on mobile
      const style = document.createElement('style');
      style.textContent = `
        @media (hover: none) and (pointer: coarse) {
          .hover\\:scale-105:hover { transform: none !important; }
          .hover\\:shadow-lg:hover { box-shadow: none !important; }
          .hover-lift:hover { transform: none !important; }
        }
      `;
      document.head.appendChild(style);

      // Optimize touch targets
      document.documentElement.style.setProperty('--touch-target-min', '44px');
      
      // Enable momentum scrolling
      document.body.style.webkitOverflowScrolling = 'touch';
      
      // Prevent zoom on input focus
      const viewport = document.querySelector('meta[name=viewport]');
      if (viewport && viewport instanceof HTMLMetaElement) {
        viewport.setAttribute('content', 
          'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover'
        );
      }

      // Set custom viewport height for mobile browsers
      const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };
      setVH();
      window.addEventListener('resize', setVH);
      window.addEventListener('orientationchange', setVH);

      setIsOptimized(true);

      return () => {
        window.removeEventListener('resize', setVH);
        window.removeEventListener('orientationchange', setVH);
      };
    }
  }, []);

  return <>{children}</>;
}
