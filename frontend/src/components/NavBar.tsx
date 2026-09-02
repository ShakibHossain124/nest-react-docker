import { Link, useLocation, useNavigate } from "react-router-dom";

import { logoutUser } from "../api/auth.api";
import { useAuth } from "../contexts/AuthContexts";

export function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const showSessionControls = isAuthenticated && location.pathname === "/dashboard";

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      logout();
      navigate("/login");
    }
  };

  return (
    <nav className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="text-lg font-bold tracking-tight text-slate-900">
          AppFlow
        </Link>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          {!isAuthenticated && (
            <>
              <Link className="rounded-full px-3 py-1.5 transition hover:bg-slate-100 hover:text-slate-900" to="/login">
                Login
              </Link>
              <Link className="rounded-full px-3 py-1.5 transition hover:bg-slate-100 hover:text-slate-900" to="/register">
                Register
              </Link>
            </>
          )}

          {isAuthenticated && (
            <>
              <Link className="rounded-full px-3 py-1.5 transition hover:bg-slate-100 hover:text-slate-900" to="/dashboard">
                Dashboard
              </Link>
              <Link className="rounded-full px-3 py-1.5 transition hover:bg-slate-100 hover:text-slate-900" to="/profile">
                Profile
              </Link>
            </>
          )}

          {isAdmin && (
            <Link className="rounded-full px-3 py-1.5 transition hover:bg-slate-100 hover:text-slate-900" to="/admin">
              Admin
            </Link>
          )}
        </div>

        <div className="ml-auto flex items-center gap-3">
          {showSessionControls && user && (
            <>
              <span className="hidden text-sm text-slate-600 sm:inline">
                Welcome, {user.name}
              </span>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  isAdmin
                    ? "bg-rose-100 text-rose-700"
                    : "bg-indigo-100 text-indigo-700"
                }`}
              >
                {user.role}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="muted-btn px-3 py-1.5 text-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}