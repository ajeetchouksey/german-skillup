import { ExternalLink, FileText } from "lucide-react";
import { EXAM_SECTIONS, GOETHE_A1_SOURCES, PASS_MARK } from "@/data/examBlueprint";
import { Badge, Button, GlassCard, SectionHeader } from "./ui";

export function ExamOverview() {
  return (
    <GlassCard accent="red" className="mb-6 p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <SectionHeader
          title="Exam Blueprint"
          icon={FileText}
          subtitle="Goethe-Zertifikat A1: Start Deutsch 1"
          badge={`Pass: ${PASS_MARK.required}/${PASS_MARK.total}`}
          badgeVariant="red"
          className="mb-0"
          as="h2"
          iconColor="text-red-400"
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {EXAM_SECTIONS.map((s) => (
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
          href={GOETHE_A1_SOURCES.exam}
          target="_blank"
          rel="noopener noreferrer"
          icon={ExternalLink}
          variant="outline"
          size="sm"
        >
          Official training
        </Button>
        <Button
          href={GOETHE_A1_SOURCES.vocabulary}
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
        Independent preparation content aligned to the published exam structure. Goethe-Institut is the authoritative
        source for current exam rules and materials.
      </p>
    </GlassCard>
  );
}
