
import { lazy, Suspense } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import apiServices from "../../services/api";

import slider1 from "../../src/assets/images/sliderImages/slider-1.jpg";
import slider2 from "../../src/assets/images/sliderImages/slider-2.jpg";
import slider3 from "../../src/assets/images/sliderImages/slider-3.jpg";
import HeroSlider from "@/components/slider/Slider";
import Loading from "@/components/loading/Loading";


const Categories = lazy(() => import("@/components/categories/Categories"));
export default async function Home() {

const ORANGE = "#FF9900";
const NAVY   = "#131921";

  async function getProducts() {
    const products = await apiServices.getProducts();
    return products;
  }
  const products = await getProducts();

  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">

      {/* Slider */}
      <HeroSlider pageList={[slider1.src, slider2.src, slider3.src]} />




      {/* Categories */}
      
      <Suspense fallback={<Loading />}>
        <Categories />
      </Suspense>




      {/* Deal of the Day && New Arrivals ── */}
    




      {/* ── Products ── */}
      <div className="container mx-auto px-4 py-10">
         <h2> Featured <span style={{ color: ORANGE }} > Products </span></h2>
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
    

    </div>
  );
}