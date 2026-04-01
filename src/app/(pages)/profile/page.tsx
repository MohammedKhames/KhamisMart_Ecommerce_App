"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import apiServices from '../../../../services/api'
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { Loader2, KeyRound, UserRound, Mail, Lock, Save } from "lucide-react"
import { ORANGE, NAVY } from "@/utils/colors";




// Password change schema
const passwordSchema = z.object({
  currentPassword: z.string().nonempty("Current password is required"),
  password: z.string().nonempty("New password is required").regex(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    "Must be 8+ chars and include uppercase, lowercase, number, and special character"
  ),
  rePassword: z.string().nonempty("Please confirm new password"),
}).refine(data => data.password === data.rePassword, {
  message: "Passwords don't match",
  path: ["rePassword"],
})

type PasswordFormData = z.infer<typeof passwordSchema>

export default function ProfilePage() {
  const { data: session } = useSession()
  const token = session?.user?.token || ""
  
  const [activeTab, setActiveTab] = useState("security")
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)

  // Password Form
  const { control: passControl, handleSubmit: handlePassSubmit, reset: resetPassParams } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", password: "", rePassword: "" }
  })

  async function onPasswordUpdate(data: PasswordFormData) {
    if (!token) return toast.error("Session expired. Please log in again.")
    setIsUpdatingPassword(true)
    try {
      const response = await apiServices.changeUserPassword(data.currentPassword, data.password, data.rePassword, token)
      
      if (response.message === "success") {
         toast.success("Password changed successfully!", {
           style: { background: NAVY, color: "#fff", border: `1px solid ${ORANGE}` }
         })
         resetPassParams()
      } else {
         toast.error(response.message || "Failed to update password.")
      }
    } catch {
      toast.error("An error occurred while updating the password.")
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl min-h-[60vh]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: NAVY }}>Manage Profile</h1>
        <p className="text-gray-500 mt-2">Update your account settings and change your password here.</p>
      </div>

      <div className="w-full">
        <div className="mb-8 p-1 inline-flex space-x-2 rounded-xl bg-gray-100/80">
          <button 
            type="button" 
            onClick={() => setActiveTab("security")}
            className={`rounded-lg px-6 py-2.5 text-sm font-medium transition-colors ${activeTab === 'security' ? 'bg-white shadow-sm text-[#FF9900]' : 'text-gray-600 hover:text-gray-900'}`}>
            <KeyRound className="w-4 h-4 mr-2 inline" />
            Security & Password
          </button>
          <button 
            type="button" 
            onClick={() => setActiveTab("info")}
            className={`rounded-lg px-6 py-2.5 text-sm font-medium transition-colors ${activeTab === 'info' ? 'bg-white shadow-sm text-[#FF9900]' : 'text-gray-600 hover:text-gray-900'}`}>
            <UserRound className="w-4 h-4 mr-2 inline" />
            Account Details
          </button>
        </div>

        {activeTab === "security" && (
          <div className="m-0 focus-visible:outline-none">
            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden ring-1 ring-gray-100">
              <CardHeader className="bg-white px-8 pt-8 pb-6 border-b border-gray-50">
                <CardTitle className="text-xl">Change Password</CardTitle>
                <CardDescription>
                  Ensure your account is using a long, random password to stay secure.
                </CardDescription>
              </CardHeader>
              <CardContent className="bg-white px-8 py-8">
                <form id="password-form" onSubmit={handlePassSubmit(onPasswordUpdate)} className="space-y-6 max-w-md">
                  
                  {/* Current Password */}
                  <Controller name="currentPassword" control={passControl} render={({ field, fieldState }) => (
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Current Password</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <Lock className="w-4 h-4" />
                        </span>
                        <Input {...field} type="password" placeholder="Enter current password" 
                          className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
                      </div>
                      {fieldState.invalid && <p className="text-xs text-red-500 font-medium">{fieldState.error?.message}</p>}
                    </div>
                  )} />

                  {/* New Password */}
                  <Controller name="password" control={passControl} render={({ field, fieldState }) => (
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">New Password</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <Lock className="w-4 h-4" />
                        </span>
                        <Input {...field} type="password" placeholder="Enter new password" 
                          className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
                      </div>
                      {fieldState.invalid && <p className="text-xs text-red-500 font-medium">{fieldState.error?.message}</p>}
                    </div>
                  )} />

                  {/* Confirm Password */}
                  <Controller name="rePassword" control={passControl} render={({ field, fieldState }) => (
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Confirm New Password</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <Lock className="w-4 h-4" />
                        </span>
                        <Input {...field} type="password" placeholder="Re-enter new password" 
                          className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
                      </div>
                      {fieldState.invalid && <p className="text-xs text-red-500 font-medium">{fieldState.error?.message}</p>}
                    </div>
                  )} />

                </form>
              </CardContent>
              <CardFooter className="bg-gray-50 px-8 py-5 border-t border-gray-100">
                <Button type="submit" form="password-form" disabled={isUpdatingPassword} 
                  className="h-11 px-8 rounded-xl font-medium shadow-sm"
                  style={{ background: NAVY }}>
                  {isUpdatingPassword ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Updating...</>
                  ) : (
                    <><Save className="w-4 h-4 mr-2" /> Save Password</>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {activeTab === "info" && (
          <div className="m-0 focus-visible:outline-none">
            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden ring-1 ring-gray-100">
              <CardHeader className="bg-white px-8 pt-8 pb-6 border-b border-gray-50">
                <CardTitle className="text-xl">Account Details</CardTitle>
                <CardDescription>
                  Basic information about your account. Email: {session?.user?.email}
                </CardDescription>
              </CardHeader>
              <CardContent className="bg-white px-8 pt-8 pb-10">
                 <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 flex flex-col items-center justify-center text-center max-w-lg mx-auto">
                   <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mb-4 shadow-sm"
                     style={{ background: "rgba(255, 153, 0, 0.1)", color: ORANGE }}>
                       {session?.user?.name?.[0]?.toUpperCase() || "U"}
                   </div>
                   <h2 className="text-xl font-bold text-gray-900">{session?.user?.name || "Customer"}</h2>
                   <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
                     <Mail className="w-4 h-4" /> {session?.user?.email}
                   </div>
                 </div>
              </CardContent>
            </Card>
          </div>
        )}

      </div>
    </div>
  )
}
