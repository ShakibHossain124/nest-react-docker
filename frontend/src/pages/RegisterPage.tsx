import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import type { SyntheticEvent } from "react";
import { registerUser } from "../api/auth.api";

export function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser(name, email, password);
      navigate("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[75vh] items-center justify-center px-4 py-10">
      <div className="soft-card grid w-full max-w-5xl overflow-hidden lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-gradient-to-br from-violet-600 via-indigo-600 to-sky-600 p-8 text-white sm:p-10">
          <span className="feature-pill border-violet-200/60 bg-violet-500/10 text-violet-100">
            get started
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Build your account.
          </h1>
          <p className="mt-4 max-w-md text-sm text-violet-100 sm:text-base">
            Join the platform and turn scattered work into a smooth, organized flow.
          </p>

          <div className="mt-8 space-y-3">
            {[
              "Fast onboarding",
              "Secure access",
              "Smart team controls",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-violet-50">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-white" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-6 text-center">
            <p className="feature-pill">create account</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">Register</h2>
          </div>

          {error && (
            <p className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white"
              />
            </div>

            <button type="submit" disabled={loading} className="primary-btn w-full disabled:cursor-not-allowed disabled:opacity-70">
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}