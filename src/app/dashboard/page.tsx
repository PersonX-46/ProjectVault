'use client';

import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminDashboard from "../components/AdminDashboard";

export default function AdminDashboardd() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Wait until session is loaded
    if (status === "loading") return;

    // If not logged in or not admin → redirect
    if (!session || session.user.role !== "admin") {
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading" || !session || session.user.role !== "admin") {
    return <div className="p-4 text-white">Loading...</div>;
  }

  return (
    <SessionProvider><AdminDashboard /></SessionProvider>
  );
}
