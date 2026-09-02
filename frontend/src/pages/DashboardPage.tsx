
import { useAuth } from "../contexts/AuthContexts";
import { useUsers } from "../hooks/useUsers";

export function DashboardPage() {
  const { user } = useAuth();
  const { users, loading, error } = useUsers();

  return (
    <div className="space-y-6 py-8">
      <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-gradient-to-br from-slate-950 via-indigo-950 to-sky-700 p-6 text-white shadow-[0_25px_80px_rgba(79,70,229,0.35)] sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="feature-pill border-indigo-300/60 bg-indigo-400/10 text-indigo-100">
              overview
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Dashboard</h1>
            <p className="mt-3 max-w-xl text-sm text-slate-200 sm:text-base">
              Welcome back, {user?.name}. Your workspace is ready for the next step.
            </p>
          </div>

          <div className="grid gap-3 sm:min-w-[120px]">
            {[[users.length, "Users"]].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-center backdrop-blur-sm">
                <div className="text-xl font-semibold text-white">{value}</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-indigo-100">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="soft-card p-6 sm:p-8">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Users</h2>
            <p className="text-sm text-slate-500">Recent member activity</p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700">
            {users.length} total
          </span>
        </div>

        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Loading users...
          </div>
        )}

        {error && (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="space-y-3">
            {users.map((u) => (
              <div
                key={u.id}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 via-white to-indigo-50 px-4 py-3 shadow-sm"
              >
                <div>
                  <p className="font-medium text-slate-900">{u.name}</p>
                  <p className="text-sm text-slate-600">{u.email}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    u.role === "ADMIN"
                      ? "bg-rose-100 text-rose-700"
                      : "bg-indigo-100 text-indigo-700"
                  }`}
                >
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}