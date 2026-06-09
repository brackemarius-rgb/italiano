import type { DrillSet } from "./drills";

// AUTOMATISCH ERZEUGT von scripts/build-drills.ts aus content/drills/*.json.
// Nicht von Hand bearbeiten.
export const DRILL_SETS_GENERATED: DrillSet[] = [
  {
    "id": "adjektiv-o-formen",
    "title": "Adjektive auf -o – vier Formen",
    "subtitle": "z. B. nero (schwarz)",
    "category": "Adjektive",
    "items": [
      {
        "prompt": "maskulin Singular (il cappello …)",
        "answer": "nero"
      },
      {
        "prompt": "maskulin Plural (i cappelli …)",
        "answer": "neri"
      },
      {
        "prompt": "feminin Singular (la borsa …)",
        "answer": "gialla"
      },
      {
        "prompt": "feminin Plural (le borse …)",
        "answer": "gialle"
      }
    ]
  },
  {
    "id": "adjektiv-e-formen",
    "title": "Adjektive auf -e – zwei Formen",
    "subtitle": "z. B. elegante / grande",
    "category": "Adjektive",
    "items": [
      {
        "prompt": "maskulin Singular (il maglione …)",
        "answer": "elegante"
      },
      {
        "prompt": "maskulin Plural (i maglioni …)",
        "answer": "eleganti"
      },
      {
        "prompt": "feminin Singular (la camera …)",
        "answer": "grande"
      },
      {
        "prompt": "feminin Plural (le camere …)",
        "answer": "grandi"
      }
    ]
  },
  {
    "id": "adjektiv-plural-besonderheiten",
    "title": "Plural-Besonderheiten -co/-ca/-go/-ga",
    "subtitle": "Singular → Plural",
    "category": "Adjektive",
    "items": [
      {
        "prompt": "fresca (feminin) → Plural",
        "answer": "fresche"
      },
      {
        "prompt": "fresco (maskulin) → Plural",
        "answer": "freschi"
      },
      {
        "prompt": "simpatico → Plural",
        "answer": "simpatici"
      },
      {
        "prompt": "pratico → Plural",
        "answer": "pratici"
      },
      {
        "prompt": "austriaco → Plural",
        "answer": "austriaci"
      },
      {
        "prompt": "automatico → Plural",
        "answer": "automatici"
      }
    ]
  },
  {
    "id": "articolo-determinativo-forme",
    "title": "Bestimmter Artikel – Formen",
    "subtitle": "il, lo, la, i, gli, le",
    "category": "Artikel",
    "items": [
      {
        "prompt": "maskulin Singular, vor Konsonant (libro)",
        "answer": "il"
      },
      {
        "prompt": "maskulin Singular, vor Vokal (ombrello)",
        "answer": "l'"
      },
      {
        "prompt": "maskulin Singular, vor s+Kons., z, x, y, gn, ps (studente)",
        "answer": "lo"
      },
      {
        "prompt": "feminin Singular, vor Konsonant (borsa)",
        "answer": "la"
      },
      {
        "prompt": "feminin Singular, vor Vokal (aranciata)",
        "answer": "l'"
      },
      {
        "prompt": "maskulin Plural, vor Konsonant (libri)",
        "answer": "i"
      },
      {
        "prompt": "maskulin Plural, vor Vokal / s+Kons. (ombrelli, studenti)",
        "answer": "gli"
      },
      {
        "prompt": "feminin Plural, vor Konsonant (borse)",
        "answer": "le"
      },
      {
        "prompt": "feminin Plural, vor Vokal (aranciate)",
        "answer": "le"
      }
    ]
  },
  {
    "id": "articolo-determinativo-a",
    "title": "Verschmelzung – a + Artikel",
    "subtitle": "an, zu, um",
    "category": "Artikel",
    "items": [
      {
        "prompt": "a + il",
        "answer": "al"
      },
      {
        "prompt": "a + lo",
        "answer": "allo"
      },
      {
        "prompt": "a + la",
        "answer": "alla"
      },
      {
        "prompt": "a + l'",
        "answer": "all'"
      },
      {
        "prompt": "a + i",
        "answer": "ai"
      },
      {
        "prompt": "a + le",
        "answer": "alle"
      },
      {
        "prompt": "a + gli",
        "answer": "agli"
      }
    ]
  },
  {
    "id": "articolo-determinativo-da",
    "title": "Verschmelzung – da + Artikel",
    "subtitle": "von, bei, ab",
    "category": "Artikel",
    "items": [
      {
        "prompt": "da + il",
        "answer": "dal"
      },
      {
        "prompt": "da + lo",
        "answer": "dallo"
      },
      {
        "prompt": "da + la",
        "answer": "dalla"
      },
      {
        "prompt": "da + l'",
        "answer": "dall'"
      },
      {
        "prompt": "da + i",
        "answer": "dai"
      },
      {
        "prompt": "da + le",
        "answer": "dalle"
      },
      {
        "prompt": "da + gli",
        "answer": "dagli"
      }
    ]
  },
  {
    "id": "articolo-determinativo-di",
    "title": "Verschmelzung – di + Artikel",
    "subtitle": "von, des",
    "category": "Artikel",
    "items": [
      {
        "prompt": "di + il",
        "answer": "del"
      },
      {
        "prompt": "di + lo",
        "answer": "dello"
      },
      {
        "prompt": "di + la",
        "answer": "della"
      },
      {
        "prompt": "di + l'",
        "answer": "dell'"
      },
      {
        "prompt": "di + i",
        "answer": "dei"
      },
      {
        "prompt": "di + le",
        "answer": "delle"
      },
      {
        "prompt": "di + gli",
        "answer": "degli"
      }
    ]
  },
  {
    "id": "articolo-determinativo-in",
    "title": "Verschmelzung – in + Artikel",
    "subtitle": "in, im",
    "category": "Artikel",
    "items": [
      {
        "prompt": "in + il",
        "answer": "nel"
      },
      {
        "prompt": "in + lo",
        "answer": "nello"
      },
      {
        "prompt": "in + la",
        "answer": "nella"
      },
      {
        "prompt": "in + l'",
        "answer": "nell'"
      },
      {
        "prompt": "in + i",
        "answer": "nei"
      },
      {
        "prompt": "in + le",
        "answer": "nelle"
      },
      {
        "prompt": "in + gli",
        "answer": "negli"
      }
    ]
  },
  {
    "id": "articolo-determinativo-su",
    "title": "Verschmelzung – su + Artikel",
    "subtitle": "auf, über",
    "category": "Artikel",
    "items": [
      {
        "prompt": "su + il",
        "answer": "sul"
      },
      {
        "prompt": "su + lo",
        "answer": "sullo"
      },
      {
        "prompt": "su + la",
        "answer": "sulla"
      },
      {
        "prompt": "su + l'",
        "answer": "sull'"
      },
      {
        "prompt": "su + i",
        "answer": "sui"
      },
      {
        "prompt": "su + le",
        "answer": "sulle"
      },
      {
        "prompt": "su + gli",
        "answer": "sugli"
      }
    ]
  },
  {
    "id": "articolo-indeterminativo-maskulin",
    "title": "Unbestimmter Artikel – Maskulin",
    "subtitle": "ein (m.)",
    "category": "Artikel",
    "items": [
      {
        "prompt": "vor Konsonant, maskulin",
        "answer": "un"
      },
      {
        "prompt": "vor Vokal, maskulin",
        "answer": "un"
      },
      {
        "prompt": "vor s+Konsonant, z, x, y, gn, ps, maskulin",
        "answer": "uno"
      }
    ]
  },
  {
    "id": "articolo-indeterminativo-feminin",
    "title": "Unbestimmter Artikel – Feminin",
    "subtitle": "eine (f.)",
    "category": "Artikel",
    "items": [
      {
        "prompt": "vor Konsonant, feminin",
        "answer": "una"
      },
      {
        "prompt": "vor Vokal, feminin",
        "answer": "un'"
      }
    ]
  },
  {
    "id": "articolo-indeterminativo-beispiele",
    "title": "Unbestimmter Artikel – Beispiele",
    "subtitle": "un / uno / una / un'",
    "category": "Artikel",
    "items": [
      {
        "prompt": "___ libro (Mask. + Konsonant)",
        "answer": "un libro"
      },
      {
        "prompt": "___ caffè (Mask. + Konsonant)",
        "answer": "un caffè"
      },
      {
        "prompt": "___ uomo (Mask. + Vokal)",
        "answer": "un uomo"
      },
      {
        "prompt": "___ albergo (Mask. + Vokal)",
        "answer": "un albergo"
      },
      {
        "prompt": "___ studente (Mask. + s+Konsonant)",
        "answer": "uno studente"
      },
      {
        "prompt": "___ zaino (Mask. + z)",
        "answer": "uno zaino"
      },
      {
        "prompt": "___ yogurt (Mask. + y)",
        "answer": "uno yogurt"
      },
      {
        "prompt": "___ borsa (Fem. + Konsonant)",
        "answer": "una borsa"
      },
      {
        "prompt": "___ amica (Fem. + Vokal)",
        "answer": "un'amica"
      },
      {
        "prompt": "___ aranciata (Fem. + Vokal)",
        "answer": "un'aranciata"
      }
    ]
  },
  {
    "id": "articolo-partitivo-forme",
    "title": "Teilungsartikel – di + bestimmter Artikel",
    "subtitle": "etwas / einige",
    "category": "Artikel",
    "items": [
      {
        "prompt": "di + il",
        "answer": "del"
      },
      {
        "prompt": "di + lo",
        "answer": "dello"
      },
      {
        "prompt": "di + la",
        "answer": "della"
      },
      {
        "prompt": "di + l'",
        "answer": "dell'"
      },
      {
        "prompt": "di + i",
        "answer": "dei"
      },
      {
        "prompt": "di + le",
        "answer": "delle"
      },
      {
        "prompt": "di + gli",
        "answer": "degli"
      }
    ]
  },
  {
    "id": "avverbio-mente-o",
    "title": "Adverbbildung mit -mente (Adjektive auf -o)",
    "subtitle": "feminine Form + -mente",
    "category": "Adjektive",
    "items": [
      {
        "prompt": "lento",
        "answer": "lentamente"
      },
      {
        "prompt": "veloce",
        "answer": "velocemente"
      },
      {
        "prompt": "profondo",
        "answer": "profondamente"
      },
      {
        "prompt": "vero",
        "answer": "veramente"
      },
      {
        "prompt": "esatto",
        "answer": "esattamente"
      },
      {
        "prompt": "improvviso",
        "answer": "improvvisamente"
      },
      {
        "prompt": "probabile",
        "answer": "probabilmente"
      }
    ]
  },
  {
    "id": "avverbio-mente-le-re",
    "title": "Adverbbildung mit -mente (Adjektive auf -le/-re)",
    "subtitle": "-e entfällt vor -mente",
    "category": "Adjektive",
    "items": [
      {
        "prompt": "facile",
        "answer": "facilmente"
      },
      {
        "prompt": "difficile",
        "answer": "difficilmente"
      },
      {
        "prompt": "regolare",
        "answer": "regolarmente"
      },
      {
        "prompt": "naturale",
        "answer": "naturalmente"
      },
      {
        "prompt": "finale",
        "answer": "finalmente"
      }
    ]
  },
  {
    "id": "avverbio-irregolari",
    "title": "Unregelmäßige Adverbien",
    "subtitle": "auswendig lernen",
    "category": "Adjektive",
    "items": [
      {
        "prompt": "gut",
        "answer": "bene"
      },
      {
        "prompt": "schlecht",
        "answer": "male"
      },
      {
        "prompt": "viel, sehr",
        "answer": "molto"
      },
      {
        "prompt": "wenig",
        "answer": "poco"
      },
      {
        "prompt": "viel, so sehr",
        "answer": "tanto"
      },
      {
        "prompt": "zu viel/sehr",
        "answer": "troppo"
      },
      {
        "prompt": "genug, ziemlich",
        "answer": "abbastanza"
      },
      {
        "prompt": "immer",
        "answer": "sempre"
      },
      {
        "prompt": "oft",
        "answer": "spesso"
      }
    ]
  },
  {
    "id": "avverbio-tempo",
    "title": "Häufige Zeit-Adverbien",
    "subtitle": "wann?",
    "category": "Adjektive",
    "items": [
      {
        "prompt": "nie",
        "answer": "mai"
      },
      {
        "prompt": "schon",
        "answer": "già"
      },
      {
        "prompt": "sofort",
        "answer": "subito"
      },
      {
        "prompt": "jetzt",
        "answer": "adesso",
        "alt": [
          "ora"
        ]
      },
      {
        "prompt": "früh, bald",
        "answer": "presto"
      },
      {
        "prompt": "spät",
        "answer": "tardi"
      },
      {
        "prompt": "auch",
        "answer": "anche"
      }
    ]
  },
  {
    "id": "condizionale-parlare",
    "title": "parlare – Condizionale",
    "subtitle": "sprechen (regelmäßig -are)",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "parlerei"
      },
      {
        "prompt": "tu",
        "answer": "parleresti"
      },
      {
        "prompt": "lui/lei",
        "answer": "parlerebbe"
      },
      {
        "prompt": "noi",
        "answer": "parleremmo"
      },
      {
        "prompt": "voi",
        "answer": "parlereste"
      },
      {
        "prompt": "loro",
        "answer": "parlerebbero"
      }
    ]
  },
  {
    "id": "condizionale-prendere",
    "title": "prendere – Condizionale",
    "subtitle": "nehmen (regelmäßig -ere)",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "prenderei"
      },
      {
        "prompt": "tu",
        "answer": "prenderesti"
      },
      {
        "prompt": "lui/lei",
        "answer": "prenderebbe"
      },
      {
        "prompt": "noi",
        "answer": "prenderemmo"
      },
      {
        "prompt": "voi",
        "answer": "prendereste"
      },
      {
        "prompt": "loro",
        "answer": "prenderebbero"
      }
    ]
  },
  {
    "id": "condizionale-dormire",
    "title": "dormire – Condizionale",
    "subtitle": "schlafen (regelmäßig -ire)",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "dormirei"
      },
      {
        "prompt": "tu",
        "answer": "dormiresti"
      },
      {
        "prompt": "lui/lei",
        "answer": "dormirebbe"
      },
      {
        "prompt": "noi",
        "answer": "dormiremmo"
      },
      {
        "prompt": "voi",
        "answer": "dormireste"
      },
      {
        "prompt": "loro",
        "answer": "dormirebbero"
      }
    ]
  },
  {
    "id": "condizionale-essere",
    "title": "essere – Condizionale",
    "subtitle": "sein (unregelmäßig)",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "sarei"
      },
      {
        "prompt": "tu",
        "answer": "saresti"
      },
      {
        "prompt": "lui/lei",
        "answer": "sarebbe"
      },
      {
        "prompt": "noi",
        "answer": "saremmo"
      },
      {
        "prompt": "voi",
        "answer": "sareste"
      },
      {
        "prompt": "loro",
        "answer": "sarebbero"
      }
    ]
  },
  {
    "id": "condizionale-avere",
    "title": "avere – Condizionale",
    "subtitle": "haben (unregelmäßig)",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "avrei"
      },
      {
        "prompt": "tu",
        "answer": "avresti"
      },
      {
        "prompt": "lui/lei",
        "answer": "avrebbe"
      },
      {
        "prompt": "noi",
        "answer": "avremmo"
      },
      {
        "prompt": "voi",
        "answer": "avreste"
      },
      {
        "prompt": "loro",
        "answer": "avrebbero"
      }
    ]
  },
  {
    "id": "condizionale-volere",
    "title": "volere – Condizionale",
    "subtitle": "wollen (unregelmäßig)",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "vorrei"
      },
      {
        "prompt": "tu",
        "answer": "vorresti"
      },
      {
        "prompt": "lui/lei",
        "answer": "vorrebbe"
      },
      {
        "prompt": "noi",
        "answer": "vorremmo"
      },
      {
        "prompt": "voi",
        "answer": "vorreste"
      },
      {
        "prompt": "loro",
        "answer": "vorrebbero"
      }
    ]
  },
  {
    "id": "condizionale-potere",
    "title": "potere – Condizionale",
    "subtitle": "können (unregelmäßig)",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "potrei"
      },
      {
        "prompt": "tu",
        "answer": "potresti"
      },
      {
        "prompt": "lui/lei",
        "answer": "potrebbe"
      },
      {
        "prompt": "noi",
        "answer": "potremmo"
      },
      {
        "prompt": "voi",
        "answer": "potreste"
      },
      {
        "prompt": "loro",
        "answer": "potrebbero"
      }
    ]
  },
  {
    "id": "dimostrativi-questo-forme",
    "title": "questo – vier Formen",
    "subtitle": "dieser/diese/dieses",
    "category": "Pronomen",
    "items": [
      {
        "prompt": "maskulin Singular (questo libro)",
        "answer": "questo"
      },
      {
        "prompt": "feminin Singular (questa casa)",
        "answer": "questa"
      },
      {
        "prompt": "maskulin Plural (questi libri)",
        "answer": "questi"
      },
      {
        "prompt": "feminin Plural (queste case)",
        "answer": "queste"
      },
      {
        "prompt": "vor Vokal, Singular (___amico)",
        "answer": "quest'"
      }
    ]
  },
  {
    "id": "dimostrativi-quello-begleiter",
    "title": "quello – als Begleiter (wie der Artikel)",
    "subtitle": "jener/jene/jenes",
    "category": "Pronomen",
    "items": [
      {
        "prompt": "maskulin Sg. vor Konsonant (___ ragazzo)",
        "answer": "quel"
      },
      {
        "prompt": "maskulin Sg. vor Vokal (___ uomo)",
        "answer": "quell'"
      },
      {
        "prompt": "maskulin Sg. vor s+Kons./z (___ studente)",
        "answer": "quello"
      },
      {
        "prompt": "feminin Sg. vor Konsonant (___ ragazza)",
        "answer": "quella"
      },
      {
        "prompt": "feminin Sg. vor Vokal (___ amica)",
        "answer": "quell'"
      },
      {
        "prompt": "maskulin Pl. vor Konsonant (___ ragazzi)",
        "answer": "quei"
      },
      {
        "prompt": "maskulin Pl. vor Vokal/s+Kons./z (___ uomini)",
        "answer": "quegli"
      },
      {
        "prompt": "feminin Pl. (___ ragazze)",
        "answer": "quelle"
      }
    ]
  },
  {
    "id": "dimostrativi-pronomi",
    "title": "questo / quello – als Pronomen",
    "subtitle": "alleinstehend, vier reguläre Formen",
    "category": "Pronomen",
    "items": [
      {
        "prompt": "dieser (m. Sg.)",
        "answer": "questo"
      },
      {
        "prompt": "diese (f. Sg.)",
        "answer": "questa"
      },
      {
        "prompt": "diese (m. Pl.)",
        "answer": "questi"
      },
      {
        "prompt": "diese (f. Pl.)",
        "answer": "queste"
      },
      {
        "prompt": "jener (m. Sg.)",
        "answer": "quello"
      },
      {
        "prompt": "jene (f. Sg.)",
        "answer": "quella"
      },
      {
        "prompt": "jene (m. Pl.)",
        "answer": "quelli"
      },
      {
        "prompt": "jene (f. Pl.)",
        "answer": "quelle"
      }
    ]
  },
  {
    "id": "presente-essere",
    "title": "essere – Präsens",
    "subtitle": "sein",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "sono"
      },
      {
        "prompt": "tu",
        "answer": "sei"
      },
      {
        "prompt": "lui/lei",
        "answer": "è"
      },
      {
        "prompt": "noi",
        "answer": "siamo"
      },
      {
        "prompt": "voi",
        "answer": "siete"
      },
      {
        "prompt": "loro",
        "answer": "sono"
      }
    ]
  },
  {
    "id": "presente-avere",
    "title": "avere – Präsens",
    "subtitle": "haben",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "ho"
      },
      {
        "prompt": "tu",
        "answer": "hai"
      },
      {
        "prompt": "lui/lei",
        "answer": "ha"
      },
      {
        "prompt": "noi",
        "answer": "abbiamo"
      },
      {
        "prompt": "voi",
        "answer": "avete"
      },
      {
        "prompt": "loro",
        "answer": "hanno"
      }
    ]
  },
  {
    "id": "futuro-regolare-parlare",
    "title": "parlare – Futuro semplice",
    "subtitle": "sprechen (werde sprechen)",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "parlerò"
      },
      {
        "prompt": "tu",
        "answer": "parlerai"
      },
      {
        "prompt": "lui/lei",
        "answer": "parlerà"
      },
      {
        "prompt": "noi",
        "answer": "parleremo"
      },
      {
        "prompt": "voi",
        "answer": "parlerete"
      },
      {
        "prompt": "loro",
        "answer": "parleranno"
      }
    ]
  },
  {
    "id": "futuro-regolare-prendere",
    "title": "prendere – Futuro semplice",
    "subtitle": "nehmen (werde nehmen)",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "prenderò"
      },
      {
        "prompt": "tu",
        "answer": "prenderai"
      },
      {
        "prompt": "lui/lei",
        "answer": "prenderà"
      },
      {
        "prompt": "noi",
        "answer": "prenderemo"
      },
      {
        "prompt": "voi",
        "answer": "prenderete"
      },
      {
        "prompt": "loro",
        "answer": "prenderanno"
      }
    ]
  },
  {
    "id": "futuro-regolare-dormire",
    "title": "dormire – Futuro semplice",
    "subtitle": "schlafen (werde schlafen)",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "dormirò"
      },
      {
        "prompt": "tu",
        "answer": "dormirai"
      },
      {
        "prompt": "lui/lei",
        "answer": "dormirà"
      },
      {
        "prompt": "noi",
        "answer": "dormiremo"
      },
      {
        "prompt": "voi",
        "answer": "dormirete"
      },
      {
        "prompt": "loro",
        "answer": "dormiranno"
      }
    ]
  },
  {
    "id": "futuro-irregolare-essere",
    "title": "essere – Futuro semplice",
    "subtitle": "sein (Stamm: sar-)",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "sarò"
      },
      {
        "prompt": "tu",
        "answer": "sarai"
      },
      {
        "prompt": "lui/lei",
        "answer": "sarà"
      },
      {
        "prompt": "noi",
        "answer": "saremo"
      },
      {
        "prompt": "voi",
        "answer": "sarete"
      },
      {
        "prompt": "loro",
        "answer": "saranno"
      }
    ]
  },
  {
    "id": "futuro-irregolare-avere",
    "title": "avere – Futuro semplice",
    "subtitle": "haben (Stamm: avr-)",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "avrò"
      },
      {
        "prompt": "tu",
        "answer": "avrai"
      },
      {
        "prompt": "lui/lei",
        "answer": "avrà"
      },
      {
        "prompt": "noi",
        "answer": "avremo"
      },
      {
        "prompt": "voi",
        "answer": "avrete"
      },
      {
        "prompt": "loro",
        "answer": "avranno"
      }
    ]
  },
  {
    "id": "futuro-irregolare-andare",
    "title": "andare – Futuro semplice",
    "subtitle": "gehen (Stamm: andr-)",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "andrò"
      },
      {
        "prompt": "tu",
        "answer": "andrai"
      },
      {
        "prompt": "lui/lei",
        "answer": "andrà"
      },
      {
        "prompt": "noi",
        "answer": "andremo"
      },
      {
        "prompt": "voi",
        "answer": "andrete"
      },
      {
        "prompt": "loro",
        "answer": "andranno"
      }
    ]
  },
  {
    "id": "futuro-irregolare-venire",
    "title": "venire – Futuro semplice",
    "subtitle": "kommen (Stamm: verr-)",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "verrò"
      },
      {
        "prompt": "tu",
        "answer": "verrai"
      },
      {
        "prompt": "lui/lei",
        "answer": "verrà"
      },
      {
        "prompt": "noi",
        "answer": "verremo"
      },
      {
        "prompt": "voi",
        "answer": "verrete"
      },
      {
        "prompt": "loro",
        "answer": "verranno"
      }
    ]
  },
  {
    "id": "futuro-irregolare-fare",
    "title": "fare – Futuro semplice",
    "subtitle": "machen/tun (Stamm: far-)",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "farò"
      },
      {
        "prompt": "tu",
        "answer": "farai"
      },
      {
        "prompt": "lui/lei",
        "answer": "farà"
      },
      {
        "prompt": "noi",
        "answer": "faremo"
      },
      {
        "prompt": "voi",
        "answer": "farete"
      },
      {
        "prompt": "loro",
        "answer": "faranno"
      }
    ]
  },
  {
    "id": "futuro-irregolare-vedere",
    "title": "vedere – Futuro semplice",
    "subtitle": "sehen (Stamm: vedr-)",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "vedrò"
      },
      {
        "prompt": "tu",
        "answer": "vedrai"
      },
      {
        "prompt": "lui/lei",
        "answer": "vedrà"
      },
      {
        "prompt": "noi",
        "answer": "vedremo"
      },
      {
        "prompt": "voi",
        "answer": "vedrete"
      },
      {
        "prompt": "loro",
        "answer": "vedranno"
      }
    ]
  },
  {
    "id": "futuro-irregolare-sapere",
    "title": "sapere – Futuro semplice",
    "subtitle": "wissen (Stamm: sapr-)",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "saprò"
      },
      {
        "prompt": "tu",
        "answer": "saprai"
      },
      {
        "prompt": "lui/lei",
        "answer": "saprà"
      },
      {
        "prompt": "noi",
        "answer": "sapremo"
      },
      {
        "prompt": "voi",
        "answer": "saprete"
      },
      {
        "prompt": "loro",
        "answer": "sapranno"
      }
    ]
  },
  {
    "id": "futuro-irregolare-potere",
    "title": "potere – Futuro semplice",
    "subtitle": "können (Stamm: potr-)",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "potrò"
      },
      {
        "prompt": "tu",
        "answer": "potrai"
      },
      {
        "prompt": "lui/lei",
        "answer": "potrà"
      },
      {
        "prompt": "noi",
        "answer": "potremo"
      },
      {
        "prompt": "voi",
        "answer": "potrete"
      },
      {
        "prompt": "loro",
        "answer": "potranno"
      }
    ]
  },
  {
    "id": "futuro-irregolare-volere",
    "title": "volere – Futuro semplice",
    "subtitle": "wollen (Stamm: vorr-)",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "vorrò"
      },
      {
        "prompt": "tu",
        "answer": "vorrai"
      },
      {
        "prompt": "lui/lei",
        "answer": "vorrà"
      },
      {
        "prompt": "noi",
        "answer": "vorremo"
      },
      {
        "prompt": "voi",
        "answer": "vorrete"
      },
      {
        "prompt": "loro",
        "answer": "vorranno"
      }
    ]
  },
  {
    "id": "futuro-irregolare-dovere",
    "title": "dovere – Futuro semplice",
    "subtitle": "müssen (Stamm: dovr-)",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "dovrò"
      },
      {
        "prompt": "tu",
        "answer": "dovrai"
      },
      {
        "prompt": "lui/lei",
        "answer": "dovrà"
      },
      {
        "prompt": "noi",
        "answer": "dovremo"
      },
      {
        "prompt": "voi",
        "answer": "dovrete"
      },
      {
        "prompt": "loro",
        "answer": "dovranno"
      }
    ]
  },
  {
    "id": "futuro-irregolare-rimanere",
    "title": "rimanere – Futuro semplice",
    "subtitle": "bleiben (Stamm: rimarr-)",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "rimarrò"
      },
      {
        "prompt": "tu",
        "answer": "rimarrai"
      },
      {
        "prompt": "lui/lei",
        "answer": "rimarrà"
      },
      {
        "prompt": "noi",
        "answer": "rimarremo"
      },
      {
        "prompt": "voi",
        "answer": "rimarrete"
      },
      {
        "prompt": "loro",
        "answer": "rimarranno"
      }
    ]
  },
  {
    "id": "imperativo-parlare",
    "title": "parlare – Imperativo",
    "subtitle": "sprechen",
    "category": "Verben",
    "items": [
      {
        "prompt": "tu",
        "answer": "parla"
      },
      {
        "prompt": "Lei",
        "answer": "parli"
      },
      {
        "prompt": "noi",
        "answer": "parliamo"
      },
      {
        "prompt": "voi",
        "answer": "parlate"
      }
    ]
  },
  {
    "id": "imperativo-prendere",
    "title": "prendere – Imperativo",
    "subtitle": "nehmen",
    "category": "Verben",
    "items": [
      {
        "prompt": "tu",
        "answer": "prendi"
      },
      {
        "prompt": "Lei",
        "answer": "prenda"
      },
      {
        "prompt": "noi",
        "answer": "prendiamo"
      },
      {
        "prompt": "voi",
        "answer": "prendete"
      }
    ]
  },
  {
    "id": "imperativo-dormire",
    "title": "dormire – Imperativo",
    "subtitle": "schlafen",
    "category": "Verben",
    "items": [
      {
        "prompt": "tu",
        "answer": "dormi"
      },
      {
        "prompt": "Lei",
        "answer": "dorma"
      },
      {
        "prompt": "noi",
        "answer": "dormiamo"
      },
      {
        "prompt": "voi",
        "answer": "dormite"
      }
    ]
  },
  {
    "id": "imperativo-finire",
    "title": "finire (-isc-) – Imperativo",
    "subtitle": "beenden",
    "category": "Verben",
    "items": [
      {
        "prompt": "tu",
        "answer": "finisci"
      },
      {
        "prompt": "Lei",
        "answer": "finisca"
      },
      {
        "prompt": "noi",
        "answer": "finiamo"
      },
      {
        "prompt": "voi",
        "answer": "finite"
      }
    ]
  },
  {
    "id": "imperativo-irregolare-tu",
    "title": "Unregelmäßiger Imperativ – tu",
    "subtitle": "wichtige Verben (du-Form)",
    "category": "Verben",
    "items": [
      {
        "prompt": "essere",
        "answer": "sii"
      },
      {
        "prompt": "avere",
        "answer": "abbi"
      },
      {
        "prompt": "andare",
        "answer": "va'",
        "alt": [
          "vai"
        ]
      },
      {
        "prompt": "dare",
        "answer": "da'",
        "alt": [
          "dai"
        ]
      },
      {
        "prompt": "fare",
        "answer": "fa'",
        "alt": [
          "fai"
        ]
      },
      {
        "prompt": "dire",
        "answer": "di'"
      },
      {
        "prompt": "stare",
        "answer": "sta'",
        "alt": [
          "stai"
        ]
      },
      {
        "prompt": "sapere",
        "answer": "sappi"
      }
    ]
  },
  {
    "id": "imperativo-irregolare-lei",
    "title": "Unregelmäßiger Imperativ – Lei",
    "subtitle": "wichtige Verben (Sie-Form)",
    "category": "Verben",
    "items": [
      {
        "prompt": "essere",
        "answer": "sia"
      },
      {
        "prompt": "avere",
        "answer": "abbia"
      },
      {
        "prompt": "andare",
        "answer": "vada"
      },
      {
        "prompt": "dare",
        "answer": "dia"
      },
      {
        "prompt": "fare",
        "answer": "faccia"
      },
      {
        "prompt": "dire",
        "answer": "dica"
      },
      {
        "prompt": "stare",
        "answer": "stia"
      },
      {
        "prompt": "sapere",
        "answer": "sappia"
      }
    ]
  },
  {
    "id": "imperfetto-parlare",
    "title": "parlare – Imperfetto",
    "subtitle": "sprechen",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "parlavo"
      },
      {
        "prompt": "tu",
        "answer": "parlavi"
      },
      {
        "prompt": "lui/lei",
        "answer": "parlava"
      },
      {
        "prompt": "noi",
        "answer": "parlavamo"
      },
      {
        "prompt": "voi",
        "answer": "parlavate"
      },
      {
        "prompt": "loro",
        "answer": "parlavano"
      }
    ]
  },
  {
    "id": "imperfetto-prendere",
    "title": "prendere – Imperfetto",
    "subtitle": "nehmen",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "prendevo"
      },
      {
        "prompt": "tu",
        "answer": "prendevi"
      },
      {
        "prompt": "lui/lei",
        "answer": "prendeva"
      },
      {
        "prompt": "noi",
        "answer": "prendevamo"
      },
      {
        "prompt": "voi",
        "answer": "prendevate"
      },
      {
        "prompt": "loro",
        "answer": "prendevano"
      }
    ]
  },
  {
    "id": "imperfetto-dormire",
    "title": "dormire – Imperfetto",
    "subtitle": "schlafen",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "dormivo"
      },
      {
        "prompt": "tu",
        "answer": "dormivi"
      },
      {
        "prompt": "lui/lei",
        "answer": "dormiva"
      },
      {
        "prompt": "noi",
        "answer": "dormivamo"
      },
      {
        "prompt": "voi",
        "answer": "dormivate"
      },
      {
        "prompt": "loro",
        "answer": "dormivano"
      }
    ]
  },
  {
    "id": "imperfetto-essere",
    "title": "essere – Imperfetto",
    "subtitle": "sein",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "ero"
      },
      {
        "prompt": "tu",
        "answer": "eri"
      },
      {
        "prompt": "lui/lei",
        "answer": "era"
      },
      {
        "prompt": "noi",
        "answer": "eravamo"
      },
      {
        "prompt": "voi",
        "answer": "eravate"
      },
      {
        "prompt": "loro",
        "answer": "erano"
      }
    ]
  },
  {
    "id": "imperfetto-fare",
    "title": "fare – Imperfetto",
    "subtitle": "machen/tun",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "facevo"
      },
      {
        "prompt": "tu",
        "answer": "facevi"
      },
      {
        "prompt": "lui/lei",
        "answer": "faceva"
      },
      {
        "prompt": "noi",
        "answer": "facevamo"
      },
      {
        "prompt": "voi",
        "answer": "facevate"
      },
      {
        "prompt": "loro",
        "answer": "facevano"
      }
    ]
  },
  {
    "id": "imperfetto-dire",
    "title": "dire – Imperfetto",
    "subtitle": "sagen",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "dicevo"
      },
      {
        "prompt": "tu",
        "answer": "dicevi"
      },
      {
        "prompt": "lui/lei",
        "answer": "diceva"
      },
      {
        "prompt": "noi",
        "answer": "dicevamo"
      },
      {
        "prompt": "voi",
        "answer": "dicevate"
      },
      {
        "prompt": "loro",
        "answer": "dicevano"
      }
    ]
  },
  {
    "id": "imperfetto-bere",
    "title": "bere – Imperfetto",
    "subtitle": "trinken",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "bevevo"
      },
      {
        "prompt": "tu",
        "answer": "bevevi"
      },
      {
        "prompt": "lui/lei",
        "answer": "beveva"
      },
      {
        "prompt": "noi",
        "answer": "bevevamo"
      },
      {
        "prompt": "voi",
        "answer": "bevevate"
      },
      {
        "prompt": "loro",
        "answer": "bevevano"
      }
    ]
  },
  {
    "id": "presente-modale-volere",
    "title": "volere – Präsens",
    "subtitle": "wollen",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "voglio"
      },
      {
        "prompt": "tu",
        "answer": "vuoi"
      },
      {
        "prompt": "lui/lei",
        "answer": "vuole"
      },
      {
        "prompt": "noi",
        "answer": "vogliamo"
      },
      {
        "prompt": "voi",
        "answer": "volete"
      },
      {
        "prompt": "loro",
        "answer": "vogliono"
      }
    ]
  },
  {
    "id": "presente-modale-potere",
    "title": "potere – Präsens",
    "subtitle": "können / dürfen",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "posso"
      },
      {
        "prompt": "tu",
        "answer": "puoi"
      },
      {
        "prompt": "lui/lei",
        "answer": "può"
      },
      {
        "prompt": "noi",
        "answer": "possiamo"
      },
      {
        "prompt": "voi",
        "answer": "potete"
      },
      {
        "prompt": "loro",
        "answer": "possono"
      }
    ]
  },
  {
    "id": "presente-modale-dovere",
    "title": "dovere – Präsens",
    "subtitle": "müssen / sollen",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "devo"
      },
      {
        "prompt": "tu",
        "answer": "devi"
      },
      {
        "prompt": "lui/lei",
        "answer": "deve"
      },
      {
        "prompt": "noi",
        "answer": "dobbiamo"
      },
      {
        "prompt": "voi",
        "answer": "dovete"
      },
      {
        "prompt": "loro",
        "answer": "devono"
      }
    ]
  },
  {
    "id": "presente-modale-sapere",
    "title": "sapere – Präsens",
    "subtitle": "können (Fähigkeit) / wissen",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "so"
      },
      {
        "prompt": "tu",
        "answer": "sai"
      },
      {
        "prompt": "lui/lei",
        "answer": "sa"
      },
      {
        "prompt": "noi",
        "answer": "sappiamo"
      },
      {
        "prompt": "voi",
        "answer": "sapete"
      },
      {
        "prompt": "loro",
        "answer": "sanno"
      }
    ]
  },
  {
    "id": "numeri-grundzahlen-0-20",
    "title": "Grundzahlen 0–20",
    "subtitle": "numeri cardinali",
    "category": "Zahlen",
    "items": [
      {
        "prompt": "0",
        "answer": "zero"
      },
      {
        "prompt": "1",
        "answer": "uno"
      },
      {
        "prompt": "2",
        "answer": "due"
      },
      {
        "prompt": "3",
        "answer": "tre"
      },
      {
        "prompt": "4",
        "answer": "quattro"
      },
      {
        "prompt": "5",
        "answer": "cinque"
      },
      {
        "prompt": "6",
        "answer": "sei"
      },
      {
        "prompt": "7",
        "answer": "sette"
      },
      {
        "prompt": "8",
        "answer": "otto"
      },
      {
        "prompt": "9",
        "answer": "nove"
      },
      {
        "prompt": "10",
        "answer": "dieci"
      },
      {
        "prompt": "11",
        "answer": "undici"
      },
      {
        "prompt": "12",
        "answer": "dodici"
      },
      {
        "prompt": "13",
        "answer": "tredici"
      },
      {
        "prompt": "14",
        "answer": "quattordici"
      },
      {
        "prompt": "15",
        "answer": "quindici"
      },
      {
        "prompt": "16",
        "answer": "sedici"
      },
      {
        "prompt": "17",
        "answer": "diciassette"
      },
      {
        "prompt": "18",
        "answer": "diciotto"
      },
      {
        "prompt": "19",
        "answer": "diciannove"
      },
      {
        "prompt": "20",
        "answer": "venti"
      }
    ]
  },
  {
    "id": "numeri-zehner",
    "title": "Zehner",
    "subtitle": "20–90",
    "category": "Zahlen",
    "items": [
      {
        "prompt": "20",
        "answer": "venti"
      },
      {
        "prompt": "30",
        "answer": "trenta"
      },
      {
        "prompt": "40",
        "answer": "quaranta"
      },
      {
        "prompt": "50",
        "answer": "cinquanta"
      },
      {
        "prompt": "60",
        "answer": "sessanta"
      },
      {
        "prompt": "70",
        "answer": "settanta"
      },
      {
        "prompt": "80",
        "answer": "ottanta"
      },
      {
        "prompt": "90",
        "answer": "novanta"
      }
    ]
  },
  {
    "id": "numeri-zusammensetzungen-21-99",
    "title": "Zusammensetzungen 21–99",
    "subtitle": "Zehner + Einer",
    "category": "Zahlen",
    "items": [
      {
        "prompt": "21",
        "answer": "ventuno"
      },
      {
        "prompt": "22",
        "answer": "ventidue"
      },
      {
        "prompt": "28",
        "answer": "ventotto"
      },
      {
        "prompt": "31",
        "answer": "trentuno"
      },
      {
        "prompt": "38",
        "answer": "trentotto"
      },
      {
        "prompt": "45",
        "answer": "quarantacinque"
      }
    ]
  },
  {
    "id": "numeri-ab-100",
    "title": "Ab 100",
    "subtitle": "Hunderter, Tausender, Millionen",
    "category": "Zahlen",
    "items": [
      {
        "prompt": "100",
        "answer": "cento"
      },
      {
        "prompt": "200",
        "answer": "duecento"
      },
      {
        "prompt": "300",
        "answer": "trecento"
      },
      {
        "prompt": "1.000",
        "answer": "mille"
      },
      {
        "prompt": "2.000",
        "answer": "duemila"
      },
      {
        "prompt": "10.000",
        "answer": "diecimila"
      },
      {
        "prompt": "1.000.000",
        "answer": "un milione"
      },
      {
        "prompt": "1.000.000.000",
        "answer": "un miliardo"
      }
    ]
  },
  {
    "id": "numeri-beispiele-zusammengesetzt",
    "title": "Zusammengesetzte Zahlen",
    "subtitle": "Beispiele",
    "category": "Zahlen",
    "items": [
      {
        "prompt": "126",
        "answer": "centoventisei"
      },
      {
        "prompt": "1.989",
        "answer": "millenovecentottantanove"
      },
      {
        "prompt": "2024",
        "answer": "duemilaventiquattro"
      }
    ]
  },
  {
    "id": "numeri-ordnungszahlen-1-10",
    "title": "Ordnungszahlen 1.–10.",
    "subtitle": "numeri ordinali",
    "category": "Zahlen",
    "items": [
      {
        "prompt": "1.",
        "answer": "primo"
      },
      {
        "prompt": "2.",
        "answer": "secondo"
      },
      {
        "prompt": "3.",
        "answer": "terzo"
      },
      {
        "prompt": "4.",
        "answer": "quarto"
      },
      {
        "prompt": "5.",
        "answer": "quinto"
      },
      {
        "prompt": "6.",
        "answer": "sesto"
      },
      {
        "prompt": "7.",
        "answer": "settimo"
      },
      {
        "prompt": "8.",
        "answer": "ottavo"
      },
      {
        "prompt": "9.",
        "answer": "nono"
      },
      {
        "prompt": "10.",
        "answer": "decimo"
      }
    ]
  },
  {
    "id": "numeri-ordnungszahlen-ab-11",
    "title": "Ordnungszahlen ab 11",
    "subtitle": "Grundzahl + -esimo",
    "category": "Zahlen",
    "items": [
      {
        "prompt": "11.",
        "answer": "undicesimo"
      },
      {
        "prompt": "12.",
        "answer": "dodicesimo"
      },
      {
        "prompt": "20.",
        "answer": "ventesimo"
      },
      {
        "prompt": "21.",
        "answer": "ventunesimo"
      },
      {
        "prompt": "100.",
        "answer": "centesimo"
      },
      {
        "prompt": "1000.",
        "answer": "millesimo"
      }
    ]
  },
  {
    "id": "passato-prossimo-participio-regolare",
    "title": "Infinitiv → Partizip (regelmäßig)",
    "subtitle": "Partizip Perfekt",
    "category": "Verben",
    "items": [
      {
        "prompt": "parlare",
        "answer": "parlato"
      },
      {
        "prompt": "credere",
        "answer": "creduto"
      },
      {
        "prompt": "dormire",
        "answer": "dormito"
      }
    ]
  },
  {
    "id": "passato-prossimo-participio-irregolare",
    "title": "Infinitiv → Partizip (unregelmäßig)",
    "subtitle": "Partizip Perfekt",
    "category": "Verben",
    "items": [
      {
        "prompt": "essere",
        "answer": "stato"
      },
      {
        "prompt": "fare",
        "answer": "fatto"
      },
      {
        "prompt": "dire",
        "answer": "detto"
      },
      {
        "prompt": "venire",
        "answer": "venuto"
      },
      {
        "prompt": "rimanere",
        "answer": "rimasto"
      },
      {
        "prompt": "nascere",
        "answer": "nato"
      },
      {
        "prompt": "morire",
        "answer": "morto"
      },
      {
        "prompt": "chiedere",
        "answer": "chiesto"
      },
      {
        "prompt": "rispondere",
        "answer": "risposto"
      },
      {
        "prompt": "vivere",
        "answer": "vissuto"
      },
      {
        "prompt": "aprire",
        "answer": "aperto"
      },
      {
        "prompt": "offrire",
        "answer": "offerto"
      },
      {
        "prompt": "scrivere",
        "answer": "scritto"
      },
      {
        "prompt": "leggere",
        "answer": "letto"
      },
      {
        "prompt": "vedere",
        "answer": "visto"
      },
      {
        "prompt": "prendere",
        "answer": "preso"
      },
      {
        "prompt": "mettere",
        "answer": "messo"
      },
      {
        "prompt": "chiudere",
        "answer": "chiuso"
      },
      {
        "prompt": "bere",
        "answer": "bevuto"
      },
      {
        "prompt": "scegliere",
        "answer": "scelto"
      }
    ]
  },
  {
    "id": "passato-prossimo-essere-accordo",
    "title": "essere – Anpassung des Partizips",
    "subtitle": "andare/partire nach Genus und Numerus",
    "category": "Verben",
    "items": [
      {
        "prompt": "Singular maskulin (andare)",
        "answer": "andato"
      },
      {
        "prompt": "Singular feminin (andare)",
        "answer": "andata"
      },
      {
        "prompt": "Plural maskulin (andare)",
        "answer": "andati"
      },
      {
        "prompt": "Plural feminin (andare)",
        "answer": "andate"
      },
      {
        "prompt": "Plural maskulin (partire)",
        "answer": "partiti"
      },
      {
        "prompt": "Plural feminin (partire)",
        "answer": "partite"
      }
    ]
  },
  {
    "id": "possessivi-maschile-singolare",
    "title": "Possessivpronomen – maskulin Singular",
    "subtitle": "il mio, il tuo …",
    "category": "Pronomen",
    "items": [
      {
        "prompt": "mein",
        "answer": "il mio"
      },
      {
        "prompt": "dein",
        "answer": "il tuo"
      },
      {
        "prompt": "sein/ihr",
        "answer": "il suo"
      },
      {
        "prompt": "Ihr (höfl.)",
        "answer": "il Suo"
      },
      {
        "prompt": "unser",
        "answer": "il nostro"
      },
      {
        "prompt": "euer",
        "answer": "il vostro"
      },
      {
        "prompt": "ihr (Pl.)",
        "answer": "il loro"
      }
    ]
  },
  {
    "id": "possessivi-femminile-singolare",
    "title": "Possessivpronomen – feminin Singular",
    "subtitle": "la mia, la tua …",
    "category": "Pronomen",
    "items": [
      {
        "prompt": "mein",
        "answer": "la mia"
      },
      {
        "prompt": "dein",
        "answer": "la tua"
      },
      {
        "prompt": "sein/ihr",
        "answer": "la sua"
      },
      {
        "prompt": "Ihr (höfl.)",
        "answer": "la Sua"
      },
      {
        "prompt": "unser",
        "answer": "la nostra"
      },
      {
        "prompt": "euer",
        "answer": "la vostra"
      },
      {
        "prompt": "ihr (Pl.)",
        "answer": "la loro"
      }
    ]
  },
  {
    "id": "possessivi-maschile-plurale",
    "title": "Possessivpronomen – maskulin Plural",
    "subtitle": "i miei, i tuoi …",
    "category": "Pronomen",
    "items": [
      {
        "prompt": "mein",
        "answer": "i miei"
      },
      {
        "prompt": "dein",
        "answer": "i tuoi"
      },
      {
        "prompt": "sein/ihr",
        "answer": "i suoi"
      },
      {
        "prompt": "Ihr (höfl.)",
        "answer": "i Suoi"
      },
      {
        "prompt": "unser",
        "answer": "i nostri"
      },
      {
        "prompt": "euer",
        "answer": "i vostri"
      },
      {
        "prompt": "ihr (Pl.)",
        "answer": "i loro"
      }
    ]
  },
  {
    "id": "possessivi-femminile-plurale",
    "title": "Possessivpronomen – feminin Plural",
    "subtitle": "le mie, le tue …",
    "category": "Pronomen",
    "items": [
      {
        "prompt": "mein",
        "answer": "le mie"
      },
      {
        "prompt": "dein",
        "answer": "le tue"
      },
      {
        "prompt": "sein/ihr",
        "answer": "le sue"
      },
      {
        "prompt": "Ihr (höfl.)",
        "answer": "le Sue"
      },
      {
        "prompt": "unser",
        "answer": "le nostre"
      },
      {
        "prompt": "euer",
        "answer": "le vostre"
      },
      {
        "prompt": "ihr (Pl.)",
        "answer": "le loro"
      }
    ]
  },
  {
    "id": "possessivi-familienmitglieder",
    "title": "Possessivpronomen – Familie (ohne Artikel)",
    "subtitle": "mia madre, tuo padre …",
    "category": "Pronomen",
    "items": [
      {
        "prompt": "meine Mutter",
        "answer": "mia madre"
      },
      {
        "prompt": "dein Vater",
        "answer": "tuo padre"
      },
      {
        "prompt": "sein/ihr Bruder",
        "answer": "suo fratello"
      },
      {
        "prompt": "unsere Schwester",
        "answer": "nostra sorella"
      },
      {
        "prompt": "ihr Vater (Pl.)",
        "answer": "il loro padre"
      },
      {
        "prompt": "meine Brüder",
        "answer": "i miei fratelli"
      }
    ]
  },
  {
    "id": "preposizioni-articolate-a",
    "title": "a + Artikel",
    "subtitle": "Verschmelzung mit 'a'",
    "category": "Artikel",
    "items": [
      {
        "prompt": "a + il",
        "answer": "al"
      },
      {
        "prompt": "a + lo",
        "answer": "allo"
      },
      {
        "prompt": "a + la",
        "answer": "alla"
      },
      {
        "prompt": "a + l'",
        "answer": "all'"
      },
      {
        "prompt": "a + i",
        "answer": "ai"
      },
      {
        "prompt": "a + le",
        "answer": "alle"
      },
      {
        "prompt": "a + gli",
        "answer": "agli"
      }
    ]
  },
  {
    "id": "preposizioni-articolate-da",
    "title": "da + Artikel",
    "subtitle": "Verschmelzung mit 'da'",
    "category": "Artikel",
    "items": [
      {
        "prompt": "da + il",
        "answer": "dal"
      },
      {
        "prompt": "da + lo",
        "answer": "dallo"
      },
      {
        "prompt": "da + la",
        "answer": "dalla"
      },
      {
        "prompt": "da + l'",
        "answer": "dall'"
      },
      {
        "prompt": "da + i",
        "answer": "dai"
      },
      {
        "prompt": "da + le",
        "answer": "dalle"
      },
      {
        "prompt": "da + gli",
        "answer": "dagli"
      }
    ]
  },
  {
    "id": "preposizioni-articolate-di",
    "title": "di + Artikel",
    "subtitle": "Verschmelzung mit 'di'",
    "category": "Artikel",
    "items": [
      {
        "prompt": "di + il",
        "answer": "del"
      },
      {
        "prompt": "di + lo",
        "answer": "dello"
      },
      {
        "prompt": "di + la",
        "answer": "della"
      },
      {
        "prompt": "di + l'",
        "answer": "dell'"
      },
      {
        "prompt": "di + i",
        "answer": "dei"
      },
      {
        "prompt": "di + le",
        "answer": "delle"
      },
      {
        "prompt": "di + gli",
        "answer": "degli"
      }
    ]
  },
  {
    "id": "preposizioni-articolate-in",
    "title": "in + Artikel",
    "subtitle": "Verschmelzung mit 'in'",
    "category": "Artikel",
    "items": [
      {
        "prompt": "in + il",
        "answer": "nel"
      },
      {
        "prompt": "in + lo",
        "answer": "nello"
      },
      {
        "prompt": "in + la",
        "answer": "nella"
      },
      {
        "prompt": "in + l'",
        "answer": "nell'"
      },
      {
        "prompt": "in + i",
        "answer": "nei"
      },
      {
        "prompt": "in + le",
        "answer": "nelle"
      },
      {
        "prompt": "in + gli",
        "answer": "negli"
      }
    ]
  },
  {
    "id": "preposizioni-articolate-su",
    "title": "su + Artikel",
    "subtitle": "Verschmelzung mit 'su'",
    "category": "Artikel",
    "items": [
      {
        "prompt": "su + il",
        "answer": "sul"
      },
      {
        "prompt": "su + lo",
        "answer": "sullo"
      },
      {
        "prompt": "su + la",
        "answer": "sulla"
      },
      {
        "prompt": "su + l'",
        "answer": "sull'"
      },
      {
        "prompt": "su + i",
        "answer": "sui"
      },
      {
        "prompt": "su + le",
        "answer": "sulle"
      },
      {
        "prompt": "su + gli",
        "answer": "sugli"
      }
    ]
  },
  {
    "id": "presente-irregolare-andare",
    "title": "andare – Präsens",
    "subtitle": "gehen",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "vado"
      },
      {
        "prompt": "tu",
        "answer": "vai"
      },
      {
        "prompt": "lui/lei",
        "answer": "va"
      },
      {
        "prompt": "noi",
        "answer": "andiamo"
      },
      {
        "prompt": "voi",
        "answer": "andate"
      },
      {
        "prompt": "loro",
        "answer": "vanno"
      }
    ]
  },
  {
    "id": "presente-irregolare-venire",
    "title": "venire – Präsens",
    "subtitle": "kommen",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "vengo"
      },
      {
        "prompt": "tu",
        "answer": "vieni"
      },
      {
        "prompt": "lui/lei",
        "answer": "viene"
      },
      {
        "prompt": "noi",
        "answer": "veniamo"
      },
      {
        "prompt": "voi",
        "answer": "venite"
      },
      {
        "prompt": "loro",
        "answer": "vengono"
      }
    ]
  },
  {
    "id": "presente-irregolare-stare",
    "title": "stare – Präsens",
    "subtitle": "sich befinden",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "sto"
      },
      {
        "prompt": "tu",
        "answer": "stai"
      },
      {
        "prompt": "lui/lei",
        "answer": "sta"
      },
      {
        "prompt": "noi",
        "answer": "stiamo"
      },
      {
        "prompt": "voi",
        "answer": "state"
      },
      {
        "prompt": "loro",
        "answer": "stanno"
      }
    ]
  },
  {
    "id": "presente-irregolare-fare",
    "title": "fare – Präsens",
    "subtitle": "machen",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "faccio"
      },
      {
        "prompt": "tu",
        "answer": "fai"
      },
      {
        "prompt": "lui/lei",
        "answer": "fa"
      },
      {
        "prompt": "noi",
        "answer": "facciamo"
      },
      {
        "prompt": "voi",
        "answer": "fate"
      },
      {
        "prompt": "loro",
        "answer": "fanno"
      }
    ]
  },
  {
    "id": "presente-irregolare-dare",
    "title": "dare – Präsens",
    "subtitle": "geben",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "do"
      },
      {
        "prompt": "tu",
        "answer": "dai"
      },
      {
        "prompt": "lui/lei",
        "answer": "dà"
      },
      {
        "prompt": "noi",
        "answer": "diamo"
      },
      {
        "prompt": "voi",
        "answer": "date"
      },
      {
        "prompt": "loro",
        "answer": "danno"
      }
    ]
  },
  {
    "id": "presente-irregolare-dire",
    "title": "dire – Präsens",
    "subtitle": "sagen",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "dico"
      },
      {
        "prompt": "tu",
        "answer": "dici"
      },
      {
        "prompt": "lui/lei",
        "answer": "dice"
      },
      {
        "prompt": "noi",
        "answer": "diciamo"
      },
      {
        "prompt": "voi",
        "answer": "dite"
      },
      {
        "prompt": "loro",
        "answer": "dicono"
      }
    ]
  },
  {
    "id": "presente-irregolare-volere",
    "title": "volere – Präsens",
    "subtitle": "wollen",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "voglio"
      },
      {
        "prompt": "tu",
        "answer": "vuoi"
      },
      {
        "prompt": "lui/lei",
        "answer": "vuole"
      },
      {
        "prompt": "noi",
        "answer": "vogliamo"
      },
      {
        "prompt": "voi",
        "answer": "volete"
      },
      {
        "prompt": "loro",
        "answer": "vogliono"
      }
    ]
  },
  {
    "id": "presente-irregolare-potere",
    "title": "potere – Präsens",
    "subtitle": "können",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "posso"
      },
      {
        "prompt": "tu",
        "answer": "puoi"
      },
      {
        "prompt": "lui/lei",
        "answer": "può"
      },
      {
        "prompt": "noi",
        "answer": "possiamo"
      },
      {
        "prompt": "voi",
        "answer": "potete"
      },
      {
        "prompt": "loro",
        "answer": "possono"
      }
    ]
  },
  {
    "id": "presente-irregolare-dovere",
    "title": "dovere – Präsens",
    "subtitle": "müssen",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "devo"
      },
      {
        "prompt": "tu",
        "answer": "devi"
      },
      {
        "prompt": "lui/lei",
        "answer": "deve"
      },
      {
        "prompt": "noi",
        "answer": "dobbiamo"
      },
      {
        "prompt": "voi",
        "answer": "dovete"
      },
      {
        "prompt": "loro",
        "answer": "devono"
      }
    ]
  },
  {
    "id": "presente-irregolare-sapere",
    "title": "sapere – Präsens",
    "subtitle": "wissen",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "so"
      },
      {
        "prompt": "tu",
        "answer": "sai"
      },
      {
        "prompt": "lui/lei",
        "answer": "sa"
      },
      {
        "prompt": "noi",
        "answer": "sappiamo"
      },
      {
        "prompt": "voi",
        "answer": "sapete"
      },
      {
        "prompt": "loro",
        "answer": "sanno"
      }
    ]
  },
  {
    "id": "presente-irregolare-piacere",
    "title": "piacere – Präsens",
    "subtitle": "gefallen",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "piaccio"
      },
      {
        "prompt": "tu",
        "answer": "piaci"
      },
      {
        "prompt": "lui/lei",
        "answer": "piace"
      },
      {
        "prompt": "noi",
        "answer": "piacciamo"
      },
      {
        "prompt": "voi",
        "answer": "piacete"
      },
      {
        "prompt": "loro",
        "answer": "piacciono"
      }
    ]
  },
  {
    "id": "presente-irregolare-uscire",
    "title": "uscire – Präsens",
    "subtitle": "hinausgehen",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "esco"
      },
      {
        "prompt": "tu",
        "answer": "esci"
      },
      {
        "prompt": "lui/lei",
        "answer": "esce"
      },
      {
        "prompt": "noi",
        "answer": "usciamo"
      },
      {
        "prompt": "voi",
        "answer": "uscite"
      },
      {
        "prompt": "loro",
        "answer": "escono"
      }
    ]
  },
  {
    "id": "presente-irregolare-bere",
    "title": "bere – Präsens",
    "subtitle": "trinken",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "bevo"
      },
      {
        "prompt": "tu",
        "answer": "bevi"
      },
      {
        "prompt": "lui/lei",
        "answer": "beve"
      },
      {
        "prompt": "noi",
        "answer": "beviamo"
      },
      {
        "prompt": "voi",
        "answer": "bevete"
      },
      {
        "prompt": "loro",
        "answer": "bevono"
      }
    ]
  },
  {
    "id": "presente-irregolare-tenere",
    "title": "tenere – Präsens",
    "subtitle": "halten",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "tengo"
      },
      {
        "prompt": "tu",
        "answer": "tieni"
      },
      {
        "prompt": "lui/lei",
        "answer": "tiene"
      },
      {
        "prompt": "noi",
        "answer": "teniamo"
      },
      {
        "prompt": "voi",
        "answer": "tenete"
      },
      {
        "prompt": "loro",
        "answer": "tengono"
      }
    ]
  },
  {
    "id": "presente-irregolare-salire",
    "title": "salire – Präsens",
    "subtitle": "hinaufsteigen",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "salgo"
      },
      {
        "prompt": "tu",
        "answer": "sali"
      },
      {
        "prompt": "lui/lei",
        "answer": "sale"
      },
      {
        "prompt": "noi",
        "answer": "saliamo"
      },
      {
        "prompt": "voi",
        "answer": "salite"
      },
      {
        "prompt": "loro",
        "answer": "salgono"
      }
    ]
  },
  {
    "id": "presente-irregolare-scegliere",
    "title": "scegliere – Präsens",
    "subtitle": "wählen",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "scelgo"
      },
      {
        "prompt": "tu",
        "answer": "scegli"
      },
      {
        "prompt": "lui/lei",
        "answer": "sceglie"
      },
      {
        "prompt": "noi",
        "answer": "scegliamo"
      },
      {
        "prompt": "voi",
        "answer": "scegliete"
      },
      {
        "prompt": "loro",
        "answer": "scelgono"
      }
    ]
  },
  {
    "id": "presente-regolare-parlare",
    "title": "parlare – Präsens",
    "subtitle": "sprechen (-are)",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "parlo"
      },
      {
        "prompt": "tu",
        "answer": "parli"
      },
      {
        "prompt": "lui/lei",
        "answer": "parla"
      },
      {
        "prompt": "noi",
        "answer": "parliamo"
      },
      {
        "prompt": "voi",
        "answer": "parlate"
      },
      {
        "prompt": "loro",
        "answer": "parlano"
      }
    ]
  },
  {
    "id": "presente-regolare-prendere",
    "title": "prendere – Präsens",
    "subtitle": "nehmen (-ere)",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "prendo"
      },
      {
        "prompt": "tu",
        "answer": "prendi"
      },
      {
        "prompt": "lui/lei",
        "answer": "prende"
      },
      {
        "prompt": "noi",
        "answer": "prendiamo"
      },
      {
        "prompt": "voi",
        "answer": "prendete"
      },
      {
        "prompt": "loro",
        "answer": "prendono"
      }
    ]
  },
  {
    "id": "presente-regolare-dormire",
    "title": "dormire – Präsens",
    "subtitle": "schlafen (-ire)",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "dormo"
      },
      {
        "prompt": "tu",
        "answer": "dormi"
      },
      {
        "prompt": "lui/lei",
        "answer": "dorme"
      },
      {
        "prompt": "noi",
        "answer": "dormiamo"
      },
      {
        "prompt": "voi",
        "answer": "dormite"
      },
      {
        "prompt": "loro",
        "answer": "dormono"
      }
    ]
  },
  {
    "id": "presente-regolare-capire",
    "title": "capire – Präsens",
    "subtitle": "verstehen (-ire, -isc-)",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "capisco"
      },
      {
        "prompt": "tu",
        "answer": "capisci"
      },
      {
        "prompt": "lui/lei",
        "answer": "capisce"
      },
      {
        "prompt": "noi",
        "answer": "capiamo"
      },
      {
        "prompt": "voi",
        "answer": "capite"
      },
      {
        "prompt": "loro",
        "answer": "capiscono"
      }
    ]
  },
  {
    "id": "pronomi-combinati-veraenderung",
    "title": "Indirektes Pronomen – Veränderung",
    "subtitle": "vor lo, la, li, le, ne",
    "category": "Pronomen",
    "items": [
      {
        "prompt": "mi",
        "answer": "me"
      },
      {
        "prompt": "ti",
        "answer": "te"
      },
      {
        "prompt": "gli",
        "answer": "glie-"
      },
      {
        "prompt": "le",
        "answer": "glie-"
      },
      {
        "prompt": "Le (Höflichkeit)",
        "answer": "glie-"
      },
      {
        "prompt": "ci",
        "answer": "ce"
      },
      {
        "prompt": "vi",
        "answer": "ve"
      },
      {
        "prompt": "gli (Plural)",
        "answer": "glie-"
      }
    ]
  },
  {
    "id": "pronomi-combinati-mi",
    "title": "mi (me) + direktes Pronomen",
    "subtitle": "mir + es/sie/davon",
    "category": "Pronomen",
    "items": [
      {
        "prompt": "mi + lo",
        "answer": "me lo"
      },
      {
        "prompt": "mi + la",
        "answer": "me la"
      },
      {
        "prompt": "mi + li",
        "answer": "me li"
      },
      {
        "prompt": "mi + le",
        "answer": "me le"
      },
      {
        "prompt": "mi + ne",
        "answer": "me ne"
      }
    ]
  },
  {
    "id": "pronomi-combinati-ti",
    "title": "ti (te) + direktes Pronomen",
    "subtitle": "dir + es/sie/davon",
    "category": "Pronomen",
    "items": [
      {
        "prompt": "ti + lo",
        "answer": "te lo"
      },
      {
        "prompt": "ti + la",
        "answer": "te la"
      },
      {
        "prompt": "ti + li",
        "answer": "te li"
      },
      {
        "prompt": "ti + le",
        "answer": "te le"
      },
      {
        "prompt": "ti + ne",
        "answer": "te ne"
      }
    ]
  },
  {
    "id": "pronomi-combinati-glie",
    "title": "gli/le/Le (glie-) + direktes Pronomen",
    "subtitle": "ihm/ihr/Ihnen – zusammengeschrieben",
    "category": "Pronomen",
    "items": [
      {
        "prompt": "gli/le + lo",
        "answer": "glielo"
      },
      {
        "prompt": "gli/le + la",
        "answer": "gliela"
      },
      {
        "prompt": "gli/le + li",
        "answer": "glieli"
      },
      {
        "prompt": "gli/le + le",
        "answer": "gliele"
      },
      {
        "prompt": "gli/le + ne",
        "answer": "gliene"
      }
    ]
  },
  {
    "id": "pronomi-combinati-ci",
    "title": "ci (ce) + direktes Pronomen",
    "subtitle": "uns + es/sie/davon",
    "category": "Pronomen",
    "items": [
      {
        "prompt": "ci + lo",
        "answer": "ce lo"
      },
      {
        "prompt": "ci + la",
        "answer": "ce la"
      },
      {
        "prompt": "ci + li",
        "answer": "ce li"
      },
      {
        "prompt": "ci + le",
        "answer": "ce le"
      },
      {
        "prompt": "ci + ne",
        "answer": "ce ne"
      }
    ]
  },
  {
    "id": "pronomi-combinati-vi",
    "title": "vi (ve) + direktes Pronomen",
    "subtitle": "euch + es/sie/davon",
    "category": "Pronomen",
    "items": [
      {
        "prompt": "vi + lo",
        "answer": "ve lo"
      },
      {
        "prompt": "vi + la",
        "answer": "ve la"
      },
      {
        "prompt": "vi + li",
        "answer": "ve li"
      },
      {
        "prompt": "vi + le",
        "answer": "ve le"
      },
      {
        "prompt": "vi + ne",
        "answer": "ve ne"
      }
    ]
  },
  {
    "id": "pronomi-oggetto-diretto-formen",
    "title": "Direkte Objektpronomen",
    "subtitle": "Akkusativ – mich, dich, ihn …",
    "category": "Pronomen",
    "items": [
      {
        "prompt": "mich",
        "answer": "mi"
      },
      {
        "prompt": "dich",
        "answer": "ti"
      },
      {
        "prompt": "ihn/es",
        "answer": "lo"
      },
      {
        "prompt": "sie (Sg.)",
        "answer": "la"
      },
      {
        "prompt": "Sie (Höflichkeit)",
        "answer": "La"
      },
      {
        "prompt": "uns",
        "answer": "ci"
      },
      {
        "prompt": "euch",
        "answer": "vi"
      },
      {
        "prompt": "sie (Pl. m.)",
        "answer": "li"
      },
      {
        "prompt": "sie (Pl. f.)",
        "answer": "le"
      }
    ]
  },
  {
    "id": "pronomi-oggetto-diretto-partizip",
    "title": "Partizip-Anpassung im Passato Prossimo",
    "subtitle": "Pronomen → Partizip-Endung",
    "category": "Pronomen",
    "items": [
      {
        "prompt": "lo",
        "answer": "-o"
      },
      {
        "prompt": "la",
        "answer": "-a"
      },
      {
        "prompt": "li",
        "answer": "-i"
      },
      {
        "prompt": "le",
        "answer": "-e"
      }
    ]
  },
  {
    "id": "pronomi-oggetto-indiretto-formen",
    "title": "Indirekte Objektpronomen",
    "subtitle": "Dativ – Wem?",
    "category": "Pronomen",
    "items": [
      {
        "prompt": "mir",
        "answer": "mi"
      },
      {
        "prompt": "dir",
        "answer": "ti"
      },
      {
        "prompt": "ihm",
        "answer": "gli"
      },
      {
        "prompt": "ihr",
        "answer": "le"
      },
      {
        "prompt": "Ihnen (Höflichkeit)",
        "answer": "Le"
      },
      {
        "prompt": "uns",
        "answer": "ci"
      },
      {
        "prompt": "euch",
        "answer": "vi"
      },
      {
        "prompt": "ihnen (m./f.)",
        "answer": "gli",
        "alt": [
          "loro"
        ]
      }
    ]
  },
  {
    "id": "pronomi-direkt-vs-indirekt",
    "title": "Direkt vs. indirekt",
    "subtitle": "Akkusativ → Dativ",
    "category": "Pronomen",
    "items": [
      {
        "prompt": "ihn (Akk.)",
        "answer": "lo"
      },
      {
        "prompt": "ihm (Dat.)",
        "answer": "gli"
      },
      {
        "prompt": "sie, fem. Sg. (Akk.)",
        "answer": "la"
      },
      {
        "prompt": "ihr (Dat.)",
        "answer": "le"
      },
      {
        "prompt": "sie, mask. Pl. (Akk.)",
        "answer": "li"
      },
      {
        "prompt": "ihnen, mask. (Dat.)",
        "answer": "gli"
      },
      {
        "prompt": "sie, fem. Pl. (Akk.)",
        "answer": "le"
      },
      {
        "prompt": "ihnen, fem. (Dat.)",
        "answer": "gli"
      }
    ]
  },
  {
    "id": "pronomi-soggetto",
    "title": "Subjektpronomen",
    "subtitle": "io, tu, lui …",
    "category": "Pronomen",
    "items": [
      {
        "prompt": "ich",
        "answer": "io"
      },
      {
        "prompt": "du",
        "answer": "tu"
      },
      {
        "prompt": "er",
        "answer": "lui"
      },
      {
        "prompt": "sie (Sg.)",
        "answer": "lei"
      },
      {
        "prompt": "Sie (Höflichkeit)",
        "answer": "Lei"
      },
      {
        "prompt": "wir",
        "answer": "noi"
      },
      {
        "prompt": "ihr",
        "answer": "voi"
      },
      {
        "prompt": "sie (Pl.)",
        "answer": "loro"
      }
    ]
  },
  {
    "id": "pronomi-tonici-forme",
    "title": "Betonte Pronomen",
    "subtitle": "nach Präpositionen",
    "category": "Pronomen",
    "items": [
      {
        "prompt": "mich/mir (1. Sg.)",
        "answer": "me"
      },
      {
        "prompt": "dich/dir (2. Sg.)",
        "answer": "te"
      },
      {
        "prompt": "ihn/ihm (3. Sg. m.)",
        "answer": "lui"
      },
      {
        "prompt": "sie/ihr (3. Sg. f.)",
        "answer": "lei"
      },
      {
        "prompt": "Sie/Ihnen (Höflichkeit)",
        "answer": "Lei"
      },
      {
        "prompt": "uns (1. Pl.)",
        "answer": "noi"
      },
      {
        "prompt": "euch (2. Pl.)",
        "answer": "voi"
      },
      {
        "prompt": "sie/ihnen (3. Pl.)",
        "answer": "loro"
      }
    ]
  },
  {
    "id": "plurale-ca-ga",
    "title": "Plural: -ca / -ga → -che / -ghe",
    "subtitle": "h bleibt (harter Klang)",
    "category": "Substantive",
    "items": [
      {
        "prompt": "l'amica",
        "answer": "le amiche"
      },
      {
        "prompt": "la banca",
        "answer": "le banche"
      },
      {
        "prompt": "la riga",
        "answer": "le righe"
      }
    ]
  },
  {
    "id": "plurale-co-go-betont",
    "title": "Plural: -co / -go → -chi / -ghi",
    "subtitle": "vorletzte Silbe betont",
    "category": "Substantive",
    "items": [
      {
        "prompt": "il lago",
        "answer": "i laghi"
      },
      {
        "prompt": "l'albergo",
        "answer": "gli alberghi"
      },
      {
        "prompt": "il fungo",
        "answer": "i funghi"
      },
      {
        "prompt": "l'amico (Ausnahme)",
        "answer": "gli amici"
      }
    ]
  },
  {
    "id": "plurale-co-go-vorbetont",
    "title": "Plural: -co / -go → -ci / -gi",
    "subtitle": "drittletzte Silbe betont",
    "category": "Substantive",
    "items": [
      {
        "prompt": "il medico",
        "answer": "i medici"
      },
      {
        "prompt": "l'austriaco",
        "answer": "gli austriaci"
      },
      {
        "prompt": "lo psicologo",
        "answer": "gli psicologi"
      },
      {
        "prompt": "l'asparago",
        "answer": "gli asparagi"
      }
    ]
  },
  {
    "id": "plurale-cia-gia",
    "title": "Plural: -cia / -gia",
    "subtitle": "Konsonant davor → -ce/-ge, Vokal davor → -cie/-gie",
    "category": "Substantive",
    "items": [
      {
        "prompt": "l'arancia",
        "answer": "le arance"
      },
      {
        "prompt": "la camicia",
        "answer": "le camicie"
      }
    ]
  },
  {
    "id": "plurale-io",
    "title": "Plural: -io",
    "subtitle": "-i unbetont → -i, -i betont → -ii",
    "category": "Substantive",
    "items": [
      {
        "prompt": "il negozio",
        "answer": "i negozi"
      },
      {
        "prompt": "lo zìo",
        "answer": "gli zìi"
      }
    ]
  },
  {
    "id": "plurale-irregolare",
    "title": "Unregelmäßige Plurale",
    "subtitle": "auswendig lernen",
    "category": "Substantive",
    "items": [
      {
        "prompt": "l'uovo (das Ei)",
        "answer": "le uova"
      },
      {
        "prompt": "l'uomo (der Mann)",
        "answer": "gli uomini"
      },
      {
        "prompt": "il ginocchio (das Knie)",
        "answer": "le ginocchia"
      },
      {
        "prompt": "il braccio (der Arm)",
        "answer": "le braccia"
      },
      {
        "prompt": "l'orecchio (das Ohr)",
        "answer": "le orecchie"
      },
      {
        "prompt": "il dito (der Finger)",
        "answer": "le dita"
      },
      {
        "prompt": "il labbro (die Lippe)",
        "answer": "le labbra"
      },
      {
        "prompt": "la mano (die Hand)",
        "answer": "le mani"
      }
    ]
  },
  {
    "id": "sostantivo-plurale-regolare-endungen",
    "title": "Plural – regelmäßige Endungen",
    "subtitle": "Singular → Plural",
    "category": "Substantive",
    "items": [
      {
        "prompt": "il libro",
        "answer": "i libri"
      },
      {
        "prompt": "il giornale",
        "answer": "i giornali"
      },
      {
        "prompt": "la casa",
        "answer": "le case"
      },
      {
        "prompt": "la chiave",
        "answer": "le chiavi"
      },
      {
        "prompt": "il giornalista",
        "answer": "i giornalisti"
      }
    ]
  },
  {
    "id": "sostantivo-plurale-regolare-invariabili",
    "title": "Plural – unveränderliche Substantive",
    "subtitle": "Konsonant / betonter Vokal / Kurzform",
    "category": "Substantive",
    "items": [
      {
        "prompt": "il bar",
        "answer": "i bar"
      },
      {
        "prompt": "il caffè",
        "answer": "i caffè"
      },
      {
        "prompt": "la città",
        "answer": "le città"
      },
      {
        "prompt": "la foto",
        "answer": "le foto"
      },
      {
        "prompt": "il film",
        "answer": "i film"
      },
      {
        "prompt": "lo sport",
        "answer": "gli sport"
      }
    ]
  },
  {
    "id": "sostantivo-plurale-regolare-io",
    "title": "Plural – Substantive auf -io",
    "subtitle": "il negozio → i negozi",
    "category": "Substantive",
    "items": [
      {
        "prompt": "il negozio",
        "answer": "i negozi"
      },
      {
        "prompt": "lo zìo",
        "answer": "gli zìi"
      }
    ]
  },
  {
    "id": "stare-presente",
    "title": "stare – Präsens",
    "subtitle": "Hilfsverb der Verlaufsform",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "sto"
      },
      {
        "prompt": "tu",
        "answer": "stai"
      },
      {
        "prompt": "lui/lei",
        "answer": "sta"
      },
      {
        "prompt": "noi",
        "answer": "stiamo"
      },
      {
        "prompt": "voi",
        "answer": "state"
      },
      {
        "prompt": "loro",
        "answer": "stanno"
      }
    ]
  },
  {
    "id": "gerundio-bildung",
    "title": "Infinitiv → Gerundio",
    "subtitle": "Verlaufsform (stare + gerundio)",
    "category": "Verben",
    "items": [
      {
        "prompt": "parlare",
        "answer": "parlando"
      },
      {
        "prompt": "prendere",
        "answer": "prendendo"
      },
      {
        "prompt": "dormire",
        "answer": "dormendo"
      },
      {
        "prompt": "fare",
        "answer": "facendo"
      },
      {
        "prompt": "dire",
        "answer": "dicendo"
      },
      {
        "prompt": "bere",
        "answer": "bevendo"
      }
    ]
  },
  {
    "id": "irregolari-presente-io",
    "title": "Unregelmäßige Verben – Präsens (io)",
    "subtitle": "1. Person Singular",
    "category": "Verben",
    "items": [
      {
        "prompt": "essere – io",
        "answer": "sono"
      },
      {
        "prompt": "avere – io",
        "answer": "ho"
      },
      {
        "prompt": "fare – io",
        "answer": "faccio"
      },
      {
        "prompt": "dare – io",
        "answer": "do"
      },
      {
        "prompt": "stare – io",
        "answer": "sto"
      },
      {
        "prompt": "andare – io",
        "answer": "vado"
      },
      {
        "prompt": "venire – io",
        "answer": "vengo"
      },
      {
        "prompt": "dire – io",
        "answer": "dico"
      },
      {
        "prompt": "uscire – io",
        "answer": "esco"
      },
      {
        "prompt": "bere – io",
        "answer": "bevo"
      }
    ]
  },
  {
    "id": "irregolari-presente-io-2",
    "title": "Unregelmäßige Verben – Präsens (io) II",
    "subtitle": "Modal- und weitere Verben",
    "category": "Verben",
    "items": [
      {
        "prompt": "volere – io",
        "answer": "voglio"
      },
      {
        "prompt": "potere – io",
        "answer": "posso"
      },
      {
        "prompt": "dovere – io",
        "answer": "devo"
      },
      {
        "prompt": "sapere – io",
        "answer": "so"
      },
      {
        "prompt": "piacere – io",
        "answer": "piaccio"
      },
      {
        "prompt": "tenere – io",
        "answer": "tengo"
      },
      {
        "prompt": "salire – io",
        "answer": "salgo"
      },
      {
        "prompt": "scegliere – io",
        "answer": "scelgo"
      },
      {
        "prompt": "rimanere – io",
        "answer": "rimango"
      },
      {
        "prompt": "morire – io",
        "answer": "muoio"
      }
    ]
  },
  {
    "id": "irregolari-presente-loro",
    "title": "Unregelmäßige Verben – Präsens (loro)",
    "subtitle": "3. Person Plural",
    "category": "Verben",
    "items": [
      {
        "prompt": "essere – loro",
        "answer": "sono"
      },
      {
        "prompt": "avere – loro",
        "answer": "hanno"
      },
      {
        "prompt": "fare – loro",
        "answer": "fanno"
      },
      {
        "prompt": "dare – loro",
        "answer": "danno"
      },
      {
        "prompt": "stare – loro",
        "answer": "stanno"
      },
      {
        "prompt": "andare – loro",
        "answer": "vanno"
      },
      {
        "prompt": "venire – loro",
        "answer": "vengono"
      },
      {
        "prompt": "dire – loro",
        "answer": "dicono"
      },
      {
        "prompt": "bere – loro",
        "answer": "bevono"
      },
      {
        "prompt": "sapere – loro",
        "answer": "sanno"
      }
    ]
  },
  {
    "id": "irregolari-partizip",
    "title": "Unregelmäßige Partizipien",
    "subtitle": "Infinitiv → Partizip",
    "category": "Verben",
    "items": [
      {
        "prompt": "essere",
        "answer": "stato"
      },
      {
        "prompt": "avere",
        "answer": "avuto"
      },
      {
        "prompt": "fare",
        "answer": "fatto"
      },
      {
        "prompt": "dire",
        "answer": "detto"
      },
      {
        "prompt": "bere",
        "answer": "bevuto"
      },
      {
        "prompt": "venire",
        "answer": "venuto"
      },
      {
        "prompt": "rimanere",
        "answer": "rimasto"
      },
      {
        "prompt": "morire",
        "answer": "morto"
      },
      {
        "prompt": "nascere",
        "answer": "nato"
      },
      {
        "prompt": "vedere",
        "answer": "visto"
      }
    ]
  },
  {
    "id": "irregolari-partizip-2",
    "title": "Unregelmäßige Partizipien II",
    "subtitle": "Infinitiv → Partizip",
    "category": "Verben",
    "items": [
      {
        "prompt": "vivere",
        "answer": "vissuto"
      },
      {
        "prompt": "leggere",
        "answer": "letto"
      },
      {
        "prompt": "scrivere",
        "answer": "scritto"
      },
      {
        "prompt": "prendere",
        "answer": "preso"
      },
      {
        "prompt": "mettere",
        "answer": "messo"
      },
      {
        "prompt": "chiudere",
        "answer": "chiuso"
      },
      {
        "prompt": "aprire",
        "answer": "aperto"
      },
      {
        "prompt": "offrire",
        "answer": "offerto"
      },
      {
        "prompt": "chiedere",
        "answer": "chiesto"
      },
      {
        "prompt": "rispondere",
        "answer": "risposto"
      }
    ]
  },
  {
    "id": "irregolari-partizip-3",
    "title": "Unregelmäßige Partizipien III",
    "subtitle": "Infinitiv → Partizip",
    "category": "Verben",
    "items": [
      {
        "prompt": "spegnere",
        "answer": "spento"
      },
      {
        "prompt": "cuocere",
        "answer": "cotto"
      },
      {
        "prompt": "piacere",
        "answer": "piaciuto"
      },
      {
        "prompt": "scegliere",
        "answer": "scelto"
      },
      {
        "prompt": "tenere",
        "answer": "tenuto"
      },
      {
        "prompt": "volere",
        "answer": "voluto"
      },
      {
        "prompt": "potere",
        "answer": "potuto"
      },
      {
        "prompt": "dovere",
        "answer": "dovuto"
      },
      {
        "prompt": "sapere",
        "answer": "saputo"
      },
      {
        "prompt": "salire",
        "answer": "salito"
      }
    ]
  },
  {
    "id": "irregolari-imperfetto-io",
    "title": "Unregelmäßige Verben – Imperfetto (io)",
    "subtitle": "1. Person Singular",
    "category": "Verben",
    "items": [
      {
        "prompt": "essere – io",
        "answer": "ero"
      },
      {
        "prompt": "fare – io",
        "answer": "facevo"
      },
      {
        "prompt": "dire – io",
        "answer": "dicevo"
      },
      {
        "prompt": "bere – io",
        "answer": "bevevo"
      },
      {
        "prompt": "avere – io",
        "answer": "avevo"
      },
      {
        "prompt": "stare – io",
        "answer": "stavo"
      },
      {
        "prompt": "andare – io",
        "answer": "andavo"
      },
      {
        "prompt": "venire – io",
        "answer": "venivo"
      },
      {
        "prompt": "vedere – io",
        "answer": "vedevo"
      },
      {
        "prompt": "vivere – io",
        "answer": "vivevo"
      }
    ]
  },
  {
    "id": "irregolari-futuro-stamm",
    "title": "Unregelmäßige Verben – Futuro-Stamm",
    "subtitle": "auch für Condizionale",
    "category": "Verben",
    "items": [
      {
        "prompt": "essere",
        "answer": "sar-"
      },
      {
        "prompt": "avere",
        "answer": "avr-"
      },
      {
        "prompt": "fare",
        "answer": "far-"
      },
      {
        "prompt": "andare",
        "answer": "andr-"
      },
      {
        "prompt": "venire",
        "answer": "verr-"
      },
      {
        "prompt": "volere",
        "answer": "vorr-"
      },
      {
        "prompt": "potere",
        "answer": "potr-"
      },
      {
        "prompt": "dovere",
        "answer": "dovr-"
      },
      {
        "prompt": "sapere",
        "answer": "sapr-"
      },
      {
        "prompt": "vedere",
        "answer": "vedr-"
      }
    ]
  },
  {
    "id": "irregolari-futuro-stamm-2",
    "title": "Unregelmäßige Verben – Futuro-Stamm II",
    "subtitle": "auch für Condizionale",
    "category": "Verben",
    "items": [
      {
        "prompt": "tenere",
        "answer": "terr-"
      },
      {
        "prompt": "rimanere",
        "answer": "rimarr-"
      },
      {
        "prompt": "bere",
        "answer": "berr-"
      },
      {
        "prompt": "vivere",
        "answer": "vivr-"
      },
      {
        "prompt": "dare",
        "answer": "dar-"
      },
      {
        "prompt": "stare",
        "answer": "star-"
      },
      {
        "prompt": "dire",
        "answer": "dir-"
      },
      {
        "prompt": "uscire",
        "answer": "uscir-"
      }
    ]
  },
  {
    "id": "irregolari-hilfsverb",
    "title": "Hilfsverb im Passato Prossimo",
    "subtitle": "essere oder avere",
    "category": "Verben",
    "items": [
      {
        "prompt": "essere",
        "answer": "essere"
      },
      {
        "prompt": "avere",
        "answer": "avere"
      },
      {
        "prompt": "andare",
        "answer": "essere"
      },
      {
        "prompt": "venire",
        "answer": "essere"
      },
      {
        "prompt": "stare",
        "answer": "essere"
      },
      {
        "prompt": "uscire",
        "answer": "essere"
      },
      {
        "prompt": "rimanere",
        "answer": "essere"
      },
      {
        "prompt": "nascere",
        "answer": "essere"
      },
      {
        "prompt": "morire",
        "answer": "essere"
      },
      {
        "prompt": "fare",
        "answer": "avere"
      }
    ]
  },
  {
    "id": "riflessivi-pronomi",
    "title": "Reflexivpronomen",
    "subtitle": "mi, ti, si …",
    "category": "Pronomen",
    "items": [
      {
        "prompt": "io",
        "answer": "mi"
      },
      {
        "prompt": "tu",
        "answer": "ti"
      },
      {
        "prompt": "lui/lei/Lei",
        "answer": "si"
      },
      {
        "prompt": "noi",
        "answer": "ci"
      },
      {
        "prompt": "voi",
        "answer": "vi"
      },
      {
        "prompt": "loro",
        "answer": "si"
      }
    ]
  },
  {
    "id": "alzarsi-presente",
    "title": "alzarsi – Präsens",
    "subtitle": "aufstehen",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "mi alzo"
      },
      {
        "prompt": "tu",
        "answer": "ti alzi"
      },
      {
        "prompt": "lui/lei",
        "answer": "si alza"
      },
      {
        "prompt": "noi",
        "answer": "ci alziamo"
      },
      {
        "prompt": "voi",
        "answer": "vi alzate"
      },
      {
        "prompt": "loro",
        "answer": "si alzano"
      }
    ]
  },
  {
    "id": "alzarsi-passato-prossimo",
    "title": "alzarsi – Passato prossimo",
    "subtitle": "aufgestanden sein (immer essere)",
    "category": "Verben",
    "items": [
      {
        "prompt": "io",
        "answer": "mi sono alzato",
        "alt": [
          "mi sono alzata"
        ]
      },
      {
        "prompt": "tu",
        "answer": "ti sei alzato",
        "alt": [
          "ti sei alzata"
        ]
      },
      {
        "prompt": "lui",
        "answer": "si è alzato"
      },
      {
        "prompt": "lei",
        "answer": "si è alzata"
      },
      {
        "prompt": "noi",
        "answer": "ci siamo alzati",
        "alt": [
          "ci siamo alzate"
        ]
      },
      {
        "prompt": "voi",
        "answer": "vi siete alzati",
        "alt": [
          "vi siete alzate"
        ]
      },
      {
        "prompt": "loro (m)",
        "answer": "si sono alzati"
      },
      {
        "prompt": "loro (f)",
        "answer": "si sono alzate"
      }
    ]
  },
  {
    "id": "riflessivi-verbi-importanti",
    "title": "Wichtige reflexive Verben",
    "subtitle": "Infinitiv (deutsch → italienisch)",
    "category": "Verben",
    "items": [
      {
        "prompt": "heißen",
        "answer": "chiamarsi"
      },
      {
        "prompt": "aufstehen",
        "answer": "alzarsi"
      },
      {
        "prompt": "aufwachen",
        "answer": "svegliarsi"
      },
      {
        "prompt": "sich waschen",
        "answer": "lavarsi"
      },
      {
        "prompt": "sich anziehen",
        "answer": "vestirsi"
      },
      {
        "prompt": "sich kämmen",
        "answer": "pettinarsi"
      },
      {
        "prompt": "einschlafen",
        "answer": "addormentarsi"
      },
      {
        "prompt": "sich ausruhen",
        "answer": "riposarsi"
      },
      {
        "prompt": "sich amüsieren",
        "answer": "divertirsi"
      },
      {
        "prompt": "sich langweilen",
        "answer": "annoiarsi"
      },
      {
        "prompt": "heiraten",
        "answer": "sposarsi"
      },
      {
        "prompt": "sich fühlen",
        "answer": "sentirsi"
      }
    ]
  }
];
