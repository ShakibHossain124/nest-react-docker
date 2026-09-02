import type { User } from "../types/user.types";

type UserProps = {
  user: User;
};

export function UserCard({ user }: UserProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-base font-semibold text-slate-900">{user.name}</p>
      <p className="mt-1 text-sm text-slate-600">{user.email}</p>

      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="uppercase tracking-[0.18em] text-slate-500">Role</span>
        <span
          className={`rounded-full px-2.5 py-1 font-semibold ${
            user.role === "ADMIN"
              ? "bg-rose-100 text-rose-700"
              : "bg-indigo-100 text-indigo-700"
          }`}
        >
          {user.role}
        </span>
      </div>
    </div>
  );
}
