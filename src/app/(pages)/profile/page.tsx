"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Lock, Save, Loader2, ShieldCheck, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import apiServices from "../../../../services/api";
import { ORANGE, NAVY } from "@/utils/colors";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    password: "",
    rePassword: "",
  });

  useEffect(() => {
    if (session?.user) {
      setProfileData({
        name: session.user.name || "",
        email: session.user.email || "",
        phone: (session.user as any).phone || "",
      });
    }
  }, [session]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.token) return;

    setIsUpdatingProfile(true);
    try {
      const res = await apiServices.updateMe(
        profileData.name,
        profileData.email,
        profileData.phone,
        session.user.token
      );

      if (res.message === "success") {
        toast.success("Profile updated successfully!");
        // Update local session
        await update({
          ...session,
          user: {
            ...session.user,
            name: profileData.name,
            email: profileData.email,
          }
        });
      } else {
        toast.error(res.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred while updating profile");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.token) return;

    if (passwordData.password !== passwordData.rePassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsChangingPassword(true);
    try {
      const res = await apiServices.changeUserPassword(
        passwordData.currentPassword,
        passwordData.password,
        passwordData.rePassword,
        session.user.token
      );

      if (res.message === "success") {
        toast.success("Password changed successfully!");
        setPasswordData({ currentPassword: "", password: "", rePassword: "" });
      } else {
        toast.error(res.message || "Failed to change password");
      }
    } catch (error) {
      toast.error("An error occurred while changing password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (session === undefined) return null;
  if (session === null) {
     router.push("/auth/signin");
     return null;
  }

  return (
    <div className="container mx-auto max-w-5xl py-12 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left Sidebar - Profile Summary */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-50 flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-orange-50 p-1 bg-gradient-to-tr from-orange-400 to-navy-900">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <User size={64} className="text-gray-200" />
                </div>
              </div>
              <button className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-lg border border-gray-100 hover:scale-110 transition-transform">
                <Camera size={16} style={{ color: ORANGE }} />
              </button>
            </div>
            
            <h2 className="text-2xl font-bold mb-1" style={{ color: NAVY }}>{session.user?.name}</h2>
            <p className="text-sm text-gray-400 mb-6">{session.user?.email}</p>
            
            {/* Removed Role and Status as per user request */}
          </div>
        </div>

        {/* Right Content - Forms */}
        <div className="flex-1 space-y-8">
          
          {/* Edit Profile Form */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-50">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-orange-50">
                <User size={24} style={{ color: ORANGE }} />
              </div>
              <div>
                <h3 className="text-xl font-bold" style={{ color: NAVY }}>Personal Information</h3>
                <p className="text-sm text-gray-400">Update your account detail profile</p>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors" size={18} />
                  <Input 
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    placeholder="Enter full name"
                    className="pl-10 h-12 rounded-xl focus:ring-orange-200"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors" size={18} />
                  <Input 
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    placeholder="Enter email"
                    className="pl-10 h-12 rounded-xl focus:ring-orange-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors" size={18} />
                  <Input 
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    placeholder="Enter phone number"
                    className="pl-10 h-12 rounded-xl focus:ring-orange-200"
                  />
                </div>
              </div>

              <div className="md:col-span-2 flex justify-end pt-4">
                <Button 
                  type="submit" 
                  disabled={isUpdatingProfile}
                  className="rounded-xl px-8 h-12 font-bold shadow-lg shadow-orange-100 flex items-center gap-2"
                  style={{ background: ORANGE, color: NAVY }}
                >
                  {isUpdatingProfile ? <Loader2 className="animate-spin" size={20} /> : <><Save size={18} /> Save Changes</>}
                </Button>
              </div>
            </form>
          </div>

          {/* Change Password Form */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-50">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-navy-50">
                <Lock size={24} style={{ color: NAVY }} />
              </div>
              <div>
                <h3 className="text-xl font-bold" style={{ color: NAVY }}>Security</h3>
                <p className="text-sm text-gray-400">Manage your password and security settings</p>
              </div>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Current Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input 
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      placeholder="••••••••"
                      className="pl-10 h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div className="hidden md:block"></div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input 
                      type="password"
                      value={passwordData.password}
                      onChange={(e) => setPasswordData({...passwordData, password: e.target.value})}
                      placeholder="••••••••"
                      className="pl-10 h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input 
                      type="password"
                      value={passwordData.rePassword}
                      onChange={(e) => setPasswordData({...passwordData, rePassword: e.target.value})}
                      placeholder="••••••••"
                      className="pl-10 h-12 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button 
                  type="submit" 
                  disabled={isChangingPassword}
                  className="rounded-xl px-8 h-12 font-bold shadow-lg shadow-navy-100 flex items-center gap-2"
                  style={{ background: NAVY, color: "#fff" }}
                >
                  {isChangingPassword ? <Loader2 className="animate-spin" size={20} /> : <><Lock size={18} /> Update Password</>}
                </Button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
