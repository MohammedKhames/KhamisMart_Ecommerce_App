import React from 'react';
import GridSkeleton from '@/components/loading/GridSkeleton';
import { NAVY, ORANGE } from '@/utils/colors';

export default function ProductsLoading() {
  return (
    <div className='container mx-auto py-10 px-4'>
      
      {/* Heading Skeleton */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold animate-pulse text-transparent bg-gray-200 rounded w-48 h-8">
          Loading
        </h1>
        <span className="text-sm bg-gray-200 text-transparent animate-pulse rounded w-20 h-4">
          count
        </span>
      </div>

      <GridSkeleton type="product" count={8} />
    </div>
  );
}
