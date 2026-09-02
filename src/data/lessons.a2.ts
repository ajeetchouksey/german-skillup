import type { LevelContent } from "@/types";

// Original learning content aligned to Goethe-Zertifikat A2 structure.
// Not an official Goethe-Institut product. Does not reproduce official test materials.
export const lessonsA2: LevelContent = {
  "level": "A2",
  "language": "German",
  "modules": [
    {
      "id": "a2-m01",
      "title": "Perfekt — Talking About the Past",
      "icon": "🕐",
      "syllabusTheme": "Grammatik A2: Perfekt mit haben und sein",
      "lessons": [
        {
          "id": "a2-m01-l01",
          "title": "Perfekt: haben vs. sein",
          "examMapping": ["Schreiben Teil 2", "Sprechen Teil 2", "Lesen Teil 2"],
          "objectives": [
            "Form the Perfekt with haben and sein correctly",
            "Choose the correct auxiliary (haben vs. sein) for common verbs",
            "Identify regular and irregular past participles",
            "Narrate recent events and past experiences"
          ],
          "grammar": [
            "Perfekt = haben/sein (conjugated) + Partizip II (sentence end)",
            "Regular Partizip II: ge- + stem + -t  → gemacht, gekauft, gespielt",
            "Irregular Partizip II: ge- + stem change + -en → gegessen, getrunken, geschlafen",
            "Sein verbs: movement (fahren, gehen, kommen, fliegen) and state change (aufwachen, aufstehen, werden)",
            "Mixed verbs: haben (present) + irregular Partizip II → gebracht, gewusst, gedacht",
            "Separable verbs: ge- goes between prefix and stem → aufgestanden, eingekauft, angerufen",
            "Negation in Perfekt: Ich habe nicht geschlafen. Ich bin nicht gegangen."
          ],
          "vocab": [
            { "de": "gemacht (machen)", "en": "done / made", "example": "Ich habe die Hausaufgaben gemacht." },
            { "de": "gegessen (essen)", "en": "eaten", "example": "Wir haben zusammen gegessen." },
            { "de": "getrunken (trinken)", "en": "drunk", "example": "Hast du Kaffee getrunken?" },
            { "de": "geschrieben (schreiben)", "en": "written", "example": "Er hat eine E-Mail geschrieben." },
            { "de": "gelesen (lesen)", "en": "read", "example": "Ich habe das Buch gelesen." },
            { "de": "gesehen (sehen)", "en": "seen / watched", "example": "Wir haben einen Film gesehen." },
            { "de": "gehört (hören)", "en": "heard / listened", "example": "Ich habe Musik gehört." },
            { "de": "gekauft (kaufen)", "en": "bought", "example": "Sie hat neue Schuhe gekauft." },
            { "de": "gearbeitet (arbeiten)", "en": "worked", "example": "Er hat viel gearbeitet." },
            { "de": "gefahren (fahren)", "en": "driven / travelled", "example": "Ich bin mit dem Zug gefahren." },
            { "de": "gegangen (gehen)", "en": "gone / walked", "example": "Wir sind ins Kino gegangen." },
            { "de": "gekommen (kommen)", "en": "come / arrived", "example": "Sie ist um 10 Uhr gekommen." },
            { "de": "geflogen (fliegen)", "en": "flown", "example": "Er ist nach Berlin geflogen." },
            { "de": "aufgestanden (aufstehen)", "en": "got up", "example": "Ich bin um 7 Uhr aufgestanden." },
            { "de": "eingekauft (einkaufen)", "en": "done shopping", "example": "Sie hat im Supermarkt eingekauft." },
            { "de": "angerufen (anrufen)", "en": "called / phoned", "example": "Er hat mich angerufen." },
            { "de": "gebracht (bringen)", "en": "brought", "example": "Sie hat Blumen gebracht." },
            { "de": "gewusst (wissen)", "en": "known", "example": "Ich habe das nicht gewusst." },
            { "de": "gesprochen (sprechen)", "en": "spoken", "example": "Hast du mit dem Chef gesprochen?" },
            { "de": "geschlafen (schlafen)", "en": "slept", "example": "Ich habe gut geschlafen." }
          ],
          "examples": [
            "Gestern habe ich viel gearbeitet und dann einen Film gesehen.",
            "Wir sind um 9 Uhr aufgestanden und haben gefrühstückt.",
            "Sie hat neue Schuhe gekauft — sie sind sehr schön.",
            "Er ist mit dem Fahrrad zur Arbeit gefahren.",
            "Hast du Jana angerufen? — Ja, ich habe sie gestern angerufen.",
            "Die Kinder haben im Park gespielt und Eis gegessen."
          ],
          "usefulPhrases": [
            "Gestern habe ich …",
            "Am Wochenende bin ich …",
            "Letzte Woche haben wir …",
            "Hast du …?",
            "Ich habe noch nicht …",
            "Was hast du gemacht?"
          ],
          "listeningTask": {
            "title": "Weekend story",
            "instruction": "Listen to two people talking about their weekends. Note what each person did using Perfekt verbs. Answer: What did person A do on Saturday? What did person B do on Sunday?",
            "examPart": "Hören Teil 2",
            "timeMinutes": 8,
            "checklist": [
              "Listen for haben/sein as auxiliary verb clues",
              "Note the Partizip II at sentence end",
              "Write key verbs, not full sentences"
            ]
          },
          "readingTask": {
            "title": "Weekend email",
            "instruction": "Read a short email from a friend describing their weekend. Answer five richtig/falsch statements. Focus on what happened (Perfekt), when, and with whom.",
            "examPart": "Lesen Teil 2",
            "timeMinutes": 8
          },
          "writingTask": {
            "title": "Write about your last weekend",
            "instruction": "Write 40–50 words describing what you did last weekend. Use at least 4 Perfekt constructions, both haben and sein.",
            "modelAnswer": "Am Wochenende bin ich aufgestanden und habe gefrühstückt. Dann bin ich ins Stadtzentrum gefahren und habe eingekauft. Abends haben meine Freunde und ich einen Film gesehen. Es war sehr schön!",
            "examPart": "Schreiben Teil 2",
            "timeMinutes": 12
          },
          "speakingTask": {
            "title": "Tell me about your last holiday",
            "instruction": "Describe your last holiday or a memorable weekend in 5–7 sentences using Perfekt. Include: where you went, how you travelled, what you did, what you ate, how it was.",
            "modelAnswer": "Letzten Sommer bin ich nach München gefahren. Ich bin mit dem Zug gefahren. Ich habe die Sehenswürdigkeiten besucht und viel fotografiert. Abends haben wir in einem Restaurant gegessen — sehr lecker! Es hat mir sehr gut gefallen.",
            "examPart": "Sprechen Teil 2",
            "timeMinutes": 3
          },
          "realLifeTask": "Write a short diary entry (50 words) about yesterday in German, using only Perfekt. Cover: when you woke up, what you ate, what you did at work or home, and what you did in the evening.",
          "examFocus": [
            "Perfekt is THE dominant past tense in spoken and informal written German",
            "Sein verbs: movement (fahren, gehen, fliegen, laufen) and state change (aufstehen, aufwachen)",
            "Separable verb ge- placement: aufgestanden, NOT geaufgestanden",
            "Schreiben Teil 2 often asks about past events — Perfekt is essential"
          ],
          "commonMistakes": [
            "'Ich bin gemacht' → wrong auxiliary — machen takes haben: Ich habe gemacht",
            "'gegangen' with haben: 'Ich habe gegangen' → Ich bin gegangen",
            "'Ich habe aufgestanden' → movement/state change: Ich bin aufgestanden",
            "Partizip II after object, not after verb: 'Ich habe es gegessen' NOT 'Ich habe gegessen es'"
          ],
          "quiz": [
            {
              "q": "Which auxiliary does 'fahren' use in the Perfekt?",
              "options": ["haben", "sein", "werden", "Both haben and sein"],
              "answer": "sein",
              "explanation": "fahren is a movement verb → Perfekt with sein: Ich bin gefahren."
            },
            {
              "q": "What is the Partizip II of 'schreiben'?",
              "options": ["geschrieben", "geschreibt", "schrieben", "geSchreiben"],
              "answer": "geschrieben",
              "explanation": "schreiben is irregular: ge- + changed stem -schrieb + -en → geschrieben."
            },
            {
              "q": "Correct the error: 'Ich habe gegangen ins Kino.'",
              "options": [
                "Ich bin gegangen ins Kino.",
                "Ich bin ins Kino gegangen.",
                "Ich habe ins Kino gegangen.",
                "Ich bin ins Kino geht."
              ],
              "answer": "Ich bin ins Kino gegangen.",
              "explanation": "gehen = sein verb; Partizip II goes to sentence END: Ich bin ins Kino gegangen."
            },
            {
              "q": "What is the Perfekt of 'einkaufen' (separable)?",
              "options": ["habe geinkauft", "habe eingekauft", "bin eingekauft", "habe einkauft"],
              "answer": "habe eingekauft",
              "explanation": "Separable: ge- inserts between prefix and stem: ein-ge-kauft → eingekauft. einkaufen takes haben."
            }
          ]
        }
      ]
    },
    {
      "id": "a2-m02",
      "title": "Dative Case & Prepositions",
      "icon": "🔗",
      "syllabusTheme": "Grammatik A2: Dativ; Dativpräpositionen; Wechselpräpositionen",
      "lessons": [
        {
          "id": "a2-m02-l01",
          "title": "Dative Articles and Core Prepositions",
          "examMapping": ["Schreiben Teil 2", "Sprechen Teil 2", "Lesen Teil 1"],
          "objectives": [
            "Use dative articles: dem, der, dem, den+n",
            "Use dative-only prepositions: aus, bei, mit, nach, seit, von, zu, gegenüber",
            "Distinguish dative (location) vs accusative (direction) with two-way prepositions",
            "Apply dative in indirect object constructions: geben, schenken, helfen, sagen"
          ],
          "grammar": [
            "Dative articles: der→dem, die→der, das→dem, die(pl.)→den (+ noun gets -n if no -n ending)",
            "Dative prepositions (always dative): aus, bei, mit, nach, seit, von, zu, gegenüber",
            "aus: origin or material — Ich komme aus Polen. Das Tisch ist aus Holz.",
            "bei: at someone's place or company — Ich wohne bei meinen Eltern. Ich arbeite bei BMW.",
            "mit: with (person/thing) — Ich fahre mit dem Bus. Ich komme mit meiner Freundin.",
            "nach: direction (cities/countries without article) — Ich fahre nach Berlin. / nach Hause",
            "seit: since/for (with present tense for ongoing) — Ich lerne seit drei Jahren Deutsch.",
            "von: from / about / by — Das ist ein Brief von meiner Mutter.",
            "zu: to (person, place, event) — Ich gehe zum Arzt. Ich komme zu dir.",
            "Wechselpräpositionen: in/an/auf/über/unter/vor/hinter/neben/zwischen — Wo? (Dativ) vs Wohin? (Akkusativ)"
          ],
          "vocab": [
            { "de": "aus + Dativ", "en": "from (origin); out of", "example": "Er kommt aus der Schweiz." },
            { "de": "bei + Dativ", "en": "at; near; with (at s.o.'s place)", "example": "Ich wohne bei meiner Schwester." },
            { "de": "mit + Dativ", "en": "with; by (transport)", "example": "Ich fahre mit dem Fahrrad." },
            { "de": "nach + Dativ", "en": "to (cities/countries); after", "example": "Sie fährt nach Wien." },
            { "de": "seit + Dativ", "en": "since; for (ongoing)", "example": "Ich lerne seit zwei Jahren Deutsch." },
            { "de": "von + Dativ", "en": "from; of; by", "example": "Das Paket ist von meiner Mutter." },
            { "de": "zu + Dativ", "en": "to (person/event)", "example": "Ich gehe zum Supermarkt." },
            { "de": "gegenüber + Dativ", "en": "opposite; across from", "example": "Das Café ist gegenüber dem Bahnhof." },
            { "de": "in + Dativ (Wo?)", "en": "in (location)", "example": "Die Bücher liegen im Regal." },
            { "de": "in + Akkusativ (Wohin?)", "en": "into (direction)", "example": "Ich lege das Buch ins Regal." },
            { "de": "auf + Dativ (Wo?)", "en": "on (location)", "example": "Das Glas steht auf dem Tisch." },
            { "de": "auf + Akkusativ (Wohin?)", "en": "onto (direction)", "example": "Ich stelle das Glas auf den Tisch." },
            { "de": "der Nachbar, -n", "en": "neighbour", "example": "Ich spreche oft mit meinem Nachbarn." },
            { "de": "die Haltestelle, -n", "en": "bus/tram stop", "example": "Die Haltestelle ist gegenüber dem Hotel." },
            { "de": "der Bahnhof, Bahnhöfe", "en": "train station", "example": "Ich gehe zum Bahnhof." },
            { "de": "helfen (hilft) + Dativ", "en": "to help (s.o.)", "example": "Kann ich dir helfen?" },
            { "de": "gehören + Dativ", "en": "to belong to (s.o.)", "example": "Das Fahrrad gehört meinem Bruder." },
            { "de": "seit wann?", "en": "since when? / how long?", "example": "Seit wann lernst du Deutsch?" }
          ],
          "examples": [
            "Ich fahre mit dem Bus zum Bahnhof.",
            "Sie wohnt seit zwei Jahren in Deutschland.",
            "Das Café ist gegenüber dem Supermarkt.",
            "Ich komme aus Indien und wohne jetzt bei einem Freund.",
            "Wo ist die Katze? — Sie sitzt auf dem Tisch.",
            "Die Katze springt auf den Tisch. (Wohin → Akkusativ)"
          ],
          "usefulPhrases": [
            "Ich fahre mit …",
            "Seit wann …?",
            "Wo wohnst du? — Bei …",
            "Wie komme ich zum/zur …?",
            "Das liegt gegenüber …",
            "Von wem ist das?"
          ],
          "listeningTask": {
            "title": "Giving and following directions",
            "instruction": "Listen to directions to a café in a city. Note the key prepositions and landmarks. Can you follow the route on a simple map?",
            "examPart": "Hören Teil 2",
            "timeMinutes": 7,
            "checklist": [
              "Note Wo? vs Wohin? signals (location vs movement)",
              "Listen for seit + time phrases",
              "Mark the preposition used with each landmark"
            ]
          },
          "readingTask": {
            "title": "Email about a new flat",
            "instruction": "Read a short email from a friend describing their new flat and neighbourhood. Answer five richtig/falsch questions about location, neighbours and transport.",
            "examPart": "Lesen Teil 1",
            "timeMinutes": 8
          },
          "writingTask": {
            "title": "Describe where you live",
            "instruction": "Write 40–50 words describing where you live: area, what is nearby, how you commute, how long you have lived there.",
            "modelAnswer": "Ich wohne seit einem Jahr in München, bei meiner Freundin. Unsere Wohnung liegt im Stadtzentrum — gegenüber dem Park. Ich fahre mit der U-Bahn zur Arbeit. Die U-Bahnhaltestelle ist nur 5 Minuten von uns entfernt.",
            "examPart": "Schreiben Teil 2",
            "timeMinutes": 12
          },
          "speakingTask": {
            "title": "Describe your neighbourhood",
            "instruction": "Tell your language partner where you live and what is near your home. Use at least 3 dative prepositions and answer follow-up questions.",
            "modelAnswer": "Ich wohne in Hamburg, bei meinen Eltern. Von meiner Wohnung aus bin ich schnell mit dem Bus in der Innenstadt. Gegenüber unserem Haus ist ein kleiner Park. Seit drei Jahren wohne ich hier.",
            "examPart": "Sprechen Teil 2",
            "timeMinutes": 4
          },
          "realLifeTask": "Write 5 sentences about your daily commute using dative prepositions: How do you travel? From where? To where? What is near your home or workplace?",
          "examFocus": [
            "seit + present tense (NOT Perfekt) for ongoing states: Ich lerne seit 3 Jahren Deutsch.",
            "Wo? → dative; Wohin? → accusative — with two-way prepositions this is always tested",
            "zum = zu + dem; zur = zu + der — memorise these contractions",
            "Dative plural: den Eltern, den Kindern, den Nachbarn (adds -n if noun doesn't end in -n)"
          ],
          "commonMistakes": [
            "'Ich fahre nach dem Supermarkt' → zu: Ich fahre zum Supermarkt (zu for places with articles)",
            "'Ich wohne seit drei Jahren in Berlin' with Perfekt → keep present tense with seit",
            "'Das Buch liegt auf den Tisch' → Wo? = dative: auf dem Tisch",
            "'mit den Bus' → mit + dative: mit dem Bus"
          ],
          "quiz": [
            {
              "q": "Which preposition means 'since / for (ongoing)'?",
              "options": ["von", "nach", "seit", "bis"],
              "answer": "seit",
              "explanation": "seit + present tense describes an action that started in the past and continues now."
            },
            {
              "q": "'Ich fahre ___ Bahnhof.' (to the train station)",
              "options": ["nach dem", "zum", "bei dem", "von dem"],
              "answer": "zum",
              "explanation": "zu + dem = zum. Places with a definite article use 'zu', not 'nach'."
            },
            {
              "q": "Wo liegt das Café? Es liegt ___ dem Supermarkt.",
              "options": ["gegenüber", "nach", "von", "seit"],
              "answer": "gegenüber",
              "explanation": "gegenüber + dative = opposite/across from."
            },
            {
              "q": "The cat jumps ONTO the table. Which is correct?",
              "options": ["Die Katze springt auf dem Tisch.", "Die Katze springt auf den Tisch.", "Die Katze liegt auf den Tisch.", "Die Katze ist auf den Tisch."],
              "answer": "Die Katze springt auf den Tisch.",
              "explanation": "Wohin? (direction) → accusative: auf den Tisch. (Wo? → auf dem Tisch)"
            }
          ]
        }
      ]
    },
    {
      "id": "a2-m03",
      "title": "Subordinating Conjunctions",
      "icon": "🔀",
      "syllabusTheme": "Grammatik A2: Nebensätze mit weil, dass, wenn, ob",
      "lessons": [
        {
          "id": "a2-m03-l01",
          "title": "weil, dass, wenn, ob — Verb-Final Clauses",
          "examMapping": ["Schreiben Teil 2", "Sprechen Teil 3", "Lesen Teil 2"],
          "objectives": [
            "Form subordinate clauses with verb at the end",
            "Use weil (because), dass (that), wenn (when/if), ob (whether/if) correctly",
            "Link two ideas into a single complex sentence",
            "Distinguish wenn (conditional/habitual) vs als (single past event)"
          ],
          "grammar": [
            "Subordinate clause rule: conjunction → subject → … → VERB (verb goes to END)",
            "weil (because): Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte.",
            "dass (that): Ich glaube, dass Deutsch schwierig ist.",
            "wenn (when/if — present/repeated): Wenn ich Zeit habe, gehe ich spazieren.",
            "ob (whether): Ich weiß nicht, ob das stimmt.",
            "als (when — single past event): Als ich Kind war, wohnte ich in Indien.",
            "Modal in Nebensatz: Ich hoffe, dass ich die Prüfung bestehen kann.",
            "Perfekt in Nebensatz: Ich bin froh, dass er angerufen hat.",
            "Comma is obligatory before all subordinating conjunctions"
          ],
          "vocab": [
            { "de": "weil", "en": "because", "example": "Ich bin müde, weil ich nicht geschlafen habe." },
            { "de": "dass", "en": "that (conjunction)", "example": "Ich denke, dass das eine gute Idee ist." },
            { "de": "wenn", "en": "when / if (present/habitual)", "example": "Wenn es regnet, nehme ich einen Regenschirm." },
            { "de": "ob", "en": "whether / if (indirect question)", "example": "Ich frage mich, ob er kommt." },
            { "de": "als", "en": "when (single past event)", "example": "Als ich jung war, hatte ich viele Hobbys." },
            { "de": "obwohl", "en": "although / even though", "example": "Ich gehe spazieren, obwohl es regnet." },
            { "de": "deshalb / deswegen", "en": "therefore / that's why", "example": "Es regnet. Deshalb nehme ich einen Schirm." },
            { "de": "trotzdem", "en": "nevertheless / still", "example": "Es ist kalt, trotzdem gehe ich laufen." },
            { "de": "glauben, dass …", "en": "to believe / think that …", "example": "Ich glaube, dass er Recht hat." },
            { "de": "hoffen, dass …", "en": "to hope that …", "example": "Ich hoffe, dass du bald gesund wirst." },
            { "de": "wissen, ob …", "en": "to know whether …", "example": "Weißt du, ob das Geschäft offen ist?" },
            { "de": "finden, dass …", "en": "to find / think that …", "example": "Ich finde, dass Berlin sehr schön ist." }
          ],
          "examples": [
            "Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte.",
            "Ich glaube, dass Deutsch nach ein paar Monaten leichter wird.",
            "Wenn ich Zeit habe, gehe ich gern ins Museum.",
            "Weißt du, ob das Restaurant heute geöffnet ist?",
            "Als ich in München war, habe ich viele nette Leute kennengelernt.",
            "Ich bin müde, obwohl ich gut geschlafen habe."
          ],
          "usefulPhrases": [
            "Ich finde/denke/glaube, dass …",
            "Ich lerne Deutsch, weil …",
            "Wenn ich … habe, …",
            "Ich weiß nicht, ob …",
            "Es tut mir leid, dass …",
            "Ich bin froh, dass …"
          ],
          "listeningTask": {
            "title": "Reasons and opinions",
            "instruction": "Listen to two people giving reasons for their choices (which city to live in, which job to take). Note the weil clauses. What reasons does each person give?",
            "examPart": "Hören Teil 2",
            "timeMinutes": 7,
            "checklist": [
              "Listen for weil/dass/ob — verb comes at end of clause",
              "Note opinion phrases: Ich finde, dass… / Ich denke, dass…",
              "Verb at the END of the weil-clause is the key information"
            ]
          },
          "readingTask": {
            "title": "Opinion forum post",
            "instruction": "Read a short online forum post where someone explains why they are learning German. Identify the reasons given (weil/dass clauses) and answer comprehension questions.",
            "examPart": "Lesen Teil 2",
            "timeMinutes": 8
          },
          "writingTask": {
            "title": "Explain your reasons",
            "instruction": "Write 40–50 words explaining why you are learning German and what you plan to do with it. Use at least one weil clause, one dass clause and one wenn clause.",
            "modelAnswer": "Ich lerne Deutsch, weil ich in Deutschland studieren möchte. Ich glaube, dass Deutsch sehr nützlich ist. Wenn ich gut genug spreche, werde ich ein Praktikum in Berlin machen. Ich hoffe, dass ich die A2-Prüfung bald bestehe.",
            "examPart": "Schreiben Teil 2",
            "timeMinutes": 12
          },
          "speakingTask": {
            "title": "Give reasons and opinions",
            "instruction": "Your exam partner asks: 'Warum lernst du Deutsch?' Answer with at least 3 connected sentences using weil, dass and wenn.",
            "modelAnswer": "Ich lerne Deutsch, weil ich deutsche Kollegen habe. Ich finde, dass Deutsch für meinen Beruf sehr wichtig ist. Wenn ich gut Deutsch spreche, kann ich besser kommunizieren. Außerdem möchte ich Deutschland besuchen.",
            "examPart": "Sprechen Teil 3",
            "timeMinutes": 3
          },
          "realLifeTask": "Write a short paragraph (50 words) about your current life situation using all four conjunctions: weil, dass, wenn, ob. Example topics: why you live where you live, what you think about your job, what you do when you're free.",
          "examFocus": [
            "Verb always goes to THE END in weil/dass/wenn/ob clauses — this is always tested",
            "Comma before the conjunction is obligatory in German writing",
            "Modal in Nebensatz: 'dass ich kommen kann' NOT 'dass ich kann kommen'",
            "weil (subordinate, verb-final) vs denn (coordinating, verb stays position 2)"
          ],
          "commonMistakes": [
            "'Ich lerne Deutsch, weil ich möchte in Deutschland arbeiten' → verb at end: weil ich in Deutschland arbeiten möchte",
            "Forgetting the comma: 'Ich denke dass…' → Ich denke, dass…",
            "Using wenn for single past events: 'Wenn ich jung war' → Als ich jung war",
            "'ob' in direct questions: 'Ob er kommt?' is an indirect question embedded in 'Ich weiß nicht, ob er kommt.'"
          ],
          "quiz": [
            {
              "q": "Which sentence is grammatically correct?",
              "options": [
                "Ich lerne Deutsch, weil ich möchte reisen.",
                "Ich lerne Deutsch, weil ich reisen möchte.",
                "Ich lerne Deutsch weil, ich reisen möchte.",
                "Ich lerne Deutsch, weil reisen ich möchte."
              ],
              "answer": "Ich lerne Deutsch, weil ich reisen möchte.",
              "explanation": "In a weil-clause: conjunction + subject + objects + VERB at the very end."
            },
            {
              "q": "Which conjunction means 'whether'?",
              "options": ["weil", "dass", "wenn", "ob"],
              "answer": "ob",
              "explanation": "'ob' introduces indirect yes/no questions: Ich weiß nicht, ob er kommt."
            },
            {
              "q": "Single past event: ___ ich in Berlin war, habe ich viele Museen besucht.",
              "options": ["Wenn", "Ob", "Als", "Weil"],
              "answer": "Als",
              "explanation": "'als' is used for a single event in the past; 'wenn' is for habitual/conditional."
            },
            {
              "q": "Complete: Ich bin froh, ___ du mir geholfen hast.",
              "options": ["weil", "dass", "ob", "wenn"],
              "answer": "dass",
              "explanation": "'dass' introduces a content clause (like 'that' in English): I'm glad THAT you helped me."
            }
          ]
        }
      ]
    },
    {
      "id": "a2-m04",
      "title": "Work, Career and Ambitions",
      "icon": "💼",
      "syllabusTheme": "Goethe Wortliste A2: Beruf; Karriere; Zukunftspläne",
      "lessons": [
        {
          "id": "a2-m04-l01",
          "title": "Jobs, Qualifications and Future Plans",
          "examMapping": ["Sprechen Teil 1", "Schreiben Teil 2", "Lesen Teil 2"],
          "objectives": [
            "Describe your job, workplace and daily work routine",
            "Talk about qualifications, training and career plans",
            "Use Konjunktiv II (würde + inf) for plans and wishes",
            "Understand job advertisements and workplace messages"
          ],
          "grammar": [
            "Konjunktiv II for polite wishes/plans: Ich würde gern … / Ich möchte …",
            "würde + infinitive: Ich würde gerne mehr verdienen. Sie würde lieber im Ausland arbeiten.",
            "Könnte (could): Könnten Sie mir bitte helfen? Ich könnte früher kommen.",
            "Future with werden: Ich werde nächstes Jahr eine Ausbildung machen.",
            "Job + indefinite article: Ich bin Ingenieur/Lehrerin. (no article in German!)",
            "als + job: Ich arbeite als Programmierer. Sie ist als Ärztin tätig.",
            "Comparative adjectives: Dieses Gehalt ist besser. Der neue Job ist interessanter."
          ],
          "vocab": [
            { "de": "der Beruf, -e", "en": "profession / job", "example": "Was ist Ihr Beruf?" },
            { "de": "die Ausbildung, -en", "en": "vocational training / apprenticeship", "example": "Ich mache eine Ausbildung als Koch." },
            { "de": "das Studium, Studien", "en": "university studies", "example": "Mein Studium dauert vier Jahre." },
            { "de": "der Abschluss, -schlüsse", "en": "qualification / degree", "example": "Ich habe einen Bachelorabschluss." },
            { "de": "die Stelle, -n / die Stellen", "en": "job position", "example": "Ich bewerbe mich um diese Stelle." },
            { "de": "der Kollege, -n / die Kollegin", "en": "colleague (m/f)", "example": "Meine Kollegen sind sehr nett." },
            { "de": "der Chef, -s / die Chefin", "en": "boss (m/f)", "example": "Mein Chef ist sehr streng." },
            { "de": "das Gehalt, -hälter", "en": "salary", "example": "Das Gehalt ist nicht so hoch." },
            { "de": "die Überstunden (pl.)", "en": "overtime", "example": "Ich mache oft Überstunden." },
            { "de": "sich bewerben (um)", "en": "to apply (for)", "example": "Ich habe mich um die Stelle beworben." },
            { "de": "kündigen", "en": "to resign / to quit", "example": "Er hat seine Stelle gekündigt." },
            { "de": "entlassen (entlässt)", "en": "to dismiss / to lay off", "example": "Die Firma hat ihn entlassen." },
            { "de": "die Erfahrung, -en", "en": "experience", "example": "Ich habe drei Jahre Erfahrung in IT." },
            { "de": "die Fähigkeit, -en", "en": "skill / ability", "example": "Welche Fähigkeiten brauchen Sie?" },
            { "de": "der Lebenslauf, -läufe", "en": "CV / résumé", "example": "Schicken Sie bitte Ihren Lebenslauf." },
            { "de": "das Vorstellungsgespräch, -e", "en": "job interview", "example": "Ich habe morgen ein Vorstellungsgespräch." },
            { "de": "Vollzeit / Teilzeit", "en": "full-time / part-time", "example": "Ich arbeite Teilzeit — 20 Stunden pro Woche." },
            { "de": "das Praktikum, -ka", "en": "internship", "example": "Ich mache ein Praktikum in einer Klinik." }
          ],
          "examples": [
            "Ich arbeite als Softwareentwickler bei einer kleinen Firma in Berlin.",
            "Ich würde gerne mehr verdienen, aber mein Job macht mir Spaß.",
            "Ich habe mich um eine neue Stelle beworben, weil ich mehr Erfahrung sammeln möchte.",
            "Nächstes Jahr werde ich eine Weiterbildung machen.",
            "Könnten Sie mir sagen, ob die Stelle noch frei ist?",
            "Ich arbeite Teilzeit, weil ich gleichzeitig studiere."
          ],
          "usefulPhrases": [
            "Ich arbeite als …",
            "Ich bin … von Beruf.",
            "Ich würde gerne …",
            "Ich habe … Jahre Erfahrung in …",
            "Ich bewerbe mich um …",
            "Nächstes Jahr werde ich …"
          ],
          "listeningTask": {
            "title": "Job interview radio report",
            "instruction": "Listen to a short radio feature with two people talking about their jobs and plans. Note: what do they do, what would they like to change, what are their future plans?",
            "examPart": "Hören Teil 3",
            "timeMinutes": 8,
            "checklist": [
              "Listen for 'ich würde gerne' and 'ich möchte' — future wishes",
              "Note job vocabulary and comparative phrases",
              "Check whether Perfekt or Präsens is used for each statement"
            ]
          },
          "readingTask": {
            "title": "Job advertisement",
            "instruction": "Read a job advertisement. Which of five people (with different qualifications/availability) is most suitable? Explain using information from the text.",
            "examPart": "Lesen Teil 3",
            "timeMinutes": 10
          },
          "writingTask": {
            "title": "Email applying for a job",
            "instruction": "Write 50–60 words to apply for a part-time position you have seen advertised. Mention your experience, why you are interested and when you are available.",
            "modelAnswer": "Sehr geehrte Damen und Herren, ich bewerbe mich um die Teilzeitstelle als Verkäufer. Ich habe zwei Jahre Erfahrung im Einzelhandel. Ich arbeite sehr gerne mit Kunden und bin flexibel. Ich könnte ab sofort beginnen. Mit freundlichen Grüßen, [Name]",
            "examPart": "Schreiben Teil 2",
            "timeMinutes": 15
          },
          "speakingTask": {
            "title": "Tell me about your work",
            "instruction": "Speak for 2 minutes about your current job or studies: what you do, what you like/dislike, and what your plans are for the future.",
            "modelAnswer": "Ich arbeite als IT-Consultant bei einer internationalen Firma. Die Arbeit macht mir Spaß, weil ich viel mit Menschen arbeite. Ich finde aber, dass das Gehalt nicht so gut ist. In Zukunft würde ich gerne in einem größeren Unternehmen arbeiten.",
            "examPart": "Sprechen Teil 1",
            "timeMinutes": 3
          },
          "realLifeTask": "Write your own short professional profile in German (50 words): your current job or studies, your experience, your skills, and your next career goal using 'Ich würde gerne …'.",
          "examFocus": [
            "Ich bin + job title takes NO article: Ich bin Lehrerin (not 'eine Lehrerin')",
            "Konjunktiv II (würde + inf) is essential for A2 Sprechen Teil 1 and Schreiben",
            "Comparative in descriptions: interessanter, besser, größer, mehr Erfahrung",
            "Job application emails follow a strict format: Anrede → Body → closing (freundliche Grüße)"
          ],
          "commonMistakes": [
            "'Ich bin eine Lehrerin' → drop the article: Ich bin Lehrerin",
            "'Als Beruf, ich bin …' → Ich bin … von Beruf. / Ich arbeite als …",
            "'Ich würde gerne mehr verdienen werden' → würde + infinitive (no extra werden)",
            "Confusing Ausbildung (vocational) with Studium (university)"
          ],
          "quiz": [
            {
              "q": "Which sentence says 'I am a teacher' correctly?",
              "options": [
                "Ich bin eine Lehrerin.",
                "Ich bin Lehrerin.",
                "Ich arbeite wie Lehrerin.",
                "Ich mache Lehrerin."
              ],
              "answer": "Ich bin Lehrerin.",
              "explanation": "Job titles after 'sein' in German do NOT take an article."
            },
            {
              "q": "What does 'sich bewerben um' mean?",
              "options": ["to quit", "to apply for", "to be promoted", "to retire"],
              "answer": "to apply for",
              "explanation": "sich bewerben um + Akkusativ = to apply for a position."
            },
            {
              "q": "Complete: Ich ___ gerne mehr Urlaub haben.",
              "options": ["werde", "würde", "will", "soll"],
              "answer": "würde",
              "explanation": "Konjunktiv II: würde + infinitive expresses a polite wish or hypothetical."
            },
            {
              "q": "What is 'das Vorstellungsgespräch'?",
              "options": ["a CV", "a job advertisement", "a job interview", "a resignation letter"],
              "answer": "a job interview",
              "explanation": "Vorstellung = introduction/presentation; Gespräch = conversation → job interview."
            }
          ]
        }
      ]
    },
    {
      "id": "a2-m05",
      "title": "City Life, Media and Environment",
      "icon": "🌆",
      "syllabusTheme": "Goethe Wortliste A2: Stadt; Medien; Umwelt",
      "lessons": [
        {
          "id": "a2-m05-l01",
          "title": "Urban Life, Digital Media and the Environment",
          "examMapping": ["Lesen Teil 3", "Schreiben Teil 2", "Sprechen Teil 3"],
          "objectives": [
            "Describe city features and local services",
            "Talk about media habits (TV, internet, social media)",
            "Express environmental concerns and simple sustainability actions",
            "Use Komparativ and Superlativ for comparisons"
          ],
          "grammar": [
            "Komparativ: adjective + -er → schneller, größer, teurer, interessanter",
            "Irregular comparatives: gut → besser, viel → mehr, gern → lieber, hoch → höher",
            "Superlativ: am + adjective + -sten → am schnellsten, am größten, am teuersten",
            "Irregular superlatives: gut → am besten, viel → am meisten, gern → am liebsten",
            "Comparisons: größer als; genauso groß wie; nicht so groß wie",
            "Reflexive verbs: sich interessieren für, sich ärgern über, sich freuen über + Akkusativ",
            "Passive-like construction: Es wird viel Energie verschwendet. (A2 awareness)"
          ],
          "vocab": [
            { "de": "die Innenstadt, -städte", "en": "city centre", "example": "Die Innenstadt ist sehr belebt." },
            { "de": "der Vorort, -e", "en": "suburb", "example": "Wir wohnen in einem Vorort von Berlin." },
            { "de": "das Rathaus, -häuser", "en": "town hall", "example": "Das Rathaus ist im Stadtzentrum." },
            { "de": "öffentliche Verkehrsmittel (pl.)", "en": "public transport", "example": "Ich nutze öffentliche Verkehrsmittel." },
            { "de": "das Internet", "en": "the internet", "example": "Ich nutze das Internet täglich." },
            { "de": "die App, -s", "en": "app", "example": "Diese App ist sehr praktisch." },
            { "de": "soziale Medien (pl.)", "en": "social media", "example": "Er verbringt viel Zeit in sozialen Medien." },
            { "de": "die Nachrichten (pl.)", "en": "news", "example": "Ich lese täglich die Nachrichten." },
            { "de": "die Umwelt", "en": "environment", "example": "Wir müssen die Umwelt schützen." },
            { "de": "der Müll", "en": "rubbish / waste", "example": "Bitte Müll trennen!" },
            { "de": "recyceln", "en": "to recycle", "example": "Wir recyceln Glas, Papier und Plastik." },
            { "de": "der Strom", "en": "electricity; power", "example": "Wir nutzen Ökostrom." },
            { "de": "das Fahrrad benutzen", "en": "to use a bicycle", "example": "Ich benutze das Fahrrad statt des Autos." },
            { "de": "sparen", "en": "to save (energy/money)", "example": "Man sollte Energie sparen." },
            { "de": "sich interessieren für + Akk.", "en": "to be interested in", "example": "Ich interessiere mich für Umweltthemen." },
            { "de": "sich ärgern über + Akk.", "en": "to be annoyed about", "example": "Ich ärgere mich über den Lärm." },
            { "de": "vergleichen", "en": "to compare", "example": "Ich vergleiche Preise online." }
          ],
          "examples": [
            "Das Leben in der Innenstadt ist teurer als im Vorort, aber bequemer.",
            "Ich interessiere mich für Nachrichten und lese täglich online.",
            "Am liebsten fahre ich mit dem Fahrrad — es ist schneller als der Bus.",
            "Wir sollten mehr recyceln, weil die Umwelt wichtig ist.",
            "Diese Stadt hat bessere öffentliche Verkehrsmittel als meine Heimatstadt.",
            "Ich ärgere mich über den Lärm in der Innenstadt."
          ],
          "usefulPhrases": [
            "… ist größer/besser/billiger als …",
            "Am liebsten …",
            "Ich interessiere mich für …",
            "Man sollte mehr …",
            "Das finde ich (nicht) gut, weil …",
            "Hier gibt es …"
          ],
          "listeningTask": {
            "title": "City comparison discussion",
            "instruction": "Listen to two people comparing cities they have lived in. Note the comparatives they use. Which city do they prefer and why?",
            "examPart": "Hören Teil 2",
            "timeMinutes": 8,
            "checklist": [
              "Note comparative forms: größer, besser, schöner als…",
              "Listen for reasons (weil clauses) after opinions",
              "Identify the superlative am liebsten / am besten"
            ]
          },
          "readingTask": {
            "title": "Environmental tips article",
            "instruction": "Read a short article with 5 eco-tips. Match each tip to the correct category (transport, energy, food, shopping, waste). Decide which tips you already follow.",
            "examPart": "Lesen Teil 3",
            "timeMinutes": 10
          },
          "writingTask": {
            "title": "Compare two cities or places",
            "instruction": "Write 50 words comparing your home city/town with another place you know. Use at least two comparative forms and one superlative.",
            "modelAnswer": "München ist schöner als meine Heimatstadt, aber viel teurer. Die öffentlichen Verkehrsmittel in München sind besser als zu Hause. Am liebsten wohne ich in einer Stadt, die nicht so groß, aber gut vernetzt ist.",
            "examPart": "Schreiben Teil 2",
            "timeMinutes": 12
          },
          "speakingTask": {
            "title": "Discuss media and environment",
            "instruction": "Respond to: 'Was machst du für die Umwelt?' and 'Wie informierst du dich?' Use comparatives and reflexive verbs in your answer.",
            "modelAnswer": "Für die Umwelt fahre ich lieber mit dem Fahrrad als mit dem Auto. Ich interessiere mich sehr für Umweltthemen. Ich informiere mich täglich über Nachrichten — am liebsten online, weil das schneller ist als Zeitung lesen.",
            "examPart": "Sprechen Teil 3",
            "timeMinutes": 4
          },
          "realLifeTask": "Write a 50-word paragraph comparing your media habits from 5 years ago to now. Use comparatives (mehr/weniger, besser, öfter als) and at least one reflexive verb.",
          "examFocus": [
            "Comparative -er stays on the adjective even in predicative use: Das ist größer.",
            "Umlaut in irregular comparatives: groß → größer, alt → älter, jung → jünger",
            "als (than) in comparisons vs wie (as) in gleichsetzen: so groß wie",
            "Reflexive verbs: pronoun agrees with subject — ich interessiere MICH, du interessierst DICH"
          ],
          "commonMistakes": [
            "'mehr groß' → comparative: größer (not 'mehr + adjective' like in English)",
            "'so groß als' → genauso groß WIE (als = than; wie = as)",
            "'Ich interessiere für …' → reflexive pronoun missing: Ich interessiere MICH für …",
            "'am schnellsten' — don't forget 'am': das schnellste vs am schnellsten"
          ],
          "quiz": [
            {
              "q": "What is the comparative of 'gut'?",
              "options": ["guter", "guterer", "besser", "mehr gut"],
              "answer": "besser",
              "explanation": "'gut' is irregular: Komparativ = besser; Superlativ = am besten."
            },
            {
              "q": "Berlin ist ___ als München. (bigger)",
              "options": ["mehr groß", "am größten", "größer", "am groß"],
              "answer": "größer",
              "explanation": "Comparisons use adjective + -er + als: größer als."
            },
            {
              "q": "Which sentence uses a reflexive verb correctly?",
              "options": [
                "Ich interessiere für Musik.",
                "Ich interessiere mich für Musik.",
                "Ich mich interessiere für Musik.",
                "Ich interessiere sich für Musik."
              ],
              "answer": "Ich interessiere mich für Musik.",
              "explanation": "sich interessieren für is reflexive: pronoun agrees with subject — ich → mich."
            },
            {
              "q": "'am liebsten' is the superlative of which word?",
              "options": ["lieb", "lieber", "gern", "gut"],
              "answer": "gern",
              "explanation": "gern → lieber → am liebsten. These are the irregular comparative/superlative of 'gern'."
            }
          ]
        }
      ]
    },
    {
      "id": "a2-m06",
      "title": "A2 Exam Strategy and Mock",
      "icon": "🏆",
      "syllabusTheme": "Goethe-Zertifikat A2: Prüfungsstrategie und Simulation",
      "lessons": [
        {
          "id": "a2-m06-l01",
          "title": "A2 Exam Walkthrough and Final Practice",
          "examMapping": ["Hören", "Lesen", "Schreiben", "Sprechen"],
          "objectives": [
            "Understand the A2 exam format, timing and pass mark",
            "Apply the correct strategy to each of the four sections",
            "Identify the common error patterns that cost marks at A2",
            "Complete a timed self-assessment mock with all four skills"
          ],
          "grammar": [
            "Review: Perfekt (sein/haben + Partizip II) — the most tested A2 grammar point",
            "Review: Dative prepositions — aus, bei, mit, nach, seit, von, zu, gegenüber",
            "Review: Nebensätze — verb-final with weil, dass, wenn, ob",
            "Review: Komparativ und Superlativ — besser als, am besten, so groß wie",
            "Review: Konjunktiv II — würde + inf, könnte, müsste for polite/hypothetical",
            "Review: Reflexive verbs — sich interessieren, sich freuen, sich ärgern"
          ],
          "vocab": [
            { "de": "die Prüfung, -en", "en": "exam / test", "example": "Ich mache die A2-Prüfung im Juni." },
            { "de": "bestehen (besteht)", "en": "to pass (an exam)", "example": "Ich hoffe, dass ich die Prüfung bestehe." },
            { "de": "durchfallen (fällt durch)", "en": "to fail (an exam)", "example": "Er ist leider durchgefallen." },
            { "de": "die Punktzahl, -en", "en": "score / points", "example": "Ich brauche mindestens 60 Punkte." },
            { "de": "die Aufgabe, -n", "en": "task / exercise", "example": "Lesen Sie die Aufgabe sorgfältig." },
            { "de": "sorgfältig", "en": "carefully / thoroughly", "example": "Arbeiten Sie sorgfältig und schnell." },
            { "de": "der Tipp, -s", "en": "tip / piece of advice", "example": "Ein guter Tipp: Lesen Sie zuerst die Fragen." },
            { "de": "die Anmeldung", "en": "registration", "example": "Die Prüfungsanmeldung ist online." },
            { "de": "wiederholen", "en": "to revise / review", "example": "Ich wiederhole täglich Vokabeln." },
            { "de": "die Vorbereitung, -en", "en": "preparation", "example": "Die Vorbereitung dauert drei Monate." }
          ],
          "examples": [
            "Ich lerne seit sechs Monaten Deutsch und mache bald die A2-Prüfung.",
            "Beim Hören: Lesen Sie die Aufgaben, bevor die Aufnahme beginnt.",
            "Beim Schreiben: Schreiben Sie 40–50 Wörter und kontrollieren Sie die Verbstellung.",
            "Beim Sprechen: Reagieren Sie auf den Partner — nicht nur auf den Prüfer.",
            "Ich glaube, dass ich die Prüfung bestehe, weil ich viel geübt habe.",
            "Am besten übt man täglich, auch wenn es nur 15 Minuten sind."
          ],
          "usefulPhrases": [
            "Wie bitte? Könnten Sie das wiederholen?",
            "Ich bin der Meinung, dass …",
            "Das finde ich (nicht) gut, weil …",
            "Ich würde gerne wissen, ob …",
            "Entschuldigung, ich habe die Frage nicht verstanden.",
            "Ich lerne Deutsch seit … und möchte …"
          ],
          "listeningTask": {
            "title": "Full A2 Hören simulation",
            "instruction": "Using official Goethe A2 practice materials (linked below), complete the full Hören section under the 30-minute time limit. Record your section score and note which part was hardest.",
            "examPart": "Hören (full)",
            "timeMinutes": 30,
            "checklist": [
              "Read every question set BEFORE the recording starts",
              "Mark numbers, times, names and negation words carefully",
              "Don't change a correct answer because you're unsure — trust your first instinct"
            ]
          },
          "readingTask": {
            "title": "Full A2 Lesen simulation",
            "instruction": "Using official Goethe A2 practice materials, complete the full Lesen section under the 30-minute time limit. After finishing, mark your answers and note error patterns.",
            "examPart": "Lesen (full)",
            "timeMinutes": 30,
            "checklist": [
              "Read the question BEFORE the text each time",
              "Underline the relevant sentence in the text",
              "Match all information — partial matches are distractors"
            ]
          },
          "writingTask": {
            "title": "Full A2 Schreiben simulation",
            "instruction": "Complete both Schreiben parts under 30 minutes. Teil 1: fill in the 5-field form. Teil 2: write a 40–50 word message to a colleague about a schedule change (greeting, 3 content points, sign-off).",
            "modelAnswer": "Hallo Jana, ich kann leider morgen nicht zur Besprechung kommen, weil ich krank bin. Ich würde vorschlagen, die Besprechung auf Donnerstag zu verschieben. Bitte gib mir Bescheid, ob das passt. Viele Grüße, Max",
            "examPart": "Schreiben (full)",
            "timeMinutes": 30
          },
          "speakingTask": {
            "title": "Full A2 Sprechen simulation",
            "instruction": "With a partner or alone: Part 1 (90 sec) — introduce yourself in detail. Part 2 (4 min) — use prompt cards to ask/answer about social plans. Part 3 (2 min) — make a polite request and react to your partner's request.",
            "modelAnswer": "Teil 1: Ich heiße … Ich komme aus … Ich wohne seit … in … Ich arbeite als … In meiner Freizeit … Ich lerne Deutsch, weil …\nTeil 2: Würdest du am Wochenende gerne ins Kino gehen? Wann passt es dir?\nTeil 3: Könnten Sie mir bitte helfen? Ich suche den Bahnhof.",
            "examPart": "Sprechen (full)",
            "timeMinutes": 20
          },
          "realLifeTask": "Register for or book a mock A2 exam at your local Goethe-Institut or online at bfu.goethe.de. Practice all four sections in one sitting and compare your score against 60/100 (pass mark).",
          "examFocus": [
            "A2 pass mark: 60/100 points across all four sections combined",
            "Hören and Lesen: 30 points each; Schreiben and Sprechen: 20 points each",
            "Most lost marks: Perfekt auxiliary errors and missing verb-final in Nebensätze",
            "Use the official Goethe modellsatz (practice sets) — they are identical in format to the real exam"
          ],
          "commonMistakes": [
            "Leaving blanks in Hören — always guess; a wrong answer costs the same as a blank",
            "Writing over 60 words in Schreiben Teil 2 — examiners penalise very long answers",
            "Sprechen Teil 2: only responding to examiner, not asking the partner — you must do both",
            "Schreiben: omitting greeting or sign-off — these are always required and cost marks"
          ],
          "quiz": [
            {
              "q": "What is the A2 exam pass mark?",
              "options": ["50/100", "55/100", "60/100", "70/100"],
              "answer": "60/100",
              "explanation": "You need at least 60 out of 100 points across all four sections to pass the Goethe A2 exam."
            },
            {
              "q": "In Schreiben Teil 2, how many words should you write?",
              "options": ["20–30 words", "40–50 words", "60–80 words", "100 words minimum"],
              "answer": "40–50 words",
              "explanation": "A2 Schreiben Teil 2 requires approximately 40–50 words. Significantly over or under this range risks penalties."
            },
            {
              "q": "Which grammar structure is most frequently tested in A2 Schreiben and Sprechen?",
              "options": ["Nominative articles", "Perfekt with haben/sein", "Futur I", "Passiv"],
              "answer": "Perfekt with haben/sein",
              "explanation": "Perfekt is the dominant past tense in spoken German and appears in nearly every A2 writing and speaking task."
            },
            {
              "q": "What does 'Wie bitte?' mean in a speaking exam context?",
              "options": [
                "I agree.",
                "Could you repeat that, please?",
                "I don't know.",
                "Please wait."
              ],
              "answer": "Could you repeat that, please?",
              "explanation": "'Wie bitte?' is a polite repair phrase meaning 'Pardon?' / 'Could you say that again?' — essential for the speaking exam."
            }
          ]
        }
      ]
    }
  ]
};
