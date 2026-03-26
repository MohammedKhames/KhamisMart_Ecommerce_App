import React from 'react'
import apiServices from '../../../services/api';
import ProductCard from '@/components/ProductCard';


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

        <div className='grid grid-cols-6'>
            {
                products.map((product)=>{
                  return (
                    <ProductCard product={product}/>
                             
                )})}
        </div>
      </div>
    </div>
  )
}
