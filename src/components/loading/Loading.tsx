"use client";

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { ORANGE, NAVY } from "@/utils/colors";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/90 backdrop-blur-xl min-h-screen">
      <div className="relative flex flex-col items-center justify-center">
        
        {/* Glow effect behind - Slow Pulse */}
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1] 
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute w-40 h-40 rounded-full" 
          style={{ backgroundColor: ORANGE }}
        />
        
        {/* The Cart Icon Box - Floating & Wavy */}
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="relative flex items-center justify-center w-28 h-28 rounded-[2rem] shadow-2xl overflow-hidden"
          style={{ backgroundColor: NAVY, boxShadow: `0 25px 50px -12px ${ORANGE}40` }}
        >
          <ShoppingCart className="w-14 h-14" style={{ color: ORANGE }} />
          
          {/* Shine effect - Slow Sweep */}
          <motion.div 
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" 
          />
        </motion.div>
        
        {/* Text - Fade & Scale */}
        <motion.div
           animate={{ opacity: [0.5, 1, 0.5], scale: [0.98, 1, 0.98] }}
           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
           className="mt-12 text-center"
        >
            <h2 className="text-3xl font-black tracking-[0.3em]" style={{ color: NAVY }}>
              KHAMIS<span style={{ color: ORANGE }}>MART</span>
            </h2>
        </motion.div>
        
        {/* Wavy Dots */}
        <div className="flex items-center gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: ORANGE }}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
