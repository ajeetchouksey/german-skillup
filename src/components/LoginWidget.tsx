import { LogOut, User as UserIcon } from "lucide-react";
import { isAuthConfigured, useAuth } from "@/lib/auth";
import { Button } from "./ui";

// Renders nothing until the auth Worker is actually deployed and its env vars
// configured (isAuthConfigured() false) — the app works fully without this,
// per FR-3.3: login adds cross-device sync, it's never a wall in front of content.
export function LoginWidget() {
  const { user, isLoading, login, logout } = useAuth();

  if (isLoading || !isAuthConfigured()) return null;

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <img
          src={user.avatar_url}
          alt={user.name ?? user.login}
          className="h-6 w-6 rounded-full border border-border"
        />
        <span className="hidden text-xs text-slate-300 sm:inline">{user.name ?? user.login}</span>
        <button
          onClick={logout}
          title="Sign out"
          aria-label="Sign out"
          className="rounded-md p-1 text-slate-400 transition-colors hover:text-white"
        >
          <LogOut size={14} />
        </button>
      </div>
    );
  }

  return (
    <Button variant="outline" size="xs" icon={UserIcon} onClick={login}>
      Sign in to sync
    </Button>
  );
}
