import React from "react";
import { Truck, ShieldCheck, RefreshCw, HeadphonesIcon } from "lucide-react";

export function ServiceBanner() {
  const services = [
    {
      icon: <Truck className="w-6 h-6 text-blue-500" />,
      title: "Free Shipping",
      desc: "On orders over 500 EGP",
      bg: "bg-blue-50",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      title: "Secure Payment",
      desc: "100% secure transactions",
      bg: "bg-emerald-50",
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-orange-500" />,
      title: "Easy Returns",
      desc: "14-day return policy",
      bg: "bg-orange-50",
    },
    {
      icon: <HeadphonesIcon className="w-6 h-6 text-purple-500" />,
      title: "24/7 Support",
      desc: "Dedicated support team",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="container mx-auto px-4 mt-8 pb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md cursor-pointer"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${service.bg}`}>
              {service.icon}
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-base">{service.title}</h4>
              <p className="text-sm text-gray-500">{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
