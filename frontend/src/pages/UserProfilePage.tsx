import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { SyntheticEvent } from "react";
import { deleteSelf, updateSelf } from "../api/user.api";
import { useAuth } from "../contexts/AuthContexts";

export function UserProfilePage() {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!user) return null;

  const handleUpdate = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setSaving(true);

    try {
      const updateData: { name?: string; email?: string; password?: string } = {};

      if (name !== user.name) updateData.name = name;
      if (email !== user.email) updateData.email = email;
      if (password.trim()) updateData.password = password;

      if (Object.keys(updateData).length === 0) {
        setError("No changes to save");
        setSaving(false);
        return;
      }

      const result = await updateSelf(updateData);
      const updatedUser = result.data || result;
      setUser(updatedUser);

      setPassword("");
      setMessage("Profile updated successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setError("");
    setDeleting(true);

    try {
      await deleteSelf();
      logout();
      navigate("/register");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl py-8">
      <div className="soft-card p-6 sm:p-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Account
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Profile</h1>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <p>
            <span className="font-medium text-slate-900">Role:</span> {user.role}
          </p>
          <p className="mt-1">
            <span className="font-medium text-slate-900">Member since:</span>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        {message && (
          <p className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {message}
          </p>
        )}
        {error && (
          <p className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </p>
        )}

        <form onSubmit={handleUpdate} className="space-y-4">
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
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white"
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
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
              New Password (optional)
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep current"
              minLength={8}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-slate-900 px-4 py-2.5 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>

        <div className="mt-8 border-t border-slate-200 pt-6">
          <h2 className="text-lg font-semibold text-rose-600">Danger Zone</h2>

          {!showDeleteConfirm ? (
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="mt-4 w-full rounded-xl bg-rose-600 px-4 py-2.5 font-medium text-white transition hover:bg-rose-500"
            >
              Delete Account
            </button>
          ) : (
            <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4">
              <p className="text-sm text-rose-700">Are you sure? This action cannot be undone.</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="rounded-xl bg-rose-600 px-4 py-2.5 font-medium text-white transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:bg-rose-300"
                >
                  {deleting ? "Deleting..." : "Yes, delete my account"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}