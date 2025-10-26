# Backend Feature Modules

This directory organizes backend routes into feature-based modules for better maintainability and scalability.

## 📁 Feature Structure

### 🤖 Predictions
**Location:** `features/predictions/`
**Routes:**
- `prediction.ts` - Core prediction logic
- `enhanced-predictions.ts` - Advanced prediction features
- `confidence-evolution.ts` - Confidence tracking

### 📡 Live
**Location:** `features/live/`
**Routes:**
- `matches.ts` - Live match data and tracking

### 👥 Social
**Location:** `features/social/`
**Routes:**
- `social-routes.ts` - Social feed, challenges, leaderboard

### 🏆 Rewards
**Location:** `features/rewards/`
**Routes:**
- `payment.ts` - Payment processing
- `stripe.ts` - Stripe integration
- `marketplace.ts` - Marketplace features

### 📰 News
**Location:** `features/news/`
**Routes:**
- `news.ts` - News articles
- `newsAuthors.ts` - News author management
- `authors.ts` - Author profiles

### 🔐 Auth
**Location:** `features/auth/`
**Routes:**
- `auth.ts` - Authentication & authorization

### 🔧 Shared
**Location:** `features/shared/`
**Routes:**
- `health.ts` - Health checks
- `api.ts` - Core API routes
- `foundation.ts` - Foundation endpoints
- `errors.ts` - Error handling
- `data-rights.ts` - Data rights management
- `market-intelligence.ts` - Market data
- `scraper.ts` - Data scraping utilities

## 🎯 Usage

Each feature exports its routes through an `index.ts` file:

```typescript
// Import a specific feature
import { predictionRoutes } from './features/predictions';

// Or import all features
import * as PredictionsFeature from './features/predictions';
import * as LiveFeature from './features/live';
import * as SocialFeature from './features/social';
```

## 🔄 Migration Status

✅ Structure created
✅ Feature modules organized
📝 Integration with main routes pending
📝 Move controllers into feature folders (future)

## 🚀 Benefits

- **Clear Boundaries**: Each feature has its own folder
- **Easy Navigation**: Find related code quickly
- **Scalability**: Add new features without affecting others
- **Team Collaboration**: Teams can own specific features
- **Testing**: Test features in isolation
