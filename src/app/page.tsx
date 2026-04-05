import { lazy, Suspense } from "react";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import GridSkeleton from "@/components/loading/GridSkeleton";

export const dynamic = "force-dynamic";

import slider1 from "../../src/assets/images/sliderImages/slider-1.avif";
import slider2 from "../../src/assets/images/sliderImages/slider-2.avif";
import slider3 from "../../src/assets/images/sliderImages/slider-3.jpg";
import HeroSlider from "@/components/slider/Slider";

import { ServiceBanner } from "@/components/home/ServiceBanner";
import { PromoBanners } from "@/components/home/PromoBanners";
import { Newsletter } from "@/components/home/Newsletter";
import { ORANGE } from "@/utils/colors";


const Categories = lazy(() => import("@/components/categories/Categories"));

export default async function Home() {

  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">

      {/* Slider */}
      <div className="w-[100vw] relative left-1/2 -translate-x-1/2 -mt-10 mb-10">
        <HeroSlider pageList={[slider1.src, slider2.src, slider3.src]} />
      </div>

      {/* Support Badges*/}
      <ServiceBanner />

      {/* Categories */}
      <Suspense fallback={
        <div className="container mx-auto py-10 px-4">
          <div className="flex justify-between items-center mb-8">
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <GridSkeleton type="category" count={10} />
        </div>
      }>
        <Categories />
      </Suspense>


      {/*Deal of the Day && New Arrivals */}
      <PromoBanners />

      {/*  Featured Products */}
      <Suspense fallback={
        <div className="container mx-auto px-4 py-10">
           <div className="flex justify-between items-center mb-8">
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
           </div>
           <GridSkeleton type="product" count={8} />
        </div>
      }>
        <FeaturedProducts />
      </Suspense>

      {/*Newsletter  */}
      <Newsletter />

      {/* Support Badges Bottom */}
      <ServiceBanner />

    </div>
  );
}