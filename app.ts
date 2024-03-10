import { Application } from "oak";
import { mainFixtures } from "./fixtures.main.ts";
import { companiesRouter } from "./company/company.router.ts";

const app = new Application();
mainFixtures();
// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

app.use(companiesRouter.routes())

// Hello World!
app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

await app.listen({ port: 8123 });
