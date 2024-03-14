import {
  diContainer,
  DiKeys,
  getLogger,
} from "src/common/di-container/di-container.ts";
import {
  RouterInterface,
  RouterMethodsRegister,
} from "src/common/infrastructure/router/contracts.ts";
import { BookSeatController } from "src/seat/router/controller/book-seats/book-seats.controller.ts";
import { FindSeatsController } from "src/seat/router/controller/find-seats/find-seats.controller.ts";
import { BookSeatUseCase } from "src/seat/use-cases/book-seats-use-case.ts";
import { FindSeatsUseCase } from "src/seat/use-cases/find-seats-use-case.ts";

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
const bookSeatController = new BookSeatController(
  logger,
  bookSeatUseCase,
);

const findSeatsUseCase = new FindSeatsUseCase(logger, seatRepository);
const findSeatsController = new FindSeatsController(logger, findSeatsUseCase);

export const seatsRoutes = {
  bookSeat: "seats/bookings",
  findById: "seats/:id",
} as const;

export const seatRoutes: RouterInterface[] = [
  {
    method: RouterMethodsRegister.post,
    path: seatsRoutes.bookSeat,
    controller: BookSeatController.prototype.constructor.name,
    handler: bookSeatController.bookDraftSlotHandler,
    middlewares: [],
  },
  {
    method: RouterMethodsRegister.get,
    path: seatsRoutes.findById,
    controller: FindSeatsController.prototype.constructor.name,
    handler: findSeatsController.findById,
    middlewares: [],
  },
];
