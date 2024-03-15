import { Hono } from "hono";
import { getLogger } from "src/common/di-container/di-container.ts";
import { routes } from "src/common/infrastructure/router/index.ts";

const logger = getLogger();
const boundedName = "bound ";
export const registerRoutes = (router: Hono) => () => {
  routes.forEach((route) => {
    const handler = route.handler;
    const handlerName = handler.name;
    const formattedHandlerName = handlerName.startsWith(boundedName)
      ? handlerName.substring(boundedName.length)
      : handlerName;
    const controller = `${route.controller}-${formattedHandlerName}`;
    router.use(`/${route.path}`, ...route.middlewares ?? []);
    router[route.method](`/${route.path}`, async (ctx) => {
      return await handler(ctx);
    });
    logger.info(
      `[${route.method.toUpperCase()}]/${route.path} - Controller: ${controller}`,
    );
  });
};
