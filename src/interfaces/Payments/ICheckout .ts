export interface ICheckout {
  status: string;
  session: {
    id: string;
    url: string;
  };
}