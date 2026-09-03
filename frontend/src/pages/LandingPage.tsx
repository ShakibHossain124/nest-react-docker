import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContexts";


export function LandingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">AppFlow</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          One clear place for your team.
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Secure account access, useful member visibility, and straightforward administration.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
        {[
          ["For users", "Manage your profile", "Update your name, email, or password and keep your account details current."],
          ["For members", "See your workspace", "Browse the member directory with search, role filters, sorting, and pagination."],
          ["For admins", "Govern access", "Review every account, inspect session counts, change roles, and remove users when needed."],
        ].map(([eyebrow, title, description]) => (
          <article key={title} className="soft-card p-6 text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">{eyebrow}</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-900">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 flex justify-center gap-3">
      {!isAuthenticated ? (
        <div>
          <Link to="/login" className="primary-btn mr-3">
            Login
          </Link>
          <Link to="/register" className="muted-btn">Register</Link>
        </div>
      ) : (
        <Link to="/dashboard" className="primary-btn">Go to Dashboard</Link>
      )}
      </div>
    </div>
  );
}