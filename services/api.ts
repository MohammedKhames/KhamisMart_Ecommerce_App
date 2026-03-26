
import { ResponseType } from "@/types/ResponseType";
import { IProduct } from './../src/interfaces/IProducts';


class ApiServices{


    // get products
   async getProducts(): Promise<IProduct[]>{
      const response = await fetch(process.env.BASE_URL + "/api/v1/products")
      const data:ResponseType<IProduct> = await response.json()
      return data.data;
    }





}

const apiServices = new ApiServices();
export default apiServices;