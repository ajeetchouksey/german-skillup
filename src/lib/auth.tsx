import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

// Google-only, deliberately — this app's audience is non-technical, so there's
// no GitHub option (unlike ajch_platform's dual-provider LoginWidget). Talks
// to german_skill's own dedicated Worker (workers/auth.ts), not ajch_platform's.

export interface AppUser {
  provider: "google";
  /** Email local-part — a display handle only, not a real identifier. */
  login: string;
  name: string | null;
  avatar_url: string;
  email?: string;
}

interface AuthContextType {
  user: AppUser | null;
  token: string | null;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Deliberately sessionStorage, not localStorage — matches ajch_platform's
// choice: sign-in doesn't persist across browser sessions/tabs by design.
// (Progress itself still lives in localStorage regardless of login state —
// see src/lib/progress.ts. Login only adds cross-device sync on top.)
const TOKEN_STORAGE_KEY = "deutsch_skillup_auth_token";
const USER_STORAGE_KEY = "deutsch_skillup_auth_user";
const STATE_STORAGE_KEY = "deutsch_skillup_oauth_state";

const AUTH_WORKER_URL = (import.meta.env.VITE_AUTH_WORKER_URL as string | undefined) || "";
const GOOGLE_CLIENT_ID = (import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined) || "";

/** Whether login is actually usable in this deploy (Worker + client id configured). */
export function isAuthConfigured(): boolean {
  return !!AUTH_WORKER_URL && !!GOOGLE_CLIENT_ID;
}

function initialsAvatarDataUri(label: string): string {
  const initials = label
    .split(/[\s._@-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("") || "?";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" rx="32" fill="#5b4bd6"/><text x="32" y="42" font-family="sans-serif" font-size="26" fill="#fff" text-anchor="middle">${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

interface SessionTokenPayload {
  provider: "google";
  id: string;
  name: string | null;
  email?: string;
  avatar_url: string;
  exp: number; // unix seconds
}

/** Decodes the payload segment of the Worker-signed session token. Trust rests
 * on the Worker having already verified the signature when it minted this
 * token; the client only re-checks provider/expiry, never the signature. */
function decodeSessionToken(token: string): SessionTokenPayload | null {
  try {
    const payloadSegment = token.split(".")[1];
    const b64 = payloadSegment.replace(/-/g, "+").replace(/_/g, "/");
    const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
    const payload = JSON.parse(atob(padded)) as SessionTokenPayload;
    if (payload.provider !== "google" || typeof payload.exp !== "number" || payload.exp * 1000 < Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

function userFromPayload(payload: SessionTokenPayload): AppUser {
  return {
    provider: "google",
    login: payload.email ? payload.email.split("@")[0] : payload.id,
    name: payload.name,
    avatar_url: payload.avatar_url || initialsAvatarDataUri(payload.name ?? payload.email ?? payload.id),
    email: payload.email,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Rehydrate an existing session on mount.
  useEffect(() => {
    const storedToken = sessionStorage.getItem(TOKEN_STORAGE_KEY);
    const storedUser = sessionStorage.getItem(USER_STORAGE_KEY);
    if (storedToken && storedUser) {
      try {
        setUser(JSON.parse(storedUser) as AppUser);
        setToken(storedToken);
      } catch {
        sessionStorage.removeItem(TOKEN_STORAGE_KEY);
        sessionStorage.removeItem(USER_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  // Land the OAuth redirect. This app has no router (single-state SPA), so the
  // Worker redirects to the site root with the token in the URL fragment
  // (#auth_token=...&state=...) rather than a dedicated /auth/callback route.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash.includes("auth_token") && !hash.includes("auth_error")) return;

    const params = new URLSearchParams(hash);
    // Scrub the fragment from the address bar/history immediately, before
    // using it — the token must never linger there.
    window.history.replaceState(null, "", window.location.pathname + window.location.search);

    if (params.get("auth_error")) {
      console.error("Sign-in failed:", params.get("auth_error"));
      return;
    }

    const tokenParam = params.get("auth_token");
    const stateParam = params.get("state");
    if (!tokenParam || !stateParam) return;

    // CSRF: verify state matches the nonce stored before redirect.
    const expectedState = sessionStorage.getItem(STATE_STORAGE_KEY);
    sessionStorage.removeItem(STATE_STORAGE_KEY);
    if (!expectedState || stateParam !== expectedState) {
      console.error("Sign-in failed: state mismatch (possible CSRF).");
      return;
    }

    const payload = decodeSessionToken(tokenParam);
    if (!payload) {
      console.error("Sign-in failed: invalid or expired token.");
      return;
    }

    const u = userFromPayload(payload);
    setUser(u);
    setToken(tokenParam);
    sessionStorage.setItem(TOKEN_STORAGE_KEY, tokenParam);
    sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(u));
  }, []);

  const login = useCallback(() => {
    if (!isAuthConfigured()) return;
    const state = crypto.randomUUID();
    sessionStorage.setItem(STATE_STORAGE_KEY, state);
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      scope: "openid email profile",
      redirect_uri: `${AUTH_WORKER_URL}/oauth/google/callback`,
      response_type: "code",
      state,
    });
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(USER_STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
