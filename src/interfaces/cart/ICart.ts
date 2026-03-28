import { ICartProduct } from "./ICartProduct";

export interface ICart {
  _id: string;
  cartOwner: string;
  products: ICartProduct[];
  totalCartPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}