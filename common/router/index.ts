import { companyRoutes } from "../../company/routes/company.router.ts";
import { seatRoutes } from "../../seat/routes/seat.router.ts";
import { RouterInterface } from "./contracts.ts";

export const routes: RouterInterface[] = [...companyRoutes, ...seatRoutes];
