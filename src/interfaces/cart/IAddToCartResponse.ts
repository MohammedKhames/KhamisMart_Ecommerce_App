import { ICart } from "./ICart";

export interface IAddToCartResponse {
  status: string;
  message:string;
  numOfCartItems: number;
  cartId: string;
  data: ICart;
}