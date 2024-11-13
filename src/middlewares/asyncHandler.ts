import { Request, Response, NextFunction, Router } from 'express';

/* 
    Function to recursively go trough routers->route
    and wrap each route with an async handler  
*/

export const asyncHandler = (router: Router): Router => {
  const asyncHandlerHelper =
    (fn: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>) =>
    (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };

  router.stack.forEach((layer: any) => {
    console.log(layer.name)
    if (layer.route) {
      layer.route.stack.forEach((routeLayer: any) => {
        if (routeLayer.handle instanceof Function) {
          routeLayer.handle = asyncHandlerHelper(routeLayer.handle);
        }
      });
    } else if (layer.name === 'router' && layer.handle?.stack) {
      asyncHandler(layer.handle);
    }
  });
  return router;
};
