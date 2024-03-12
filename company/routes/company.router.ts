import { Context, Next } from "oak";
import {
  diContainer,
  DiKeys,
  getLogger,
} from "../../common/di-container/di-container.ts";
import {
  RouterInterface,
  RouterMethodsRegister,
} from "../../common/router/contracts.ts";
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
        console.log("first midds", ctx.request.url);
        ctx.response.headers.set("first", "truse");
        Promise.resolve(next());
      },
      async (ctx: Context, next: Next) => {
        console.log(
          "second midd. from previous mid ss",
          ctx.response.headers.get("first"),
        );
        Promise.resolve(next());
      },
    ],
  },
];
