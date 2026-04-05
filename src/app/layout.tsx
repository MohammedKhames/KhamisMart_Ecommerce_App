import type { Metadata } from "next";
import { Exo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import { Toaster } from "@/components/ui/sonner";
import ProvidersWrapper from "@/providers/ProvidersWrapper";
import LoadingProvider from "@/components/loading/LoadingProvider";
import { Suspense } from "react";

const exoFont = Exo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "KhamisMart",
  description: "Modern E-commerce platform with Navy & Orange brand theme",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={exoFont.className}>
        <Suspense fallback={null}>
          <LoadingProvider>
            <ProvidersWrapper>
              <Navbar />
              <div className="container max-w-[1200px] mx-auto px-6 py-10">
                {children}
              </div>
              <Toaster />
              <Footer />
            </ProvidersWrapper>
          </LoadingProvider>
        </Suspense>
      </body>
    </html>
  );
}
