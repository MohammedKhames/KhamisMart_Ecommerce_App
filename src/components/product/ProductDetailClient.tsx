"use client"

import { useState, useContext } from "react"
import { IProduct } from "@/interfaces/IProducts"
import { Star, ShoppingCart, Heart, ChevronLeft, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/helpers/formatPrice"
import Image from "next/image"
import Link from "next/link"
import apiServices from "../../../services/api"
import { toast } from "sonner"
import { cartContext } from "@/contexts/cartContext"
import { useWishlist } from "@/contexts/wishlistContext"
import { useSession } from "next-auth/react"
import { ProductCard } from "@/components/product/ProductCard"
import { ORANGE, NAVY } from "@/utils/colors";




const DEMO_COLORS = ["#1e293b", "#a855f7", "#0ea5e9", "#84cc16", "#f97316"]
const DEMO_SIZES  = ["XS", "S", "M", "L", "XL", "XXL"]

interface Props {
  product: IProduct
  relatedProducts: IProduct[]
}

export default function ProductDetailClient({ product, relatedProducts }: Props) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(DEMO_COLORS[0])
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const { refreshCart } = useContext(cartContext)
  const { wishlistIds, toggleWishlist } = useWishlist()
  const { data: session } = useSession()
  const isWishlisted = wishlistIds.has(product._id)

  const images = product.images?.length ? product.images : [product.imageCover]

  const handleAddToCart = async () => {
    const token = session?.user?.token
    if (!token) { toast.error("Please sign in to add to cart."); return }
    setIsAddingToCart(true)
    try {
      const res = await apiServices.addProductsToCart(product._id, token)
      toast.success(res.message || "Added to cart! 🛒", {
        style: { background: NAVY, color: "#fff", border: `1px solid ${ORANGE}` }
      })
      refreshCart()
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2500)
    } catch {
      toast.error("Failed to add to cart.")
    } finally {
      setIsAddingToCart(false)
    }
  }

  return (
    <div className="py-8 px-4 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-orange-500 transition-colors">Products</Link>
        <span>/</span>
        <span className="text-gray-600 line-clamp-1">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">

        {/* ── Images ── */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 shadow-sm">
            <Image
              src={images[selectedImage]}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
            <button
              className={`absolute top-4 right-4 h-10 w-10 rounded-full flex items-center justify-center shadow-md bg-white/80 backdrop-blur-sm hover:scale-110 transition-all ${isWishlisted ? "text-rose-500" : "text-gray-400 hover:text-rose-500"}`}
              onClick={() => toggleWishlist(product._id)}
              aria-label="Toggle wishlist"
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? "fill-rose-500" : ""}`} />
            </button>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative flex-shrink-0 h-20 w-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? "border-orange-400 shadow-md" : "border-gray-200 hover:border-orange-200"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Info ── */}
        <div className="space-y-5">

          {/* Badges */}
          <div className="flex gap-2 flex-wrap">
            {product.brand && (
              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">{product.brand.name}</Badge>
            )}
            {product.category && (
              <Badge variant="outline">{product.category.name}</Badge>
            )}
          </div>

          <h1 className="text-2xl font-bold leading-snug" style={{ color: NAVY }}>{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.round(product.ratingsAverage) ? "fill-amber-500 text-amber-500" : "text-gray-300"}`} />
              ))}
            </div>
            <span className="text-sm font-medium">{product.ratingsAverage}</span>
            <span className="text-sm text-gray-400">({product.ratingsQuantity} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold" style={{ color: ORANGE }}>{formatPrice(product.price)}</span>
            <span className="text-lg text-gray-400 line-through">{formatPrice(product.price + 80)}</span>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">Save {formatPrice(80)}</Badge>
          </div>

          <p className="text-gray-500 text-sm leading-relaxed">{product.description}</p>

          {/* Colors */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-700">
              Color: <span className="font-normal text-gray-500">{selectedColor}</span>
            </p>
            <div className="flex gap-3">
              {DEMO_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full transition-all ${
                    selectedColor === color ? "ring-2 ring-orange-400 ring-offset-2 scale-110" : "ring-1 ring-gray-300 hover:ring-orange-300"
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Color ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-700">
              Size: <span className="font-normal text-gray-500">{selectedSize ?? "Select a size"}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {DEMO_SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[3rem] h-9 px-3 rounded-xl text-sm font-semibold border transition-all ${
                    selectedSize === size
                      ? "text-white border-transparent"
                      : "bg-white border-gray-200 text-gray-600 hover:border-orange-300"
                  }`}
                  style={selectedSize === size ? { background: ORANGE, color: NAVY } : {}}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Stock */}
          <p className="text-sm">
            <span className="font-medium">Availability: </span>
            {product.quantity > 0
              ? <span className="text-green-600 font-semibold">{product.quantity} in stock</span>
              : <span className="text-red-600 font-semibold">Out of stock</span>}
          </p>

          {/* Actions */}
          <Button
            onClick={handleAddToCart}
            disabled={isAddingToCart || addedToCart || product.quantity === 0}
            className="w-full h-12 rounded-2xl font-bold text-base transition-all hover:opacity-90 hover:scale-[1.01]"
            style={{ background: ORANGE, color: NAVY }}
          >
            {isAddingToCart ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Adding to Cart...</>
            ) : addedToCart ? (
              <><Check className="mr-2 h-5 w-5" />Added to Cart!</>
            ) : (
              <><ShoppingCart className="mr-2 h-5 w-5" />Add to Cart</>
            )}
          </Button>

        </div>
      </div>

      {/* ── Related Products ── */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-6" style={{ color: NAVY }}>
            Related <span style={{ color: ORANGE }}>Products</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProducts.slice(0, 8).map((p) => (
              <ProductCard
                key={p._id}
                id={p._id}
                name={p.title}
                images={p.images}
                rating={p.ratingsAverage}
                reviewCount={p.ratingsQuantity}
                price={p.price}
                originalPrice={p.price + 60}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
