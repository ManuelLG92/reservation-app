import { Context, Hono, Next } from "hono";
import { getLogger } from "src/common/di-container/di-container.ts";
import { registerRoutes } from "src/common/infrastructure/router/register/register.ts";
import { ValidationError } from "./common/errors/validation-error.ts";
import { BaseError } from "src/common/errors/base-error.ts";

const app = new Hono();

// await mainFixtures()
const logger = getLogger();

// Timing
app.use(async (ctx: Context, next: Next) => {
  const start = Date.now();
  try {
    await next();
  } finally {
    const diffTimeInMs = Date.now() - start;
    logger.info(`Method: ${ctx.req.method} - duration: ${diffTimeInMs}`);
    ctx.header("X-Response-Time", `${diffTimeInMs}ms`);
  }
});

app.onError((error, ctx) => {
  const status = error instanceof BaseError ? error.status : 500;
  const errorBody = {
    error: error.message,
    ...(error instanceof ValidationError && { details: error.details ?? {} }),
  };
  logger.error(`Error:`, {
    ...errorBody,
    ...(error.stack && { stack: error.stack }),
  });

  return ctx.json({ ...errorBody }, status);
});

registerRoutes(app)();

Deno.serve({ port: 8123 }, app.fetch);
