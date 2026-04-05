import React from 'react';
import GridSkeleton from '@/components/loading/GridSkeleton';
import { ChevronLeft } from 'lucide-react';

export default function BrandDetailLoading() {
  return (
    <div className="py-8 px-4 animate-pulse">
      {/* Back link skeleton */}
      <div className="inline-flex items-center gap-1 text-sm bg-gray-100 text-transparent rounded w-24 h-5 mb-6">
        <ChevronLeft className="h-4 w-4" /> Back
      </div>

      {/* Brand header skeleton */}
      <div className="flex items-center gap-6 mb-8 p-6 rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="h-20 w-32 bg-gray-200 rounded-xl"></div>
        <div className="space-y-2">
          <div className="h-8 w-48 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-100 rounded"></div>
        </div>
      </div>

      {/* Products grid skeleton */}
      <GridSkeleton type="product" count={8} />
    </div>
  );
}
