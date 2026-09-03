import { useState, useMemo, useCallback } from "react";
import {
  Search, BookOpen, CheckCircle2, SortAsc, X, ChevronDown, ChevronRight, RotateCcw,
} from "lucide-react";
import { Badge, GlassCard, Button } from "@/components/ui";
import { FlashcardDeck } from "@/components/FlashcardDeck";
import type { LevelContent } from "@/types";
import {
  aggregateVocab,
  loadKnownVocab,
  saveKnownVocab,
  vocabKey,
  type AggregatedVocab,
} from "@/lib/studyPlan";

type SortMode = "alpha" | "module" | "unknown";
type FilterMode = "all" | "known" | "unknown";

interface VocabRowProps {
  v: AggregatedVocab;
  known: boolean;
  onToggle: (v: AggregatedVocab) => void;
}

function VocabRow({ v, known, onToggle }: VocabRowProps) {
  return (
    <div className={`flex items-start gap-3 px-4 py-3 border-b border-border/30 hover:bg-[rgba(255,255,255,0.02)] transition-colors ${known ? "opacity-50" : ""}`}>
      <button
        onClick={() => onToggle(v)}
        className="shrink-0 mt-0.5 transition-colors"
        title={known ? "Mark as unknown" : "Mark as known"}
      >
        {known
          ? <CheckCircle2 size={16} className="text-emerald-400" />
          : <div className="w-4 h-4 rounded-full border-2 border-slate-600 hover:border-emerald-500 transition-colors" />}
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`font-semibold text-sm ${known ? "line-through text-slate-500" : "text-white"}`}>
            {v.de}
          </span>
          <span className="text-xs text-muted">→</span>
          <span className="text-sm text-slate-400">{v.en}</span>
        </div>
        {v.example && (
          <p className="text-[11px] text-slate-500 mt-0.5 italic">"{v.example}"</p>
        )}
      </div>
      <span className="shrink-0 text-[10px] text-slate-600 text-right">{v.moduleIcon}</span>
    </div>
  );
}

function ModuleSection({
  moduleTitle,
  moduleIcon,
  items,
  known,
  onToggle,
  defaultOpen,
}: {
  moduleTitle: string;
  moduleIcon: string;
  items: AggregatedVocab[];
  known: Set<string>;
  onToggle: (v: AggregatedVocab) => void;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  const knownCount = items.filter((v) => known.has(vocabKey(v))).length;

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[rgba(255,255,255,0.03)] transition-colors"
      >
        <span className="text-base">{moduleIcon}</span>
        <div className="flex-1 min-w-0">
          <span className="text-sm font-semibold text-white">{moduleTitle}</span>
          <span className="text-xs text-muted ml-2">{knownCount}/{items.length} known</span>
        </div>
        <div className="w-16 h-1.5 bg-border rounded-full overflow-hidden shrink-0">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${items.length > 0 ? Math.round((knownCount / items.length) * 100) : 0}%` }}
          />
        </div>
        {open ? <ChevronDown size={14} className="text-slate-500" /> : <ChevronRight size={14} className="text-slate-500" />}
      </button>
      {open && (
        <div className="border-t border-border/40">
          {items.map((v, i) => (
            <VocabRow key={i} v={v} known={known.has(vocabKey(v))} onToggle={onToggle} />
          ))}
        </div>
      )}
    </div>
  );
}

export function VocabBuilder({ data, onBack }: { data: LevelContent; onBack: () => void }) {
  const allVocab = useMemo(() => aggregateVocab(data), [data]);
  const [knownSet, setKnownSet] = useState(() => loadKnownVocab());
  const [query, setQuery] = useState("");
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [sortMode, setSortMode] = useState<SortMode>("module");
  const [drillMode, setDrillMode] = useState<"none" | "unknown" | "all">("none");

  const handleToggle = useCallback((v: AggregatedVocab) => {
    setKnownSet((prev) => {
      const next = new Set(prev);
      const k = vocabKey(v);
      next.has(k) ? next.delete(k) : next.add(k);
      saveKnownVocab(next);
      return next;
    });
  }, []);

  const filtered = useMemo(() => {
    let list = allVocab;
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((v) => v.de.toLowerCase().includes(q) || v.en.toLowerCase().includes(q));
    }
    if (filterMode === "known")   list = list.filter((v) => knownSet.has(vocabKey(v)));
    if (filterMode === "unknown") list = list.filter((v) => !knownSet.has(vocabKey(v)));
    if (sortMode === "alpha") list = [...list].sort((a, b) => a.de.localeCompare(b.de));
    return list;
  }, [allVocab, query, filterMode, sortMode, knownSet]);

  const groupedByModule = useMemo(() => {
    const groups = new Map<string, { title: string; icon: string; items: AggregatedVocab[] }>();
    for (const v of filtered) {
      if (!groups.has(v.moduleId)) groups.set(v.moduleId, { title: v.moduleTitle, icon: v.moduleIcon, items: [] });
      groups.get(v.moduleId)!.items.push(v);
    }
    return [...groups.entries()];
  }, [filtered]);

  const unknownCount = allVocab.filter((v) => !knownSet.has(vocabKey(v))).length;

  // Drill mode — convert to VocabItem[] for FlashcardDeck
  if (drillMode !== "none") {
    const drillList = drillMode === "unknown"
      ? allVocab.filter((v) => !knownSet.has(vocabKey(v)))
      : allVocab;
    return (
      <div className="space-y-5">
        <div>
          <button onClick={() => setDrillMode("none")} className="text-xs text-slate-500 hover:text-slate-300 transition-colors mb-2">
            ← Back to vocabulary
          </button>
          <h2 className="heading-gradient text-xl font-bold">
            Flashcard Drill — {drillMode === "unknown" ? "Unknown words" : "All vocabulary"}
          </h2>
          <p className="text-sm text-muted">{drillList.length} cards</p>
        </div>
        <FlashcardDeck
          key={drillMode}
          vocab={drillList}
          onComplete={() => setDrillMode("none")}
        />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <button onClick={onBack} className="text-xs text-slate-500 hover:text-slate-300 transition-colors mb-2">
          ← Back to dashboard
        </button>
        <div className="flex items-center gap-3 flex-wrap">
          <BookOpen size={20} className="text-blue-400" />
          <h1 className="heading-gradient text-2xl font-bold">Vocabulary Builder</h1>
          <Badge label="Goethe A1" variant="gold" />
        </div>
        <p className="text-sm text-muted mt-1">
          {allVocab.length} words · {knownSet.size} known · {unknownCount} to learn
        </p>
      </div>

      {/* Stats bar */}
      <GlassCard className="p-4">
        <div className="flex justify-between text-xs text-muted mb-2">
          <span>Words learned</span>
          <span className="text-emerald-400 font-semibold">
            {allVocab.length > 0 ? Math.round((knownSet.size / allVocab.length) * 100) : 0}%
          </span>
        </div>
        <div className="h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-700"
            style={{ width: `${allVocab.length > 0 ? Math.round((knownSet.size / allVocab.length) * 100) : 0}%` }}
          />
        </div>
        <div className="flex gap-3 mt-3">
          <Button
            variant="primary"
            size="sm"
            icon={RotateCcw}
            onClick={() => setDrillMode("unknown")}
          >
            Drill unknown ({unknownCount})
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={BookOpen}
            onClick={() => setDrillMode("all")}
          >
            Drill all
          </Button>
        </div>
      </GlassCard>

      {/* Search + filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search German or English…"
            className="w-full bg-card border border-border rounded-lg pl-9 pr-9 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500/40"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Filter mode */}
          {(["all", "unknown", "known"] as FilterMode[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilterMode(f)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all font-medium capitalize ${
                filterMode === f
                  ? "bg-violet-400/10 border-violet-400/40 text-violet-300"
                  : "border-border text-slate-500 hover:text-slate-300 hover:border-slate-600"
              }`}
            >
              {f}
            </button>
          ))}
          <div className="w-px bg-border self-stretch" />
          {/* Sort */}
          <button
            onClick={() => setSortMode((m) => m === "alpha" ? "module" : "alpha")}
            className="text-xs px-3 py-1.5 rounded-full border border-border text-slate-500 hover:text-slate-300 hover:border-slate-600 transition-all flex items-center gap-1.5"
          >
            <SortAsc size={11} />
            {sortMode === "alpha" ? "A–Z" : "By module"}
          </button>
        </div>
      </div>

      {/* Vocabulary list */}
      {sortMode === "module" ? (
        <div className="space-y-3">
          {groupedByModule.map(([moduleId, { title, icon, items }], i) => (
            <ModuleSection
              key={moduleId}
              moduleTitle={title}
              moduleIcon={icon}
              items={items}
              known={knownSet}
              onToggle={handleToggle}
              defaultOpen={i === 0}
            />
          ))}
        </div>
      ) : (
        <GlassCard className="overflow-hidden rounded-xl">
          {filtered.map((v, i) => (
            <VocabRow key={i} v={v} known={knownSet.has(vocabKey(v))} onToggle={handleToggle} />
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-sm text-muted py-8">No words match your search.</p>
          )}
        </GlassCard>
      )}
    </div>
  );
}
