import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Headphones,
  MessageSquare,
  Mic,
  PenLine,
  Target,
  Zap,
} from "lucide-react";
import type { Lesson, LevelContent, Module, PracticeTask, ProgressState } from "@/types";
import { Badge, Button, GlassCard } from "./ui";
import { Quiz } from "./Quiz";
import { ModulePractice } from "./ModulePractice";
import { FlashcardDeck } from "./FlashcardDeck";
import { VocabTypeQuiz } from "./VocabTypeQuiz";
import { WritingPad } from "./WritingPad";
import { SpeakButton } from "./SpeakButton";
import { PronounceChecker } from "./PronounceChecker";

interface Props {
  data: LevelContent;
  mod: Module;
  lesson: Lesson;
  progress: ProgressState;
  onComplete: (id: string) => void;
  onQuizComplete: (id: string, c: number, t: number) => void;
  onNavigate: (m: Module, l: Lesson) => void;
  onToast: (m: string) => void;
}

function SectionLabel({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="mb-3 mt-6 flex items-center gap-2">
      <Icon size={13} className="text-amber-400 shrink-0" />
      <span className="text-xs font-bold uppercase tracking-widest text-amber-400">{label}</span>
    </div>
  );
}

function TaskCard({
  label,
  icon,
  task,
  isWriting = false,
}: {
  label: string;
  icon: React.ElementType;
  task?: PracticeTask;
  isWriting?: boolean;
}) {
  if (!task) return null;
  return (
    <section>
      <SectionLabel icon={icon} label={`${label}: ${task.title}`} />
      <GlassCard className="p-4" rounded="lg">
        <div className="mb-2 flex flex-wrap gap-2 text-xs">
          {task.examPart && <Badge label={task.examPart} variant="slate" />}
          {task.timeMinutes && <Badge label={`${task.timeMinutes} min`} variant="slate" />}
        </div>
        <p className="text-sm">{task.instruction}</p>
        {task.checklist && (
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
            {task.checklist.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        )}
        {task.modelAnswer && (
          <details className="mt-3 text-sm">
            <summary className="cursor-pointer text-amber-400 hover:text-amber-300">Show model answer / guidance</summary>
            <p className="mt-2 whitespace-pre-line text-muted">{task.modelAnswer}</p>
          </details>
        )}
        {isWriting && (
          <WritingPad
            targetWords={task.timeMinutes && task.timeMinutes <= 8 ? 30 : 40}
            label="Practice writing area"
          />
        )}
      </GlassCard>
    </section>
  );
}

export function LessonView({ data, mod, lesson, progress, onComplete, onQuizComplete, onNavigate, onToast }: Props) {
  const flat = data.modules.flatMap((m) => m.lessons.map((l) => ({ lesson: l, mod: m })));
  const idx = flat.findIndex((x) => x.lesson.id === lesson.id);
  const prev = flat[idx - 1];
  const next = flat[idx + 1];
  const done = progress.completedLessons.includes(lesson.id);

  return (
    <GlassCard className="p-5 sm:p-7">
      {/* Header */}
      <div className="mb-2 flex flex-wrap gap-2">
        {lesson.examMapping.map((x) => (
          <Badge key={x} label={x} variant="gold" />
        ))}
        {done && <Badge label="Completed" variant="green" icon={CheckCircle2} />}
      </div>
      <p className="text-xs text-muted">{mod.syllabusTheme}</p>
      <h2 className="mt-1 text-2xl font-bold">
        {mod.icon} {lesson.title}
      </h2>

      <ModulePractice moduleId={mod.id} />

      {/* Learning objectives */}
      <SectionLabel icon={Target} label="Learning objectives" />
      <div className="note-paper note-green note-tape relative mt-2">
        <ul className="space-y-0 list-none">
          {lesson.objectives.map((x) => (
            <li key={x} className="flex gap-2">
              <span className="text-emerald-700 shrink-0">✦</span>{x}
            </li>
          ))}
        </ul>
      </div>

      {/* Grammar */}
      <SectionLabel icon={BookOpen} label="Grammar and patterns" />
      <div className="note-paper note-tape relative mt-2">
        <ul className="space-y-0 list-none">
          {lesson.grammar.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>

      {/* Vocabulary */}
      <SectionLabel icon={Zap} label="Core vocabulary" />
      <div className="grid gap-3 sm:grid-cols-2">
        {lesson.vocab.map((v) => (
          <article key={v.de} className="rounded-md border border-border p-3 bg-bg-alt">
            <div className="flex items-start justify-between gap-3">
              <b className="text-violet-300" style={{ fontFamily: "'Kalam', cursive", fontSize: '17px' }}>{v.de}</b>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-slate-400 text-sm">{v.en}</span>
                <SpeakButton text={v.de} />
                <PronounceChecker target={v.de} />
              </div>
            </div>
            {v.example && (
              <p className="mt-1.5 text-muted" style={{ fontFamily: "'Kalam', cursive", fontSize: '14px' }}>
                {v.example}
              </p>
            )}
          </article>
        ))}
      </div>

      {/* Flashcard drill */}
      <SectionLabel icon={Zap} label="Flashcard drill" />
      <FlashcardDeck vocab={lesson.vocab} lessonId={lesson.id} />

      {/* Examples */}
      <SectionLabel icon={MessageSquare} label="Model sentences" />
      <div className="note-paper note-tape relative mt-2">
        <ul className="space-y-0 list-none">
          {lesson.examples.map((x) => (
            <li key={x} className="flex items-center gap-2">
              <span className="flex-1">{x}</span>
              <SpeakButton text={x} />
            </li>
          ))}
        </ul>
      </div>

      {/* Useful phrases */}
      <SectionLabel icon={MessageSquare} label="Useful phrases" />
      <div className="note-paper note-compact note-tape relative mt-2">
        <ul className="space-y-0 list-none">
          {lesson.usefulPhrases.map((x) => {
            const german = x.split('—')[0].trim();
            return (
              <li key={x} className="flex items-center gap-2">
                <span className="flex-1">{x}</span>
                <SpeakButton text={german} />
              </li>
            );
          })}
        </ul>
      </div>

      {/* Exam skill tasks */}
      <TaskCard label="Hören" icon={Headphones} task={lesson.listeningTask} />
      <TaskCard label="Lesen" icon={BookOpen} task={lesson.readingTask} />
      <TaskCard label="Schreiben" icon={PenLine} task={lesson.writingTask} isWriting />
      <TaskCard label="Sprechen" icon={Mic} task={lesson.speakingTask} />

      {/* Real-life mission */}
      <SectionLabel icon={Target} label="Real-life mission" />
      <div className="note-sticky mt-2">
        <span className="absolute top-1.5 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-yellow-700/70">Mission</span>
        {lesson.realLifeTask}
      </div>

      {/* Exam focus / Common mistakes */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <SectionLabel icon={CheckCircle2} label="Exam focus" />
          <div className="note-paper note-tape relative mt-2" style={{ background: '#f0f7ff', backgroundImage: 'linear-gradient(to right, transparent 36px, #93c5fd 36px, #93c5fd 37px, transparent 37px), repeating-linear-gradient(to bottom, transparent, transparent 31px, rgba(147,197,253,0.4) 31px, rgba(147,197,253,0.4) 32px)' }}>
            <ul className="space-y-0 list-none">
              {lesson.examFocus.map((x) => (
                <li key={x} className="flex gap-2"><span className="text-blue-600 shrink-0">✓</span>{x}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <SectionLabel icon={Zap} label="Common mistakes" />
          <div className="note-paper note-tape note-paper-yellow relative mt-2">
            <ul className="space-y-0 list-none">
              {lesson.commonMistakes.map((x) => (
                <li key={x} className="flex gap-2"><span className="text-red-500 shrink-0">✗</span>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Vocabulary typing challenge */}
      {lesson.vocab.length > 0 && (
        <>
          <SectionLabel icon={Zap} label="Vocab challenge — type the German" />
          <VocabTypeQuiz vocab={lesson.vocab} />
        </>
      )}

      {/* Quiz */}
      <SectionLabel icon={CheckCircle2} label="Knowledge check" />
      <Quiz
        lesson={lesson}
        onComplete={(c, t) => {
          onQuizComplete(lesson.id, c, t);
          onToast(`Quiz: ${c}/${t} correct (+${c * 5} XP)`);
        }}
      />

      {/* Navigation */}
      <div className="mt-7 flex justify-between gap-2">
        <Button
          variant="ghost"
          size="sm"
          icon={ArrowLeft}
          disabled={!prev}
          onClick={() => prev && onNavigate(prev.mod, prev.lesson)}
        >
          Previous
        </Button>

        <Button
          variant={done ? "ghost" : "outline"}
          size="sm"
          icon={CheckCircle2}
          onClick={() => {
            onComplete(lesson.id);
            onToast(done ? "Already completed ✓" : "Completed +10 XP");
          }}
        >
          {done ? "Completed ✓" : "Mark Complete"}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          iconRight={ArrowRight}
          disabled={!next}
          onClick={() => next && onNavigate(next.mod, next.lesson)}
        >
          Next
        </Button>
      </div>
    </GlassCard>
  );
}
