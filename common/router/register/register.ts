import { routes } from "../index.ts";
import { Context, Next, Router } from "oak";

const registerRoutes = (router: Router) => {
  routes.forEach((route) => {
    console.log(
      `Path: /${route.path} - Method: ${route.method} - Controller: ${route.handler.constructor.name}`,
    );
    router[route.method](`/${route.path}`, async (ctx: Context, next: Next) => {
      return [
        ...(route.middlewares?.length
          ? Object.values(route.middlewares).map((it) => it(ctx, next))
          : []),
        await route.handler(ctx),
      ];
    });
  });
};

export default registerRoutes;
