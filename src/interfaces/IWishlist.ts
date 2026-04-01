export interface IWishlistItem {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  images: string[];
  category: { name: string; _id: string };
  brand: { _id: string; name: string; image: string };
}

export interface IWishlistResponse {
  status: string;
  message?: string;
  data: IWishlistItem[];
  count?: number;
}
