import { Menu } from "lucide-react";
import { APP_VERSION } from "@/lib/version";
import type { CEFRLevel } from "@/types";
import { VersionTag } from "./ui";
import { LoginWidget } from "./LoginWidget";

export type AppView = "home" | "lesson" | "plan" | "vocab" | "agents";

interface HeaderProps {
  level: CEFRLevel;
  onHome: () => void;
  onSidebarToggle: () => void;
}

export function Header({ level, onHome, onSidebarToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between bg-slate-800/75 px-6 backdrop-blur-md relative">
      <div className="flex items-center gap-3">
        <button
          onClick={onSidebarToggle}
          aria-label="Toggle sidebar"
          className="rounded-md p-1.5 text-slate-400 transition-all hover:bg-slate-800/50 hover:text-white"
        >
          <Menu size={18} />
        </button>

        <button
          onClick={onHome}
          className="group flex items-center transition-opacity hover:opacity-90"
          style={{ gap: "clamp(6px, 1vw, 10px)" }}
        >
          <img
            src="/logo-horizontal-dark.svg"
            alt="AaryaAI"
            className="shrink-0 transition-transform duration-300 group-hover:scale-[1.03]"
            style={{ height: "clamp(22px, 2.6vw, 30px)", width: "auto" }}
          />
          <span
            className="hidden select-none font-medium tracking-[0.08em] text-muted sm:block"
            style={{ fontSize: "clamp(9px, 0.85vw, 12px)" }}
          >
            Hallo Deutsch
          </span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="rounded-full border border-violet-500/30 bg-violet-500/5 px-2 py-0.5 text-[10px] font-medium text-violet-300">
          Level {level}
        </span>
        <LoginWidget />
        <VersionTag version={`v${APP_VERSION}`} className="hidden sm:inline-flex" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </header>
  );
}
