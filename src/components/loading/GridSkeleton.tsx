import React from 'react';

interface Props {
  count?: number;
  type?: "product" | "category" | "brand" | "product-detail" | "cart-item" | "profile";
}

export default function GridSkeleton({ count = 8, type = "product" }: Props) {
  
  const skeletons = Array.from({ length: count });

  if (type === "category") {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:grid-cols-5">
        {skeletons.map((_, i) => (
          <div key={i} className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 animate-pulse">
            <div className="w-20 h-20 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "brand") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {skeletons.map((_, i) => (
           <div key={i} className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-gray-100 bg-gray-50 animate-pulse">
               <div className="h-16 w-full bg-gray-200 rounded-xl"></div>
               <div className="h-4 w-20 bg-gray-200 rounded mt-2"></div>
           </div>
        ))}
      </div>
    );
  }

  if (type === "product-detail") {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Gallery Skeleton */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-3xl w-full"></div>
            <div className="flex gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-20 h-20 bg-gray-100 rounded-xl"></div>
              ))}
            </div>
          </div>
          {/* Content Skeleton */}
          <div className="space-y-6 py-4">
            <div className="h-4 bg-gray-100 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded w-3/4"></div>
            <div className="flex gap-2">
               <div className="h-5 bg-gray-100 rounded w-24"></div>
               <div className="h-5 bg-gray-100 rounded w-24"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded w-1/3 mt-4"></div>
            <div className="space-y-2 mt-8">
               <div className="h-4 bg-gray-100 rounded w-full"></div>
               <div className="h-4 bg-gray-100 rounded w-full"></div>
               <div className="h-4 bg-gray-100 rounded w-2/3"></div>
            </div>
            <div className="h-14 bg-gray-200 rounded-2xl w-full mt-10"></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "cart-item") {
    return (
      <div className="space-y-4 animate-pulse">
        {skeletons.map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
             <div className="w-20 h-20 bg-gray-200 rounded-xl"></div>
             <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-100 rounded w-1/4"></div>
             </div>
             <div className="w-24 h-8 bg-gray-100 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "profile") {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-100 rounded w-1/2 mb-8"></div>
        <div className="space-y-8">
           <div className="h-14 bg-gray-100 rounded-xl w-64"></div>
           <div className="h-64 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-8 space-y-6">
                 <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                 <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="h-12 bg-gray-50 rounded-xl"></div>
                    <div className="h-12 bg-gray-50 rounded-xl"></div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  // default: product
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
      {skeletons.map((_, i) => (
         <div key={i} className="w-full max-w-sm overflow-hidden bg-white shadow-sm rounded-xl animate-pulse flex flex-col">
            {/* Image Placeholder */}
            <div className="relative aspect-[3/4] bg-gray-100 w-full" />
            
            {/* Content Placeholder */}
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              <div className="h-5 bg-gray-200 rounded w-1/3 pt-2"></div>
            </div>

            {/* Footer Placeholder */}
            <div className="p-4 pt-2">
               <div className="h-10 bg-gray-200 rounded-xl w-full"></div>
            </div>
         </div>
      ))}
    </div>
  );
}
