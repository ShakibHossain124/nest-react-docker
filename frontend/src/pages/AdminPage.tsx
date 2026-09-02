import { useState, useEffect, useRef, useCallback } from "react";
import { useDebounce } from "../hooks/useDebounce";
import type { User, PaginatedMeta } from "../types/user.types";
import { deleteUser, fetchUsersPaginated, updateUserRole } from "../api/user.api";

const PAGE_SIZE = 5;
const MIN_SEARCH_LENGTH = 3;
const DEBOUNCE_DELAY = 500;

function getInitialAdminFilterState() {
  const params = new URLSearchParams(window.location.search);

  const pageParam = Number(params.get("page") ?? "1");
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const search = params.get("search") ?? "";
  const roleFilter = params.get("role") ?? "";
  const sortBy = params.get("sortBy") ?? "id";
  const order = params.get("order") === "desc" ? "desc" : "asc";

  return {
    page,
    search,
    roleFilter,
    sortBy,
    sortOrder: order as "asc" | "desc",
  };
}

export function AdminPage() {
  const initialFilters = getInitialAdminFilterState();

  const [users, setUsers] = useState<User[]>([]);
  const [meta, setMeta] = useState<PaginatedMeta | null>(null);
  const [page, setPage] = useState(initialFilters.page);
  const [search, setSearch] = useState(initialFilters.search);
  const [roleFilter, setRoleFilter] = useState(initialFilters.roleFilter);
  const [sortBy, setSortBy] = useState(initialFilters.sortBy);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(
    initialFilters.sortOrder,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  // Debounce the search input
  const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY);

  const syncFiltersToUrl = useCallback(() => {
    const params = new URLSearchParams();

    if (page > 1) params.set("page", String(page));
    if (search.trim()) params.set("search", search.trim());
    if (roleFilter) params.set("role", roleFilter);
    if (sortBy && sortBy !== "id") params.set("sortBy", sortBy);
    if (sortOrder && sortOrder !== "asc") params.set("order", sortOrder);

    const query = params.toString();
    const nextUrl = `${window.location.pathname}${query ? `?${query}` : ""}`;
    window.history.replaceState({}, "", nextUrl);
  }, [page, search, roleFilter, sortBy, sortOrder]);

  const loadUsers = useCallback(async () => {
    const controller = new AbortController();
    controllerRef.current?.abort();
    controllerRef.current = controller;

    setLoading(true);
    setError("");

    try {
      const effectiveSearch =
        debouncedSearch.length >= MIN_SEARCH_LENGTH
          ? debouncedSearch.trim()
          : undefined;

      const response = await fetchUsersPaginated({
        page,
        limit: PAGE_SIZE,
        search: effectiveSearch,
        role: roleFilter || undefined,
        sortBy,
        order: sortOrder,
      });

      if (controller !== controllerRef.current) return;

      setUsers(response.data.data);
      setMeta(response.data.meta);
    } catch (err) {
      if (controller !== controllerRef.current) return;
      if (err instanceof Error && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      if (controller !== controllerRef.current) return;
      setLoading(false);
    }
  }, [page, debouncedSearch, roleFilter, sortBy, sortOrder]);

  useEffect(() => {
    syncFiltersToUrl();
  }, [syncFiltersToUrl]);

  useEffect(() => {
    const trimmedSearch = debouncedSearch.trim();
    if (trimmedSearch.length > 0 && trimmedSearch.length < MIN_SEARCH_LENGTH) {
      return;
    }

    loadUsers();
    return () => {
      controllerRef.current?.abort();
    };
  }, [loadUsers]);

  const handleRoleChange = async (userId: number, newRole: "ADMIN" | "USER") => {
    setActionMessage("");
    setError("");

    try {
      await updateUserRole(userId, newRole);
      setActionMessage(`User ${userId} role updated to ${newRole}`);
      loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update role");
    }
  };

  const handleDelete = async (userId: number) => {
    setActionMessage("");
    setError("");
    setDeletingUserId(userId);

    try {
      await deleteUser(userId);
      setActionMessage(`User ${userId} deleted`);
      setDeletingUserId(null);
      loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user");
      setDeletingUserId(null);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value);
    setPage(1);
  };

  const handleSortChange = (field: string) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setPage(1);
  };

  const getSearchHint = () => {
    if (search.length === 0) return "";
    if (search.length < MIN_SEARCH_LENGTH) {
      return `Type ${MIN_SEARCH_LENGTH - search.length} more character(s) to search`;
    }
    return `Searching for "${search}"...`;
  };

  return (
    <div className="py-8">
      <div className="soft-card overflow-hidden">
        <div className="border-b border-slate-200 bg-gradient-to-r from-slate-900 via-indigo-900 to-sky-800 p-6 text-white">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <span className="feature-pill border-indigo-300/60 bg-indigo-400/10 text-indigo-100">
                admin panel
              </span>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
                User management
              </h1>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="min-w-[220px]">
                <label htmlFor="search" className="mb-1 block text-sm font-medium text-slate-200">
                  Search
                </label>
                <input
                  id="search"
                  type="text"
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Minimum 3 characters..."
                  className="w-full rounded-2xl border border-white/15 bg-white/10 px-3 py-2.5 text-white placeholder:text-slate-300 outline-none transition focus:border-indigo-200"
                />
                {getSearchHint() && (
                  <small
                    className={
                      search.length < MIN_SEARCH_LENGTH
                        ? "mt-2 block text-xs text-slate-300"
                        : "mt-2 block text-xs text-emerald-300"
                    }
                  >
                    {getSearchHint()}
                  </small>
                )}
              </div>

              <div>
                <label htmlFor="roleFilter" className="mb-1 block text-sm font-medium text-slate-200">
                  Role
                </label>
                <select
                  id="roleFilter"
                  value={roleFilter}
                  onChange={(e) => handleRoleFilterChange(e.target.value)}
                  className="w-full rounded-2xl border border-white/15 bg-white/10 px-3 py-2.5 text-white outline-none transition focus:border-indigo-200"
                >
                  <option value="" className="text-slate-900">All</option>
                  <option value="ADMIN" className="text-slate-900">Admin</option>
                  <option value="USER" className="text-slate-900">User</option>
                </select>
              </div>

              <button type="button" onClick={loadUsers} className="primary-btn border border-white/10 bg-white/10 px-4 py-2.5 text-white">
                Refresh
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-6">
          {actionMessage && (
            <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {actionMessage}
            </p>
          )}
          {error && (
            <p className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
            </p>
          )}

          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-600">
              Loading users...
            </div>
          ) : users.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-slate-600">
              No users found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0">
                <thead>
                  <tr className="bg-slate-50 text-left text-sm text-slate-600">
                    <th className="border-b border-slate-200 px-4 py-3 font-medium">
                      <button type="button" onClick={() => handleSortChange("id")} className="flex items-center gap-1 font-medium hover:text-slate-900">
                        ID {sortBy === "id" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                      </button>
                    </th>
                    <th className="border-b border-slate-200 px-4 py-3 font-medium">
                      <button type="button" onClick={() => handleSortChange("name")} className="flex items-center gap-1 font-medium hover:text-slate-900">
                        Name {sortBy === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                      </button>
                    </th>
                    <th className="border-b border-slate-200 px-4 py-3 font-medium">
                      <button type="button" onClick={() => handleSortChange("email")} className="flex items-center gap-1 font-medium hover:text-slate-900">
                        Email {sortBy === "email" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                      </button>
                    </th>
                    <th className="border-b border-slate-200 px-4 py-3 font-medium">
                      <button type="button" onClick={() => handleSortChange("role")} className="flex items-center gap-1 font-medium hover:text-slate-900">
                        Role {sortBy === "role" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                      </button>
                    </th>
                    <th className="border-b border-slate-200 px-4 py-3 font-medium">Tokens</th>
                    <th className="border-b border-slate-200 px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="bg-white text-sm text-slate-700">
                      <td className="border-b border-slate-200 px-4 py-3 align-middle">{user.id}</td>
                      <td className="border-b border-slate-200 px-4 py-3 align-middle font-medium text-slate-900">{user.name}</td>
                      <td className="border-b border-slate-200 px-4 py-3 align-middle">{user.email}</td>
                      <td className="border-b border-slate-200 px-4 py-3 align-middle">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${user.role === "ADMIN" ? "bg-rose-100 text-rose-700" : "bg-indigo-100 text-indigo-700"}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3 align-middle text-slate-600">{user._count.refreshTokens}</td>
                      <td className="border-b border-slate-200 px-4 py-3 align-middle">
                        <div className="flex flex-wrap gap-2">
                          <button type="button" onClick={() => handleRoleChange(user.id, user.role === "ADMIN" ? "USER" : "ADMIN")} className="rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-200">
                            Make {user.role === "ADMIN" ? "User" : "Admin"}
                          </button>
                          <button type="button" onClick={() => handleDelete(user.id)} disabled={deletingUserId === user.id} className="rounded-lg bg-rose-600 px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:bg-rose-300">
                            {deletingUserId === user.id ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {meta && meta.totalPages > 1 && (
            <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-slate-600">
                Page {meta.page} of {meta.totalPages} · {meta.total} users
              </div>

              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40">
                  Previous
                </button>

                <button type="button" onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))} disabled={page === meta.totalPages} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}