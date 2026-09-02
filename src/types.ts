export interface VocabItem { de: string; en: string; example?: string; }
export interface QuizQuestion { q: string; options: string[]; answer: string; explanation?: string; }
export interface PracticeTask { title: string; instruction: string; modelAnswer?: string; examPart?: string; timeMinutes?: number; checklist?: string[]; }
export interface Lesson {
 id: string; title: string; examMapping: string[]; objectives: string[]; grammar: string[];
 vocab: VocabItem[]; examples: string[]; usefulPhrases: string[];
 readingTask?: PracticeTask; listeningTask?: PracticeTask; writingTask?: PracticeTask; speakingTask?: PracticeTask;
 realLifeTask: string; examFocus: string[]; commonMistakes: string[]; quiz: QuizQuestion[];
}
export interface Module { id: string; title: string; icon: string; syllabusTheme: string; lessons: Lesson[]; }
export interface LevelContent { level: CEFRLevel; language: string; modules: Module[]; }
export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1";
export interface QuizScore { correct: number; total: number; pct: number; }
export interface ProgressState { xp: number; streak: number; lastVisit: string | null; completedLessons: string[]; quizScores: Record<string, QuizScore>; }
export interface ExamSection { id:string; name:string; duration:string; parts:number; description:string; taskTypes:string[]; strategy:string[]; }
