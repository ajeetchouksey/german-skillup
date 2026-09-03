import type { ReadingPassage } from "@/types";

// Seed content proving the read-aloud pipeline end-to-end. Reuses A1 daily-
// routine vocabulary/grammar already taught elsewhere in the level (present
// tense, time expressions) per lesson-standard's spaced-reinforcement rule.
export const passagesA1: ReadingPassage[] = [
  {
    id: "a1-passage-01",
    level: "A1",
    title: "Ein Tag in meinem Leben",
    sentences: [
      "Ich heiße Anna und ich komme aus Berlin.",
      "Ich stehe um sieben Uhr auf.",
      "Am Morgen trinke ich Kaffee und esse ein Brötchen.",
      "Ich arbeite von neun bis siebzehn Uhr.",
      "Am Abend koche ich mit meiner Familie.",
      "Um zehn Uhr gehe ich ins Bett.",
    ],
    translationEn:
      "My name is Anna and I come from Berlin. I get up at seven o'clock. In the morning I drink coffee and eat a bread roll. I work from nine to five. In the evening I cook with my family. At ten o'clock I go to bed.",
  },
];
