const API_URL = import.meta.env.VITE_API_URL ?? "https://nest-react-docker.onrender.com";

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

async function refreshTokens(): Promise<boolean> {
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  return response.ok;
}

export async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
  retry = true,
): Promise<Response> {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
  });

  // If not 401, return response
  if (response.status !== 401 || !retry) {
    return response;
  }

  // Prevent multiple simultaneous refresh calls
  if (!isRefreshing) {
    isRefreshing = true;
    refreshPromise = refreshTokens().finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    });
  }

  // Wait for refresh to complete
  const refreshSuccess = await refreshPromise;

  if (!refreshSuccess) {
    // Refresh failed - user needs to login again
    return response;
  }

  // Retry original request with new tokens
  return fetchWithAuth(url, options, false);
}