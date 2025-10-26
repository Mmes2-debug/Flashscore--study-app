
'use client';

import { useEffect } from 'react';

export function AmazonStylePerformanceMonitor() {
  useEffect(() => {
    // Amazon-style performance monitoring
    const measurePerformance = () => {
      // Core Web Vitals (Amazon's key metrics)
      if ('PerformanceObserver' in window) {
        // Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('[Amazon Metric] LCP:', lastEntry.renderTime || lastEntry.loadTime);
          
          // Send to analytics (Amazon sends everything to CloudWatch)
          if (lastEntry.renderTime > 2500) {
            console.warn('⚠️ LCP exceeds Amazon target (2.5s)');
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            console.log('[Amazon Metric] FID:', entry.processingStart - entry.startTime);
            if (entry.processingStart - entry.startTime > 100) {
              console.warn('⚠️ FID exceeds Amazon target (100ms)');
            }
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
              console.log('[Amazon Metric] CLS:', clsValue);
              if (clsValue > 0.1) {
                console.warn('⚠️ CLS exceeds Amazon target (0.1)');
              }
            }
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      }

      // Time to Interactive (TTI) - Amazon's mobile priority
      if (window.performance && window.performance.timing) {
        const tti = performance.timing.domInteractive - performance.timing.navigationStart;
        console.log('[Amazon Metric] TTI:', tti, 'ms');
        if (tti > 3800) {
          console.warn('⚠️ TTI exceeds Amazon mobile target (3.8s)');
        }
      }

      // Network quality detection (Amazon adapts based on connection)
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        console.log('[Amazon Network]', {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
          saveData: connection.saveData
        });
      }

      // Memory pressure detection (Amazon kills features on low memory)
      if ('deviceMemory' in navigator) {
        const memory = (navigator as any).deviceMemory;
        console.log('[Amazon Device] Memory:', memory, 'GB');
        if (memory < 2) {
          console.warn('⚠️ Low memory device - enabling lite mode');
          document.body.classList.add('amazon-lite-mode');
        }
      }
    };

    // Run on load and after hydration
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
    }

    // Amazon's "Speed Score" - composite metric
    const calculateSpeedScore = () => {
      const paint = performance.getEntriesByType('paint');
      const fcp = paint.find(p => p.name === 'first-contentful-paint');
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (fcp && navigation) {
        const score = {
          FCP: fcp.startTime,
          DOMContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          TotalLoad: navigation.loadEventEnd - navigation.loadEventStart
        };
        console.log('[Amazon Speed Score]', score);
      }
    };

    window.addEventListener('load', calculateSpeedScore);

    return () => {
      window.removeEventListener('load', measurePerformance);
      window.removeEventListener('load', calculateSpeedScore);
    };
  }, []);

  return null;
}
