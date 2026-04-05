"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import apiServices from "../../../../services/api";
import { IOrder } from "@/interfaces/IOrder";
import { ShoppingBag, Calendar, CreditCard, ChevronRight, Package, Truck, CheckCircle2, Clock, MapPin } from "lucide-react";
import { ORANGE, NAVY } from "@/utils/colors";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function AllOrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (session?.user?.id && session?.user?.token) {
        setLoading(true);
        try {
          const data = await apiServices.getUserOrders(session.user.id, session.user.token);
          setOrders(data || []);
        } catch (error) {
          console.error("Failed to fetch orders", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchOrders();
  }, [session]);

  const StatusBadge = ({ status, condition }: { status: string; condition: boolean }) => (
    <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${condition ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
      {condition ? <CheckCircle2 size={12} /> : <Clock size={12} />}
      {status}: {condition ? 'Yes' : 'No'}
    </div>
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="h-10 w-10 animate-spin" style={{ color: ORANGE }} />
        <p className="text-gray-500 font-medium">Loading your orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
        <div className="p-6 bg-orange-50 rounded-full">
          <ShoppingBag size={48} style={{ color: ORANGE }} />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: NAVY }}>No Orders Found</h2>
          <p className="text-gray-500 max-w-md">You haven&apos;t placed any orders yet. Start shopping and discover our amazing products!</p>
        </div>
        <Link 
          href="/products" 
          className="px-8 py-3 rounded-xl font-bold shadow-lg shadow-orange-100 transition-all hover:scale-105"
          style={{ background: ORANGE, color: NAVY }}
        >
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-extrabold mb-2" style={{ color: NAVY }}>
            Order <span style={{ color: ORANGE }}>History</span>
          </h1>
          <p className="text-gray-400 font-medium">Manage and track your previous orders</p>
        </div>
        <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-white rounded-2xl shadow-sm border border-gray-100">
           <ShoppingBag size={18} style={{ color: ORANGE }} />
           <span className="font-bold text-sm" style={{ color: NAVY }}>{orders.length} Total Orders</span>
        </div>
      </div>

      <div className="grid gap-8">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-[32px] overflow-hidden shadow-xl border border-gray-50 flex flex-col md:flex-row">
            
            {/* Left side - Order Info */}
            <div className="p-8 md:w-1/3 bg-gray-50/50 border-r border-gray-100 space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-white shadow-sm border border-gray-100 font-bold text-xs" style={{ color: NAVY }}>
                  #{order.id || order._id.slice(-6).toUpperCase()}
                </div>
                <div className="text-xs font-bold text-gray-400 flex items-center gap-1">
                   <Calendar size={12} /> {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CreditCard size={18} style={{ color: ORANGE }} />
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Payment Method</p>
                    <p className="text-sm font-bold capitalize" style={{ color: NAVY }}>{order.paymentMethodType}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Truck size={18} style={{ color: ORANGE }} />
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Total Amount</p>
                    <p className="text-xl font-black" style={{ color: ORANGE }}>{order.totalOrderPrice} EGP</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={18} style={{ color: ORANGE }} />
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Ship to</p>
                    <p className="text-sm font-bold text-gray-700 line-clamp-1">{order.shippingAddress.city}, {order.shippingAddress.details}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <StatusBadge status="Paid" condition={order.isPaid} />
                <StatusBadge status="Delivered" condition={order.isDelivered} />
              </div>
            </div>

            {/* Right side - Items List */}
            <div className="flex-1 p-8">
              <h4 className="text-xs font-black uppercase text-gray-300 tracking-[0.2em] mb-6">Order Items ({order.cartItems.length})</h4>
              <div className="space-y-6">
                {order.cartItems.map((item) => (
                  <div key={item._id} className="flex items-center gap-4 group">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-sm border border-gray-100 shrink-0">
                      <img 
                        src={item.product.imageCover} 
                        alt={item.product.title} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-bold text-gray-800 line-clamp-1 group-hover:text-orange-600 transition-colors">{item.product.title}</h5>
                      <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                        <span>Qty: <span className="font-bold text-gray-600">{item.count}</span></span>
                        <div className="w-1 h-1 rounded-full bg-gray-200" />
                        <span>Price: <span className="font-bold text-orange-600 transition-colors">{item.price} EGP</span></span>
                      </div>
                    </div>
                    <Link 
                      href={`/products/${item.product._id}`} 
                      className="p-2 rounded-full hover:bg-orange-50 text-gray-300 hover:text-orange-600 transition-all"
                    >
                      <ChevronRight size={20} />
                    </Link>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-50 flex justify-end">
                  <Link 
                    href="/products" 
                    className="text-xs font-bold transition-all hover:translate-x-1" 
                    style={{ color: ORANGE }}
                  >
                    Order something else &rarr;
                  </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
