import { Hono } from "hono";
import { mainFixtures } from "src/fixtures.main.ts";
import { getLogger } from "src/common/di-container/di-container.ts";
import { ValidationError } from "src/common/infrastructure/validator/validator.ts";
import registerRoutes from "src/common/infrastructure/router/register/register.ts";

const app = new Hono();
mainFixtures();
const logger = getLogger();

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  try {
    await next();
  } finally {
    ctx.header("X-Response-Time", `${Date.now() - start}ms`);
  }
});

// Error handler
app.use(async (ctx, next) => {
  const start = Date.now();
  try {
    await next();
    ctx.header("X-Response-Time", `${Date.now() - start}ms`);
  } catch (error) {
    console.log("Something was wrong. Cause ", (error as Error).message);
    ctx.header("X-Response-Time", `${Date.now() - start}ms`);

    ctx.status(error instanceof ValidationError ? 400 : 500);
    return ctx.json({
      error: error.message,
      ...(error instanceof ValidationError && { details: error.details ?? {} }),
    });
  }
});

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.req.header("X-Response-Time");
  logger.info(`${ctx.req.method} ${ctx.req.url} - ${rt}`);
});

registerRoutes(app);

Deno.serve({ port: 8123 }, app.fetch);
