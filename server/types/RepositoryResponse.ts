import { HttpCode } from "./HttpCode";

export interface Response<T> {
  status: HttpCode;
  data: T;
}
