import React from 'react'
import apiServices from '../../../services/api';
import { ICategory } from '@/interfaces/ICategory';

import Link from 'next/link';
import { ORANGE, NAVY } from "@/utils/colors";

export default async function Categories() {


     // getting all categories 
    let categories: ICategory[] = [];
    try {
        categories = (await apiServices.getCategories()) ?? [];
    } catch {
        categories = [];
    }


    function CatItem({categ}:{categ:ICategory}) {
        return (
          <Link href={`/products?category=${categ._id}`} className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer border border-gray-100 group">
            <div className="relative w-20 h-20 mb-4 overflow-hidden rounded-full shadow-sm ring-2 ring-gray-50 group-hover:ring-orange-100 transition-all">
              <img
                src={categ.image}
                alt={categ.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="text-sm font-bold text-gray-800 text-center group-hover:text-orange-600 transition-colors">{categ.name}</h3>
          </Link>
        );
      }

  return (
      <div className='container mx-auto py-10 px-4'>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold"> Shop by <span style={{ color: ORANGE }} > Categories </span></h2>
          <Link href="/categories" className="text-sm font-semibold hover:underline flex items-center gap-1" style={{ color: ORANGE }}>
            View all categories <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
          
        <div className='grid grid-cols-2 lg:grid-cols-5 gap-4 md:grid-cols-5 '>
          {
            categories.map(categ => <CatItem key={categ._id} categ={categ} /> )

          }
        </div>
     </div>
  )
}
