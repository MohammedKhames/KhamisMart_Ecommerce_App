import React from 'react';
import GridSkeleton from '@/components/loading/GridSkeleton';
import { ORANGE } from '@/utils/colors';

export default function ProductDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Detail side-by-side skeleton */}
      <GridSkeleton type="product-detail" />
      
      {/* Related Products Title */}
      <div className="mt-16 mb-8 border-t border-gray-100 pt-12">
        <h2 className="text-2xl font-bold tracking-tight mb-8">
          Related <span style={{ color: ORANGE }}>Products</span>
        </h2>
        
        {/* Related grid skeleton */}
        <GridSkeleton type="product" count={4} />
      </div>
    </div>
  );
}
