"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthErrorPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login after 5 seconds
    const timer = setTimeout(() => {
      router.push("/admin/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-400">Login Error</h1>
        <p className="mb-6">There was a problem with your login attempt.</p>
        <p className="text-gray-400">You'll be redirected to the login page shortly...</p>
      </div>
    </div>
  );
}