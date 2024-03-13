import { composeMiddleware, Router } from "oak";
import { getLogger } from "src/common/di-container/di-container.ts";
import { routes } from "src/common/infrastructure/router/index.ts";

const logger = getLogger();
const boundedName = "bound ";
const registerRoutes = (router: Router) => {
  routes.forEach((route) => {
    const handler = route.handler;
    const handlerName = handler.name;
    const formattedHandlerName = handlerName.startsWith(boundedName)
      ? handlerName.substring(boundedName.length)
      : handlerName;
    const controller = `${route.controller}-${formattedHandlerName}`;
    const data = composeMiddleware(route.middlewares ?? []);
    router[route.method](`/${route.path}`, data, handler);
    logger.info(
      `[${route.method.toUpperCase()}]/${route.path} - Controller: ${controller}`,
    );
  });
};

export default registerRoutes;
