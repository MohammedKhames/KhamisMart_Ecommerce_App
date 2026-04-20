import React from 'react'
import apiServices from '../../../../services/api'
import { ProductCard } from '@/components/product/ProductCard'
import { Search } from 'lucide-react'
import { ORANGE, NAVY } from "@/utils/colors";

export const dynamic = "force-dynamic";




interface Props {
  searchParams: Promise<{ search?: string; brand?: string; category?: string }>
}

export default async function Products({ searchParams }: Props) {
  const { search, brand, category } = await searchParams
  let products: import("@/interfaces/IProducts").IProduct[] = [];
  try {
    products = (await apiServices.getProducts()) ?? [];
  } catch {
    products = [];
  }

  // Client-side filter based on search query / brand / category slug
  // Client-side filter based on search query / brand / category slug
  const query = search?.toLowerCase().trim() ?? ""
  const filtered = products.filter((p) => {
    // If specific ID filters are provided, they take priority
    if (category && p.category?._id !== category) return false
    if (brand && p.brand?._id !== brand) return false
    
    // If search query is provided
    if (query) {
      return (
        p.title.toLowerCase().includes(query) ||
        p.brand?.name?.toLowerCase().includes(query) ||
        p.category?.name?.toLowerCase().includes(query)
      )
    }
    
    return true
  })

  return (
    <div className='container mx-auto py-10 px-4'>

      {/* Heading */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: NAVY }}>
          {query
            ? <>Results for: <span style={{ color: ORANGE }}>&ldquo;{search}&rdquo;</span></>
            : <>All <span style={{ color: ORANGE }}>Products</span></>
          }
        </h1>
        <span className="text-sm text-gray-400">{filtered.length} products</span>
      </div>

      {/* No results */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <Search className="h-14 w-14 text-gray-200" />
          <p className="text-lg font-semibold text-gray-500">
            No products found for &ldquo;{search}&rdquo;
          </p>
          <p className="text-sm text-gray-400">Try a different search term or browse all products.</p>
        </div>
      )}

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6'>
        {filtered.map((product) => (
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
  )
}
