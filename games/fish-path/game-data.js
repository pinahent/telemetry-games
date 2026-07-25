"use strict";

const MOVEMENT_MAP = Object.freeze({ width: 1000, height: 620, margin: 24 });

const SCORE_WEIGHTS = Object.freeze({
  pathSimilarity: 0.6,
  receiverCountAccuracy: 0.3,
  endpointAccuracy: 0.1
});

const RECEIVER_PASS_ACCURACY = 0.9;
const STAR_RATINGS = Object.freeze([
  Object.freeze({ minimum: 100, stars: 3 }),
  Object.freeze({ minimum: 95, stars: 2 }),
  Object.freeze({ minimum: 90, stars: 1 })
]);

const DIFFICULTY_SETTINGS = Object.freeze({
  easy: Object.freeze({
    receiverCount: 4,
    detectionRadius: 84,
    pathComplexity: 1,
    pathJitter: 11,
    pingInterval: 102,
    visibleDetectionRadius: true,
    pingAnimationDuration: 1350,
    targetScore: 90,
    evaluationTolerance: 122,
    endpointTolerance: 72,
    pathSampleSpacing: 22,
    inputSampleSpacing: 7,
    startRadius: 43,
    endRadius: 43,
    resumeRadius: 36,
    receiverAlongJitter: 12,
    receiverOffsetJitter: 0.08,
    minimumActiveRatio: 0.5,
    minimumDistinctCounts: 2,
    maximumDominance: 0.72,
    minimumOverlapPairs: 0,
    maximumOverlapPairs: 2,
    maxAttempts: 3
  }),
  medium: Object.freeze({
    receiverCount: 5,
    detectionRadius: 112,
    pathComplexity: 2,
    pathJitter: 21,
    pingInterval: 82,
    visibleDetectionRadius: true,
    pingAnimationDuration: 1050,
    targetScore: 90,
    evaluationTolerance: 91,
    endpointTolerance: 58,
    pathSampleSpacing: 20,
    inputSampleSpacing: 7,
    startRadius: 39,
    endRadius: 39,
    resumeRadius: 34,
    receiverAlongJitter: 18,
    receiverOffsetJitter: 0.1,
    minimumActiveRatio: 0.66,
    minimumDistinctCounts: 2,
    maximumDominance: 0.62,
    minimumOverlapPairs: 1,
    maximumOverlapPairs: 7,
    maxAttempts: 3
  }),
  hard: Object.freeze({
    receiverCount: 7,
    detectionRadius: 138,
    pathComplexity: 3,
    pathJitter: 29,
    pingInterval: 66,
    visibleDetectionRadius: true,
    pingAnimationDuration: 720,
    targetScore: 90,
    evaluationTolerance: 70,
    endpointTolerance: 46,
    pathSampleSpacing: 18,
    inputSampleSpacing: 6,
    startRadius: 35,
    endRadius: 35,
    resumeRadius: 30,
    receiverAlongJitter: 22,
    receiverOffsetJitter: 0.12,
    minimumActiveRatio: 0.78,
    minimumDistinctCounts: 3,
    maximumDominance: 0.48,
    minimumOverlapPairs: 5,
    maximumOverlapPairs: 28,
    maxAttempts: 3
  })
});

const MOVEMENT_LEVELS = Object.freeze([
  {
    id: "lagoon-arc",
    difficulty: "easy",
    seed: 18427,
    tuning: { receiverCount: 4, detectionRadius: 80, pingInterval: 108, pathJitter: 8 },
    receiverFractions: [0.16, 0.39, 0.65, 0.84],
    receiverOffsetPattern: [0.08, -0.68, 0.58, -0.12],
    name: { en: "Lagoon arc", de: "Lagunenbogen" },
    brief: {
      en: "A broad, smooth route crosses open water. Use the visible listening radii to connect the receiver counts.",
      de: "Eine breite, ruhige Route führt durch offenes Wasser. Nutze die sichtbaren Hörbereiche, um die Zählwerte zu verbinden."
    },
    start: { x: 82, y: 390 },
    end: { x: 918, y: 250 },
    anchors: [
      { x: 82, y: 390, jitter: 0 },
      { x: 235, y: 330, jitter: 0.75 },
      { x: 420, y: 350, jitter: 1 },
      { x: 610, y: 245, jitter: 0.9 },
      { x: 770, y: 205, jitter: 0.75 },
      { x: 918, y: 250, jitter: 0 }
    ],
    obstacles: [],
    features: [
      { type: "vegetation", x: 365, y: 455, width: 210, height: 105, label: { en: "reed margin", de: "Röhrichtrand" } }
    ],
    hint: {
      en: "Receivers with larger counts should overlap more of the regularly spaced ping positions.",
      de: "Empfänger mit höheren Zählwerten sollten mehr der regelmäßig verteilten Ping-Positionen überdecken."
    },
    explanation: {
      en: "The route is intentionally smooth; the visible radii make the relationship between ping spacing and receiver counts explicit.",
      de: "Die Route ist bewusst ruhig; die sichtbaren Radien zeigen den Zusammenhang zwischen Ping-Abstand und Zählwerten deutlich."
    }
  },
  {
    id: "river-bend",
    difficulty: "easy",
    seed: 29103,
    tuning: { receiverCount: 5, detectionRadius: 92, pingInterval: 94, pathJitter: 14 },
    receiverFractions: [0.11, 0.3, 0.5, 0.71, 0.88],
    receiverOffsetPattern: [-0.52, 0.24, -0.7, 0.43, 0.1],
    name: { en: "River bend", de: "Flussbiegung" },
    brief: {
      en: "Follow the receiver evidence around a shallow habitat patch without treating it as an impassable barrier.",
      de: "Folge den Empfängerhinweisen um einen Flachwasserbereich, ohne ihn als unpassierbare Barriere zu behandeln."
    },
    start: { x: 78, y: 510 },
    end: { x: 920, y: 120 },
    anchors: [
      { x: 78, y: 510, jitter: 0 },
      { x: 210, y: 475, jitter: 0.7 },
      { x: 360, y: 390, jitter: 1 },
      { x: 520, y: 330, jitter: 0.9 },
      { x: 665, y: 235, jitter: 1 },
      { x: 805, y: 170, jitter: 0.8 },
      { x: 920, y: 120, jitter: 0 }
    ],
    obstacles: [],
    features: [
      { type: "shallow", x: 500, y: 390, width: 255, height: 145, label: { en: "shallow habitat", de: "Flachwasserhabitat" } }
    ],
    hint: {
      en: "The shallow area is passable. Concentrate on which receivers could hear several consecutive pings.",
      de: "Das Flachwasser ist passierbar. Achte darauf, welche Empfänger mehrere aufeinanderfolgende Pings hören konnten."
    },
    explanation: {
      en: "Counts are produced by proximity to ping positions, while the shallow feature provides context rather than a hard collision boundary.",
      de: "Die Zählwerte entstehen durch Nähe zu Ping-Positionen; das Flachwasser liefert Kontext, ist aber keine feste Kollisionsgrenze."
    }
  },
  {
    id: "reed-sweep",
    difficulty: "easy",
    seed: 32617,
    tuning: { receiverCount: 4, detectionRadius: 86, pingInterval: 100, pathJitter: 10 },
    receiverFractions: [0.14, 0.38, 0.63, 0.86],
    receiverOffsetPattern: [0.58, -0.16, -0.62, 0.14],
    name: { en: "Reed sweep", de: "Schilfschwung" },
    brief: {
      en: "A gentle S-shaped route crosses two reed margins. The separated receivers provide a clear introduction to changing direction.",
      de: "Eine sanfte S-Kurve führt an zwei Schilfrändern vorbei. Die getrennten Empfänger führen übersichtlich in Richtungswechsel ein."
    },
    start: { x: 84, y: 132 },
    end: { x: 916, y: 478 },
    anchors: [
      { x: 84, y: 132, jitter: 0 },
      { x: 230, y: 175, jitter: 0.65 },
      { x: 390, y: 285, jitter: 0.85 },
      { x: 545, y: 260, jitter: 0.8 },
      { x: 700, y: 375, jitter: 0.8 },
      { x: 835, y: 430, jitter: 0.65 },
      { x: 916, y: 478, jitter: 0 }
    ],
    obstacles: [],
    features: [
      { type: "vegetation", x: 160, y: 390, width: 185, height: 105, label: { en: "reed bed", de: "Schilfbett" } },
      { type: "vegetation", x: 655, y: 78, width: 180, height: 96, label: { en: "rush margin", de: "Binsensaum" } }
    ],
    hint: {
      en: "Use the order of low and high counts to decide where the S-curve changes direction.",
      de: "Nutze die Reihenfolge niedriger und hoher Werte, um die Richtungswechsel der S-Kurve zu bestimmen."
    },
    explanation: {
      en: "The receivers are deliberately separated, so each count mainly constrains one section of the route.",
      de: "Die Empfänger sind bewusst getrennt, sodass jeder Wert hauptsächlich einen Routenabschnitt eingrenzt."
    }
  },
  {
    id: "open-water-wave",
    difficulty: "easy",
    seed: 35891,
    tuning: { receiverCount: 5, detectionRadius: 82, pingInterval: 104, pathJitter: 12 },
    receiverFractions: [0.12, 0.31, 0.5, 0.69, 0.87],
    receiverOffsetPattern: [-0.64, 0.12, 0.6, -0.52, 0.14],
    name: { en: "Open-water wave", de: "Freiwasserwelle" },
    brief: {
      en: "A wide wave crosses open water with no solid obstacles. Focus on ping spacing and the alternating receiver evidence.",
      de: "Eine breite Welle führt ohne feste Hindernisse durch offenes Wasser. Achte auf Ping-Abstände und wechselnde Empfängerhinweise."
    },
    start: { x: 74, y: 308 },
    end: { x: 926, y: 316 },
    anchors: [
      { x: 74, y: 308, jitter: 0 },
      { x: 210, y: 205, jitter: 0.7 },
      { x: 365, y: 175, jitter: 0.75 },
      { x: 515, y: 320, jitter: 0.9 },
      { x: 670, y: 445, jitter: 0.8 },
      { x: 820, y: 405, jitter: 0.65 },
      { x: 926, y: 316, jitter: 0 }
    ],
    obstacles: [],
    features: [
      { type: "shallow", x: 398, y: 395, width: 215, height: 118, label: { en: "sand flat", de: "Sandfläche" } }
    ],
    hint: {
      en: "The route first rises, then falls. Match that broad wave to the receivers with repeated detections.",
      de: "Die Route steigt zuerst und fällt dann. Ordne diese breite Welle den Empfängern mit wiederholten Erfassungen zu."
    },
    explanation: {
      en: "Without a collision obstacle, the count sequence and regular ping spacing carry the full reconstruction task.",
      de: "Ohne Kollisionshindernis tragen die Wertfolge und die regelmäßigen Ping-Abstände die gesamte Rekonstruktion."
    }
  },
  {
    id: "harbor-glide",
    difficulty: "easy",
    seed: 37243,
    tuning: { receiverCount: 4, detectionRadius: 88, pingInterval: 98, pathJitter: 13 },
    receiverFractions: [0.17, 0.4, 0.65, 0.86],
    receiverOffsetPattern: [-0.58, 0.22, 0.62, -0.18],
    name: { en: "Harbor glide", de: "Hafengleiten" },
    brief: {
      en: "The fish climbs steadily from a sheltered harbor toward open water, with one broad bend near the middle.",
      de: "Der Fisch steigt aus einem geschützten Hafen ins Freiwasser auf, mit einer breiten Biegung in der Mitte."
    },
    start: { x: 88, y: 522 },
    end: { x: 912, y: 96 },
    anchors: [
      { x: 88, y: 522, jitter: 0 },
      { x: 220, y: 486, jitter: 0.55 },
      { x: 365, y: 398, jitter: 0.7 },
      { x: 510, y: 302, jitter: 0.85 },
      { x: 665, y: 250, jitter: 0.75 },
      { x: 800, y: 150, jitter: 0.6 },
      { x: 912, y: 96, jitter: 0 }
    ],
    obstacles: [],
    features: [
      { type: "vegetation", x: 82, y: 360, width: 170, height: 108, label: { en: "harbor grass", de: "Hafengras" } },
      { type: "shallow", x: 650, y: 420, width: 205, height: 110, label: { en: "sandy shelf", de: "Sandbank" } }
    ],
    hint: {
      en: "Look for a mostly diagonal route, then use the middle receiver to place the broad bend.",
      de: "Suche eine überwiegend diagonale Route und nutze den mittleren Empfänger, um die breite Biegung zu platzieren."
    },
    explanation: {
      en: "This level varies the start and end orientation while keeping the receiver evidence clean and separated.",
      de: "Dieses Level variiert die Ausrichtung von Start und Ende, hält die Empfängerhinweise aber klar und getrennt."
    }
  },
  {
    id: "delta-lane",
    difficulty: "easy",
    seed: 39971,
    tuning: { receiverCount: 5, detectionRadius: 90, pingInterval: 92, pathJitter: 15 },
    receiverFractions: [0.1, 0.28, 0.49, 0.7, 0.89],
    receiverOffsetPattern: [0.5, -0.54, 0.18, 0.58, -0.2],
    name: { en: "Delta lane", de: "Deltarinne" },
    brief: {
      en: "A longer diagonal route changes direction twice between shallow delta habitats.",
      de: "Eine längere diagonale Route wechselt zwischen flachen Deltahabitaten zweimal die Richtung."
    },
    start: { x: 70, y: 102 },
    end: { x: 930, y: 526 },
    anchors: [
      { x: 70, y: 102, jitter: 0 },
      { x: 205, y: 155, jitter: 0.6 },
      { x: 350, y: 275, jitter: 0.75 },
      { x: 500, y: 245, jitter: 0.85 },
      { x: 650, y: 365, jitter: 0.85 },
      { x: 805, y: 405, jitter: 0.65 },
      { x: 930, y: 526, jitter: 0 }
    ],
    obstacles: [],
    features: [
      { type: "shallow", x: 205, y: 350, width: 190, height: 120, label: { en: "delta shelf", de: "Deltaflach" } },
      { type: "vegetation", x: 680, y: 90, width: 180, height: 105, label: { en: "marsh edge", de: "Marschrand" } }
    ],
    hint: {
      en: "The counts describe two gentle turns rather than one straight diagonal.",
      de: "Die Zählwerte beschreiben zwei sanfte Kurven statt einer geraden Diagonale."
    },
    explanation: {
      en: "Five separated receivers and slightly closer pings make this the most detailed Easy reconstruction.",
      de: "Fünf getrennte Empfänger und etwas engere Pings machen dies zur detailreichsten leichten Rekonstruktion."
    }
  },
  {
    id: "rocky-detour",
    difficulty: "medium",
    seed: 41789,
    tuning: { receiverCount: 5, detectionRadius: 108, pingInterval: 86, pathJitter: 18 },
    receiverFractions: [0.12, 0.29, 0.49, 0.69, 0.86],
    receiverOffsetPattern: [0.16, -0.46, 0.62, -0.38, 0.42],
    name: { en: "Rocky detour", de: "Felsiger Umweg" },
    brief: {
      en: "A central rock ridge blocks the direct route. Infer whether the fish passed north or south from the receiver counts.",
      de: "Ein zentraler Felsrücken blockiert die direkte Route. Leite aus den Zählwerten ab, ob der Fisch nördlich oder südlich vorbeizog."
    },
    start: { x: 82, y: 360 },
    end: { x: 920, y: 330 },
    anchors: [
      { x: 82, y: 360, jitter: 0 },
      { x: 225, y: 255, jitter: 0.6 },
      { x: 360, y: 150, jitter: 0.5 },
      { x: 520, y: 105, jitter: 0.35 },
      { x: 685, y: 145, jitter: 0.5 },
      { x: 815, y: 235, jitter: 0.65 },
      { x: 920, y: 330, jitter: 0 }
    ],
    obstacles: [
      { type: "rock", shape: "rect", x: 420, y: 220, width: 205, height: 235, passable: false, label: { en: "rock ridge", de: "Felsrücken" } }
    ],
    features: [],
    hint: {
      en: "The direct centre line is impossible. Compare the stronger northern receiver counts with the sparse southern evidence.",
      de: "Die direkte Mittellinie ist unmöglich. Vergleiche die stärkeren nördlichen Zählwerte mit den schwachen südlichen Hinweisen."
    },
    explanation: {
      en: "The hidden path bends north of the ridge, and the receiver counts are calculated from the pings along that detour.",
      de: "Der verborgene Pfad biegt nördlich um den Rücken; die Empfängerwerte werden aus den Pings entlang dieses Umwegs berechnet."
    }
  },
  {
    id: "island-channel",
    difficulty: "medium",
    seed: 53371,
    tuning: { receiverCount: 6, detectionRadius: 120, pingInterval: 76, pathJitter: 24 },
    receiverFractions: [0.1, 0.24, 0.4, 0.57, 0.73, 0.9],
    receiverOffsetPattern: [-0.34, 0.32, -0.48, 0.52, -0.25, 0.18],
    name: { en: "Island channel", de: "Inselkanal" },
    brief: {
      en: "The island divides the water into two possible arcs. Use the complete pattern of receiver counts to choose the more plausible channel.",
      de: "Die Insel teilt das Wasser in zwei mögliche Bögen. Nutze das vollständige Muster der Zählwerte, um den plausibleren Kanal zu wählen."
    },
    start: { x: 72, y: 315 },
    end: { x: 928, y: 315 },
    anchors: [
      { x: 72, y: 315, jitter: 0 },
      { x: 210, y: 430, jitter: 0.55 },
      { x: 355, y: 505, jitter: 0.4 },
      { x: 510, y: 535, jitter: 0.25 },
      { x: 675, y: 495, jitter: 0.4 },
      { x: 815, y: 420, jitter: 0.55 },
      { x: 928, y: 315, jitter: 0 }
    ],
    obstacles: [
      { type: "island", shape: "circle", x: 505, y: 300, radius: 126, passable: false, label: { en: "island", de: "Insel" } }
    ],
    features: [],
    hint: {
      en: "The lower receivers should explain several pings, while receivers above the island should remain comparatively quiet.",
      de: "Die unteren Empfänger sollten mehrere Pings erklären, während die Empfänger oberhalb der Insel vergleichsweise ruhig bleiben."
    },
    explanation: {
      en: "The route uses the southern channel; the target counts distinguish it from an otherwise plausible northern alternative.",
      de: "Die Route nutzt den südlichen Kanal; die Zielwerte unterscheiden ihn von einer ansonsten plausiblen Nordalternative."
    }
  },
  {
    id: "sandbar-turn",
    difficulty: "medium",
    seed: 54883,
    tuning: { receiverCount: 5, detectionRadius: 114, pingInterval: 84, pathJitter: 20 },
    receiverFractions: [0.11, 0.3, 0.5, 0.7, 0.88],
    receiverOffsetPattern: [0.42, -0.32, 0.5, -0.46, 0.24],
    name: { en: "Sandbar turn", de: "Sandbankkurve" },
    brief: {
      en: "A circular sandbar forces a long northern arc before the route turns toward the lower-right end field.",
      de: "Eine runde Sandbank erzwingt einen langen Nordbogen, bevor die Route zum rechten unteren Endfeld abbiegt."
    },
    start: { x: 78, y: 158 },
    end: { x: 922, y: 472 },
    anchors: [
      { x: 78, y: 158, jitter: 0 },
      { x: 220, y: 112, jitter: 0.55 },
      { x: 365, y: 104, jitter: 0.45 },
      { x: 520, y: 145, jitter: 0.35 },
      { x: 665, y: 250, jitter: 0.55 },
      { x: 805, y: 365, jitter: 0.65 },
      { x: 922, y: 472, jitter: 0 }
    ],
    obstacles: [
      { type: "island", shape: "circle", x: 500, y: 330, radius: 112, passable: false, label: { en: "sandbar", de: "Sandbank" } }
    ],
    features: [
      { type: "shallow", x: 145, y: 370, width: 190, height: 115, label: { en: "mud flat", de: "Schlickfläche" } }
    ],
    hint: {
      en: "The early pings stay north of the sandbar; the later counts reveal where the route begins descending.",
      de: "Die frühen Pings bleiben nördlich der Sandbank; die späteren Werte zeigen, wo die Route abwärts führt."
    },
    explanation: {
      en: "The obstacle removes the direct diagonal and the overlapping receiver fields refine the position of the turn.",
      de: "Das Hindernis schließt die direkte Diagonale aus; überlappende Empfängerfelder präzisieren die Kurvenposition."
    }
  },
  {
    id: "twin-islets",
    difficulty: "medium",
    seed: 57221,
    tuning: { receiverCount: 6, detectionRadius: 116, pingInterval: 80, pathJitter: 22 },
    receiverFractions: [0.09, 0.25, 0.41, 0.58, 0.74, 0.9],
    receiverOffsetPattern: [-0.28, 0.44, -0.5, 0.38, -0.34, 0.2],
    name: { en: "Twin islets", de: "Zwillingsinseln" },
    brief: {
      en: "Two small islands create a diagonal channel. Use the overlapping counts to keep the route inside that channel.",
      de: "Zwei kleine Inseln bilden einen diagonalen Kanal. Nutze die überlappenden Werte, um die Route im Kanal zu halten."
    },
    start: { x: 76, y: 510 },
    end: { x: 924, y: 112 },
    anchors: [
      { x: 76, y: 510, jitter: 0 },
      { x: 225, y: 442, jitter: 0.55 },
      { x: 365, y: 350, jitter: 0.45 },
      { x: 520, y: 300, jitter: 0.4 },
      { x: 670, y: 245, jitter: 0.45 },
      { x: 810, y: 170, jitter: 0.6 },
      { x: 924, y: 112, jitter: 0 }
    ],
    obstacles: [
      { type: "island", shape: "circle", x: 392, y: 190, radius: 82, passable: false, label: { en: "north islet", de: "Nordinsel" } },
      { type: "island", shape: "circle", x: 650, y: 425, radius: 86, passable: false, label: { en: "south islet", de: "Südinsel" } }
    ],
    features: [],
    hint: {
      en: "The route passes below the north islet and above the south islet.",
      de: "Die Route verläuft unter der Nordinsel und über der Südinsel."
    },
    explanation: {
      en: "The diagonal channel and six receivers create a different spatial constraint from the single-island level.",
      de: "Der diagonale Kanal und sechs Empfänger erzeugen eine andere räumliche Einschränkung als das Einzelinsel-Level."
    }
  },
  {
    id: "marsh-corridor",
    difficulty: "medium",
    seed: 60493,
    tuning: { receiverCount: 5, detectionRadius: 122, pingInterval: 78, pathJitter: 23 },
    receiverFractions: [0.12, 0.31, 0.5, 0.69, 0.87],
    receiverOffsetPattern: [0.24, -0.42, 0.56, -0.36, 0.34],
    name: { en: "Marsh corridor", de: "Marschkorridor" },
    brief: {
      en: "Alternating banks leave a central corridor. The route must pass below the first barrier and above the second.",
      de: "Versetzte Ufer lassen einen mittleren Korridor frei. Die Route muss unter der ersten und über der zweiten Barriere verlaufen."
    },
    start: { x: 78, y: 505 },
    end: { x: 922, y: 102 },
    anchors: [
      { x: 78, y: 505, jitter: 0 },
      { x: 220, y: 445, jitter: 0.55 },
      { x: 365, y: 345, jitter: 0.4 },
      { x: 520, y: 300, jitter: 0.35 },
      { x: 660, y: 248, jitter: 0.45 },
      { x: 805, y: 160, jitter: 0.55 },
      { x: 922, y: 102, jitter: 0 }
    ],
    obstacles: [
      { type: "barrier", shape: "rect", x: 330, y: 0, width: 82, height: 238, passable: false, label: { en: "upper bank", de: "Oberes Ufer" } },
      { type: "barrier", shape: "rect", x: 590, y: 382, width: 88, height: 238, passable: false, label: { en: "lower bank", de: "Unteres Ufer" } }
    ],
    features: [
      { type: "vegetation", x: 430, y: 430, width: 125, height: 88, label: { en: "marsh grass", de: "Marschgras" } }
    ],
    hint: {
      en: "Aim through the open middle band, then use the count changes to place the two bends.",
      de: "Ziele durch das offene Mittelband und nutze die Wertänderungen, um die beiden Kurven zu platzieren."
    },
    explanation: {
      en: "The staggered barriers impose a corridor while the receiver overlap distinguishes different routes inside it.",
      de: "Die versetzten Barrieren erzwingen einen Korridor; die Empfängerüberlappung unterscheidet Routen innerhalb dieses Korridors."
    }
  },
  {
    id: "current-switchback",
    difficulty: "medium",
    seed: 63809,
    tuning: { receiverCount: 6, detectionRadius: 118, pingInterval: 74, pathJitter: 26 },
    receiverFractions: [0.09, 0.24, 0.4, 0.57, 0.74, 0.9],
    receiverOffsetPattern: [0.36, -0.3, 0.48, -0.52, 0.28, -0.2],
    name: { en: "Current switchback", de: "Strömungskehre" },
    brief: {
      en: "A strong current bends around a central shoal, producing a broad switchback before the final ascent.",
      de: "Eine starke Strömung biegt um eine zentrale Untiefe und erzeugt vor dem Schlussanstieg eine breite Kehre."
    },
    start: { x: 70, y: 300 },
    end: { x: 930, y: 148 },
    anchors: [
      { x: 70, y: 300, jitter: 0 },
      { x: 210, y: 438, jitter: 0.6 },
      { x: 355, y: 505, jitter: 0.45 },
      { x: 520, y: 462, jitter: 0.35 },
      { x: 665, y: 332, jitter: 0.5 },
      { x: 805, y: 205, jitter: 0.6 },
      { x: 930, y: 148, jitter: 0 }
    ],
    obstacles: [
      { type: "rock", shape: "circle", x: 500, y: 305, radius: 96, passable: false, label: { en: "central shoal", de: "Zentrale Untiefe" } }
    ],
    features: [
      { type: "shallow", x: 720, y: 420, width: 170, height: 105, label: { en: "current tail", de: "Strömungsfahne" } }
    ],
    hint: {
      en: "The path stays below the shoal, then turns sharply upward after the middle receivers.",
      de: "Der Pfad bleibt unterhalb der Untiefe und biegt nach den mittleren Empfängern deutlich nach oben."
    },
    explanation: {
      en: "Frequent pings and six receivers make the large switchback more tightly constrained than earlier Medium levels.",
      de: "Häufige Pings und sechs Empfänger grenzen die große Kehre stärker ein als frühere mittlere Level."
    }
  },
  {
    id: "estuary-gates",
    difficulty: "hard",
    seed: 68147,
    tuning: { receiverCount: 7, detectionRadius: 134, pingInterval: 69, pathJitter: 27 },
    receiverFractions: [0.09, 0.22, 0.35, 0.48, 0.61, 0.74, 0.88],
    receiverOffsetPattern: [0.03, -0.18, 0.22, -0.28, 0.16, -0.12, 0.3],
    name: { en: "Estuary gates", de: "Ästuartore" },
    brief: {
      en: "Dense, overlapping receiver fields create competing count patterns. Thread the route through the only feasible openings without over-triggering nearby receivers.",
      de: "Dichte, überlappende Empfängerfelder erzeugen konkurrierende Zählmuster. Führe die Route durch die einzig möglichen Öffnungen, ohne nahe Empfänger zu oft auszulösen."
    },
    start: { x: 68, y: 535 },
    end: { x: 936, y: 78 },
    anchors: [
      { x: 68, y: 535, jitter: 0 },
      { x: 190, y: 470, jitter: 0.7 },
      { x: 330, y: 395, jitter: 0.45 },
      { x: 405, y: 255, jitter: 0.25 },
      { x: 535, y: 165, jitter: 0.3 },
      { x: 650, y: 220, jitter: 0.2 },
      { x: 745, y: 150, jitter: 0.3 },
      { x: 845, y: 105, jitter: 0.55 },
      { x: 936, y: 78, jitter: 0 }
    ],
    obstacles: [
      { type: "barrier", shape: "rect", x: 430, y: 285, width: 100, height: 280, passable: false, label: { en: "dam wall", de: "Dammwand" } },
      { type: "barrier", shape: "rect", x: 630, y: 0, width: 95, height: 145, passable: false, label: { en: "restricted bank", de: "Sperrufer" } }
    ],
    features: [
      { type: "shallow", x: 710, y: 315, width: 225, height: 175, label: { en: "tidal flat", de: "Wattfläche" } }
    ],
    hint: {
      en: "The path must pass above the dam wall and below the restricted bank before turning toward E.",
      de: "Der Pfad muss oberhalb der Dammwand und unterhalb des Sperrufers verlaufen, bevor er zu E abbiegt."
    },
    explanation: {
      en: "Seven overlapping receivers make each ping affect several clues at once, so small route changes can alter multiple counts.",
      de: "Sieben überlappende Empfänger sorgen dafür, dass jeder Ping mehrere Hinweise zugleich beeinflusst; kleine Routenänderungen verändern mehrere Zählwerte."
    }
  },
  {
    id: "coastal-thread",
    difficulty: "hard",
    seed: 79423,
    tuning: { receiverCount: 8, detectionRadius: 146, pingInterval: 60, pathJitter: 32 },
    receiverFractions: [0.08, 0.19, 0.3, 0.41, 0.53, 0.64, 0.76, 0.89],
    receiverOffsetPattern: [-0.14, 0.18, -0.24, 0.2, -0.3, 0.16, -0.18, 0.24],
    name: { en: "Coastal thread", de: "Küstenfaden" },
    brief: {
      en: "A narrow, turning route passes through a dense receiver mesh between a headland and reef. Balance several overlapping counts at once.",
      de: "Eine schmale, kurvige Route verläuft durch ein dichtes Empfängernetz zwischen Landzunge und Riff. Bringe mehrere überlappende Zählwerte gleichzeitig ins Gleichgewicht."
    },
    start: { x: 66, y: 310 },
    end: { x: 936, y: 352 },
    anchors: [
      { x: 66, y: 310, jitter: 0 },
      { x: 175, y: 200, jitter: 0.7 },
      { x: 320, y: 115, jitter: 0.5 },
      { x: 465, y: 105, jitter: 0.25 },
      { x: 600, y: 165, jitter: 0.35 },
      { x: 700, y: 255, jitter: 0.25 },
      { x: 790, y: 285, jitter: 0.25 },
      { x: 855, y: 330, jitter: 0.45 },
      { x: 936, y: 352, jitter: 0 }
    ],
    obstacles: [
      { type: "island", shape: "circle", x: 510, y: 345, radius: 132, passable: false, label: { en: "headland", de: "Landzunge" } },
      { type: "rock", shape: "rect", x: 738, y: 355, width: 112, height: 155, passable: false, label: { en: "reef", de: "Riff" } }
    ],
    features: [
      { type: "vegetation", x: 85, y: 405, width: 190, height: 125, label: { en: "kelp edge", de: "Tangrand" } }
    ],
    hint: {
      en: "The route stays north of the headland, then bends through the gap above the reef before reaching E.",
      de: "Die Route bleibt nördlich der Landzunge und biegt dann durch die Lücke oberhalb des Riffs zu E."
    },
    explanation: {
      en: "The final route is constrained by the headland, reef, eight overlapping receivers, and frequent tag transmissions.",
      de: "Die endgültige Route wird durch Landzunge, Riff, acht überlappende Empfänger und häufige Tag-Übertragungen eingeschränkt."
    }
  },
  {
    id: "reef-maze",
    difficulty: "hard",
    seed: 82109,
    tuning: { receiverCount: 8, detectionRadius: 140, pingInterval: 64, pathJitter: 30 },
    receiverFractions: [0.08, 0.19, 0.31, 0.43, 0.55, 0.67, 0.78, 0.9],
    receiverOffsetPattern: [0.16, -0.2, 0.24, -0.26, 0.2, -0.18, 0.28, -0.16],
    name: { en: "Reef maze", de: "Rifflabyrinth" },
    brief: {
      en: "A northern detour threads between a reef, a restricted bank, and a southern rock field under dense receiver overlap.",
      de: "Ein nördlicher Umweg führt zwischen Riff, Sperrufer und südlichem Felsfeld durch dicht überlappende Empfängerbereiche."
    },
    start: { x: 62, y: 520 },
    end: { x: 940, y: 80 },
    anchors: [
      { x: 62, y: 520, jitter: 0 },
      { x: 190, y: 430, jitter: 0.55 },
      { x: 300, y: 175, jitter: 0.35 },
      { x: 455, y: 242, jitter: 0.3 },
      { x: 590, y: 302, jitter: 0.35 },
      { x: 700, y: 255, jitter: 0.3 },
      { x: 820, y: 165, jitter: 0.45 },
      { x: 940, y: 80, jitter: 0 }
    ],
    obstacles: [
      { type: "island", shape: "circle", x: 350, y: 315, radius: 91, passable: false, label: { en: "reef dome", de: "Riffkuppe" } },
      { type: "barrier", shape: "rect", x: 515, y: 0, width: 88, height: 210, passable: false, label: { en: "restricted bank", de: "Sperrufer" } },
      { type: "rock", shape: "circle", x: 720, y: 430, radius: 92, passable: false, label: { en: "rock field", de: "Felsfeld" } }
    ],
    features: [],
    hint: {
      en: "Go north of the first reef, below the restricted bank, and north of the final rock field.",
      de: "Verlaufe nördlich des ersten Riffs, unterhalb des Sperrufers und nördlich des letzten Felsfelds."
    },
    explanation: {
      en: "Eight receivers overlap across three obstacle decisions, so one misplaced ping changes several counts.",
      de: "Acht Empfänger überlappen sich über drei Hindernisentscheidungen hinweg; ein falsch platzierter Ping verändert mehrere Werte."
    }
  },
  {
    id: "tidal-slalom",
    difficulty: "hard",
    seed: 85637,
    tuning: { receiverCount: 7, detectionRadius: 144, pingInterval: 62, pathJitter: 31 },
    receiverFractions: [0.09, 0.22, 0.35, 0.49, 0.63, 0.76, 0.89],
    receiverOffsetPattern: [-0.18, 0.22, -0.26, 0.2, -0.24, 0.18, -0.16],
    name: { en: "Tidal slalom", de: "Gezeitenslalom" },
    brief: {
      en: "Three offset shoals force a long slalom. Dense listening fields make each turn affect multiple target counts.",
      de: "Drei versetzte Untiefen erzwingen einen langen Slalom. Dichte Hörfelder lassen jede Kurve mehrere Zielwerte beeinflussen."
    },
    start: { x: 64, y: 302 },
    end: { x: 936, y: 302 },
    anchors: [
      { x: 64, y: 302, jitter: 0 },
      { x: 175, y: 458, jitter: 0.5 },
      { x: 330, y: 485, jitter: 0.35 },
      { x: 455, y: 305, jitter: 0.3 },
      { x: 560, y: 165, jitter: 0.35 },
      { x: 655, y: 352, jitter: 0.3 },
      { x: 790, y: 438, jitter: 0.4 },
      { x: 936, y: 302, jitter: 0 }
    ],
    obstacles: [
      { type: "rock", shape: "circle", x: 300, y: 190, radius: 76, passable: false, label: { en: "north shoal", de: "Norduntiefe" } },
      { type: "rock", shape: "circle", x: 500, y: 435, radius: 86, passable: false, label: { en: "south shoal", de: "Süduntiefe" } },
      { type: "rock", shape: "circle", x: 705, y: 205, radius: 81, passable: false, label: { en: "outer shoal", de: "Außenuntiefe" } }
    ],
    features: [
      { type: "shallow", x: 395, y: 70, width: 190, height: 90, label: { en: "tidal shelf", de: "Gezeitenbank" } }
    ],
    hint: {
      en: "Pass below the first shoal, above the second, and below the third before returning to E.",
      de: "Verlaufe unter der ersten, über der zweiten und unter der dritten Untiefe, bevor du zu E zurückkehrst."
    },
    explanation: {
      en: "The alternating slalom creates three linked count decisions rather than one dominant obstacle detour.",
      de: "Der wechselnde Slalom erzeugt drei gekoppelte Zählentscheidungen statt eines einzigen dominanten Umwegs."
    }
  },
  {
    id: "gate-weave",
    difficulty: "hard",
    seed: 88993,
    tuning: { receiverCount: 8, detectionRadius: 142, pingInterval: 61, pathJitter: 33 },
    receiverFractions: [0.07, 0.18, 0.3, 0.42, 0.54, 0.66, 0.78, 0.9],
    receiverOffsetPattern: [0.14, -0.22, 0.26, -0.18, 0.24, -0.28, 0.2, -0.14],
    name: { en: "Gate weave", de: "Torengeflecht" },
    brief: {
      en: "Three alternating barrier gates force the route down, up, and down again through a dense receiver mesh.",
      de: "Drei versetzte Barrieretore zwingen die Route durch ein dichtes Empfängernetz nach unten, oben und wieder nach unten."
    },
    start: { x: 60, y: 102 },
    end: { x: 940, y: 502 },
    anchors: [
      { x: 60, y: 102, jitter: 0 },
      { x: 180, y: 245, jitter: 0.45 },
      { x: 305, y: 405, jitter: 0.3 },
      { x: 420, y: 330, jitter: 0.3 },
      { x: 505, y: 218, jitter: 0.25 },
      { x: 620, y: 298, jitter: 0.3 },
      { x: 705, y: 418, jitter: 0.25 },
      { x: 825, y: 365, jitter: 0.4 },
      { x: 940, y: 502, jitter: 0 }
    ],
    obstacles: [
      { type: "barrier", shape: "rect", x: 275, y: 0, width: 72, height: 250, passable: false, label: { en: "gate one", de: "Tor eins" } },
      { type: "barrier", shape: "rect", x: 475, y: 365, width: 74, height: 255, passable: false, label: { en: "gate two", de: "Tor zwei" } },
      { type: "barrier", shape: "rect", x: 675, y: 0, width: 72, height: 250, passable: false, label: { en: "gate three", de: "Tor drei" } }
    ],
    features: [],
    hint: {
      en: "The openings alternate: below gate one, above gate two, and below gate three.",
      de: "Die Öffnungen wechseln: unter Tor eins, über Tor zwei und unter Tor drei."
    },
    explanation: {
      en: "The route must satisfy three narrow passage choices while eight receivers repeatedly share the same pings.",
      de: "Die Route muss drei enge Durchgangsentscheidungen erfüllen, während acht Empfänger wiederholt dieselben Pings teilen."
    }
  },
  {
    id: "research-labyrinth",
    difficulty: "hard",
    seed: 92357,
    tuning: { receiverCount: 9, detectionRadius: 148, pingInterval: 58, pathJitter: 34 },
    receiverFractions: [0.06, 0.16, 0.27, 0.38, 0.49, 0.6, 0.71, 0.82, 0.92],
    receiverOffsetPattern: [-0.14, 0.18, -0.2, 0.24, -0.22, 0.2, -0.18, 0.22, -0.16],
    name: { en: "Research labyrinth", de: "Forschungslabyrinth" },
    brief: {
      en: "The final route crosses four alternating constraints and nine heavily overlapping receivers before reaching the upper-right station.",
      de: "Die letzte Route durchquert vier versetzte Engstellen und neun stark überlappende Empfänger bis zur Station rechts oben."
    },
    start: { x: 58, y: 532 },
    end: { x: 942, y: 86 },
    anchors: [
      { x: 58, y: 532, jitter: 0 },
      { x: 175, y: 422, jitter: 0.4 },
      { x: 275, y: 218, jitter: 0.3 },
      { x: 420, y: 258, jitter: 0.25 },
      { x: 525, y: 305, jitter: 0.28 },
      { x: 610, y: 222, jitter: 0.25 },
      { x: 720, y: 275, jitter: 0.25 },
      { x: 805, y: 330, jitter: 0.3 },
      { x: 895, y: 178, jitter: 0.38 },
      { x: 942, y: 86, jitter: 0 }
    ],
    obstacles: [
      { type: "island", shape: "circle", x: 330, y: 365, radius: 86, passable: false, label: { en: "west island", de: "Westinsel" } },
      { type: "barrier", shape: "rect", x: 480, y: 0, width: 86, height: 225, passable: false, label: { en: "north wall", de: "Nordwand" } },
      { type: "rock", shape: "circle", x: 650, y: 420, radius: 91, passable: false, label: { en: "deep reef", de: "Tiefenriff" } },
      { type: "barrier", shape: "rect", x: 760, y: 0, width: 76, height: 235, passable: false, label: { en: "final bank", de: "Letztes Ufer" } }
    ],
    features: [
      { type: "vegetation", x: 90, y: 110, width: 165, height: 100, label: { en: "survey marsh", de: "Untersuchungsmarsch" } }
    ],
    hint: {
      en: "Stay north of the west island, below the north wall, north of the deep reef, and below the final bank before turning upward.",
      de: "Bleibe nördlich der Westinsel, unter der Nordwand, nördlich des Tiefenriffs und unter dem letzten Ufer, bevor du nach oben abbiegst."
    },
    explanation: {
      en: "Nine receivers, the shortest ping spacing, and four obstacle decisions make this the densest reconstruction in the campaign.",
      de: "Neun Empfänger, der kürzeste Ping-Abstand und vier Hindernisentscheidungen machen dies zur dichtesten Rekonstruktion der Kampagne."
    }
  }
]);
