const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

export function getAuthToken(): string | null {
  return authToken;
}

async function request<T>(
  input: string,
  init?: RequestInit
): Promise<T> {
  const url = input.startsWith("http") ? input : `${BASE_URL}${input}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const response = await fetch(url, {
    ...init,
    headers: { ...headers, ...(init?.headers || {}) },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `Request failed: ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as unknown as T;
  }

  return response.json();
}

export const api = {
  get: <T>(input: string) => request<T>(input, { method: "GET" }),
  post: <T>(input: string, body?: unknown) =>
    request<T>(input, { method: "POST", body: body ? JSON.stringify(body) : undefined }),
  put: <T>(input: string, body?: unknown) =>
    request<T>(input, { method: "PUT", body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(input: string, body?: unknown) =>
    request<T>(input, { method: "PATCH", body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(input: string) => request<T>(input, { method: "DELETE" }),
};