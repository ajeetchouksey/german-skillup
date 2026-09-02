import type { LevelContent } from "@/types";

// Original learning content aligned to the published Goethe-Zertifikat A1: Start Deutsch 1 structure.
// This is not an official Goethe-Institut product and does not reproduce official test materials.
export const lessonsA1: LevelContent = {
  "level": "A1",
  "language": "German",
  "modules": [
    {
      "id": "a1-m00",
      "title": "German Basics",
      "icon": "🔤",
      "syllabusTheme": "Alphabet · Greetings · Numbers 1–100",
      "lessons": [
        {
          "id": "a1-00a",
          "title": "Alphabet & Greetings",
          "examMapping": ["Sprechen Teil 1", "Schreiben Teil 1"],
          "objectives": [
            "Pronounce and recognise all 26 German letters + Umlauts (Ä, Ö, Ü) and ß",
            "Spell your name out loud (critical for the exam Sprechen task)",
            "Use time-of-day greetings correctly: Guten Morgen, Guten Tag, Guten Abend",
            "Say goodbye formally and informally",
            "Introduce yourself with a single sentence: Ich heiße ..."
          ],
          "grammar": [
            "German alphabet pronunciation vs. English",
            "Umlauts: Ä (like 'air'), Ö (like 'her'), Ü (like 'few'), ß = ss",
            "Formal Sie vs. informal du — when to use which",
            "Verb-second rule: Guten Tag, ich heiße Anna. (verb in position 2)"
          ],
          "vocab": [
            { "de": "Guten Morgen", "en": "Good morning", "example": "Guten Morgen! Wie geht es Ihnen?" },
            { "de": "Guten Tag", "en": "Good day / Hello", "example": "Guten Tag, ich bin Anna Müller." },
            { "de": "Guten Abend", "en": "Good evening", "example": "Guten Abend! Schön, Sie zu treffen." },
            { "de": "Hallo", "en": "Hello (informal)", "example": "Hallo! Wie heißt du?" },
            { "de": "Auf Wiedersehen", "en": "Goodbye (formal)", "example": "Auf Wiedersehen, bis morgen!" },
            { "de": "Tschüss", "en": "Bye (informal)", "example": "Tschüss! Bis später!" },
            { "de": "Bis bald", "en": "See you soon", "example": "Tschüss und bis bald!" },
            { "de": "Bitte", "en": "Please / You're welcome", "example": "Bitte schön!" },
            { "de": "Danke", "en": "Thank you", "example": "Danke schön!" },
            { "de": "Ja / Nein", "en": "Yes / No", "example": "Ja, natürlich. Nein, danke." },
            { "de": "Entschuldigung", "en": "Excuse me / Sorry", "example": "Entschuldigung, wo ist der Bahnhof?" },
            { "de": "buchstabieren", "en": "to spell", "example": "Können Sie Ihren Namen buchstabieren?" },
            { "de": "das Alphabet", "en": "the alphabet", "example": "Das deutsche Alphabet hat 26 Buchstaben." },
            { "de": "der Buchstabe", "en": "the letter", "example": "Der Buchstabe 'ß' heißt Eszett." },
            { "de": "der Umlaut", "en": "umlaut (modified vowel)", "example": "Ä, Ö und Ü sind Umlaute." }
          ],
          "examples": [
            "Guten Morgen! Ich heiße Lena. Wie heißen Sie?",
            "Auf Wiedersehen, Herr Müller! Bis morgen.",
            "Entschuldigung — können Sie das buchstabieren?",
            "Hallo! — Hallo! Wie geht's? — Gut, danke!"
          ],
          "usefulPhrases": [
            "Wie heißen Sie? — What is your name? (formal)",
            "Wie heißt du? — What is your name? (informal)",
            "Mein Name ist ... — My name is ...",
            "Ich heiße ... — I am called ...",
            "Wie schreibt man das? — How do you write that?",
            "Können Sie das buchstabieren? — Can you spell that?"
          ],
          "writingTask": {
            "prompt": "Write 3 greetings for different times of day and spell your first name in German. Example: 'Guten Morgen! Mein Name ist Anna: A-N-N-A.'",
            "wordMin": 20,
            "wordMax": 40
          },
          "speakingTask": {
            "prompt": "Practise saying the full German alphabet out loud (A–Z + Ä, Ö, Ü, ß). Then spell your full name. Time yourself: aim for under 30 seconds for the alphabet.",
            "tips": [
              "Focus on the letters that differ most from English: J (yot), V (fow), W (vay), Z (tset)",
              "ß is called Eszett — it always sounds like 'ss'",
              "When in doubt, say 'Wie ein A mit Umlaut' (like an A with umlaut) for Ä"
            ]
          },
          "realLifeTask": "Next time you introduce yourself to anyone, try spelling your last name in German. Use an online German pronunciation guide to check your letter sounds.",
          "examFocus": [
            "Spelling your name is tested in Sprechen Teil 1 — you must spell it letter by letter",
            "Time-of-day greetings appear in Hören dialogues — know Morgen/Tag/Abend",
            "Bitte and Danke appear in almost every Hören track"
          ],
          "commonMistakes": [
            "'W' is pronounced 'vay' not 'double-u' — Wie heißt du sounds like 'Vee hysst doo'",
            "J sounds like English 'Y' — Ja = 'yah', not 'jah'",
            "Auf Wiedersehen: don't forget the 'r' — Wieder-sehen (see again)",
            "Tschüss is informal — don't use it with examiners in the speaking test"
          ],
          "quiz": [
            {
              "q": "Which greeting do you use at 8 AM?",
              "options": ["Guten Abend", "Guten Morgen", "Auf Wiedersehen", "Tschüss"],
              "answer": 1
            },
            {
              "q": "How is the German letter 'W' pronounced?",
              "options": ["like English W", "like English V", "like English B", "like English F"],
              "answer": 1
            },
            {
              "q": "Which of these is the formal goodbye?",
              "options": ["Tschüss", "Hallo", "Auf Wiedersehen", "Bis bald"],
              "answer": 2
            },
            {
              "q": "What does 'buchstabieren' mean?",
              "options": ["to greet", "to write", "to spell", "to read"],
              "answer": 2
            },
            {
              "q": "Which letters are called 'Umlaute'?",
              "options": ["A, E, I", "Ä, Ö, Ü", "B, D, G", "S, T, Z"],
              "answer": 1
            }
          ]
        },
        {
          "id": "a1-00b",
          "title": "Numbers 1–100 & Basic Counting",
          "examMapping": ["Hören Teil 1", "Schreiben Teil 1"],
          "objectives": [
            "Say and understand numbers 1–100",
            "Give and understand a phone number, price and room number",
            "Say your age: Ich bin 32 Jahre alt",
            "Understand numbers in fast speech (exam Hören tracks use real-speed numbers)"
          ],
          "grammar": [
            "Compound numbers: einundzwanzig (21), zweiunddreißig (32) — units BEFORE tens",
            "eins vs. ein: alone = eins, before noun = ein (ein Euro, eine Minute)",
            "Ordinal hint: erst- (first), zweit- (second) — not tested at A1 but useful",
            "Currency: ein Euro, fünfzig Cent — no plural on Euro in prices"
          ],
          "vocab": [
            { "de": "eins", "en": "one", "example": "Eins, zwei, drei — los!" },
            { "de": "zwei", "en": "two", "example": "Ich habe zwei Schwestern." },
            { "de": "drei", "en": "three", "example": "Der Kurs beginnt um drei Uhr." },
            { "de": "vier", "en": "four", "example": "Wir sind vier Personen." },
            { "de": "fünf", "en": "five", "example": "Fünf Minuten, bitte." },
            { "de": "sechs", "en": "six", "example": "Zimmer Nummer sechs." },
            { "de": "sieben", "en": "seven", "example": "Ich bin sieben Jahre alt." },
            { "de": "acht", "en": "eight", "example": "Acht Euro, bitte." },
            { "de": "neun", "en": "nine", "example": "Neun Uhr morgens." },
            { "de": "zehn", "en": "ten", "example": "Zehn Prozent Rabatt." },
            { "de": "elf", "en": "eleven", "example": "Es ist elf Uhr." },
            { "de": "zwölf", "en": "twelve", "example": "Zwölf Monate im Jahr." },
            { "de": "zwanzig", "en": "twenty", "example": "Ich bin zwanzig Jahre alt." },
            { "de": "dreißig", "en": "thirty", "example": "Dreißig Grad — sehr heiß!" },
            { "de": "vierzig", "en": "forty", "example": "Vierzig Euro kostet das." },
            { "de": "fünfzig", "en": "fifty", "example": "Fünfzig Cent." },
            { "de": "sechzig", "en": "sixty", "example": "Sechzig Minuten — eine Stunde." },
            { "de": "siebzig", "en": "seventy", "example": "Siebzig Kilometer pro Stunde." },
            { "de": "achtzig", "en": "eighty", "example": "Achtzig Prozent bestanden." },
            { "de": "neunzig", "en": "ninety", "example": "Neunzig Euro im Monat." },
            { "de": "hundert", "en": "one hundred", "example": "Hundert Euro — genau." },
            { "de": "null", "en": "zero", "example": "Meine Handynummer beginnt mit null." },
            { "de": "das Jahr", "en": "the year", "example": "Ich bin 1990 geboren." },
            { "de": "das Alter", "en": "the age", "example": "Mein Alter ist 34 Jahre." }
          ],
          "examples": [
            "Meine Telefonnummer ist null-eins-sieben-drei-fünf-zwei-acht.",
            "Das kostet neunzehn Euro fünfzig.",
            "Ich bin dreiundzwanzig Jahre alt.",
            "Zimmer Nummer zweiundvierzig, bitte."
          ],
          "usefulPhrases": [
            "Wie alt sind Sie? — How old are you?",
            "Ich bin ... Jahre alt. — I am ... years old.",
            "Was kostet das? — How much does it cost?",
            "Das kostet ... Euro. — It costs ... euros.",
            "Meine Handynummer ist ... — My mobile number is ...",
            "Können Sie das wiederholen? — Can you repeat that?"
          ],
          "listeningTask": {
            "instruction": "Ask a partner or text-to-speech tool to read 10 numbers between 1–100 at normal speed. Write each one as a digit. Typical exam pace: one number every 3–4 seconds.",
            "tips": [
              "German tens: -zig ending (zwanzig, dreißig, vierzig…) — note dreißig has -ßig not -zig",
              "Units come FIRST in compound numbers: einundzwanzig = ein + und + zwanzig",
              "Phone numbers are often read digit by digit or in pairs"
            ]
          },
          "writingTask": {
            "prompt": "Write these numbers as words: 7, 15, 23, 48, 100. Then write: 'Ich bin [your age] Jahre alt. Meine Handynummer ist [make one up].'",
            "wordMin": 25,
            "wordMax": 50
          },
          "realLifeTask": "Write out your phone number, your age, and the price of something you bought recently — all in German words. Read them aloud 3 times.",
          "examFocus": [
            "Hören Teil 1 and Teil 2 frequently include prices, phone numbers, room numbers and ages",
            "You must write numbers as digits — spelling them out in the exam is not required but understanding them is",
            "dreißig (30) is a common spelling trap — not 'dreisig'"
          ],
          "commonMistakes": [
            "siebzehn (17) not siebenzehn — the 'en' drops before -zehn and -zig",
            "siebzig (70) not siebenzig — same rule",
            "einundzwanzig is one word — not 'ein und zwanzig'",
            "eins becomes ein before a noun: ein Euro, NOT eins Euro"
          ],
          "quiz": [
            {
              "q": "How do you say 23 in German?",
              "options": ["zweidrei", "dreidzwanzig", "dreiundzwanzig", "zwanzigdrei"],
              "answer": 2
            },
            {
              "q": "Which is correct: 'Ich bin ___ Jahre alt' for age 17?",
              "options": ["siebenzehn", "siebzehn", "siebenzig", "siebzehnig"],
              "answer": 1
            },
            {
              "q": "What does 'dreißig' mean?",
              "options": ["thirteen", "thirty", "three", "three hundred"],
              "answer": 1
            },
            {
              "q": "How do you say your mobile number starts with '07'?",
              "options": ["Null-sieben", "Siebn-null", "O-sieben", "Siebzig"],
              "answer": 0
            },
            {
              "q": "70 in German is:",
              "options": ["siebenzig", "siebzig", "siebenzehn", "siebzehn"],
              "answer": 1
            }
          ]
        }
      ]
    },
    {
      "id": "a1-m01",
      "title": "Person and Identity",
      "icon": "👤",
      "syllabusTheme": "Goethe Wortliste: Person",
      "lessons": [
        {
          "id": "a1-01",
          "title": "Introduce Yourself",
          "examMapping": [
            "Sprechen Teil 1",
            "Schreiben Teil 1"
          ],
          "objectives": [
            "Give name, age, country, residence, languages, job and hobby",
            "Spell your surname and give a telephone number"
          ],
          "grammar": [
            "sein: ich bin / Sie sind",
            "heißen and wohnen",
            "W-question + verb + subject"
          ],
          "vocab": [
            {
              "de": "heißen",
              "en": "to be called",
              "example": "Ich heiße Ajeet."
            },
            {
              "de": "wohnen",
              "en": "to live",
              "example": "Ich wohne in Frankfurt."
            },
            {
              "de": "der Beruf",
              "en": "occupation",
              "example": "Was sind Sie von Beruf?"
            },
            {
              "de": "ledig",
              "en": "single",
              "example": "Ich bin ledig."
            },
            {
              "de": "buchstabieren",
              "en": "to spell",
              "example": "Bitte buchstabieren Sie Ihren Namen."
            }
          ],
          "examples": [
            "Ich komme aus Indien und wohne in Frankfurt.",
            "Ich bin Cloud Engineer von Beruf.",
            "Ich spreche Hindi, Englisch und ein bisschen Deutsch."
          ],
          "usefulPhrases": [
            "Wie heißen Sie?",
            "Woher kommen Sie?",
            "Wo wohnen Sie?",
            "Welche Sprachen sprechen Sie?",
            "Können Sie das buchstabieren?"
          ],
          "realLifeTask": "Introduce yourself to a new neighbour in 6-7 sentences without notes.",
          "examFocus": [
            "Use the exact Part 1 sequence until automatic",
            "Distinguish Herkunft: aus and Wohnort: in",
            "Speak clearly rather than quickly"
          ],
          "commonMistakes": [
            "Ich bin aus Indien instead of Ich komme aus Indien",
            "Mixing Name and Vorname on forms"
          ],
          "quiz": [
            {
              "q": "Complete: Ich ___ in Frankfurt.",
              "options": [
                "wohne",
                "komme",
                "heiße",
                "spreche"
              ],
              "answer": "wohne",
              "explanation": "wohnen in describes residence."
            },
            {
              "q": "Formal question for a name:",
              "options": [
                "Wie heißt du?",
                "Wie heißen Sie?",
                "Wo heißen Sie?",
                "Was Name?"
              ],
              "answer": "Wie heißen Sie?",
              "explanation": "Use Sie in a formal situation."
            }
          ],
          "speakingTask": {
            "title": "Part 1 simulation",
            "instruction": "Speak for 45-60 seconds: name, age, country, city, languages, occupation and hobby. Then spell your surname and give your telephone number.",
            "modelAnswer": "Guten Tag. Ich heiße Ajeet Chouksey. Ich bin ... Jahre alt. Ich komme aus Indien und wohne in Frankfurt. Ich spreche Hindi, Englisch und ein bisschen Deutsch. Ich bin Cloud Engineer. Mein Hobby ist Reisen. Chouksey: C-H-O-U-K-S-E-Y.",
            "examPart": "Sprechen Teil 1",
            "timeMinutes": 3,
            "checklist": [
              "All seven identity points covered",
              "Surname spelled clearly",
              "Numbers pronounced accurately"
            ]
          }
        },
        {
          "id": "a1-02",
          "title": "Forms and Personal Data",
          "examMapping": [
            "Schreiben Teil 1",
            "Lesen Teil 1"
          ],
          "objectives": [
            "Transfer information from a source text into a form",
            "Recognise Familienname, Vorname, Geburtsdatum, Staatsangehörigkeit and Unterschrift"
          ],
          "grammar": [
            "noun capitalization",
            "dates: 03.05.1984",
            "address order: Straße, Hausnummer, PLZ, Ort"
          ],
          "vocab": [
            {
              "de": "der Familienname",
              "en": "surname",
              "example": "Familienname: Chouksey"
            },
            {
              "de": "der Vorname",
              "en": "first name",
              "example": "Vorname: Ajeet"
            },
            {
              "de": "das Geburtsdatum",
              "en": "date of birth",
              "example": "Geburtsdatum: 03.05.1984"
            },
            {
              "de": "die Staatsangehörigkeit",
              "en": "nationality",
              "example": "Staatsangehörigkeit: indisch"
            },
            {
              "de": "die Unterschrift",
              "en": "signature",
              "example": "Unterschrift nicht vergessen."
            }
          ],
          "examples": [
            "Bitte füllen Sie das Formular aus.",
            "Schreiben Sie in Druckbuchstaben.",
            "Unterschreiben Sie unten rechts."
          ],
          "usefulPhrases": [
            "Wo muss ich unterschreiben?",
            "Welche Information fehlt?",
            "Brauche ich meinen Ausweis?"
          ],
          "realLifeTask": "Complete a real registration or delivery form in German.",
          "examFocus": [
            "Copy, do not translate, names and addresses",
            "Read the source scenario for relationships and number of people",
            "Use the required format for dates"
          ],
          "commonMistakes": [
            "Reversing Familienname and Vorname",
            "Inventing information not present in the source"
          ],
          "quiz": [
            {
              "q": "Vorname means:",
              "options": [
                "surname",
                "first name",
                "postcode",
                "signature"
              ],
              "answer": "first name",
              "explanation": "Vorname is the given name."
            },
            {
              "q": "PLZ means:",
              "options": [
                "phone",
                "postcode",
                "country",
                "date"
              ],
              "answer": "postcode",
              "explanation": "PLZ is Postleitzahl."
            }
          ],
          "writingTask": {
            "title": "Five-field form drill",
            "instruction": "Read a short family/travel scenario and complete exactly five empty fields: number of people, children, address, payment method and date.",
            "modelAnswer": "Check each entry against the source. If the source says two adults and two children, Anzahl der Personen is 4 and davon Kinder is 2.",
            "examPart": "Schreiben Teil 1",
            "timeMinutes": 7,
            "checklist": [
              "Exactly five answers",
              "Names and numbers copied accurately",
              "Correct box selected"
            ]
          }
        }
      ]
    },
    {
      "id": "a1-m02",
      "title": "Numbers, Time and Calendar",
      "icon": "🔢",
      "syllabusTheme": "Goethe Wortgruppen: Zahlen, Datum, Uhrzeit",
      "lessons": [
        {
          "id": "a1-03",
          "title": "Numbers, Prices and Telephone",
          "examMapping": [
            "Hören Teil 1",
            "Hören Teil 3"
          ],
          "objectives": [
            "Understand numbers, room numbers, prices and telephone numbers",
            "Distinguish similar number pairs"
          ],
          "grammar": [
            "13-19 with -zehn",
            "20-90 with -zig",
            "decimal prices: 19,95 Euro"
          ],
          "vocab": [
            {
              "de": "dreizehn",
              "en": "thirteen",
              "example": "Das kostet dreizehn Euro."
            },
            {
              "de": "dreißig",
              "en": "thirty",
              "example": "Das kostet dreißig Euro."
            },
            {
              "de": "fünfzehn",
              "en": "fifteen",
              "example": "Der Zug fährt um fünfzehn Uhr."
            },
            {
              "de": "fünfzig",
              "en": "fifty",
              "example": "Zimmer fünfzig."
            },
            {
              "de": "der Cent",
              "en": "cent",
              "example": "Neunzehn Euro fünfundneunzig Cent."
            }
          ],
          "examples": [
            "Meine Telefonnummer ist null eins sieben sechs ...",
            "Der Pullover kostet 29,90 Euro.",
            "Ihr Zimmer ist Nummer 245."
          ],
          "usefulPhrases": [
            "Wie viel kostet das?",
            "Wie ist Ihre Telefonnummer?",
            "Welche Zimmernummer haben Sie?"
          ],
          "realLifeTask": "Ask for a price, pay and repeat the amount in a shop.",
          "examFocus": [
            "Predict whether the answer must be price, number or telephone",
            "Write digits immediately",
            "Listen for the whole number before choosing"
          ],
          "commonMistakes": [
            "Confusing vierzehn/vierzig and fünfzehn/fünfzig",
            "Ignoring Euro versus Cent"
          ],
          "quiz": [
            {
              "q": "40 is:",
              "options": [
                "vierzehn",
                "vierzig",
                "vierte",
                "vierhundert"
              ],
              "answer": "vierzig",
              "explanation": "-zig forms tens."
            },
            {
              "q": "19,95 € is:",
              "options": [
                "neunzehn Euro fünfundneunzig Cent",
                "neunzig Euro",
                "neunzehn Cent",
                "fünfundneunzig Euro"
              ],
              "answer": "neunzehn Euro fünfundneunzig Cent",
              "explanation": "Say euros then cents."
            }
          ],
          "listeningTask": {
            "title": "Number discrimination",
            "instruction": "Ask a partner or text-to-speech tool to read 12 prices, phone numbers and room numbers. Write each one, then compare.",
            "modelAnswer": "Create minimal pairs: 14/40, 15/50, 16/60, 17/70.",
            "examPart": "Hören Teil 1 / 3",
            "timeMinutes": 8,
            "checklist": [
              "At least 10/12 correct",
              "Euro and Cent captured",
              "No number reversal"
            ]
          }
        },
        {
          "id": "a1-04",
          "title": "Dates, Days and Clock Time",
          "examMapping": [
            "Hören Teil 1",
            "Lesen Teil 3"
          ],
          "objectives": [
            "Understand dates, weekdays, opening times and appointments",
            "Use am, um and von...bis correctly"
          ],
          "grammar": [
            "am Montag / am 3. Mai",
            "um 14 Uhr",
            "von 8 bis 12 Uhr",
            "halb zehn = 09:30"
          ],
          "vocab": [
            {
              "de": "der Montag",
              "en": "Monday",
              "example": "Am Montag habe ich Zeit."
            },
            {
              "de": "der Termin",
              "en": "appointment",
              "example": "Der Termin ist am 5. August."
            },
            {
              "de": "halb",
              "en": "half to",
              "example": "Es ist halb zehn."
            },
            {
              "de": "geöffnet",
              "en": "open",
              "example": "Wir haben von 8 bis 18 Uhr geöffnet."
            },
            {
              "de": "geschlossen",
              "en": "closed",
              "example": "Am Sonntag ist geschlossen."
            }
          ],
          "examples": [
            "Der Kurs beginnt am dritten September.",
            "Das Büro ist montags von 8 bis 16 Uhr geöffnet.",
            "Wir treffen uns um Viertel nach drei."
          ],
          "usefulPhrases": [
            "Wann beginnt der Kurs?",
            "Um wie viel Uhr?",
            "Haben Sie am Freitag Zeit?"
          ],
          "realLifeTask": "Read the opening hours of a nearby office and plan a visit.",
          "examFocus": [
            "In signs, check the day and exception",
            "German halb points to the next hour",
            "Separate date from clock time"
          ],
          "commonMistakes": [
            "am 10 Uhr instead of um 10 Uhr",
            "Interpreting halb zehn as 10:30"
          ],
          "quiz": [
            {
              "q": "halb zehn means:",
              "options": [
                "09:30",
                "10:30",
                "09:15",
                "10:15"
              ],
              "answer": "09:30",
              "explanation": "Halfway toward ten."
            },
            {
              "q": "___ Montag ___ 9 Uhr",
              "options": [
                "Am / um",
                "Um / am",
                "In / bei",
                "An / von"
              ],
              "answer": "Am / um",
              "explanation": "am for day, um for time."
            }
          ],
          "readingTask": {
            "title": "Opening-hours notice",
            "instruction": "Read: Mo/Di/Do 8-16, Mi geschlossen, Fr 8-12, nur mit Termin. Answer when you can visit and whether an appointment is required.",
            "modelAnswer": "A valid answer: Friday at 10:00, with an appointment.",
            "examPart": "Lesen Teil 3",
            "timeMinutes": 4,
            "checklist": [
              "Day is open",
              "Time is within range",
              "nur mit Termin noticed"
            ]
          }
        }
      ]
    },
    {
      "id": "a1-m03",
      "title": "Family and Relationships",
      "icon": "👨‍👩‍👧",
      "syllabusTheme": "Goethe Wortliste: Familie, Familienstand, persönliche Beziehungen",
      "lessons": [
        {
          "id": "a1-05",
          "title": "Family and Possessives",
          "examMapping": [
            "Sprechen Teil 2",
            "Lesen Teil 1"
          ],
          "objectives": [
            "Describe immediate family",
            "Ask and answer about age, relationships and children"
          ],
          "grammar": [
            "mein/meine; dein/deine",
            "haben + accusative",
            "er/sie pronouns"
          ],
          "vocab": [
            {
              "de": "die Eltern",
              "en": "parents",
              "example": "Meine Eltern wohnen in Indien."
            },
            {
              "de": "die Tochter",
              "en": "daughter",
              "example": "Meine Tochter heißt Aarya."
            },
            {
              "de": "der Sohn",
              "en": "son",
              "example": "Haben Sie einen Sohn?"
            },
            {
              "de": "verheiratet",
              "en": "married",
              "example": "Ich bin verheiratet."
            },
            {
              "de": "allein",
              "en": "alone",
              "example": "Sie wohnt allein."
            }
          ],
          "examples": [
            "Das ist meine Tochter. Sie ist sechs Jahre alt.",
            "Ich habe einen Bruder und eine Schwester.",
            "Meine Familie wohnt in Pune."
          ],
          "usefulPhrases": [
            "Haben Sie Kinder?",
            "Wie alt ist Ihre Tochter?",
            "Wo wohnen Ihre Eltern?"
          ],
          "realLifeTask": "Explain your family to a colleague using a photo.",
          "examFocus": [
            "Use prompt word Familie to create a real question",
            "Answer with more than one word",
            "Listen to the partner’s question form"
          ],
          "commonMistakes": [
            "meine Vater instead of mein Vater",
            "Using sein for age instead of sein + Jahre alt"
          ],
          "quiz": [
            {
              "q": "___ Vater",
              "options": [
                "Mein",
                "Meine",
                "Meinen",
                "Meiner"
              ],
              "answer": "Mein",
              "explanation": "Vater is masculine."
            },
            {
              "q": "Ask about children:",
              "options": [
                "Haben Sie Kinder?",
                "Sind Sie Kinder?",
                "Wo Kinder?",
                "Wie heißt Kinder?"
              ],
              "answer": "Haben Sie Kinder?",
              "explanation": "haben is used for possession/family."
            }
          ],
          "speakingTask": {
            "title": "Prompt-card exchange",
            "instruction": "Prompt words: Kinder, Eltern, Geschwister, Wochenende. Ask one complete question for each and answer your partner.",
            "modelAnswer": "Kinder: Haben Sie Kinder? Eltern: Wo wohnen Ihre Eltern?",
            "examPart": "Sprechen Teil 2",
            "timeMinutes": 5,
            "checklist": [
              "Verb in correct position",
              "Question matches prompt",
              "Full short answer"
            ]
          }
        }
      ]
    },
    {
      "id": "a1-m04",
      "title": "Home, Furniture and Moving",
      "icon": "🏠",
      "syllabusTheme": "Goethe Wortliste: Wohnen",
      "lessons": [
        {
          "id": "a1-06",
          "title": "Describe a Home",
          "examMapping": [
            "Lesen Teil 2",
            "Sprechen Teil 2"
          ],
          "objectives": [
            "Describe rooms, furniture, rent and location",
            "Choose a suitable housing advertisement"
          ],
          "grammar": [
            "es gibt + accusative",
            "adjectives after sein",
            "location chunks: in der Nähe, neben"
          ],
          "vocab": [
            {
              "de": "die Wohnung",
              "en": "apartment",
              "example": "Die Wohnung hat drei Zimmer."
            },
            {
              "de": "die Miete",
              "en": "rent",
              "example": "Die Miete kostet 900 Euro."
            },
            {
              "de": "das Schlafzimmer",
              "en": "bedroom",
              "example": "Das Schlafzimmer ist ruhig."
            },
            {
              "de": "möbliert",
              "en": "furnished",
              "example": "Die Wohnung ist möbliert."
            },
            {
              "de": "umziehen",
              "en": "move",
              "example": "Wir ziehen im September um."
            }
          ],
          "examples": [
            "In der Küche gibt es einen Tisch.",
            "Die Wohnung liegt in der Nähe vom Bahnhof.",
            "Die Miete ist inklusive Heizung."
          ],
          "usefulPhrases": [
            "Wie hoch ist die Miete?",
            "Wie viele Zimmer hat die Wohnung?",
            "Ist die Wohnung möbliert?"
          ],
          "realLifeTask": "Compare two real housing ads and explain which fits you.",
          "examFocus": [
            "Match all conditions: city, size, price and date",
            "Do not select from one matching keyword only"
          ],
          "commonMistakes": [
            "es gibt ein Tisch instead of einen Tisch",
            "Missing a condition such as available date"
          ],
          "quiz": [
            {
              "q": "There is a table:",
              "options": [
                "Es gibt einen Tisch.",
                "Es hat ein Tisch.",
                "Ein Tisch gibt.",
                "Es ist einen Tisch."
              ],
              "answer": "Es gibt einen Tisch.",
              "explanation": "es gibt takes accusative."
            },
            {
              "q": "Miete means:",
              "options": [
                "rent",
                "room",
                "furniture",
                "move"
              ],
              "answer": "rent",
              "explanation": "die Miete is rent."
            }
          ],
          "readingTask": {
            "title": "Information-source match",
            "instruction": "Situation: You need a furnished room near the station, maximum €650, available from October. Compare two original ads and choose the one meeting every condition.",
            "modelAnswer": "Underline four conditions before reading the ads.",
            "examPart": "Lesen Teil 2",
            "timeMinutes": 4,
            "checklist": [
              "Location matched",
              "Price within limit",
              "Furnished",
              "Available date correct"
            ]
          }
        },
        {
          "id": "a1-07",
          "title": "Report a Housing Problem",
          "examMapping": [
            "Schreiben Teil 2",
            "Sprechen Teil 3"
          ],
          "objectives": [
            "Report a simple problem",
            "Request repair or help politely"
          ],
          "grammar": [
            "können + infinitive",
            "sein + kaputt",
            "seit + time"
          ],
          "vocab": [
            {
              "de": "die Heizung",
              "en": "heating",
              "example": "Die Heizung ist kaputt."
            },
            {
              "de": "der Aufzug",
              "en": "lift",
              "example": "Der Aufzug funktioniert nicht."
            },
            {
              "de": "der Hausmeister",
              "en": "caretaker",
              "example": "Rufen Sie den Hausmeister an."
            },
            {
              "de": "reparieren",
              "en": "repair",
              "example": "Können Sie das reparieren?"
            },
            {
              "de": "seit gestern",
              "en": "since yesterday",
              "example": "Seit gestern gibt es kein warmes Wasser."
            }
          ],
          "examples": [
            "In meiner Wohnung gibt es kein warmes Wasser.",
            "Können Sie bitte jemanden schicken?",
            "Sie erreichen mich unter 0176 ..."
          ],
          "usefulPhrases": [
            "Entschuldigung, ich habe ein Problem.",
            "Können Sie mir bitte helfen?",
            "Wann kommt der Hausmeister?"
          ],
          "realLifeTask": "Call or message a landlord about one realistic problem.",
          "examFocus": [
            "Writing: reason, exact problem, request, contact",
            "Speaking: use a polite request and react"
          ],
          "commonMistakes": [
            "No greeting or closing",
            "Using only nouns without a complete request"
          ],
          "quiz": [
            {
              "q": "Polite request:",
              "options": [
                "Können Sie bitte helfen?",
                "Du helfen jetzt.",
                "Hilfe machen.",
                "Ich will Reparatur."
              ],
              "answer": "Können Sie bitte helfen?",
              "explanation": "Können Sie bitte is an effective A1 request."
            }
          ],
          "writingTask": {
            "title": "Message to landlord",
            "instruction": "Write about 30 words: why you write, what is broken, request repair and give a contact time.",
            "modelAnswer": "Guten Tag Herr Klein, seit gestern ist die Heizung in meiner Wohnung kaputt. Es ist sehr kalt. Können Sie bitte den Hausmeister schicken? Ab 17 Uhr bin ich zu Hause. Freundliche Grüße, Ajeet Chouksey",
            "examPart": "Schreiben Teil 2",
            "timeMinutes": 8,
            "checklist": [
              "Greeting",
              "All requested points",
              "Closing",
              "About 30 words"
            ]
          }
        }
      ]
    },
    {
      "id": "a1-m05",
      "title": "Food, Drink and Restaurants",
      "icon": "🍽️",
      "syllabusTheme": "Goethe Wortliste: Essen/Trinken",
      "lessons": [
        {
          "id": "a1-08",
          "title": "Food and Meals",
          "examMapping": [
            "Hören Teil 1",
            "Sprechen Teil 2"
          ],
          "objectives": [
            "Name common foods and meals",
            "Understand orders and restaurant choices"
          ],
          "grammar": [
            "möchten",
            "gern / nicht gern",
            "accusative einen/eine/ein",
            "Negation: kein + noun — Ich habe keinen Hunger. Ich esse kein Fleisch.",
            "Plural of food nouns: das Brötchen → die Brötchen (no change); die Tomate → die Tomaten; der Apfel → die Äpfel",
            "Quantity: ein Glas Wasser, eine Tasse Kaffee, ein Stück Kuchen, 200 g Käse"
          ],
          "vocab": [
            {
              "de": "das Frühstück",
              "en": "breakfast",
              "example": "Zum Frühstück esse ich Brot."
            },
            {
              "de": "das Getränk",
              "en": "drink",
              "example": "Welches Getränk möchten Sie?"
            },
            {
              "de": "bestellen",
              "en": "order",
              "example": "Ich möchte bestellen."
            },
            {
              "de": "die Rechnung",
              "en": "bill",
              "example": "Die Rechnung, bitte."
            },
            {
              "de": "vegetarisch",
              "en": "vegetarian",
              "example": "Haben Sie etwas Vegetarisches?"
            }
          ],
          "examples": [
            "Ich möchte einen Kaffee und ein Brötchen.",
            "Ich esse gern Gemüse, aber kein Fleisch.",
            "Für mich bitte die Suppe."
          ],
          "usefulPhrases": [
            "Was möchten Sie?",
            "Für mich bitte ...",
            "Noch etwas?",
            "Zahlen, bitte."
          ],
          "realLifeTask": "Order a full café meal in German.",
          "examFocus": [
            "Listen for what the person actually orders, not all foods mentioned",
            "Notice kein/nicht"
          ],
          "commonMistakes": [
            "Ich will Kaffee instead of Ich möchte einen Kaffee",
            "Choosing a distractor mentioned but rejected"
          ],
          "quiz": [
            {
              "q": "Polite order:",
              "options": [
                "Ich möchte einen Kaffee.",
                "Gib Kaffee.",
                "Ich will Kaffee jetzt.",
                "Kaffee machen."
              ],
              "answer": "Ich möchte einen Kaffee.",
              "explanation": "möchte is polite."
            },
            {
              "q": "The bill:",
              "options": [
                "die Rechnung",
                "die Bestellung",
                "das Frühstück",
                "der Preis"
              ],
              "answer": "die Rechnung",
              "explanation": "Ask: Die Rechnung, bitte."
            }
          ],
          "listeningTask": {
            "title": "Restaurant listening",
            "instruction": "Have a partner read three short orders including one rejected item. Identify the final food, drink and price.",
            "modelAnswer": "Example trap: “Keinen Tee, bitte. Ich nehme Kaffee.” The answer is coffee.",
            "examPart": "Hören Teil 1",
            "timeMinutes": 5,
            "checklist": [
              "Final choice captured",
              "Negation noticed",
              "Price correct"
            ]
          }
        },
        {
          "id": "a1-09",
          "title": "Shopping and Quantities",
          "examMapping": [
            "Hören Teil 3",
            "Sprechen Teil 3"
          ],
          "objectives": [
            "Buy groceries by quantity",
            "Ask price and payment method"
          ],
          "grammar": [
            "ein Kilo / 200 Gramm / eine Flasche",
            "Was kostet...?",
            "mit Karte / bar"
          ],
          "vocab": [
            {
              "de": "das Kilo",
              "en": "kilogram",
              "example": "Ein Kilo Äpfel, bitte."
            },
            {
              "de": "das Gramm",
              "en": "gram",
              "example": "200 Gramm Käse."
            },
            {
              "de": "die Flasche",
              "en": "bottle",
              "example": "Eine Flasche Wasser."
            },
            {
              "de": "bar",
              "en": "cash",
              "example": "Ich bezahle bar."
            },
            {
              "de": "die Kasse",
              "en": "checkout",
              "example": "Die Kasse ist dort."
            }
          ],
          "examples": [
            "Ich hätte gern ein Kilo Tomaten.",
            "Was kostet das zusammen?",
            "Kann ich mit Karte bezahlen?"
          ],
          "usefulPhrases": [
            "Sonst noch etwas?",
            "Das ist alles, danke.",
            "Brauchen Sie eine Tüte?"
          ],
          "realLifeTask": "Buy five grocery items and complete payment in German.",
          "examFocus": [
            "Listen for quantity plus product",
            "Respond naturally to Sonst noch etwas?"
          ],
          "commonMistakes": [
            "ein Kilo Äpfel versus ein Kilo von Äpfel",
            "Not checking total price"
          ],
          "quiz": [
            {
              "q": "200 ___ Käse",
              "options": [
                "Gramm",
                "Liter",
                "Flaschen",
                "Meter"
              ],
              "answer": "Gramm",
              "explanation": "Cheese can be ordered in grams."
            },
            {
              "q": "Pay by card:",
              "options": [
                "mit Karte bezahlen",
                "auf Karte kaufen",
                "Karte essen",
                "bei Karte zahlen"
              ],
              "answer": "mit Karte bezahlen",
              "explanation": "Standard phrase."
            }
          ],
          "speakingTask": {
            "title": "Request cards",
            "instruction": "Make requests using picture/object prompts: water, bag, pen, bread. Partner accepts or declines politely.",
            "modelAnswer": "Können Sie mir bitte eine Flasche Wasser geben? – Ja, gern.",
            "examPart": "Sprechen Teil 3",
            "timeMinutes": 5,
            "checklist": [
              "Request contains bitte",
              "Correct noun/article",
              "Partner reacts"
            ]
          }
        }
      ]
    },
    {
      "id": "a1-m06",
      "title": "Services and Public Offices",
      "icon": "🏛️",
      "syllabusTheme": "Goethe Wortliste: Dienstleistungen",
      "lessons": [
        {
          "id": "a1-10",
          "title": "Post, Bank and Registration",
          "examMapping": [
            "Lesen Teil 3",
            "Schreiben Teil 1"
          ],
          "objectives": [
            "Understand service notices",
            "Ask which documents are required"
          ],
          "grammar": [
            "müssen + infinitive",
            "nur mit + noun",
            "opening-time language"
          ],
          "vocab": [
            {
              "de": "der Ausweis",
              "en": "ID card",
              "example": "Bringen Sie Ihren Ausweis mit."
            },
            {
              "de": "das Formular",
              "en": "form",
              "example": "Füllen Sie das Formular aus."
            },
            {
              "de": "die Öffnungszeiten",
              "en": "opening hours",
              "example": "Beachten Sie die Öffnungszeiten."
            },
            {
              "de": "der Schalter",
              "en": "counter",
              "example": "Schalter 3 ist geöffnet."
            },
            {
              "de": "die Briefmarke",
              "en": "stamp",
              "example": "Ich brauche eine Briefmarke."
            }
          ],
          "examples": [
            "Besuch nur mit Termin.",
            "Mittwochs bleibt das Büro geschlossen.",
            "Sie müssen Ihren Pass mitbringen."
          ],
          "usefulPhrases": [
            "Welche Dokumente brauche ich?",
            "Brauche ich einen Termin?",
            "Wo ist Schalter drei?"
          ],
          "realLifeTask": "Handle a short interaction at a post office or Bürgerbüro.",
          "examFocus": [
            "Signs often test open/closed and exceptions",
            "Check nur, kein, außer and ab"
          ],
          "commonMistakes": [
            "Ignoring nur mit Termin",
            "Confusing geöffnet and geschlossen"
          ],
          "quiz": [
            {
              "q": "nur mit Termin means:",
              "options": [
                "appointment required",
                "no appointment",
                "open daily",
                "free service"
              ],
              "answer": "appointment required",
              "explanation": "Entry is only with an appointment."
            },
            {
              "q": "Bring your ID:",
              "options": [
                "Bringen Sie Ihren Ausweis mit.",
                "Ausweis geht.",
                "Machen Sie Ausweis.",
                "Der Ausweis wohnt."
              ],
              "answer": "Bringen Sie Ihren Ausweis mit.",
              "explanation": "mitbringen is separable."
            }
          ],
          "readingTask": {
            "title": "Notice set",
            "instruction": "Read five original signs for post office, bank and Bürgerbüro. Decide true/false for a practical statement about each.",
            "modelAnswer": "Check the exact day, time and restriction before answering.",
            "examPart": "Lesen Teil 3",
            "timeMinutes": 5,
            "checklist": [
              "Five items completed",
              "Negation underlined",
              "Exceptions checked"
            ]
          }
        }
      ]
    },
    {
      "id": "a1-m07",
      "title": "Work, Education and German Course",
      "icon": "💼",
      "syllabusTheme": "Goethe Wortliste: Arbeit/Beruf; Erziehung/Ausbildung/Lernen",
      "lessons": [
        {
          "id": "a1-11",
          "title": "Work and Workplace",
          "examMapping": [
            "Lesen Teil 1",
            "Sprechen Teil 2"
          ],
          "objectives": [
            "Describe workplace and schedule",
            "Understand a short colleague message"
          ],
          "grammar": [
            "present tense",
            "von...bis",
            "modal müssen"
          ],
          "vocab": [
            {
              "de": "die Arbeit",
              "en": "work",
              "example": "Ich fahre zur Arbeit."
            },
            {
              "de": "der Kollege",
              "en": "colleague",
              "example": "Mein Kollege heißt Samir."
            },
            {
              "de": "die Pause",
              "en": "break",
              "example": "Die Pause ist um zwölf."
            },
            {
              "de": "Urlaub haben",
              "en": "be on holiday",
              "example": "Ich habe nächste Woche Urlaub."
            },
            {
              "de": "anfangen",
              "en": "start",
              "example": "Die Arbeit fängt um acht Uhr an."
            }
          ],
          "examples": [
            "Ich arbeite von Montag bis Freitag.",
            "Heute muss ich länger arbeiten.",
            "Bitte rufen Sie den Kunden an."
          ],
          "usefulPhrases": [
            "Wann fangen Sie an?",
            "Wo arbeiten Sie?",
            "Wann haben Sie Pause?"
          ],
          "realLifeTask": "Explain your workday and ask a colleague about theirs.",
          "examFocus": [
            "Short messages contain a purpose and required action",
            "Track who must do what and when"
          ],
          "commonMistakes": [
            "Missing separable prefix: fängt ... an",
            "Assuming a mentioned time is the meeting time"
          ],
          "quiz": [
            {
              "q": "The work starts at eight:",
              "options": [
                "Die Arbeit fängt um acht an.",
                "Die Arbeit anfangen acht.",
                "Um acht Arbeit.",
                "Die Arbeit ist Anfang."
              ],
              "answer": "Die Arbeit fängt um acht an.",
              "explanation": "anfangen is separable."
            }
          ],
          "readingTask": {
            "title": "Colleague messages",
            "instruction": "Read two short messages and answer five true/false statements about time, place, reason and required action.",
            "modelAnswer": "Mark sender, receiver, action and deadline in each message.",
            "examPart": "Lesen Teil 1",
            "timeMinutes": 5,
            "checklist": [
              "Sender/receiver clear",
              "Action found",
              "Time found"
            ]
          }
        },
        {
          "id": "a1-12",
          "title": "Course, School and Learning",
          "examMapping": [
            "Schreiben Teil 2",
            "Lesen Teil 2"
          ],
          "objectives": [
            "Ask about a course",
            "Write an absence message and ask for homework"
          ],
          "grammar": [
            "können for request",
            "weil optional; simple reason as second sentence",
            "course dates and levels"
          ],
          "vocab": [
            {
              "de": "der Deutschkurs",
              "en": "German course",
              "example": "Der Deutschkurs beginnt im September."
            },
            {
              "de": "die Hausaufgabe",
              "en": "homework",
              "example": "Welche Hausaufgaben haben wir?"
            },
            {
              "de": "sich anmelden",
              "en": "register",
              "example": "Ich möchte mich anmelden."
            },
            {
              "de": "der Unterricht",
              "en": "class",
              "example": "Der Unterricht beginnt um 18 Uhr."
            },
            {
              "de": "fehlen",
              "en": "be absent",
              "example": "Ich fehle morgen."
            }
          ],
          "examples": [
            "Leider kann ich morgen nicht zum Kurs kommen.",
            "Ich bin krank. Welche Hausaufgaben haben wir?",
            "Wann beginnt der nächste A1-Kurs?"
          ],
          "usefulPhrases": [
            "Wie viel kostet der Kurs?",
            "An welchen Tagen ist Unterricht?",
            "Gibt es noch freie Plätze?"
          ],
          "realLifeTask": "Ask a real language school for course details in German.",
          "examFocus": [
            "Cover the three requested points in order",
            "Keep sentences simple and understandable"
          ],
          "commonMistakes": [
            "Omitting the homework question",
            "No greeting or closing"
          ],
          "quiz": [
            {
              "q": "Ask about homework:",
              "options": [
                "Welche Hausaufgaben haben wir?",
                "Wo Hausaufgabe?",
                "Hausaufgabe machen Sie.",
                "Ich Hausaufgabe?"
              ],
              "answer": "Welche Hausaufgaben haben wir?",
              "explanation": "Complete W-question."
            }
          ],
          "writingTask": {
            "title": "Course absence email",
            "instruction": "Write about 30 words: apologise, give a reason, ask for homework, say when you return.",
            "modelAnswer": "Guten Tag Frau Berger, leider kann ich morgen nicht zum Deutschkurs kommen. Ich bin krank. Welche Hausaufgaben haben wir? Am Donnerstag komme ich wieder. Vielen Dank. Freundliche Grüße, Ajeet Chouksey",
            "examPart": "Schreiben Teil 2",
            "timeMinutes": 8,
            "checklist": [
              "Greeting and closing",
              "All three content points",
              "Readable simple sentences"
            ]
          }
        }
      ]
    },
    {
      "id": "a1-m08",
      "title": "Travel, Transport and Accommodation",
      "icon": "🚆",
      "syllabusTheme": "Goethe Wortliste: Reisen/Verkehr",
      "lessons": [
        {
          "id": "a1-13",
          "title": "Station Announcements and Tickets",
          "examMapping": [
            "Hören Teil 2",
            "Hören Teil 3"
          ],
          "objectives": [
            "Understand destination, platform, delay and departure",
            "Buy a simple ticket"
          ],
          "grammar": [
            "nach + city",
            "von...nach",
            "abfahren/ankommen"
          ],
          "vocab": [
            {
              "de": "das Gleis",
              "en": "platform/track",
              "example": "Der Zug fährt von Gleis 8."
            },
            {
              "de": "die Verspätung",
              "en": "delay",
              "example": "Der Zug hat zehn Minuten Verspätung."
            },
            {
              "de": "umsteigen",
              "en": "change trains",
              "example": "Sie müssen in Köln umsteigen."
            },
            {
              "de": "die Fahrkarte",
              "en": "ticket",
              "example": "Eine Fahrkarte nach Mainz."
            },
            {
              "de": "ankommen",
              "en": "arrive",
              "example": "Wann kommt der Zug an?"
            }
          ],
          "examples": [
            "Der Zug nach Berlin fährt heute von Gleis zwölf.",
            "Die Ankunft ist um 16:45 Uhr.",
            "Der Zug fällt heute aus."
          ],
          "usefulPhrases": [
            "Wann fährt der nächste Zug?",
            "Von welchem Gleis?",
            "Muss ich umsteigen?"
          ],
          "realLifeTask": "Buy a ticket and verify platform and departure time.",
          "examFocus": [
            "Part 2 announcements are heard once",
            "Listen for changes introduced by heute, leider, nicht, statt",
            "Write four anchors: destination, time, platform, delay"
          ],
          "commonMistakes": [
            "Selecting the originally scheduled platform instead of changed platform",
            "Confusing Abfahrt and Ankunft"
          ],
          "quiz": [
            {
              "q": "Gleis means:",
              "options": [
                "platform/track",
                "ticket",
                "delay",
                "hotel"
              ],
              "answer": "platform/track",
              "explanation": "At a station, Gleis is the track/platform."
            },
            {
              "q": "The train is cancelled:",
              "options": [
                "Der Zug fällt aus.",
                "Der Zug kommt an.",
                "Der Zug steigt um.",
                "Der Zug bezahlt."
              ],
              "answer": "Der Zug fällt aus.",
              "explanation": "ausfallen means cancellation."
            }
          ],
          "listeningTask": {
            "title": "One-play announcement drill",
            "instruction": "Read each original announcement once only. Decide true/false, focusing on a changed platform, cancellation, delay or destination.",
            "modelAnswer": "Signal words such as Achtung, heute, leider, statt and nicht often carry the tested information.",
            "examPart": "Hören Teil 2",
            "timeMinutes": 6,
            "checklist": [
              "Only one play used",
              "Signal word noticed",
              "Correct true/false decision"
            ]
          }
        },
        {
          "id": "a1-14",
          "title": "Directions and Hotel",
          "examMapping": [
            "Sprechen Teil 2",
            "Lesen Teil 2"
          ],
          "objectives": [
            "Ask for and give simple directions",
            "Understand hotel information"
          ],
          "grammar": [
            "imperative formal: Gehen Sie",
            "zum/zur",
            "links/rechts/geradeaus"
          ],
          "vocab": [
            {
              "de": "geradeaus",
              "en": "straight ahead",
              "example": "Gehen Sie geradeaus."
            },
            {
              "de": "die Ampel",
              "en": "traffic light",
              "example": "An der Ampel links."
            },
            {
              "de": "die Kreuzung",
              "en": "intersection",
              "example": "An der Kreuzung rechts."
            },
            {
              "de": "das Einzelzimmer",
              "en": "single room",
              "example": "Ich brauche ein Einzelzimmer."
            },
            {
              "de": "das Frühstück",
              "en": "breakfast",
              "example": "Ist Frühstück inklusive?"
            }
          ],
          "examples": [
            "Gehen Sie bis zur Ampel und dann links.",
            "Das Hotel ist gegenüber vom Bahnhof.",
            "Ich möchte ein Doppelzimmer für zwei Nächte."
          ],
          "usefulPhrases": [
            "Wie komme ich zum Hotel?",
            "Ist das weit?",
            "Haben Sie ein freies Zimmer?"
          ],
          "realLifeTask": "Ask for a route from a station to a real destination.",
          "examFocus": [
            "Prompt-card question must match theme",
            "For web ads, check dates, room type, price and breakfast"
          ],
          "commonMistakes": [
            "nach dem Bahnhof instead of zum Bahnhof",
            "Choosing hotel on price but wrong date"
          ],
          "quiz": [
            {
              "q": "straight ahead:",
              "options": [
                "geradeaus",
                "links",
                "rechts",
                "zurück"
              ],
              "answer": "geradeaus",
              "explanation": "geradeaus is straight ahead."
            },
            {
              "q": "to the station:",
              "options": [
                "zum Bahnhof",
                "nach Bahnhof",
                "in Bahnhof",
                "bei Bahnhof"
              ],
              "answer": "zum Bahnhof",
              "explanation": "Use zu + dem for a place."
            }
          ],
          "speakingTask": {
            "title": "Directions prompt cards",
            "instruction": "Ask and answer with Bahnhof, Apotheke, Hotel and Bushaltestelle. Give at least three route steps.",
            "modelAnswer": "Wie komme ich zur Apotheke? – Gehen Sie geradeaus bis zur Ampel. Dann rechts.",
            "examPart": "Sprechen Teil 2",
            "timeMinutes": 5,
            "checklist": [
              "Complete question",
              "Three route steps",
              "Correct direction words"
            ]
          }
        }
      ]
    },
    {
      "id": "a1-m09",
      "title": "Shopping, Clothing and Everyday Goods",
      "icon": "🛍️",
      "syllabusTheme": "Goethe Wortliste: Einkaufen/Gebrauchsartikel",
      "lessons": [
        {
          "id": "a1-15",
          "title": "Clothes, Size and Exchange",
          "examMapping": [
            "Hören Teil 1",
            "Lesen Teil 2"
          ],
          "objectives": [
            "Ask for size, colour and price",
            "Understand a simple shop advertisement"
          ],
          "grammar": [
            "dieser/diese/dieses as chunks",
            "adjectives after sein",
            "accusative articles",
            "Negation with kein: Ich habe keine Größe 40. Das ist kein gutes Angebot.",
            "Plural clothing nouns: der Schuh → die Schuhe; die Hose → die Hosen; das Hemd → die Hemden; die Jacke → die Jacken",
            "Separable verb: anprobieren — Kann ich die Jacke anprobieren? Ich probiere sie an.",
            "Price question: Was kostet …? / Wie viel kostet …? / Das ist zu teuer / zu billig."
          ],
          "vocab": [
            {
              "de": "die Größe",
              "en": "size",
              "example": "Welche Größe brauchen Sie?"
            },
            {
              "de": "anprobieren",
              "en": "try on",
              "example": "Kann ich die Jacke anprobieren?"
            },
            {
              "de": "passen",
              "en": "fit",
              "example": "Die Hose passt nicht."
            },
            {
              "de": "günstig",
              "en": "inexpensive",
              "example": "Die Schuhe sind günstig."
            },
            {
              "de": "umtauschen",
              "en": "exchange",
              "example": "Ich möchte das Hemd umtauschen."
            }
          ],
          "examples": [
            "Haben Sie diese Jacke in Größe M?",
            "Die Schuhe sind zu klein.",
            "Kann ich das umtauschen?"
          ],
          "usefulPhrases": [
            "Was kostet die Jacke?",
            "Wo ist die Umkleidekabine?",
            "Haben Sie das in Blau?"
          ],
          "realLifeTask": "Ask for one item, size, colour and exchange condition in a shop.",
          "examFocus": [
            "Prices and sizes are common listening targets",
            "Read all ad restrictions: only today, from, reduced"
          ],
          "commonMistakes": [
            "Confusing groß with Größe",
            "Missing that an offer starts next week"
          ],
          "quiz": [
            {
              "q": "try on:",
              "options": [
                "anprobieren",
                "bezahlen",
                "umsteigen",
                "ausfüllen"
              ],
              "answer": "anprobieren",
              "explanation": "Clothes are anprobieren."
            },
            {
              "q": "The trousers do not fit:",
              "options": [
                "Die Hose passt nicht.",
                "Die Hose fährt nicht.",
                "Die Hose kostet nicht.",
                "Die Hose lernt nicht."
              ],
              "answer": "Die Hose passt nicht.",
              "explanation": "passen means fit/suit."
            }
          ],
          "readingTask": {
            "title": "Advertisement match",
            "instruction": "Compare two clothing offers for item, size, price and sale date. Choose the source satisfying the full situation.",
            "modelAnswer": "Create a four-point checklist before choosing.",
            "examPart": "Lesen Teil 2",
            "timeMinutes": 4,
            "checklist": [
              "Item correct",
              "Size available",
              "Budget met",
              "Date valid"
            ]
          }
        }
      ]
    },
    {
      "id": "a1-m10",
      "title": "Health and Appointments",
      "icon": "🩺",
      "syllabusTheme": "Everyday A1 communication: health and appointments",
      "lessons": [
        {
          "id": "a1-16",
          "title": "Doctor and Pharmacy",
          "examMapping": [
            "Hören Teil 3",
            "Sprechen Teil 3"
          ],
          "objectives": [
            "Describe basic symptoms and duration",
            "Understand dosage and appointment time"
          ],
          "grammar": [
            "haben + symptom",
            "tut weh",
            "seit + dative time"
          ],
          "vocab": [
            {
              "de": "die Kopfschmerzen",
              "en": "headache",
              "example": "Ich habe Kopfschmerzen."
            },
            {
              "de": "das Fieber",
              "en": "fever",
              "example": "Ich habe Fieber."
            },
            {
              "de": "der Husten",
              "en": "cough",
              "example": "Seit drei Tagen habe ich Husten."
            },
            {
              "de": "die Tablette",
              "en": "tablet",
              "example": "Nehmen Sie eine Tablette."
            },
            {
              "de": "zweimal täglich",
              "en": "twice daily",
              "example": "Nehmen Sie das zweimal täglich."
            }
          ],
          "examples": [
            "Mein Rücken tut weh.",
            "Ich brauche einen Termin beim Arzt.",
            "Wie oft soll ich das Medikament nehmen?"
          ],
          "usefulPhrases": [
            "Seit wann haben Sie Schmerzen?",
            "Wo tut es weh?",
            "Können Sie mir bitte helfen?"
          ],
          "realLifeTask": "Describe a symptom, duration and request to a doctor or pharmacist.",
          "examFocus": [
            "Listen for frequency and appointment time",
            "If a number is repeated in the options, identify what it refers to"
          ],
          "commonMistakes": [
            "Ich bin Kopfschmerzen instead of Ich habe",
            "seit zwei Tage instead of seit zwei Tagen"
          ],
          "quiz": [
            {
              "q": "I have a headache:",
              "options": [
                "Ich habe Kopfschmerzen.",
                "Ich bin Kopfschmerzen.",
                "Ich mache Kopf.",
                "Kopf ist ich."
              ],
              "answer": "Ich habe Kopfschmerzen.",
              "explanation": "Use haben with symptoms."
            },
            {
              "q": "twice daily:",
              "options": [
                "zweimal täglich",
                "zwei Tage",
                "am zweiten",
                "doppelt Woche"
              ],
              "answer": "zweimal täglich",
              "explanation": "Frequency phrase."
            }
          ],
          "speakingTask": {
            "title": "Pharmacy request",
            "instruction": "Use picture prompts to request medicine, water or help. React naturally to your partner.",
            "modelAnswer": "Können Sie mir bitte etwas gegen Kopfschmerzen geben? – Ja, natürlich.",
            "examPart": "Sprechen Teil 3",
            "timeMinutes": 5,
            "checklist": [
              "Polite request",
              "Reason stated",
              "Reaction given"
            ]
          }
        }
      ]
    },
    {
      "id": "a1-m11",
      "title": "Leisure, Weather and Plans",
      "icon": "⚽",
      "syllabusTheme": "Goethe Wortliste: Freizeit/Unterhaltung; Umwelt",
      "lessons": [
        {
          "id": "a1-17",
          "title": "Hobbies, Invitations and Weather",
          "examMapping": [
            "Sprechen Teil 2",
            "Schreiben Teil 2"
          ],
          "objectives": [
            "Talk about hobbies and weekend plans",
            "Invite, accept or decline"
          ],
          "grammar": [
            "gern / lieber / am liebsten",
            "können",
            "am + day"
          ],
          "vocab": [
            {
              "de": "die Freizeit",
              "en": "free time",
              "example": "In meiner Freizeit lese ich."
            },
            {
              "de": "wandern",
              "en": "hike",
              "example": "Am Sonntag wandern wir."
            },
            {
              "de": "das Wetter",
              "en": "weather",
              "example": "Wie ist das Wetter?"
            },
            {
              "de": "die Einladung",
              "en": "invitation",
              "example": "Danke für die Einladung."
            },
            {
              "de": "mitbringen",
              "en": "bring along",
              "example": "Bitte bring einen Salat mit."
            }
          ],
          "examples": [
            "Am Wochenende fahre ich gern Fahrrad.",
            "Leider kann ich am Samstag nicht kommen.",
            "Können wir uns am Sonntag treffen?"
          ],
          "usefulPhrases": [
            "Was machen Sie in Ihrer Freizeit?",
            "Kommst du zu meiner Party?",
            "Was soll ich mitbringen?"
          ],
          "realLifeTask": "Invite someone, give date/place and ask them to bring something.",
          "examFocus": [
            "Writing: why, when/where, request/question",
            "Speaking: accept or decline and react"
          ],
          "commonMistakes": [
            "No alternative after declining",
            "Using um with a weekday"
          ],
          "quiz": [
            {
              "q": "Ask about hobbies:",
              "options": [
                "Was machen Sie in Ihrer Freizeit?",
                "Wo Freizeit Sie?",
                "Sind Sie Hobby?",
                "Wie kostet Hobby?"
              ],
              "answer": "Was machen Sie in Ihrer Freizeit?",
              "explanation": "Correct W-question."
            },
            {
              "q": "Thank for invitation:",
              "options": [
                "Danke für die Einladung.",
                "Danke von Einladung.",
                "Einladung bitte.",
                "Ich danke Party."
              ],
              "answer": "Danke für die Einladung.",
              "explanation": "Fixed phrase."
            }
          ],
          "writingTask": {
            "title": "Invitation message",
            "instruction": "Write about 30 words: reason for celebration, date/time/place, and what the guest should bring.",
            "modelAnswer": "Liebe Anna, am Samstag feiere ich meinen Geburtstag. Die Party beginnt um 18 Uhr bei mir zu Hause. Kannst du bitte einen Salat mitbringen? Liebe Grüße, Ajeet",
            "examPart": "Schreiben Teil 2",
            "timeMinutes": 8,
            "checklist": [
              "Greeting",
              "Three content points",
              "Closing",
              "Clear day/time/place"
            ]
          }
        }
      ]
    },
    {
      "id": "a1-m12",
      "title": "Exam Skills Lab",
      "icon": "🎯",
      "syllabusTheme": "Exact Goethe A1 task-type practice",
      "lessons": [
        {
          "id": "a1-18",
          "title": "Hören: Three-Part Strategy",
          "examMapping": [
            "Hören Teil 1",
            "Hören Teil 2",
            "Hören Teil 3"
          ],
          "objectives": [
            "Apply the correct strategy to each listening part",
            "Recognise distractors, corrections and negation"
          ],
          "grammar": [
            "question words as prediction tools",
            "numbers/time vocabulary",
            "negation and correction signals"
          ],
          "vocab": [
            {
              "de": "ankreuzen",
              "en": "tick/select",
              "example": "Kreuzen Sie die richtige Antwort an."
            },
            {
              "de": "richtig",
              "en": "true/correct",
              "example": "Ist die Aussage richtig?"
            },
            {
              "de": "falsch",
              "en": "false",
              "example": "Die Aussage ist falsch."
            },
            {
              "de": "zweimal",
              "en": "twice",
              "example": "Sie hören den Text zweimal."
            },
            {
              "de": "einmal",
              "en": "once",
              "example": "Sie hören den Text einmal."
            }
          ],
          "examples": [
            "Read the task before the recording starts.",
            "In Part 2, decide true or false after one hearing.",
            "In Parts 1 and 3, verify on the second hearing."
          ],
          "usefulPhrases": [
            "Was ist richtig?",
            "Welche Information ist wichtig?",
            "Wurde die Aussage korrigiert?"
          ],
          "realLifeTask": "Complete a 15-item original listening mock under 20 minutes.",
          "examFocus": [
            "Part 1: identify concrete detail",
            "Part 2: public announcements, one play",
            "Part 3: identify intention or key information"
          ],
          "commonMistakes": [
            "Choosing the first number heard before a correction",
            "Missing leider, nicht, heute or statt"
          ],
          "quiz": [
            {
              "q": "Which part is heard once?",
              "options": [
                "Hören Teil 2",
                "Hören Teil 1",
                "Hören Teil 3",
                "All parts twice"
              ],
              "answer": "Hören Teil 2",
              "explanation": "Official online model shows Part 2 items once."
            },
            {
              "q": "Best first action:",
              "options": [
                "Read question/options",
                "Close eyes",
                "Translate every option into English aloud",
                "Wait without reading"
              ],
              "answer": "Read question/options",
              "explanation": "Prediction reduces listening load."
            }
          ],
          "listeningTask": {
            "title": "20-minute listening simulation",
            "instruction": "Create 15 original items in the official three-part pattern: 6 multiple choice, 4 true/false announcements, 5 multiple choice. Use one play for Part 2 and two plays for Parts 1 and 3.",
            "modelAnswer": "Score by part and categorise every error: number/time, negation, place, intention or distractor.",
            "examPart": "Full Hören",
            "timeMinutes": 20,
            "checklist": [
              "6 Part 1 items",
              "4 Part 2 items",
              "5 Part 3 items",
              "Error log completed"
            ]
          }
        },
        {
          "id": "a1-19",
          "title": "Lesen: Three-Part Strategy",
          "examMapping": [
            "Lesen Teil 1",
            "Lesen Teil 2",
            "Lesen Teil 3"
          ],
          "objectives": [
            "Complete all 15 reading items in 25 minutes",
            "Match full situation requirements"
          ],
          "grammar": [
            "negation words",
            "time/date expressions",
            "purpose and action verbs"
          ],
          "vocab": [
            {
              "de": "der Hinweis",
              "en": "notice",
              "example": "Lesen Sie den Hinweis."
            },
            {
              "de": "die Anzeige",
              "en": "advertisement",
              "example": "Welche Anzeige passt?"
            },
            {
              "de": "die Nachricht",
              "en": "message",
              "example": "Lesen Sie die Nachricht."
            },
            {
              "de": "zuordnen",
              "en": "match/assign",
              "example": "Ordnen Sie zu."
            },
            {
              "de": "markieren",
              "en": "mark",
              "example": "Markieren Sie die Antwort."
            }
          ],
          "examples": [
            "Part 1 uses short personal messages.",
            "Part 2 asks where you can find information.",
            "Part 3 uses practical signs and notices."
          ],
          "usefulPhrases": [
            "Wer schreibt?",
            "Was muss die Person tun?",
            "Welche Quelle passt vollständig?"
          ],
          "realLifeTask": "Complete a 15-item original reading mock in 25 minutes.",
          "examFocus": [
            "Budget roughly 8 minutes per part",
            "Do not translate every word",
            "Verify every condition before choosing"
          ],
          "commonMistakes": [
            "Answering from world knowledge instead of text",
            "Missing a negative or exception"
          ],
          "quiz": [
            {
              "q": "Reading Part 2 mainly tests:",
              "options": [
                "matching situations to information sources",
                "spelling names",
                "speaking requests",
                "writing a letter"
              ],
              "answer": "matching situations to information sources",
              "explanation": "Choose the source satisfying the situation."
            },
            {
              "q": "Key danger words:",
              "options": [
                "nicht, kein, nur",
                "und, oder",
                "ich, du",
                "der, die"
              ],
              "answer": "nicht, kein, nur",
              "explanation": "They can reverse or restrict meaning."
            }
          ],
          "readingTask": {
            "title": "25-minute reading simulation",
            "instruction": "Use 5 true/false items from messages, 5 source-matching items and 5 true/false items from signs/notices.",
            "modelAnswer": "After scoring, explain the evidence phrase for every answer.",
            "examPart": "Full Lesen",
            "timeMinutes": 25,
            "checklist": [
              "15 items complete",
              "Evidence underlined",
              "No unanswered item"
            ]
          }
        },
        {
          "id": "a1-20",
          "title": "Schreiben: Form and 30-Word Message",
          "examMapping": [
            "Schreiben Teil 1",
            "Schreiben Teil 2"
          ],
          "objectives": [
            "Complete five form fields",
            "Write a coherent short message covering all prompts"
          ],
          "grammar": [
            "simple main clauses",
            "formal/informal greeting and closing",
            "verb position 2"
          ],
          "vocab": [
            {
              "de": "die Anrede",
              "en": "greeting",
              "example": "Schreiben Sie eine Anrede."
            },
            {
              "de": "der Gruß",
              "en": "closing",
              "example": "Vergessen Sie den Gruß nicht."
            },
            {
              "de": "der Inhaltspunkt",
              "en": "content point",
              "example": "Beantworten Sie alle Inhaltspunkte."
            },
            {
              "de": "verständlich",
              "en": "understandable",
              "example": "Der Text ist verständlich."
            },
            {
              "de": "fehlen",
              "en": "be missing",
              "example": "Ein Punkt fehlt."
            }
          ],
          "examples": [
            "One sentence per content point is enough.",
            "A clear simple sentence scores better than a broken complex sentence.",
            "Check names, numbers and dates carefully."
          ],
          "usefulPhrases": [
            "Sehr geehrte Frau ...",
            "Liebe Anna,",
            "Mit freundlichen Grüßen",
            "Liebe Grüße"
          ],
          "realLifeTask": "Write a message you could genuinely send today.",
          "examFocus": [
            "Part 1 demands exact transfer",
            "Part 2: three points plus greeting and closing",
            "Communicative clarity is more important than advanced grammar"
          ],
          "commonMistakes": [
            "Writing a general text but missing one prompt",
            "Mixing du and Sie",
            "No closing"
          ],
          "quiz": [
            {
              "q": "Required in Part 2:",
              "options": [
                "All prompt points plus greeting and closing",
                "Exactly 100 words",
                "Advanced subordinate clauses",
                "A title only"
              ],
              "answer": "All prompt points plus greeting and closing",
              "explanation": "Coverage and text-type conventions matter."
            },
            {
              "q": "Recommended length:",
              "options": [
                "about 30 words",
                "300 words",
                "5 words",
                "one page"
              ],
              "answer": "about 30 words",
              "explanation": "The official model gives about 30 words."
            }
          ],
          "writingTask": {
            "title": "20-minute writing simulation",
            "instruction": "Part 1: complete five fields from a source scenario. Part 2: write about 30 words covering three prompts, greeting and closing.",
            "modelAnswer": "Allocate about 7 minutes to the form, 11 minutes to the message and 2 minutes to checking.",
            "examPart": "Full Schreiben",
            "timeMinutes": 20,
            "checklist": [
              "Five form entries",
              "Three content points",
              "Greeting and closing",
              "Final check"
            ]
          }
        },
        {
          "id": "a1-21",
          "title": "Sprechen: Three-Part Performance",
          "examMapping": [
            "Sprechen Teil 1",
            "Sprechen Teil 2",
            "Sprechen Teil 3"
          ],
          "objectives": [
            "Perform all speaking parts smoothly",
            "Use repair phrases instead of switching language"
          ],
          "grammar": [
            "W-question order",
            "yes/no question order",
            "polite request with bitte"
          ],
          "vocab": [
            {
              "de": "sich vorstellen",
              "en": "introduce oneself",
              "example": "Stellen Sie sich bitte vor."
            },
            {
              "de": "um Information bitten",
              "en": "ask for information",
              "example": "Bitten Sie um Informationen."
            },
            {
              "de": "eine Bitte formulieren",
              "en": "make a request",
              "example": "Formulieren Sie eine Bitte."
            },
            {
              "de": "reagieren",
              "en": "react",
              "example": "Reagieren Sie auf die Bitte."
            },
            {
              "de": "wiederholen",
              "en": "repeat",
              "example": "Können Sie das wiederholen?"
            }
          ],
          "examples": [
            "Wo kaufen Sie Lebensmittel?",
            "Haben Sie am Sonntag Zeit?",
            "Können Sie mir bitte den Stift geben? – Ja, gern."
          ],
          "usefulPhrases": [
            "Wie bitte?",
            "Noch einmal, bitte.",
            "Bitte sprechen Sie langsamer.",
            "Ja, natürlich.",
            "Tut mir leid, das geht nicht."
          ],
          "realLifeTask": "Complete one full speaking mock with a partner and video record it.",
          "examFocus": [
            "Part 1: automatic identity script but natural delivery",
            "Part 2: question must match card topic",
            "Part 3: request plus reaction"
          ],
          "commonMistakes": [
            "Answering without asking in Part 2",
            "Making a statement instead of a request",
            "No reaction to partner"
          ],
          "quiz": [
            {
              "q": "Part 3 requires:",
              "options": [
                "request and reaction",
                "long presentation",
                "form filling",
                "reading ads"
              ],
              "answer": "request and reaction",
              "explanation": "Formulate a request and respond."
            },
            {
              "q": "Repair phrase:",
              "options": [
                "Noch einmal, bitte.",
                "Ich keine.",
                "Deutsch aus.",
                "Frage kaputt."
              ],
              "answer": "Noch einmal, bitte.",
              "explanation": "A valid way to request repetition."
            }
          ],
          "speakingTask": {
            "title": "15-minute group simulation",
            "instruction": "Part 1 introduction; Part 2 prompt-card questions and answers; Part 3 request cards and reactions. Record and review.",
            "modelAnswer": "Aim for clear, short, responsive communication. Do not memorise unrelated speeches.",
            "examPart": "Full Sprechen",
            "timeMinutes": 15,
            "checklist": [
              "Identity points complete",
              "At least four prompt questions",
              "At least four requests/reactions",
              "Repair phrase used naturally"
            ]
          }
        }
      ]
    },
    {
      "id": "a1-m13",
      "title": "Mock Exam and Readiness",
      "icon": "🏁",
      "syllabusTheme": "Integrated Goethe-Zertifikat A1 preparation",
      "lessons": [
        {
          "id": "a1-22",
          "title": "Full Mock and Error Log",
          "examMapping": [
            "Full exam"
          ],
          "objectives": [
            "Simulate the exam under realistic timing",
            "Turn mistakes into a targeted revision plan"
          ],
          "grammar": [
            "review only weak points",
            "accuracy before complexity"
          ],
          "vocab": [
            {
              "de": "die Prüfung",
              "en": "exam",
              "example": "Die Prüfung dauert ..."
            },
            {
              "de": "die Punktzahl",
              "en": "score",
              "example": "Meine Punktzahl ist ..."
            },
            {
              "de": "bestehen",
              "en": "pass",
              "example": "Ich möchte die Prüfung bestehen."
            },
            {
              "de": "der Fehler",
              "en": "mistake",
              "example": "Ich analysiere jeden Fehler."
            },
            {
              "de": "verbessern",
              "en": "improve",
              "example": "Ich verbessere mein Hören."
            }
          ],
          "examples": [
            "Complete Hören, Lesen and Schreiben without interruption.",
            "Simulate Sprechen with a partner.",
            "Classify mistakes by skill and cause."
          ],
          "usefulPhrases": [
            "Ich bin bereit.",
            "Bitte beginnen Sie.",
            "Wie viel Zeit habe ich?"
          ],
          "realLifeTask": "Run one German-only practical day: transport, shopping, appointment, message and introduction.",
          "examFocus": [
            "Use official Goethe model and practice sets for final benchmarking",
            "Aim above the pass mark to create a safety margin",
            "Review evidence and language pattern for every error"
          ],
          "commonMistakes": [
            "Doing only untimed exercises",
            "Repeating easy topics and avoiding weak areas",
            "Measuring only score, not error causes"
          ],
          "quiz": [
            {
              "q": "Official pass requirement:",
              "options": [
                "at least 60 of 100 and all sections taken",
                "50 of 100",
                "only speaking passed",
                "75 points in each section"
              ],
              "answer": "at least 60 of 100 and all sections taken",
              "explanation": "Goethe publishes 60/100 as the overall pass threshold for Start Deutsch 1."
            },
            {
              "q": "Best review method:",
              "options": [
                "categorise each error and repeat weak task",
                "look only at total score",
                "ignore correct answers",
                "learn random advanced words"
              ],
              "answer": "categorise each error and repeat weak task",
              "explanation": "Diagnosis guides focused practice."
            }
          ],
          "readingTask": {
            "title": "Official-material benchmark",
            "instruction": "After completing the in-app original tasks, use an official Goethe model/practice set under its stated time limits.",
            "modelAnswer": "Record section score, error cause and next action. Do not copy official test content into the app. Link learners to the official source.",
            "examPart": "Full exam",
            "timeMinutes": 80,
            "checklist": [
              "Hören timed",
              "Lesen timed",
              "Schreiben timed",
              "Sprechen simulated",
              "Error log created"
            ]
          }
        }
      ]
    },
    {
      "id": "a1-m14",
      "title": "Colors, Adjectives & Descriptions",
      "icon": "🎨",
      "syllabusTheme": "Goethe Wortliste: Farben; Adjektive; Beschreibungen",
      "lessons": [
        {
          "id": "a1-m14-l01",
          "title": "Colors and Basic Adjectives",
          "examMapping": ["Sprechen Teil 2", "Schreiben Teil 2", "Lesen Teil 2"],
          "objectives": [
            "Name the 12 core A1 colors",
            "Apply nominative adjective agreement with der/die/das",
            "Use sein + adjective vs. attributive ein + adjective",
            "Describe everyday objects and people simply"
          ],
          "grammar": [
            "Sein + adjective: Das Buch ist rot. Die Bluse ist blau.",
            "Attributive: ein roter Pullover, eine blaue Hose, ein grünes Hemd",
            "Nominative endings: -er (der), -e (die), -es (das), -e (pl.)",
            "Negation: Das Hemd ist nicht grün. Das ist kein roter Pullover.",
            "Question: Welche Farbe hat …? / Wie sieht … aus?",
            "Intensifier: sehr groß, ziemlich klein, nicht so teuer"
          ],
          "vocab": [
            { "de": "rot", "en": "red", "example": "Das Auto ist rot." },
            { "de": "blau", "en": "blue", "example": "Der Himmel ist blau." },
            { "de": "grün", "en": "green", "example": "Das Gras ist grün." },
            { "de": "gelb", "en": "yellow", "example": "Die Banane ist gelb." },
            { "de": "weiß", "en": "white", "example": "Die Wand ist weiß." },
            { "de": "schwarz", "en": "black", "example": "Meine Jacke ist schwarz." },
            { "de": "braun", "en": "brown", "example": "Der Tisch ist braun." },
            { "de": "grau", "en": "grey", "example": "Der Mantel ist grau." },
            { "de": "orange", "en": "orange", "example": "Die Orange ist orange." },
            { "de": "rosa", "en": "pink / rose", "example": "Das Kleid ist rosa." },
            { "de": "lila", "en": "purple", "example": "Der Schal ist lila." },
            { "de": "bunt", "en": "colourful / multi-coloured", "example": "Der Regenschirm ist bunt." },
            { "de": "groß", "en": "big / tall", "example": "Das Zimmer ist sehr groß." },
            { "de": "klein", "en": "small / short", "example": "Die Küche ist klein." },
            { "de": "neu", "en": "new", "example": "Das ist ein neues Handy." },
            { "de": "alt", "en": "old", "example": "Das Fahrrad ist alt." },
            { "de": "teuer", "en": "expensive", "example": "Das Kleid ist zu teuer." },
            { "de": "billig", "en": "cheap / inexpensive", "example": "Der Pullover ist billig." },
            { "de": "schön", "en": "beautiful / nice", "example": "Die Wohnung ist sehr schön." },
            { "de": "hell", "en": "light / bright", "example": "Das Zimmer ist hell und groß." },
            { "de": "dunkel", "en": "dark", "example": "Die Farbe ist zu dunkel." },
            { "de": "die Farbe, -n", "en": "colour", "example": "Welche Farbe hat der Mantel?" }
          ],
          "examples": [
            "Der Pullover ist rot. — Ein roter Pullover passt gut.",
            "Die Bluse ist blau. — Ich kaufe eine blaue Bluse.",
            "Das Hemd ist nicht grün, es ist grau.",
            "Welche Farbe hat das Kleid? — Es ist weiß.",
            "Sein Koffer ist klein und schwarz.",
            "Das neue Handy ist sehr teuer."
          ],
          "usefulPhrases": [
            "Welche Farbe …?",
            "Ich mag (kein) …",
            "Das ist (nicht) meine Farbe.",
            "Haben Sie das in Blau?",
            "Das steht Ihnen gut.",
            "Wie gefällt Ihnen …?"
          ],
          "listeningTask": {
            "title": "Color and description matching",
            "instruction": "Listen to short descriptions of clothing items. Match each description to the correct picture (A, B, C). Focus on color adjective + noun agreement.",
            "examPart": "Hören Teil 2",
            "timeMinutes": 6,
            "checklist": [
              "Underline color word in question",
              "Note noun gender — it changes adjective ending",
              "Eliminate pictures ruled out by color"
            ]
          },
          "readingTask": {
            "title": "Online shop item descriptions",
            "instruction": "Read four short product descriptions from an online shop. Match each item to its description (A–D). Look for color, size and price adjectives.",
            "examPart": "Lesen Teil 2",
            "timeMinutes": 8,
            "checklist": [
              "Circle all adjectives",
              "Check agreement with noun gender",
              "Use price/size to eliminate"
            ]
          },
          "writingTask": {
            "title": "Describe an item you own",
            "instruction": "Write 30–40 words describing something you own (a bag, bicycle, jacket). Mention color, size, age and your opinion of it.",
            "modelAnswer": "Ich habe eine alte, schwarze Tasche. Sie ist klein, aber sehr praktisch. Die Tasche war nicht teuer — nur 15 Euro. Ich mag sie sehr.",
            "examPart": "Schreiben Teil 2",
            "timeMinutes": 8
          },
          "speakingTask": {
            "title": "Describe what you are wearing",
            "instruction": "In the exam role-play, you may need to describe an item. Practise with a partner: take turns describing your clothing today in 3–4 sentences.",
            "modelAnswer": "Ich trage heute einen grauen Pullover und eine schwarze Hose. Die Hose ist neu und ziemlich teuer. Mein Pullover ist alt, aber ich mag ihn.",
            "examPart": "Sprechen Teil 2",
            "timeMinutes": 5,
            "checklist": [
              "Use adjective agreement correctly",
              "Give color + one other adjective",
              "Add a personal opinion phrase"
            ]
          },
          "realLifeTask": "Go to a clothing or household shop (or browse online). Choose three items and describe each one in German: color, size, and price. Write your descriptions in a note.",
          "examFocus": [
            "Adjective agreement changes with gender — drill der/die/das separately",
            "Schreiben Teil 2 frequently involves describing an object",
            "Sprechen Teil 2 may require describing a card picture",
            "'nicht' negates adjectives; 'kein' negates nouns"
          ],
          "commonMistakes": [
            "Writing 'ein rot Pullover' — adjective must agree: ein roter Pullover",
            "Using 'nicht' with nouns: 'Das ist nicht ein Pullover' → Das ist kein Pullover",
            "Forgetting -e in 'eine blaue Hose' (feminine accusative)",
            "Confusing 'hell' (light-coloured) and 'klar' (clear)"
          ],
          "quiz": [
            {
              "q": "Which sentence uses adjective agreement correctly?",
              "options": ["Ein rot Pullover", "Ein roter Pullover", "Ein rotes Pullover", "Ein rote Pullover"],
              "answer": "Ein roter Pullover",
              "explanation": "Masculine nominative after ein- takes -er ending."
            },
            {
              "q": "How do you say 'The dress is not white' in German?",
              "options": ["Das Kleid ist kein weiß.", "Das Kleid ist nicht weiß.", "Das Kleid hat nicht weiß.", "Das weiße Kleid nicht."],
              "answer": "Das Kleid ist nicht weiß.",
              "explanation": "'nicht' negates a predicate adjective after sein."
            },
            {
              "q": "Welche Farbe? — Der Himmel ist ___.",
              "options": ["grün", "rot", "blau", "gelb"],
              "answer": "blau",
              "explanation": "The sky (der Himmel) is typically described as blue."
            },
            {
              "q": "'Das Zimmer ist sehr ___.' — which adjective fits best for a bright room?",
              "options": ["dunkel", "teuer", "hell", "bunt"],
              "answer": "hell",
              "explanation": "'hell' means bright/light and describes well-lit rooms."
            }
          ]
        }
      ]
    },
    {
      "id": "a1-m15",
      "title": "Body, Appearance & Feelings",
      "icon": "🧍",
      "syllabusTheme": "Goethe Wortliste: Körper; Gefühle; Aussehen",
      "lessons": [
        {
          "id": "a1-m15-l01",
          "title": "Body Parts, Pain and Feelings",
          "examMapping": ["Hören Teil 1", "Sprechen Teil 2", "Schreiben Teil 2"],
          "objectives": [
            "Name key body parts needed for A1 health contexts",
            "Express pain and discomfort using Mir tut … weh",
            "Use basic feeling adjectives (müde, krank, froh, traurig)",
            "Understand simple doctor/pharmacy dialogues about symptoms"
          ],
          "grammar": [
            "Pain expression: Mir tut der Kopf weh. / Mir tun die Füße weh.",
            "Dative with body: Dative article + noun (dem Kopf, der Hand, den Beinen)",
            "Feeling adjectives with sein: Ich bin müde/krank/froh/nervös.",
            "Wie geht es Ihnen/dir? — Gut, danke. / Nicht so gut.",
            "Plural of body parts: der Arm → die Arme; das Bein → die Beine; der Finger → die Finger",
            "Modal verb können: Ich kann nicht kommen, ich bin krank."
          ],
          "vocab": [
            { "de": "der Kopf, Köpfe", "en": "head", "example": "Mir tut der Kopf weh." },
            { "de": "das Auge, -n", "en": "eye", "example": "Meine Augen sind müde." },
            { "de": "das Ohr, -en", "en": "ear", "example": "Mir tut das Ohr weh." },
            { "de": "der Mund, Münder", "en": "mouth", "example": "Öffnen Sie den Mund, bitte." },
            { "de": "der Hals, Hälse", "en": "throat / neck", "example": "Ich habe Halsschmerzen." },
            { "de": "der Bauch, Bäuche", "en": "stomach / belly", "example": "Mir tut der Bauch weh." },
            { "de": "der Rücken, -", "en": "back", "example": "Ich habe Rückenschmerzen." },
            { "de": "der Arm, -e", "en": "arm", "example": "Mein Arm ist gebrochen." },
            { "de": "die Hand, Hände", "en": "hand", "example": "Meine Hände sind kalt." },
            { "de": "das Bein, -e", "en": "leg", "example": "Mir tut das Bein weh." },
            { "de": "der Fuß, Füße", "en": "foot", "example": "Meine Füße tun weh." },
            { "de": "die Schmerzen (pl.)", "en": "pain / ache", "example": "Ich habe Kopfschmerzen." },
            { "de": "das Fieber", "en": "fever / temperature", "example": "Ich habe Fieber — 38 Grad." },
            { "de": "der Husten", "en": "cough", "example": "Ich habe Husten seit drei Tagen." },
            { "de": "der Schnupfen", "en": "runny nose / cold", "example": "Ich habe Schnupfen." },
            { "de": "müde", "en": "tired", "example": "Ich bin sehr müde heute." },
            { "de": "krank", "en": "ill / sick", "example": "Ich bin krank und kann nicht kommen." },
            { "de": "gesund", "en": "healthy / well", "example": "Jetzt bin ich wieder gesund." },
            { "de": "froh / glücklich", "en": "happy / glad", "example": "Ich bin froh, Sie zu sehen." },
            { "de": "traurig", "en": "sad", "example": "Er ist traurig, weil er krank ist." },
            { "de": "nervös", "en": "nervous", "example": "Ich bin nervös vor dem Prüfung." },
            { "de": "das Gewicht", "en": "weight", "example": "Wie viel wiegen Sie?" }
          ],
          "examples": [
            "Mir tut der Kopf weh — ich habe Kopfschmerzen.",
            "Wie geht es Ihnen? — Nicht so gut, ich bin krank.",
            "Ich habe Fieber und Husten seit gestern.",
            "Meine Beine tun weh — ich kann nicht laufen.",
            "Ich bin müde, aber nicht krank.",
            "Ich kann heute nicht arbeiten. Ich habe Rückenschmerzen."
          ],
          "usefulPhrases": [
            "Mir tut … weh.",
            "Ich habe Schmerzen.",
            "Ich fühle mich nicht gut.",
            "Ich bin krank.",
            "Wie geht es Ihnen?",
            "Gute Besserung!"
          ],
          "listeningTask": {
            "title": "Phone call about illness",
            "instruction": "Listen to a short phone message from a colleague calling in sick. Answer three questions: What symptoms do they have? How long have they been ill? Will they come to work tomorrow?",
            "examPart": "Hören Teil 1",
            "timeMinutes": 5,
            "checklist": [
              "Listen for symptom vocabulary (Fieber, Kopfschmerzen…)",
              "Note time expressions (seit gestern, drei Tage)",
              "Tick true/false statements after each play"
            ]
          },
          "readingTask": {
            "title": "Health advice notice",
            "instruction": "Read a short notice from a doctor's surgery. Decide: richtig oder falsch for five statements about opening hours and sick-note procedures.",
            "examPart": "Lesen Teil 1",
            "timeMinutes": 6
          },
          "writingTask": {
            "title": "Sick-leave message to colleague",
            "instruction": "Write a 30-word message to a colleague explaining that you are ill and cannot come to work. Mention your symptoms and when you expect to be back.",
            "modelAnswer": "Hallo Jana, ich bin krank. Mir tut der Kopf weh und ich habe Fieber. Ich komme morgen nicht. Ich komme am Mittwoch wieder. Gute Besserung — äh, ich meine, auf Wiedersehen! LG, Max",
            "examPart": "Schreiben Teil 2",
            "timeMinutes": 8
          },
          "speakingTask": {
            "title": "Prompt-card: How do you feel?",
            "instruction": "Use prompt cards to ask and answer about health. Card A: ask how your partner feels. Card B: you feel tired and have a headache — respond with full sentences.",
            "modelAnswer": "A: Wie geht es dir? B: Nicht so gut. Mir tut der Kopf weh und ich bin sehr müde. A: Oh, das tut mir leid. Gute Besserung!",
            "examPart": "Sprechen Teil 2",
            "timeMinutes": 5
          },
          "realLifeTask": "Next time you feel unwell or tired, write 2–3 sentences in German describing how you feel. Try to use at least one 'Mir tut … weh' construction and one feeling adjective.",
          "examFocus": [
            "'Mir tut … weh' is dative — the body part takes dative article",
            "Plural body parts often change the stem vowel (der Fuß → die Füße)",
            "Schreiben Teil 2 sick-note tasks appear frequently",
            "Listening for medical vocabulary: Fieber, Schmerzen, Termin"
          ],
          "commonMistakes": [
            "'Mich tut der Kopf weh' → correct: Mir tut der Kopf weh (dative, not accusative)",
            "Forgetting plural umlaut: 'die Kopfs' → die Köpfe",
            "Writing 'Ich habe Schmerze' → plural is always die Schmerzen",
            "'krank sein' vs 'Schmerzen haben' — both are correct but different constructions"
          ],
          "quiz": [
            {
              "q": "How do you say 'My head hurts' in German?",
              "options": ["Mein Kopf tut weh.", "Mir tut der Kopf weh.", "Ich habe mein Kopf weh.", "Der Kopf mir tut weh."],
              "answer": "Mir tut der Kopf weh.",
              "explanation": "Mir (dative) + tut + body part (nominative) + weh — this is the standard pain construction."
            },
            {
              "q": "Which is the correct plural of 'der Fuß'?",
              "options": ["die Fußen", "die Füsse", "die Füße", "die Fußes"],
              "answer": "die Füße",
              "explanation": "Fuß takes umlaut on ü and adds -e in the plural."
            },
            {
              "q": "Wie geht es Ihnen? — Select the best response for someone feeling ill.",
              "options": ["Ja, bitte.", "Danke, sehr gut.", "Nicht so gut, ich bin krank.", "Kein Problem."],
              "answer": "Nicht so gut, ich bin krank.",
              "explanation": "'Nicht so gut' is the standard polite phrase for feeling unwell."
            },
            {
              "q": "Which symptom word means 'cough'?",
              "options": ["Fieber", "Schnupfen", "Husten", "Schmerzen"],
              "answer": "Husten",
              "explanation": "Husten = cough; Fieber = fever; Schnupfen = runny nose; Schmerzen = pain."
            }
          ]
        }
      ]
    },
    {
      "id": "a1-m16",
      "title": "Daily Routine & Clock Time",
      "icon": "⏰",
      "syllabusTheme": "Goethe Wortliste: Tagesablauf; Uhrzeit im Kontext",
      "lessons": [
        {
          "id": "a1-m16-l01",
          "title": "Daily Activities and Separable Verbs",
          "examMapping": ["Hören Teil 1", "Sprechen Teil 2", "Schreiben Teil 2"],
          "objectives": [
            "Describe a typical daily routine in chronological order",
            "Use separable verbs: aufstehen, aufmachen, einkaufen, anrufen",
            "Give and understand clock times in formal and informal register",
            "Use time adverbials: morgens, mittags, abends, dann, danach, zuerst"
          ],
          "grammar": [
            "Separable verbs: prefix splits in main clause — Ich stehe um 7 Uhr auf.",
            "Common separable prefixes: auf-, an-, ein-, mit-, ab-, zu-",
            "Time in statements: Um + exact time; Gegen + approximate time",
            "Formal time: 14:30 = vierzehn Uhr dreißig; informal: halb drei",
            "Quarter past / to: Viertel nach acht (8:15), Viertel vor neun (8:45)",
            "Sequence adverbs: zuerst, dann, danach, später, am Ende"
          ],
          "vocab": [
            { "de": "aufstehen (steht auf)", "en": "to get up", "example": "Ich stehe um 6 Uhr auf." },
            { "de": "aufwachen (wacht auf)", "en": "to wake up", "example": "Er wacht um 7 Uhr auf." },
            { "de": "frühstücken", "en": "to have breakfast", "example": "Wir frühstücken um halb acht." },
            { "de": "zur Arbeit gehen/fahren", "en": "to go to work", "example": "Ich fahre um 8 Uhr zur Arbeit." },
            { "de": "anfangen (fängt an)", "en": "to start / begin", "example": "Die Arbeit fängt um 9 Uhr an." },
            { "de": "zu Mittag essen", "en": "to have lunch", "example": "Ich esse um 12 Uhr zu Mittag." },
            { "de": "aufhören (hört auf)", "en": "to finish / stop", "example": "Die Arbeit hört um 17 Uhr auf." },
            { "de": "einkaufen gehen", "en": "to go shopping", "example": "Sie geht nach der Arbeit einkaufen." },
            { "de": "kochen", "en": "to cook", "example": "Er kocht abends das Abendessen." },
            { "de": "fernsehen (sieht fern)", "en": "to watch TV", "example": "Ich sehe abends fern." },
            { "de": "schlafen gehen", "en": "to go to bed", "example": "Ich gehe um 22 Uhr schlafen." },
            { "de": "morgens", "en": "in the morning", "example": "Morgens trinke ich Kaffee." },
            { "de": "mittags", "en": "at noon / lunchtime", "example": "Mittags esse ich in der Kantine." },
            { "de": "abends", "en": "in the evening", "example": "Abends lese ich oder sehe fern." },
            { "de": "nachts", "en": "at night", "example": "Nachts schlafe ich tief." },
            { "de": "die Pause, -n", "en": "break / pause", "example": "Um 10 Uhr mache ich Pause." },
            { "de": "pünktlich", "en": "punctual / on time", "example": "Der Zug ist pünktlich." },
            { "de": "zu spät", "en": "too late", "example": "Ich bin zu spät — es tut mir leid." },
            { "de": "der Wecker, -", "en": "alarm clock", "example": "Mein Wecker klingelt um 6 Uhr." },
            { "de": "der Alltag", "en": "everyday life / routine", "example": "Mein Alltag ist sehr regelmäßig." }
          ],
          "examples": [
            "Ich stehe um 6:30 Uhr auf und frühstücke um Viertel vor sieben.",
            "Die Arbeit fängt um 9 Uhr an und hört um 17 Uhr auf.",
            "Zuerst gehe ich einkaufen, dann koche ich das Abendessen.",
            "Wann frühstücken Sie? — Um halb acht, meistens.",
            "Abends sehe ich fern oder lese ein Buch.",
            "Ich gehe gegen 22 Uhr schlafen."
          ],
          "usefulPhrases": [
            "Um wie viel Uhr …?",
            "Es ist halb …",
            "Viertel nach / vor …",
            "Wann fängt … an?",
            "Ich stehe früh auf.",
            "Mein Tag beginnt um …"
          ],
          "listeningTask": {
            "title": "Radio interview about daily routine",
            "instruction": "Listen to a short radio interview in which a person describes their daily routine. Answer: When do they get up? When does work start? What do they do in the evening? Mark the correct times on a timeline.",
            "examPart": "Hören Teil 1",
            "timeMinutes": 5,
            "checklist": [
              "Prepare a simple timeline before listening",
              "Listen for separable verb prefixes at sentence end",
              "Note formal vs informal time expressions"
            ]
          },
          "readingTask": {
            "title": "Personal schedule notice",
            "instruction": "Read a short weekly plan posted by a language partner. Answer five richtig/falsch statements about their daily and weekly routine.",
            "examPart": "Lesen Teil 1",
            "timeMinutes": 6
          },
          "writingTask": {
            "title": "Describe your daily routine",
            "instruction": "Write 30–40 words describing your typical morning. Use at least two separable verbs and two time adverbials.",
            "modelAnswer": "Ich wache um 6:30 Uhr auf und stehe um 6:45 Uhr auf. Zuerst dusche ich, dann frühstücke ich. Um halb acht fahre ich zur Arbeit. Die Arbeit fängt um 9 Uhr an.",
            "examPart": "Schreiben Teil 2",
            "timeMinutes": 10
          },
          "speakingTask": {
            "title": "Describe your day with prompt card",
            "instruction": "Use the prompt card: Wann stehen Sie auf? Was essen Sie zum Frühstück? Wann gehen Sie zur Arbeit? Was machen Sie abends? Answer in connected sentences.",
            "modelAnswer": "Ich stehe um 7 Uhr auf. Ich frühstücke — meistens Brot und Kaffee. Um 8 Uhr fahre ich zur Arbeit. Die Arbeit fängt um 9 Uhr an. Abends koche ich und sehe ein bisschen fern.",
            "examPart": "Sprechen Teil 2",
            "timeMinutes": 5,
            "checklist": [
              "Use separable verbs correctly (prefix at end)",
              "Include at least one sequence adverb",
              "Give specific times where possible"
            ]
          },
          "realLifeTask": "Write your own daily schedule in German. Cover at least 6 activities from waking up to going to bed. Use separable verbs and add the time for each activity.",
          "examFocus": [
            "Separable verb prefix goes to sentence end — always",
            "Hören Teil 1 frequently includes phone messages about schedules",
            "Formal time (24-hour) used in timetables; informal in conversation",
            "Schreiben Teil 2 may ask you to write about your routine or send a time-based message"
          ],
          "commonMistakes": [
            "'Ich aufstehe um 7 Uhr' → Ich stehe um 7 Uhr auf (prefix at end)",
            "'Um sieben und halb' → correct: um halb acht (=7:30 in German!)",
            "Confusing halb: halb acht = 7:30, NOT 8:30",
            "Omitting 'Uhr' in written times: write '9 Uhr', not just '9'"
          ],
          "quiz": [
            {
              "q": "Which sentence uses the separable verb correctly?",
              "options": [
                "Ich aufstehe um 7 Uhr.",
                "Ich stehe um 7 Uhr auf.",
                "Um 7 Uhr ich stehe auf.",
                "Stehe ich auf um 7 Uhr."
              ],
              "answer": "Ich stehe um 7 Uhr auf.",
              "explanation": "In a main clause the separable prefix moves to the very end: stehe … auf."
            },
            {
              "q": "What time is 'halb acht' in 12-hour clock?",
              "options": ["8:30", "7:30", "8:15", "7:45"],
              "answer": "7:30",
              "explanation": "'halb acht' means 'half way to 8' = 7:30. This is a very common exam trap."
            },
            {
              "q": "Zuerst gehe ich einkaufen, ___ koche ich.",
              "options": ["danach", "bis", "vor", "noch"],
              "answer": "danach",
              "explanation": "'danach' (afterwards/then) links sequential actions in order."
            },
            {
              "q": "Which word means 'alarm clock'?",
              "options": ["die Uhr", "der Wecker", "die Pause", "der Alltag"],
              "answer": "der Wecker",
              "explanation": "Der Wecker is the alarm clock; die Uhr is clock/watch in general."
            }
          ]
        }
      ]
    }
  ]
};
