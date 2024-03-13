import { companyRoutes } from "src/company/routes/company.router.ts";
import { seatRoutes } from "src/seat/router/seat.router.ts";
import { RouterInterface } from "src/common/infrastructure/router/contracts.ts";

export const routes: RouterInterface[] = [...companyRoutes, ...seatRoutes];
