
import { ICategory } from './ICategory';
import { ISubCategory } from './ISubCategory';
import { IBrand } from './IBrand';


export interface IProduct {
  _id: string;
  id: string;

  title: string;
  slug: string;
  description: string;

  quantity: number;
  price: number;
  sold: number;

  images: string[];
  imageCover: string;

  category: ICategory;
  subcategory: ISubCategory[];
  brand: IBrand;

  ratingsAverage: number;
  ratingsQuantity: number;

  createdAt: string;
  updatedAt: string;
}