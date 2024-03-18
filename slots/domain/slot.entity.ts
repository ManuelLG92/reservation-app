import {
  AggregateRoot,
  AggregateRootOutProps,
  AggregateRootProps,
} from "src/common/domain/entity/aggregate-root.entity.ts";
import { User } from "src/user/user.entity.ts";
import { BadRequestError } from "src/common/errors/bad-request-error.ts";

export enum SlotStates {
  draft = "draft",
  confirmed = "confirmed",
}

export interface SlotInputProps extends AggregateRootProps {
  startAt: Date;
  endAt: Date;
  user: User;
  state?: SlotStates;
}

export interface SlotOutputProps extends AggregateRootOutProps {
  startAt: string;
  endAt: string;
  state: SlotStates;
  user: User;
}
export interface SlotToPersistenceProps extends AggregateRootOutProps {
  startAt: string;
  endAt: string;
  state: SlotStates;
  user: string;
}

interface ValidateDates {
  value: Date;
  context: string;
}

export class Slot
  extends AggregateRoot<SlotOutputProps, SlotToPersistenceProps> {
  private readonly minHour = 8;
  private readonly maxHour = 20;
  private readonly maxDays = 7;
  private readonly minHoursBooking = 4;
  #startAt: Date;
  #endAt: Date;
  #user: User;
  #state: SlotStates;
  constructor({ startAt, endAt, user, state, ...rest }: SlotInputProps) {
    super(rest);
    this.#startAt = startAt;
    this.#endAt = endAt;
    this.#user = user;
    this.#state = state ?? SlotStates.draft;
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
  get state(): SlotStates {
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
    const values: ValidateDates[] = [{
      value: this.startAt,
      context: "startAt",
    }, {
      value: this.endAt,
      context: "endAt",
    }];
    for (const value of values) {
      this.validateMinimumTime(value);
      this.validateMaximumTime(value);
    }
  }

  private validateMinimumTime({ value, context }: ValidateDates) {
    const valueHour = value.getUTCHours();
    if (valueHour < this.minHour) {
      throw new BadRequestError(
        `No valid hour for ${context}: Provided: ${valueHour} , minimum ${this.minHour}`,
      );
    }
  }

  private validateMaximumTime({ value, context }: ValidateDates) {
    const valueHour = value.getUTCHours();
    if (valueHour > this.maxHour) {
      throw new BadRequestError(
        `No valid hour for ${context}: Provided: ${valueHour} , maximum ${this.minHour}`,
      );
    }
  }

  private validateStartDateIsEarlierThanEndDate() {
    if (this.startAt.getTime() >= this.endAt.getTime()) {
      throw new BadRequestError(
        `Start date ${this.startAt.toISOString()} should be earlier than end date ${this.endAt.toISOString()}`,
      );
    }
  }

  private validateElapsedTime() {
    const oneHourInMilliseconds = 3600000;
    const differenceInMs = this.endAt.getTime() - this.startAt.getTime();
    const elapsedTimeInHour = differenceInMs / oneHourInMilliseconds;
    if (elapsedTimeInHour < this.minHoursBooking) {
      const hourContext = `${this.minHoursBooking} hour${
        this.minHoursBooking > 1 ? "s" : ""
      }`;
      throw new BadRequestError(
        `No valid dated. Field start_at should be at least ${hourContext} before end_at. Provided ${
          elapsedTimeInHour.toFixed(2)
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
        `No valid amount of days: Provided: ${days} , maximum ${this.maxDays}`,
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
  toPersistance() {
    return {
      ...this.aggregateRootPrimitives(),
      user: this.user.id,
      endAt: this.endAt.toISOString(),
      startAt: this.startAt.toISOString(),
      state: this.state,
    };
  }

  static fromPrimitives(
    { startAt, endAt, state, user, ...rest }: SlotOutputProps,
  ) {
    return new Slot({
      ...AggregateRoot.convertOutputToInput(rest),
      startAt: new Date(startAt),
      endAt: new Date(endAt),
      state,
      user,
    });
  }

  static fromPrimitiveCollection(data: SlotOutputProps[]) {
    return data.map((item) => Slot.fromPrimitives(item));
  }
}
