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
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100">
            <img
              src={categ.image}
              alt={categ.name}
              className="w-20 h-20 object-cover mb-4 rounded-full shadow-sm"
            />
            <h3 className="text-sm font-bold text-gray-800 text-center">{categ.name}</h3>
          </div>
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
