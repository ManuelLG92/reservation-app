import { Context } from "oak";
import { diContainer, DiKeys } from "../common/di-container/di-container.ts";
import { RouterInterface, RouterMethodsRegister } from "../common/router/contracts.ts";



const companyRepository = diContainer.resolve(DiKeys.CompanyRepository);
export const companyRoutes: RouterInterface[] = [
  {
    method: RouterMethodsRegister.get,
    path: "companies",
    handler: (ctx: Context) => {
      const companies = companyRepository.findAll()
      ctx.response.body = companies;
    }
  }
]