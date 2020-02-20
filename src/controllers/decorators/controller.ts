import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { RequestHandler, NextFunction, Request, Response } from 'express';

// just check keys are available
function bodyValidators(keys: string): RequestHandler {
  return function(req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      void res.status(422).send('Invalid request');
    }

    for (let key of keys) {
      if (!req.body[key]) {
        void res.status(422).send('Missing property keys');
      }
    }

    next();
  }
}

export function controller(routePrefix: string) {
  // Function is constructor
  return function(target: Function) {
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
      const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);
      const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || [];
      const requiredBodyProps = Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) || [];
      const validator = bodyValidators(requiredBodyProps);

      if (path) {
        // error: any can't be used to  index type Router
        // to solve, type const method with enum
        router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler);
      }
    }
  }
}
