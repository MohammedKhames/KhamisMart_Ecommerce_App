import React from 'react'
import apiServices from '../../../../../services/api'
import ProductDetail from '@/components/e-commerce-product-detail'

export default async function ProductDetails({
    params
    }:{
        params: Promise<{productId: string}>
    }) {

    const productId= await params.then( (response)=> response.productId )

    const product = await apiServices.getProductsDetails(productId)


  return (
    <div>
      <ProductDetail product={product}/>
    </div>
  )
}
