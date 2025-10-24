
// Core Components
export { ErrorMonitor } from './ErrorMonitor';
export { App } from './App';
export { ApiTest } from './ApiTest';

// Smart Features (Named exports - no defaults)
export { SmartNotifications } from './SmartNotifications';
export { SmartPersonalization } from './SmartPersonalization';
export { SmartWatchComplications } from './SmartWatchComplications';
export { SmartLoadingState } from './SmartLoadingState';
export { AdaptiveImageLoader } from './AdaptiveImageLoader';
export { SmartErrorRecovery } from './SmartErrorRecovery';
export { OfflineQueueManager } from './OfflineQueueManager';
export { AutoDiagnostics } from './AutoDiagnostics';
export { BackendHealthMonitor } from './BackendHealthMonitor';

// Loading Components
export { NewsLoadingSkeleton, QuizLoadingSkeleton, CardLoadingSkeleton, ListLoadingSkeleton } from './LoadingSkeleton';

// Navigation & Layout
export { NavBar } from './NavBar';
export { HorizontalCarousel } from './HorizontalCarousel';

// PWA & Mobile Features
export { PWAServiceWorker } from './PWAServiceWorker';
export { PushNotificationManager } from './PushNotificationManager';
export { MobileMetaOptimizer } from './MobileMetaOptimizer';
export { MobilePerformanceOptimizer } from './MobilePerformanceOptimizer';
export { MobileHomeOptimizer } from './MobileHomeOptimizer';
export { MobileInstallPrompter } from './MobileInstallPrompter';
export { TouchButton, SwipeableCard, PullToRefresh } from './MobileOptimizations';

// ============================================
// CORE UI COMPONENTS
// ============================================

// Theme & Settings
export { ThemeToggle } from './ThemeToggle';
export { BackendStatusIndicator } from './BackendStatusIndicator';
export { LanguageSwitcher } from './LanguageSwitcher';

// Navigation & Layout
export { AuthorsSidebar } from './AuthorsSidebar';
export { ManagementNav } from './ManagementNav';
export { ManagementSidebar } from './ManagementSidebar';
export { BottomNavigation } from './BottomNavigation';
export { Header } from './Header';

// ============================================
// FEATURE COMPONENTS
// ============================================

// Feature Showcases
export { FeatureShowcase } from './FeatureShowcase';
export { FeatureHub } from './FeatureHub';
export { UserFriendlyFeatures } from './UserFriendlyFeatures';

// Sports & Match Tracking
export { FlashScoreMatchTracker } from './FlashScoreMatchTracker';
export { ComprehensiveSportsHub } from './ComprehensiveSportsHub';
export { LiveMatchTracker } from './LiveMatchTracker';
export { LiveScoreCard } from './LiveScoreCard';

// Analytics & Insights
export { ChessboardCompetitiveAnalysis } from './ChessboardCompetitiveAnalysis';
export { AdvancedAnalytics } from './AdvancedAnalytics';

// ============================================
// USER EXPERIENCE
// ============================================

// Kids Mode
export { KidsModeDashboard } from './KidsModeDashboard';

// iOS & Mobile Features
export { IOSStyleFeatures } from './IOSStyleFeatures';
export { HapticFeedback } from './HapticFeedback';

// Social & Sharing
export { EnhancedSocialShare } from './EnhancedSocialShare';
export { ChallengeFriends } from './ChallengeFriends';

// ============================================
// UTILITY COMPONENTS
// ============================================

// Loading & Error States
export { LoadingSpinner } from './LoadingSpinner';
export { AppErrorBoundary } from './AppErrorBoundary';

// Re-export from nested directories for convenience
export type { Component } from './FeatureHub';
