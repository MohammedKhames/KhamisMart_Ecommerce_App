"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import apiServices from "../../../../services/api"
import { IOrder } from "@/interfaces/IOrder"
import { Package, ShoppingBag, Loader2, CheckCircle, Clock, Truck } from "lucide-react"
import { formatPrice } from "@/helpers/formatPrice"
import Image from "next/image"
import Link from "next/link"
import { ORANGE, NAVY } from "@/utils/colors";
import OrdersLoading from "./loading";




export default function OrdersPage() {
  const { data: session, status } = useSession()
  const [orders, setOrders] = useState<IOrder[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      if (!session?.user?.token) return
      setIsLoading(true)
      try {
        // Extract user ID from token or use session user id
        const userId = (session.user as any)?.id ?? "6407cf6f515bdcf347c09f17"
        const data = await apiServices.getUserOrders(userId, session.user.token)
        setOrders(data)
      } catch {
        setOrders([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchOrders()
  }, [session])

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <ShoppingBag className="h-16 w-16 text-gray-300" />
        <h2 className="text-xl font-bold text-gray-700">Please sign in to view your orders</h2>
        <Link href="/auth/signin"
          className="px-6 py-2 rounded-full font-bold text-sm"
          style={{ background: ORANGE, color: NAVY }}>
          Sign In
        </Link>
      </div>
    )
  }

  if (isLoading) {
    return <OrdersLoading />;
  }

  if (!orders.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <Package className="h-16 w-16 text-gray-300" />
        <h2 className="text-xl font-bold text-gray-700">No orders yet</h2>
        <p className="text-gray-400 text-sm">Start shopping and your orders will appear here.</p>
        <Link href="/products"
          className="px-6 py-2 rounded-full font-bold text-sm"
          style={{ background: ORANGE, color: NAVY }}>
          Shop Now
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6" style={{ color: NAVY }}>
        My Orders <span style={{ color: ORANGE }}>({orders.length})</span>
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">

            {/* Order Header */}
            <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-3"
              style={{ background: NAVY }}>
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5" style={{ color: ORANGE }} />
                <div>
                  <p className="text-xs text-gray-400">Order ID</p>
                  <p className="text-white font-semibold text-sm">#{order.id}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400">Date</p>
                <p className="text-white text-sm">{new Date(order.createdAt).toLocaleDateString("en-EG", { year: "numeric", month: "short", day: "numeric" })}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Total</p>
                <p className="font-bold text-sm" style={{ color: ORANGE }}>{formatPrice(order.totalOrderPrice)}</p>
              </div>
              <div className="flex gap-2">
                <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                  order.isPaid ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                }`}>
                  {order.isPaid ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                  {order.isPaid ? "Paid" : "Pending Payment"}
                </span>
                <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                  order.isDelivered ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
                }`}>
                  <Truck className="h-3 w-3" />
                  {order.isDelivered ? "Delivered" : "In Transit"}
                </span>
              </div>
            </div>

            {/* Order Items */}
            <div className="divide-y divide-gray-100">
              {order.cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4 px-6 py-4">
                  <div className="relative h-16 w-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.product.title}</p>
                    <p className="text-xs text-gray-400">{item.product.category?.name} · {item.product.brand?.name}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-gray-400">Qty: {item.count}</p>
                    <p className="font-semibold text-sm" style={{ color: ORANGE }}>{formatPrice(item.price * item.count)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                <span className="font-medium">Shipping to:</span> {order.shippingAddress?.city} — {order.shippingAddress?.details}
                {order.shippingAddress?.phone && ` · ${order.shippingAddress.phone}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
