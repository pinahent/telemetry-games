"use strict";

const TRANSLATIONS = {
  en: {
    documentTitle: "Field Notes — Fish Movement Reconstruction",
    mainTitle: "Field Notes",
    subtitle: "Reconstruct plausible fish routes from receiver detections and environmental constraints.",
    stampTraining: "TRAINING CAMP",
    languageLabel: "Language",
    hudLevel: "Level",
    hudStatus: "Status",
    soundOn: "♫ Sound: on",
    soundOff: "♫ Sound: off",
    soundUnavailable: "Sound unavailable",
    footerCredit: "by Pina",
    fatalError: "Game build {version} stopped because of a JavaScript error:\n\n{message}",
    movementSection: "01 / ROUTE EVIDENCE",
    movementHeading: "Reconstruct the fish movement path",
    difficultyLabel: "Difficulty",
    difficultyEasy: "Easy",
    difficultyMedium: "Medium",
    difficultyHard: "Hard",
    movementStatusLabel: "Movement reconstruction status",
    hudScore: "Score",
    hudAttempts: "Attempts",
    hudProgress: "Drawn pings",
    stateComplete: "Complete",
    stateBuilding: "Ready to draw",
    stateDrawing: "Drawing",
    stateReview: "Review result",
    stateTutorial: "Tutorial",
    buttonUndo: "Undo section",
    buttonClear: "Clear path",
    buttonSubmitPath: "Submit path",
    buttonHint: "Hint",
    buttonTutorial: "Replay tutorial",
    buttonHideTutorial: "Hide example",
    buttonRestartAttempt: "Restart attempt",
    buttonNextLevel: "Next level",
    movementMapLabel: "Interactive fish path reconstruction map",
    movementLegendLabel: "Movement map legend",
    legendStart: "start zone",
    legendEnd: "end zone",
    legendZero: "0 detections",
    legendOne: "1 detection",
    legendTwo: "2 detections",
    legendThreePlus: "3+ detections",
    legendPlayerRoute: "your reconstruction",
    legendTrueRoute: "true route after submission",
    movementNotesSection: "02 / EVIDENCE NOTES",
    movementNotesHeading: "Interpreting receiver detections",
    spacingHeading: "Ping spacing is fixed",
    spacingBody: "In reality tag transmissions are happening at equal time intervals along the route, not at equal space intervals.",
    countsHeading: "Counts describe proximity",
    countsBody: "A receiver counts each transmission that falls inside its listening radius. Overlapping receivers may hear the same ping.",
    plausibleHeading: "Reconstruct the whole route",
    plausibleBody: "Use all receiver counts, the regular ping spacing, the start and end zones and environmental barriers together.",
    obstacleHeading: "Environmental constraints",
    obstacleBody: "The route must remain in the water and cannot cross solid rocks, islands or barriers.",
    movementReady: "Draw one continuous route from S to E. Pings appear after each full {interval}-unit distance interval.",
    movementBeginAtStart: "Begin inside the green S start zone.",
    movementResumeAtEnd: "Resume drawing close to the current end of your line or clear the path.",
    movementDrawing: "Drawing route. Each new ripple marks another fixed-distance tag transmission.",
    movementBlocked: "The route cannot cross that solid obstacle.",
    movementOutside: "Keep the route inside the playing area.",
    movementNeedPath: "Draw a continuous route from S to E before submitting.",
    movementNeedStart: "The route must begin inside the green S start zone.",
    movementNeedEnd: "Finish inside the red E end zone before submitting.",
    movementTooShort: "The route is too short to evaluate. Continue drawing toward E.",
    movementCleared: "Path cleared. Start again inside S.",
    movementUndone: "The most recent route section was removed.",
    movementHint: "Hint: {hint}",
    movementResultPass: "Receiver-count accuracy {score}% — route accepted: {stars} ★.",
    movementCampaignComplete: "Receiver-count accuracy {score}% — all routes completed! Trophy fanfare unlocked.",
    movementResultRetry: "Receiver-count accuracy {score}% — below the {target}% target. Review the comparison, then restart the attempt.",
    movementAttemptsUsed: "Receiver-count accuracy {score}%. All {attempts} attempts are used; the true route remains visible for review.",
    movementTutorialComplete: "The true route is hidden again. Reconstruct it from the receiver counts and fixed ping spacing.",
    movementRestarted: "Attempt reset. The evidence is unchanged because this level uses a deterministic seed.",
    tutorialTitle: "How the evidence is created",
    tutorialStepPath: "First, the tagged fish follows a continuous route from S to E.",
    tutorialStepPings: "The tag transmits after each full distance interval along that route.",
    tutorialStepReceivers: "Receivers pulse and increase their count whenever a ping falls inside their listening radius.",
    tutorialStepHidden: "The route and ping positions are then hidden. Only the evidence remains for reconstruction.",
    receiverAria: "Receiver {receiver}: {target} target detections{comparison}",
    receiverComparison: ", your route produced {player}",
    receiverLiveLabel: "target/live",
    evaluationHeading: "Reconstruction analysis",
    evaluationAccepted: "Accepted",
    evaluationNotAccepted: "Not yet accepted",
    evaluationPath: "Route similarity",
    evaluationCounts: "Receiver-count accuracy",
    evaluationEndpoints: "Start/end accuracy",
    evaluationReceiver: "Receiver",
    evaluationTarget: "Target",
    evaluationPlayer: "Your path",
    evaluationDifference: "Difference",
    evaluationScore: "Overall score",
    evaluationPassTarget: "Receiver-count pass target",
    celebrationTitle: "Route reconstructed!",
    celebrationCampaignTitle: "Fieldwork complete!",
    celebrationAccuracy: "{accuracy}% receiver-count accuracy",
    celebrationStars: "{stars} of 3 stars",
    startShort: "S",
    endShort: "E"
  },
  de: {
    documentTitle: "Feldnotizen — Rekonstruktion von Fischbewegungen",
    mainTitle: "Feldnotizen",
    subtitle: "Rekonstruiere mögliche Fischrouten aus Empfängererfassungen und Umweltbedingungen.",
    stampTraining: "TRAINING CAMP",
    languageLabel: "Sprache",
    hudLevel: "Level",
    hudStatus: "Status",
    soundOn: "♫ Ton: an",
    soundOff: "♫ Ton: aus",
    soundUnavailable: "Ton nicht verfügbar",
    footerCredit: "von Pina",
    fatalError: "Spiel-Build {version} wurde wegen eines JavaScript-Fehlers angehalten:\n\n{message}",
    movementSection: "01 / ROUTENHINWEISE",
    movementHeading: "Bewegungspfad des Fisches rekonstruieren",
    difficultyLabel: "Schwierigkeit",
    difficultyEasy: "Einfach",
    difficultyMedium: "Mittel",
    difficultyHard: "Schwer",
    movementStatusLabel: "Status der Bewegungsrekonstruktion",
    hudScore: "Punkte",
    hudAttempts: "Versuche",
    hudProgress: "Gezeichnete Pings",
    stateComplete: "Abgeschlossen",
    stateBuilding: "Bereit zum Zeichnen",
    stateDrawing: "Zeichnen",
    stateReview: "Ergebnis prüfen",
    stateTutorial: "Tutorial",
    buttonUndo: "Abschnitt zurück",
    buttonClear: "Pfad löschen",
    buttonSubmitPath: "Pfad prüfen",
    buttonHint: "Hinweis",
    buttonTutorial: "Tutorial wiederholen",
    buttonHideTutorial: "Beispiel ausblenden",
    buttonRestartAttempt: "Versuch neu starten",
    buttonNextLevel: "Nächstes Level",
    movementMapLabel: "Interaktive Karte zur Rekonstruktion des Fischpfads",
    movementLegendLabel: "Legende der Bewegungskarte",
    legendStart: "Startzone",
    legendEnd: "Endzone",
    legendZero: "0 Erfassungen",
    legendOne: "1 Erfassung",
    legendTwo: "2 Erfassungen",
    legendThreePlus: "3+ Erfassungen",
    legendPlayerRoute: "deine Rekonstruktion",
    legendTrueRoute: "wahrer Pfad nach Abgabe",
    movementNotesSection: "02 / HINWEISNOTIZEN",
    movementNotesHeading: "Empfängererfassung interpretieren",
    spacingHeading: "Ping-Abstände sind fest",
    spacingBody: "In der Realität erfolgen die Signale in gleichen Zeitintervallen und nicht in gleichen räumlichen Abständen.",
    countsHeading: "Zählwerte zeigen Nähe",
    countsBody: "Ein Empfänger zählt jede Übertragung innerhalb seines Hörbereichs. Überlappende Empfänger können denselben Ping hören.",
    plausibleHeading: "Die ganze Route rekonstruieren",
    plausibleBody: "Nutze alle Zählwerte, den regelmäßigen Ping-Abstand, Start- und Endzone sowie Umweltbarrieren gemeinsam.",
    obstacleHeading: "Umweltbedingte Grenzen",
    obstacleBody: "Die Route muss im Wasser bleiben und darf Felsen, Inseln oder Barrieren nicht kreuzen.",
    movementReady: "Zeichne eine durchgehende Route von S nach E. Nach jedem vollen Wegintervall von {interval} Einheiten erscheint ein Ping.",
    movementBeginAtStart: "Beginne innerhalb der grünen Startzone S.",
    movementResumeAtEnd: "Setze nahe am aktuellen Linienende fort oder lösche den Pfad.",
    movementDrawing: "Route wird gezeichnet. Jede neue Welle markiert eine weitere Tag-Übertragung im festen Wegabstand.",
    movementBlocked: "Die Route darf dieses feste Hindernis nicht kreuzen.",
    movementOutside: "Halte die Route innerhalb des Spielfelds.",
    movementNeedPath: "Zeichne vor der Prüfung eine durchgehende Route von S nach E.",
    movementNeedStart: "Die Route muss innerhalb der grünen Startzone S beginnen.",
    movementNeedEnd: "Beende den Pfad innerhalb der roten Endzone E.",
    movementTooShort: "Die Route ist für eine Bewertung zu kurz. Zeichne weiter in Richtung E.",
    movementCleared: "Pfad gelöscht. Beginne erneut innerhalb von S.",
    movementUndone: "Der letzte Routenabschnitt wurde entfernt.",
    movementHint: "Hinweis: {hint}",
    movementResultPass: "Genauigkeit der Empfängerzählwerte {score}% — Route akzeptiert: {stars} ★.",
    movementCampaignComplete: "Genauigkeit der Empfängerzählwerte {score}% — alle Routen abgeschlossen! Trophäenfanfare freigeschaltet.",
    movementResultRetry: "Genauigkeit der Empfängerzählwerte {score}% — unter dem Ziel von {target}%. Prüfe den Vergleich und starte den Versuch neu.",
    movementAttemptsUsed: "Genauigkeit der Empfängerzählwerte {score}%. Alle {attempts} Versuche sind verbraucht; der wahre Pfad bleibt zur Analyse sichtbar.",
    movementTutorialComplete: "Der wahre Pfad ist wieder verborgen. Rekonstruiere ihn aus Zählwerten und festem Ping-Abstand.",
    movementRestarted: "Versuch zurückgesetzt. Die Hinweise bleiben gleich, weil dieses Level einen deterministischen Seed nutzt.",
    tutorialTitle: "So entstehen die Hinweise",
    tutorialStepPath: "Zuerst folgt der markierte Fisch einer durchgehenden Route von S nach E.",
    tutorialStepPings: "Der Tag sendet nach jedem vollständigen Wegintervall entlang dieser Route.",
    tutorialStepReceivers: "Empfänger pulsieren und erhöhen ihren Zählwert, wenn ein Ping in ihrem Hörbereich liegt.",
    tutorialStepHidden: "Danach werden Route und Ping-Positionen verborgen. Nur die Hinweise bleiben zur Rekonstruktion sichtbar.",
    receiverAria: "Empfänger {receiver}: {target} Zielerfassungen{comparison}",
    receiverComparison: ", dein Pfad erzeugte {player}",
    receiverLiveLabel: "Ziel/Live",
    evaluationHeading: "Analyse der Rekonstruktion",
    evaluationAccepted: "Akzeptiert",
    evaluationNotAccepted: "Noch nicht akzeptiert",
    evaluationPath: "Routenähnlichkeit",
    evaluationCounts: "Genauigkeit der Empfängerzählwerte",
    evaluationEndpoints: "Start-/Endgenauigkeit",
    evaluationReceiver: "Empfänger",
    evaluationTarget: "Ziel",
    evaluationPlayer: "Dein Pfad",
    evaluationDifference: "Differenz",
    evaluationScore: "Gesamtergebnis",
    evaluationPassTarget: "Bestehensgrenze der Empfängerzählwerte",
    celebrationTitle: "Route rekonstruiert!",
    celebrationCampaignTitle: "Feldarbeit abgeschlossen!",
    celebrationAccuracy: "{accuracy}% Genauigkeit der Empfängerzählwerte",
    celebrationStars: "{stars} von 3 Sternen",
    startShort: "S",
    endShort: "E"
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
    this.musicFilter = null;
    this.noiseBuffer = null;
    this.enabled = false;
    this.musicTimer = null;
    this.musicBarIndex = 0;
    this.nextBarTime = 0;
    this.musicBpm = 117.45;
    this.vinylSource = null;
    this.vinylGain = null;
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
    this.musicFilter = this.context.createBiquadFilter();
    const compressor = this.context.createDynamicsCompressor();

    this.masterGain.gain.value = 0.0001;
    this.musicGain.gain.value = 0.2;
    this.effectsGain.gain.value = 0.64;
    this.musicFilter.type = "lowpass";
    this.musicFilter.frequency.value = 5200;
    this.musicFilter.Q.value = 0.55;
    compressor.threshold.value = -20;
    compressor.knee.value = 18;
    compressor.ratio.value = 3;
    compressor.attack.value = 0.012;
    compressor.release.value = 0.24;

    this.musicGain.connect(this.musicFilter);
    this.musicFilter.connect(compressor);
    compressor.connect(this.masterGain);
    this.effectsGain.connect(this.masterGain);
    this.masterGain.connect(this.context.destination);
    this.noiseBuffer = this.createNoiseBuffer(5);
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
    this.masterGain.gain.exponentialRampToValueAtTime(0.74, now + 0.2);
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
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
  }

  createNoiseBuffer(seconds) {
    const frameCount = Math.max(1, Math.floor(this.context.sampleRate * seconds));
    const buffer = this.context.createBuffer(1, frameCount, this.context.sampleRate);
    const channel = buffer.getChannelData(0);
    let previous = 0;
    for (let index = 0; index < frameCount; index += 1) {
      const white = Math.random() * 2 - 1;
      previous = previous * 0.91 + white * 0.09;
      channel[index] = previous;
    }
    return buffer;
  }

  midiToFrequency(midi) {
    return 440 * 2 ** ((midi - 69) / 12);
  }

  startMusic() {
    if (!this.enabled || !this.context || this.musicTimer) return;
    this.musicBarIndex = 0;
    this.nextBarTime = this.context.currentTime + 0.1;
    this.startVinylTexture();
    this.scheduleMusicAhead();
    this.musicTimer = window.setInterval(() => this.scheduleMusicAhead(), 150);
  }

  stopMusic() {
    if (this.musicTimer) window.clearInterval(this.musicTimer);
    this.musicTimer = null;
    this.stopVinylTexture();
  }

  startVinylTexture() {
    if (!this.enabled || !this.context || this.vinylSource) return;
    const source = this.context.createBufferSource();
    const highpass = this.context.createBiquadFilter();
    const lowpass = this.context.createBiquadFilter();
    const gain = this.context.createGain();
    source.buffer = this.noiseBuffer;
    source.loop = true;
    highpass.type = "highpass";
    highpass.frequency.value = 1700;
    lowpass.type = "lowpass";
    lowpass.frequency.value = 6100;
    gain.gain.value = 0.011;
    source.connect(highpass);
    highpass.connect(lowpass);
    lowpass.connect(gain);
    gain.connect(this.musicGain);
    source.start();
    this.vinylSource = source;
    this.vinylGain = gain;
  }

  stopVinylTexture() {
    if (this.vinylSource) {
      try { this.vinylSource.stop(); } catch (error) { /* already stopped */ }
      this.vinylSource.disconnect();
    }
    this.vinylSource = null;
    this.vinylGain = null;
  }

  scheduleMusicAhead() {
    if (!this.enabled || !this.context) return;
    const barDuration = (60 / this.musicBpm) * 4;
    while (this.nextBarTime < this.context.currentTime + 1.25) {
      this.scheduleBar(this.nextBarTime, this.musicBarIndex);
      this.nextBarTime += barDuration;
      this.musicBarIndex += 1;
    }
  }

  scheduleBar(startTime, barIndex) {
    const beat = 60 / this.musicBpm;
    const progression = [
      { chord: [54, 57, 61, 64, 68], bass: 42 }, // F#m9
      { chord: [50, 57, 61, 64, 69], bass: 38 }, // Dmaj9
      { chord: [49, 57, 61, 64, 68], bass: 37 }, // Amaj9/C#
      { chord: [52, 56, 59, 61, 66], bass: 40 }, // E6/9
      { chord: [47, 50, 54, 57, 61], bass: 35 }, // Bm9
      { chord: [49, 52, 56, 59, 64], bass: 37 }, // C#m7
      { chord: [50, 57, 61, 64, 69], bass: 38 }, // Dmaj9
      { chord: [52, 56, 62, 66, 71], bass: 40 }  // E13
    ];
    const harmony = progression[barIndex % progression.length];

    harmony.chord.forEach((midi, noteIndex) => {
      this.scheduleElectricPiano(
        midi,
        startTime + noteIndex * 0.012,
        beat * 3.82,
        0.022 - noteIndex * 0.0018,
        noteIndex - 2
      );
    });

    const upperVoicing = harmony.chord.slice(-3).map((midi) => midi + 12);
    upperVoicing.forEach((midi, noteIndex) => {
      this.scheduleElectricPiano(midi, startTime + beat * 2.48 + noteIndex * 0.009, beat * 1.28, 0.009, noteIndex - 1);
    });

    this.scheduleBass(harmony.bass, startTime, beat * 1.42, 0.055);
    this.scheduleBass(harmony.bass + (barIndex % 2 === 0 ? 7 : 12), startTime + beat * 2.52, beat * 1.05, 0.038);

    this.scheduleKick(startTime, 0.05);
    this.scheduleKick(startTime + beat * 2.72, 0.031);
    this.scheduleSnare(startTime + beat * 2, 0.032);

    for (let eighth = 1; eighth < 8; eighth += 1) {
      const swing = eighth % 2 === 1 ? beat * 0.08 : 0;
      this.scheduleHat(startTime + beat * eighth * 0.5 + swing, eighth % 4 === 0 ? 0.011 : 0.0075);
    }

    this.scheduleMelody(startTime, barIndex, beat);
    this.scheduleCrackle(startTime + beat * (0.4 + (barIndex % 3) * 0.8), 0.0055);
    this.scheduleCrackle(startTime + beat * (3.15 - (barIndex % 2) * 0.45), 0.004);
  }

  scheduleElectricPiano(midi, startTime, duration, peakGain, panPosition = 0) {
    const frequency = this.midiToFrequency(midi);
    const gain = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    const panner = this.context.createStereoPanner ? this.context.createStereoPanner() : null;
    const oscillatorA = this.context.createOscillator();
    const oscillatorB = this.context.createOscillator();

    oscillatorA.type = "triangle";
    oscillatorB.type = "sine";
    oscillatorA.frequency.setValueAtTime(frequency, startTime);
    oscillatorB.frequency.setValueAtTime(frequency * 2, startTime);
    oscillatorA.detune.setValueAtTime(-3.5, startTime);
    oscillatorA.detune.linearRampToValueAtTime(2.5, startTime + duration);
    oscillatorB.detune.setValueAtTime(4, startTime);
    oscillatorB.detune.linearRampToValueAtTime(-2, startTime + duration);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1850, startTime);
    filter.frequency.exponentialRampToValueAtTime(760, startTime + duration);
    filter.Q.value = 0.75;

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(peakGain, startTime + 0.035);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, peakGain * 0.42), startTime + Math.min(duration * 0.28, 0.52));
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    oscillatorA.connect(filter);
    oscillatorB.connect(filter);
    filter.connect(gain);
    if (panner) {
      panner.pan.value = this.clamp(panPosition * 0.12, -0.48, 0.48);
      gain.connect(panner);
      panner.connect(this.musicGain);
    } else {
      gain.connect(this.musicGain);
    }

    oscillatorA.start(startTime);
    oscillatorB.start(startTime);
    oscillatorA.stop(startTime + duration + 0.06);
    oscillatorB.stop(startTime + duration + 0.06);
  }

  scheduleMelody(startTime, barIndex, beat) {
    const phrases = [
      [[0.72, 73, 0.54], [1.46, 76, 0.42], [2.38, 78, 0.7], [3.34, 76, 0.4]],
      [[0.55, 81, 0.52], [1.42, 80, 0.46], [2.22, 76, 0.58], [3.25, 73, 0.46]],
      [[0.7, 71, 0.48], [1.42, 73, 0.5], [2.35, 76, 0.72]],
      [[0.48, 78, 0.44], [1.2, 76, 0.42], [2.18, 73, 0.56], [3.16, 71, 0.48]],
      [[0.66, 74, 0.5], [1.48, 78, 0.5], [2.4, 81, 0.65]],
      [[0.62, 80, 0.44], [1.36, 76, 0.52], [2.3, 73, 0.65]],
      [[0.55, 71, 0.42], [1.32, 73, 0.46], [2.1, 76, 0.5], [3.15, 78, 0.46]],
      [[0.55, 76, 0.4], [1.25, 73, 0.44], [2.18, 71, 0.48], [3.08, 68, 0.7]]
    ];
    const phrase = phrases[barIndex % phrases.length];
    phrase.forEach(([beatOffset, midi, length], index) => {
      const start = startTime + beat * beatOffset;
      const frequency = this.midiToFrequency(midi);
      this.scheduleTone(frequency, start, beat * length, 0.016 - index * 0.001, "sine", this.musicGain, 2200, frequency * 0.992);
    });
  }

  scheduleTone(frequency, startTime, duration, peakGain, type, destination, filterFrequency = 1400, endFrequency = frequency) {
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startTime);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), startTime + duration);
    filter.type = "lowpass";
    filter.frequency.value = filterFrequency;
    filter.Q.value = 0.7;

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(peakGain, startTime + Math.min(0.055, duration * 0.25));
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.05);
  }

  scheduleBass(midi, startTime, duration, peakGain) {
    const frequency = this.midiToFrequency(midi);
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, startTime);
    oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.992, startTime + duration);
    filter.type = "lowpass";
    filter.frequency.value = 390;
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(peakGain, startTime + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.04);
  }

  scheduleKick(startTime, peakGain) {
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(92, startTime);
    oscillator.frequency.exponentialRampToValueAtTime(42, startTime + 0.18);
    gain.gain.setValueAtTime(peakGain, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.22);
    oscillator.connect(gain);
    gain.connect(this.musicGain);
    oscillator.start(startTime);
    oscillator.stop(startTime + 0.24);
  }

  scheduleSnare(startTime, peakGain) {
    const source = this.context.createBufferSource();
    const filter = this.context.createBiquadFilter();
    const gain = this.context.createGain();
    source.buffer = this.noiseBuffer;
    filter.type = "bandpass";
    filter.frequency.value = 1550;
    filter.Q.value = 0.8;
    gain.gain.setValueAtTime(peakGain, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.16);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);
    source.start(startTime, Math.random() * 2);
    source.stop(startTime + 0.18);
    this.scheduleTone(184, startTime, 0.12, peakGain * 0.38, "triangle", this.musicGain, 850, 155);
  }

  scheduleHat(startTime, peakGain) {
    const source = this.context.createBufferSource();
    const filter = this.context.createBiquadFilter();
    const gain = this.context.createGain();
    source.buffer = this.noiseBuffer;
    filter.type = "highpass";
    filter.frequency.value = 4700;
    gain.gain.setValueAtTime(peakGain, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.055);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);
    source.start(startTime, Math.random() * 2);
    source.stop(startTime + 0.065);
  }

  scheduleCrackle(startTime, peakGain) {
    const source = this.context.createBufferSource();
    const highpass = this.context.createBiquadFilter();
    const gain = this.context.createGain();
    source.buffer = this.noiseBuffer;
    highpass.type = "highpass";
    highpass.frequency.value = 2600;
    gain.gain.setValueAtTime(peakGain, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.018);
    source.connect(highpass);
    highpass.connect(gain);
    gain.connect(this.musicGain);
    source.start(startTime, Math.random() * 3);
    source.stop(startTime + 0.024);
  }

  playDrawStart() {
    if (!this.enabled || !this.context) return;
    const now = this.context.currentTime + 0.01;
    this.scheduleTone(245, now, 0.16, 0.08, "sine", this.effectsGain, 1500, 392);
    this.scheduleTone(660, now + 0.08, 0.2, 0.055, "triangle", this.effectsGain, 2400, 620);
  }

  playTagPing(heardCount = 0) {
    if (!this.enabled || !this.context) return;
    const now = this.context.currentTime + 0.008;
    const lift = Math.min(heardCount, 3) * 55;
    this.scheduleTone(760 + lift, now, 0.24, 0.12, "sine", this.effectsGain, 3200, 1180 + lift);
    this.scheduleTone(1520 + lift, now + 0.055, 0.28, 0.045, "sine", this.effectsGain, 3600, 1320 + lift);
  }

  playReceiverPulse() {
    if (!this.enabled || !this.context) return;
    const now = this.context.currentTime + 0.01;
    this.scheduleTone(523.25, now, 0.16, 0.09, "triangle", this.effectsGain, 2300, 490);
    this.scheduleTone(783.99, now + 0.045, 0.22, 0.065, "sine", this.effectsGain, 2800, 740);
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
    filter.frequency.value = 620;
    filter.Q.value = 0.8;
    gain.gain.value = 0.018;
    lfo.frequency.value = 0.28;
    lfoGain.gain.value = 0.007;

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
    const now = this.context.currentTime + 0.025;
    [69, 73, 76, 80, 81].forEach((midi, index) => {
      this.scheduleTone(this.midiToFrequency(midi), now + index * 0.095, 0.42, 0.15 - index * 0.014, index % 2 ? "triangle" : "sine", this.effectsGain, 3400);
    });
    [57, 61, 64, 68].forEach((midi, index) => {
      this.scheduleTone(this.midiToFrequency(midi), now + 0.3 + index * 0.012, 0.85, 0.06, "triangle", this.effectsGain, 2600);
    });
  }

  playFailure() {
    if (!this.enabled || !this.context) return;
    const now = this.context.currentTime + 0.025;
    this.scheduleTone(349.23, now, 0.34, 0.105, "triangle", this.effectsGain, 1300, 311.13);
    this.scheduleTone(246.94, now + 0.2, 0.5, 0.085, "sine", this.effectsGain, 980, 220);
  }

  playTrophyFanfare() {
    if (!this.enabled || !this.context) return;
    const now = this.context.currentTime + 0.03;
    const melody = [69, 73, 76, 81, 80, 81, 85];
    const offsets = [0, 0.16, 0.32, 0.52, 0.72, 0.9, 1.18];
    melody.forEach((midi, index) => {
      const duration = index === melody.length - 1 ? 1.35 : 0.42;
      const type = index < 4 ? "sawtooth" : "triangle";
      this.scheduleTone(
        this.midiToFrequency(midi),
        now + offsets[index],
        duration,
        index === melody.length - 1 ? 0.12 : 0.085,
        type,
        this.effectsGain,
        index < 4 ? 2300 : 3600
      );
    });

    [
      { time: 0, notes: [57, 61, 64, 69] },
      { time: 0.52, notes: [59, 62, 66, 71] },
      { time: 1.18, notes: [61, 64, 68, 73, 76] }
    ].forEach(({ time, notes }, chordIndex) => {
      notes.forEach((midi, noteIndex) => {
        this.scheduleTone(
          this.midiToFrequency(midi),
          now + time + noteIndex * 0.012,
          chordIndex === 2 ? 1.5 : 0.58,
          chordIndex === 2 ? 0.052 : 0.037,
          noteIndex % 2 ? "triangle" : "sine",
          this.effectsGain,
          3000
        );
      });
    });

    this.scheduleCymbal(now + 0.5, 0.055);
    this.scheduleCymbal(now + 1.18, 0.095);
  }

  scheduleCymbal(startTime, peakGain) {
    const source = this.context.createBufferSource();
    const highpass = this.context.createBiquadFilter();
    const gain = this.context.createGain();
    source.buffer = this.noiseBuffer;
    highpass.type = "highpass";
    highpass.frequency.value = 3100;
    gain.gain.setValueAtTime(peakGain, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.72);
    source.connect(highpass);
    highpass.connect(gain);
    gain.connect(this.effectsGain);
    source.start(startTime, Math.random() * 2);
    source.stop(startTime + 0.75);
  }

  clamp(value, minimum, maximum) {
    return Math.max(minimum, Math.min(maximum, value));
  }
}


const languageManager = new I18n(TRANSLATIONS);
const audioManager = new AudioManager();


function updateAudioButton() {
  const button = document.getElementById("audioToggleButton");
  if (!button) return;
  if (!audioManager.supported) {
    button.disabled = true;
    button.textContent = languageManager.t("soundUnavailable");
    button.setAttribute("aria-pressed", "false");
    return;
  }
  button.disabled = false;
  button.textContent = languageManager.t(audioManager.enabled ? "soundOn" : "soundOff");
  button.setAttribute("aria-pressed", String(audioManager.enabled));
}

function bindStandaloneControls(gameInstance) {
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => {
      languageManager.setLanguage(button.dataset.language);
      languageManager.applyStaticText();
      gameInstance.applyLanguage();
      updateAudioButton();
    });
  });

  const audioButton = document.getElementById("audioToggleButton");
  audioButton?.addEventListener("click", async () => {
    await audioManager.toggle();
    updateAudioButton();
  });
  updateAudioButton();
}

function showStandaloneError(error, version) {
  const panel = document.getElementById("errorPanel");
  const message = error instanceof Error ? `${error.message}\n\n${error.stack || ""}` : String(error);
  if (panel) {
    panel.hidden = false;
    panel.textContent = languageManager.t("fatalError", { version, message });
  }
  console.error(error);
}
