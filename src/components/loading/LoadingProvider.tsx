"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Loading from "./Loading";
import { AnimatePresence, motion } from "framer-motion";

const LoadingContext = createContext({
  showLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export default function LoadingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  // Function to trigger 5-second loading
  const triggerLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000); // Mandatory 5 Seconds
  };

  // Trigger on initial mount (Refresh)
  useEffect(() => {
    if (pathname === "/") {
      triggerLoading();
    } else {
      setLoading(false);
    }
  }, []);

  // Trigger on every pathname or searchParams change (Navigation)
  useEffect(() => {
    if (pathname === "/") {
      triggerLoading();
    } else {
      setLoading(false);
    }
  }, [pathname, searchParams]);

  return (
    <LoadingContext.Provider value={{ showLoading: triggerLoading }}>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="global-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999]"
          >
            <Loading />
          </motion.div>
        )}
      </AnimatePresence>
      {/* 
          We hide children slightly to prevent flashes of content, 
          but they are still rendered in the background by Next.js
      */}
      <div className={loading ? "hidden" : "block"}>
        {children}
      </div>
    </LoadingContext.Provider>
  );
}
