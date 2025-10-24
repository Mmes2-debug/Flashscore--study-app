// Error Monitoring & Boundaries
export { ErrorMonitor } from './ErrorMonitor';
export { ErrorBoundary } from './ErrorBoundary/ErrorBoundaryWithPerformance';
export { BackendHealthMonitor } from './BackendHealthMonitor';
export { BackendStatusIndicator } from './BackendStatusIndicator';

// Loading States
export { SmartLoadingState } from './SmartLoadingState';
export { LoadingSkeleton, NewsLoadingSkeleton, QuizLoadingSkeleton, CardLoadingSkeleton, ListLoadingSkeleton } from './LoadingSkeleton';

// Navigation & Layout
export { NavBar } from './NavBar';
export { HorizontalCarousel } from './HorizontalCarousel';

// PWA & Mobile Features
export { PWAServiceWorker } from './PWAServiceWorker';
export { PushNotificationManager } from './PushNotificationManager';
export { MobileMetaOptimizer } from './MobileMetaOptimizer';
export { MobilePerformanceOptimizer } from './MobilePerformanceOptimizer';
export { MobileHomeOptimizer } from './MobileHomeOptimizer';
export { OfflineIndicator } from './OfflineIndicator';
export { InstallPrompt } from './InstallPrompt';

// Feature Components
export { FeatureShowcase } from './FeatureShowcase';
export { FeatureHub } from './FeatureHub';

// Live Features
export { LiveMatchTracker } from './LiveMatchTracker';
export { LiveScoreCard } from './LiveScoreCard';

// Prediction Features
export { PredictionInterface } from './PredictionInterface';

// News Features
export { LatestNews } from './LatestNews';
export { SmartNewsFeed } from './SmartNewsFeed';

// Alerts & Notifications
export { FloatingAlert } from './FloatingAlert';

// Re-export all components for backward compatibility
export * from './ErrorMonitor';
export * from './BackendHealthMonitor';
export * from './SmartLoadingState';
export * from './FeatureShowcase';
export * from './PWAServiceWorker';
export * from './MobileMetaOptimizer';
export * from './MobilePerformanceOptimizer';
export * from './LatestNews';
export * from './SmartNewsFeed';
export * from './LiveMatchTracker';
export * from './PredictionInterface';
export * from './OfflineIndicator';
export * from './InstallPrompt';
// Core Components
export { App } from './App';
export { AppWrapper } from './AppWrapper';
export { AppErrorBoundary } from './AppErrorBoundary';
export { AppDrawer } from './AppDrawer';

// Authentication & User
export { LoginModal } from './LoginModal';
export { AccountRecovery } from './AccountRecovery';

// Navigation
export { BottomNavigation } from './BottomNavigation';
export { Header } from './Header';
export { Breadcrumbs } from './Breadcrumbs';
export { ManagementNav } from './ManagementNav';
export { ManagementSidebar } from './ManagementSidebar';

// Authors & Content
export { AuthorCard } from './AuthorCard';
export { AuthorNewsDisplay } from './AuthorNewsDisplay';
export { AuthorsLeaderboard } from './AuthorsLeaderboard';
export { AuthorsSidebar } from './AuthorsSidebar';

// Predictions & Analytics
export { ConfidenceSlider } from './ConfidenceSlider';
export { ConfidenceCalibration } from './ConfidenceCalibration';
export { LiveOddsUpdater } from './LiveOddsUpdater';
export { AdvancedAnalytics } from './AdvancedAnalytics';
export { BlockchainVerification } from './BlockchainVerification';

// Sports & Matches
export { LiveMatchTracker } from './LiveMatchTracker';
export { LiveMatchProbabilityTracker } from './LiveMatchProbabilityTracker';
export { LiveScoreCard } from './LiveScoreCard';
export { DateSelector } from './DateSelector';
export { ComprehensiveSportsHub } from './ComprehensiveSportsHub';

// Social & Community
export { CommunityVoting } from './CommunityVoting';
export { ChallengeFriends } from './ChallengeFriends';
export { ChallengeSystem } from './ChallengeSystem';
export { CollaborativePrediction } from './CollaborativePrediction';
export { LiveMatchChat } from './LiveMatchChat';

// Achievements & Gamification
export { AchievementSystem } from './AchievementSystem';
export { AchievementCelebration, useAchievements } from './AchievementCelebration';

// UI Components
export { FloatingActionButtons } from './FloatingActionButtons';
export { FloatingAlert } from './FloatingAlert';
export { PullToRefresh } from './PullToRefresh';
export { PullToRefreshWrapper } from './PullToRefreshWrapper';
export { AdvancedPullToRefreshWrapper } from './AdvancedPullToRefreshWrapper';
export { LoadingSpinner } from './LoadingSpinner';
export { LoadingSkeleton } from './LoadingSkeleton';

// Error Handling
export { ErrorMonitor } from './ErrorMonitor';
export { ErrorAnalyticsDashboard } from './ErrorAnalyticsDashboard';
export { ErrorInsightsPanel } from './ErrorInsightsPanel';
export { ErrorPredictionAI } from './ErrorPredictionAI';
export { ErrorRecoverySystem } from './ErrorRecoverySystem';

// System & Monitoring
export { BackendHealthMonitor } from './BackendHealthMonitor';
export { BackendStatusIndicator } from './BackendStatusIndicator';
export { AutoDiagnostics } from './AutoDiagnostics';
export { HealthDashboard } from './HealthDashboard';

// Personalization & Settings
export { ContentPersonalization } from './ContentPersonalization';
export { EnhancedPersonalization } from './EnhancedPersonalization';
export { LanguageSettings } from './LanguageSettings';
export { LanguageSwitcher } from './LanguageSwitcher';
export { AdvancedThemeSettings } from './AdvancedThemeSettings';

// Kids Mode
export { KidsModeDashboard } from './KidsModeDashboard';
export { AgeRestrictionGuard } from './AgeRestrictionGuard';

// Other Features
export { InstallPrompt } from './InstallPrompt';
export { BettingAgreement } from './BettingAgreement';
export { ContentPaywall } from './ContentPaywall';
export { CrossPlatformSync } from './CrossPlatformSync';
export { ARPredictionOverlay } from './ARPredictionOverlay';
export { ExpertFollowSystem } from './ExpertFollowSystem';
export { EnhancedSocialShare } from './EnhancedSocialShare';
export { BackgroundParticles } from './BackgroundParticles';
export { LazyComponent } from './LazyComponent';
export { ComponentLoader } from './ComponentLoader';
export { AdaptiveImageLoader } from './AdaptiveImageLoader';
