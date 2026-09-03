import type { ExamBlueprint } from "@/types";

export const examBlueprintA1: ExamBlueprint = {
 level: "A1",
 provider: "Goethe-Institut",
 alsoRecognizedBy: [
  { provider: "telc", note: "telc Deutsch A1 covers equivalent content at this level.", url: "https://www.telc.net/en/" },
  { provider: "ÖSD", note: "ÖSD Zertifikat A1 (Austria) covers equivalent content at this level.", url: "https://www.osd.at/en/" },
 ],
 sources: {
  exam: "https://www.goethe.de/en/spr/prf/ueb/pa1.html",
  listening: "https://bfu.goethe.de/a1_sd1/hoeren.php",
  reading: "https://bfu.goethe.de/a1_sd1/lesen.php",
  writing: "https://bfu.goethe.de/a1_sd1/schreiben.php",
  speaking: "https://bfu.goethe.de/a1_sd1/sprechen.php",
  vocabulary: "https://www.goethe.de/pro/relaunch/prf/de/A1_SD1_Wortliste_02.pdf",
  results: "https://www.goethe.de/en/spr/prf/pes/pas1.html",
 },
 sections: [
  {id:"hoeren",name:"Hören",duration:"about 20 minutes",parts:3,description:"Short everyday conversations, telephone messages and public announcements.",taskTypes:["Part 1: six multiple-choice items; each recording twice","Part 2: four true/false items from public announcements; each recording once","Part 3: five multiple-choice items; each recording twice"],strategy:["Read the question and options before listening","Mark numbers, prices, times, places and negation","Do not stop at an unknown word"]},
  {id:"lesen",name:"Lesen",duration:"25 minutes",parts:3,description:"Short messages, websites, advertisements, notices and signs.",taskTypes:["Part 1: two short messages and five true/false items","Part 2: choose the correct information source for five situations","Part 3: five notices/signs with true/false items"],strategy:["Read the task before the text","Underline dates, prices, opening times and words such as nicht, nur and geschlossen","Check whether the text satisfies the complete situation"]},
  {id:"schreiben",name:"Schreiben",duration:"20 minutes",parts:2,description:"Complete a simple form and write a short personal or formal message.",taskTypes:["Part 1: enter five missing pieces of information in a form","Part 2: about 30 words, covering three content points plus greeting and closing"],strategy:["Copy names and numbers exactly","Write one clear sentence for each content point","Reserve two minutes to check greeting, closing, verb position and spelling"]},
  {id:"sprechen",name:"Sprechen",duration:"15 minutes",parts:3,description:"Oral group examination with introduction, information exchange and requests.",taskTypes:["Part 1: introduce yourself; spell or give a number when asked","Part 2: ask for and give everyday information using prompt cards","Part 3: formulate a request and react to a partner's request"],strategy:["Use short complete sentences","React to the partner, not only to the examiner","Use repair phrases: Wie bitte?, Noch einmal bitte, Bitte langsamer"]},
 ],
 passMark: { total: 100, written: 75, oral: 25, required: 60 },
};
