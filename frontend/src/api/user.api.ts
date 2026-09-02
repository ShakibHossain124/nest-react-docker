
import type { ApiResponse, PaginatedUsersResponse, User } from "../types/user.types";
import { fetchWithAuth } from "./fetch.api.client";

const API_URL = "http://localhost:3000";

export async function fetchUsers(
  signal: AbortSignal,
): Promise<ApiResponse<User>> {
  const response = await fetchWithAuth(`${API_URL}/api/users`, {
    signal,
  });

  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
}

export async function updateSelf(data: {
  name?: string;
  email?: string;
  password?: string;
}) {
  const response = await fetchWithAuth(`${API_URL}/api/update/self`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Update failed");
  }

  return response.json();
}

export async function deleteSelf() {
  const response = await fetchWithAuth(`${API_URL}/api/delete/self`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Delete account failed");
  }

  return response.json();
}

export async function fetchUsersPaginated(params: {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}): Promise<PaginatedUsersResponse> {
  const queryParams = new URLSearchParams();

  if (params.page) queryParams.append("page", String(params.page));
  if (params.limit) queryParams.append("limit", String(params.limit));
  if (params.search) queryParams.append("search", params.search);
  if (params.role) queryParams.append("role", params.role);
  if (params.sortBy) queryParams.append("sortBy", params.sortBy);
  if (params.order) queryParams.append("order", params.order);

  const queryString = queryParams.toString();
  const url = `${API_URL}/api/users${queryString ? `?${queryString}` : ""}`;

  const response = await fetchWithAuth(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status}`);
  }

  return response.json();
}

export async function updateUserRole(id: number, role: "ADMIN" | "USER") {
  const response = await fetchWithAuth(`${API_URL}/api/userRole/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update role");
  }

  return response.json();
}

export async function deleteUser(id: number) {
  const response = await fetchWithAuth(`${API_URL}/api/user/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }

  return response.json();
}