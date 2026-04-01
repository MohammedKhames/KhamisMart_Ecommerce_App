"use client";

import { Loader2, Minus, Plus, ShoppingCart as ShoppingCartIcon, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IAddToCartResponse } from "@/interfaces/cart/IAddToCartResponse";
import Link from "next/link";
import { formatPrice } from "@/helpers/formatPrice";
import apiServices from "../../../../services/api";
import CardProduct from "@/components/product/CardProduct";
import { toast } from "sonner";
import { cartContext } from "@/contexts/cartContext";
import { useSession } from "next-auth/react";
import { ORANGE, NAVY } from "@/utils/colors";




const ShoppingCart = ({cart}: {cart: IAddToCartResponse;}) => {

const [innerCart, setInnerCart] = useState<IAddToCartResponse>(cart)
const [isClearingItems, setIsClearingItems] = useState(false)
const [checkoutloading, setCheckoutloading] = useState(false)
const { data: session } = useSession()
const token = session?.user?.token ?? ""

async function removeItemFromShoppingCart(productId: string) {
  const response = await apiServices.deleteProductFromCart(productId, token)
  setInnerCart(response)
  toast.success(response.message, {
    style: { background: NAVY, color: "#fff", border: `1px solid ${ORANGE}` }
  })
}

async function clearAllProductsFromTheCart() {
  setIsClearingItems(true)
  const response = await apiServices.clearCart(token)
  setInnerCart(response)
  setIsClearingItems(false)
}

async function updateProductCount(productId: string, count: number) {
  const response = await apiServices.updateProductCount(productId, count, token)
  setInnerCart(response)
  toast.success(response.message, {
    style: { background: NAVY, color: "#fff", border: `1px solid ${ORANGE}` }
  })
}

async function handleCheckout() {
  setCheckoutloading(true)
  const response = await apiServices.checkout(innerCart.cartId, token)
  setCheckoutloading(false)
  location.href = response.session.url
}

  const { setCartCount } = useContext(cartContext)

  useEffect(() => {
    setCartCount(innerCart.numOfCartItems);
  }, [innerCart, setCartCount])


  if (innerCart.numOfCartItems === 0) {
    return (
      <section className="py-32">
        <div className="container max-w-lg text-center">
          <h1 className="mb-4 text-2xl font-semibold">Your cart is empty</h1>
          <p className="mb-8 text-muted-foreground">
            Looks like you haven&apos;t added anything yet.
          </p>
          <Button asChild className="rounded-full font-bold hover:opacity-90"
            style={{ background: ORANGE, color: NAVY }}>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container grid gap-8">
        <h1 className="mb-8 text-3xl font-semibold" style={{ color: NAVY }}>
          Shopping <span style={{ color: ORANGE }}>Cart</span>
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {innerCart.data.products.map((item) => (

                 <CardProduct key={item._id ?? item.product?._id} item={item}
                    removeItemFromShoppingCart={removeItemFromShoppingCart}
                    updateProductCount={updateProductCount}
                    />

              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold" style={{ color: NAVY }}>Order Summary</h2>

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
                  <span className="text-green-600 font-medium">Free</span>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span style={{ color: ORANGE }}>{formatPrice(innerCart.data.totalCartPrice)}</span>
                </div>
              </div>

              <Button disabled={checkoutloading} onClick={handleCheckout} size="lg"
                className="mt-6 w-full rounded-xl font-bold hover:opacity-90"
                style={{ background: ORANGE, color: NAVY }}>
                {checkoutloading && <Loader2 className="animate-spin mr-2"/>}
                Proceed to Checkout
              </Button>

              <Button variant="outline" className="mt-2 w-full rounded-xl" asChild>
                <Link href="/products"> Continue Shopping </Link>
              </Button>
            </div>
          </div>
        </div>

        <Button
        variant={"destructive"}
        className="w-fit px-8 rounded-xl disabled:opacity-50"
        onClick={clearAllProductsFromTheCart}
        disabled={isClearingItems}
        > 
        {isClearingItems && <Loader2 className="animate-spin mr-2"/>}
        Clear Cart</Button>
      </div>
    </section>
  );
};

export { ShoppingCart };
