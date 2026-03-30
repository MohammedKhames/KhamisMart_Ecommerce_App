"use client"
import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"



export default function SignIn() {

 const form = useForm()
  const router = useRouter()
  const [isLoading, setIsLoading]=useState(false)



 async function onSubmit(data: any) {

     setIsLoading(true)
      const response = await signIn("credentials",{
        email: data.email,
        password: data.password,
        redirect: false
      })

      if(response?.ok){
        router.push("/")
      }else{


        // show there is error in password or email

      }
      setIsLoading(false)
   
  }

  return (
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">

  <Card className="w-full max-w-sm mx-4 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl">

    {/* Header */}
    <CardHeader className="text-center pt-10 pb-6 space-y-2">
      <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-2 shadow-lg shadow-indigo-500/30">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <CardTitle className="text-2xl font-bold text-white tracking-tight">
        Welcome Back
      </CardTitle>
      <CardDescription className="text-slate-400 text-sm">
        Sign in to continue to your account
      </CardDescription>
    </CardHeader>

    {/* Form */}
    <CardContent className="px-8 pb-4">
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        {/* Email */}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <Input
                  {...field}
                  id="form-rhf-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Email address"
                  type="email"
                  className="pl-10 w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 rounded-xl h-11 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                />
              </div>
            </Field>
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <Input
                  {...field}
                  id="form-rhf-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Password"
                  type="password"
                  className="pl-10 w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 rounded-xl h-11 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                />
              </div>
            </Field>
          )}
        />

      </form>
    </CardContent>

    {/* Footer */}
    <CardFooter className="flex flex-col px-8 pb-10 pt-2 gap-3">
      <Button
        disabled={isLoading}
        type="submit"
        form="form-rhf-demo"
        className="w-full h-11 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99]"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
            Loading...
          </span>
        ) : "Sign In"}
      </Button>

      <p className="text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
          Sign up
        </a>
      </p>
    </CardFooter>

  </Card>
</div>
  )
}
