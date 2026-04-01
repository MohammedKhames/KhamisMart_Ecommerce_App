"use client"

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import apiServices from '../../../../services/api'
import { ShoppingCart } from './ShoppingCart'
import { IAddToCartResponse } from '@/interfaces/cart/IAddToCartResponse'
import { Loader2, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { ORANGE, NAVY } from "@/utils/colors";




export default function Cart() {
  const { data: session, status } = useSession()
  const [cart, setCart] = useState<IAddToCartResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchCart() {
      if (!session?.user?.token) return
      setIsLoading(true)
      try {
        const data = await apiServices.getCart(session.user.token)
        setCart(data)
      } catch {
        setCart(null)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCart()
  }, [session])

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <ShoppingBag className="h-16 w-16 text-gray-300" />
        <h2 className="text-xl font-bold text-gray-700">Sign in to view your cart</h2>
        <Link href="/auth/signin" className="px-6 py-2 rounded-full font-bold text-sm"
          style={{ background: ORANGE, color: NAVY }}>Sign In</Link>
      </div>
    )
  }

  if (isLoading || !cart) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: ORANGE }} />
      </div>
    )
  }

  return <ShoppingCart cart={cart} />
}
