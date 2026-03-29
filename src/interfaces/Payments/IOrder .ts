
import { IProduct } from './../IProducts';
import { IShippingAddress } from './IShippingAddress';


export interface IOrder {
  id: string;
  cartItems: {
    product: IProduct;
    quantity: number;
    price: number;
  }[];
  shippingAddress: IShippingAddress;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
}