import React from 'react';
import GridSkeleton from '@/components/loading/GridSkeleton';
import { Package } from 'lucide-react';
import { NAVY, ORANGE } from '@/utils/colors';

export default function OrdersLoading() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-pulse">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-6 bg-gray-200 text-transparent rounded w-64 h-10">
        My Orders (0)
      </h1>

      {/* Orders List Skeleton */}
      <div className="space-y-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            {/* Header Skeleton */}
            <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-3 bg-gray-50">
               <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-gray-300" />
                  <div className="space-y-1">
                     <div className="h-3 w-16 bg-gray-200 rounded"></div>
                     <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  </div>
               </div>
               <div className="space-y-1">
                  <div className="h-3 w-12 bg-gray-200 rounded"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
               </div>
               <div className="space-y-1">
                  <div className="h-3 w-10 bg-gray-200 rounded"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
               </div>
               <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
            </div>
            {/* Items Skeleton */}
            <div className="p-6">
               <GridSkeleton type="cart-item" count={2} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
