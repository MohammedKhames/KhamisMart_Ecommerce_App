import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Loader2, Minus, Plus, Trash2 } from 'lucide-react'
import { formatPrice } from '@/helpers/formatPrice'
import { ICartProduct } from '@/interfaces/cart/ICartProduct'
import { AspectRatio } from '../ui/aspect-ratio'

export default function CardProduct({item, removeItemFromShoppingCart,updateProductCount}:
    {item:ICartProduct,removeItemFromShoppingCart:(productId:string)=>Promise<void>,updateProductCount:(productId:string,count:number)=>Promise<void>}) {

    const [isLoading, setIsLoading] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [isIncreasing, setIsIncreasing] = useState(false)
    const [isDecreasing, setIsDecreasing] = useState(false)
    
    async function handleRemoveItemFromShoppingCart() {
        setIsLoading(true)
        await removeItemFromShoppingCart(item.product._id)
        setIsLoading(false)
        
    }

    async function handleUpdateProductCount(count:number){

        if(count>item.count){
            setIsIncreasing(true)
        }else{
            setIsDecreasing(true)
        }
        setIsUpdating(true)


        await updateProductCount(item.product._id,count)

        setIsUpdating(false)
        setIsIncreasing(false)
        setIsDecreasing(false)



    }


  return (
    <div key={item._id} className="flex gap-4 rounded-lg border bg-card p-4">
        <div className="w-24 shrink-0">

            <AspectRatio ratio={1} className="overflow-hidden rounded-md bg-muted">
                <img src={item.product.imageCover} alt={item.product.title} className="size-full object-cover"/>
            </AspectRatio>
        </div>

        <div className="flex flex-1 flex-col justify-between">
            <Link href={"/products/" + item.product._id}>
                <h3 className="font-medium">{item.product.title}</h3>
                
            </Link>

            <div className="flex items-center gap-2">
             <Button  disabled={item.count == 1 || isUpdating} variant="outline"  size="icon" className="size-8"
                onClick={() => handleUpdateProductCount(item.count-1)}
                >
              {isDecreasing ?<Loader2 className="size-3 animate-spin"/> : <Minus className="size-3" />} 
            </Button>
            <span className="w-8 text-center">{item.count}</span>
            <Button disabled={isUpdating} variant="outline" size="icon" className="size-8"
                onClick={() => handleUpdateProductCount(item.count+1)}
                >
             {isIncreasing ?<Loader2 className="size-3 animate-spin"/> : <Plus className="size-3"/>} 
            
            </Button>
            </div>
        </div>

        <div className="flex flex-col items-end justify-between">
        <div className="text-right">
            <p className="font-semibold">
            {formatPrice(item.price * item.count)}
            </p>
            <p className="text-sm text-muted-foreground">
            {formatPrice(item.price)} each
            </p>
        </div>
        <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={handleRemoveItemFromShoppingCart}
            disabled={isLoading}
        >
            {isLoading? (<Loader2 className="mr-1 size-4 animate-spin"/>):(<Trash2 className="mr-1 size-4" />)}
            Remove
        </Button>
        </div>
    </div>
  )
}
