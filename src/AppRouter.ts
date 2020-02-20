import express from 'express';

// singleton!
export class AppRouter {
  private static instance: express.Router;
  
  // can be replaced with getter
  static getInstance(): express.Router {
    if (!AppRouter.instance) {
      AppRouter.instance = express.Router();
    }

    return AppRouter.instance;
  }
}
