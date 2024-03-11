import { companyRoutes } from "../../company/company.router.ts";
import { RouterInterface } from "./contracts.ts";

export const routes: RouterInterface[] = [...companyRoutes];
