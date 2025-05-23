// components/LogoutButton.tsx
"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  redirectUrl: string;
}

export default function LogoutButton({redirectUrl}: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Call the logout API
      await fetch('/api/auth/logout', { method: 'POST' });
      
      // Client-side sign out
      await signOut({ redirect: false });
      
      // Redirect to login page
      router.push(redirectUrl);
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="px-4 py-2 bg-red-700 rounded-lg hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}