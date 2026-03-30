"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ORANGE = "#FF9900";
const NAVY   = "#131921";

// متطابق مع نص الـ slide حسب ترتيب الصور
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
  /** قائمة مسارات الصور — نفس الـ prop بتاع MySlider القديم */
  pageList: string[];
  /** عدد السلايدات المرئية — محتاجة دايماً 1 للـ hero */
  slidesPerView?: number;
}

export default function HeroSlider({ pageList }: HeroSliderProps) {
  return (
    <div className="relative w-full">
      <style>{`
        .hero-swiper .swiper-pagination {
          bottom: 18px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 6px !important;
        }
        .hero-swiper .swiper-pagination-bullet {
          width: 9px !important;
          height: 9px !important;
          border-radius: 9999px !important;
          background: rgba(255,255,255,0.45) !important;
          opacity: 1 !important;
          transition: all 0.3s !important;
          margin: 0 !important;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          width: 26px !important;
          background: ${ORANGE} !important;
        }
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          display: none !important;
        }
      `}</style>

      <Swiper
        className="hero-swiper"
        modules={[Navigation, Pagination, Autoplay]}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{ nextEl: ".hero-next", prevEl: ".hero-prev" }}
        slidesPerView={1}
        speed={600}
      >
        {pageList.map((imgSrc, i) => {
          const content = slideContent[i % slideContent.length];
          return (
            <SwiperSlide key={imgSrc}>
              <div
                className="relative w-full overflow-hidden"
                style={{ height: "clamp(280px, 42vw, 500px)" }}
              >
                {/* Background image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgSrc}
                  alt={content.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Navy → transparent overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(90deg, ${NAVY}f0 0%, ${NAVY}cc 28%, ${NAVY}66 58%, transparent 100%)`,
                  }}
                />

                {/* Orange accent bar */}
                <div
                  className="absolute left-0 top-0 h-full w-1"
                  style={{ background: ORANGE }}
                />

                {/* Text content */}
                <div className="relative z-10 h-full flex flex-col justify-center px-10 md:px-16 lg:px-24 gap-4 max-w-xl">
                  {/* Badge */}
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full w-fit"
                    style={{ background: ORANGE, color: NAVY }}
                  >
                    {content.badge}
                  </span>

                  {/* Title */}
                  <h1
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold text-white leading-tight"
                    style={{ textShadow: "0 2px 16px rgba(0,0,0,0.35)" }}
                  >
                    {content.title.split("\n").map((line, j) => (
                      <span key={j}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </h1>

                  {/* Buttons */}
                  <div className="flex items-center gap-3 flex-wrap mt-1">
                    <Link
                      href={content.primaryBtn.href}
                      className="px-6 py-2.5 rounded-full font-bold text-sm transition-all hover:opacity-90 hover:scale-105 active:scale-95"
                      style={{ background: ORANGE, color: NAVY }}
                    >
                      {content.primaryBtn.label}
                    </Link>
                    <Link
                      href={content.secondaryBtn.href}
                      className="px-6 py-2.5 rounded-full font-bold text-sm border-2 text-white transition-all hover:scale-105 active:scale-95"
                      style={{ borderColor: ORANGE }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.background = ORANGE;
                        (e.currentTarget as HTMLAnchorElement).style.color = NAVY;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                        (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                      }}
                    >
                      {content.secondaryBtn.label}
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Custom arrows */}
      <button
        className="hero-prev absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        style={{
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.2)",
          backdropFilter: "blur(4px)",
        }}
      >
        <ChevronLeft className="h-5 w-5 text-white" />
      </button>

      <button
        className="hero-next absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        style={{
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.2)",
          backdropFilter: "blur(4px)",
        }}
      >
        <ChevronRight className="h-5 w-5 text-white" />
      </button>
    </div>
  );
}