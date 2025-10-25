
export class PerformanceMonitor {
  private static marks = new Map<string, number>();

  static mark(name: string) {
    if (typeof window === 'undefined') return;
    this.marks.set(name, performance.now());
  }

  static measure(name: string, startMark: string) {
    if (typeof window === 'undefined') return;
    const start = this.marks.get(startMark);
    if (!start) return;
    
    const duration = performance.now() - start;
    console.log(`[Perf] ${name}: ${duration.toFixed(2)}ms`);
    
    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(name, duration);
    }
  }

  private static sendToAnalytics(name: string, duration: number) {
    // Implement analytics tracking here
    if ('sendBeacon' in navigator) {
      navigator.sendBeacon('/api/analytics', JSON.stringify({ name, duration }));
    }
  }

  static reportWebVitals(metric: any) {
    console.log(`[WebVitals] ${metric.name}: ${metric.value}`);
    
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(`web-vital-${metric.name}`, metric.value);
    }
  }
}

export function reportWebVitals(metric: any) {
  PerformanceMonitor.reportWebVitals(metric);
}
