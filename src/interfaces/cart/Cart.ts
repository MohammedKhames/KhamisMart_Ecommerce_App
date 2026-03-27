import { CartProduct } from "./cartProduct";

export interface Cart {
  _id: string;
  cartOwner: string;
  products: CartProduct[];
  totalCartPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}