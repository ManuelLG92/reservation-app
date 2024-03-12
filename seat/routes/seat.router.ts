import {
  diContainer,
  DiKeys,
  getLogger,
} from "../../common/di-container/di-container.ts";
import {
  RouterInterface,
  RouterMethodsRegister,
} from "../../common/router/contracts.ts";
import { SeatController } from "./seat.controller.ts";

const logger = getLogger();

const controller = new SeatController(
  logger,
  diContainer.resolve(DiKeys.SeatRepository),
  diContainer.resolve(DiKeys.UserRepository),
);
export const seatRoutes: RouterInterface[] = [
  {
    method: RouterMethodsRegister.post,
    path: "seats/bookings",
    controller: SeatController.prototype.constructor.name,
    handler: controller.bookDraftSlot,
    middlewares: [],
  },
];
