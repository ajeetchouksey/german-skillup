import { Github } from "lucide-react";
import { APP_CODENAME, APP_VERSION, RELEASE_DATE } from "@/lib/version";
import { Button, VersionTag } from "./ui";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-5 text-center text-xs text-muted">
      <div>Deutsch SkillUp · A1 → C1 roadmap · Built with ❤️ by AaryaAI · Progress stored locally in your browser</div>
      <div className="mt-2 flex items-center justify-center gap-3">
        <VersionTag version={`v${APP_VERSION}`} highlight />
        <span className="text-slate-600">·</span>
        <span className="text-slate-500">{APP_CODENAME}</span>
        <span className="text-slate-600">·</span>
        <span className="text-slate-500">{RELEASE_DATE}</span>
        <Button
          href="https://github.com/ajeetchouksey/german-skillup/blob/main/CHANGELOG.md"
          target="_blank"
          rel="noopener noreferrer"
          icon={Github}
          variant="ghost"
          size="xs"
        >
          Changelog
        </Button>
      </div>
    </footer>
  );
}
