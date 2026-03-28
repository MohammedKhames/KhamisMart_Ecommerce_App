"use client";

import { Loader2, Minus, Plus, ShoppingCart as ShoppingCartIcon, Trash2 } from "lucide-react";
import { useState } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IAddToCartResponse } from "@/interfaces/cart/IAddToCartResponse";
import Link from "next/link";
import { formatPrice } from "@/helpers/formatPrice";
import apiServices from "../../../../services/api";
import CardProduct from "@/components/product/CardProduct";
import { toast } from "sonner";

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
}

const DEFAULT_ITEMS: CartItem[] = [
  {
    id: "1",
    name: "Minimalist Beige Sneakers",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Minimalist-Beige-Sneakers-2.png",
    price: 120.0,
    quantity: 1,
    variant: "Size: EU 36",
  },
  {
    id: "2",
    name: "Embroidered Blue Top",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Woman-in-Embroidered-Blue-Top-2.png",
    price: 140.0,
    quantity: 1,
    variant: "Size: S",
  },
  {
    id: "3",
    name: "Classic Fedora Hat",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/accessories/Classic-Fedora-Hat-2.png",
    price: 84.0,
    quantity: 1,
    variant: "Color: Beige",
  },
];

const ShoppingCart = ({cart}: {cart: IAddToCartResponse;}) => {

const [innerCart, setInnerCart] =useState<IAddToCartResponse>(cart)
const [isClearingItems,setIsClearingItems] = useState(false)


// the following function we donot use it here, we send them to card product 
async function  removeItemFromShoppingCart(productId:string){
 
  const response = await apiServices.deleteProductFromCart(productId)
  setInnerCart(response)
  toast.success(response.message,{
    style:{
      color:"white",
      background:"green"
    }
  })
  
}

async function clearAllProductsFromTheCart(){
  setIsClearingItems(true)
  const response = await apiServices.clearCart()
  setInnerCart(response)
  setIsClearingItems(false)

}

async function updateProductCount(productId: string, count: number){
  const response = await apiServices.updateProductCount(productId, count)
  setInnerCart(response)
  toast.success(response.message,{
    style:{
      color:"white",
      background:"green"
    }
  })
}


 

  if (innerCart.numOfCartItems === 0) {
    return (
      <section className="py-32">
        <div className="container max-w-lg text-center">
          <h1 className="mb-4 text-2xl font-semibold">Your cart is empty</h1>
          <p className="mb-8 text-muted-foreground">
            Looks like you haven't added anything yet.
          </p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="">
      <div className="container grid gap-8">
        <h1 className="mb-8 text-3xl font-semibold">Shopping Cart</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {innerCart.data.products.map((item) => (

                 <CardProduct  item={item}  
                    removeItemFromShoppingCart={removeItemFromShoppingCart}
                    updateProductCount={updateProductCount}
                    />

              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <ShoppingCartIcon className="size-4" />
                    {innerCart.numOfCartItems} {innerCart.numOfCartItems === 1 ? "item" : "items"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(innerCart.data.totalCartPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formatPrice(0)}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(innerCart.data.totalCartPrice)}</span>
                </div>
              </div>

              <Button size="lg" className="mt-6 w-full">
                Proceed to Checkout
              </Button>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Taxes calculated at checkout
              </p>
            </div>
          </div>
        </div>

        <Button
        variant={"secondary"}
        style={{backgroundColor:"red",color:"white"}}
        className="w-fit px-8 disabled:bg-red-300"
        onClick={clearAllProductsFromTheCart}
        disabled={isClearingItems}
        > 
        {isClearingItems && <Loader2 className="animate-spin"/>}
        Clear Cart</Button>
      </div>
    </section>
  );
};

export { ShoppingCart };
