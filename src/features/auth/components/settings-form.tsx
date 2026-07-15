"use client";

import { useState } from "react";
import { updateProfileAction, changePasswordAction } from "../actions/settings.actions";

export function SettingsForm({ user }: { user: { fullName: string; email: string; role: string } }) {
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ type: "success" | "error", text: string } | null>(null);
  const [passwordMsg, setPasswordMsg] = useState<{ type: "success" | "error", text: string } | null>(null);

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMsg(null);
    
    const formData = new FormData(e.currentTarget);
    const res = await updateProfileAction(formData);
    
    if (res.error) {
      setProfileMsg({ type: "error", text: res.error });
    } else {
      setProfileMsg({ type: "success", text: res.message || "Profile updated!" });
      setTimeout(() => setProfileMsg(null), 3000);
    }
    setProfileLoading(false);
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordMsg(null);
    
    const formData = new FormData(e.currentTarget);
    
    // Quick client-side check
    if (formData.get("newPassword") !== formData.get("confirmPassword")) {
      setPasswordMsg({ type: "error", text: "New passwords do not match" });
      setPasswordLoading(false);
      return;
    }
    
    const res = await changePasswordAction(formData);
    
    if (res.error) {
      setPasswordMsg({ type: "error", text: res.error });
    } else {
      setPasswordMsg({ type: "success", text: res.message || "Password changed successfully!" });
      e.currentTarget.reset();
      setTimeout(() => setPasswordMsg(null), 3000);
    }
    setPasswordLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">
      {/* Profile Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-fit">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 m-0">Profile Information</h2>
        </div>
        
        <form onSubmit={handleProfileSubmit} className="p-6">
          {profileMsg && (
            <div className={`p-3 rounded-lg mb-5 text-sm ${profileMsg.type === "success" ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-600 border border-red-100"}`}>
              {profileMsg.text}
            </div>
          )}
          
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
            <input 
              type="email" 
              disabled 
              defaultValue={user.email}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-gray-50 text-gray-500 cursor-not-allowed" 
            />
            <p className="mt-1.5 text-xs text-gray-500">Email cannot be changed.</p>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Role</label>
            <input 
              type="text" 
              disabled 
              defaultValue={user.role}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-gray-50 text-gray-500 cursor-not-allowed" 
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
            <input 
              type="text" 
              name="fullName"
              defaultValue={user.fullName}
              required
              minLength={2}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow" 
            />
          </div>

          <button 
            type="submit" 
            disabled={profileLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto"
          >
            {profileLoading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>

      {/* Password Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-fit">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 m-0">Change Password</h2>
        </div>
        
        <form onSubmit={handlePasswordSubmit} className="p-6">
          {passwordMsg && (
            <div className={`p-3 rounded-lg mb-5 text-sm ${passwordMsg.type === "success" ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-600 border border-red-100"}`}>
              {passwordMsg.text}
            </div>
          )}
          
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Current Password</label>
            <input 
              type="password" 
              name="currentPassword"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow" 
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">New Password</label>
            <input 
              type="password" 
              name="newPassword"
              required
              minLength={8}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow" 
            />
            <p className="mt-1.5 text-xs text-gray-500">Minimum 8 characters.</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm New Password</label>
            <input 
              type="password" 
              name="confirmPassword"
              required
              minLength={8}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow" 
            />
          </div>

          <button 
            type="submit" 
            disabled={passwordLoading}
            className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto"
          >
            {passwordLoading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
