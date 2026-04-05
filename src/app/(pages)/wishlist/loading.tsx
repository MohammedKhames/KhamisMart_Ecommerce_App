import React from 'react';
import GridSkeleton from '@/components/loading/GridSkeleton';
import { ORANGE } from '@/utils/colors';

export default function WishlistLoading() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold animate-pulse bg-gray-200 text-transparent rounded w-64 h-10">
          My Wishlist
        </h1>
      </div>
      <GridSkeleton type="product" count={8} />
    </div>
  );
}
