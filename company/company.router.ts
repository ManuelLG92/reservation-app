import { Router } from "oak";
import { DiKeys, diContainer } from "../common/DIContainer.ts";

export const companiesRouter = new Router();
const companyRepository = diContainer.resolve(DiKeys.CompanyRepository);
companiesRouter
  .get("/companies", (ctx) => {
    const companies = companyRepository.findAll();
    ctx.response.body = companies;
  });
