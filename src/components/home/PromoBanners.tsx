import React from "react";
import { ArrowRight, Flame, Sparkles } from "lucide-react";

export function PromoBanners() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Banner 1 - Navy */}
        <div className="relative rounded-3xl p-8 overflow-hidden text-white shadow-xl transition-all duration-500 origin-right hover:[transform:perspective(1000px)_rotateY(8deg)] hover:shadow-2xl"
             style={{ background: "linear-gradient(145deg, #131921 0%, #1a2634 100%)" }}>
          
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-orange-500 opacity-20 blur-[80px] transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-sm font-semibold mb-4 backdrop-blur-md border border-white/5">
              <Flame className="w-4 h-4 text-[#FF9900]" />
              Deal of the Day
            </div>
            
            <h3 className="text-3xl font-extrabold mb-2 tracking-tight text-[#FF9900]">Fresh Organic Fruits</h3>
            <p className="text-gray-300 mb-6 font-medium">Get up to 40% off on selected organic fruits</p>
            
            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl font-black text-[#FF9900]">40% OFF</span>
              <span className="text-sm border border-white/20 bg-white/5 px-3 py-1.5 rounded-lg">
                Use code: <strong className="font-bold text-[#FF9900]">ORGANIC40</strong>
              </span>
            </div>
            
            <button className="bg-[#FF9900] text-[#131921] font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-lg group">
              Shop Now <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Banner 2 - Orange */}
        <div className="relative rounded-3xl p-8 overflow-hidden text-[#131921] shadow-xl transition-all duration-500 origin-left hover:[transform:perspective(1000px)_rotateY(-8deg)] hover:shadow-2xl"
             style={{ background: "linear-gradient(135deg, #FF9900 0%, #FFB033 100%)" }}>
          
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white opacity-20 blur-[60px] transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-[#131921]/10 px-3 py-1 rounded-full text-sm font-bold mb-4 backdrop-blur-md border border-[#131921]/10">
              <Sparkles className="w-4 h-4 text-[#131921]" />
              New Arrivals
            </div>
            
            <h3 className="text-3xl font-extrabold mb-2 tracking-tight">Exotic Vegetables</h3>
            <p className="text-[#131921]/80 mb-6 font-semibold">Discover our latest collection of premium vegetables</p>
            
            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl font-black">25% OFF</span>
              <span className="text-sm border border-[#131921]/20 bg-[#131921]/5 px-3 py-1.5 rounded-lg font-medium">
                Use code: <strong className="font-extrabold">FRESH25</strong>
              </span>
            </div>
            
            <button className="bg-[#131921] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-lg group">
              Explore Now <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
