// Barrel exports for shared package
export * from './libs/models';
export * from './libs/services';
export * from './libs/types';
export * from './libs/utils';

// Re-export commonly used items
export { Author } from './libs/models/author';
export { PytorchModel, pytorchModelInstance, initializePytorchModel } from './libs/models/pytorchModel';
export { foundationApi } from './libs/utils/apifoundation';
export { mlEnhancement } from './libs/utils/mlEnhancement';
export { UserManager, userManager } from './libs/utils/userManager';