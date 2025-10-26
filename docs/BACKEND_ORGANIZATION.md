# Backend Feature Organization Guide

## 🎯 Overview

The Sports Central backend is organized into feature-based modules for better maintainability, scalability, and team collaboration.

## 📁 Directory Structure

```
apps/backend/src/
├── routes/
│   ├── features/              # Feature-based route modules
│   │   ├── predictions/       # 🤖 Prediction routes
│   │   ├── live/             # 📡 Live tracking routes
│   │   ├── social/           # 👥 Social features routes
│   │   ├── rewards/          # 🏆 Rewards & payments routes
│   │   ├── news/             # 📰 News & authors routes
│   │   ├── auth/             # 🔐 Authentication routes
│   │   └── shared/           # 🔧 Shared utilities routes
│   ├── [legacy routes]       # Original route files (kept for compatibility)
│   └── index.ts              # Main route exporter
├── controllers/              # Route controllers
├── models/                   # Database models
└── index.ts                  # Application entry point
```

## 🚀 Feature Modules

### 1. 🤖 Predictions Feature
**Path:** `routes/features/predictions/`

**Routes:**
- `predictionsRoutes` - Core prediction logic
- `enhancedPredictionRoutes` - Advanced ML predictions
- `confidenceEvolutionRoutes` - Confidence tracking over time

**Responsibilities:**
- Match outcome predictions
- ML model integration
- Confidence score calculation
- Historical prediction analysis

**API Endpoints:**
```
POST   /api/predictions/create
GET    /api/predictions/:id
GET    /api/predictions/match/:matchId
POST   /api/predictions/enhanced
GET    /api/predictions/confidence/:predictionId
```

---

### 2. 📡 Live Tracking Feature
**Path:** `routes/features/live/`

**Routes:**
- `matchRoutes` - Live match data

**Responsibilities:**
- Real-time match updates
- Live scores
- Match statistics
- In-play odds tracking

**API Endpoints:**
```
GET    /api/matches/live
GET    /api/matches/:id
GET    /api/matches/:id/stats
GET    /api/matches/:id/events
```

---

### 3. 👥 Social Feature
**Path:** `routes/features/social/`

**Routes:**
- `socialRoutes` - Social feed, challenges, leaderboard

**Responsibilities:**
- User social feed
- Friend challenges
- Community leaderboards
- Expert following system

**API Endpoints:**
```
GET    /api/social/feed
GET    /api/social/challenges
GET    /api/social/leaderboard
POST   /api/social/challenges/create
POST   /api/social/follow/:userId
```

---

### 4. 🏆 Rewards Feature
**Path:** `routes/features/rewards/`

**Routes:**
- `paymentsRoutes` - Payment processing
- `stripeRoutes` - Stripe integration
- `marketplaceRoutes` - Marketplace features

**Responsibilities:**
- Pi Coin management
- Achievement tracking
- Payment processing
- Subscription management
- Marketplace transactions

**API Endpoints:**
```
GET    /api/payments/balance
POST   /api/payments/purchase
GET    /api/stripe/checkout
POST   /api/stripe/webhook
GET    /api/marketplace/items
```

---

### 5. 📰 News Feature
**Path:** `routes/features/news/`

**Routes:**
- `newsRoutes` - News articles
- `newsAuthorsRoutes` - News author management
- `authorsRoutes` - Author profiles

**Responsibilities:**
- Sports news articles
- Author management
- Content categorization
- Author leaderboards

**API Endpoints:**
```
GET    /api/news
GET    /api/news/:id
GET    /api/news/authors
GET    /api/authors/:id
POST   /api/authors/create
```

---

### 6. 🔐 Auth Feature
**Path:** `routes/features/auth/`

**Routes:**
- `authRoutes` - Authentication & authorization

**Responsibilities:**
- User authentication
- Session management
- Age verification
- COPPA compliance
- JWT token handling

**API Endpoints:**
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/verify
POST   /api/auth/age-verify
```

---

### 7. 🔧 Shared Feature
**Path:** `routes/features/shared/`

**Routes:**
- `healthRoutes` - Health checks
- `apiRoutes` - Core API routes
- `foundationRoutes` - Foundation endpoints
- `errorsRoutes` - Error handling
- `dataRightsRoutes` - Data rights management
- `marketIntelligenceRoutes` - Market data
- `scraperRoutes` - Data scraping utilities

**Responsibilities:**
- System health monitoring
- Error handling
- Data management
- External data scraping

**API Endpoints:**
```
GET    /health
GET    /api/status
POST   /api/errors/report
GET    /api/market-intelligence
```

---

## 🔄 Usage Examples

### Importing Feature Routes

```typescript
// Import specific feature
import { predictionsRoutes } from './routes/features/predictions';
import { socialRoutes } from './routes/features/social';

// Register routes in main application
fastify.register(predictionsRoutes);
fastify.register(socialRoutes);
```

### Adding New Routes to a Feature

```typescript
// In routes/features/social/index.ts
export async function socialRoutes(fastify: FastifyInstance) {
  // Existing routes...
  
  // Add new route
  fastify.post('/api/social/posts/create', async (request, reply) => {
    // Implementation
  });
}
```

---

## ✅ Benefits

### 1. **Clear Organization**
- Each feature has its own folder
- Easy to find related code
- Reduced cognitive load

### 2. **Scalability**
- Add new features without affecting others
- Feature-specific optimizations
- Independent deployment potential

### 3. **Team Collaboration**
- Teams can own specific features
- Parallel development
- Clear code ownership

### 4. **Testing**
- Test features in isolation
- Feature-specific test suites
- Easier mocking and stubbing

### 5. **Maintenance**
- Easier to debug issues
- Clearer dependencies
- Simplified refactoring

---

## 🚧 Migration Status

**Completed:**
- ✅ Feature folder structure created
- ✅ All routes organized by feature
- ✅ Index files for each feature
- ✅ Documentation created

**Pending:**
- 📝 Move controllers into feature folders
- 📝 Create feature-specific services
- 📝 Add feature-specific tests
- 📝 Update main index.ts to use feature exports

---

## 🔮 Future Enhancements

1. **Feature-Specific Controllers**
   - Move controllers into feature folders
   - Create service layers for each feature

2. **Feature-Specific Models**
   - Organize database models by feature
   - Feature-specific schema validation

3. **Feature-Specific Middleware**
   - Authentication per feature
   - Feature flags
   - Rate limiting per feature

4. **Microservices Ready**
   - Each feature can become a microservice
   - Clear API boundaries
   - Independent scaling

---

## 📚 Related Documentation

- [Architecture Overview](./ARCHITECTURE.md)
- [Frontend Feature Organization](./FEATURES_ORGANIZATION.md)
- [API Documentation](./API.md) _(to be created)_

---

**Last Updated:** October 26, 2025
