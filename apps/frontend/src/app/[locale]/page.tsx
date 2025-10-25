"use client";

import React, { Suspense, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { EnhancedErrorBoundary } from '@/app/components/EnhancedErrorBoundary';

// Clean loading skeleton that matches the content
const CleanSkeleton = ({ height = 'h-64' }: { height?: string }) => (
  <div className={`${height} bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg animate-pulse`} />
);

// Temporary: These components will be loaded as they become available
// Wrapping in try-catch to prevent build failures
const lazyLoadComponent = (importFn: () => Promise<any>) => {
  return React.lazy(() => 
    importFn().catch(() => ({ default: () => null }))
  );
};

const ErrorMonitor = lazyLoadComponent(() => 
  import('@/app/components/ErrorMonitor').then(m => ({ default: m.ErrorMonitor }))
);
const BackendHealthMonitor = lazyLoadComponent(() => 
  import('@/app/components/BackendHealthMonitor').then(m => ({ default: m.BackendHealthMonitor }))
);
const FeatureShowcase = lazyLoadComponent(() => 
  import('@/app/components/FeatureShowcase').then(m => ({ default: m.FeatureShowcase }))
);
const SmartNewsFeed = lazyLoadComponent(() => 
  import('@/app/components/SmartNewsFeed').then(m => ({ default: m.SmartNewsFeed }))
);
const LiveMatchTracker = lazyLoadComponent(() => 
  import('@/app/components/LiveMatchTracker').then(m => ({ default: m.LiveMatchTracker }))
);
const PredictionInterface = lazyLoadComponent(() => 
  import('@/app/components/PredictionInterface').then(m => ({ default: m.PredictionInterface }))
);

export default function HomePage() {
  const t = useTranslations('home');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log('🏠 HomePage: Mounting with pie-chart workload division');
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Return null during SSR to prevent hydration mismatch
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 space-y-8">

        {/* Hero Section - Always renders cleanly */}
        <section className="text-center py-12">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            {t('welcome', { defaultValue: 'Welcome to MagajiCo' })}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('tagline', { defaultValue: 'AI-Powered Sports Predictions & Analytics' })}
          </p>
        </section>

        {/* Background Services - Hidden */}
        <EnhancedErrorBoundary sectionName="Background Services" showErrorUI={false}>
          <div style={{ display: 'none' }}>
            <Suspense fallback={null}>
              <ErrorMonitor />
            </Suspense>
            <Suspense fallback={null}>
              <BackendHealthMonitor />
            </Suspense>
          </div>
        </EnhancedErrorBoundary>

        {/* Feature Showcase */}
        <EnhancedErrorBoundary sectionName="Feature Showcase" fallback={<CleanSkeleton />}>
          <Suspense fallback={<CleanSkeleton />}>
            <FeatureShowcase />
          </Suspense>
        </EnhancedErrorBoundary>

        {/* News & Matches Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EnhancedErrorBoundary sectionName="News Feed" fallback={<CleanSkeleton height="h-96" />}>
            <Suspense fallback={<CleanSkeleton height="h-96" />}>
              <SmartNewsFeed />
            </Suspense>
          </EnhancedErrorBoundary>

          <EnhancedErrorBoundary sectionName="Live Matches" fallback={<CleanSkeleton height="h-96" />}>
            <Suspense fallback={<CleanSkeleton height="h-96" />}>
              <LiveMatchTracker />
            </Suspense>
          </EnhancedErrorBoundary>
        </div>

        {/* Predictions */}
        <EnhancedErrorBoundary sectionName="Predictions" fallback={<CleanSkeleton height="h-96" />}>
          <Suspense fallback={<CleanSkeleton height="h-96" />}>
            <PredictionInterface />
          </Suspense>
        </EnhancedErrorBoundary>

        {/* Status Footer - Always visible */}
        <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm" suppressHydrationWarning>
          <p>✅ MagajiCo - Progressive Loading Architecture</p>
        </div>

      </div>
    </main>
  );
}