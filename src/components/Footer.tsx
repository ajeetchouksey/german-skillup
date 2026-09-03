import { APP_CODENAME, APP_VERSION, RELEASE_DATE } from "@/lib/version";
import { Badge, VersionTag } from "./ui";

const FOOTER_LINKS = [
  { href: "https://github.com/ajeetchouksey/german-skillup/blob/main/CHANGELOG.md", label: "Changelog" },
  { href: "https://github.com/ajeetchouksey/german-skillup", label: "GitHub" },
  { href: "https://github.com/ajeetchouksey/german-skillup/issues", label: "Issues" },
  { href: "https://aaryaai.dev", label: "AaryaAI" },
];

export function Footer() {
  return (
    <footer className="px-4 pb-8 pt-2 lg:px-8">
      <div className="mb-8 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />

      <div className="mx-auto max-w-5xl space-y-6">
        {/* Brand + nav row */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <img src="/aaryaai-mono-white.svg" alt="AaryaAI" style={{ height: "16px", width: "auto", opacity: 0.9 }} />
            <Badge label="Deutsch SkillUp" variant="violet" size="xs" />
            <VersionTag version={`v${APP_VERSION}`} highlight />
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-4 gap-y-1">
            {FOOTER_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-500 transition-colors duration-200 hover:text-slate-300"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* Copyright row */}
        <div className="flex flex-col items-start justify-between gap-2 pt-1 sm:flex-row sm:items-center">
          <p className="text-[10px] text-slate-700">
            © 2026 AaryaAI · {APP_CODENAME} · Progress stored locally in your browser
          </p>
          <p className="text-[10px] text-slate-700">
            v{APP_VERSION} · {RELEASE_DATE}
          </p>
        </div>
      </div>
    </footer>
  );
}
