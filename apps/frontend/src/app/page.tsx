"use client";

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import {
  ErrorMonitor,
  BackendHealthMonitor,
  SmartLoadingState,
  LoadingSkeleton,
  FeatureShowcase,
  PWAServiceWorker,
  MobileMetaOptimizer,
  MobilePerformanceOptimizer
} from '@components';
import { LatestNews } from '@components/LatestNews';

const SmartNewsFeed = dynamic(() => import('@components/SmartNewsFeed').then(mod => ({ default: mod.SmartNewsFeed })), {
  loading: () => <LoadingSkeleton />,
  ssr: false
});

const LiveMatchTracker = dynamic(() => import('@components/LiveMatchTracker').then(mod => ({ default: mod.LiveMatchTracker })), {
  loading: () => <LoadingSkeleton />,
  ssr: false
});

const PredictionInterface = dynamic(() => import('@components/PredictionInterface').then(mod => ({ default: mod.PredictionInterface })), {
  loading: () => <LoadingSkeleton />,
  ssr: false
});

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <>
      <ErrorMonitor />
      <BackendHealthMonitor />
      <PWAServiceWorker />
      <MobileMetaOptimizer />
      <MobilePerformanceOptimizer />

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8 space-y-8">
          <section className="text-center py-12">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
              {t('welcome', { defaultValue: 'Welcome to MajajiCo' })}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('tagline', { defaultValue: 'AI-Powered Sports Predictions & Analytics' })}
            </p>
          </section>

          <FeatureShowcase />

          <Suspense fallback={<SmartLoadingState />}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SmartNewsFeed />
              <LiveMatchTracker />
            </div>
          </Suspense>

          <Suspense fallback={<SmartLoadingState />}>
            <PredictionInterface />
          </Suspense>

          <Suspense fallback={<SmartLoadingState />}>
            <LatestNews />
          </Suspense>
        </div>
      </main>
    </>
  );
}