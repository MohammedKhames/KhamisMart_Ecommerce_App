import React from 'react'
import apiServices from '../../../services/api';
import { ICategory } from '@/interfaces/ICategory';

export default async function Categories() {

const ORANGE = "#FF9900";
const NAVY   = "#131921";

     // getting all categories 
    async function getCategories(){
        const categories = await apiServices.getCategories()
        return categories
    }

    const categories = await getCategories();


    function CatItem({categ}:{categ:ICategory}) {
        return (
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
            <img
              src={categ.image}
              alt={categ.name}
              className="w-16 h-16 object-cover mb-2 rounded-full"
            />
            <h3 className="text-sm font-medium text-gray-800">{categ.name}</h3>
          </div>
        );
      }

  return (
      <div className='container mx-auto py-10'>

        <h2> Shop by <span style={{ color: ORANGE }} > Categories </span></h2>
          
        <div className='grid grid-cols-2 lg:grid-cols-5 gap-4 md:grid-cols-5 '>
          {
            categories.map(categ => <CatItem key={categ._id} categ={categ} /> )

          }
        </div>
     </div>
  )
}
