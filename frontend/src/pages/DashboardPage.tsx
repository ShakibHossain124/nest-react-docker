import { useCallback, useEffect, useState } from "react";
import { fetchUsersPaginated } from "../api/user.api";
import { useAuth } from "../contexts/AuthContexts";
import { useDebounce } from "../hooks/useDebounce";
import type { PaginatedMeta, User } from "../types/user.types";

const PAGE_SIZE = 5;
const MIN_SEARCH_LENGTH = 3;
const DEBOUNCE_DELAY = 500;

function getInitialFilters() {
  const params = new URLSearchParams(window.location.search);
  const pageParam = Number(params.get("page") ?? "1");
  return {
    page: Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1,
    search: params.get("search") ?? "",
    role: params.get("role") ?? "",
    sortBy: params.get("sortBy") ?? "id",
    sortOrder: params.get("order") === "desc" ? ("desc" as const) : ("asc" as const),
  };
}

export function DashboardPage() {
  const { user } = useAuth();
  const initialFilters = getInitialFilters();
  const [users, setUsers] = useState<User[]>([]);
  const [meta, setMeta] = useState<PaginatedMeta | null>(null);
  const [page, setPage] = useState(initialFilters.page);
  const [search, setSearch] = useState(initialFilters.search);
  const [roleFilter, setRoleFilter] = useState(initialFilters.role);
  const [sortBy, setSortBy] = useState(initialFilters.sortBy);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(initialFilters.sortOrder);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetchUsersPaginated({
        page,
        limit: PAGE_SIZE,
        search: debouncedSearch.trim().length >= MIN_SEARCH_LENGTH ? debouncedSearch.trim() : undefined,
        role: roleFilter || undefined,
        sortBy,
        order: sortOrder,
      });
      setUsers(response.data.data);
      setMeta(response.data.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, page, roleFilter, sortBy, sortOrder]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (search.trim()) params.set("search", search.trim());
    if (roleFilter) params.set("role", roleFilter);
    if (sortBy !== "id") params.set("sortBy", sortBy);
    if (sortOrder !== "asc") params.set("order", sortOrder);
    const query = params.toString();
    window.history.replaceState({}, "", `${window.location.pathname}${query ? `?${query}` : ""}`);
  }, [page, roleFilter, search, sortBy, sortOrder]);

  useEffect(() => {
    const trimmedSearch = debouncedSearch.trim();
    if (trimmedSearch.length > 0 && trimmedSearch.length < MIN_SEARCH_LENGTH) return;
    loadUsers();
  }, [debouncedSearch, loadUsers]);

  const handleSortChange = (field: string) => {
    setPage(1);
    if (sortBy === field) {
      setSortOrder((current) => current === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const sortIndicator = (field: string) => sortBy === field ? (sortOrder === "asc" ? "↑" : "↓") : "";
  const searchHint = search.length > 0 && search.length < MIN_SEARCH_LENGTH
    ? `Type ${MIN_SEARCH_LENGTH - search.length} more character(s) to search`
    : "";

  return (
    <div className="space-y-6 py-8">
      <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-gradient-to-br from-slate-950 via-indigo-950 to-sky-700 p-6 text-white shadow-[0_25px_80px_rgba(79,70,229,0.35)] sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="feature-pill border-indigo-300/60 bg-indigo-400/10 text-indigo-100">overview</span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Dashboard</h1>
            <p className="mt-3 max-w-xl text-sm text-slate-200 sm:text-base">Welcome back, {user?.name}. Explore the member directory and find the people you need.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-center backdrop-blur-sm">
            <div className="text-xl font-semibold text-white">{meta?.total ?? users.length}</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-indigo-100">Members</div>
          </div>
        </div>
      </div>

      <div className="soft-card overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-900 p-6 text-white">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div><h2 className="text-xl font-semibold">Member directory</h2><p className="mt-1 text-sm text-slate-300">Search, filter, and sort members.</p></div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="min-w-[220px]"><label htmlFor="dashboard-search" className="mb-1 block text-sm font-medium text-slate-200">Search</label><input id="dashboard-search" type="text" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Minimum 3 characters..." className="w-full rounded-2xl border border-white/15 bg-white/10 px-3 py-2.5 text-white placeholder:text-slate-300 outline-none focus:border-indigo-200" />{searchHint && <small className="mt-2 block text-xs text-slate-300">{searchHint}</small>}</div>
              <div><label htmlFor="dashboard-role" className="mb-1 block text-sm font-medium text-slate-200">Role</label><select id="dashboard-role" value={roleFilter} onChange={(event) => { setRoleFilter(event.target.value); setPage(1); }} className="w-full rounded-2xl border border-white/15 bg-white/10 px-3 py-2.5 text-white outline-none focus:border-indigo-200"><option value="" className="text-slate-900">All</option><option value="ADMIN" className="text-slate-900">Admin</option><option value="USER" className="text-slate-900">User</option></select></div>
              <button type="button" onClick={loadUsers} className="primary-btn border border-white/10 bg-white/10 px-4 py-2.5 text-white">Refresh</button>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-6">
          {error && <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
          {loading ? <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-600">Loading users...</div> : users.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-slate-600">No users found</div> : <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0"><thead><tr className="bg-slate-50 text-left text-sm text-slate-600">{[["id", "ID"], ["name", "Name"], ["email", "Email"], ["role", "Role"]].map(([field, label]) => <th key={field} className="border-b border-slate-200 px-4 py-3 font-medium"><button type="button" onClick={() => handleSortChange(field)} className="flex items-center gap-1 font-medium hover:text-slate-900">{label} {sortIndicator(field)}</button></th>)}</tr></thead><tbody>{users.map((member) => <tr key={member.id} className="bg-white text-sm text-slate-700"><td className="border-b border-slate-200 px-4 py-3">{member.id}</td><td className="border-b border-slate-200 px-4 py-3 font-medium text-slate-900">{member.name}</td><td className="border-b border-slate-200 px-4 py-3">{member.email}</td><td className="border-b border-slate-200 px-4 py-3"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${member.role === "ADMIN" ? "bg-rose-100 text-rose-700" : "bg-indigo-100 text-indigo-700"}`}>{member.role}</span></td></tr>)}</tbody></table>
          </div>}
          {meta && meta.totalPages > 1 && <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between"><div className="text-sm text-slate-600">Page {meta.page} of {meta.totalPages} · {meta.total} users</div><div className="flex items-center gap-3"><button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 disabled:opacity-40">Previous</button><button type="button" onClick={() => setPage((current) => Math.min(meta.totalPages, current + 1))} disabled={page === meta.totalPages} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-40">Next</button></div></div>}
        </div>
      </div>
    </div>
  );
}
