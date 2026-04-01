"use client"

import CartContextProvider from '@/contexts/cartContext'
import WishlistContextProvider from '@/contexts/wishlistContext'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

export default function ProvidersWrapper({
    children,
}: {
    children: React.ReactNode
}) {
  return (
    <SessionProvider>
        <CartContextProvider>
            <WishlistContextProvider>
                {children}
            </WishlistContextProvider>
        </CartContextProvider>
    </SessionProvider>
  )
}