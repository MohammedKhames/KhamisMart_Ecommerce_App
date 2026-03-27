import React from 'react'
import apiServices from '../../../../services/api';
import { ProductCard } from '@/components/product/ProductCard';
// import ProductCard from '@/components/product/ProductCardOldDesign';


export default async function Products() {


    // getting all products 
    async function getProducts(){
        const products = await apiServices.getProducts()
        return products
    }


    const products = await getProducts();
    console.log(products);



  return (
    <div>
      <div className='container mx-auto py-10'>
        <h1>products</h1>

        <div className='grid grid-cols-4 gap-4'>
            {
                products.map((product)=>{
                  return (
                    <ProductCard 
                    id={product._id}
                    name={product.title} 
                    images={product.images} 
                    rating={product.ratingsAverage} 
                    reviewCount={product.ratingsQuantity}
                    price={product.price}
                    originalPrice={product.price + 100}

                    />
                             
                )})}
        </div>
      </div>
    </div>
  )
}
