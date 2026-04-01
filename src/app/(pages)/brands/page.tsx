import apiServices from "../../../../services/api"
import Image from "next/image"
import Link from "next/link"
import { ORANGE, NAVY } from "@/utils/colors";




export const dynamic = "force-dynamic"

export default async function BrandsPage() {
  let brands: any[] = []
  try {
    brands = (await apiServices.getBrands()) ?? []
  } catch {
    brands = []
  }

  return (
    <div className="py-8 px-4">
      <h1 className="text-2xl font-bold mb-8" style={{ color: NAVY }}>
        All <span style={{ color: ORANGE }}>Brands</span>
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {brands.map((brand) => (
          <Link
            key={brand._id}
            href={`/brands/${brand._id}`}
            className="group flex flex-col items-center gap-3 p-5 rounded-2xl border border-gray-200 bg-white hover:border-orange-400 hover:shadow-lg transition-all duration-300"
          >
            <div className="relative h-16 w-full flex items-center justify-center">
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-sm font-semibold text-center text-gray-700 group-hover:text-orange-500 transition-colors line-clamp-1">
              {brand.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
