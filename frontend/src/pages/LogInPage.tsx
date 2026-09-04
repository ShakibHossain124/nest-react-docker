import { useState, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchCurrentUser, loginUser } from "../api/auth.api";
import { useAuth } from "../contexts/AuthContexts";

export function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUser(email, password);
      const user = await fetchCurrentUser();
      if (!user) {
        throw new Error("Login succeeded, but the session cookie was not accepted. Check your browser cookie settings and try again.");
      }
      setUser(user);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[75vh] items-center justify-center px-4 py-10">
      <div className="soft-card grid w-full max-w-5xl overflow-hidden lg:grid-cols-[1.15fr_0.85fr]">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-indigo-700 p-8 text-white sm:p-10">
          <span className="feature-pill border-indigo-300/60 bg-indigo-400/10 text-indigo-100">
            productivity suite
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Simplify your daily workflow.
          </h1>
          <p className="mt-4 max-w-md text-sm text-indigo-100 sm:text-base">
            Manage users, keep teams aligned, and move faster with a workspace built for clarity.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["24/7", "Access"],
              ["3x", "Faster"],
              ["99%", "Focus"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
                <div className="text-xl font-semibold text-white">{value}</div>
                <div className="text-xs uppercase tracking-[0.18em] text-indigo-100">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-6 text-center">
            <p className="feature-pill">welcome back</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">Login</h2>
          </div>

          {error && (
            <p className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white"
              />
            </div>

            <button type="submit" disabled={loading} className="primary-btn w-full disabled:cursor-not-allowed disabled:opacity-70">
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-600">
            Don’t have an account?{" "}
            <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}