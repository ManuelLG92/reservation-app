import { Application, Router } from "oak";
import { mainFixtures } from "./fixtures.main.ts";
// import { companiesRouter } from "./company/company.router.ts";
import { getLogger } from "./common/di-container/di-container.ts";
import registerRoutes from "./common/router/register/register.ts";

const app = new Application();
mainFixtures();
const logger = getLogger();
// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  logger.info(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});
// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

const router = new Router();
registerRoutes(router);
app.use(router.routes());

// Hello World!
app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

await app.listen({ port: 8123 });
