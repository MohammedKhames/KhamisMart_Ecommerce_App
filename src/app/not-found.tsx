"use client";

import Link from "next/link";
import { ShoppingCart, MoveLeft, Home } from "lucide-react";
import { ORANGE, NAVY } from "@/utils/colors";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      
      {/* Animated 3D-ish Logo / Illustration */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-12"
      >
        <div 
          className="w-32 h-32 rounded-full flex items-center justify-center shadow-2xl relative z-10"
          style={{ background: NAVY }}
        >
          <ShoppingCart className="w-16 h-16" style={{ color: ORANGE }} />
          
          {/* Floating '?' marks */}
          <motion.span 
            animate={{ y: [-10, 10], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
            className="absolute -top-4 -right-2 text-4xl font-bold"
            style={{ color: ORANGE }}
          >
            ?
          </motion.span>
          <motion.span 
            animate={{ y: [10, -10], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: 1 }}
            className="absolute -bottom-4 -left-2 text-4xl font-bold"
            style={{ color: ORANGE }}
          >
            !
          </motion.span>
        </div>
        
        {/* Glow behind */}
        <div 
          className="absolute inset-0 bg-orange-400 blur-[80px] opacity-20"
        ></div>
      </motion.div>

      {/* Text Content */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-md mx-auto"
      >
        <h1 className="text-8xl font-black mb-4 tracking-tighter" style={{ color: NAVY }}>
          4<span style={{ color: ORANGE }}>0</span>4
        </h1>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Oops! Page not found.</h2>
        <p className="text-gray-500 mb-10 leading-relaxed text-sm sm:text-base">
          It looks like the product or page you were searching for has moved or no longer exists. 
          Don't worry, our store is full of other amazing items!
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <button 
              className="px-8 py-3.5 rounded-full font-bold text-sm flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/20"
              style={{ background: ORANGE, color: NAVY }}
            >
              <Home className="w-4 h-4" /> Return Home
            </button>
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="px-8 py-3.5 rounded-full font-bold text-sm flex items-center gap-2 border border-gray-200 text-gray-600 transition-all hover:bg-gray-50 active:scale-95"
          >
            <MoveLeft className="w-4 h-4" /> Go Back
          </button>
        </div>
      </motion.div>

      {/* Brand Watermark */}
      <div className="mt-20 opacity-10 select-none">
        <h2 className="text-9xl font-black" style={{ color: NAVY }}>KHAMISMART</h2>
      </div>
    </div>
  );
}
