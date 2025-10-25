// Barrel exports for shared package
// Models
export * from './libs/models';

// Core Libraries
export * from './libs/api/client';
// Explicitly export only what's needed to avoid circular dependencies
// Models
export type { User } from './libs/models/user';
export type { Match } from './libs/models/match';
export type { Team } from './libs/models/team';
export type { Author } from './libs/models/author';

// Types
export type * from './libs/types/predictions';

// Services - export implementations
export { TimeZoneService } from './libs/services/timeZoneService';
export { TranslationService } from './libs/services/translationService';
export { GamificationEngine } from './libs/services/gamificationEngine';
export { SportsIntegration } from './libs/services/sportsIntegration';
export { AISuggestions } from './libs/services/aiSuggestions';

// Utils - commonly used utilities
export { apiManager } from './libs/utils/apiManager';
export { cacheManager } from './libs/utils/cacheManager';
export { clientStorage } from './libs/utils/clientStorage';
export { piCoinManager } from './libs/utils/piCoinManager';
export { kidsModeUtils } from './libs/utils/kidsMode';

// API Client
export { SharedAPIClient, sharedAPIClient } from './libs/api/client';

// Re-export commonly used items
export { Author } from './libs/models/author';
export {
  MLModelClient,
  mlModelClient,
  createMLModelClient,
  PytorchModel,
  pytorchModelInstance,
  initializePytorchModel,
  type ModelConfig,
  type PredictionInput,
  type PredictionOutput,
  type ModelHealth,
  type FeatureExplanation,
  type AlternativeScenario,
  type StreamingPrediction
} from './libs/models/pytorchModel';
export { foundationApi } from './libs/utils/apifoundation';
export { mlEnhancement } from './libs/utils/mlEnhancement';
export { UserManager, userManager } from './libs/utils/userManager';