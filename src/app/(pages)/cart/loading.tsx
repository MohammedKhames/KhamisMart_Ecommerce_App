import React from 'react';
import GridSkeleton from '@/components/loading/GridSkeleton';
import { ORANGE, NAVY } from '@/utils/colors';

export default function CartLoading() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl lg:py-16">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items side */}
        <div className="lg:w-2/3">
          <div className="h-10 bg-gray-200 rounded w-48 mb-8 animate-pulse"></div>
          <GridSkeleton type="cart-item" count={4} />
        </div>
        
        {/* Summary side */}
        <div className="lg:w-1/3">
           <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="space-y-4 mb-8">
                 <div className="flex justify-between">
                    <div className="h-4 bg-gray-100 rounded w-20"></div>
                    <div className="h-4 bg-gray-100 rounded w-16"></div>
                 </div>
                 <div className="flex justify-between border-t border-gray-200 pt-4">
                    <div className="h-6 bg-gray-200 rounded w-24"></div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                 </div>
              </div>
              <div className="h-14 bg-gray-200 rounded-2xl w-full"></div>
           </div>
        </div>
      </div>
    </div>
  );
}
