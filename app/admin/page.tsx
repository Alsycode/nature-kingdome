"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setStoredToken } from "@/lib/adminAuth";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Verify by attempting a real admin request
    const res = await fetch("/api/bookings?status=all", {
      headers: { "x-admin-token": password },
    });

    if (res.ok) {
      setStoredToken(password);
      router.push("/admin/dashboard");
    } else {
      setError("Incorrect password.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0e1a13] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-[10px] tracking-[0.35em] text-[#e9c349] uppercase font-sans mb-2">Nature Kingdom</p>
          <h1 className="text-3xl font-serif text-white">Admin Panel</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#e9c349]/50"
            required
          />
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#e9c349] text-[#0e1a13] font-semibold text-sm py-3 rounded-lg hover:bg-[#e9c349]/90 transition disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
