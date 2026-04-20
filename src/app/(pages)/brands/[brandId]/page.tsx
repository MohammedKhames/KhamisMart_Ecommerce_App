import apiServices from "../../../../../services/api"
import { notFound } from "next/navigation"
import Image from "next/image"
import { ProductCard } from "@/components/product/ProductCard"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { ORANGE, NAVY } from "@/utils/colors";




interface Props {
  params: Promise<{ brandId: string }>
}

export default async function BrandPage({ params }: Props) {
  const { brandId } = await params

  let brand: any = null
  let products: import("@/interfaces/IProducts").IProduct[] = []

  try {
    const [b, p] = await Promise.all([
      apiServices.getBrandById(brandId),
      apiServices.getProductsByBrand(brandId),
    ])
    brand = b
    products = p || []
  } catch (err) {
    brand = null
    products = []
  }

  if (!brand) return notFound()

  return (
    <div className="py-8 px-4">
      {/* Back link */}
      <Link href="/brands" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-orange-500 transition-colors mb-6">
        <ChevronLeft className="h-4 w-4" /> All Brands
      </Link>

      {/* Brand header */}
      <div className="flex items-center gap-6 mb-8 p-6 rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="relative h-20 w-32 flex-shrink-0">
          <Image src={brand.image} alt={brand.name} fill className="object-contain" />
        </div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: NAVY }}>
            {brand.name}
          </h1>
          <p className="text-gray-400 text-sm">{products.length} products</p>
        </div>
      </div>

      {/* Products */}
      {products.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p>No products found for this brand.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.title}
              images={product.images}
              rating={product.ratingsAverage}
              reviewCount={product.ratingsQuantity}
              price={product.price}
              originalPrice={product.price + 50}
            />
          ))}
        </div>
      )}
    </div>
  )
}
