"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const password = new FormData(e.currentTarget).get("password");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Fjalëkalim i gabuar");
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-forest-900 px-4">
      <form onSubmit={handleSubmit} className="card w-full max-w-sm">
        <div className="rainbow-bar mb-6 rounded-full" />
        <h1 className="text-center font-display text-2xl font-bold text-forest-800">
          Admin Panel
        </h1>
        <p className="mt-1 text-center text-sm text-forest-600">Park Station</p>

        <div className="mt-6">
          <label className="mb-1 block text-sm font-medium">Fjalëkalimi</label>
          <input name="password" type="password" required className="input-field" />
        </div>

        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

        <button type="submit" disabled={loading} className="btn-primary mt-4 w-full">
          {loading ? "..." : "Hyr"}
        </button>
      </form>
    </div>
  );
}
