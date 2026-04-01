"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { registerSchema, RegisterSchemaDataType } from '../schema/register.schema'
import apiServices from '../../../../../../services/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { User, Mail, Lock, Phone, Loader2, ShoppingCart, Eye, EyeOff, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ORANGE, NAVY } from "@/utils/colors";




export default function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)

  const { handleSubmit, control, formState: { errors } } = useForm<RegisterSchemaDataType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    }
  })

  async function handleRegister(data: RegisterSchemaDataType) {
    setIsLoading(true)
    try {
      const response = await apiServices.signUp(data.name, data.email, data.password, data.rePassword, data.phone)
      if (response.message === "success") {
        toast.success("Account created successfully! Please sign in.", {
          style: { background: NAVY, color: "#fff", border: `1px solid ${ORANGE}` }
        })
        router.push("/auth/signin")
      } else {
        toast.error(response.message || "Registration failed. Please try again.")
      }
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
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
            Join KhamisMart <br/> Today
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Create an account to track orders, save your favorite items, and receive exclusive offers.
          </p>
          
          <div className="flex flex-col gap-4 text-gray-300">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-green-400 font-bold text-xs">✓</div>
              <span>Fast & secure checkout</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-green-400 font-bold text-xs">✓</div>
              <span>Exclusive member promotions</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-green-400 font-bold text-xs">✓</div>
              <span>Order tracking & history</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto">
        <div className="w-full max-w-md space-y-8 my-auto py-8">
          
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-6">
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
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2 text-center lg:text-left">Create your account</h2>
            <p className="text-gray-500 text-center lg:text-left">Please fill in the details below to complete your registration.</p>
          </div>

          <form id="register-form" onSubmit={handleSubmit(handleRegister)} className="space-y-4">
            
            {/* Name */}
            <Controller name="name" control={control} render={({ field, fieldState }) => (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <div className="relative group">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-hover:text-gray-600">
                    <User className="w-5 h-5" />
                  </span>
                  <Input {...field} id="name" placeholder="John Doe" autoComplete="off"
                    className="pl-11 h-12 rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-all text-base shadow-sm"
                    style={{ borderColor: fieldState.invalid ? "#ef4444" : undefined }} />
                </div>
                {fieldState.invalid && <p className="text-xs text-red-500 font-medium pl-1">{fieldState.error?.message}</p>}
              </div>
            )} />

            {/* Email */}
            <Controller name="email" control={control} render={({ field, fieldState }) => (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative group">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-hover:text-gray-600">
                    <Mail className="w-5 h-5" />
                  </span>
                  <Input {...field} id="email" type="email" placeholder="name@example.com" autoComplete="off"
                    className="pl-11 h-12 rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-all text-base shadow-sm"
                    style={{ borderColor: fieldState.invalid ? "#ef4444" : undefined }} />
                </div>
                {fieldState.invalid && <p className="text-xs text-red-500 font-medium pl-1">{fieldState.error?.message}</p>}
              </div>
            )} />

            {/* Password */}
            <Controller name="password" control={control} render={({ field, fieldState }) => (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative group">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-hover:text-gray-600">
                    <Lock className="w-5 h-5" />
                  </span>
                  <Input {...field} id="password" type={showPassword ? "text" : "password"} placeholder="Create password" autoComplete="off"
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

            {/* Confirm Password */}
            <Controller name="rePassword" control={control} render={({ field, fieldState }) => (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="relative group">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-hover:text-gray-600">
                    <Lock className="w-5 h-5" />
                  </span>
                  <Input {...field} id="rePassword" type={showRePassword ? "text" : "password"} placeholder="Confirm password" autoComplete="off"
                    className="pl-11 pr-11 h-12 rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-all text-base shadow-sm"
                    style={{ borderColor: fieldState.invalid ? "#ef4444" : undefined }} />
                  <button type="button" onClick={() => setShowRePassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors focus:outline-none">
                    {showRePassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {fieldState.invalid && <p className="text-xs text-red-500 font-medium pl-1">{fieldState.error?.message}</p>}
              </div>
            )} />

            {/* Phone */}
            <Controller name="phone" control={control} render={({ field, fieldState }) => (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <div className="relative group">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-hover:text-gray-600">
                    <Phone className="w-5 h-5" />
                  </span>
                  <Input {...field} id="phone" type="tel" placeholder="e.g. 01012345678" autoComplete="off"
                    className="pl-11 h-12 rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-all text-base shadow-sm"
                    style={{ borderColor: fieldState.invalid ? "#ef4444" : undefined }} />
                </div>
                {fieldState.invalid && <p className="text-xs text-red-500 font-medium pl-1">{fieldState.error?.message}</p>}
              </div>
            )} />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 mt-6 rounded-xl font-bold text-base text-white shadow-md transition-all duration-200 hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2 group"
              style={{ background: NAVY }}
            >
              {isLoading ? (
                <><Loader2 className="animate-spin w-5 h-5" /> Creating account...</>
              ) : (
                <>Create Account <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" /></>
              )}
            </button>

          </form>

          <p className="text-center text-sm text-gray-600 font-medium pt-4">
            Already have an account?{" "}
            <Link href="/auth/signin" className="font-bold hover:underline transition-colors" style={{ color: ORANGE }}>
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}
