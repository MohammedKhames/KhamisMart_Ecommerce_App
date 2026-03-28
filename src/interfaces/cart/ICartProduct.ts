import { ICategory } from '../ICategory';
import { ISubCategory } from '../ISubCategory';
import { IBrand } from '../IBrand';



export interface ICartProduct {
  _id: string;
  count: number;
  price: number;
  product: IProduct;
}


interface IProduct{
  _id:string,
  id:string,
  title:string,
  slug: string,
  quantity:number,
  imageCover:string,
  category: ICategory,
  brand: IBrand,
  subCategory: ISubCategory[],
  ratingsAverage:number
}