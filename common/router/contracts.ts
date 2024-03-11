import { Context, Next } from "oak";

export enum RouterMethodsRegister {
  get = "get",
  post = "post",
  put = "put",
  patch = "patch",
  delete = "delete",
}

export type RouterInterface = {
  method: RouterMethodsRegister;
  path: string;
  handler: (ctx: Context) => Promise<unknown> | void;
  middlewares?: Middlewares[];
};

export type Middlewares = (
  ctx: Context,
  next: Next,
) => Promise<unknown>;
