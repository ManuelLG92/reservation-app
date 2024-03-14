import { Context, Next } from "hono";

export enum RouterMethodsRegister {
  get = "get",
  post = "post",
  put = "put",
  patch = "patch",
  delete = "delete",
}

export type RouterInterface = {
  controller: string;
  method: RouterMethodsRegister;
  path: string;
  handler: (ctx: Context) => Promise<Response | void> | void;
  middlewares?: Middlewares[];
};

export type Middlewares = (
  ctx: Context,
  next: Next,
) => Promise<void>;
