



import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { renderStars } from '@/helpers/renderStars';
import { IProduct } from '@/interfaces/IProducts';

export default function ProductCard({product}: {product: IProduct}) {
  return (
    <div className='group relative bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300'>
                    {/*a) Product Image */}
                    <div className='relative aspect-square overflow-hidden'>

                       <img src={product.imageCover} alt={product.title} className='object-cover group-hover:scale-105 transition-transform duration-300'/>

                       {/* whishlist Button */}
                       <Button variant="ghost" size="sm" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white" >
                         <Heart className='h-4 w-4'/>
                       </Button>

                      {/* Popular Badge For most Sold products */}
                       {product.sold >100 &&(
                        <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                          Popular
                        </div>
                       )}
                    </div>


                    {/*b) Product info */}
                    <div className='p-4'>

                      {/* brand */}
                      <p className='text-xs text-muted-foreground mb-1 uppercase tracking-wide'>
                        <Link href={`/brands/${product.brand._id}`} className='hover:text-primary hover:underline transition-colors'> 
                           {product.brand.name}
                        </Link>
                      </p>

                      {/* Title */}
                      <h3 className='font-semibold text-sm mb-2 line-clamp-2 hover:text-primary transition-colors'>
                        <Link href={`/products/${product.id}`}>
                           {product.title}
                        </Link>
                      </h3>

                      {/* Rating */}
                      <div className='flex items-center gap-1 mb-2'>
                        <div className='flex'>
                          {renderStars(product.ratingsAverage)}
                        </div>

                        <span className='text-xs text-muted-foreground'>
                          ({product.ratingsQuantity})
                        </span>
                      </div>

                        {/* Category */}
                        <p className='text-xs text-muted-foreground mb-2'>
                          <Link href={`/categories/${product.category._id}`} className='hover:text-primary hover:underline transition-colors'>
                          {product.category.name}
                          </Link>

                        </p>

                        {/* price */}
                        <div className='flex items-center justify-between mb-3'>
                          <span className='text-lg font-bold text-primary'>

                            {  }

                          </span>
                          <span className='text-ts text-muted-foreground'>
                            {product.sold>1000 ? "1000" : product.sold }+ Sold
                          </span>
                        </div>


                        {/* Add to Cart */}
                        <Button className='w-full' size="sm">

                          {   }

                          Add to Cart
                        </Button>
                      </div>
                    </div>  
  )
}
