import { useState } from "react";
import { BookOpen, Clock, Mic, Wand2 } from "lucide-react";
import { GlassCard } from "@/components/ui";
import type { CEFRLevel } from "@/types";
import { PASSAGES } from "@/data/passages";
import { WritingChecker } from "./WritingChecker";
import { SpeakingCoach } from "./SpeakingCoach";
import { ExamSimulator } from "./ExamSimulator";
import { ReadAloudPractice } from "../ReadAloudPractice";

const TABS = [
  { id: "reading", label: "Read Aloud", icon: BookOpen, description: "Passage + mic-scored pronunciation" },
  { id: "writing", label: "Writing Checker", icon: Wand2, description: "Rule-based A1 grammar feedback" },
  { id: "speaking", label: "Speaking Coach", icon: Mic, description: "Timer + prompts + self-assessment" },
  { id: "exam", label: "Exam Simulator", icon: Clock, description: "Full 4-section timed mock exam" },
] as const;

type TabId = (typeof TABS)[number]["id"];

interface AgentPanelProps {
  level: CEFRLevel;
}

export function AgentPanel({ level }: AgentPanelProps) {
  const [active, setActive] = useState<TabId>("reading");
  const passage = PASSAGES[level][0];

  return (
    <div className="space-y-6">
      {/* Tab bar */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <GlassCard
              key={tab.id}
              accent={isActive ? "gold" : undefined}
              onClick={() => setActive(tab.id)}
              className={`cursor-pointer p-3.5 text-center transition-all ${isActive ? "border-yellow-500/40" : "hover:border-slate-600"}`}
            >
              <Icon size={16} className={`mx-auto mb-1.5 ${isActive ? "text-amber-400" : "text-slate-500"}`} />
              <p className={`text-xs font-semibold ${isActive ? "text-white" : "text-slate-400"}`}>{tab.label}</p>
              <p className="text-[10px] text-slate-600 mt-0.5 hidden sm:block">{tab.description}</p>
            </GlassCard>
          );
        })}
      </div>

      {/* Panel */}
      {active === "reading" && (
        passage ? (
          <ReadAloudPractice passage={passage} />
        ) : (
          <GlassCard className="p-6 text-center text-sm text-muted">
            Read-aloud passages for {level} are coming soon.
          </GlassCard>
        )
      )}
      {active === "writing" && <WritingChecker />}
      {active === "speaking" && <SpeakingCoach />}
      {active === "exam" && <ExamSimulator level={level} />}
    </div>
  );
}
