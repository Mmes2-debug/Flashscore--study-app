
export class PerformanceMonitor {
  private static marks = new Map<string, number>();
  private static predictionMetrics = new Map<string, number[]>();

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
    
    // Track prediction-specific metrics
    if (name.includes('prediction') || name.includes('ml')) {
      this.trackPredictionMetric(name, duration);
    }
    
    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(name, duration);
    }
  }

  private static trackPredictionMetric(name: string, duration: number) {
    const metrics = this.predictionMetrics.get(name) || [];
    metrics.push(duration);
    
    // Keep only last 100 measurements
    if (metrics.length > 100) {
      metrics.shift();
    }
    
    this.predictionMetrics.set(name, metrics);
  }

  static getPredictionStats(metricName: string) {
    const metrics = this.predictionMetrics.get(metricName);
    if (!metrics || metrics.length === 0) return null;

    const sorted = [...metrics].sort((a, b) => a - b);
    const avg = metrics.reduce((a, b) => a + b, 0) / metrics.length;
    const p50 = sorted[Math.floor(sorted.length * 0.5)];
    const p95 = sorted[Math.floor(sorted.length * 0.95)];
    const p99 = sorted[Math.floor(sorted.length * 0.99)];

    return { avg, p50, p95, p99, count: metrics.length };
  }

  static trackPredictionAccuracy(userId: string, predictionId: string, wasCorrect: boolean) {
    const metricName = `prediction_accuracy_${userId}`;
    const value = wasCorrect ? 1 : 0;
    
    this.trackPredictionMetric(metricName, value);
    
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(metricName, value);
    }
  }

  static trackMLModelLatency(modelName: string, latency: number) {
    const metricName = `ml_model_${modelName}_latency`;
    this.trackPredictionMetric(metricName, latency);
    
    if (latency > 2000) {
      console.warn(`[Perf] ML model ${modelName} took ${latency}ms - consider optimization`);
    }
  }

  private static sendToAnalytics(name: string, duration: number) {
    // Implement analytics tracking here
    if ('sendBeacon' in navigator) {
      navigator.sendBeacon('/api/analytics', JSON.stringify({ 
        type: 'performance',
        name, 
        duration,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
      }));
    }
  }

  static reportWebVitals(metric: any) {
    console.log(`[WebVitals] ${metric.name}: ${metric.value}`);
    
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(`web-vital-${metric.name}`, metric.value);
    }
  }

  static clearPredictionMetrics() {
    this.predictionMetrics.clear();
  }
}

export function reportWebVitals(metric: any) {
  PerformanceMonitor.reportWebVitals(metric);
}

// Export prediction-specific helpers
export const trackPrediction = (userId: string, predictionId: string, wasCorrect: boolean) => {
  PerformanceMonitor.trackPredictionAccuracy(userId, predictionId, wasCorrect);
};

export const trackMLLatency = (modelName: string, latency: number) => {
  PerformanceMonitor.trackMLModelLatency(modelName, latency);
};

export const getPredictionPerformance = (metricName: string) => {
  return PerformanceMonitor.getPredictionStats(metricName);
};
