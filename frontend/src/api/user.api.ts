import type { ApiResponse, User } from "../types/user.types";

export async function fetchUsers(
  signal: AbortSignal,
): Promise<ApiResponse<User>> {
  const response = await fetch("http://localhost:3000/api/users", { signal });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
}
