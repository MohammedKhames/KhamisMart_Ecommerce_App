import React from 'react';
import GridSkeleton from '@/components/loading/GridSkeleton';

export default function BrandsLoading() {
  return (
    <div className='py-8 px-4'>
      {/* Heading Skeleton */}
      <h1 className="text-2xl font-bold mb-8 animate-pulse text-transparent bg-gray-200 rounded w-48 h-8">
        Loading
      </h1>

      <GridSkeleton type="brand" count={10} />
    </div>
  );
}
