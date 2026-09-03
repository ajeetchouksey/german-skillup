import { ArrowRight, BookOpen, Clock, Github, Mic, ShieldCheck, Sparkles, Wand2 } from "lucide-react";
import { LEVELS, AVAILABLE_LEVELS } from "@/data/levels";
import { getTotalLessonCount } from "@/lib/progress";
import { Button, GlassCard } from "./ui";
import { Footer } from "./Footer";

interface LandingProps {
  onStart: () => void;
}

const FEATURES = [
  {
    icon: BookOpen,
    accent: "gold" as const,
    title: "Real-life ready, exam-aligned",
    body: "Every lesson builds toward using German in real situations, and maps to the published Goethe-Zertifikat structure (telc and ÖSD friendly too) — so it complements whatever course or app you're already using.",
  },
  {
    icon: Wand2,
    accent: "violet" as const,
    title: "AI Practice Lab",
    body: "Read passages aloud with mic-scored pronunciation, a Writing Checker, Speaking Coach with real signal, and a full mock Exam Simulator — practice producing German, not just recognizing it.",
  },
  {
    icon: ShieldCheck,
    accent: "emerald" as const,
    title: "No login, ever",
    body: "No account, no server, no tracking. Your XP, streak, and completed lessons live only in your browser's local storage.",
  },
  {
    icon: Sparkles,
    accent: "amber" as const,
    title: "Real-life missions",
    body: "Each module ends with a real-world task — order coffee, introduce your family, fill in a form — not just multiple choice.",
  },
];

export function Landing({ onStart }: LandingProps) {
  const totalLessons = AVAILABLE_LEVELS.reduce((sum, lvl) => {
    const data = LEVELS[lvl];
    return sum + (data ? getTotalLessonCount(data) : 0);
  }, 0);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between bg-slate-800/75 px-6 backdrop-blur-md relative">
        <div className="flex items-center gap-2.5">
          <img src="/aaryaai-mark.svg" alt="AaryaAI" className="h-7 w-7" />
          <span className="text-sm font-bold tracking-tight text-white">Deutsch SkillUp</span>
        </div>
        <Button
          href="https://github.com/ajeetchouksey/german-skillup"
          target="_blank"
          rel="noopener noreferrer"
          icon={Github}
          variant="ghost"
          size="sm"
        >
          GitHub
        </Button>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </header>

      <main className="flex-1 px-5 sm:px-9">
        {/* Hero */}
        <section className="mx-auto flex max-w-[760px] flex-col items-center pt-14 pb-16 text-center sm:pt-20">
          <p className="page-eyebrow">AaryaAI · Free, no-login German learning</p>
          <h1 className="heading-gradient text-4xl font-extrabold leading-tight sm:text-5xl">
            Speak German with real confidence.
          </h1>
          <p className="mt-5 max-w-[560px] text-base text-muted sm:text-lg">
            A companion to whatever you're already learning with — a structured A1 → C1 path built
            for real conversations, with an AI-powered writing checker, speaking coach, and full
            mock exam practice (Goethe-aligned, telc &amp; ÖSD friendly). Free. No account required.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button variant="primary" size="md" icon={Sparkles} iconRight={ArrowRight} onClick={onStart}>
              Start Learning Free
            </Button>
            <Button variant="outline" size="md" href="#features">
              See what's inside
            </Button>
          </div>
        </section>

        {/* Stat strip */}
        <section className="mx-auto grid max-w-[760px] grid-cols-2 gap-3 pb-16 sm:grid-cols-4">
          {[
            { value: AVAILABLE_LEVELS.length, label: "Levels live" },
            { value: totalLessons, label: "Lessons" },
            { value: 4, label: "AI coach tools" },
            { value: "Free", label: "Forever" },
          ].map((s) => (
            <GlassCard key={s.label} className="glass-stats p-4 text-center">
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-[11px] text-slate-500">{s.label}</div>
            </GlassCard>
          ))}
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-[880px] pb-20">
          <p className="page-eyebrow mx-auto w-fit">What you get</p>
          <h2 className="mx-auto w-fit text-2xl font-bold text-white sm:text-3xl">
            Everything you need, nothing you don't
          </h2>
          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <GlassCard key={f.title} accent={f.accent} className="p-6">
                <f.icon size={20} className="text-lilac" />
                <h3 className="mt-3 font-semibold text-white">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{f.body}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="mx-auto max-w-[560px] pb-20 text-center">
          <GlassCard accent="violet" className="p-8">
            <Clock size={22} className="mx-auto text-lilac" />
            <h2 className="mt-3 text-xl font-bold text-white">Your next lesson takes 15 minutes.</h2>
            <p className="mt-2 text-sm text-muted">
              Jump into Alphabet & Greetings — no signup form between you and your first lesson.
            </p>
            <div className="mt-5">
              <Button variant="primary" size="md" icon={Mic} iconRight={ArrowRight} onClick={onStart}>
                Start Learning Free
              </Button>
            </div>
          </GlassCard>
        </section>
      </main>

      <Footer />
    </div>
  );
}
