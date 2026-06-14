// Thin wrapper so admin pages and API routes share the same token key
export const ADMIN_TOKEN_KEY = "nk_admin_token";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setStoredToken(token: string) {
  sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearStoredToken() {
  sessionStorage.removeItem(ADMIN_TOKEN_KEY);
}

export function adminHeaders(): HeadersInit {
  return { "x-admin-token": getStoredToken() ?? "", "Content-Type": "application/json" };
}
