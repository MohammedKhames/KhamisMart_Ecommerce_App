"use client"
import { useEffect } from "react"
import { signOut } from "next-auth/react"
import { Loader2, ShoppingCart } from "lucide-react"
import { ORANGE, NAVY } from "@/utils/colors";




export default function LogoutPage() {
  useEffect(() => {
    signOut({ callbackUrl: "/auth/signin" })
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4"
      style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1a2634 50%, #232f3e 100%)` }}>
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
        style={{ background: ORANGE }}>
        <ShoppingCart className="h-7 w-7" style={{ color: NAVY }} />
      </div>
      <div className="flex items-center gap-2 text-white text-lg font-medium">
        <Loader2 className="animate-spin h-5 w-5" style={{ color: ORANGE }} />
        Signing you out...
      </div>
    </div>
  )
}
