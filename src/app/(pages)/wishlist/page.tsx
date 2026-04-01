"use client"

import { useWishlist } from "@/contexts/wishlistContext"
import { useSession } from "next-auth/react"
import { Heart, Trash2, Loader2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/helpers/formatPrice"
import Image from "next/image"
import Link from "next/link"
import apiServices from "../../../../services/api"
import { useContext } from "react"
import { cartContext } from "@/contexts/cartContext"
import { toast } from "sonner"
import { ORANGE, NAVY } from "@/utils/colors";




export default function WishlistPage() {
  const { wishlistItems, isLoading, toggleWishlist, refreshWishlist } = useWishlist()
  const { refreshCart } = useContext(cartContext)
  const { data: session, status } = useSession()

  const handleAddToCart = async (productId: string) => {
    const token = session?.user?.token
    if (!token) { toast.error("Please sign in."); return }
    try {
      const res = await apiServices.addProductsToCart(productId, token)
      toast.success(res.message || "Added to cart! 🛒", {
        style: { background: NAVY, color: "#fff", border: `1px solid ${ORANGE}` }
      })
      refreshCart()
    } catch {
      toast.error("Failed to add to cart.")
    }
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <Heart className="h-16 w-16 text-gray-300" />
        <h2 className="text-xl font-bold text-gray-700">Sign in to see your wishlist</h2>
        <Link href="/auth/signin" className="px-6 py-2 rounded-full font-bold text-sm"
          style={{ background: ORANGE, color: NAVY }}>Sign In</Link>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: ORANGE }} />
      </div>
    )
  }

  if (!wishlistItems.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <ShoppingBag className="h-16 w-16 text-gray-300" />
        <h2 className="text-xl font-bold text-gray-700">Your wishlist is empty</h2>
        <p className="text-gray-400 text-sm">Browse products and tap ❤️ to save your favourites.</p>
        <Link href="/products" className="px-6 py-2 rounded-full font-bold text-sm"
          style={{ background: ORANGE, color: NAVY }}>Explore Products</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: NAVY }}>
          Wishlist <span style={{ color: ORANGE }}>({wishlistItems.length})</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlistItems.map((product) => (
          <div key={product._id} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
            <Link href={`/products/${product._id}`} className="block">
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={(e) => { e.preventDefault(); toggleWishlist(product._id) }}
                  className="absolute top-3 right-3 h-8 w-8 rounded-full flex items-center justify-center shadow-sm bg-white/80 backdrop-blur-sm hover:scale-110 transition-all text-rose-500">
                  <Heart className="h-4 w-4 fill-rose-500" />
                </button>
              </div>
            </Link>
            <div className="p-4 space-y-3">
              <div>
                <Link href={`/products/${product._id}`}>
                  <p className="font-semibold text-sm line-clamp-2 hover:text-orange-500 transition-colors">{product.title}</p>
                </Link>
                <p className="text-xs text-gray-400 mt-1">{product.brand?.name} · {product.category?.name}</p>
              </div>
              <p className="font-bold" style={{ color: ORANGE }}>{formatPrice(product.price)}</p>
              <div className="flex gap-2">
                <Button
                  className="flex-1 rounded-xl text-xs font-bold hover:opacity-90"
                  style={{ background: ORANGE, color: NAVY }}
                  onClick={() => handleAddToCart(product._id)}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl border-red-200 text-red-400 hover:bg-red-50 hover:text-red-600"
                  onClick={() => toggleWishlist(product._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
