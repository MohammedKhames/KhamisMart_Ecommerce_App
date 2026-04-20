"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ORANGE, NAVY } from "@/utils/colors";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slideContent = [
  {
    badge:        "Get 20% off your first order",
    title:        "Fresh Products Delivered\nto your Door",
    primaryBtn:   { label: "Shop Now",   href: "/products" },
    secondaryBtn: { label: "View Deals", href: "/deals"    },
  },
  {
    badge:        "Up to 50% off on selected items",
    title:        "Top Electronics\nat Best Prices",
    primaryBtn:   { label: "Explore",    href: "/categories/electronics" },
    secondaryBtn: { label: "View Deals", href: "/deals"                  },
  },
  {
    badge:        "Discover the latest trends",
    title:        "New Fashion\nArrivals Daily",
    primaryBtn:   { label: "Shop Fashion", href: "/categories/fashion" },
    secondaryBtn: { label: "View Deals",   href: "/deals"              },
  },
];

interface HeroSliderProps {
  pageList: string[];
  slidesPerView?: number;
}

export default function HeroSlider({ pageList }: HeroSliderProps) {
  return (
    <div className="relative w-full group">
      <style>{`
        .hero-swiper .swiper-pagination {
          bottom: 24px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 8px !important;
          z-index: 50 !important;
        }
        .hero-swiper .swiper-pagination-bullet {
          width: 8px !important;
          height: 8px !important;
          border-radius: 9999px !important;
          background: rgba(255,255,255,0.4) !important;
          opacity: 1 !important;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
          margin: 0 !important;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          width: 32px !important;
          background: ${ORANGE} !important;
          box-shadow: 0 0 10px rgba(255, 153, 0, 0.5) !important;
        }
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          display: none !important;
        }
      `}</style>

      <Swiper
        className="hero-swiper shadow-sm overflow-hidden"
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        loop
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{ nextEl: ".hero-next", prevEl: ".hero-prev" }}
        slidesPerView={1}
        speed={1000}
      >
        {pageList.map((imgSrc, i) => {
          const content = slideContent[i % slideContent.length];
          return (
            <SwiperSlide key={imgSrc}>
              {({ isActive }) => (
                <div
                  className="relative w-full overflow-hidden bg-[#131921]"
                  style={{ height: "clamp(300px, 45vh, 650px)" }}
                >
                  {/* Background image with slow pan effect */}
                  <div 
                    className={`absolute inset-0 w-full h-full transition-transform duration-[10000ms] ease-out ${
                      isActive ? 'scale-110' : 'scale-100'
                    }`}
                  >
                    <Image
                      src={imgSrc}
                      alt={content.title}
                      fill
                      priority={i === 0}
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>

                  {/* Dark gradient overlay - softened on mobile */}
                  <div
                    className="absolute inset-0 z-10"
                    style={{
                      background: `linear-gradient(90deg, ${NAVY} 0%, rgba(19, 25, 33, 0.7) 40%, rgba(19, 25, 33, 0.1) 80%, transparent 100%)`,
                    }}
                  />
                  
                  {/* Mobile-only bottom gradient to ensure text readability */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#131921] via-transparent to-transparent opacity-60 sm:hidden" />

                  {/* Text content */}
                  <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 gap-4 md:gap-6 max-w-2xl">
                    
                    {/* Badge */}
                    <div className="overflow-hidden">
                      <span
                        className={`inline-block text-[10px] md:text-sm font-black px-3 md:px-4 py-1 md:py-1.5 rounded-full uppercase tracking-wider shadow-lg transition-all duration-700 ease-out transform ${
                          isActive ? 'translate-y-0 opacity-100 delay-300' : 'translate-y-8 opacity-0'
                        }`}
                        style={{ background: ORANGE, color: NAVY }}
                      >
                        {content.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="overflow-hidden">
                      <h1
                        className={`text-2xl sm:text-4xl md:text-5xl lg:text-[4rem] font-extrabold text-white leading-[1.1] transition-all duration-700 ease-out transform ${
                          isActive ? 'translate-y-0 opacity-100 delay-500' : 'translate-y-12 opacity-0'
                        }`}
                        style={{ textShadow: "0 4px 24px rgba(0,0,0,0.5)" }}
                      >
                        {content.title.split("\n").map((line, j) => (
                          <span key={j} className="block">
                            {line}
                          </span>
                        ))}
                      </h1>
                    </div>

                    {/* Buttons */}
                    <div className={`flex items-center gap-3 md:gap-4 flex-wrap mt-2 md:mt-4 transition-all duration-700 ease-out transform ${
                          isActive ? 'translate-y-0 opacity-100 delay-700' : 'translate-y-8 opacity-0'
                        }`}>
                      <Link
                        href={content.primaryBtn.href}
                        className="px-6 py-2.5 md:px-8 md:py-3.5 rounded-full font-extrabold text-xs md:text-base border-2 border-transparent transition-all hover:opacity-90 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,153,0,0.3)]"
                        style={{ background: ORANGE, color: NAVY }}
                      >
                        {content.primaryBtn.label}
                      </Link>
                      <Link
                        href={content.secondaryBtn.href}
                        className="px-6 py-2.5 md:px-8 md:py-3.5 rounded-full font-extrabold text-xs md:text-base border-2 text-white transition-all hover:scale-105 active:scale-95 bg-white/5 backdrop-blur-sm"
                        style={{ borderColor: ORANGE }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = ORANGE;
                          e.currentTarget.style.color = NAVY;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                          e.currentTarget.style.color = "#fff";
                        }}
                      >
                        {content.secondaryBtn.label}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Navigation Arrows (Desktop Only) */}
      <button
        className="hero-prev absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 -translate-x-4 group-hover:translate-x-0 hidden sm:flex"
        style={{
          background: "rgba(255,255,255,0.1)",
          border: `1px solid ${ORANGE}40`,
          backdropFilter: "blur(8px)",
        }}
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-white" />
      </button>

      <button
        className="hero-next absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 translate-x-4 group-hover:translate-x-0 hidden sm:flex"
        style={{
          background: "rgba(255,255,255,0.1)",
          border: `1px solid ${ORANGE}40`,
          backdropFilter: "blur(8px)",
        }}
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-white" />
      </button>
    </div>
  );
}