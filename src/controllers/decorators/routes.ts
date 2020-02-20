import 'reflect-metadata';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { RequestHandler } from 'express';
// too much duplicated! even in controller.ts
// for calling path and method...etc.
// export function get(path: string) {
//   return function(target: any, key: string) {
//     Reflect.defineMetadata('path', path, target, key);
//     Reflect.defineMetadata('method', 'get', target, key);
//   }
// }

// export function post(path: string) {
//   return function(target: any, key: string, desc: PropertyDescriptor) {
//     Reflect.defineMetadata('path', path, target, key);
//     Reflect.defineMetadata('method', 'post', target, key);
//   }
// }

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler
}

function routeBinder(method: string) {
  // decorator factory
  return function (path: string) {
    // decorator
    return function(target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    }
  }
}

export const get = routeBinder(Methods.get);
export const put = routeBinder(Methods.put);
export const post = routeBinder(Methods.post);
export const del = routeBinder(Methods.del);
export const patch = routeBinder(Methods.patch);
