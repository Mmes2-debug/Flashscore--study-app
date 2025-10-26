# 📱 Sports Central - Features Organization

## Overview
Sports Central has been reorganized into dedicated feature apps for better code organization, maintainability, and user experience.

---

## 🎯 Feature Apps

### 1. 🏠 **Portal** - Main Hub
**Route:** `/`  
**Location:** `apps/frontend/src/app/[locale]/(portal)/page.tsx`

**Purpose:**  
Central dashboard that provides an overview of all available features with quick access cards.

**Features:**
- Feature discovery cards
- Quick navigation to all apps
- Platform overview
- Safety & security information

---

### 2. 🤖 **Predictions App**
**Route Group:** `(predictions)`  
**Location:** `apps/frontend/src/app/[locale]/(predictions)/`

**Routes:**
- `/predictions` - Main prediction interface
- `/ai-predictions` - ML prediction interface (planned)
- `/coach` - AI coach assistant (planned)
- `/analytics` - Prediction analytics (planned)

**Components:**
- `MLPredictionInterface.tsx` - ML-powered predictions
- `PredictionHub.tsx` - Central prediction hub
- `MagajiCoManager.tsx` - AI CEO chatbot
- `AICoachAssistant.tsx` - Personal coach
- `ConfidenceSlider.tsx` - Confidence selection

**Backend Services:**
- ML Service (`apps/backend/ml/`) - Python FastAPI ML engine
- Prediction routes (`apps/backend/src/routes/prediction.ts`)

---

### 3. 📡 **Live Tracking App**
**Route Group:** Currently at `/live` (to be moved to `(live)`)  
**Location:** `apps/frontend/src/app/[locale]/live/`

**Routes:**
- `/live` - Main live tracker
- `/live/matches` - Live matches (planned)
- `/live/scores` - Live scores (planned)
- `/live/odds` - Live odds updates (planned)

**Components:**
- `LiveMatchTracker.tsx` - Real-time match tracking
- `EnhancedLiveTracker.tsx` - Advanced live features
- `FlashScoreMatchTracker.tsx` - FlashScore-style UI
- `LiveOddsUpdater.tsx` - Live betting odds
- `LiveMatchProbabilityTracker.tsx` - Win probabilities

**Backend Services:**
- Match routes (`apps/backend/src/routes/matches.ts`)
- Match controller (`apps/backend/src/controllers/matchController.ts`)

---

### 4. 👥 **Social App**
**Route Group:** `(social)`  
**Location:** `apps/frontend/src/app/[locale]/(social)/`

**Routes:**
- `/social/feed` - Social feed & streams ✅
- `/social/challenges` - Friend challenges (planned)
- `/social/chat` - Live match chat (planned)
- `/social/forum` - Community discussions (planned)
- `/social/experts` - Expert follow system (planned)

**Components:**
- `SocialHub.tsx` - Social feed & live streams
- `ChallengeSystem.tsx` - Challenge creation & management
- `ChallengeFriends.tsx` - Friend challenges
- `LiveMatchChat.tsx` - Match chat rooms
- `Forum.tsx` - Community forum
- `ExpertFollowSystem.tsx` - Follow top predictors
- `AuthorsLeaderboard.tsx` - Top predictors ranking

---

### 5. 🏆 **Rewards App**
**Route Group:** `(rewards)`  
**Location:** `apps/frontend/src/app/[locale]/(rewards)/`

**Routes:**
- `/rewards/achievements` - Achievement display ✅
- `/rewards/leaderboard` - Global leaderboards (planned)
- `/rewards/coins` - Pi Coin wallet (planned)

**Components:**
- `AchievementCelebration.tsx` - Achievement popups
- `AchievementSystem.tsx` - Achievement tracking
- Pi Coin manager (shared utility)

**Shared Services:**
- `packages/shared/src/libs/utils/piCoinManager.ts` - Virtual currency
- `packages/shared/src/libs/utils/gamificationEngine.ts` - Rewards logic

---

### 6. 👶 **Kids Mode App**
**Route:** `/kids-mode`  
**Location:** `apps/frontend/src/app/[locale]/kids-mode/`

**Features:**
- COPPA-compliant safe environment
- Educational sports quizzes
- Age-appropriate content
- Parental controls

**Components:**
- `KidsModeDashboard.tsx` - Kids-safe dashboard
- `AgeRestrictionGuard.tsx` - Age verification
- Kids mode context (`context/KidsModeContext.tsx`)

**Backend Services:**
- Kids mode enforcement (`apps/backend/src/plugins/kidsModeGating.ts`)
- COPPA enforcement middleware

---

### 7. 📰 **News App**
**Route:** `/news`  
**Location:** `apps/frontend/src/app/[locale]/news/`

**Features:**
- Latest sports news
- Author profiles
- News categories
- Full article view

**Components:**
- `LatestNews.tsx` - News feed
- `AuthorCard.tsx` - Author profiles
- `ConnectedNewsFeed.tsx` - Connected news display

**Backend Services:**
- News routes (`apps/backend/src/routes/news.ts`)
- News controller (`apps/backend/src/controllers/newsController.ts`)
- Author service (`apps/backend/src/services/newsAuthorService.ts`)

---

## 🎨 Shared Components

Location: `apps/frontend/src/app/components/`

**Navigation:**
- `NavBar.tsx` - Top navigation bar ✅ (Updated with feature links)
- `BottomNavigation.tsx` - Mobile bottom nav
- `AppDrawer.tsx` - Side drawer menu

**Common UI:**
- `LoadingSkeleton.tsx` - Loading states
- `ErrorBoundary/` - Error handling
- `BackendHealthMonitor.tsx` - Service monitoring

**Utilities:**
- `HapticFeedback.tsx` - Haptic feedback
- `InstallPrompt.tsx` - PWA installation
- `MobileOptimizations.tsx` - Mobile features

---

## 🔧 Backend Organization

### Current Structure
```
apps/backend/src/
├── routes/          # API endpoints
├── controllers/     # Business logic
├── models/          # Database schemas
├── services/        # Shared services
├── middleware/      # Request processing
└── plugins/         # Fastify plugins
```

### Planned Structure (Modular)
```
apps/backend/src/
├── modules/
│   ├── predictions/
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── services/
│   ├── matches/
│   ├── social/
│   ├── rewards/
│   └── kids/
└── shared/          # Shared utilities
```

---

## 🚀 Benefits of New Organization

### ✅ **Better Code Organization**
- Features are clearly separated
- Easy to find related code
- Reduced file clutter

### ✅ **Improved Performance**
- Route-based code splitting
- Smaller bundle sizes per feature
- Lazy loading of heavy components

### ✅ **Team Scalability**
- Teams can own specific features
- Parallel development possible
- Clear ownership boundaries

### ✅ **Independent Testing**
- Test features in isolation
- Feature-specific test suites
- Easier debugging

### ✅ **Flexible Deployment**
- Can deploy features separately if needed
- Feature flags for gradual rollouts
- A/B testing support

---

## 📊 Navigation Flow

```
Portal (/)
├─→ Predictions (/predictions)
├─→ Live Tracking (/live)
├─→ Social Hub (/social/feed)
│   ├─→ Challenges (/social/challenges)
│   ├─→ Chat (/social/chat)
│   └─→ Forum (/social/forum)
├─→ Rewards (/rewards/achievements)
│   ├─→ Leaderboard (/rewards/leaderboard)
│   └─→ Coins (/rewards/coins)
├─→ Kids Mode (/kids-mode)
└─→ News (/news)
```

---

## 🎯 Next Steps

### Phase 1: Core Feature Apps ✅
- [x] Create portal dashboard
- [x] Set up route groups (predictions, social, rewards)
- [x] Update navigation
- [x] Create social feed page
- [x] Create rewards achievements page

### Phase 2: Move Existing Components
- [ ] Move prediction components to (predictions) route group
- [ ] Move live tracking to (live) route group
- [ ] Organize social components
- [ ] Clean up unused components

### Phase 3: Backend Modularization
- [ ] Create backend modules structure
- [ ] Organize routes by feature
- [ ] Update API endpoints
- [ ] Test all integrations

### Phase 4: Testing & Documentation
- [ ] Test all feature apps
- [ ] Update user documentation
- [ ] Create developer guide
- [ ] Performance optimization

---

## 📝 Migration Guide

### For Developers

**Moving a component to a feature app:**

1. Identify the feature category
2. Move component to appropriate route group
3. Update imports in other files
4. Test navigation flow
5. Update documentation

**Example:**
```bash
# Move prediction component
mv apps/frontend/src/app/components/MLPredictionInterface.tsx \
   apps/frontend/src/app/[locale]/(predictions)/components/MLPredictionInterface.tsx

# Update imports
# Old: import { MLPredictionInterface } from '@/app/components/MLPredictionInterface'
# New: import { MLPredictionInterface } from '../components/MLPredictionInterface'
```

---

**Last Updated:** October 26, 2025  
**Version:** 2.0.0  
**Status:** In Progress 🚧
