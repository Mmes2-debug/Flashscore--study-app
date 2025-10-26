# Recyclebin

This directory contains components that were identified as unused, deprecated, or static and removed from the active codebase on October 26, 2025.

## Moved Components (October 26, 2025)

### Test & Development Components
- `components/App.jsx` - Basic test wrapper, used only for API testing
- `components/ApiTest.tsx` - Simple API test component
- `components/DebugPanel.tsx` - Development-only debug panel

### PWA Installation Components
- `components/PWAInstaller.tsx` - Service worker installer
- `components/MobileInstallPrompter.tsx` - iOS/Android install prompts

### Mock/Placeholder Components
- `components/MLModelDashboard.tsx` - Uses mock data for ML metrics
- `components/PerformanceOptimizer.tsx` - Uses simulated battery/performance data

### Error Handling Components
- `components/ErrorRecoverySystem.tsx` - Auto-recovery with simulated logic
- `components/SmartErrorRecovery.tsx` - Error boundary with retry logic

### Deprecated Components
- `lib/HorizontalCarousel.tsx` - Deprecated in favor of `@/lib/platform/carousel`

## Restoration
If any of these components are needed in the future, they can be moved back to their original locations.

## Cleanup
After 30 days, consider permanently deleting these files if they remain unused.
