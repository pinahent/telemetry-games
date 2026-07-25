"use strict";

(function exposeCore(global) {
  const TRANSLATIONS = Object.freeze({
    en: Object.freeze({
      documentTitle: "Field Notes — Fish and Acoustic Tag Matching",
      mainTitle: "Field Notes",
      subtitle: "Choose the smallest acoustic transmitter that meets each animal's research mission and welfare constraints.",
      stampTraining: "TRAINING CAMP",
      languageLabel: "Language",
      soundOn: "♫ Music: on",
      soundOff: "♫ Music: off",
      soundUnavailable: "Music unavailable",
      footerCredit: "Educational telemetry game · by Pina",
      fatalError: "Game build {version} stopped because of a JavaScript error:\n\n{message}",
      matchingSection: "01 / TAG CHOICE",
      matchingHeading: "Match each fish with its best-fit tag",
      modeLabel: "Mode",
      difficultyLabel: "Difficulty",
      sortingMode: "Direct match",
      memoryMode: "Memory",
      difficultyEasy: "Easy",
      difficultyMedium: "Medium",
      difficultyHard: "Hard",
      scienceDisclaimer: "Educational simplification only. The 2% burden threshold is a conservative teaching rule, not a universal biological safety law. Real studies require species-specific evidence, permits, trained researchers and welfare review.",
      matchingStatusLabel: "Fish and tag matching status",
      hudLevel: "Level",
      hudScore: "Score",
      hudAttempts: "Attempts",
      hudMoves: "Turns",
      hudProgress: "Progress",
      hudStatus: "Status",
      stateReady: "Ready",
      stateComplete: "Complete",
      statePreview: "Preview",
      sortingInstructions: "Select or drag a fish, read its research mission, then choose the smallest tag that satisfies every constraint.",
      memoryInstructions: "Reveal two cards. A fish matches any tag card that is scientifically correct for that individual.",
      fishCardsTitle: "Fish cards",
      tagTargetsTitle: "Available tag options",
      memoryBoardLabel: "Fish and acoustic tag memory cards",
      buttonRestartRound: "Restart round",
      buttonNextDifficulty: "Next difficulty",
      buttonHint: "Show hint",
      buttonTutorial: "How to play",
      buttonScience: "About the science",
      buttonClose: "Close",
      matchingNotesSection: "02 / FIELD NOTES",
      matchingNotesHeading: "How the model decides",
      tagFitHeading: "Mass and anatomy",
      tagFitBody: "Internal tags must remain within the teaching burden threshold and the individual's simplified diameter and length limits.",
      tagTradeoffHeading: "Research requirements",
      tagTradeoffBody: "Battery duration, output class, sensors and attachment method can rule out an otherwise small transmitter.",
      tagEvidenceHeading: "Best-fit rule",
      tagEvidenceBody: "The correct answer is the smallest and lightest available transmitter that passes all checks—not the largest tag the fish could carry.",
      placeholderHeading: "Animal welfare",
      placeholderBody: "Some individuals should not be tagged with the available equipment. Sharks and rays in this game use an external option only where the simplified anatomy and study requirements permit it.",
      selectedFish: "Selected {name}. Compare the mission with the available tags.",
      chooseFishFirst: "Select a fish before choosing a tag.",
      correctPrefix: "Correct.",
      incorrectPrefix: "Not the best fit.",
      sortingComplete: "Round complete: {score} points, {firstAttempts} correct on the first attempt.",
      memoryReady: "Find every scientifically compatible fish–tag pair.",
      memoryPreview: "Study the board. The cards will turn face down shortly.",
      memoryNoMatch: "Those cards are not compatible under this board's scientific rules.",
      memoryMatch: "Pair found: {fish} and {tag}.",
      memoryComplete: "Memory complete in {moves} turns with {mismatches} mismatches.",
      hiddenCardLabel: "Hidden card",
      fishCardType: "Fish",
      tagCardType: "Tag",
      individualLabel: "Individual",
      lengthLabel: "Length",
      massLabel: "Body mass",
      lifeStageLabel: "Life stage",
      habitatLabel: "Habitat",
      missionLabel: "Research mission",
      batteryLabel: "Battery estimate",
      sensorsLabel: "Sensors",
      attachmentLabel: "Attachment",
      diameterLabel: "Diameter",
      tagLengthLabel: "Tag length",
      tagMassLabel: "Mass in air",
      modelLabel: "Reference model",
      outputLabel: "Output class",
      frequencyLabel: "Frequency",
      burdenLabel: "Tag burden",
      teachingLimitLabel: "Teaching limit",
      sourceLabel: "Sources",
      showSources: "Show sources",
      noSensors: "No sensor",
      sensorTemperature: "Temperature",
      sensorDepth: "Depth",
      attachmentInternal: "Internal",
      attachmentExternal: "External",
      outputLow: "Low",
      outputStandard: "Standard",
      outputHigh: "High",
      lifeJuvenile: "Juvenile",
      lifeSubadult: "Subadult",
      lifeAdult: "Adult",
      lengthTotal: "total length",
      lengthFork: "fork length",
      lengthStandard: "standard length",
      lengthDiscWidth: "disc width",
      days: "{count} days",
      khz: "{value} kHz",
      tooSmallName: "Too small to tag",
      tooSmallShort: "No available transmitter passes all welfare, anatomy and mission checks.",
      tooSmallCardLabel: "Choose no tag for this individual",
      reasonWrongAttachment: "The attachment type is incompatible with this tag.",
      reasonFishAttachmentUnsupported: "This individual does not support the mission's attachment method in the game model.",
      reasonTooHeavy: "The internal tag exceeds the configured 2% teaching burden threshold.",
      reasonExternalFishTooSmall: "This individual is too small for the available external case in this simplified model.",
      reasonTooWide: "The transmitter is wider than the individual's simplified anatomical limit.",
      reasonTooLong: "The transmitter is longer than the individual's simplified anatomical limit.",
      reasonBatteryShort: "The battery estimate is shorter than the mission requires.",
      reasonMissingTemperature: "The mission requires a temperature sensor.",
      reasonMissingDepth: "The mission requires a depth sensor.",
      reasonOutputLow: "The transmitter output class is below the mission requirement.",
      reasonLargerThanNeeded: "This tag passes the checks, but a smaller and lighter available tag also meets the mission.",
      reasonTagExists: "A suitable available tag exists, so “Too small to tag” is not correct.",
      burdenSentence: "{tagMass} g ÷ {fishMass} g × 100 = {burden}%.",
      externalBurdenSentence: "External attachment selected. The mass ratio is {burden}% for context, but the internal 2% teaching check is not used.",
      meetsMissionSentence: "It meets the {battery}-day battery requirement, {output} output requirement and required sensor/attachment checks.",
      tooSmallExplanation: "The smallest promising option still fails: {reason}",
      hintSelectFish: "Select a fish to reveal a hint.",
      hintMission: "Mission: {mission} Minimum battery: {battery} days. Attachment: {attachment}. Required sensors: {sensors}.",
      hintBurden: "For an internal tag, divide tag mass in air by fish mass and multiply by 100. The teaching limit is {limit}%.",
      summaryHeading: "Round review",
      summaryScore: "Score",
      summaryFirstAttempts: "Correct first attempts",
      summaryAccuracy: "Accuracy",
      summaryMismatches: "Mismatches",
      summaryBest: "Best turns for this board size",
      summaryReview: "Scientific match review",
      accuracyValue: "{value}%",
      notAvailable: "—",
      tutorialHeading: "How to play",
      tutorialStep1Title: "1. Read the individual",
      tutorialStep1Body: "Length is context, but the matching calculation uses body mass, anatomy, life stage and allowed attachment type.",
      tutorialStep2Title: "2. Read the mission",
      tutorialStep2Body: "A mission may require a minimum battery duration, a sensor, an output class and an internal or external attachment.",
      tutorialStep3Title: "3. Test the smallest tag first",
      tutorialStep3Body: "Reject tags that fail a check, then choose the smallest and lightest remaining option.",
      tutorialStep4Title: "4. Choose no tag when needed",
      tutorialStep4Body: "“Too small to tag” is correct when every available transmitter fails at least one relevant constraint.",
      scienceHeading: "About the science",
      scienceModelTitle: "Simplified decision model",
      scienceModelBody: "The game uses current 69 kHz transmitter specifications, exact model variants and a configurable 2% internal tag-burden teaching threshold. Passing the calculation does not establish real-world safety.",
      scienceBurdenTitle: "Burden calculation",
      scienceBurdenBody: "Internal tag burden = tag mass in air ÷ fish body mass × 100.",
      sourceAccessed: "Accessed {date}",
      testHeading: "Development validation",
      testPassed: "All {count} validation checks passed.",
      testFailed: "Validation found {count} issue(s)."
    }),
    de: Object.freeze({
      documentTitle: "Feldnotizen",
      mainTitle: "Feldnotizen",
      subtitle: "Finde den passenden Sender für jeden Fisch.",
      stampTraining: "TRAINING CAMP",
      languageLabel: "Sprache",
      soundOn: "♫ Musik: an",
      soundOff: "♫ Musik: aus",
      soundUnavailable: "Musik nicht verfügbar",
      footerCredit: "Lernspiel zur Telemetrie · von Pina",
      fatalError: "Spiel-Build {version} wurde wegen eines JavaScript-Fehlers angehalten:\n\n{message}",
      matchingSection: "01 / SENDERWAHL",
      matchingHeading: "Ordne jedem Fisch den besten Sender zu",
      modeLabel: "Modus",
      difficultyLabel: "Schwierigkeit",
      sortingMode: "Direkte Zuordnung",
      memoryMode: "Memory",
      difficultyEasy: "Einfach",
      difficultyMedium: "Mittel",
      difficultyHard: "Schwer",
      scienceDisclaimer: "Nur ein vereinfachtes Lernmodell. Die 2-%-Belastungsgrenze ist eine konservative Faustregel und kein universelles biologisches Gesetz. Reale Studien benötigen artspezifische Evidenz, Genehmigungen, geschultes Personal und Tierschutzprüfung.",
      matchingStatusLabel: "Status der Fisch-Sender-Zuordnung",
      hudLevel: "Level",
      hudScore: "Punkte",
      hudAttempts: "Versuche",
      hudMoves: "Züge",
      hudProgress: "Fortschritt",
      hudStatus: "Status",
      stateReady: "Bereit",
      stateComplete: "Abgeschlossen",
      statePreview: "Vorschau",
      sortingInstructions: "Wähle oder ziehe einen Fisch, lies den Forschungsauftrag und wähle dann den kleinsten Sender, der alle Bedingungen erfüllt.",
      memoryInstructions: "Decke zwei Karten auf. Ein Fisch passt zu jeder Senderkarte, die für dieses Individuum wissenschaftlich richtig ist.",
      fishCardsTitle: "Fischkarten",
      tagTargetsTitle: "Verfügbare Senderoptionen",
      memoryBoardLabel: "Memory-Karten mit Fischen und Akustiksendern",
      buttonRestartRound: "Runde neu starten",
      buttonNextDifficulty: "Nächste Schwierigkeit",
      buttonHint: "Hinweis zeigen",
      buttonTutorial: "Spielanleitung",
      buttonScience: "Über die Wissenschaft",
      buttonClose: "Schließen",
      matchingNotesSection: "02 / FELDNOTIZEN",
      matchingNotesHeading: "So entscheidet das Modell",
      tagFitHeading: "Masse und Anatomie",
      tagFitBody: "Interne Sender müssen unter der Belastungsgrenze bleiben und die vereinfachten Durchmesser- und Längengrenzen des Individuums einhalten.",
      tagTradeoffHeading: "Forschungsanforderungen",
      tagTradeoffBody: "Batteriedauer, Leistung, Sensoren und Besenderungsart können einen ansonsten kleinen Sender ausschließen.",
      tagEvidenceHeading: "Best-Fit-Regel",
      tagEvidenceBody: "Richtig ist der kleinste und leichteste verfügbare Sender, der alle Prüfungen besteht – nicht der größte Sender, den der Fisch tragen könnte.",
      placeholderHeading: "Tierschutz",
      placeholderBody: "Einige Individuen sollten mit den verfügbaren Sendern nicht markiert werden.",
      selectedFish: "{name} ausgewählt. Vergleiche den Auftrag mit den verfügbaren Sendern.",
      chooseFishFirst: "Wähle zuerst einen Fisch aus.",
      correctPrefix: "Richtig.",
      incorrectPrefix: "Nicht die beste Wahl.",
      sortingComplete: "Runde abgeschlossen: {score} Punkte, {firstAttempts} beim ersten Versuch richtig.",
      memoryReady: "Finde alle wissenschaftlich passenden Fisch-Sender-Paare.",
      memoryPreview: "Präge dir das Feld ein. Die Karten drehen sich gleich um.",
      memoryNoMatch: "Diese Karten sind nach den wissenschaftlichen Regeln dieses Spielfelds nicht kompatibel.",
      memoryMatch: "Paar gefunden: {fish} und {tag}.",
      memoryComplete: "Memory in {moves} Zügen mit {mismatches} Fehlpaaren abgeschlossen.",
      hiddenCardLabel: "Verdeckte Karte",
      fishCardType: "Fisch",
      tagCardType: "Sender",
      individualLabel: "Individuum",
      lengthLabel: "Länge",
      massLabel: "Körpermasse",
      lifeStageLabel: "Lebensstadium",
      habitatLabel: "Lebensraum",
      missionLabel: "Forschungsauftrag",
      batteryLabel: "Batterieschätzung",
      sensorsLabel: "Sensoren",
      attachmentLabel: "Befestigung",
      diameterLabel: "Durchmesser",
      tagLengthLabel: "Senderlänge",
      tagMassLabel: "Masse in Luft",
      modelLabel: "Referenzmodell",
      outputLabel: "Leistungsklasse",
      frequencyLabel: "Frequenz",
      burdenLabel: "Senderbelastung",
      teachingLimitLabel: "Lerngrenze",
      sourceLabel: "Quellen",
      showSources: "Quellen anzeigen",
      noSensors: "Kein Sensor",
      sensorTemperature: "Temperatur",
      sensorDepth: "Tiefe",
      attachmentInternal: "Intern",
      attachmentExternal: "Extern",
      outputLow: "Niedrig",
      outputStandard: "Standard",
      outputHigh: "Hoch",
      lifeJuvenile: "Jungtier",
      lifeSubadult: "Subadult",
      lifeAdult: "Erwachsen",
      lengthTotal: "Gesamtlänge",
      lengthFork: "Gabellänge",
      lengthStandard: "Standardlänge",
      lengthDiscWidth: "Scheibenbreite",
      days: "{count} Tage",
      khz: "{value} kHz",
      tooSmallName: "Zu klein zum Markieren",
      tooSmallShort: "Kein verfügbarer Sender erfüllt alle Tierschutz-, Anatomie- und Auftragsbedingungen.",
      tooSmallCardLabel: "Für dieses Individuum keinen Sender auswählen",
      reasonWrongAttachment: "Die Besenderungsart ist mit diesem Sender nicht kompatibel.",
      reasonFishAttachmentUnsupported: "Dieses Individuum unterstützt die Besenderungsart des Auftrags im Spielmodell nicht.",
      reasonTooHeavy: "Der interne Sender überschreitet die konfigurierte 2-%-Grenze.",
      reasonExternalFishTooSmall: "Dieses Individuum ist im vereinfachten Modell zu klein für das verfügbare externe Gehäuse.",
      reasonTooWide: "Der Sender ist breiter als die vereinfachte anatomische Grenze des Individuums.",
      reasonTooLong: "Der Sender ist länger als die vereinfachte anatomische Grenze des Individuums.",
      reasonBatteryShort: "Die geschätzte Batteriedauer ist kürzer als für den Auftrag erforderlich.",
      reasonMissingTemperature: "Der Auftrag benötigt einen Temperatursensor.",
      reasonMissingDepth: "Der Auftrag benötigt einen Tiefensensor.",
      reasonOutputLow: "Die Leistungsklasse des Senders liegt unter der Anforderung des Auftrags.",
      reasonLargerThanNeeded: "Dieser Sender besteht die Prüfungen, aber ein kleinerer und leichterer verfügbarer Sender erfüllt den Auftrag ebenfalls.",
      reasonTagExists: "Es gibt einen geeigneten verfügbaren Sender; daher ist „Zu klein zum Markieren“ nicht richtig.",
      burdenSentence: "{tagMass} g ÷ {fishMass} g × 100 = {burden}%.",
      externalBurdenSentence: "Externe Befestigung gewählt. Das Massenverhältnis beträgt zur Einordnung {burden}%; die interne 2-%-Lernprüfung wird hier nicht verwendet.",
      meetsMissionSentence: "Der Sender erfüllt die Batterievorgabe von {battery} Tagen, die Leistungsanforderung {output} sowie die Sensor- und Befestigungsprüfungen.",
      tooSmallExplanation: "Die kleinste aussichtsreiche Option scheitert weiterhin: {reason}",
      hintSelectFish: "Wähle einen Fisch aus, um einen Hinweis zu erhalten.",
      hintMission: "Auftrag: {mission} Mindestbatterie: {battery} Tage. Befestigung: {attachment}. Benötigte Sensoren: {sensors}.",
      hintBurden: "Bei einem internen Sender: Masse des Senders in Luft durch Fischmasse teilen und mit 100 multiplizieren. Die Lerngrenze beträgt {limit}%.",
      summaryHeading: "Rundenauswertung",
      summaryScore: "Punkte",
      summaryFirstAttempts: "Beim ersten Versuch richtig",
      summaryAccuracy: "Genauigkeit",
      summaryMismatches: "Fehlpaare",
      summaryBest: "Beste Zugzahl für diese Feldgröße",
      summaryReview: "Wissenschaftliche Zuordnung",
      accuracyValue: "{value}%",
      notAvailable: "—",
      tutorialHeading: "Spielanleitung",
      tutorialStep1Title: "1. Individuum lesen",
      tutorialStep1Body: "Die Länge liefert Kontext; die Zuordnung verwendet aber Körpermasse, Anatomie, Lebensstadium und erlaubte Befestigungsart.",
      tutorialStep2Title: "2. Auftrag lesen",
      tutorialStep2Body: "Ein Auftrag kann Mindestbatteriedauer, Sensor, Leistungsklasse und interne oder externe Befestigung verlangen.",
      tutorialStep3Title: "3. Kleinsten Sender zuerst prüfen",
      tutorialStep3Body: "Schließe Sender aus, die eine Prüfung nicht bestehen, und wähle dann die kleinste und leichteste verbleibende Option.",
      tutorialStep4Title: "4. Bei Bedarf keinen Sender wählen",
      tutorialStep4Body: "„Zu klein zum Markieren“ ist richtig, wenn jeder verfügbare Sender mindestens eine relevante Bedingung verletzt.",
      scienceHeading: "Über die Wissenschaft",
      scienceModelTitle: "Vereinfachtes Entscheidungsmodell",
      scienceModelBody: "Das Spiel verwendet aktuelle Spezifikationen von 69-kHz-Sendern, konkrete Modellvarianten und eine konfigurierbare 2-%-Grenze für interne Sender.",
      scienceBurdenTitle: "Belastungsrechnung",
      scienceBurdenBody: "Interne Senderbelastung = Sendermasse in Luft ÷ Fischkörpermasse × 100.",
      sourceAccessed: "Abgerufen am {date}",
      testHeading: "Entwicklungsvalidierung",
      testPassed: "Alle {count} Validierungsprüfungen bestanden.",
      testFailed: "Die Validierung fand {count} Problem(e)."
    })
  });

  class I18n {
    constructor(messages) {
      this.messages = messages;
      this.language = this.readInitialLanguage();
    }

    readInitialLanguage() {
      try {
        const saved = global.localStorage?.getItem("telemetryLanguage");
        if (saved && this.messages[saved]) return saved;
      } catch (error) {
        console.warn("Language preference could not be read.", error);
      }
      const browserLanguage = String(global.navigator?.language || "en").slice(0, 2).toLowerCase();
      return this.messages[browserLanguage] ? browserLanguage : "en";
    }

    setLanguage(language) {
      if (!this.messages[language]) return;
      this.language = language;
      try {
        global.localStorage?.setItem("telemetryLanguage", language);
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

    value(localizedValue) {
      if (localizedValue && typeof localizedValue === "object") {
        return localizedValue[this.language] ?? localizedValue.en ?? "";
      }
      return String(localizedValue ?? "");
    }

    number(value, fractionDigits = 1) {
      const locale = this.language === "de" ? "de-DE" : "en-GB";
      return new Intl.NumberFormat(locale, {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits
      }).format(value);
    }

    integer(value) {
      const locale = this.language === "de" ? "de-DE" : "en-GB";
      return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value);
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
      this.AudioContextClass = global.AudioContext || global.webkitAudioContext || null;
      this.context = null;
      this.effectsGain = null;
      this.music = document.getElementById("backgroundMusic") || null;
      this.supported = Boolean(this.music && typeof this.music.play === "function");
      this.enabled = false;
      this.targetVolume = 0.24;
      this.fadeFrame = null;

      if (this.music) {
        this.music.loop = true;
        this.music.preload = "metadata";
        this.music.volume = 0;
      }
    }

    ensureEffectsContext() {
      if (!this.AudioContextClass) return false;
      if (this.context) return true;
      this.context = new this.AudioContextClass();
      this.effectsGain = this.context.createGain();
      this.effectsGain.gain.value = 0.42;
      this.effectsGain.connect(this.context.destination);
      return true;
    }

    async toggle() {
      if (!this.supported) return false;
      if (this.enabled) {
        this.disable();
        return false;
      }

      try {
        if (this.ensureEffectsContext() && this.context.state === "suspended") {
          await this.context.resume();
        }
        await this.music.play();
        this.enabled = true;
        this.fadeMusic(this.targetVolume, 420);
        this.playTone(330, 0.08, 0.05, "sine");
        this.playTone(495, 0.1, 0.045, "sine", 0.08);
        return true;
      } catch (error) {
        this.enabled = false;
        console.warn("Background music could not be started.", error);
        return false;
      }
    }

    disable() {
      if (!this.music) return;
      this.enabled = false;
      this.fadeMusic(0, 220, () => this.music.pause());
    }

    fadeMusic(target, duration, onComplete) {
      if (!this.music) return;
      if (this.fadeFrame) global.cancelAnimationFrame(this.fadeFrame);
      const startVolume = this.music.volume;
      const startedAt = global.performance?.now?.() ?? Date.now();
      const tick = (timestamp) => {
        const now = Number.isFinite(timestamp) ? timestamp : Date.now();
        const progress = Math.min(1, (now - startedAt) / duration);
        this.music.volume = Math.max(0, Math.min(1, startVolume + (target - startVolume) * progress));
        if (progress < 1) this.fadeFrame = global.requestAnimationFrame(tick);
        else {
          this.fadeFrame = null;
          onComplete?.();
        }
      };
      this.fadeFrame = global.requestAnimationFrame(tick);
    }

    playTone(frequency, duration, gainValue, type = "sine", delay = 0) {
      if (!this.enabled || !this.ensureEffectsContext()) return;
      const start = this.context.currentTime + delay;
      const oscillator = this.context.createOscillator();
      const gain = this.context.createGain();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      oscillator.connect(gain);
      gain.connect(this.effectsGain);
      oscillator.start(start);
      oscillator.stop(start + duration + 0.03);
    }

    playSuccess() {
      [523.25, 659.25, 783.99].forEach((frequency, index) => this.playTone(frequency, 0.35, 0.11, "sine", index * 0.11));
    }

    playFailure() {
      this.playTone(392, 0.32, 0.09, "triangle");
      this.playTone(293.66, 0.45, 0.075, "triangle", 0.17);
    }

    playSelect() {
      this.playTone(440, 0.08, 0.04, "sine");
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

  global.TelemetryCore = Object.freeze({
    TRANSLATIONS,
    I18n,
    AudioManager,
    languageManager,
    audioManager,
    updateAudioButton,
    bindStandaloneControls,
    showStandaloneError
  });
})(globalThis);
