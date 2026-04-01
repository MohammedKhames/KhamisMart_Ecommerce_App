import apiServices from '../../../../../services/api'
import ProductDetailClient from '@/components/product/ProductDetailClient'
import { IProduct } from '@/interfaces/IProducts'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ productId: string }>
}

export default async function ProductDetailPage({ params }: Props) {
  const { productId } = await params

  const product = await apiServices.getProductsDetails(productId)
  if (!product) return notFound()

  // Get related products from same category (excluding current product)
  let relatedProducts: IProduct[] = []
  try {
    if (product.category?._id) {
      const all = await apiServices.getProductsByCategory(product.category._id)
      relatedProducts = all.filter((p) => p._id !== product._id)
    }
  } catch {
    relatedProducts = []
  }

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />
}
