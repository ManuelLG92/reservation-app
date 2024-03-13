import {
  diContainer,
  DiKeys,
  getLogger,
} from "src/common/di-container/di-container.ts";
import {
  RouterInterface,
  RouterMethodsRegister,
} from "src/common/infrastructure/router/contracts.ts";
import { BookSeatUseCase } from "src/seat/use-cases/book-seats-use-case.ts";
import { BookSeatController } from "src/seat/router/controller/book-seats/book-seats.controller.ts";
import { FindSeatsUseCase } from "src/seat/router/controller/find-seats.controller.ts";

const logger = getLogger();
const seatRepository = diContainer.resolve(DiKeys.SeatRepository);
const userRepository = diContainer.resolve(DiKeys.UserRepository);
const slotRepository = diContainer.resolve(DiKeys.SlotRepository);
const bookSeatUseCase = new BookSeatUseCase(
  logger,
  seatRepository,
  userRepository,
  slotRepository,
);
const controller = new BookSeatController(
  logger,
  bookSeatUseCase,
);

const findSeatsController = new FindSeatsUseCase(logger, slotRepository);
export const seatRoutes: RouterInterface[] = [
  {
    method: RouterMethodsRegister.post,
    path: "seats/bookings",
    controller: BookSeatController.prototype.constructor.name,
    handler: controller.bookDraftSlotHandler,
    middlewares: [],
  },
];
