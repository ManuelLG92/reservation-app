import { Context, Next } from "hono";
import {
  diContainer,
  DiKeys,
  getLogger,
} from "../../common/di-container/di-container.ts";
import {
  RouterInterface,
  RouterMethodsRegister,
} from "../../common/infrastructure/router/contracts.ts";
import { CompanyController } from "./company.controller.ts";

const companyRepository = diContainer.resolve(DiKeys.CompanyRepository);
const logger = getLogger();

const controller = new CompanyController(logger, companyRepository);
export const companyRoutes: RouterInterface[] = [
  {
    method: RouterMethodsRegister.get,
    path: "companies",
    controller: CompanyController.prototype.constructor.name,
    handler: controller.findAll,
    middlewares: [
      async (ctx: Context, next: Next) => {
        console.log("first midds", ctx.req.url);
        ctx.header("first", "truse");
        await next();
      },
      async (ctx: Context, next: Next) => {
        console.log(
          "second midd. from previous mid ss",
          ctx.res.headers.get("first"),
        );
        await next();
      },
    ],
  },
];
