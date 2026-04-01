import React from "react";
import { Mail, Smartphone, ArrowRight, Tag, Gift, Leaf } from "lucide-react";

export function Newsletter() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-[#FF9900]/5 rounded-[2rem] p-8 lg:p-12 border border-[#FF9900]/20">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left section: Newsletter Form */}
          <div className="flex-1 space-y-8 w-full">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#FF9900] rounded-2xl flex items-center justify-center text-[#131921] shadow-lg shadow-[#FF9900]/30">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[#FF9900] font-bold uppercase tracking-wider text-xs">Newsletter</p>
                <p className="text-gray-500 text-sm font-medium">50,000+ subscribers</p>
              </div>
            </div>

            <div>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
                Get the Freshest Updates <span className="text-[#FF9900] block sm:inline">Delivered Free</span>
              </h2>
              <p className="text-lg text-gray-600 font-medium">
                Weekly recipes, seasonal offers & exclusive member perks.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold text-[#131921] shadow-sm">
                <Leaf className="w-4 h-4 text-[#FF9900]" /> Fresh Picks Weekly
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold text-[#131921] shadow-sm">
                <Tag className="w-4 h-4 text-[#FF9900]" /> Free Delivery Codes
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold text-[#131921] shadow-sm">
                <Gift className="w-4 h-4 text-[#FF9900]" /> Members-Only Deals
              </div>
            </div>

            <form className="max-w-md relative flex flex-col sm:flex-row gap-3">
              <Input placeholder="you@example.com" />
              <button 
                type="submit" 
                className="bg-[#FF9900] hover:bg-[#e68a00] text-[#131921] font-bold h-14 px-8 rounded-xl transition-all shadow-lg shadow-[#FF9900]/20 active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            <p className="text-xs text-gray-500 font-medium flex items-center gap-1.5 mt-2">
              <span className="text-[#FF9900] text-lg leading-none">*</span> Unsubscribe anytime. No spam, ever.
            </p>
          </div>

          {/* Right section: App Promo Box */}
          <div className="lg:w-[400px] w-full shrink-0 relative">
            <div className="bg-[#131921] rounded-3xl p-8 relative overflow-hidden shadow-2xl">
              
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF9900] rounded-full blur-[80px] transform translate-x-1/3 -translate-y-1/3 opacity-30"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 bg-[#FF9900]/10 text-[#FF9900] px-3 py-1 rounded-full text-xs font-bold mb-6 border border-[#FF9900]/20">
                  <Smartphone className="w-3 h-3" /> MOBILE APP
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">Shop Faster on Our App</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">Get app-exclusive deals & 15% off your first order.</p>
                
                <div className="space-y-3">
                  <a href="#" className="flex items-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 transition-colors group">
                    <svg viewBox="0 0 384 512" className="w-8 h-8 text-white fill-current ml-2 mr-4 group-hover:scale-105 transition-transform"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                    <div>
                      <div className="text-[10px] text-gray-400 font-medium">DOWNLOAD ON</div>
                      <div className="text-white font-semibold leading-tight">App Store</div>
                    </div>
                  </a>
                  
                  <a href="#" className="flex items-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 transition-colors group">
                    <svg viewBox="0 0 512 512" className="w-8 h-8 text-white fill-current ml-2 mr-4 group-hover:scale-105 transition-transform"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
                    <div>
                      <div className="text-[10px] text-gray-400 font-medium">GET IT ON</div>
                      <div className="text-white font-semibold leading-tight">Google Play</div>
                    </div>
                  </a>
                </div>

                <div className="mt-8 flex items-center justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className="w-3.5 h-3.5 text-[#FF9900] fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                  <span className="text-xs text-[#FF9900]/80 ml-2 font-medium">4.9 • 100K+ downloads</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

// Simple internal Input component so we don't need to depend on the UI library
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input 
      {...props}
      className="w-full h-14 pl-6 pr-4 rounded-xl border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-[#FF9900]/20 focus:border-[#FF9900] transition-all outline-none"
    />
  )
}
