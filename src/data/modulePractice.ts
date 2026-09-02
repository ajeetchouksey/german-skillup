export interface SampleQuestion { skill:string; question:string; answerGuide:string; }
export interface MissionGuide { concept:string; purpose:string; steps:string[]; evidence:string; successCriteria:string[]; }
export const MODULE_PRACTICE: Record<string,{title:string;sampleQuestions:SampleQuestion[];mission:MissionGuide}> = {
  "a1-m00": {
    "title": "German Basics",
    "sampleQuestions": [
      {
        "skill": "Sprechen Teil 1",
        "question": "Buchstabieren Sie Ihren Nachnamen. (Spell your surname letter by letter.)",
        "answerGuide": "Say each letter using German pronunciation. Umlaut Ä: 'A Umlaut', Ö: 'O Umlaut', Ü: 'U Umlaut'."
      },
      {
        "skill": "Hören",
        "question": "You hear: 'Das kostet siebenundzwanzig Euro fünfzig.' Write the price as digits.",
        "answerGuide": "27,50 € — units come before tens in compound numbers."
      },
      {
        "skill": "Sprechen",
        "question": "Say hello, introduce yourself with your name, age and where you come from, then say goodbye.",
        "answerGuide": "Guten Tag! Ich heiße ... Ich bin ... Jahre alt. Ich komme aus ... Auf Wiedersehen!"
      }
    ],
    "mission": {
      "concept": "Real-world practice: use German letters and numbers in a genuine daily task.",
      "purpose": "Make alphabet and numbers automatic so you never hesitate in the exam.",
      "steps": [
        "Spell your full name out loud 3 times without looking at the alphabet",
        "Dictate your phone number to a friend or say it into a voice memo in German",
        "Say 10 random prices between €1–€99 using German words"
      ],
      "evidence": "Recording of yourself spelling your name and saying five prices correctly.",
      "successCriteria": [
        "All 26 letters + Ä Ö Ü ß pronounced correctly",
        "No hesitation when spelling your name",
        "Compound numbers (e.g. dreiundzwanzig) said as one word"
      ]
    }
  },
  "a1-m01": {
    "title": "Person and Identity",
    "sampleQuestions": [
      {
        "skill": "Sprechen Teil 1",
        "question": "Stellen Sie sich vor: Name, Alter, Land, Wohnort, Sprachen, Beruf und Hobby.",
        "answerGuide": "Use 6-7 short sentences, then spell your surname."
      },
      {
        "skill": "Schreiben Teil 1",
        "question": "Complete Familienname, Vorname, Geburtsdatum, Staatsangehörigkeit and Wohnort.",
        "answerGuide": "Copy information exactly and do not reverse surname and first name."
      },
      {
        "skill": "Sprechen Teil 1",
        "question": "Wie heißen Sie? Woher kommen Sie? Wo wohnen Sie?",
        "answerGuide": "Ich heiße ... Ich komme aus ... Ich wohne in ..."
      }
    ],
    "mission": {
      "concept": "A Real-Life Mission is a short German-only task performed in a realistic situation. It turns lesson language into an observable outcome, so learners practise successful communication rather than only memorising vocabulary.",
      "purpose": "Build automatic confidence for first meetings and the speaking introduction.",
      "steps": [
        "Prepare seven identity points",
        "Speak without reading",
        "Answer two follow-up questions"
      ],
      "evidence": "A 60-second recording or partner checklist",
      "successCriteria": [
        "Use the target German phrases",
        "Complete the practical outcome",
        "Reflect on one mistake and one improvement"
      ]
    }
  },
  "a1-m02": {
    "title": "Numbers, Time and Calendar",
    "sampleQuestions": [
      {
        "skill": "Hören Teil 1",
        "question": "“Der Pullover kostet nicht vierzig, sondern vierzehn Euro.” What is the price?",
        "answerGuide": "14 Euro. Notice the correction."
      },
      {
        "skill": "Hören Teil 1",
        "question": "“Der Termin ist um halb zehn.” Which time is correct?",
        "answerGuide": "09:30."
      },
      {
        "skill": "Lesen Teil 3",
        "question": "“Freitag 8-12 Uhr, nur mit Termin.” Can you visit at 10 without an appointment?",
        "answerGuide": "No. An appointment is required."
      }
    ],
    "mission": {
      "concept": "A Real-Life Mission is a short German-only task performed in a realistic situation. It turns lesson language into an observable outcome, so learners practise successful communication rather than only memorising vocabulary.",
      "purpose": "Make numbers reliable for appointments, travel and shopping.",
      "steps": [
        "Say phone, postcode and birthday",
        "Read five prices and times",
        "Ask a partner to verify"
      ],
      "evidence": "A list with at least 8 of 10 accurate items",
      "successCriteria": [
        "Use the target German phrases",
        "Complete the practical outcome",
        "Reflect on one mistake and one improvement"
      ]
    }
  },
  "a1-m03": {
    "title": "Family and Relationships",
    "sampleQuestions": [
      {
        "skill": "Sprechen Teil 2",
        "question": "Prompt: Kinder. Ask a complete question.",
        "answerGuide": "Haben Sie Kinder?"
      },
      {
        "skill": "Sprechen Teil 2",
        "question": "Prompt: Eltern / Wohnort. Ask and answer.",
        "answerGuide": "Wo wohnen Ihre Eltern?"
      },
      {
        "skill": "Lesen Teil 1",
        "question": "“Meine Schwester kommt mit ihren zwei Kindern.” How many children come?",
        "answerGuide": "Two."
      }
    ],
    "mission": {
      "concept": "A Real-Life Mission is a short German-only task performed in a realistic situation. It turns lesson language into an observable outcome, so learners practise successful communication rather than only memorising vocabulary.",
      "purpose": "Turn family vocabulary into a natural two-way conversation.",
      "steps": [
        "Choose a family photo",
        "Describe three people",
        "Ask three family questions"
      ],
      "evidence": "A one-minute recording",
      "successCriteria": [
        "Use the target German phrases",
        "Complete the practical outcome",
        "Reflect on one mistake and one improvement"
      ]
    }
  },
  "a1-m04": {
    "title": "Home, Furniture and Moving",
    "sampleQuestions": [
      {
        "skill": "Lesen Teil 2",
        "question": "Find a furnished room near the station, under €650, from October. What must match?",
        "answerGuide": "Furniture, location, budget and date."
      },
      {
        "skill": "Schreiben Teil 2",
        "question": "Write about a broken heating system and request repair.",
        "answerGuide": "Include greeting, problem, duration, request, contact and closing."
      },
      {
        "skill": "Sprechen Teil 3",
        "question": "The lift is broken. Make a polite request.",
        "answerGuide": "Können Sie bitte den Hausmeister anrufen?"
      }
    ],
    "mission": {
      "concept": "A Real-Life Mission is a short German-only task performed in a realistic situation. It turns lesson language into an observable outcome, so learners practise successful communication rather than only memorising vocabulary.",
      "purpose": "Use German to solve a realistic housing need.",
      "steps": [
        "Choose a housing problem",
        "State essential facts",
        "Make one clear request"
      ],
      "evidence": "A 30-word message or call script",
      "successCriteria": [
        "Use the target German phrases",
        "Complete the practical outcome",
        "Reflect on one mistake and one improvement"
      ]
    }
  },
  "a1-m05": {
    "title": "Food, Drink and Restaurants",
    "sampleQuestions": [
      {
        "skill": "Hören Teil 1",
        "question": "“Keinen Tee. Ich nehme Kaffee.” What is ordered?",
        "answerGuide": "Coffee."
      },
      {
        "skill": "Sprechen Teil 2",
        "question": "Prompt: Frühstück. Ask a question.",
        "answerGuide": "Was essen Sie zum Frühstück?"
      },
      {
        "skill": "Sprechen Teil 3",
        "question": "Request a bottle of water.",
        "answerGuide": "Können Sie mir bitte eine Flasche Wasser geben?"
      }
    ],
    "mission": {
      "concept": "A Real-Life Mission is a short German-only task performed in a realistic situation. It turns lesson language into an observable outcome, so learners practise successful communication rather than only memorising vocabulary.",
      "purpose": "Practise a complete transaction from greeting to payment.",
      "steps": [
        "Choose products and quantities",
        "Ask the price",
        "Pay and close politely"
      ],
      "evidence": "A full role-play without English",
      "successCriteria": [
        "Use the target German phrases",
        "Complete the practical outcome",
        "Reflect on one mistake and one improvement"
      ]
    }
  },
  "a1-m06": {
    "title": "Services and Public Offices",
    "sampleQuestions": [
      {
        "skill": "Lesen Teil 3",
        "question": "“Donnerstag nur mit Termin.” Can you go without an appointment?",
        "answerGuide": "No."
      },
      {
        "skill": "Schreiben Teil 1",
        "question": "The person has no credit card. Choose Zahlungsweise.",
        "answerGuide": "Bar."
      },
      {
        "skill": "Sprechen Teil 2",
        "question": "Prompt: Dokumente. Ask what to bring.",
        "answerGuide": "Welche Dokumente muss ich mitbringen?"
      }
    ],
    "mission": {
      "concept": "A Real-Life Mission is a short German-only task performed in a realistic situation. It turns lesson language into an observable outcome, so learners practise successful communication rather than only memorising vocabulary.",
      "purpose": "Prepare for practical administrative interactions.",
      "steps": [
        "Identify documents",
        "Check hours and appointment rule",
        "Ask one clarification"
      ],
      "evidence": "A visit checklist and three questions",
      "successCriteria": [
        "Use the target German phrases",
        "Complete the practical outcome",
        "Reflect on one mistake and one improvement"
      ]
    }
  },
  "a1-m07": {
    "title": "Work, Education and German Course",
    "sampleQuestions": [
      {
        "skill": "Lesen Teil 1",
        "question": "“Kommen Sie heute erst um zehn Uhr.” What must the employee do?",
        "answerGuide": "Arrive at 10:00."
      },
      {
        "skill": "Schreiben Teil 2",
        "question": "Miss class: give reason, ask for homework, state return date.",
        "answerGuide": "Cover all three prompts plus greeting and closing."
      },
      {
        "skill": "Sprechen Teil 2",
        "question": "Prompt: Arbeitszeit. Ask and answer.",
        "answerGuide": "Wann arbeiten Sie?"
      }
    ],
    "mission": {
      "concept": "A Real-Life Mission is a short German-only task performed in a realistic situation. It turns lesson language into an observable outcome, so learners practise successful communication rather than only memorising vocabulary.",
      "purpose": "Use German for schedules, absence and course administration.",
      "steps": [
        "Read a short message",
        "Identify action and deadline",
        "Write a response"
      ],
      "evidence": "A response covering who, what, when and why",
      "successCriteria": [
        "Use the target German phrases",
        "Complete the practical outcome",
        "Reflect on one mistake and one improvement"
      ]
    }
  },
  "a1-m08": {
    "title": "Travel, Transport and Accommodation",
    "sampleQuestions": [
      {
        "skill": "Hören Teil 2",
        "question": "Train now leaves from Gleis 7, not 4. Statement: It leaves from 4.",
        "answerGuide": "False."
      },
      {
        "skill": "Hören Teil 3",
        "question": "Arrival 16:45 with 10-minute delay. New arrival?",
        "answerGuide": "16:55."
      },
      {
        "skill": "Sprechen Teil 2",
        "question": "Prompt: Bahnhof. Ask for directions.",
        "answerGuide": "Wie komme ich zum Bahnhof?"
      }
    ],
    "mission": {
      "concept": "A Real-Life Mission is a short German-only task performed in a realistic situation. It turns lesson language into an observable outcome, so learners practise successful communication rather than only memorising vocabulary.",
      "purpose": "Build independence in transport and navigation.",
      "steps": [
        "Plan a real route",
        "Ask ticket/platform information",
        "Explain the route back"
      ],
      "evidence": "A route card with destination, time and platform",
      "successCriteria": [
        "Use the target German phrases",
        "Complete the practical outcome",
        "Reflect on one mistake and one improvement"
      ]
    }
  },
  "a1-m09": {
    "title": "Shopping, Clothing and Everyday Goods",
    "sampleQuestions": [
      {
        "skill": "Hören Teil 1",
        "question": "“Heute 39 Euro, nicht 59.” What is the price?",
        "answerGuide": "39 Euro."
      },
      {
        "skill": "Lesen Teil 2",
        "question": "You need blue shoes, size 42, under €70. What must match?",
        "answerGuide": "Item, colour, size and price."
      },
      {
        "skill": "Sprechen Teil 3",
        "question": "The trousers are too small. Request exchange.",
        "answerGuide": "Kann ich die Hose bitte umtauschen?"
      }
    ],
    "mission": {
      "concept": "A Real-Life Mission is a short German-only task performed in a realistic situation. It turns lesson language into an observable outcome, so learners practise successful communication rather than only memorising vocabulary.",
      "purpose": "Match needs to products and solve a simple problem.",
      "steps": [
        "Specify item, size, colour and budget",
        "Ask to try on",
        "Request exchange"
      ],
      "evidence": "A complete shop dialogue",
      "successCriteria": [
        "Use the target German phrases",
        "Complete the practical outcome",
        "Reflect on one mistake and one improvement"
      ]
    }
  },
  "a1-m10": {
    "title": "Health and Appointments",
    "sampleQuestions": [
      {
        "skill": "Hören Teil 3",
        "question": "One tablet morning and evening. How many per day?",
        "answerGuide": "Two."
      },
      {
        "skill": "Sprechen Teil 3",
        "question": "Request headache medicine.",
        "answerGuide": "Können Sie mir bitte etwas gegen Kopfschmerzen geben?"
      },
      {
        "skill": "Sprechen Teil 2",
        "question": "Ask about symptom duration.",
        "answerGuide": "Seit wann haben Sie Schmerzen?"
      }
    ],
    "mission": {
      "concept": "A Real-Life Mission is a short German-only task performed in a realistic situation. It turns lesson language into an observable outcome, so learners practise successful communication rather than only memorising vocabulary.",
      "purpose": "Communicate basic health needs clearly.",
      "steps": [
        "State symptom",
        "State duration",
        "Ask for help or instructions"
      ],
      "evidence": "A symptom card and role-play",
      "successCriteria": [
        "Use the target German phrases",
        "Complete the practical outcome",
        "Reflect on one mistake and one improvement"
      ]
    }
  },
  "a1-m11": {
    "title": "Leisure, Weather and Plans",
    "sampleQuestions": [
      {
        "skill": "Schreiben Teil 2",
        "question": "Invite a friend: reason, date/time/place, what to bring.",
        "answerGuide": "Cover all prompts plus greeting and closing."
      },
      {
        "skill": "Sprechen Teil 2",
        "question": "Prompt: Wochenende. Ask a question.",
        "answerGuide": "Was machen Sie am Wochenende?"
      },
      {
        "skill": "Lesen Teil 3",
        "question": "“Open-Air-Kino fällt bei Regen aus.” It rains. Does it happen?",
        "answerGuide": "No."
      }
    ],
    "mission": {
      "concept": "A Real-Life Mission is a short German-only task performed in a realistic situation. It turns lesson language into an observable outcome, so learners practise successful communication rather than only memorising vocabulary.",
      "purpose": "Develop social German for invitations and plans.",
      "steps": [
        "Suggest an activity",
        "Give date, time and place",
        "Accept or decline with reason"
      ],
      "evidence": "An invitation plus reply",
      "successCriteria": [
        "Use the target German phrases",
        "Complete the practical outcome",
        "Reflect on one mistake and one improvement"
      ]
    }
  },
  "a1-m12": {
    "title": "Exam Skills Lab",
    "sampleQuestions": [
      {
        "skill": "Hören",
        "question": "Options are 14, 40 and 44 euros. What should you predict?",
        "answerGuide": "Listen for -zehn/-zig and correction."
      },
      {
        "skill": "Lesen",
        "question": "A website has the right topic but wrong opening time. Choose it?",
        "answerGuide": "No; all conditions must match."
      },
      {
        "skill": "Schreiben",
        "question": "Only two of three prompts covered. Is it complete?",
        "answerGuide": "No."
      },
      {
        "skill": "Sprechen",
        "question": "You do not understand. What can you say?",
        "answerGuide": "Noch einmal, bitte."
      }
    ],
    "mission": {
      "concept": "A Real-Life Mission is a short German-only task performed in a realistic situation. It turns lesson language into an observable outcome, so learners practise successful communication rather than only memorising vocabulary.",
      "purpose": "Convert knowledge into timed exam performance.",
      "steps": [
        "Complete under time limit",
        "Mark confidence",
        "Review evidence and errors"
      ],
      "evidence": "A scored task and error log",
      "successCriteria": [
        "Use the target German phrases",
        "Complete the practical outcome",
        "Reflect on one mistake and one improvement"
      ]
    }
  },
  "a1-m13": {
    "title": "Mock Exam and Readiness",
    "sampleQuestions": [
      {
        "skill": "Full exam",
        "question": "Score 62/100 with all sections completed. Above threshold?",
        "answerGuide": "Yes."
      },
      {
        "skill": "Error analysis",
        "question": "Four listening errors are numbers/times. What should you revise?",
        "answerGuide": "Timed number, price and time drills."
      },
      {
        "skill": "Study planning",
        "question": "Random advanced words or timed mock with review?",
        "answerGuide": "Timed mock with review."
      }
    ],
    "mission": {
      "concept": "A Real-Life Mission is a short German-only task performed in a realistic situation. It turns lesson language into an observable outcome, so learners practise successful communication rather than only memorising vocabulary.",
      "purpose": "Prove readiness and create a focused final plan.",
      "steps": [
        "Run all four skills",
        "Calculate results",
        "Choose two weaknesses"
      ],
      "evidence": "A scorecard and seven-day plan",
      "successCriteria": [
        "Use the target German phrases",
        "Complete the practical outcome",
        "Reflect on one mistake and one improvement"
      ]
    }
  },
  "a1-m14": {
    "title": "Colors, Adjectives & Descriptions",
    "sampleQuestions": [
      {
        "skill": "Sprechen Teil 2",
        "question": "Beschreiben Sie Ihre Jacke oder Ihren Pullover: Farbe, Größe, alt oder neu?",
        "answerGuide": "Ich trage heute einen schwarzen Pullover. Er ist neu und ziemlich groß. Ich mag ihn sehr. → Use adjective agreement + opinion phrase."
      },
      {
        "skill": "Schreiben Teil 2",
        "question": "Describe an item you want to buy: color, size, price.",
        "answerGuide": "Ich möchte eine blaue Hose kaufen. Sie ist nicht zu teuer — ca. 30 Euro. Die Größe ist 38. → 30–40 words."
      },
      {
        "skill": "Lesen Teil 2",
        "question": "Match: 'Ein kleines, rotes Fahrrad' — welches Bild passt?",
        "answerGuide": "Look for: klein (small), rot (red), Fahrrad (bicycle) — all three must match."
      }
    ],
    "mission": {
      "concept": "A Real-Life Mission turns classroom adjectives into real spoken description. You practice adjective agreement by using it in an authentic context — not just in gap-fill drills.",
      "purpose": "Build automatic adjective agreement for clothing, objects and room descriptions used in Sprechen Teil 2 and Schreiben Teil 2.",
      "steps": [
        "Choose 5 items visible right now (clothing, furniture, objects)",
        "Write one German sentence per item: color + adjective + opinion",
        "Read them aloud checking agreement endings",
        "Ask a language partner to guess the item from your description"
      ],
      "evidence": "A short written list of 5 descriptions with correct adjective agreement",
      "successCriteria": [
        "Each description uses at least one color adjective",
        "Agreement ending is correct for der/die/das",
        "At least one sentence uses 'nicht' or 'kein' correctly"
      ]
    }
  },
  "a1-m15": {
    "title": "Body, Appearance & Feelings",
    "sampleQuestions": [
      {
        "skill": "Schreiben Teil 2",
        "question": "Write a sick-leave message to your colleague Jana: symptoms, duration, expected return.",
        "answerGuide": "Hallo Jana, ich bin krank. Mir tut der Kopf weh und ich habe Fieber. Ich komme morgen nicht. Bis Mittwoch. → ~30 words."
      },
      {
        "skill": "Sprechen Teil 1",
        "question": "Wie geht es Ihnen heute?",
        "answerGuide": "Nicht so gut, danke. Ich bin ein bisschen müde. / Gut, danke. → Short polite answer + reason."
      },
      {
        "skill": "Hören Teil 1",
        "question": "A colleague calls in sick. What symptoms do they mention?",
        "answerGuide": "Listen for: Fieber, Kopfschmerzen, Husten, Schnupfen — tick each one heard."
      }
    ],
    "mission": {
      "concept": "Body and feeling vocabulary only sticks when you use it to communicate real states. This mission gives you a genuine reason to use the language.",
      "purpose": "Activate Mir tut … weh, symptom vocabulary and feeling adjectives in realistic written and spoken contexts.",
      "steps": [
        "Each morning this week, write one sentence about how you feel in German",
        "Use at least one body part or symptom word per day",
        "On one day, write a short sick-note to an imaginary colleague",
        "Check plural forms of any body part you used"
      ],
      "evidence": "A 5-day German health diary + one written sick-note message",
      "successCriteria": [
        "Uses 'Mir tut … weh' correctly with dative article",
        "Includes at least 3 different symptom or feeling words",
        "Sick-note covers symptom, duration and return date"
      ]
    }
  },
  "a1-m16": {
    "title": "Daily Routine & Clock Time",
    "sampleQuestions": [
      {
        "skill": "Sprechen Teil 2",
        "question": "Wann stehen Sie auf? Was machen Sie morgens?",
        "answerGuide": "Ich stehe um 6:30 Uhr auf. Zuerst dusche ich, dann frühstücke ich. Um 8 Uhr fahre ich zur Arbeit. → Use separable verbs + sequence adverbs."
      },
      {
        "skill": "Schreiben Teil 2",
        "question": "Write a 30-word message to a friend describing your typical morning.",
        "answerGuide": "Mein Morgen: Ich stehe um 7 Uhr auf. Ich frühstücke — Brot und Kaffee. Dann fahre ich mit dem Bus zur Arbeit. Die Arbeit fängt um 9 Uhr an."
      },
      {
        "skill": "Hören Teil 1",
        "question": "What time does the person start work? → You hear: 'Die Arbeit fängt um Viertel nach neun an.'",
        "answerGuide": "Viertel nach neun = 9:15. Write in formal time: 09:15. Don't confuse halb = 30 min before the hour."
      }
    ],
    "mission": {
      "concept": "Daily routine language must be automatic because it comes up in both Sprechen and Hören in nearly every A1 exam. This mission embeds separable verbs through real daily habit.",
      "purpose": "Make separable verb placement and clock-time expressions automatic by using them to describe your own real routine.",
      "steps": [
        "Write your complete daily schedule in German (6 am to 10 pm)",
        "Use at least 6 separable verbs with correct prefix placement",
        "Include both formal (14:30) and informal (halb drei) time for each activity",
        "Read it aloud to check verb-end placement"
      ],
      "evidence": "A written daily schedule with times + a 60-second recorded or spoken routine description",
      "successCriteria": [
        "Every separable verb has its prefix at sentence end",
        "At least 3 informal time expressions used correctly (halb, Viertel nach, Viertel vor)",
        "Sequence adverbs (zuerst, dann, danach) used at least twice"
      ]
    }
  },

  // ─── A2 Modules ────────────────────────────────────────────────────────────

  "a2-m01": {
    "title": "Perfekt — Talking About the Past",
    "sampleQuestions": [
      {
        "skill": "Schreiben Teil 2",
        "question": "Write a short message to a friend (40 words) about what you did last weekend.",
        "answerGuide": "Am Wochenende bin ich aufgestanden und habe gefrühstückt. Dann bin ich mit dem Fahrrad in den Park gefahren. Abends haben wir einen Film gesehen. → Use both haben and sein auxiliaries."
      },
      {
        "skill": "Sprechen Teil 2",
        "question": "Was haben Sie letztes Wochenende gemacht?",
        "answerGuide": "Letztes Wochenende bin ich … Ich habe … gegessen/getrunken/gesehen. → At least 4 Perfekt forms, both auxiliaries."
      },
      {
        "skill": "Hören Teil 2",
        "question": "Listen: Did the person go to the cinema or the theatre? → You hear 'Wir sind ins Theater gegangen.'",
        "answerGuide": "Key: sein + gegangen = went somewhere. Listen for the Partizip II at the sentence end."
      }
    ],
    "mission": {
      "concept": "Perfekt is THE past tense in spoken and informal written German. A2 tasks will almost always require you to narrate past events.",
      "purpose": "Automate haben/sein choice and Partizip II formation through genuine narrative practice.",
      "steps": [
        "Write a 60-word diary entry about what you did yesterday — use only Perfekt",
        "Include at least 3 sein verbs (movement/state change) and 3 haben verbs",
        "Include one separable verb in Perfekt (e.g. aufgestanden, eingekauft)",
        "Read aloud to check Partizip II goes to the very END of each clause"
      ],
      "evidence": "Written diary entry (60 words) annotated with aux (h=haben, s=sein) for each Perfekt form",
      "successCriteria": [
        "Correct auxiliary for every verb",
        "Partizip II is always at sentence end",
        "Separable Partizip II has ge- inserted correctly (aufgestanden not geaufgestanden)"
      ]
    }
  },

  "a2-m02": {
    "title": "Dative Case & Prepositions",
    "sampleQuestions": [
      {
        "skill": "Schreiben Teil 2",
        "question": "Describe where you live in 40 words, using at least 3 dative prepositions.",
        "answerGuide": "Ich wohne seit einem Jahr bei meiner Freundin. Von unserem Haus aus fahre ich mit der U-Bahn zur Arbeit. Gegenüber dem Park gibt es ein Café."
      },
      {
        "skill": "Sprechen Teil 2",
        "question": "Wie kommst du zur Arbeit? Wie lange wohnst du schon hier?",
        "answerGuide": "Ich fahre mit dem Bus zur Arbeit. Seit zwei Jahren wohne ich in dieser Stadt. → Note: seit + present tense for ongoing."
      },
      {
        "skill": "Lesen Teil 1",
        "question": "Wo liegt das Restaurant? → Text: 'Das Restaurant befindet sich gegenüber dem Rathaus.'",
        "answerGuide": "gegenüber dem = across from THE (dative). Answer: opposite the town hall."
      }
    ],
    "mission": {
      "concept": "Dative prepositions appear in directions, location descriptions and time phrases in every A2 exam section.",
      "purpose": "Make dative contractions (zum, zur, beim, vom) and Wo?/Wohin? distinction automatic.",
      "steps": [
        "Write 5 sentences about your commute using mit, von, zu, seit",
        "Write 3 more sentences describing where things ARE (Wo? = dative) vs where you are GOING (Wohin? = accusative)",
        "Draw a simple map of your neighbourhood and label 5 landmarks using gegenüber/neben/bei",
        "Check every dative preposition uses dem/der/dem correctly"
      ],
      "evidence": "7 written sentences + annotated neighbourhood map",
      "successCriteria": [
        "seit always followed by present tense",
        "Wo? = dative; Wohin? = accusative with two-way prepositions",
        "zum/zur contractions used (not 'zu dem / zu der')"
      ]
    }
  },

  "a2-m03": {
    "title": "Subordinating Conjunctions",
    "sampleQuestions": [
      {
        "skill": "Schreiben Teil 2",
        "question": "Write 40 words explaining why you are learning German and what you will do when your German improves.",
        "answerGuide": "Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte. Ich glaube, dass Deutsch sehr nützlich ist. Wenn ich gut genug spreche, werde ich ein Praktikum machen."
      },
      {
        "skill": "Sprechen Teil 3",
        "question": "Warum lernst du Deutsch? Was machst du, wenn du Zeit hast?",
        "answerGuide": "Ich lerne Deutsch, weil … / Wenn ich Zeit habe, … → Verb goes to END of the weil/wenn clause."
      },
      {
        "skill": "Lesen Teil 2",
        "question": "Read: 'Er geht nicht aus, obwohl das Wetter schön ist.' Is he going out? → False.",
        "answerGuide": "obwohl (although) signals a contrast — despite the nice weather, he stays in."
      }
    ],
    "mission": {
      "concept": "Verb-final subordinate clauses are the #1 complexity marker in A2 writing. Mastering them lifts both written and spoken scores.",
      "purpose": "Automate the verb-to-end rule so it is natural in timed exam conditions.",
      "steps": [
        "Write 8 sentences using weil(×2), dass(×2), wenn(×2), ob(×1), obwohl(×1)",
        "In each sentence, circle the verb at the END of the subordinate clause",
        "Add a comma before every conjunction — check each one",
        "Read aloud — if you pause after the verb, the clause is correct"
      ],
      "evidence": "8 written sentences with circled end-verbs and commas annotated",
      "successCriteria": [
        "Every conjunction followed by subject → ... → VERB at end",
        "Commas present before all 8 conjunctions",
        "Correct choice of weil vs denn (weil = verb-final; denn = verb stays in position 2)"
      ]
    }
  },

  "a2-m04": {
    "title": "Work, Career and Ambitions",
    "sampleQuestions": [
      {
        "skill": "Sprechen Teil 1",
        "question": "Was machen Sie beruflich? Seit wann arbeiten Sie dort?",
        "answerGuide": "Ich arbeite als … bei … Seit … Jahren bin ich dort. Ich möchte in Zukunft … → No article after 'bin': Ich bin Ingenieur."
      },
      {
        "skill": "Schreiben Teil 2",
        "question": "Write a short application email (50 words) for a part-time position.",
        "answerGuide": "Sehr geehrte Damen und Herren, ich bewerbe mich um … Ich habe … Jahre Erfahrung in … Ich würde mich über eine Einladung freuen. Mit freundlichen Grüßen, …"
      },
      {
        "skill": "Lesen Teil 3",
        "question": "Who is suitable for this job? → Advert says: Teilzeit, Erfahrung nicht nötig, flexible Zeiten.",
        "answerGuide": "Match EVERY condition listed. Partial matches are distractors designed to trap fast readers."
      }
    ],
    "mission": {
      "concept": "Work vocabulary + Konjunktiv II (würde) is the core of A2 Sprechen Teil 1 and formal Schreiben. Both are always tested.",
      "purpose": "Build confident, natural-sounding job descriptions and professional emails.",
      "steps": [
        "Write your 3-sentence professional introduction: job, company, years of experience",
        "Write 2 sentences about what you would like in your future career (würde + inf)",
        "Write a mock application email (50 words) for a job you would actually want",
        "Check: no article after 'Ich bin'; 'sich bewerben um + Akkusativ'; 'Mit freundlichen Grüßen' closing"
      ],
      "evidence": "Professional bio (5 sentences) + mock application email",
      "successCriteria": [
        "No article after Ich bin [Beruf]",
        "würde + infinitive for wishes and polite offers",
        "Application email has Anrede + 3 content points + closing"
      ]
    }
  },

  "a2-m05": {
    "title": "City Life, Media and Environment",
    "sampleQuestions": [
      {
        "skill": "Sprechen Teil 3",
        "question": "Finden Sie das Leben in der Stadt besser als auf dem Land? Warum?",
        "answerGuide": "Das Leben in der Stadt ist … als auf dem Land, weil … Am liebsten wohne ich …, weil … → Use comparative + weil clause."
      },
      {
        "skill": "Schreiben Teil 2",
        "question": "Write 50 words comparing two cities or places you know.",
        "answerGuide": "X ist größer/teurer/schöner als Y. Am besten gefällt mir … Ich interessiere mich für … → Two comparatives + one superlative + one reflexive verb."
      },
      {
        "skill": "Lesen Teil 3",
        "question": "Which eco-tip matches 'using public transport'? → Scan for Verkehrsmittel / Bus / Bahn keywords.",
        "answerGuide": "Scan for key words from the question in the text. Don't read everything — match the concept."
      }
    ],
    "mission": {
      "concept": "Comparatives and reflexive verbs together create the complex A2 opinions that examiners reward in Sprechen and Schreiben.",
      "purpose": "Automate comparative structure and reflexive pronouns so they are fluent under exam pressure.",
      "steps": [
        "Write a 60-word paragraph comparing two cities: 3 comparatives, 1 superlative, 2 reflexive verbs",
        "Include at least one weil clause to give a reason",
        "Read aloud — are all reflexive pronouns correct? (ich→mich, du→dich, er/sie/es→sich)",
        "Check: 'so … wie' for equal comparison; 'als' after comparative'"
      ],
      "evidence": "Written city comparison (60 words) with comparatives and reflexive verbs highlighted",
      "successCriteria": [
        "3 comparatives correctly formed (adjective + -er + als)",
        "Superlative correct: am + adjective + -sten",
        "Reflexive pronouns match subject person in all cases"
      ]
    }
  },

  "a2-m06": {
    "title": "A2 Exam Strategy and Mock",
    "sampleQuestions": [
      {
        "skill": "Schreiben Teil 2",
        "question": "Write a 45-word message to a colleague about rescheduling a meeting (include greeting, reason, new time, sign-off).",
        "answerGuide": "Hallo …, ich kann leider am … nicht kommen, weil … Könnten wir den Termin auf … verschieben? Bitte gib mir Bescheid. Viele Grüße, …"
      },
      {
        "skill": "Sprechen Teil 1",
        "question": "Stellen Sie sich vor: Name, Herkunft, Wohnort, Beruf, Deutsch lernen.",
        "answerGuide": "Ich heiße … Ich komme aus … Ich wohne seit … in … Ich bin … von Beruf. Ich lerne Deutsch, weil … → Use all 5 points in 90 seconds."
      },
      {
        "skill": "Hören",
        "question": "Strategy: what should you do BEFORE the recording starts?",
        "answerGuide": "Read ALL answer options for the upcoming task — this primes your brain to listen for specific words, numbers and concepts."
      }
    ],
    "mission": {
      "concept": "Exam readiness means knowing WHERE marks come from and WHAT to do in each section — not just knowing the language.",
      "purpose": "Simulate a full A2 exam sitting to identify your weakest section before the real exam.",
      "steps": [
        "Complete a timed A2 Hören mock (30 min) using the Goethe online practice test",
        "Complete a timed A2 Lesen mock (30 min)",
        "Write a full Schreiben Teil 2 in 15 min — then self-check: greeting? 3 points? sign-off? <55 words?",
        "Record yourself doing a 90-second Sprechen Teil 1 introduction — review for grammar errors"
      ],
      "evidence": "Score card: Hören (/30), Lesen (/30), Schreiben (/20), Sprechen (/20) + error note for each section",
      "successCriteria": [
        "Total mock score ≥ 60/100",
        "Schreiben Teil 2: greeting + 3 content points + sign-off all present",
        "Sprechen Teil 1: name, origin, city, job, why learning German — all 5 covered in 90 seconds"
      ]
    }
  }
};
