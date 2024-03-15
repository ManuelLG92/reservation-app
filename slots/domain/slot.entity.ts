import {
  AggregateRoot,
  AggregateRootProps,
} from "src/common/domain/entity/aggregate-root.entity.ts";
import { User } from "src/user/user.entity.ts";
import { BadRequestError } from "src/common/errors/bad-request-error.ts";

export interface SlotInputProps {
  startAt: Date;
  endAt: Date;
  user: User;
}

export interface SlotOutputProps extends AggregateRootProps {
  startAt: string;
  endAt: string;
  state: string;
  user: User;
}

interface ValidateDates {
  value: Date;
  context: string;
}

export enum SlotStates {
  draft = "draft",
  confirmed = "confirmed",
}

export class Slot extends AggregateRoot<SlotOutputProps> {
  private readonly minHour = 8;
  private readonly maxHour = 20;
  private readonly maxDays = 7;
  private readonly minHoursBooking = 4;
  #startAt: Date;
  #endAt: Date;
  #user: User;
  #state: string;
  constructor({ startAt, endAt, user }: SlotInputProps) {
    super();
    this.#startAt = startAt;
    this.#endAt = endAt;
    this.#user = user;
    this.#state = SlotStates.draft;
    this.validate();
  }

  get startAt(): Date {
    return this.#startAt;
  }

  get endAt(): Date {
    return this.#endAt;
  }
  get user(): User {
    return this.#user;
  }
  get state(): string {
    return this.#state;
  }

  confirmState() {
    this.#state = SlotStates.confirmed;
  }
  draftState() {
    this.#state = SlotStates.draft;
  }

  isConfirmed() {
    return this.state === SlotStates.confirmed;
  }

  isDraft() {
    return this.state === SlotStates.draft;
  }

  private validate() {
    this.validateStartDateIsEarlierThanEndDate();
    this.validateDaysInterval();
    this.validateElapsedTime();
    const values: ValidateDates[] = [{ value: this.startAt, context: "from" }, {
      value: this.endAt,
      context: "to",
    }];
    for (const value of values) {
      this.validateMinimunTime(value);
      this.validateMaximunTime(value);
    }
  }

  private validateMinimunTime({ value, context }: ValidateDates) {
    const valueHour = value.getUTCHours();
    if (valueHour < this.minHour) {
      throw new BadRequestError(
        `No valid hour for ${context}: Provided: ${valueHour} , minimun ${this.minHour}`,
      );
    }
  }

  private validateMaximunTime({ value, context }: ValidateDates) {
    const valueHour = value.getUTCHours();
    if (valueHour > this.maxHour) {
      throw new BadRequestError(
        `No valid hour for ${context}: Provided: ${valueHour} , maximun ${this.minHour}`,
      );
    }
  }

  private validateStartDateIsEarlierThanEndDate() {
    if (this.startAt.getTime() >= this.endAt.getTime()) {
      throw new BadRequestError(
        `Start date ${this.startAt.toISOString()} should be ealier than end date ${this.endAt.toISOString()}`,
      );
    }
  }

  private validateElapsedTime() {
    const oneHourInMiliseconds = 3600000;
    const differenceInMs = this.endAt.getTime() - this.startAt.getTime();
    const elapsedtimeInHour = differenceInMs / oneHourInMiliseconds;
    if (elapsedtimeInHour < this.minHoursBooking) {
      const hourContext = `${this.minHoursBooking} hour${
        this.minHoursBooking > 1 ? "s" : ""
      }`;
      throw new BadRequestError(
        `No valid dated. Field start_at should be at least ${hourContext} before end_at. Provided ${
          elapsedtimeInHour.toFixed(2)
        } hour fraction.`,
      );
    }
  }
  private validateDaysInterval() {
    const startAt = this.startAt.getUTCDate();
    const endAt = this.endAt.getUTCDate();
    const days = endAt - startAt;
    if (days > this.maxDays) {
      throw new BadRequestError(
        `No valid amount of days: Provided: ${days} , maximun ${this.maxDays}`,
      );
    }
  }

  toJson() {
    return {
      ...this.aggregateRootPrimitives(),
      user: this.user,
      endAt: this.endAt.toISOString(),
      startAt: this.startAt.toISOString(),
      state: this.state,
    };
  }
}
