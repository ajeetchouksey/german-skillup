import { ExternalLink, FileText } from "lucide-react";
import { EXAM_BLUEPRINTS } from "@/data/examBlueprint";
import type { CEFRLevel } from "@/types";
import { Badge, Button, GlassCard, SectionHeader } from "./ui";

interface ExamOverviewProps {
  level: CEFRLevel;
}

export function ExamOverview({ level }: ExamOverviewProps) {
  const blueprint = EXAM_BLUEPRINTS[level];

  if (!blueprint) {
    return (
      <GlassCard accent="slate" className="mb-6 p-6 text-sm text-muted">
        Exam blueprint for {level} is coming soon.
      </GlassCard>
    );
  }

  return (
    <GlassCard accent="red" className="mb-6 p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <SectionHeader
          title="Exam Blueprint"
          icon={FileText}
          subtitle={`${blueprint.provider}-Zertifikat ${level}`}
          badge={`Pass: ${blueprint.passMark.required}/${blueprint.passMark.total}`}
          badgeVariant="red"
          className="mb-0"
          as="h2"
          iconColor="text-red-400"
        />
      </div>

      {blueprint.alsoRecognizedBy && blueprint.alsoRecognizedBy.length > 0 && (
        <p className="mb-4 text-xs text-muted">
          Also prepares you for:{" "}
          {blueprint.alsoRecognizedBy.map((r, i) => (
            <span key={r.provider}>
              {i > 0 && ", "}
              {r.url ? (
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-lilac hover:underline">
                  {r.provider}
                </a>
              ) : (
                r.provider
              )}
            </span>
          ))}
          .
        </p>
      )}

      <div className="grid gap-3 md:grid-cols-2">
        {blueprint.sections.map((s) => (
          <GlassCard key={s.id} className="p-4" rounded="lg">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-bold text-slate-100">{s.name}</h3>
              <Badge label={s.duration} variant="slate" />
            </div>
            <p className="mt-2 text-sm text-muted">{s.description}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
              {s.taskTypes.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          href={blueprint.sources.exam}
          target="_blank"
          rel="noopener noreferrer"
          icon={ExternalLink}
          variant="outline"
          size="sm"
        >
          Official training
        </Button>
        <Button
          href={blueprint.sources.vocabulary}
          target="_blank"
          rel="noopener noreferrer"
          icon={ExternalLink}
          variant="ghost"
          size="sm"
        >
          Official word list
        </Button>
      </div>

      <p className="mt-3 text-xs text-muted">
        Independent preparation content aligned to the published exam structure. {blueprint.provider} is the
        authoritative source for current exam rules and materials.
      </p>
    </GlassCard>
  );
}
