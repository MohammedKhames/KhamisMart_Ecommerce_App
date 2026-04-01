
"use client";

import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  ShoppingCart,
  Star,
  ChevronLeft,
  ChevronRight,
  Check,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/helpers/formatPrice";
import apiServices from "../../../services/api";
import { toast } from "sonner";
import { cartContext } from "@/contexts/cartContext";
import { useWishlist } from "@/contexts/wishlistContext";
import { useSession } from "next-auth/react";
import { ORANGE, NAVY } from "@/utils/colors";




export interface ProductCardProps {
  name?: string;
  price?: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  images?: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  discount?: number;
  freeShipping?: boolean;
  id: string;
}

export function ProductCard({
  name = "Premium Wool Sweater",
  price = 89.99,
  originalPrice = 129.99,
  rating = 4.8,
  reviewCount = 142,
  images = ["/logo.svg", "/logo.svg", "/logo.svg"],
  isNew = true,
  isBestSeller = true,
  discount = 30,
  freeShipping = true,
  id,
}: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const { refreshCart } = useContext(cartContext);
  const { wishlistIds, toggleWishlist } = useWishlist();
  const { data: session } = useSession();
  const isWishlisted = wishlistIds.has(id);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAddedToCart) return;
    const token = session?.user?.token;
    if (!token) {
      toast.error("Please sign in to add items to cart.");
      return;
    }
    setIsAddingToCart(true);
    try {
      const response = await apiServices.addProductsToCart(id, token);
      toast.success(response.message || "Added to cart! 🛒", {
        style: { background: NAVY, color: "#fff", border: `1px solid ${ORANGE}` }
      });
      refreshCart();
      setIsAddedToCart(true);
      setTimeout(() => setIsAddedToCart(false), 2000);
    } catch {
      toast.error("Failed to add to cart.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await toggleWishlist(id);
  };

  return (
    <Link href={`/products/${id}`} className="block">
      <Card className="w-full max-w-sm overflow-hidden group bg-background text-foreground shadow-md hover:shadow-xl transition-all duration-300 rounded-xl cursor-pointer">
        {/* Image carousel */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={`${name}`}
            className="object-cover w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Navigation arrows */}
          <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="secondary" size="icon"
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-sm"
              onClick={prevImage}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon"
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-sm"
              onClick={nextImage}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Image indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
              {images.map((_, index) => (
                <button key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    index === currentImageIndex ? "w-4" : "opacity-50"
                  }`}
                  style={{ background: ORANGE }}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentImageIndex(index); }}
                />
              ))}
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {isNew && <Badge className="bg-blue-500 hover:bg-blue-500/90 text-xs">New</Badge>}
            {isBestSeller && <Badge className="bg-amber-500 hover:bg-amber-500/90 text-xs">Best Seller</Badge>}
            {discount > 0 && <Badge className="bg-rose-500 hover:bg-rose-500/90 text-xs">-{discount}%</Badge>}
          </div>

          {/* Wishlist button */}
          <button
            className={`absolute top-3 right-3 h-8 w-8 rounded-full flex items-center justify-center shadow-sm transition-all bg-white/80 backdrop-blur-sm hover:scale-110 ${
              isWishlisted ? "text-rose-500" : "text-gray-400 hover:text-rose-500"
            }`}
            onClick={handleWishlist}
            aria-label="Toggle wishlist"
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-rose-500" : ""}`} />
          </button>
        </div>

        {/* Content */}
        <CardContent className="p-4 pb-2">
          <div className="space-y-2">
            <p className="font-semibold line-clamp-2 text-sm leading-snug">{name}</p>
            <div className="flex items-center gap-2">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span className="text-sm font-medium">{rating}</span>
              <span className="text-xs text-muted-foreground">({reviewCount})</span>
              {freeShipping && (
                <span className="text-xs text-emerald-600 ml-auto">Free shipping</span>
              )}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold" style={{ color: ORANGE }}>{formatPrice(price)}</span>
              {originalPrice > price && (
                <span className="text-xs text-muted-foreground line-through">{formatPrice(originalPrice)}</span>
              )}
            </div>
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="p-4 pt-2">
          <Button
            className="w-full rounded-xl font-bold text-sm transition-all hover:opacity-90"
            style={{ background: ORANGE, color: NAVY }}
            onClick={handleAddToCart}
            disabled={isAddingToCart || isAddedToCart}
          >
            {isAddingToCart ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Adding...</>
            ) : isAddedToCart ? (
              <><Check className="mr-2 h-4 w-4" />Added to Cart</>
            ) : (
              <><ShoppingCart className="mr-2 h-4 w-4" />Add to Cart</>
            )}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
