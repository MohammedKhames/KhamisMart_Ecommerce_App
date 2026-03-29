
import { ResponseType } from "@/types/ResponseType";
import { IProduct } from './../src/interfaces/IProducts';
import { IAddToCartResponse } from "@/interfaces/cart/IAddToCartResponse";
import { ICheckout } from "@/interfaces/Payments/ICheckout ";
import { IShippingAddress } from "@/interfaces/Payments/IShippingAddress";
import { IOrdersResponse } from "@/interfaces/Payments/IOrdersResponse ";
import { SignInResponse } from "@/types/SignInResponse";


class ApiServices{

    #BASE_URL=process.env.NEXT_PUBLIC_BASE_URL
    #headers ={
        "content-type":"application/json",
        token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YzY2OThhMmMzMGFkYTliZWM0ZTNlYiIsIm5hbWUiOiJNb2hhbW1lZCBLaGFtaXMiLCJyb2xlIjoidXNlciIsImlhdCI6MTc3NDYxMDgyNywiZXhwIjoxNzgyMzg2ODI3fQ.yP560Q3pc1Mi5LpM-1daSJjPSzeB7ubZBM1iCmNGYVE"
    }


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
    async addProductsToCart(productId:string): Promise<IAddToCartResponse>{
      const response = await fetch( this.#BASE_URL + "/api/v2/cart",{
        method:"post",
        body:JSON.stringify({productId:productId}), 
        headers: this.#headers 
      })

        const data = await response.json()
        return data;
      }


   //get cart
   async getCart():Promise<IAddToCartResponse>{
     const response = await fetch( this.#BASE_URL + "/api/v2/cart",{ 
       headers: this.#headers 
     })
     const data = await response.json()
      return data;

   }
     

   // Remove Product from cart
   async deleteProductFromCart(productId: string):Promise<IAddToCartResponse>{
    const response = await fetch( this.#BASE_URL + "/api/v2/cart/"+productId,{ 
       method:"delete",
       headers: this.#headers 
     })
     const data = await response.json()
      return data;
   }


   // Clear Cart
   async clearCart():Promise<any>{
    const response = await fetch( this.#BASE_URL + "/api/v2/cart",{ 
       method:"delete",
       headers: this.#headers 
     })
     const data = await response.json()
      return data;
   }


   // update Product count in cart
   async updateProductCount(productId: string, count: number):Promise<IAddToCartResponse>{
    const response = await fetch( this.#BASE_URL + "/api/v2/cart/"+productId,{ 
       method:"put",
       headers: this.#headers ,
       body: JSON.stringify({count})
     })
     const data = await response.json()
      return data;
   }



   //checkout
   async checkout(cartId: string) {
    return await fetch(this.#BASE_URL + "/api/v1/orders/checkout-session/" + cartId + "?url=http://localhost:3000",
    {
      body: JSON.stringify({
        shippingAddress: {
          details: "details",
          phone: "01010700999",
          city: "Cairo",
        },
      }),
      headers: this.#headers,
      method:"post"
    }).then(res => res.json());
}





  // ✅ checkout - NEW
  async checkout_new(cartId: string, shippingAddress: IShippingAddress): Promise<ICheckout> {
    const response = await fetch(
      this.#BASE_URL + "/api/v1/orders/checkout-session/" + cartId + "?url=http://localhost:3000",
      {
        method: "post",
        headers: this.#headers,
        body: JSON.stringify({ shippingAddress }),
      }
    )
    const data: ICheckout = await response.json()
    return data;
  }

  // ✅ getOrders - NEW
  async getOrders(): Promise<IOrdersResponse> {
    const response = await fetch(this.#BASE_URL + "/api/v1/orders", {
      headers: this.#headers,
    })
    const data: IOrdersResponse = await response.json()
    return data;
  }




  async signIn(email:string, password:string): Promise<SignInResponse>{
    const response =await fetch(this.#BASE_URL+"/api/v1/auth/signin",{
      method:"post",
      headers:this.#headers,
      body:JSON.stringify({
        email,
        password
      })
    })
    const data = await response.json()
      return data;

  }


}

     


const apiServices = new ApiServices();
export default apiServices;