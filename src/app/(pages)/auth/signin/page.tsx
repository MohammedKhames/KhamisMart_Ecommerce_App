"use client"
import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Mail, Lock, Loader2, ShoppingCart, Eye, EyeOff, ArrowRight } from "lucide-react"
import Link from "next/link"
import { ORANGE, NAVY } from "@/utils/colors";




const signInSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email address"),
  password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters"),
})

type SignInFormData = z.infer<typeof signInSchema>

export default function SignIn() {
  const { control, handleSubmit } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" }
  })
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function onSubmit(data: SignInFormData) {
    setIsLoading(true)
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false
    })

    if (response?.ok) {
      toast.success("Welcome back! You're signed in.", {
        style: { background: NAVY, color: "#fff", border: `1px solid ${ORANGE}` }
      })
      router.push("/")
    } else {
      toast.error("Incorrect email or password. Please try again.")
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen w-full flex bg-gray-50">
      
      {/* Left Column - Branding / Decorative */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: `linear-gradient(145deg, ${NAVY} 0%, #0d1218 100%)` }}>
          
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl transform translate-x-1/3 -translate-y-1/3 pointer-events-none" style={{ background: ORANGE }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10 blur-3xl transform -translate-x-1/3 translate-y-1/3 pointer-events-none" style={{ background: "#fff" }} />

        {/* Logo area */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transform transition hover:scale-105" style={{ background: ORANGE }}>
              <ShoppingCart className="h-6 w-6" style={{ color: NAVY }} />
            </div>
            <div className="text-3xl font-extrabold tracking-tight">
              <span className="text-white">Khamis</span><span style={{ color: ORANGE }}>Mart</span>
            </div>
          </Link>
        </div>

        {/* Hero text */}
        <div className="relative z-10 mb-20 max-w-lg">
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Your Ultimate <br/> Shopping Destination
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Experience premium shopping with fast delivery, secure payments, and a wide variety of quality products at KhamisMart.
          </p>
          
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span className="text-sm font-medium text-gray-300">10k+ Products</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <div className="w-2 h-2 rounded-full" style={{ background: ORANGE }}></div>
              <span className="text-sm font-medium text-gray-300">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md space-y-10">
          
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ background: ORANGE }}>
                <ShoppingCart className="h-5 w-5" style={{ color: NAVY }} />
              </div>
              <div className="text-2xl font-extrabold tracking-tight">
                <span className="text-gray-900">Khamis</span><span style={{ color: ORANGE }}>Mart</span>
              </div>
            </Link>
          </div>

          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2 text-center lg:text-left">Welcome Back</h2>
            <p className="text-gray-500 text-center lg:text-left">Please enter your details to sign in.</p>
          </div>

          <form id="signin-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Email Field */}
            <Controller name="email" control={control} render={({ field, fieldState }) => (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative group">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-hover:text-gray-600">
                    <Mail className="w-5 h-5" />
                  </span>
                  <Input {...field} id="signin-email" type="email" placeholder="name@example.com"
                    className="pl-11 h-12 rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-all text-base shadow-sm"
                    style={{ borderColor: fieldState.invalid ? "#ef4444" : undefined }} />
                </div>
                {fieldState.invalid && <p className="text-xs text-red-500 font-medium pl-1">{fieldState.error?.message}</p>}
              </div>
            )} />

            {/* Password Field */}
            <Controller name="password" control={control} render={({ field, fieldState }) => (
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <Link href="#" className="text-sm font-semibold hover:underline" style={{ color: ORANGE }}>
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-hover:text-gray-600">
                    <Lock className="w-5 h-5" />
                  </span>
                  <Input {...field} id="signin-password" type={showPassword ? "text" : "password"} placeholder="Enter your password"
                    className="pl-11 pr-11 h-12 rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-all text-base shadow-sm"
                    style={{ borderColor: fieldState.invalid ? "#ef4444" : undefined }} />
                  <button type="button" onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors focus:outline-none">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {fieldState.invalid && <p className="text-xs text-red-500 font-medium pl-1">{fieldState.error?.message}</p>}
              </div>
            )} />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 mt-4 rounded-xl font-bold text-base text-white shadow-md transition-all duration-200 hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2 group"
              style={{ background: NAVY }}
            >
              {isLoading ? (
                <><Loader2 className="animate-spin w-5 h-5" /> Signing in...</>
              ) : (
                <>Sign In <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" /></>
              )}
            </button>

          </form>

          <p className="text-center text-sm text-gray-600 font-medium pt-4">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="font-bold hover:underline transition-colors" style={{ color: ORANGE }}>
              Create an account
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}
