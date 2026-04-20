import React from 'react';
import Link from 'next/link';
import { ProductCard } from "@/components/product/ProductCard";
import apiServices from "@/../services/api";
import { ORANGE, NAVY } from "@/utils/colors";

export default async function FeaturedProducts() {
  let products: import("@/interfaces/IProducts").IProduct[] = [];
  try {
    products = (await apiServices.getProducts()) ?? [];
  } catch {
    products = [];
  }

  // Only show first 8 products as featured
  const featured = products.slice(0, 8);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold"> Featured <span style={{ color: ORANGE }} > Products </span></h2>
        <Link href="/products" className="text-sm font-semibold hover:underline flex items-center gap-1" style={{ color: ORANGE }}>
          View all products <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {featured.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            name={product.title}
            images={product.images}
            rating={product.ratingsAverage}
            reviewCount={product.ratingsQuantity}
            price={product.price}
            originalPrice={product.price + 100}
          />
        ))}
      </div>
    </div>
  );
}
