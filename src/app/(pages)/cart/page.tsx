import React from 'react'
import apiServices from '../../../../services/api'
import { ShoppingCart } from './ShoppingCart'

export default async function Cart() {
   const cart = await apiServices.getCart()
   console.log(cart)


  return (
    <ShoppingCart cart={cart}/>
  )
}
