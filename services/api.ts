
import { ResponseType } from "@/types/ResponseType";
import { IProduct } from './../src/interfaces/IProducts';
import { AddToCartResponse } from "@/interfaces/cart/AddToCartResponse";


class ApiServices{

    #BASE_URL=process.env.NEXT_PUBLIC_BASE_URL


    // get products
   async getProducts(): Promise<IProduct[]>{
      const response = await fetch( this.#BASE_URL + "/api/v1/products")
      const data:ResponseType<IProduct> = await response.json()
      return data.data;
    }


    // get Product Details

     async getProductsDetails(productId:string): Promise<IProduct>{
      const response = await fetch( this.#BASE_URL + "/api/v1/products/" + productId)
      const {data:product} = await response.json()
      return product;
    }


    // add product to cart
 async addProductsToCart(productId:string): Promise<AddToCartResponse>{
      const response = await fetch( this.#BASE_URL + "/api/v1/cart",{
        method:"post",
        body:JSON.stringify({
            productId:productId
        }),
      headers:{
        "content-type":"application/json",
        token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YzY2OThhMmMzMGFkYTliZWM0ZTNlYiIsIm5hbWUiOiJNb2hhbW1lZCBLaGFtaXMiLCJyb2xlIjoidXNlciIsImlhdCI6MTc3NDYxMDgyNywiZXhwIjoxNzgyMzg2ODI3fQ.yP560Q3pc1Mi5LpM-1daSJjPSzeB7ubZBM1iCmNGYVE"
    }
     })

     const data = await response.json()
     return data;

    }
}

     


const apiServices = new ApiServices();
export default apiServices;