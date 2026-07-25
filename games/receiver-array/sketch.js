"use strict";

const BUILD_VERSION = "1.1.0-receiver-array";

const GAME_STATES = Object.freeze({
  PLACING: "PLACING",
  RUNNING: "RUNNING",
  RESULT: "RESULT",
  LEVEL_COMPLETE: "LEVEL_COMPLETE"
});

const TRANSLATIONS = {
  "en": {
    "documentTitle": "Field Notes — Receiver Array",
    "mainTitle": "Field Notes",
    "subtitle": "Design a receiver array and test how well it records hidden fish movement.",
    "stampTraining": "TRAINING MAP",
    "languageLabel": "Language",
    "arraySection": "01 / ARRAY DESIGN",
    "gameHeading": "Place the receiver stations",
    "difficultyLabel": "Difficulty",
    "difficultyEasy": "Easy",
    "difficultyMedium": "Medium",
    "difficultyHard": "Hard",
    "gameStatusLabel": "Game status",
    "hudLevel": "Level",
    "hudDifficulty": "Difficulty",
    "hudAnimals": "Animals",
    "hudReceivers": "Receivers left",
    "hudDetected": "Detected",
    "hudTarget": "Target",
    "hudStatus": "Status",
    "canvasAreaLabel": "Interactive top-down acoustic telemetry simulation",
    "mapScale": "survey area · not to scale",
    "gameControlsLabel": "Game controls",
    "buttonStart": "Start simulation",
    "buttonRetry": "Retry same paths",
    "buttonNext": "Next level",
    "buttonReset": "Reset level",
    "buttonRestart": "Restart from level 1",
    "soundOn": "♫ Sound: on",
    "soundOff": "♫ Sound: off",
    "soundUnavailable": "Sound unavailable",
    "mapLegendLabel": "Map legend",
    "legendReceiver": "effective listening area",
    "legendAlgae": "algae / vegetation",
    "legendRock": "solid barrier",
    "legendNoise": "ship-noise area",
    "legendDetected": "detected route",
    "legendMissed": "missed route",
    "controlsTitle": "Controls",
    "controlsText": "Click to place. Drag to reposition. Right-click a receiver, or select it and press Delete, to remove it.",
    "footprintTitle": "Read the footprint",
    "footprintText": "The pale receiver ring bends inward through algae and ship-noise areas, and stops at solid terrain. It shows the effective range used by the game, not just the open-water radius.",
    "fieldNotesSection": "02 / FIELD NOTES",
    "fieldNotesHeading": "How acoustic telemetry works",
    "transmitterHeading": "Acoustic transmitter",
    "transmitterBody": "A small tag on an animal that emits uniquely coded underwater sound signals.",
    "receiverHeading": "Acoustic receiver",
    "receiverBody": "A stationary listening station that records a tagged animal when its signal can be heard.",
    "placementHeading": "Why the placement matters",
    "placementBody": "Good spacing follows likely travel routes while avoiding large gaps so routes and habitats are monitored effectively.",
    "environmentHeading": "Environmental effects",
    "environmentBody": "Noisy surroundings or vegetation can weaken the signal range, while solid terrain can block a direct signal path.",
    "modelHeading": "Model simplification",
    "modelBody": "Algae and ship traffic reduce range by fixed percentages, while rock blocks a straight signal completely. Real telemetry also depends on depth, tag model, tag power, water conditions and more.",
    "footerCredit": "by Pina",
    "statePlacing": "Placing receivers",
    "stateRunning": "Simulation running",
    "stateRetry": "Revise and retry",
    "statePassed": "Survey passed",
    "receiversRemaining": "{remaining} of {total}",
    "obstacleAlgae": "algae",
    "obstacleRock": "rock barriers",
    "obstacleNoise": "ship noise",
    "obstacleOpen": "open water",
    "levelIntro": "Level {level}: {name}. Place up to {receivers} receivers for {animals}. Conditions: {conditions}. Routes are hidden.",
    "gameRestarted": "Game restarted on {difficulty} difficulty. Level 1 is ready with newly generated hidden routes.",
    "difficultyChanged": "{difficulty} difficulty selected. Level {level} was reset with {receivers} receivers, a {radius}-unit open-water radius, and a {target}% target.",
    "allLevelsComplete": "All twelve field exercises are complete. A new Level 1 survey has been prepared.",
    "simulationOne": "Simulation running. The fish turns green when a receiver logs its transmitter.",
    "simulationMany": "Simulation running. All {count} fish contribute equally to the combined score.",
    "surveyPassedNext": "Survey passed: {score}% of all path samples were detected against a {target}% target. The next field exercise is ready.",
    "surveyPassedFinal": "Survey passed: {score}% of all path samples were detected against a {target}% target. You completed the full field notebook.",
    "surveyFailed": "Survey coverage was {score}%. Move the receivers using the revealed routes, then retry the same paths.",
    "allReceiversPlaced": "All available receivers are already in the water. Drag or remove one to revise the array.",
    "invalidPlacement": "Receivers cannot be placed inside rock or outside the survey boundary.",
    "receiverPlaced": "Receiver placed. Its pale footprint accounts for algae, ship noise and solid barriers.",
    "receiverRemoved": "Receiver removed. Click in open water to place another one.",
    "fatalError": "Game build {version} stopped because of a JavaScript error:\n\n{message}",
    "canvasPlacingLabel": "Hidden routes · click to place · drag to reposition",
    "canvasRunningLabel": "{count} fish moving · click a fish to move the tag ping · green = detected",
    "canvasRetryLabel": "Use the revealed routes to revise the array, then retry",
    "canvasCompleteLabel": "Target reached · review the effective listening footprints",
    "celebrationCheer": "Great survey!",
    "levelNames": {
      "Open Lagoon": "Open Lagoon",
      "Algae Banks": "Algae Banks",
      "Rocky Cove": "Rocky Cove",
      "Island Passage": "Island Passage",
      "Harbour Pair": "Harbour Pair",
      "Ferry Reach": "Ferry Reach",
      "Working Channel": "Working Channel",
      "Shipping Lanes": "Shipping Lanes",
      "Three-Water Survey": "Three-Water Survey",
      "Port Estuary": "Port Estuary",
      "Outer Harbour": "Outer Harbour",
      "Coastal Network": "Coastal Network"
    }
  },
  "de": {
    "documentTitle": "Feldnotizen — Empfängernetz",
    "mainTitle": "Feldnotizen",
    "subtitle": "Entwirf ein Empfängernetz und teste, wie gut es verborgene Fischbewegungen erfasst.",
    "stampTraining": "ÜBUNGSAREAL",
    "languageLabel": "Sprache",
    "arraySection": "01 / EMPFÄNGERNETZ",
    "gameHeading": "Platziere die Empfängerstationen",
    "difficultyLabel": "Schwierigkeit",
    "difficultyEasy": "Leicht",
    "difficultyMedium": "Mittel",
    "difficultyHard": "Schwer",
    "gameStatusLabel": "Spielstatus",
    "hudLevel": "Level",
    "hudDifficulty": "Schwierigkeit",
    "hudAnimals": "Tiere",
    "hudReceivers": "Empfänger übrig",
    "hudDetected": "Erfasst",
    "hudTarget": "Ziel",
    "hudStatus": "Status",
    "canvasAreaLabel": "Interaktive Draufsicht einer akustischen Telemetrie-Simulation",
    "mapScale": "Testgebiet · nicht maßstabsgetreu",
    "gameControlsLabel": "Spielsteuerung",
    "buttonStart": "Simulation starten",
    "buttonRetry": "Gleiche Routen wiederholen",
    "buttonNext": "Nächstes Level",
    "buttonReset": "Level zurücksetzen",
    "buttonRestart": "Bei Level 1 neu starten",
    "soundOn": "♫ Ton: an",
    "soundOff": "♫ Ton: aus",
    "soundUnavailable": "Ton nicht verfügbar",
    "mapLegendLabel": "Kartenlegende",
    "legendReceiver": "effektiver Empfangsbereich",
    "legendAlgae": "Algen / Vegetation",
    "legendRock": "feste Barriere",
    "legendNoise": "Lärmgebiet",
    "legendDetected": "erfasste Route",
    "legendMissed": "nicht erfasste Route",
    "controlsTitle": "Steuerung",
    "controlsText": "Klicken zum Platzieren. Ziehen zum Verschieben. Mit Rechtsklick oder nach Auswahl mit Entf kann ein Empfänger entfernt werden.",
    "footprintTitle": "Empfangsbereich lesen",
    "footprintText": "Der helle Empfangsbereich zieht sich in Algen- und Lärmgebieten zusammen und endet an festem Gelände. So zeigt er die tatsächlich verwendete Reichweite, nicht nur den Radius im offenen Wasser.",
    "fieldNotesSection": "02 / FELDNOTIZEN",
    "fieldNotesHeading": "So funktioniert akustische Telemetrie",
    "transmitterHeading": "Akustischer Sender",
    "transmitterBody": "Eine kleiner Sender am Tier, der eindeutig codierte Unterwassersignale aussendet.",
    "receiverHeading": "Akustischer Empfänger",
    "receiverBody": "Eine feste Hörstation, die ein besendertes Tier registriert, wenn sein Signal empfangen wird.",
    "placementHeading": "Warum die Platzierung wichtig ist",
    "placementBody": "Eine gute Verteilung folgt wahrscheinlichen Wanderwegen und vermeidet große Lücken, damit Routen und Lebensräume effektiv erfasst werden.",
    "environmentHeading": "Umwelteinflüsse",
    "environmentBody": "Lärm oder Vegetation können die Signalreichweite schwächen, während festes Gelände einen direkten Signalweg blockieren kann.",
    "modelHeading": "Vereinfachtes Modell",
    "modelBody": "Algen und Schiffsverkehr verringern die Reichweite um feste Prozentsätze, während Felsen ein geradliniges Signal vollständig blockieren. In der Realität spielen auch Tiefe, Sendermodell, Sendeleistung, Wasserbedingungen und weitere Faktoren eine Rolle.",
    "footerCredit": "von Pina",
    "statePlacing": "Empfänger platzieren",
    "stateRunning": "Simulation läuft",
    "stateRetry": "Überarbeiten und wiederholen",
    "statePassed": "Studie bestanden",
    "receiversRemaining": "{remaining} von {total}",
    "obstacleAlgae": "Algen",
    "obstacleRock": "Felsbarrieren",
    "obstacleNoise": "Lärm",
    "obstacleOpen": "offenes Wasser",
    "levelIntro": "Level {level}: {name}. Platziere bis zu {receivers} Empfänger für {animals}. Bedingungen: {conditions}. Die Routen bleiben verborgen.",
    "gameRestarted": "Das Spiel wurde auf Schwierigkeit {difficulty} neu gestartet. Level 1 ist mit neu erzeugten verborgenen Routen bereit.",
    "difficultyChanged": "Schwierigkeit {difficulty} gewählt. Level {level} wurde mit {receivers} Empfängern, {radius} Einheiten Reichweite im offenen Wasser und einem Ziel von {target}% zurückgesetzt.",
    "allLevelsComplete": "Alle zwölf Feldübungen sind abgeschlossen. Eine neue Studie in Level 1 wurde vorbereitet.",
    "simulationOne": "Die Simulation läuft. Der Fisch wird grün, wenn ein Empfänger seinen Sender registriert.",
    "simulationMany": "Die Simulation läuft. Alle {count} Fische tragen gleich stark zur Gesamtwertung bei.",
    "surveyPassedNext": "Studie bestanden: {score}% aller Routenpunkte wurden bei einem Ziel von {target}% erfasst. Die nächste Feldübung ist bereit.",
    "surveyPassedFinal": "Studie bestanden: {score}% aller Routenpunkte wurden bei einem Ziel von {target}% erfasst. Du hast das gesamte Feldnotizbuch abgeschlossen.",
    "surveyFailed": "Die Abdeckung betrug {score}%. Verschiebe die Empfänger anhand der sichtbaren Routen und wiederhole dieselben Wege.",
    "allReceiversPlaced": "Alle verfügbaren Empfänger sind bereits im Wasser. Verschiebe oder entferne einen, um das Netz anzupassen.",
    "invalidPlacement": "Empfänger können nicht in Felsen oder außerhalb des Studiengebiets platziert werden.",
    "receiverPlaced": "Empfänger platziert. Der helle Bereich berücksichtigt Algen, Schiffslärm und feste Barrieren.",
    "receiverRemoved": "Empfänger entfernt. Klicke ins offene Wasser, um einen neuen zu platzieren.",
    "fatalError": "Spiel-Build {version} wurde wegen eines JavaScript-Fehlers angehalten:\n\n{message}",
    "canvasPlacingLabel": "Verborgene Routen · klicken zum Platzieren · ziehen zum Verschieben",
    "canvasRunningLabel": "{count} Fische bewegen sich · Fisch anklicken = Markierungsimpuls · grün = erfasst",
    "canvasRetryLabel": "Nutze die sichtbaren Routen, passe das Netz an und wiederhole",
    "canvasCompleteLabel": "Ziel erreicht · prüfe die effektiven Empfangsbereiche",
    "celebrationCheer": "Starke Studie!",
    "levelNames": {
      "Open Lagoon": "Offene Lagune",
      "Algae Banks": "Algenbänke",
      "Rocky Cove": "Felsige Bucht",
      "Island Passage": "Inselpassage",
      "Harbour Pair": "Hafenpaar",
      "Ferry Reach": "Fährstrecke",
      "Working Channel": "Schifffahrtskanal",
      "Shipping Lanes": "Schifffahrtsrouten",
      "Three-Water Survey": "Drei-Gewässer-Studie",
      "Port Estuary": "Hafenästuar",
      "Outer Harbour": "Außenhafen",
      "Coastal Network": "Küstennetzwerk"
    }
  }
};

class I18n {
  constructor(messages) {
    this.messages = messages;
    this.language = this.readInitialLanguage();
  }

  readInitialLanguage() {
    try {
      const saved = window.localStorage.getItem("telemetryLanguage");
      if (saved && this.messages[saved]) return saved;
    } catch (error) {
      console.warn("Language preference could not be read.", error);
    }

    const browserLanguage = String(navigator.language || "en").slice(0, 2).toLowerCase();
    return this.messages[browserLanguage] ? browserLanguage : "en";
  }

  setLanguage(language) {
    if (!this.messages[language]) return;
    this.language = language;
    try {
      window.localStorage.setItem("telemetryLanguage", language);
    } catch (error) {
      console.warn("Language preference could not be saved.", error);
    }
  }

  t(key, parameters = {}) {
    const fallback = this.messages.en[key];
    const value = this.messages[this.language][key] ?? fallback ?? key;
    return String(value).replace(/\{(\w+)\}/g, (_, name) =>
      Object.prototype.hasOwnProperty.call(parameters, name) ? String(parameters[name]) : `{${name}}`
    );
  }

  levelName(canonicalName) {
    return (
      this.messages[this.language].levelNames?.[canonicalName] ??
      this.messages.en.levelNames?.[canonicalName] ??
      canonicalName
    );
  }

  fishCount(count) {
    if (this.language === "de") return `${count} ${count === 1 ? "Fisch" : "Fische"}`;
    return `${count} fish`;
  }

  taggedFish(count) {
    if (this.language === "de") return count === 1 ? "einen markierten Fisch" : `${count} markierte Fische`;
    return count === 1 ? "one tagged fish" : `${count} tagged fish`;
  }

  number(value, fractionDigits = 1) {
    const locale = this.language === "de" ? "de-DE" : "en-GB";
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits
    }).format(value);
  }

  value(localizedValue) {
    if (localizedValue && typeof localizedValue === "object") {
      return localizedValue[this.language] ?? localizedValue.en ?? "";
    }
    return String(localizedValue ?? "");
  }

  applyStaticText() {
    document.documentElement.lang = this.language;
    document.title = this.t("documentTitle");

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = this.t(element.dataset.i18n);
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      element.setAttribute("aria-label", this.t(element.dataset.i18nAriaLabel));
    });

    document.querySelectorAll("[data-language]").forEach((button) => {
      const active = button.dataset.language === this.language;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }
}

class AudioManager {
  constructor() {
    this.AudioContextClass = window.AudioContext || window.webkitAudioContext || null;
    this.supported = Boolean(this.AudioContextClass);
    this.context = null;
    this.masterGain = null;
    this.musicGain = null;
    this.effectsGain = null;
    this.noiseBuffer = null;
    this.enabled = false;
    this.musicTimer = null;
    this.musicBarIndex = 0;
    this.nextBarTime = 0;
    this.swimSource = null;
    this.swimLfo = null;
  }

  ensureContext() {
    if (!this.supported) return false;
    if (this.context) return true;

    this.context = new this.AudioContextClass();
    this.masterGain = this.context.createGain();
    this.musicGain = this.context.createGain();
    this.effectsGain = this.context.createGain();

    this.masterGain.gain.value = 0.0001;
    this.musicGain.gain.value = 0.23;
    this.effectsGain.gain.value = 0.58;

    this.musicGain.connect(this.masterGain);
    this.effectsGain.connect(this.masterGain);
    this.masterGain.connect(this.context.destination);
    this.noiseBuffer = this.createNoiseBuffer(2.5);
    return true;
  }

  async toggle() {
    if (!this.supported) return false;
    if (this.enabled) {
      this.disable();
      return false;
    }

    this.ensureContext();
    if (this.context.state === "suspended") await this.context.resume();
    this.enabled = true;
    const now = this.context.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(Math.max(this.masterGain.gain.value, 0.0001), now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.72, now + 0.18);
    this.startMusic();
    return true;
  }

  disable() {
    if (!this.context) return;
    this.enabled = false;
    this.stopSwimming();
    this.stopMusic();
    const now = this.context.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(Math.max(this.masterGain.gain.value, 0.0001), now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
  }

  createNoiseBuffer(seconds) {
    const frameCount = Math.max(1, Math.floor(this.context.sampleRate * seconds));
    const buffer = this.context.createBuffer(1, frameCount, this.context.sampleRate);
    const channel = buffer.getChannelData(0);
    let previous = 0;
    for (let index = 0; index < frameCount; index += 1) {
      const white = Math.random() * 2 - 1;
      previous = previous * 0.86 + white * 0.14;
      channel[index] = previous;
    }
    return buffer;
  }

  startMusic() {
    if (!this.enabled || !this.context || this.musicTimer) return;
    this.musicBarIndex = 0;
    this.nextBarTime = this.context.currentTime + 0.08;
    this.scheduleMusicAhead();
    this.musicTimer = window.setInterval(() => this.scheduleMusicAhead(), 180);
  }

  stopMusic() {
    if (this.musicTimer) window.clearInterval(this.musicTimer);
    this.musicTimer = null;
  }

  scheduleMusicAhead() {
    if (!this.enabled || !this.context) return;
    while (this.nextBarTime < this.context.currentTime + 0.9) {
      this.scheduleBar(this.nextBarTime, this.musicBarIndex);
      this.nextBarTime += (60 / 72) * 4;
      this.musicBarIndex += 1;
    }
  }

  scheduleBar(startTime, barIndex) {
    const beat = 60 / 72;
    const progression = [
      { chord: [130.81, 164.81, 196.0, 246.94], bass: 65.41 },
      { chord: [110.0, 130.81, 164.81, 196.0], bass: 55.0 },
      { chord: [87.31, 110.0, 130.81, 164.81], bass: 43.65 },
      { chord: [98.0, 123.47, 146.83, 196.0], bass: 49.0 }
    ];
    const harmony = progression[barIndex % progression.length];

    for (const frequency of harmony.chord) {
      this.scheduleTone(frequency, startTime, beat * 3.75, 0.018, "triangle", this.musicGain, 1150);
    }

    this.scheduleTone(harmony.bass, startTime, beat * 1.65, 0.035, "sine", this.musicGain, 420);
    this.scheduleTone(harmony.bass, startTime + beat * 2, beat * 1.45, 0.026, "sine", this.musicGain, 420);
    this.scheduleKick(startTime, 0.045);
    this.scheduleKick(startTime + beat * 2, 0.033);
    this.scheduleHat(startTime + beat, 0.018);
    this.scheduleHat(startTime + beat * 3, 0.014);
  }

  scheduleTone(frequency, startTime, duration, peakGain, type, destination, filterFrequency = 1400) {
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startTime);
    filter.type = "lowpass";
    filter.frequency.value = filterFrequency;
    filter.Q.value = 0.7;

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(peakGain, startTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.05);
  }

  scheduleKick(startTime, peakGain) {
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(105, startTime);
    oscillator.frequency.exponentialRampToValueAtTime(44, startTime + 0.16);
    gain.gain.setValueAtTime(peakGain, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.2);
    oscillator.connect(gain);
    gain.connect(this.musicGain);
    oscillator.start(startTime);
    oscillator.stop(startTime + 0.22);
  }

  scheduleHat(startTime, peakGain) {
    const source = this.context.createBufferSource();
    const filter = this.context.createBiquadFilter();
    const gain = this.context.createGain();
    source.buffer = this.noiseBuffer;
    filter.type = "highpass";
    filter.frequency.value = 4200;
    gain.gain.setValueAtTime(peakGain, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.07);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);
    source.start(startTime, Math.random());
    source.stop(startTime + 0.08);
  }

  playReceiverPlaced() {
    if (!this.enabled || !this.context) return;
    const now = this.context.currentTime + 0.01;
    this.scheduleTone(620, now, 0.18, 0.14, "sine", this.effectsGain, 2100);
    this.scheduleTone(930, now + 0.08, 0.24, 0.09, "sine", this.effectsGain, 2400);
  }

  startSwimming() {
    if (!this.enabled || !this.context || this.swimSource) return;
    const source = this.context.createBufferSource();
    const filter = this.context.createBiquadFilter();
    const gain = this.context.createGain();
    const lfo = this.context.createOscillator();
    const lfoGain = this.context.createGain();

    source.buffer = this.noiseBuffer;
    source.loop = true;
    filter.type = "lowpass";
    filter.frequency.value = 720;
    filter.Q.value = 0.8;
    gain.gain.value = 0.024;
    lfo.frequency.value = 0.22;
    lfoGain.gain.value = 0.009;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.effectsGain);
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    source.start();
    lfo.start();

    this.swimSource = source;
    this.swimLfo = lfo;
  }

  stopSwimming() {
    if (this.swimSource) {
      try { this.swimSource.stop(); } catch (error) { /* already stopped */ }
      this.swimSource.disconnect();
    }
    if (this.swimLfo) {
      try { this.swimLfo.stop(); } catch (error) { /* already stopped */ }
      this.swimLfo.disconnect();
    }
    this.swimSource = null;
    this.swimLfo = null;
  }

  playSuccess() {
    if (!this.enabled || !this.context) return;
    const now = this.context.currentTime + 0.03;
    [523.25, 659.25, 783.99, 1046.5].forEach((frequency, index) => {
      this.scheduleTone(frequency, now + index * 0.13, 0.5, 0.16 - index * 0.018, "sine", this.effectsGain, 3000);
    });
  }

  playFailure() {
    if (!this.enabled || !this.context) return;
    const now = this.context.currentTime + 0.03;
    this.scheduleTone(392.0, now, 0.45, 0.13, "triangle", this.effectsGain, 1400);
    this.scheduleTone(293.66, now + 0.22, 0.65, 0.11, "triangle", this.effectsGain, 1200);
  }
}


const DEFAULT_DIFFICULTY = "medium";

const DIFFICULTY_SETTINGS = Object.freeze({
  easy: Object.freeze({
    receiverCountDelta: 1,
    receiverRadiusMultiplier: 1.1,
    targetPercentage: 65
  }),
  medium: Object.freeze({
    receiverCountDelta: 0,
    receiverRadiusMultiplier: 1,
    targetPercentage: 70
  }),
  hard: Object.freeze({
    receiverCountDelta: -1,
    receiverRadiusMultiplier: 0.9,
    targetPercentage: 80
  })
});

const FISH_SPECIES = Object.freeze({
  lagoonGlider: Object.freeze({
    key: "lagoonGlider",
    visual: Object.freeze({
      body: [244, 186, 75],
      marking: [111, 68, 37],
      shape: "glider"
    }),
    movement: Object.freeze({
      speedMultiplier: 0.96,
      acceleration: 72,
      turnFrequency: 0.018,
      maxTurnAngle: 0.34,
      directionChangeSmoothness: 0.12,
      pathFollowSmoothing: 0.62,
      pauseChancePerSecond: 0,
      pauseDuration: [0, 0],
      burstChancePerSecond: 0,
      burstDuration: [0, 0],
      burstSpeedMultiplier: 1,
      speedOscillation: 0.025,
      speedOscillationFrequency: 1.1,
      boundaryAvoidance: 1.25,
      wanderRandomness: 0.48,
      wanderingBias: 0.08,
      loopStrength: 0.08
    })
  }),
  reefDarter: Object.freeze({
    key: "reefDarter",
    visual: Object.freeze({
      body: [228, 124, 93],
      marking: [107, 49, 45],
      shape: "darter"
    }),
    movement: Object.freeze({
      speedMultiplier: 1.18,
      acceleration: 285,
      turnFrequency: 0.105,
      maxTurnAngle: 1.02,
      directionChangeSmoothness: 0.64,
      pathFollowSmoothing: 0.84,
      pauseChancePerSecond: 0,
      pauseDuration: [0, 0],
      burstChancePerSecond: 0.08,
      burstDuration: [0.24, 0.52],
      burstSpeedMultiplier: 1.28,
      speedOscillation: 0.09,
      speedOscillationFrequency: 4.4,
      boundaryAvoidance: 1.55,
      wanderRandomness: 1.28,
      wanderingBias: 0.18,
      loopStrength: 0.03
    })
  }),
  loopingBream: Object.freeze({
    key: "loopingBream",
    visual: Object.freeze({
      body: [128, 190, 196],
      marking: [37, 82, 91],
      shape: "bream"
    }),
    movement: Object.freeze({
      speedMultiplier: 1.02,
      acceleration: 148,
      turnFrequency: 0.042,
      maxTurnAngle: 0.78,
      directionChangeSmoothness: 0.24,
      pathFollowSmoothing: 0.7,
      pauseChancePerSecond: 0.055,
      pauseDuration: [0.45, 1.05],
      burstChancePerSecond: 0.12,
      burstDuration: [0.72, 1.3],
      burstSpeedMultiplier: 1.55,
      speedOscillation: 0.045,
      speedOscillationFrequency: 1.8,
      boundaryAvoidance: 0.95,
      wanderRandomness: 0.78,
      wanderingBias: 0.42,
      loopStrength: 0.58
    })
  })
});

const FISH_SPECIES_ORDER = Object.freeze([
  "lagoonGlider",
  "reefDarter",
  "loopingBream"
]);

function speciesForFish(index) {
  return FISH_SPECIES[FISH_SPECIES_ORDER[index % FISH_SPECIES_ORDER.length]];
}

function applyDifficultyToLevel(baseConfig, difficultyKey) {
  const settings = DIFFICULTY_SETTINGS[difficultyKey] ?? DIFFICULTY_SETTINGS[DEFAULT_DIFFICULTY];
  return {
    ...baseConfig,
    difficultyKey,
    receiverCount: Math.max(2, baseConfig.receiverCount + settings.receiverCountDelta),
    receiverRadius: Math.round(baseConfig.receiverRadius * settings.receiverRadiusMultiplier),
    targetPercentage: settings.targetPercentage
  };
}

/*
  Each level is a configuration object. Obstacle instances increase by exactly
  one per level: Level 1 has one environmental feature and Level 12 has twelve.
  The three obstacle types are vegetation, solid barriers, and noisy ship-
  traffic areas. fishCount and receiverCount follow the requested progression.
*/
const LEVEL_CONFIGS = [
  {
    name: "Open Lagoon",
    fishCount: 1,
    receiverCount: 6,
    receiverRadius: 150,
    fishSpeed: 128,
    fishSpeedSpread: 0,
    pathLength: 2200,
    pathSampleSpacing: 6,
    waterWidth: 900,
    waterHeight: 560,
    pathIrregularity: 0.16,
    turnNoiseScale: 0.031,
    fishClearance: 17,
    signalAttenuation: {
      vegetationDefault: 0.16,
      noiseDefault: 0.16,
      minimumRangeMultiplier: 0.42
    },
    vegetationZones: [
      { x: 590, y: 105, width: 205, height: 150, attenuation: 0.16 }
    ],
    barriers: [],
    noisyAreas: []
  },
  {
    name: "Algae Banks",
    fishCount: 1,
    receiverCount: 6,
    receiverRadius: 150,
    fishSpeed: 130,
    fishSpeedSpread: 0,
    pathLength: 2380,
    pathSampleSpacing: 6,
    waterWidth: 940,
    waterHeight: 580,
    pathIrregularity: 0.19,
    turnNoiseScale: 0.034,
    fishClearance: 17,
    signalAttenuation: {
      vegetationDefault: 0.18,
      noiseDefault: 0.16,
      minimumRangeMultiplier: 0.40
    },
    vegetationZones: [
      { x: 80, y: 330, width: 245, height: 165, attenuation: 0.17 },
      { x: 660, y: 75, width: 210, height: 180, attenuation: 0.20 }
    ],
    barriers: [],
    noisyAreas: []
  },
  {
    name: "Rocky Cove",
    fishCount: 1,
    receiverCount: 5,
    receiverRadius: 150,
    fishSpeed: 132,
    fishSpeedSpread: 0,
    pathLength: 2550,
    pathSampleSpacing: 6,
    waterWidth: 980,
    waterHeight: 600,
    pathIrregularity: 0.22,
    turnNoiseScale: 0.037,
    fishClearance: 18,
    signalAttenuation: {
      vegetationDefault: 0.20,
      noiseDefault: 0.17,
      minimumRangeMultiplier: 0.38
    },
    vegetationZones: [
      { x: 70, y: 80, width: 225, height: 155, attenuation: 0.18 },
      { x: 690, y: 360, width: 220, height: 165, attenuation: 0.22 }
    ],
    barriers: [
      { x: 440, y: 205, width: 100, height: 190 }
    ],
    noisyAreas: []
  },
  {
    name: "Island Passage",
    fishCount: 1,
    receiverCount: 5,
    receiverRadius: 150,
    fishSpeed: 134,
    fishSpeedSpread: 0,
    pathLength: 2730,
    pathSampleSpacing: 5.9,
    waterWidth: 1020,
    waterHeight: 620,
    pathIrregularity: 0.25,
    turnNoiseScale: 0.040,
    fishClearance: 18,
    signalAttenuation: {
      vegetationDefault: 0.21,
      noiseDefault: 0.18,
      minimumRangeMultiplier: 0.37
    },
    vegetationZones: [
      { x: 80, y: 360, width: 240, height: 175, attenuation: 0.20 },
      { x: 710, y: 70, width: 235, height: 170, attenuation: 0.23 }
    ],
    barriers: [
      { x: 350, y: 75, width: 105, height: 205 },
      { x: 610, y: 360, width: 110, height: 190 }
    ],
    noisyAreas: []
  },
  {
    name: "Harbour Pair",
    fishCount: 2,
    receiverCount: 5,
    receiverRadius: 135,
    fishSpeed: 132,
    fishSpeedSpread: 0.08,
    pathLength: 2460,
    pathSampleSpacing: 6,
    waterWidth: 1040,
    waterHeight: 630,
    pathIrregularity: 0.23,
    turnNoiseScale: 0.037,
    fishClearance: 18,
    signalAttenuation: {
      vegetationDefault: 0.20,
      noiseDefault: 0.16,
      minimumRangeMultiplier: 0.38
    },
    vegetationZones: [
      { x: 70, y: 80, width: 220, height: 160, attenuation: 0.18 },
      { x: 410, y: 390, width: 215, height: 165, attenuation: 0.21 },
      { x: 770, y: 90, width: 205, height: 155, attenuation: 0.22 }
    ],
    barriers: [],
    noisyAreas: [
      { centerX: 305, centerY: 300, radius: 82, attenuation: 0.15, phase: 0.4 },
      { centerX: 785, centerY: 420, radius: 88, attenuation: 0.18, phase: 2.1 }
    ]
  },
  {
    name: "Ferry Reach",
    fishCount: 2,
    receiverCount: 5,
    receiverRadius: 135,
    fishSpeed: 135,
    fishSpeedSpread: 0.09,
    pathLength: 2660,
    pathSampleSpacing: 5.9,
    waterWidth: 1080,
    waterHeight: 650,
    pathIrregularity: 0.26,
    turnNoiseScale: 0.041,
    fishClearance: 18,
    signalAttenuation: {
      vegetationDefault: 0.22,
      noiseDefault: 0.18,
      minimumRangeMultiplier: 0.35
    },
    vegetationZones: [
      { x: 70, y: 390, width: 245, height: 175, attenuation: 0.20 },
      { x: 425, y: 75, width: 220, height: 160, attenuation: 0.22 },
      { x: 785, y: 380, width: 220, height: 180, attenuation: 0.24 }
    ],
    barriers: [],
    noisyAreas: [
      { centerX: 245, centerY: 225, radius: 82, attenuation: 0.16, phase: 0.1 },
      { centerX: 560, centerY: 345, radius: 92, attenuation: 0.19, phase: 1.8 },
      { centerX: 870, centerY: 205, radius: 86, attenuation: 0.20, phase: 3.5 }
    ]
  },
  {
    name: "Working Channel",
    fishCount: 2,
    receiverCount: 4,
    receiverRadius: 150,
    fishSpeed: 137,
    fishSpeedSpread: 0.10,
    pathLength: 2840,
    pathSampleSpacing: 5.9,
    waterWidth: 1100,
    waterHeight: 660,
    pathIrregularity: 0.28,
    turnNoiseScale: 0.043,
    fishClearance: 18,
    signalAttenuation: {
      vegetationDefault: 0.22,
      noiseDefault: 0.19,
      minimumRangeMultiplier: 0.34
    },
    vegetationZones: [],
    barriers: [
      { x: 260, y: 95, width: 105, height: 190 },
      { x: 510, y: 365, width: 110, height: 205 },
      { x: 790, y: 105, width: 110, height: 195 }
    ],
    noisyAreas: [
      { centerX: 165, centerY: 425, radius: 78, attenuation: 0.17, phase: 0.2 },
      { centerX: 455, centerY: 205, radius: 84, attenuation: 0.19, phase: 1.5 },
      { centerX: 710, centerY: 455, radius: 88, attenuation: 0.20, phase: 2.8 },
      { centerX: 965, centerY: 365, radius: 82, attenuation: 0.21, phase: 4.1 }
    ]
  },
  {
    name: "Shipping Lanes",
    fishCount: 2,
    receiverCount: 4,
    receiverRadius: 150,
    fishSpeed: 140,
    fishSpeedSpread: 0.11,
    pathLength: 3010,
    pathSampleSpacing: 5.8,
    waterWidth: 1140,
    waterHeight: 680,
    pathIrregularity: 0.31,
    turnNoiseScale: 0.046,
    fishClearance: 19,
    signalAttenuation: {
      vegetationDefault: 0.23,
      noiseDefault: 0.20,
      minimumRangeMultiplier: 0.32
    },
    vegetationZones: [],
    barriers: [
      { x: 250, y: 70, width: 110, height: 205 },
      { x: 250, y: 415, width: 110, height: 195 },
      { x: 690, y: 80, width: 115, height: 200 },
      { x: 690, y: 420, width: 115, height: 190 }
    ],
    noisyAreas: [
      { centerX: 130, centerY: 335, radius: 80, attenuation: 0.18, phase: 0.5 },
      { centerX: 505, centerY: 210, radius: 88, attenuation: 0.20, phase: 1.7 },
      { centerX: 525, centerY: 500, radius: 92, attenuation: 0.21, phase: 3.0 },
      { centerX: 975, centerY: 330, radius: 94, attenuation: 0.23, phase: 4.3 }
    ]
  },
  {
    name: "Three-Water Survey",
    fishCount: 3,
    receiverCount: 4,
    receiverRadius: 150,
    fishSpeed: 136,
    fishSpeedSpread: 0.10,
    pathLength: 2720,
    pathSampleSpacing: 5.9,
    waterWidth: 1160,
    waterHeight: 690,
    pathIrregularity: 0.28,
    turnNoiseScale: 0.042,
    fishClearance: 19,
    signalAttenuation: {
      vegetationDefault: 0.22,
      noiseDefault: 0.19,
      minimumRangeMultiplier: 0.33
    },
    vegetationZones: [
      { x: 60, y: 80, width: 225, height: 165, attenuation: 0.20 },
      { x: 455, y: 430, width: 225, height: 170, attenuation: 0.23 },
      { x: 850, y: 85, width: 235, height: 170, attenuation: 0.24 }
    ],
    barriers: [
      { x: 340, y: 235, width: 100, height: 205 },
      { x: 690, y: 85, width: 105, height: 195 },
      { x: 790, y: 430, width: 110, height: 190 }
    ],
    noisyAreas: [
      { centerX: 205, centerY: 455, radius: 82, attenuation: 0.18, phase: 0.3 },
      { centerX: 575, centerY: 250, radius: 90, attenuation: 0.20, phase: 2.1 },
      { centerX: 1010, centerY: 420, radius: 88, attenuation: 0.21, phase: 4.0 }
    ]
  },
  {
    name: "Port Estuary",
    fishCount: 3,
    receiverCount: 5,
    receiverRadius: 120,
    fishSpeed: 139,
    fishSpeedSpread: 0.11,
    pathLength: 2890,
    pathSampleSpacing: 5.8,
    waterWidth: 1200,
    waterHeight: 710,
    pathIrregularity: 0.31,
    turnNoiseScale: 0.045,
    fishClearance: 19,
    signalAttenuation: {
      vegetationDefault: 0.24,
      noiseDefault: 0.20,
      minimumRangeMultiplier: 0.31
    },
    vegetationZones: [
      { x: 55, y: 75, width: 235, height: 170, attenuation: 0.21 },
      { x: 70, y: 470, width: 250, height: 165, attenuation: 0.24 },
      { x: 875, y: 70, width: 245, height: 175, attenuation: 0.24 },
      { x: 900, y: 480, width: 220, height: 155, attenuation: 0.26 }
    ],
    barriers: [
      { x: 360, y: 210, width: 105, height: 215 },
      { x: 660, y: 80, width: 110, height: 200 },
      { x: 700, y: 455, width: 110, height: 190 }
    ],
    noisyAreas: [
      { centerX: 235, centerY: 340, radius: 84, attenuation: 0.19, phase: 0.7 },
      { centerX: 555, centerY: 520, radius: 92, attenuation: 0.21, phase: 2.4 },
      { centerX: 1010, centerY: 345, radius: 94, attenuation: 0.22, phase: 4.2 }
    ]
  },
  {
    name: "Outer Harbour",
    fishCount: 3,
    receiverCount: 5,
    receiverRadius: 140,
    fishSpeed: 142,
    fishSpeedSpread: 0.12,
    pathLength: 3060,
    pathSampleSpacing: 5.8,
    waterWidth: 1230,
    waterHeight: 720,
    pathIrregularity: 0.34,
    turnNoiseScale: 0.048,
    fishClearance: 19,
    signalAttenuation: {
      vegetationDefault: 0.25,
      noiseDefault: 0.21,
      minimumRangeMultiplier: 0.30
    },
    vegetationZones: [
      { x: 60, y: 75, width: 240, height: 175, attenuation: 0.22 },
      { x: 75, y: 480, width: 260, height: 165, attenuation: 0.25 },
      { x: 900, y: 75, width: 250, height: 175, attenuation: 0.25 },
      { x: 910, y: 490, width: 245, height: 160, attenuation: 0.27 }
    ],
    barriers: [
      { x: 350, y: 95, width: 105, height: 205 },
      { x: 350, y: 435, width: 105, height: 205 },
      { x: 720, y: 85, width: 110, height: 205 },
      { x: 720, y: 445, width: 110, height: 195 }
    ],
    noisyAreas: [
      { centerX: 235, centerY: 355, radius: 86, attenuation: 0.19, phase: 0.4 },
      { centerX: 595, centerY: 360, radius: 98, attenuation: 0.22, phase: 2.2 },
      { centerX: 1035, centerY: 355, radius: 92, attenuation: 0.23, phase: 4.1 }
    ]
  },
  {
    name: "Coastal Network",
    fishCount: 3,
    receiverCount: 5,
    receiverRadius: 150,
    fishSpeed: 145,
    fishSpeedSpread: 0.13,
    pathLength: 3220,
    pathSampleSpacing: 5.7,
    waterWidth: 1260,
    waterHeight: 740,
    pathIrregularity: 0.36,
    turnNoiseScale: 0.051,
    fishClearance: 20,
    signalAttenuation: {
      vegetationDefault: 0.26,
      noiseDefault: 0.22,
      minimumRangeMultiplier: 0.29
    },
    vegetationZones: [
      { x: 55, y: 75, width: 245, height: 180, attenuation: 0.23 },
      { x: 70, y: 500, width: 270, height: 165, attenuation: 0.26 },
      { x: 920, y: 70, width: 260, height: 180, attenuation: 0.26 },
      { x: 930, y: 505, width: 245, height: 160, attenuation: 0.28 }
    ],
    barriers: [
      { x: 350, y: 85, width: 110, height: 215 },
      { x: 350, y: 445, width: 110, height: 215 },
      { x: 750, y: 75, width: 115, height: 215 },
      { x: 750, y: 460, width: 115, height: 205 }
    ],
    noisyAreas: [
      { centerX: 205, centerY: 365, radius: 88, attenuation: 0.20, phase: 0.2 },
      { centerX: 585, centerY: 210, radius: 94, attenuation: 0.22, phase: 1.7 },
      { centerX: 615, centerY: 535, radius: 100, attenuation: 0.24, phase: 3.2 },
      { centerX: 1060, centerY: 365, radius: 98, attenuation: 0.25, phase: 4.7 }
    ]
  }
];


const languageManager = new I18n(TRANSLATIONS);
const audioManager = new AudioManager();

let game = null;
let gameCanvas = null;
let fatalErrorShown = false;

window.addEventListener("error", (event) => {
  showFatalError(event.error || event.message || "Unknown browser error");
});

window.addEventListener("unhandledrejection", (event) => {
  showFatalError(event.reason || "Unhandled promise rejection");
});

function setup() {
  try {
    pixelDensity(1);
    const canvasSize = calculateCanvasSize();
    gameCanvas = createCanvas(canvasSize.width, canvasSize.height);
    gameCanvas.parent("canvasContainer");
    gameCanvas.elt.setAttribute(
      "aria-label",
      languageManager.t("canvasAreaLabel")
    );
    gameCanvas.elt.addEventListener("contextmenu", handleCanvasContextMenu);

    game = new Game(LEVEL_CONFIGS, languageManager, audioManager);
    game.initialize();
  } catch (error) {
    showFatalError(error);
    noLoop();
  }
}

function draw() {
  try {
    if (!game) return;
    const dtSeconds = Math.min(deltaTime / 1000, 0.05);
    game.update(dtSeconds);
    game.render();
  } catch (error) {
    showFatalError(error);
    noLoop();
  }
}

function windowResized() {
  try {
    const canvasSize = calculateCanvasSize();
    resizeCanvas(canvasSize.width, canvasSize.height);
  } catch (error) {
    showFatalError(error);
  }
}

function mousePressed() {
  if (!game || mouseButton === RIGHT) return false;
  game.handlePointerDown(mouseX, mouseY);
  return false;
}

function mouseDragged() {
  if (!game) return false;
  game.handlePointerDrag(mouseX, mouseY);
  return false;
}

function mouseReleased() {
  if (!game) return false;
  game.handlePointerUp();
  return false;
}

function keyPressed() {
  if (!game) return;
  if (keyCode === DELETE || keyCode === BACKSPACE) {
    game.removeSelectedReceiver();
    return false;
  }
}

function handleCanvasContextMenu(event) {
  event.preventDefault();
  if (!game || !gameCanvas) return;
  const rect = gameCanvas.elt.getBoundingClientRect();
  const canvasX = ((event.clientX - rect.left) / rect.width) * width;
  const canvasY = ((event.clientY - rect.top) / rect.height) * height;
  game.handleRightClick(canvasX, canvasY);
}

function calculateCanvasSize() {
  const container = document.getElementById("canvasContainer");
  const availableWidth = container ? container.clientWidth : 1000;
  const canvasWidth = Math.max(320, Math.floor(availableWidth));
  const canvasHeight = Math.max(320, Math.min(730, Math.floor(canvasWidth * 0.62)));
  return { width: canvasWidth, height: canvasHeight };
}

function showFatalError(error) {
  if (fatalErrorShown) return;
  fatalErrorShown = true;
  const panel = document.getElementById("errorPanel");
  const message = error instanceof Error ? `${error.message}\n\n${error.stack || ""}` : String(error);
  if (panel) {
    panel.hidden = false;
    panel.textContent = languageManager.t("fatalError", { version: BUILD_VERSION, message });
  }
  console.error(error);
}

function safeSetLineDash(values) {
  if (drawingContext && typeof drawingContext.setLineDash === "function") {
    drawingContext.setLineDash(values);
  }
}

class CelebrationEffect {
  constructor(i18n, reducedMotion) {
    this.i18n = i18n;
    this.reducedMotion = Boolean(reducedMotion);
    this.active = false;
    this.elapsed = 0;
    this.duration = 0;
    this.particles = [];
  }

  setReducedMotion(reducedMotion) {
    this.reducedMotion = Boolean(reducedMotion);
    if (this.active && this.reducedMotion) {
      this.duration = Math.min(this.duration, 1.8);
    }
  }

  start(levelIndex) {
    this.stop();
    this.active = true;
    this.elapsed = 0;
    this.duration = this.reducedMotion ? 1.8 : 3.6;

    const colors = [
      [255, 222, 111],
      [91, 224, 149],
      [240, 124, 96],
      [135, 217, 230],
      [255, 247, 218]
    ];
    const particleCount = this.reducedMotion ? 18 : 76;
    const seededOffset = (levelIndex + 1) * 0.173;

    for (let index = 0; index < particleCount; index += 1) {
      const colorValue = colors[index % colors.length];
      const randomX = (Math.random() + seededOffset * index) % 1;
      this.particles.push({
        x: randomX * Math.max(width, 320),
        y: this.reducedMotion
          ? 20 + (index % 4) * 18
          : -20 - Math.random() * Math.max(80, height * 0.36),
        velocityX: this.reducedMotion ? 0 : -34 + Math.random() * 68,
        velocityY: this.reducedMotion ? 0 : 92 + Math.random() * 105,
        rotation: Math.random() * TWO_PI,
        rotationSpeed: this.reducedMotion ? 0 : -5 + Math.random() * 10,
        width: 5 + Math.random() * 7,
        height: 9 + Math.random() * 9,
        colorValue
      });
    }
  }

  stop() {
    this.active = false;
    this.elapsed = 0;
    this.duration = 0;
    this.particles.length = 0;
  }

  update(dtSeconds) {
    if (!this.active) return;
    this.elapsed += dtSeconds;

    if (!this.reducedMotion) {
      for (const particle of this.particles) {
        particle.velocityY += 118 * dtSeconds;
        particle.x += particle.velocityX * dtSeconds;
        particle.y += particle.velocityY * dtSeconds;
        particle.rotation += particle.rotationSpeed * dtSeconds;
      }
    }

    if (this.elapsed >= this.duration) this.stop();
  }

  render() {
    if (!this.active) return;

    push();
    for (const particle of this.particles) {
      if (particle.y > height + 30) continue;
      push();
      translate(particle.x, particle.y);
      rotate(particle.rotation);
      noStroke();
      fill(...particle.colorValue, 225);
      rectMode(CENTER);
      rect(0, 0, particle.width, particle.height, 1.5);
      pop();
    }

    const entrance = this.reducedMotion
      ? 1
      : constrain(this.elapsed / 0.34, 0, 1);
    const exit = this.reducedMotion
      ? 1
      : constrain((this.duration - this.elapsed) / 0.35, 0, 1);
    const scaleAmount = Math.min(entrance, exit);
    const bounce = this.reducedMotion ? 0 : sin(this.elapsed * 8.2) * 4.5;
    const panelWidth = Math.min(210, width - 28);
    const centerX = constrain(width * 0.72, panelWidth / 2 + 14, width - panelWidth / 2 - 14);
    const centerY = 82 + bounce;

    translate(centerX, centerY);
    scale(Math.max(0.01, scaleAmount));

    noStroke();
    fill(8, 43, 52, 75);
    rectMode(CENTER);
    rect(4, 5, panelWidth, 112, 9);
    fill(255, 250, 229, 242);
    stroke(24, 49, 59, 220);
    strokeWeight(2);
    rect(0, 0, panelWidth, 112, 9);

    this.renderCheeringFish(-panelWidth * 0.27, 9);

    noStroke();
    fill(24, 49, 59);
    textFont("system-ui");
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    textSize(16);
    text(
      this.i18n.t("celebrationCheer"),
      panelWidth * 0.2,
      -2,
      panelWidth * 0.5,
      70
    );
    pop();
  }

  renderCheeringFish(x, y) {
    push();
    translate(x, y);
    const wiggle = this.reducedMotion ? 0 : sin(this.elapsed * 11) * 0.14;
    rotate(-0.12 + wiggle);

    noStroke();
    fill(208, 145, 49);
    triangle(-22, 0, -38, -14, -38, 14);

    fill(244, 186, 75);
    stroke(111, 68, 37);
    strokeWeight(1.5);
    ellipse(0, 0, 48, 27);

    noStroke();
    fill(111, 68, 37, 210);
    rect(-7, -12, 7, 24, 3);
    fill(255, 250, 230);
    circle(13, -5, 7);
    fill(24, 49, 59);
    circle(14, -5, 3);

    noFill();
    stroke(24, 49, 59);
    strokeWeight(1.8);
    arc(13, 4, 10, 8, 0.1, PI - 0.1);

    stroke(111, 68, 37);
    strokeWeight(3);
    const finLift = this.reducedMotion ? 0 : sin(this.elapsed * 13) * 4;
    line(-3, -10, -11, -25 - finLift);
    line(5, 11, 13, 25 + finLift);
    pop();
  }
}


class Game {
  constructor(levelConfigs, i18n, audio) {
    this.levelConfigs = levelConfigs;
    this.i18n = i18n;
    this.audio = audio;
    this.statusKey = "levelIntro";
    this.statusParams = {};
    this.levelIndex = 0;
    this.level = null;
    this.state = GAME_STATES.PLACING;
    this.active = true;

    this.difficultyKey = this.readInitialDifficulty();
    this.reducedMotionMedia = window.matchMedia?.("(prefers-reduced-motion: reduce)") ?? null;
    this.prefersReducedMotion = Boolean(this.reducedMotionMedia?.matches);
    this.reducedMotionListener = (event) => {
      this.prefersReducedMotion = event.matches;
      this.celebration.setReducedMotion(event.matches);
    };

    this.receivers = [];
    this.selectedReceiver = null;
    this.draggingReceiver = null;
    this.dragOffset = createVector(0, 0);

    this.tracks = [];
    this.pathSeed = 0;
    this.taggedFishIndex = 0;
    this.tagPingElapsed = 0;
    this.celebration = new CelebrationEffect(this.i18n, this.prefersReducedMotion);

    this.viewScale = 1;
    this.viewOffsetX = 0;
    this.viewOffsetY = 0;

    this.dom = {};
  }

  initialize() {
    this.cacheDomElements();
    this.i18n.applyStaticText();
    this.bindControls();
    this.loadLevel(0);
    this.updateAudioButton();
  }

  readInitialDifficulty() {
    try {
      const saved = window.localStorage.getItem("telemetryDifficulty");
      if (saved && DIFFICULTY_SETTINGS[saved]) return saved;
    } catch (error) {
      console.warn("Difficulty preference could not be read.", error);
    }
    return DEFAULT_DIFFICULTY;
  }

  saveDifficulty() {
    try {
      window.localStorage.setItem("telemetryDifficulty", this.difficultyKey);
    } catch (error) {
      console.warn("Difficulty preference could not be saved.", error);
    }
  }

  cacheDomElements() {
    this.dom.levelDisplay = document.getElementById("levelDisplay");
    this.dom.difficultyDisplay = document.getElementById("difficultyDisplay");
    this.dom.animalDisplay = document.getElementById("animalDisplay");
    this.dom.receiverDisplay = document.getElementById("receiverDisplay");
    this.dom.scoreDisplay = document.getElementById("scoreDisplay");
    this.dom.targetDisplay = document.getElementById("targetDisplay");
    this.dom.stateDisplay = document.getElementById("stateDisplay");
    this.dom.statusMessage = document.getElementById("statusMessage");
    this.dom.startButton = document.getElementById("startButton");
    this.dom.retryButton = document.getElementById("retryButton");
    this.dom.nextButton = document.getElementById("nextButton");
    this.dom.resetButton = document.getElementById("resetButton");
    this.dom.restartGameButton = document.getElementById("restartGameButton");
    this.dom.audioToggleButton = document.getElementById("audioToggleButton");
    this.dom.languageButtons = Array.from(document.querySelectorAll("[data-language]"));
    this.dom.difficultyButtons = Array.from(document.querySelectorAll("[data-difficulty]"));
  }

  bindControls() {
    this.dom.startButton.addEventListener("click", () => this.startSimulation());
    this.dom.retryButton.addEventListener("click", () => this.startSimulation());
    this.dom.nextButton.addEventListener("click", () => this.nextLevel());
    this.dom.resetButton.addEventListener("click", () => this.resetLevel());
    this.dom.restartGameButton.addEventListener("click", () => this.restartGame());

    for (const button of this.dom.languageButtons) {
      button.addEventListener("click", () => this.changeLanguage(button.dataset.language));
    }

    for (const button of this.dom.difficultyButtons) {
      button.addEventListener("click", () => this.changeDifficulty(button.dataset.difficulty));
    }

    if (this.reducedMotionMedia) {
      if (typeof this.reducedMotionMedia.addEventListener === "function") {
        this.reducedMotionMedia.addEventListener("change", this.reducedMotionListener);
      } else if (typeof this.reducedMotionMedia.addListener === "function") {
        this.reducedMotionMedia.addListener(this.reducedMotionListener);
      }
    }

    this.dom.audioToggleButton.addEventListener("click", async () => {
      const enabled = await this.audio.toggle();
      if (enabled && this.state === GAME_STATES.RUNNING) this.audio.startSwimming();
      this.updateAudioButton();
    });
  }

  changeLanguage(language) {
    this.i18n.setLanguage(language);
    this.i18n.applyStaticText();
    if (gameCanvas) gameCanvas.elt.setAttribute("aria-label", this.i18n.t("canvasAreaLabel"));
    this.renderStatus();
    this.updateUi();
  }

  changeDifficulty(difficultyKey) {
    if (!DIFFICULTY_SETTINGS[difficultyKey] || this.state === GAME_STATES.RUNNING) return;
    if (difficultyKey === this.difficultyKey) return;

    this.difficultyKey = difficultyKey;
    this.saveDifficulty();
    this.loadLevel(this.levelIndex);
    this.setStatus("difficultyChanged", {
      difficultyKey: this.difficultyKey,
      level: this.levelIndex + 1,
      receivers: this.level.config.receiverCount,
      radius: this.level.config.receiverRadius,
      target: this.level.config.targetPercentage
    });
  }

  difficultyLabel() {
    return this.i18n.t(`difficulty${this.difficultyKey[0].toUpperCase()}${this.difficultyKey.slice(1)}`);
  }

  setActive(active) {
    this.active = Boolean(active);
    if (!this.active) {
      this.draggingReceiver = null;
      this.audio.stopSwimming();
      return;
    }
    if (this.state === GAME_STATES.RUNNING && this.audio.enabled) this.audio.startSwimming();
    this.updateUi();
  }

  loadLevel(index) {
    this.audio.stopSwimming();
    this.celebration.stop();
    this.levelIndex = constrain(index, 0, this.levelConfigs.length - 1);
    const configuredLevel = applyDifficultyToLevel(
      this.levelConfigs[this.levelIndex],
      this.difficultyKey
    );
    this.level = new Level(configuredLevel);
    this.receivers = [];
    this.selectedReceiver = null;
    this.draggingReceiver = null;
    this.pathSeed = Math.floor(random(1, 1_000_000_000));
    this.tracks = [];
    this.taggedFishIndex = 0;
    this.tagPingElapsed = 0;

    for (let fishIndex = 0; fishIndex < this.level.config.fishCount; fishIndex += 1) {
      const species = speciesForFish(fishIndex);
      const seed = this.pathSeed + fishIndex * 1_000_003;
      const path = PathGenerator.generate(this.level, seed, species);
      const centered = fishIndex - (this.level.config.fishCount - 1) / 2;
      const individualFactor = 1 + centered * this.level.config.fishSpeedSpread * 0.35;
      const speed =
        this.level.config.fishSpeed *
        species.movement.speedMultiplier *
        individualFactor;

      this.tracks.push(
        new AnimalTrack(
          path,
          this.level.config.pathSampleSpacing,
          fishIndex,
          speed,
          species
        )
      );
    }

    this.clearSimulationData();
    this.state = GAME_STATES.PLACING;
    this.setStatus("levelIntro", {
      level: this.levelIndex + 1,
      levelName: this.level.config.name,
      receivers: this.level.config.receiverCount,
      fishCount: this.level.config.fishCount,
      obstacleKeys: this.level.obstacleTypeKeys()
    });
    this.updateUi();
  }

  resetLevel() {
    this.loadLevel(this.levelIndex);
  }

  restartGame() {
    this.loadLevel(0);
    this.setStatus("gameRestarted", { difficultyKey: this.difficultyKey });
  }

  nextLevel() {
    if (this.levelIndex < this.levelConfigs.length - 1) {
      this.loadLevel(this.levelIndex + 1);
      return;
    }

    this.loadLevel(0);
    this.setStatus("allLevelsComplete");
  }

  clearSimulationData() {
    for (const track of this.tracks) track.reset();
  }

  startSimulation() {
    if (this.state === GAME_STATES.RUNNING || this.receivers.length === 0) return;

    this.celebration.stop();
    this.clearSimulationData();
    this.state = GAME_STATES.RUNNING;
    this.selectedReceiver = null;
    this.draggingReceiver = null;
    this.tagPingElapsed = 0;

    for (const track of this.tracks) {
      track.processSamplesThrough(0, (position) => this.evaluateDetection(position));
      track.currentSignal = this.evaluateDetection(track.fish.position());
    }

    this.audio.startSwimming();
    this.setStatus(this.tracks.length === 1 ? "simulationOne" : "simulationMany", {
      count: this.tracks.length
    });
    this.updateUi();
  }

  update(dtSeconds) {
    this.updateViewTransform();
    this.tagPingElapsed += dtSeconds;
    this.celebration.update(dtSeconds);

    if (this.state !== GAME_STATES.RUNNING) return;

    for (const track of this.tracks) {
      if (!track.fish.isFinished()) {
        track.fish.advance(dtSeconds, track.speed);
        track.processSamplesThrough(
          track.fish.completedSampleIndex(),
          (position) => this.evaluateDetection(position)
        );
      }
      track.currentSignal = this.evaluateDetection(track.fish.position());
    }

    if (this.tracks.every((track) => track.fish.isFinished())) {
      for (const track of this.tracks) {
        track.processSamplesThrough(
          track.path.length - 1,
          (position) => this.evaluateDetection(position)
        );
      }
      this.finishSimulation();
    }

    this.updateUi(false);
  }

  finishSimulation() {
    const finalScore = this.scorePercentage(true);
    const success = finalScore >= this.level.config.targetPercentage;
    this.audio.stopSwimming();

    if (success) {
      this.state = GAME_STATES.LEVEL_COMPLETE;
      const finalLevel = this.levelIndex === this.levelConfigs.length - 1;
      this.setStatus(finalLevel ? "surveyPassedFinal" : "surveyPassedNext", {
        score: finalScore,
        target: this.level.config.targetPercentage
      });
      this.celebration.start(this.levelIndex);
      this.audio.playSuccess();
    } else {
      this.state = GAME_STATES.RESULT;
      this.setStatus("surveyFailed", { score: finalScore });
      this.audio.playFailure();
    }

    this.updateUi();
  }

  scorePercentage(useFullPath = false) {
    const detected = this.tracks.reduce((sum, track) => sum + track.detectedSamples, 0);
    const denominator = this.tracks.reduce(
      (sum, track) => sum + (useFullPath ? track.path.length : track.processedSamples),
      0
    );
    return denominator > 0 ? (detected / denominator) * 100 : 0;
  }

  evaluateDetection(fishPosition) {
    let bestSignal = null;

    for (const receiver of this.receivers) {
      const signal = this.level.evaluateSignal(
        fishPosition,
        receiver.position,
        receiver.baseRadius
      );

      if (!signal.detected) continue;
      if (!bestSignal || signal.normalizedDistance < bestSignal.normalizedDistance) {
        bestSignal = { ...signal, receiver };
      }
    }

    return (
      bestSignal || {
        detected: false,
        receiver: null,
        effectiveRadius: 0,
        distance: Infinity,
        normalizedDistance: Infinity,
        vegetationZonesCrossed: 0,
        blocked: false
      }
    );
  }

  render() {
    background(11, 55, 68);
    this.updateViewTransform();

    push();
    translate(this.viewOffsetX, this.viewOffsetY);
    scale(this.viewScale);

    this.level.renderWater();
    this.level.renderVegetation();
    this.level.renderNoisyAreas();
    this.renderTrails();
    this.level.renderBarriers();
    this.renderReceivers();
    this.renderActiveSignals();
    this.renderTaggedFishPing();
    this.renderFish();
    this.level.renderBorder();

    pop();

    this.celebration.render();
  }

  renderTrails() {
    for (const track of this.tracks) {
      if (track.processedSamples < 2) continue;
      const palette = track.species.visual;

      strokeCap(ROUND);
      for (let i = 1; i < track.processedSamples; i += 1) {
        const previous = track.path[i - 1];
        const current = track.path[i];
        const detected = track.sampleResults[i] === true;

        stroke(palette.body[0], palette.body[1], palette.body[2], 85);
        strokeWeight(7 / this.viewScale);
        line(previous.x, previous.y, current.x, current.y);

        stroke(detected ? color(76, 224, 145, 220) : color(222, 103, 82, 205));
        strokeWeight(4 / this.viewScale);
        line(previous.x, previous.y, current.x, current.y);
      }
    }
  }

  renderReceivers() {
    for (const receiver of this.receivers) {
      receiver.render(
        receiver === this.selectedReceiver,
        this.viewScale
      );
    }
  }

  renderActiveSignals() {
    if (this.state !== GAME_STATES.RUNNING) return;

    for (const track of this.tracks) {
      if (!track.currentSignal?.detected) continue;
      const fishPosition = track.fish.position();
      const receiverPosition = track.currentSignal.receiver.position;
      const pulse = this.prefersReducedMotion
        ? 6
        : 5 + 3 * sin(frameCount * 0.18 + track.index * 1.7);

      push();
      safeSetLineDash([8 / this.viewScale, 7 / this.viewScale]);
      stroke(112, 255, 178, 225);
      strokeWeight(2.3 / this.viewScale);
      line(fishPosition.x, fishPosition.y, receiverPosition.x, receiverPosition.y);
      safeSetLineDash([]);

      noFill();
      stroke(112, 255, 178, 180);
      strokeWeight(2 / this.viewScale);
      circle(fishPosition.x, fishPosition.y, 34 + pulse);
      pop();
    }
  }

  renderTaggedFishPing() {
    const track = this.tracks[this.taggedFishIndex];
    if (!track) return;
    const fishPosition = track.fish.position();

    push();
    noFill();
    const phases = this.prefersReducedMotion
      ? [0.42]
      : [
          (this.tagPingElapsed % 1.55) / 1.55,
          ((this.tagPingElapsed + 0.78) % 1.55) / 1.55
        ];

    for (const phase of phases) {
      const diameter = 45 + phase * 52;
      const alpha = this.prefersReducedMotion ? 205 : 220 * (1 - phase);

      stroke(8, 38, 47, alpha * 0.72);
      strokeWeight(5.5 / this.viewScale);
      circle(fishPosition.x, fishPosition.y, diameter);

      stroke(255, 222, 111, alpha);
      strokeWeight(2.5 / this.viewScale);
      circle(fishPosition.x, fishPosition.y, diameter);
    }
    pop();
  }

  renderFish() {
    for (const track of this.tracks) {
      const detected =
        this.state === GAME_STATES.RUNNING && track.currentSignal?.detected;
      const neutral = this.state === GAME_STATES.PLACING;
      track.fish.render({
        detected,
        neutral,
        viewScale: this.viewScale,
        fishIndex: track.index
      });
    }
  }

  renderCanvasLabel() {
    const label = this.canvasInstructionText();
    push();
    textFont("system-ui");
    textSize(13);
    textStyle(BOLD);
    const paddingX = 11;
    const labelWidth = Math.min(width - 24, textWidth(label) + paddingX * 2);
    noStroke();
    fill(8, 40, 49, 215);
    rect(12, 12, labelWidth, 32, 2);
    fill(247, 243, 231);
    textAlign(LEFT, CENTER);
    text(label, 12 + paddingX, 28, labelWidth - paddingX * 2, 28);
    pop();
  }

  canvasInstructionText() {
    if (this.state === GAME_STATES.PLACING) {
      return this.i18n.t("canvasPlacingLabel");
    }
    if (this.state === GAME_STATES.RUNNING) {
      return this.i18n.t("canvasRunningLabel", { count: this.tracks.length });
    }
    if (this.state === GAME_STATES.RESULT) {
      return this.i18n.t("canvasRetryLabel");
    }
    return this.i18n.t("canvasCompleteLabel");
  }

  updateViewTransform() {
    if (!this.level) return;
    this.viewScale = Math.min(
      width / this.level.config.waterWidth,
      height / this.level.config.waterHeight
    );
    this.viewOffsetX = (width - this.level.config.waterWidth * this.viewScale) / 2;
    this.viewOffsetY = (height - this.level.config.waterHeight * this.viewScale) / 2;
  }

  canvasToWorld(canvasX, canvasY) {
    return createVector(
      (canvasX - this.viewOffsetX) / this.viewScale,
      (canvasY - this.viewOffsetY) / this.viewScale
    );
  }

  isWorldPointInside(point) {
    return (
      point.x >= 0 &&
      point.y >= 0 &&
      point.x <= this.level.config.waterWidth &&
      point.y <= this.level.config.waterHeight
    );
  }

  canEditReceivers() {
    return this.state !== GAME_STATES.RUNNING && this.state !== GAME_STATES.LEVEL_COMPLETE;
  }

  handlePointerDown(canvasX, canvasY) {
    const point = this.canvasToWorld(canvasX, canvasY);
    if (!this.isWorldPointInside(point)) return;

    if (this.state === GAME_STATES.RUNNING) {
      const fishIndex = this.fishAt(point);
      if (fishIndex >= 0) this.setTaggedFish(fishIndex);
      return;
    }

    if (!this.canEditReceivers()) return;

    const receiver = this.receiverAt(point);
    if (receiver) {
      this.selectedReceiver = receiver;
      this.draggingReceiver = receiver;
      this.dragOffset = p5.Vector.sub(receiver.position, point);
      this.updateUi();
      return;
    }

    if (this.receivers.length >= this.level.config.receiverCount) {
      this.setStatus("allReceiversPlaced");
      return;
    }

    if (!this.level.isReceiverPlacementValid(point)) {
      this.setStatus("invalidPlacement");
      return;
    }

    const newReceiver = new Receiver(
      point.x,
      point.y,
      this.level.config.receiverRadius,
      this.receivers.length + 1
    );
    newReceiver.recalculateCoverage(this.level);
    this.receivers.push(newReceiver);
    this.selectedReceiver = newReceiver;
    this.audio.playReceiverPlaced();
    this.setStatus("receiverPlaced");
    this.updateUi();
  }

  handlePointerDrag(canvasX, canvasY) {
    if (!this.canEditReceivers() || !this.draggingReceiver) return;
    const point = this.canvasToWorld(canvasX, canvasY);
    const candidate = p5.Vector.add(point, this.dragOffset);

    if (this.level.isReceiverPlacementValid(candidate)) {
      this.draggingReceiver.position.set(candidate.x, candidate.y);
      this.draggingReceiver.recalculateCoverage(this.level);
    }
  }

  handlePointerUp() {
    this.draggingReceiver = null;
  }

  handleRightClick(canvasX, canvasY) {
    if (!this.canEditReceivers()) return;
    const point = this.canvasToWorld(canvasX, canvasY);
    const receiver = this.receiverAt(point);
    if (receiver) this.removeReceiver(receiver);
  }

  fishAt(worldPoint) {
    for (let index = this.tracks.length - 1; index >= 0; index -= 1) {
      if (p5.Vector.dist(this.tracks[index].fish.position(), worldPoint) <= 30) {
        return index;
      }
    }
    return -1;
  }

  setTaggedFish(index) {
    if (index < 0 || index >= this.tracks.length || index === this.taggedFishIndex) return;
    this.taggedFishIndex = index;
    this.tagPingElapsed = 0;
  }

  receiverAt(worldPoint) {
    for (let index = this.receivers.length - 1; index >= 0; index -= 1) {
      if (this.receivers[index].containsPoint(worldPoint)) return this.receivers[index];
    }
    return null;
  }

  removeSelectedReceiver() {
    if (!this.canEditReceivers() || !this.selectedReceiver) return;
    this.removeReceiver(this.selectedReceiver);
  }

  removeReceiver(receiver) {
    const index = this.receivers.indexOf(receiver);
    if (index < 0) return;
    this.receivers.splice(index, 1);
    this.renumberReceivers();
    this.selectedReceiver = null;
    this.draggingReceiver = null;
    this.setStatus("receiverRemoved");
    this.updateUi();
  }

  renumberReceivers() {
    this.receivers.forEach((receiver, index) => {
      receiver.label = index + 1;
    });
  }

  updateUi() {
    if (!this.level) return;

    const receiversRemaining = this.level.config.receiverCount - this.receivers.length;
    const finalScoreState =
      this.state === GAME_STATES.RESULT || this.state === GAME_STATES.LEVEL_COMPLETE;
    const score = this.scorePercentage(finalScoreState);
    const fishCount = this.level.config.fishCount;

    this.dom.levelDisplay.textContent = `${this.levelIndex + 1} / ${this.levelConfigs.length}`;
    this.dom.difficultyDisplay.textContent = this.difficultyLabel();
    this.dom.animalDisplay.textContent = this.i18n.fishCount(fishCount);
    this.dom.receiverDisplay.textContent = this.i18n.t("receiversRemaining", {
      remaining: receiversRemaining,
      total: this.level.config.receiverCount
    });
    this.dom.scoreDisplay.textContent = `${this.i18n.number(score, 1)}%`;
    this.dom.targetDisplay.textContent = `${this.level.config.targetPercentage}%`;
    this.dom.stateDisplay.textContent = this.stateLabel();

    this.dom.startButton.hidden = this.state !== GAME_STATES.PLACING;
    this.dom.retryButton.hidden = this.state !== GAME_STATES.RESULT;
    this.dom.nextButton.hidden = this.state !== GAME_STATES.LEVEL_COMPLETE;
    this.dom.startButton.disabled = this.receivers.length === 0;
    this.dom.retryButton.disabled = this.receivers.length === 0;
    this.dom.resetButton.disabled = false;
    this.dom.restartGameButton.disabled = false;

    for (const button of this.dom.difficultyButtons) {
      const active = button.dataset.difficulty === this.difficultyKey;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-checked", String(active));
      button.disabled = this.state === GAME_STATES.RUNNING;
    }

    this.updateAudioButton();
  }

  updateAudioButton() {
    const button = this.dom.audioToggleButton;
    if (!button) return;
    if (!this.audio.supported) {
      button.disabled = true;
      button.textContent = this.i18n.t("soundUnavailable");
      button.setAttribute("aria-pressed", "false");
      return;
    }
    button.disabled = false;
    button.textContent = this.i18n.t(this.audio.enabled ? "soundOn" : "soundOff");
    button.setAttribute("aria-pressed", String(this.audio.enabled));
  }

  stateLabel() {
    switch (this.state) {
      case GAME_STATES.RUNNING:
        return this.i18n.t("stateRunning");
      case GAME_STATES.RESULT:
        return this.i18n.t("stateRetry");
      case GAME_STATES.LEVEL_COMPLETE:
        return this.i18n.t("statePassed");
      default:
        return this.i18n.t("statePlacing");
    }
  }

  setStatus(key, parameters = {}) {
    this.statusKey = key;
    this.statusParams = parameters;
    this.renderStatus();
  }

  renderStatus() {
    if (!this.dom.statusMessage || !this.statusKey) return;
    const parameters = { ...this.statusParams };

    if (parameters.levelName) parameters.name = this.i18n.levelName(parameters.levelName);
    if (parameters.difficultyKey) {
      const key = String(parameters.difficultyKey);
      parameters.difficulty = this.i18n.t(
        `difficulty${key[0].toUpperCase()}${key.slice(1)}`
      );
    }
    if (Number.isFinite(parameters.fishCount)) parameters.animals = this.i18n.taggedFish(parameters.fishCount);
    if (Array.isArray(parameters.obstacleKeys)) {
      parameters.conditions = parameters.obstacleKeys.map((key) => this.i18n.t(key)).join(", ");
    }
    if (Number.isFinite(parameters.score)) parameters.score = this.i18n.number(parameters.score, 1);

    this.dom.statusMessage.textContent = this.i18n.t(this.statusKey, parameters);
  }
}


class AnimalTrack {
  constructor(path, sampleSpacing, index, speed, species) {
    this.path = path;
    this.index = index;
    this.speed = speed;
    this.species = species;
    this.fish = new Fish(path, sampleSpacing, index, species);
    this.sampleResults = new Array(path.length).fill(null);
    this.processedSamples = 0;
    this.detectedSamples = 0;
    this.currentSignal = null;
  }

  reset() {
    this.fish.reset();
    this.sampleResults.fill(null);
    this.processedSamples = 0;
    this.detectedSamples = 0;
    this.currentSignal = null;
  }

  processSamplesThrough(targetIndex, detector) {
    const finalIndex = Math.min(targetIndex, this.path.length - 1);
    while (this.processedSamples <= finalIndex) {
      const sampleIndex = this.processedSamples;
      const signal = detector(this.path[sampleIndex]);
      this.sampleResults[sampleIndex] = signal.detected;
      if (signal.detected) this.detectedSamples += 1;
      this.processedSamples += 1;
    }
  }
}

class Level {
  constructor(config) {
    this.config = config;
    this.vegetationZones = (config.vegetationZones ?? []).map(
      (zone) =>
        new VegetationZone(
          zone,
          zone.attenuation ?? config.signalAttenuation.vegetationDefault
        )
    );
    this.barriers = (config.barriers ?? []).map((barrier) => new Barrier(barrier));
    this.noisyAreas = (config.noisyAreas ?? []).map(
      (area, index) =>
        new NoisyArea(
          area,
          area.attenuation ?? config.signalAttenuation.noiseDefault,
          index
        )
    );
  }

  obstacleTypeKeys() {
    const keys = [];
    if (this.vegetationZones.length > 0) keys.push("obstacleAlgae");
    if (this.barriers.length > 0) keys.push("obstacleRock");
    if (this.noisyAreas.length > 0) keys.push("obstacleNoise");
    return keys.length > 0 ? keys : ["obstacleOpen"];
  }

  obstacleCount() {
    return this.vegetationZones.length + this.barriers.length + this.noisyAreas.length;
  }

  renderWater() {
    noStroke();
    fill(24, 116, 139);
    rect(0, 0, this.config.waterWidth, this.config.waterHeight);

    // Straight vertex segments avoid version-sensitive spline APIs.
    noFill();
    stroke(191, 231, 226, 35);
    strokeWeight(2);
    for (let row = 45; row < this.config.waterHeight; row += 62) {
      beginShape();
      for (let x = -20; x <= this.config.waterWidth + 20; x += 24) {
        const y = row + sin(x * 0.021 + row * 0.014) * 8;
        vertex(x, y);
      }
      endShape();
    }

    stroke(244, 237, 211, 22);
    strokeWeight(1);
    for (let x = 35; x < this.config.waterWidth; x += 82) {
      line(x, 0, x + 38, this.config.waterHeight);
    }
  }

  renderVegetation() {
    for (const zone of this.vegetationZones) zone.render();
  }

  renderNoisyAreas() {
    for (const area of this.noisyAreas) area.render();
  }

  renderBarriers() {
    for (const barrier of this.barriers) barrier.render();
  }

  renderBorder() {
    noFill();
    stroke(244, 240, 221, 170);
    strokeWeight(3);
    rect(1.5, 1.5, this.config.waterWidth - 3, this.config.waterHeight - 3);
  }

  isReceiverPlacementValid(point, padding = 10) {
    if (
      point.x < padding ||
      point.y < padding ||
      point.x > this.config.waterWidth - padding ||
      point.y > this.config.waterHeight - padding
    ) {
      return false;
    }
    return !this.barriers.some((barrier) => barrier.containsPoint(point, padding));
  }

  isPathSegmentValid(start, end) {
    const margin = this.config.fishClearance;
    if (
      end.x < margin ||
      end.y < margin ||
      end.x > this.config.waterWidth - margin ||
      end.y > this.config.waterHeight - margin
    ) {
      return false;
    }

    return !this.barriers.some((barrier) =>
      barrier.intersectsSegment(start, end, this.config.fishClearance)
    );
  }

  isSignalBlocked(fishPosition, receiverPosition) {
    return this.barriers.some((barrier) =>
      barrier.intersectsSegment(fishPosition, receiverPosition, 0)
    );
  }

  signalRangeMultiplier(fishPosition, receiverPosition) {
    let multiplier = 1;
    let vegetationCount = 0;
    let noiseCount = 0;

    for (const zone of this.vegetationZones) {
      if (zone.affectsSignal(fishPosition, receiverPosition)) {
        multiplier *= 1 - zone.attenuation;
        vegetationCount += 1;
      }
    }

    for (const area of this.noisyAreas) {
      if (area.affectsSignal(fishPosition, receiverPosition)) {
        multiplier *= 1 - area.attenuation;
        noiseCount += 1;
      }
    }

    multiplier = Math.max(
      this.config.signalAttenuation.minimumRangeMultiplier,
      multiplier
    );
    return { multiplier, vegetationCount, noiseCount };
  }

  evaluateSignal(fishPosition, receiverPosition, baseRadius) {
    const blocked = this.isSignalBlocked(fishPosition, receiverPosition);
    const attenuation = this.signalRangeMultiplier(fishPosition, receiverPosition);
    const effectiveRadius = baseRadius * attenuation.multiplier;
    const distance = p5.Vector.dist(fishPosition, receiverPosition);
    const detected = !blocked && distance <= effectiveRadius;

    return {
      detected,
      blocked,
      effectiveRadius,
      distance,
      normalizedDistance: effectiveRadius > 0 ? distance / effectiveRadius : Infinity,
      vegetationZonesCrossed: attenuation.vegetationCount,
      noisyAreasCrossed: attenuation.noiseCount
    };
  }
}

class Fish {
  constructor(path, sampleSpacing, index, species) {
    this.path = path;
    this.sampleSpacing = sampleSpacing;
    this.index = index;
    this.species = species;
    this.distanceTravelled = 0;
    this.totalDistance = Math.max(0, (path.length - 1) * sampleSpacing);
    this.currentSpeed = 0;
    this.motionClock = 0;
    this.pauseRemaining = 0;
    this.burstRemaining = 0;
    this.behaviorCheckRemaining = 0;
    this.initialRandomState = (
      ((index + 1) * 2_654_435_761) ^
      (path.length * 1_597_334_677)
    ) >>> 0;
    this.randomState = this.initialRandomState;
  }

  reset() {
    this.distanceTravelled = 0;
    this.currentSpeed = 0;
    this.motionClock = 0;
    this.pauseRemaining = 0;
    this.burstRemaining = 0;
    this.behaviorCheckRemaining = 0;
    this.randomState = this.initialRandomState;
  }

  nextRandom() {
    this.randomState = (Math.imul(1_664_525, this.randomState) + 1_013_904_223) >>> 0;
    return this.randomState / 4_294_967_296;
  }

  randomRange(range) {
    return range[0] + (range[1] - range[0]) * this.nextRandom();
  }

  advance(dtSeconds, baseSpeed) {
    const movement = this.species.movement;
    this.motionClock += dtSeconds;
    this.behaviorCheckRemaining -= dtSeconds;

    if (this.pauseRemaining > 0) {
      this.pauseRemaining = Math.max(0, this.pauseRemaining - dtSeconds);
    } else {
      this.burstRemaining = Math.max(0, this.burstRemaining - dtSeconds);

      if (this.behaviorCheckRemaining <= 0) {
        const checkInterval = 0.18;
        this.behaviorCheckRemaining += checkInterval;
        const pauseChance = movement.pauseChancePerSecond * checkInterval;
        const burstChance = movement.burstChancePerSecond * checkInterval;
        const roll = this.nextRandom();

        if (roll < pauseChance) {
          this.pauseRemaining = this.randomRange(movement.pauseDuration);
          this.burstRemaining = 0;
        } else if (roll < pauseChance + burstChance && this.burstRemaining <= 0) {
          this.burstRemaining = this.randomRange(movement.burstDuration);
        }
      }
    }

    const oscillation =
      1 +
      sin(this.motionClock * movement.speedOscillationFrequency + this.index * 1.7) *
        movement.speedOscillation;
    const burstMultiplier = this.burstRemaining > 0
      ? movement.burstSpeedMultiplier
      : 1;
    const targetSpeed = this.pauseRemaining > 0
      ? 0
      : baseSpeed * oscillation * burstMultiplier;
    const maximumChange = movement.acceleration * dtSeconds;
    this.currentSpeed = this.moveToward(this.currentSpeed, targetSpeed, maximumChange);
    this.distanceTravelled = Math.min(
      this.totalDistance,
      this.distanceTravelled + this.currentSpeed * dtSeconds
    );
  }

  moveToward(value, target, maximumChange) {
    if (Math.abs(target - value) <= maximumChange) return target;
    return value + Math.sign(target - value) * maximumChange;
  }

  completedSampleIndex() {
    return Math.min(
      this.path.length - 1,
      Math.floor(this.distanceTravelled / this.sampleSpacing)
    );
  }

  isFinished() {
    return this.distanceTravelled >= this.totalDistance;
  }

  position() {
    if (this.path.length === 0) return createVector(0, 0);
    if (this.path.length === 1) return this.path[0].copy();

    const floatIndex = this.distanceTravelled / this.sampleSpacing;
    const index = Math.min(this.path.length - 2, Math.floor(floatIndex));
    const interpolation = constrain(floatIndex - index, 0, 1);
    return p5.Vector.lerp(this.path[index], this.path[index + 1], interpolation);
  }

  heading() {
    if (this.path.length < 2) return 0;
    const index = Math.min(this.path.length - 2, this.completedSampleIndex());
    return p5.Vector.sub(this.path[index + 1], this.path[index]).heading();
  }

  stateColors(detected, neutral) {
    const base = this.species.visual.body;
    if (neutral) {
      return {
        body: base,
        outline: [245, 241, 219]
      };
    }

    const target = detected ? [77, 224, 143] : [222, 104, 82];
    const blendAmount = detected ? 0.58 : 0.34;
    return {
      body: base.map((component, index) =>
        Math.round(component + (target[index] - component) * blendAmount)
      ),
      outline: detected ? [112, 255, 178] : [255, 178, 155]
    };
  }

  render({ detected, neutral, viewScale, fishIndex }) {
    const position = this.position();
    const colors = this.stateColors(detected, neutral);

    push();
    translate(position.x, position.y);
    rotate(this.heading());

    noStroke();
    fill(3, 43, 52, 65);
    ellipse(3, 7, 45, 18);

    switch (this.species.visual.shape) {
      case "darter":
        this.renderDarter(colors, viewScale);
        break;
      case "bream":
        this.renderBream(colors, viewScale);
        break;
      default:
        this.renderGlider(colors, viewScale);
        break;
    }

    this.renderTag(viewScale);
    this.renderNumberBadge(fishIndex, viewScale);
    pop();
  }

  renderGlider(colors, viewScale) {
    const marking = this.species.visual.marking;
    noStroke();
    fill(colors.body[0] * 0.77, colors.body[1] * 0.77, colors.body[2] * 0.77);
    triangle(-18, 0, -35, -13, -35, 13);
    triangle(-4, -8, -14, -20, 7, -10);

    stroke(...colors.outline, 225);
    strokeWeight(1.4 / viewScale);
    fill(...colors.body);
    ellipse(0, 0, 44, 24);

    noStroke();
    fill(...marking, 195);
    rect(-9, -10, 7, 20, 3);
    this.renderEye(12, -4);
  }

  renderDarter(colors, viewScale) {
    const marking = this.species.visual.marking;
    noStroke();
    fill(colors.body[0] * 0.72, colors.body[1] * 0.72, colors.body[2] * 0.72);
    triangle(-20, -1, -37, -14, -31, 0);
    triangle(-20, 1, -37, 14, -31, 0);
    triangle(1, -6, -7, -16, 11, -7);

    stroke(...colors.outline, 230);
    strokeWeight(1.35 / viewScale);
    fill(...colors.body);
    ellipse(0, 0, 50, 17);
    triangle(21, -5, 30, 0, 21, 5);

    noStroke();
    fill(...marking, 205);
    circle(-9, -2, 5);
    circle(0, 3, 4);
    circle(9, -2, 4.5);
    this.renderEye(16, -3);
  }

  renderBream(colors, viewScale) {
    const marking = this.species.visual.marking;
    noStroke();
    fill(colors.body[0] * 0.75, colors.body[1] * 0.75, colors.body[2] * 0.75);
    ellipse(-22, 0, 20, 24);
    triangle(-5, -10, -15, -24, 9, -12);
    triangle(-1, 11, -12, 25, 12, 12);

    stroke(...colors.outline, 230);
    strokeWeight(1.5 / viewScale);
    fill(...colors.body);
    ellipse(0, 0, 39, 31);

    noFill();
    stroke(...marking, 210);
    strokeWeight(3 / viewScale);
    arc(-2, 0, 21, 20, -1.2, 1.25);
    noStroke();
    fill(...marking, 180);
    circle(-9, 7, 4.5);
    this.renderEye(11, -6);
  }

  renderEye(x, y) {
    noStroke();
    fill(249, 247, 231);
    circle(x, y, 6.5);
    fill(22, 36, 39);
    circle(x + 1, y, 2.8);
  }

  renderTag(viewScale) {
    fill(31, 42, 44);
    noStroke();
    rect(-3, -4, 14, 8, 2);
    stroke(244, 241, 220);
    strokeWeight(1 / viewScale);
    line(1, -2, 7, -2);
    line(9, 0, 15, -6);
  }

  renderNumberBadge(fishIndex, viewScale) {
    rotate(-this.heading());
    noStroke();
    fill(249, 247, 231, 235);
    circle(0, -24, 17);
    fill(24, 49, 59);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(10 / Math.max(0.75, viewScale));
    text(String(fishIndex + 1), 0, -24);
  }
}


class Receiver {
  constructor(x, y, baseRadius, label) {
    this.position = createVector(x, y);
    this.baseRadius = baseRadius;
    this.label = label;
    this.iconRadius = 14;
    this.coveragePoints = [];
  }

  containsPoint(point) {
    return p5.Vector.dist(this.position, point) <= this.iconRadius + 6;
  }

  recalculateCoverage(level) {
    const angularSamples = 96;
    const radialSamples = 56;
    this.coveragePoints = [];

    for (let angleIndex = 0; angleIndex < angularSamples; angleIndex += 1) {
      const angle = (angleIndex / angularSamples) * TWO_PI;
      let farthestDistance = 0;

      // Search from the nominal outer edge inward. This mirrors the same
      // vegetation and barrier rules used for scoring.
      for (let radialIndex = radialSamples; radialIndex >= 0; radialIndex -= 1) {
        const distance = this.baseRadius * (radialIndex / radialSamples);
        const point = createVector(
          this.position.x + cos(angle) * distance,
          this.position.y + sin(angle) * distance
        );

        const insideWorld =
          point.x >= 0 &&
          point.y >= 0 &&
          point.x <= level.config.waterWidth &&
          point.y <= level.config.waterHeight;
        if (!insideWorld) continue;

        if (level.evaluateSignal(point, this.position, this.baseRadius).detected) {
          farthestDistance = distance;
          break;
        }
      }

      this.coveragePoints.push(
        createVector(
          this.position.x + cos(angle) * farthestDistance,
          this.position.y + sin(angle) * farthestDistance
        )
      );
    }
  }

  render(selected, viewScale) {
    push();

    if (this.coveragePoints.length > 2) {
      noStroke();
      fill(127, 222, 229, selected ? 48 : 34);
      beginShape();
      for (const point of this.coveragePoints) vertex(point.x, point.y);
      endShape(CLOSE);

      noFill();
      stroke(selected ? color(239, 201, 91, 240) : color(197, 239, 237, 185));
      strokeWeight((selected ? 2.5 : 1.6) / viewScale);
      beginShape();
      for (const point of this.coveragePoints) vertex(point.x, point.y);
      endShape(CLOSE);
    }

    if (selected) {
      noFill();
      stroke(239, 201, 91);
      strokeWeight(3 / viewScale);
      circle(this.position.x, this.position.y, 40);
    }

    stroke(245, 241, 221);
    strokeWeight(1.5 / viewScale);
    fill(24, 58, 67);
    circle(this.position.x, this.position.y, this.iconRadius * 2);

    noFill();
    stroke(128, 225, 230);
    strokeWeight(2 / viewScale);
    arc(this.position.x - 1, this.position.y, 12, 12, -HALF_PI, HALF_PI);
    arc(this.position.x - 2, this.position.y, 20, 20, -HALF_PI, HALF_PI);
    line(this.position.x - 7, this.position.y + 8, this.position.x - 7, this.position.y + 14);

    noStroke();
    fill(255, 253, 241);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(10);
    text(this.label, this.position.x - 6, this.position.y);

    pop();
  }
}

class Barrier {
  constructor({ x, y, width, height }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  containsPoint(point, padding = 0) {
    return pointInRectangle(point, this, padding);
  }

  intersectsSegment(start, end, padding = 0) {
    return segmentIntersectsRectangle(start, end, this, padding);
  }

  render() {
    push();
    noStroke();
    fill(91, 83, 76);
    rect(this.x, this.y, this.width, this.height, 3);

    fill(137, 126, 110, 150);
    for (let x = this.x + 14; x < this.x + this.width - 6; x += 28) {
      for (let y = this.y + 15; y < this.y + this.height - 6; y += 27) {
        const radius = 5 + ((x + y) % 9);
        circle(x + sin(y) * 3, y, radius);
      }
    }

    noFill();
    stroke(229, 215, 183, 145);
    strokeWeight(2);
    rect(this.x + 1, this.y + 1, this.width - 2, this.height - 2, 3);
    pop();
  }
}

class VegetationZone {
  constructor({ x, y, width, height }, attenuation) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.attenuation = constrain(attenuation, 0, 0.9);
  }

  containsPoint(point) {
    return pointInRectangle(point, this, 0);
  }

  affectsSignal(fishPosition, receiverPosition) {
    return (
      this.containsPoint(fishPosition) ||
      this.containsPoint(receiverPosition) ||
      segmentIntersectsRectangle(fishPosition, receiverPosition, this, 0)
    );
  }

  render() {
    push();
    noStroke();
    fill(63, 126, 82, 125);
    rect(this.x, this.y, this.width, this.height, 12);

    stroke(139, 205, 134, 165);
    strokeWeight(3);
    for (let x = this.x + 13; x < this.x + this.width - 8; x += 19) {
      const offset = (x * 13) % 17;
      for (let y = this.y + 20 + offset; y < this.y + this.height - 8; y += 35) {
        line(x, y + 8, x + sin(x + y) * 7, y - 8);
      }
    }

    noFill();
    stroke(188, 225, 159, 170);
    strokeWeight(1.5);
    safeSetLineDash([7, 6]);
    rect(this.x + 1, this.y + 1, this.width - 2, this.height - 2, 12);
    safeSetLineDash([]);
    pop();
  }
}


class NoisyArea {
  constructor({ centerX, centerY, radius, phase = 0 }, attenuation, index = 0) {
    this.center = createVector(centerX, centerY);
    this.radius = radius;
    this.attenuation = constrain(attenuation, 0, 0.9);
    this.phase = phase;
    this.index = index;
  }

  containsPoint(point) {
    return p5.Vector.dist(point, this.center) <= this.radius;
  }

  affectsSignal(fishPosition, receiverPosition) {
    return (
      this.containsPoint(fishPosition) ||
      this.containsPoint(receiverPosition) ||
      segmentIntersectsCircle(
        fishPosition,
        receiverPosition,
        this.center,
        this.radius
      )
    );
  }

  render() {
    push();

    // The coloured disk is the fixed noisy-water area used by detection logic.
    noStroke();
    fill(210, 145, 55, 58);
    circle(this.center.x, this.center.y, this.radius * 2);

    noFill();
    stroke(255, 218, 138, 175);
    strokeWeight(2);
    safeSetLineDash([9, 7]);
    circle(this.center.x, this.center.y, this.radius * 2);
    safeSetLineDash([]);

    // A hand-drawn spiral suggests repeated vessel movement through the zone.
    stroke(255, 228, 166, 105);
    strokeWeight(2);
    beginShape();
    const spiralSteps = 44;
    for (let step = 0; step <= spiralSteps; step += 1) {
      const amount = step / spiralSteps;
      const angle = amount * TWO_PI * 2.2 + this.phase;
      const spiralRadius = this.radius * (0.12 + amount * 0.72);
      vertex(
        this.center.x + cos(angle) * spiralRadius,
        this.center.y + sin(angle) * spiralRadius
      );
    }
    endShape();

    // The boat moves around the circle as a visual explanation only. The
    // attenuation zone itself remains fixed and deterministic for scoring.
    const orbitAngle = frameCount * 0.012 + this.phase + this.index * 0.8;
    const orbitRadius = this.radius * 0.64;
    const shipX = this.center.x + cos(orbitAngle) * orbitRadius;
    const shipY = this.center.y + sin(orbitAngle) * orbitRadius;

    push();
    translate(shipX, shipY);
    rotate(orbitAngle + HALF_PI);
    noStroke();
    fill(248, 239, 205);
    beginShape();
    vertex(0, -13);
    vertex(9, 9);
    vertex(0, 13);
    vertex(-9, 9);
    endShape(CLOSE);
    fill(48, 72, 77);
    rect(-5, -2, 10, 9, 2);
    stroke(248, 239, 205, 180);
    strokeWeight(1.5);
    line(0, -2, 0, -9);
    pop();

    noStroke();
    fill(255, 238, 183, 220);
    textAlign(CENTER, CENTER);
    textFont("Georgia");
    textStyle(BOLD);
    textSize(17);
    text("♪", shipX + 15, shipY - 14);
    textSize(13);
    text("♫", shipX - 17, shipY - 8);

    pop();
  }
}

class PathGenerator {
  static generate(level, seed, species = speciesForFish(0)) {
    const config = level.config;
    const movement = species.movement;
    const desiredSampleCount = Math.max(
      2,
      Math.ceil(config.pathLength / config.pathSampleSpacing) + 1
    );
    let bestPath = [];

    for (let attempt = 0; attempt < 28; attempt += 1) {
      const attemptSeed = seed + attempt * 10_007;
      randomSeed(attemptSeed);
      noiseSeed(attemptSeed);

      const start = this.randomValidStart(level);
      const path = [start];
      let heading = random(TWO_PI);
      let targetHeading = heading;
      let failedSteps = 0;

      for (let sampleIndex = 1; sampleIndex < desiredSampleCount; sampleIndex += 1) {
        const current = path[path.length - 1];

        if (random() < movement.turnFrequency) {
          const directedBias =
            sin(sampleIndex * 0.031 + attemptSeed * 0.00021) *
            movement.wanderingBias;
          targetHeading =
            heading +
            random(-movement.maxTurnAngle, movement.maxTurnAngle) +
            directedBias;
        }

        const turnNoise =
          (noise(
            attempt * 5.31 +
            sampleIndex * config.turnNoiseScale * movement.wanderRandomness
          ) - 0.5) * 2;
        const noiseTurn =
          turnNoise *
          config.pathIrregularity *
          movement.wanderRandomness *
          0.24;
        const loopTurn =
          sin(sampleIndex * 0.036 + attemptSeed * 0.00013) *
          config.pathIrregularity *
          movement.loopStrength *
          0.16;

        let preferredHeading = lerpAngle(
          heading,
          targetHeading,
          movement.directionChangeSmoothness
        );
        preferredHeading += noiseTurn + loopTurn;

        preferredHeading = this.applyBoundarySteering(
          preferredHeading,
          current,
          config.waterWidth,
          config.waterHeight,
          config.fishClearance,
          movement.boundaryAvoidance
        );

        const candidate = this.findValidNextPoint(
          level,
          current,
          preferredHeading,
          config.pathSampleSpacing
        );

        if (candidate) {
          path.push(candidate.point);
          heading = lerpAngle(
            heading,
            candidate.heading,
            movement.pathFollowSmoothing
          );
          failedSteps = 0;
        } else {
          heading += PI * 0.76 + random(-0.55, 0.55);
          targetHeading = heading;
          failedSteps += 1;
          if (failedSteps > 30) break;
        }
      }

      if (path.length > bestPath.length) bestPath = path;
      if (path.length >= desiredSampleCount) return path;
    }

    console.warn(
      `Path generator produced ${bestPath.length} of ${desiredSampleCount} requested samples.`
    );
    return bestPath;
  }

  static randomValidStart(level) {
    const margin = Math.max(28, level.config.fishClearance + 5);

    for (let attempt = 0; attempt < 800; attempt += 1) {
      const point = createVector(
        random(margin, level.config.waterWidth - margin),
        random(margin, level.config.waterHeight - margin)
      );
      const blocked = level.barriers.some((barrier) =>
        barrier.containsPoint(point, level.config.fishClearance)
      );
      if (!blocked) return point;
    }

    for (let y = margin; y < level.config.waterHeight - margin; y += 20) {
      for (let x = margin; x < level.config.waterWidth - margin; x += 20) {
        const point = createVector(x, y);
        const blocked = level.barriers.some((barrier) =>
          barrier.containsPoint(point, level.config.fishClearance)
        );
        if (!blocked) return point;
      }
    }

    throw new Error("No valid fish starting position exists for this level.");
  }

  static applyBoundarySteering(
    heading,
    point,
    worldWidth,
    worldHeight,
    clearance,
    avoidanceStrength = 1
  ) {
    const boundaryBand = Math.max(75, clearance * 4.5) * avoidanceStrength;
    let steerX = 0;
    let steerY = 0;

    if (point.x < boundaryBand) steerX += (boundaryBand - point.x) / boundaryBand;
    if (point.x > worldWidth - boundaryBand) {
      steerX -= (point.x - (worldWidth - boundaryBand)) / boundaryBand;
    }
    if (point.y < boundaryBand) steerY += (boundaryBand - point.y) / boundaryBand;
    if (point.y > worldHeight - boundaryBand) {
      steerY -= (point.y - (worldHeight - boundaryBand)) / boundaryBand;
    }

    if (Math.abs(steerX) + Math.abs(steerY) > 0.001) {
      const inwardHeading = atan2(steerY, steerX);
      const strength = constrain(
        Math.hypot(steerX, steerY) * 0.5 * avoidanceStrength,
        0.12,
        0.82
      );
      return lerpAngle(heading, inwardHeading, strength);
    }

    return heading;
  }

  static findValidNextPoint(level, current, preferredHeading, stepLength) {
    const angleOffsets = [
      0, 0.13, -0.13, 0.26, -0.26, 0.43, -0.43, 0.65, -0.65,
      0.92, -0.92, 1.25, -1.25, 1.65, -1.65, PI
    ];

    for (const offset of angleOffsets) {
      const candidateHeading = preferredHeading + offset;
      const candidatePoint = createVector(
        current.x + cos(candidateHeading) * stepLength,
        current.y + sin(candidateHeading) * stepLength
      );

      if (level.isPathSegmentValid(current, candidatePoint)) {
        return { point: candidatePoint, heading: candidateHeading };
      }
    }

    return null;
  }
}


function pointInRectangle(point, rectangle, padding = 0) {
  return (
    point.x >= rectangle.x - padding &&
    point.x <= rectangle.x + rectangle.width + padding &&
    point.y >= rectangle.y - padding &&
    point.y <= rectangle.y + rectangle.height + padding
  );
}

function segmentIntersectsRectangle(start, end, rectangle, padding = 0) {
  const left = rectangle.x - padding;
  const right = rectangle.x + rectangle.width + padding;
  const top = rectangle.y - padding;
  const bottom = rectangle.y + rectangle.height + padding;
  const expanded = { x: left, y: top, width: right - left, height: bottom - top };

  if (pointInRectangle(start, expanded) || pointInRectangle(end, expanded)) {
    return true;
  }

  const topLeft = createVector(left, top);
  const topRight = createVector(right, top);
  const bottomRight = createVector(right, bottom);
  const bottomLeft = createVector(left, bottom);

  return (
    segmentsIntersect(start, end, topLeft, topRight) ||
    segmentsIntersect(start, end, topRight, bottomRight) ||
    segmentsIntersect(start, end, bottomRight, bottomLeft) ||
    segmentsIntersect(start, end, bottomLeft, topLeft)
  );
}


function segmentIntersectsCircle(start, end, center, radius) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const lengthSquared = dx * dx + dy * dy;

  if (lengthSquared < 1e-9) {
    return p5.Vector.dist(start, center) <= radius;
  }

  const projection = constrain(
    ((center.x - start.x) * dx + (center.y - start.y) * dy) / lengthSquared,
    0,
    1
  );
  const closestX = start.x + projection * dx;
  const closestY = start.y + projection * dy;
  const distanceX = closestX - center.x;
  const distanceY = closestY - center.y;
  return distanceX * distanceX + distanceY * distanceY <= radius * radius;
}

function segmentsIntersect(a, b, c, d) {
  const rX = b.x - a.x;
  const rY = b.y - a.y;
  const sX = d.x - c.x;
  const sY = d.y - c.y;
  const denominator = cross2D(rX, rY, sX, sY);
  const cMinusAX = c.x - a.x;
  const cMinusAY = c.y - a.y;
  const epsilon = 1e-9;

  if (Math.abs(denominator) < epsilon) {
    if (Math.abs(cross2D(cMinusAX, cMinusAY, rX, rY)) >= epsilon) return false;
    const rLengthSquared = rX * rX + rY * rY;
    if (rLengthSquared < epsilon) return p5.Vector.dist(a, c) < epsilon;

    const t0 = (cMinusAX * rX + cMinusAY * rY) / rLengthSquared;
    const t1 = t0 + (sX * rX + sY * rY) / rLengthSquared;
    return Math.max(t0, t1) >= 0 && Math.min(t0, t1) <= 1;
  }

  const t = cross2D(cMinusAX, cMinusAY, sX, sY) / denominator;
  const u = cross2D(cMinusAX, cMinusAY, rX, rY) / denominator;
  return t >= 0 && t <= 1 && u >= 0 && u <= 1;
}

function cross2D(ax, ay, bx, by) {
  return ax * by - ay * bx;
}

function lerpAngle(fromAngle, toAngle, amount) {
  const shortestDifference = atan2(
    sin(toAngle - fromAngle),
    cos(toAngle - fromAngle)
  );
  return fromAngle + shortestDifference * amount;
}
