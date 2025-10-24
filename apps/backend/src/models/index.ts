export * from './ErrorLog';
export * from './Foundation';
export * from './Match';
export * from './NewsAuthor';
export * from './News';
export * from './Predictions';
export * from './User';

export { default as Match } from './Match.js';
export { default as News } from './News.js';
export { default as NewsAuthor } from './NewsAuthor.js';
export { default as Prediction } from './Predictions.js';
export { default as User } from './User.js';
export { default as Foundation } from './Foundation.js';
export { default as ErrorLog } from './ErrorLog.js';
export { default as Payment } from './Payment.js';

// Re-export defaults for compatibility
import MatchModel from './Match.js';
import NewsModel from './News.js';
import NewsAuthorModel from './NewsAuthor.js';
import PredictionModel from './Predictions.js';
import UserModel from './User.js';
import FoundationModel from './Foundation.js';
import ErrorLogModel from './ErrorLog.js';
import PaymentModel from './Payment.js';

export { 
  MatchModel, 
  NewsModel, 
  NewsAuthorModel, 
  PredictionModel, 
  UserModel, 
  FoundationModel, 
  ErrorLogModel, 
  PaymentModel 
};