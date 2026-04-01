export interface IOrderItem {
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    category: { name: string };
    brand: { name: string };
  };
  _id: string;
}

export interface IOrder {
  _id: string;
  id: number;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  cartItems: IOrderItem[];
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
  };
  paymentMethodType: "card" | "cash";
  totalOrderPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}
