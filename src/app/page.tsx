import { lazy, Suspense } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import apiServices from "../../services/api";

export const dynamic = "force-dynamic";

import slider1 from "../../src/assets/images/sliderImages/slider-1.avif";
import slider2 from "../../src/assets/images/sliderImages/slider-2.avif";
import slider3 from "../../src/assets/images/sliderImages/slider-3.jpg";
import HeroSlider from "@/components/slider/Slider";
import Loading from "@/components/loading/Loading";

import { ServiceBanner } from "@/components/home/ServiceBanner";
import { PromoBanners } from "@/components/home/PromoBanners";
import { Newsletter } from "@/components/home/Newsletter";
import Link from "next/link";
import { ORANGE, NAVY } from "@/utils/colors";


const Categories = lazy(() => import("@/components/categories/Categories"));

export default async function Home() {




  let products: import("@/interfaces/IProducts").IProduct[] = [];
  try {
    products = (await apiServices.getProducts()) ?? [];
  } catch {
    products = [];
  }

  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">

      {/* Slider (Full Width Breakout) */}
      <div className="w-[100vw] relative left-1/2 -translate-x-1/2 -mt-10 mb-10">
        <HeroSlider pageList={[slider1.src, slider2.src, slider3.src]} />
      </div>

      {/* ── Support Badges ── */}
      <ServiceBanner />

      {/* Categories */}
      <Suspense fallback={<Loading />}>
        <Categories />
      </Suspense>


      {/* ── Deal of the Day && New Arrivals ── */}
      <PromoBanners />

      {/* ── Products ── */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold"> Featured <span style={{ color: ORANGE }} > Products </span></h2>
          <Link href="/products" className="text-sm font-semibold hover:underline flex items-center gap-1" style={{ color: ORANGE }}>
            View all products <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.title}
              images={product.images}
              rating={product.ratingsAverage}
              reviewCount={product.ratingsQuantity}
              price={product.price}
              originalPrice={product.price + 100}
            />
          ))}
        </div>
      </div>

      {/* ── Newsletter ── */}
      <Newsletter />

      {/* ── Support Badges ── */}
      <ServiceBanner />

    </div>
  );
}