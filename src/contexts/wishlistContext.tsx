"use client"

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import apiServices from "../../services/api"
import { IWishlistItem } from "@/interfaces/IWishlist"
import { toast } from "sonner"
import { ORANGE, NAVY } from "@/utils/colors";




interface WishlistContextType {
  wishlistIds: Set<string>
  wishlistItems: IWishlistItem[]
  isLoading: boolean
  toggleWishlist: (productId: string) => Promise<void>
  refreshWishlist: () => Promise<void>
  clearWishlist: () => void
}

export const wishlistContext = createContext<WishlistContextType>({
  wishlistIds: new Set(),
  wishlistItems: [],
  isLoading: false,
  toggleWishlist: async () => {},
  refreshWishlist: async () => {},
  clearWishlist: () => {},
})

export function useWishlist() {
  return useContext(wishlistContext)
}

export default function WishlistContextProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession()
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set())
  const [wishlistItems, setWishlistItems] = useState<IWishlistItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const token = session?.user?.token

  const refreshWishlist = useCallback(async () => {
    if (!token) {
      setWishlistIds(new Set())
      setWishlistItems([])
      return
    }
    setIsLoading(true)
    try {
      const response = await apiServices.getWishlist(token)
      const items = response.data ?? []
      setWishlistItems(items)
      setWishlistIds(new Set(items.map((p) => p._id)))
    } catch {
      // silently fail – wishlist is non-critical
    } finally {
      setIsLoading(false)
    }
  }, [token])

  useEffect(() => {
    refreshWishlist()
  }, [refreshWishlist])

  const toggleWishlist = useCallback(async (productId: string) => {
    if (!token) {
      toast.error("Please sign in to use your wishlist.")
      return
    }
    const alreadyAdded = wishlistIds.has(productId)
    try {
      if (alreadyAdded) {
        await apiServices.removeFromWishlist(productId, token)
        setWishlistIds(prev => { const next = new Set(prev); next.delete(productId); return next })
        setWishlistItems(prev => prev.filter(p => p._id !== productId))
        toast.success("Removed from wishlist", {
          style: { background: NAVY, color: "#fff", border: `1px solid ${ORANGE}` }
        })
      } else {
        await apiServices.addToWishlist(productId, token)
        toast.success("Added to wishlist ❤️", {
          style: { background: NAVY, color: "#fff", border: `1px solid ${ORANGE}` }
        })
        await refreshWishlist()
      }
    } catch {
      toast.error("Something went wrong. Please try again.")
    }
  }, [token, wishlistIds, refreshWishlist])

  const clearWishlist = useCallback(() => {
    setWishlistIds(new Set())
    setWishlistItems([])
  }, [])

  return (
    <wishlistContext.Provider value={{ wishlistIds, wishlistItems, isLoading, toggleWishlist, refreshWishlist, clearWishlist }}>
      {children}
    </wishlistContext.Provider>
  )
}
