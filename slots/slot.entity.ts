import {
  AggregateRoot,
  AggregateRootProps,
} from "../common/aggregate-root.entity.ts";
import { User } from "../user/user.entity.ts";

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
      throw new Error(
        `No valid hour for ${context}: Provided: ${valueHour} , minimun ${this.minHour}`,
      );
    }
  }

  private validateMaximunTime({ value, context }: ValidateDates) {
    const valueHour = value.getUTCHours();
    if (valueHour > this.maxHour) {
      throw new Error(
        `No valid hour for ${context}: Provided: ${valueHour} , maximun ${this.minHour}`,
      );
    }
  }

  private validateStartDateIsEarlierThanEndDate() {
    if (this.startAt.getTime() > this.endAt.getTime()) {
      throw new Error(
        `From date ${this.startAt.toISOString} should be less than to data ${this.endAt.toISOString()}`,
      );
    }
  }

  private validateDaysInterval() {
    const startAt = this.startAt.getUTCDate();
    const endAt = this.endAt.getUTCDate();
    const days = endAt - startAt;
    if (days > this.maxDays) {
      throw new Error(
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
