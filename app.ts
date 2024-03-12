import { Application, isHttpError, Router } from "oak";
import { mainFixtures } from "./fixtures.main.ts";
import { getLogger } from "./common/di-container/di-container.ts";
import registerRoutes from "./common/router/register/register.ts";
import { ValidationError } from "./common/validator/validator.ts";

const app = new Application();
mainFixtures();
const logger = getLogger();

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  try {
    await next();
  } finally {
    console.log("after end");
    ctx.response.headers.set("X-Response-Time", `${Date.now() - start}ms`);
  }
});

// Error handler
app.use(async (ctx, next) => {
  const start = Date.now();
  try {
    await next();
    ctx.response.headers.set("X-Response-Time", `${Date.now() - start}ms`);
  } catch (error) {
    console.log("Something was wrong. Cause ", (error as Error).message);
    ctx.response.headers.set("X-Response-Time", `${Date.now() - start}ms`);
    if (isHttpError(error)) {
      ctx.response.status = error.status;
    } else {
      ctx.response.status = error instanceof ValidationError ? 400 : 500;
    }
    ctx.response.body = {
      error: error.message,
      ...(error instanceof ValidationError && { details: error.details ?? {} }),
    };
    ctx.response.type = "json";
  }
});

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  logger.info(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

const router = new Router();
registerRoutes(router);
app.use(router.routes());

await app.listen({ port: 8123 });
