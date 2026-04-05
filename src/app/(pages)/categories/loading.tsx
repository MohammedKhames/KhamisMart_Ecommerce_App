import React from 'react';
import GridSkeleton from '@/components/loading/GridSkeleton';
import { NAVY, ORANGE } from '@/utils/colors';

export default function CategoriesLoading() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold animate-pulse bg-gray-200 text-transparent rounded w-64 h-10">
          Shop by Categories
        </h1>
      </div>
      <GridSkeleton type="category" count={15} />
    </div>
  );
}
