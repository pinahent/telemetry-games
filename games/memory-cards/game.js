"use strict";

(function startGameModule(global) {
  const {
    SCIENCE_SOURCES,
    TAG_CATALOGUE,
    STUDY_REQUIREMENTS,
    FISH_CARDS,
    DIFFICULTY_SETTINGS,
    VISUAL_REFERENCE_CHECKLIST,
    DEFAULT_MAX_TAG_BURDEN_PERCENT,
    TOO_SMALL_ID
  } = global.GameData;
  const {
    calculateTagBurdenPercent,
    evaluateTagForFish,
    getCorrectChoice,
    getStudyRequirement,
    createSeededRandom,
    generateFishSet,
    createMemoryCards,
    cardsFormScientificMatch,
    validateDataset,
    validateLevel
  } = global.TelemetryLogic;
  const { renderFishIllustration } = global.FishIllustrations;
  const {
    languageManager,
    audioManager,
    bindStandaloneControls,
    showStandaloneError
  } = global.TelemetryCore;

  class FishTagMatchingGame {
    constructor(i18n, audio) {
      this.i18n = i18n;
      this.audio = audio;
      this.active = false;
      this.mode = "sorting";
      this.difficulty = "easy";
      this.roundSeed = Date.now();
      this.random = createSeededRandom(this.roundSeed);
      this.config = DIFFICULTY_SETTINGS.easy;
      this.availableTags = [];
      this.fish = [];
      this.selectedFishId = null;
      this.solvedFishIds = new Set();
      this.wrongAttemptsByFish = new Map();
      this.incorrectFishId = null;
      this.attempts = 0;
      this.firstAttemptCorrect = 0;
      this.score = 0;
      this.state = "ready";
      this.feedbackText = "";
      this.feedbackTone = "";
      this.memoryCards = [];
      this.flippedCardIds = [];
      this.matchedCardIds = new Set();
      this.memoryLocked = false;
      this.memoryPreviewing = false;
      this.memoryTurns = 0;
      this.memoryMatches = 0;
      this.memoryMismatches = 0;
      this.memoryTimeout = null;
      this.previewTimeout = null;
      this.dom = {};
    }

    initialize() {
      this.cacheDom();
      this.bindControls();
      this.renderScienceContent();
      this.runDevelopmentValidation();
      this.startRound();
    }

    cacheDom() {
      const ids = [
        "matchingModeSelect", "matchingDifficultySelect", "sortingModePanel", "memoryModePanel",
        "fishCardGrid", "tagTargetGrid", "memoryCardGrid", "matchingLevelDisplay", "matchingScoreDisplay",
        "matchingAttemptsLabel", "matchingAttemptsDisplay", "matchingProgressDisplay", "matchingStateDisplay",
        "matchingRestartButton", "matchingNextButton", "matchingHintButton", "matchingFeedback", "errorPanel",
        "selectedMissionPanel", "completionSummary", "tutorialButton", "scienceButton", "tutorialDialog",
        "scienceDialog", "scienceSourceList", "visualChecklist", "validationStatus"
      ];
      for (const id of ids) this.dom[this.toCamel(id)] = document.getElementById(id);
    }

    toCamel(value) {
      return value.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    }

    bindControls() {
      this.dom.matchingModeSelect.addEventListener("change", () => this.startRound());
      this.dom.matchingDifficultySelect.addEventListener("change", () => this.startRound());
      this.dom.matchingRestartButton.addEventListener("click", () => this.startRound());
      this.dom.matchingNextButton.addEventListener("click", () => this.advanceDifficulty());
      this.dom.matchingHintButton.addEventListener("click", () => this.showHint());
      this.dom.tutorialButton.addEventListener("click", () => this.openDialog(this.dom.tutorialDialog));
      this.dom.scienceButton.addEventListener("click", () => this.openDialog(this.dom.scienceDialog));
      document.querySelectorAll("[data-close-dialog]").forEach((button) => {
        button.addEventListener("click", () => button.closest("dialog")?.close());
      });
      document.querySelectorAll("dialog").forEach((dialog) => {
        dialog.addEventListener("click", (event) => {
          if (event.target === dialog) dialog.close();
        });
      });
    }

    openDialog(dialog) {
      if (!dialog) return;
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    }

    activate() {
      this.active = true;
    }

    deactivate() {
      this.active = false;
      this.cleanupTimers();
    }

    applyLanguage() {
      this.renderScienceContent();
      if (this.mode === "sorting") {
        this.renderSorting();
        this.renderMission();
        if (this.state === "complete") {
          this.feedbackText = this.i18n.t("sortingComplete", {
            score: this.score,
            firstAttempts: this.firstAttemptCorrect
          });
        } else if (this.selectedFishId) {
          const fish = this.getFish(this.selectedFishId);
          this.feedbackText = this.i18n.t("selectedFish", { name: fish.individualName });
        } else {
          this.feedbackText = this.i18n.t("sortingInstructions");
        }
      } else {
        this.renderMemory();
        if (this.state === "complete") this.feedbackText = this.buildMemoryCompleteText();
        else if (this.memoryPreviewing) {
          this.feedbackText = this.i18n.t("memoryPreview");
        } else this.feedbackText = this.i18n.t("memoryReady");
      }
      this.renderFeedback();
      this.renderCompletionSummary();
      this.updateHud();
    }

    startRound() {
      this.cleanupTimers();
      this.mode = this.dom.matchingModeSelect.value;
      this.difficulty = this.dom.matchingDifficultySelect.value;
      this.config = DIFFICULTY_SETTINGS[this.difficulty];
      this.availableTags = this.config.tagIds.map((id) => TAG_CATALOGUE.find((tag) => tag.id === id)).filter(Boolean);
      this.roundSeed = Date.now() ^ Math.floor(Math.random() * 0xffffffff);
      this.random = createSeededRandom(this.roundSeed);
      this.fish = generateFishSet(this.config, this.mode, this.random);
      this.selectedFishId = null;
      this.solvedFishIds = new Set();
      this.wrongAttemptsByFish = new Map();
      this.incorrectFishId = null;
      this.attempts = 0;
      this.firstAttemptCorrect = 0;
      this.score = 0;
      this.state = "ready";
      this.memoryCards = [];
      this.flippedCardIds = [];
      this.matchedCardIds = new Set();
      this.memoryLocked = false;
      this.memoryPreviewing = false;
      this.memoryTurns = 0;
      this.memoryMatches = 0;
      this.memoryMismatches = 0;
      this.dom.sortingModePanel.hidden = this.mode !== "sorting";
      this.dom.memoryModePanel.hidden = this.mode !== "memory";
      this.dom.matchingHintButton.hidden = this.mode !== "sorting";
      this.dom.matchingNextButton.hidden = true;
      this.dom.completionSummary.hidden = true;

      const levelErrors = validateLevel(this.fish, this.availableTags);
      if (levelErrors.length) throw new Error(`Generated level failed validation: ${levelErrors.join(", ")}`);

      if (this.mode === "sorting") {
        this.feedbackText = this.i18n.t("sortingInstructions");
        this.feedbackTone = "";
        this.renderSorting();
        this.renderMission();
      } else {
        this.dom.selectedMissionPanel.hidden = true;
        this.dom.selectedMissionPanel.replaceChildren();
        this.memoryCards = createMemoryCards(this.fish, this.availableTags, this.random);
        this.feedbackText = this.i18n.t("memoryReady");
        this.feedbackTone = "";
        this.renderMemory();
        if (this.config.memoryPreviewSeconds > 0) this.startMemoryPreview(this.config.memoryPreviewSeconds);
      }
      this.renderFeedback();
      this.updateHud();
    }

    startMemoryPreview(seconds) {
      this.memoryPreviewing = true;
      this.memoryLocked = true;
      this.feedbackText = this.i18n.t("memoryPreview");
      this.feedbackTone = "hint";
      this.renderMemory();
      this.updateHud();
      this.previewTimeout = global.setTimeout(() => {
        this.memoryPreviewing = false;
        this.memoryLocked = false;
        this.previewTimeout = null;
        this.feedbackText = this.i18n.t("memoryReady");
        this.feedbackTone = "";
        this.renderMemory();
        this.renderFeedback();
        this.updateHud();
      }, seconds * 1000);
    }

    renderSorting() {
      this.dom.fishCardGrid.replaceChildren(...this.fish.map((fish) => this.createFishCard(fish)));
      const choices = [...this.availableTags.map((tag) => this.createTagTarget(tag)), this.createTooSmallTarget()];
      this.dom.tagTargetGrid.replaceChildren(...choices);
    }

    createFishCard(fish) {
      const article = document.createElement("article");
      article.className = "fish-card";
      article.dataset.fishId = fish.id;
      article.classList.toggle("is-selected", this.selectedFishId === fish.id);
      article.classList.toggle("is-matched", this.solvedFishIds.has(fish.id));
      article.classList.toggle("is-incorrect", this.incorrectFishId === fish.id);

      const selectButton = document.createElement("button");
      selectButton.type = "button";
      selectButton.className = "fish-select-button";
      selectButton.disabled = this.solvedFishIds.has(fish.id);
      selectButton.draggable = !selectButton.disabled;
      selectButton.setAttribute("aria-pressed", String(this.selectedFishId === fish.id));
      selectButton.setAttribute("aria-label", this.fishAriaLabel(fish));
      selectButton.innerHTML = `
        <span class="fish-illustration-wrap">
          ${renderFishIllustration(fish.visualKey)}
          <span class="sr-only">${this.escapeHtml(this.i18n.value(fish.illustrationAltText))}</span>
        </span>
        <span class="fish-copy">
          <span class="individual-name">${this.escapeHtml(fish.individualName)}</span>
          <strong class="common-name">${this.escapeHtml(this.i18n.value(fish.commonName))}</strong>
          <em class="scientific-name">${this.escapeHtml(fish.scientificName)}</em>
          <span class="measurement-row"><span>${this.escapeHtml(this.i18n.t("lengthLabel"))}</span><b>${this.formatLength(fish)}</b></span>
          <span class="measurement-row"><span>${this.escapeHtml(this.i18n.t("massLabel"))}</span><b>${this.formatMass(fish.weightGrams)}</b></span>
          <span class="measurement-row"><span>${this.escapeHtml(this.i18n.t("lifeStageLabel"))}</span><b>${this.escapeHtml(this.lifeStageLabel(fish.lifeStage))}</b></span>
          <span class="habitat-line">${this.escapeHtml(this.i18n.value(fish.habitatSummary))}</span>
        </span>`;
      selectButton.addEventListener("click", () => this.selectFish(fish.id));
      selectButton.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/fish-id", fish.id);
        event.dataTransfer.effectAllowed = "move";
        this.selectFish(fish.id, false);
      });

      const sources = document.createElement("details");
      sources.className = "card-sources";
      const summary = document.createElement("summary");
      summary.textContent = this.i18n.t("showSources");
      sources.append(summary, this.createSourceList(fish.sourceIds, true));

      article.append(selectButton, sources);
      return article;
    }

    fishAriaLabel(fish) {
      const mission = getStudyRequirement(fish);
      return `${fish.individualName}, ${this.i18n.value(fish.commonName)}, ${fish.scientificName}. ${this.i18n.t("massLabel")}: ${this.formatMass(fish.weightGrams)}. ${this.i18n.t("missionLabel")}: ${this.i18n.value(mission.title)}.`;
    }

    createTagTarget(tag) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "tag-target";
      button.dataset.tagId = tag.id;
      button.style.setProperty("--tag-width", `${tag.visualWidth}px`);
      const requirementAttachment = this.selectedFishId ? getStudyRequirement(this.getFish(this.selectedFishId)).attachmentType : "internal";
      const dimensions = global.TelemetryLogic.effectiveDimensions(tag, requirementAttachment);
      const matchedNames = this.fish
        .filter((fish) => this.solvedFishIds.has(fish.id) && getCorrectChoice(fish, this.availableTags).id === tag.id)
        .map((fish) => fish.individualName);
      button.setAttribute("aria-label", this.tagAriaLabel(tag));
      button.innerHTML = `
        <span class="tag-ruler" aria-hidden="true"><span class="tag-capsule"></span><span class="ruler-marks"></span></span>
        <span class="tag-copy">
          <span class="tag-model">${this.escapeHtml(tag.referenceModel)}</span>
          <strong>${this.escapeHtml(this.i18n.value(tag.educationalName))}</strong>
          <span class="tag-stat-grid">
            <span><small>${this.escapeHtml(this.i18n.t("diameterLabel"))}</small><b>${this.formatNumber(dimensions.diameterMm, 1)} mm</b></span>
            <span><small>${this.escapeHtml(this.i18n.t("tagLengthLabel"))}</small><b>${this.formatNumber(dimensions.lengthMm, 1)} mm</b></span>
            <span><small>${this.escapeHtml(this.i18n.t("tagMassLabel"))}</small><b>${this.formatNumber(tag.weightInAirGrams, 1)} g</b></span>
            <span><small>${this.escapeHtml(this.i18n.t("batteryLabel"))}</small><b>${this.i18n.integer(tag.batteryDays)} d</b></span>
          </span>
          <span class="tag-badges">${this.renderTagBadges(tag)}</span>
          ${matchedNames.length ? `<span class="matched-list">✓ ${this.escapeHtml(matchedNames.join(", "))}</span>` : ""}
        </span>`;
      button.addEventListener("click", () => this.assignSelectedFish(tag.id));
      button.addEventListener("dragover", (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        button.classList.add("is-drag-over");
      });
      button.addEventListener("dragleave", () => button.classList.remove("is-drag-over"));
      button.addEventListener("drop", (event) => {
        event.preventDefault();
        button.classList.remove("is-drag-over");
        const fishId = event.dataTransfer.getData("text/fish-id");
        if (fishId) this.assignFish(fishId, tag.id);
      });
      return button;
    }

    createTooSmallTarget() {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "tag-target too-small-target";
      button.dataset.tagId = TOO_SMALL_ID;
      button.setAttribute("aria-label", this.i18n.t("tooSmallCardLabel"));
      const matchedNames = this.fish
        .filter((fish) => this.solvedFishIds.has(fish.id) && getCorrectChoice(fish, this.availableTags).id === TOO_SMALL_ID)
        .map((fish) => fish.individualName);
      button.innerHTML = `
        <span class="no-tag-symbol" aria-hidden="true">Ø</span>
        <span class="tag-copy">
          <span class="tag-model">WELFARE DECISION</span>
          <strong>${this.escapeHtml(this.i18n.t("tooSmallName"))}</strong>
          <span class="tag-explanation">${this.escapeHtml(this.i18n.t("tooSmallShort"))}</span>
          ${matchedNames.length ? `<span class="matched-list">✓ ${this.escapeHtml(matchedNames.join(", "))}</span>` : ""}
        </span>`;
      button.addEventListener("click", () => this.assignSelectedFish(TOO_SMALL_ID));
      button.addEventListener("dragover", (event) => {
        event.preventDefault();
        button.classList.add("is-drag-over");
      });
      button.addEventListener("dragleave", () => button.classList.remove("is-drag-over"));
      button.addEventListener("drop", (event) => {
        event.preventDefault();
        button.classList.remove("is-drag-over");
        const fishId = event.dataTransfer.getData("text/fish-id");
        if (fishId) this.assignFish(fishId, TOO_SMALL_ID);
      });
      return button;
    }

    tagAriaLabel(tag) {
      return `${this.i18n.value(tag.educationalName)}, ${tag.referenceModel}. ${this.i18n.t("tagMassLabel")}: ${this.formatNumber(tag.weightInAirGrams, 1)} g. ${this.i18n.t("batteryLabel")}: ${this.i18n.integer(tag.batteryDays)} ${this.i18n.t("days", { count: "" }).trim()}.`;
    }

    renderTagBadges(tag) {
      const sensors = tag.sensors.length ? tag.sensors.map((sensor) => this.sensorLabel(sensor)) : [this.i18n.t("noSensors")];
      const attachments = tag.attachmentTypes.map((attachment) => this.attachmentLabel(attachment));
      return [
        `<span class="tag-badge">${this.escapeHtml(attachments.join(" / "))}</span>`,
        `<span class="tag-badge">${this.escapeHtml(sensors.join(" + "))}</span>`,
        `<span class="tag-badge">${this.escapeHtml(this.outputLabel(tag.outputClass))}</span>`
      ].join("");
    }

    selectFish(fishId, rerender = true) {
      if (this.solvedFishIds.has(fishId)) return;
      this.selectedFishId = fishId;
      this.incorrectFishId = null;
      const fish = this.getFish(fishId);
      this.audio.playSelect();
      this.setFeedback(this.i18n.t("selectedFish", { name: fish.individualName }), "");
      this.renderMission();
      if (rerender) {
        this.renderSorting();
        global.requestAnimationFrame(() => {
          this.dom.fishCardGrid.querySelector(`[data-fish-id="${fishId}"] .fish-select-button`)?.focus();
        });
      }
    }

    assignSelectedFish(choiceId) {
      if (!this.selectedFishId) {
        this.setFeedback(this.i18n.t("chooseFishFirst"), "error");
        return;
      }
      this.assignFish(this.selectedFishId, choiceId);
    }

    assignFish(fishId, choiceId) {
      const fish = this.getFish(fishId);
      if (!fish || this.solvedFishIds.has(fishId)) return;
      const correct = getCorrectChoice(fish, this.availableTags);
      const wrongBefore = this.wrongAttemptsByFish.get(fishId) || 0;
      this.attempts += 1;

      if (correct.id === choiceId) {
        if (wrongBefore === 0) this.firstAttemptCorrect += 1;
        this.score += Math.max(40, 100 - wrongBefore * 20);
        this.solvedFishIds.add(fishId);
        this.selectedFishId = null;
        this.incorrectFishId = null;
        this.audio.playSuccess();
        this.setFeedback(this.buildCorrectFeedback(fish, correct), "success");
        if (this.solvedFishIds.size === this.fish.length) this.completeSortingRound();
      } else {
        this.wrongAttemptsByFish.set(fishId, wrongBefore + 1);
        this.incorrectFishId = fishId;
        this.selectedFishId = fishId;
        this.audio.playFailure();
        this.setFeedback(this.buildIncorrectFeedback(fish, choiceId, correct), "error");
      }
      this.renderSorting();
      this.renderMission();
      this.updateHud();
    }

    buildCorrectFeedback(fish, correct) {
      if (correct.id === TOO_SMALL_ID) {
        const candidate = this.bestRejectedCandidate(correct.candidates);
        const reason = candidate ? this.reasonText(candidate.evaluation.reasons[0]) : this.i18n.t("tooSmallShort");
        return `${this.i18n.t("correctPrefix")} ${fish.individualName}: ${this.i18n.t("tooSmallExplanation", { reason })}`;
      }
      const requirement = getStudyRequirement(fish);
      const evaluation = correct.evaluation;
      const burden = this.formatNumber(evaluation.burdenPercent, 2);
      const burdenText = requirement.attachmentType === "internal"
        ? this.i18n.t("burdenSentence", {
            tagMass: this.formatNumber(correct.tag.weightInAirGrams, 1),
            fishMass: this.formatNumber(fish.weightGrams, 0),
            burden
          })
        : this.i18n.t("externalBurdenSentence", { burden });
      const missionText = this.i18n.t("meetsMissionSentence", {
        battery: this.i18n.integer(requirement.minimumBatteryDays),
        output: this.outputLabel(requirement.outputClass)
      });
      return `${this.i18n.t("correctPrefix")} ${fish.individualName} → ${this.i18n.value(correct.tag.educationalName)} (${correct.tag.referenceModel}). ${burdenText} ${missionText}`;
    }

    bestRejectedCandidate(candidates) {
      return [...candidates].sort((a, b) =>
        a.evaluation.reasons.length - b.evaluation.reasons.length ||
        a.tag.weightInAirGrams - b.tag.weightInAirGrams
      )[0] || null;
    }

    buildIncorrectFeedback(fish, choiceId, correct) {
      let reason;
      if (choiceId === TOO_SMALL_ID) {
        reason = this.i18n.t("reasonTagExists");
      } else {
        const chosenTag = this.availableTags.find((tag) => tag.id === choiceId);
        const requirement = getStudyRequirement(fish);
        const evaluation = evaluateTagForFish(fish, chosenTag, requirement);
        reason = evaluation.valid ? this.i18n.t("reasonLargerThanNeeded") : this.reasonText(evaluation.reasons[0]);
      }
      return `${this.i18n.t("incorrectPrefix")} ${fish.individualName}: ${reason}`;
    }

    completeSortingRound() {
      this.state = "complete";
      this.dom.matchingNextButton.hidden = this.difficulty === "hard";
      this.feedbackText = this.i18n.t("sortingComplete", {
        score: this.score,
        firstAttempts: this.firstAttemptCorrect
      });
      this.feedbackTone = "success";
      this.renderFeedback();
      this.renderCompletionSummary();
    }

    showHint() {
      const fish = this.getFish(this.selectedFishId);
      if (!fish) {
        this.setFeedback(this.i18n.t("hintSelectFish"), "hint");
        return;
      }
      const requirement = getStudyRequirement(fish);
      const sensors = requirement.requiredSensors.length
        ? requirement.requiredSensors.map((sensor) => this.sensorLabel(sensor)).join(" + ")
        : this.i18n.t("noSensors");
      const mission = this.i18n.t("hintMission", {
        mission: this.i18n.value(requirement.title),
        battery: this.i18n.integer(requirement.minimumBatteryDays),
        attachment: this.attachmentLabel(requirement.attachmentType),
        sensors
      });
      const burden = requirement.attachmentType === "internal"
        ? ` ${this.i18n.t("hintBurden", { limit: this.formatNumber(fish.maxTagBurdenPercent, 0) })}`
        : "";
      this.setFeedback(`${mission}${burden}`, "hint");
    }

    renderMission() {
      const panel = this.dom.selectedMissionPanel;
      const fish = this.getFish(this.selectedFishId);
      if (!fish) {
        panel.hidden = true;
        panel.replaceChildren();
        return;
      }
      const requirement = getStudyRequirement(fish);
      const showDetails = this.config.showStudyRequirementHints;
      const sensors = requirement.requiredSensors.length
        ? requirement.requiredSensors.map((sensor) => this.sensorLabel(sensor)).join(" + ")
        : this.i18n.t("noSensors");
      panel.hidden = false;
      panel.innerHTML = `
        <div class="mission-heading">
          <span class="section-number">${this.escapeHtml(this.i18n.t("missionLabel"))}</span>
          <h3>${this.escapeHtml(fish.individualName)} · ${this.escapeHtml(this.i18n.value(requirement.title))}</h3>
        </div>
        <p>${this.escapeHtml(this.i18n.value(requirement.summary))}</p>
        ${showDetails ? `<div class="mission-chips">
          <span>${this.escapeHtml(this.i18n.t("batteryLabel"))}: ≥ ${this.i18n.integer(requirement.minimumBatteryDays)} d</span>
          <span>${this.escapeHtml(this.i18n.t("attachmentLabel"))}: ${this.escapeHtml(this.attachmentLabel(requirement.attachmentType))}</span>
          <span>${this.escapeHtml(this.i18n.t("sensorsLabel"))}: ${this.escapeHtml(sensors)}</span>
          <span>${this.escapeHtml(this.i18n.t("outputLabel"))}: ${this.escapeHtml(this.outputLabel(requirement.outputClass))}</span>
        </div>` : ""}`;
    }

    renderMemory() {
      this.dom.memoryCardGrid.replaceChildren(...this.memoryCards.map((card) => this.createMemoryCard(card)));
    }

    createMemoryCard(card) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "memory-card";
      button.dataset.cardId = card.id;
      const flipped = this.memoryPreviewing || this.flippedCardIds.includes(card.id);
      const matched = this.matchedCardIds.has(card.id);
      button.classList.toggle("is-flipped", flipped);
      button.classList.toggle("is-matched", matched);
      button.disabled = matched || this.memoryLocked || this.memoryPreviewing;
      button.setAttribute("role", "gridcell");
      button.setAttribute("aria-pressed", String(flipped || matched));

      const front = card.type === "fish" ? this.memoryFishFront(card) : this.memoryTagFront(card);
      const accessible = flipped || matched ? front.aria : this.i18n.t("hiddenCardLabel");
      button.setAttribute("aria-label", accessible);
      button.innerHTML = `
        <span class="memory-card-inner">
          <span class="memory-face memory-card-back" aria-hidden="true"><span>?</span><small>69 kHz</small></span>
          <span class="memory-face memory-card-front">${front.html}</span>
        </span>`;
      button.addEventListener("click", () => this.flipMemoryCard(card.id));
      return button;
    }

    memoryFishFront(card) {
      const fish = this.getFish(card.fishId);
      return {
        aria: `${this.i18n.t("fishCardType")}: ${fish.individualName}, ${this.i18n.value(fish.commonName)}, ${this.formatMass(fish.weightGrams)}.`,
        html: `
          <span class="memory-type">${this.escapeHtml(this.i18n.t("fishCardType"))}</span>
          <span class="memory-illustration">${renderFishIllustration(fish.visualKey)}</span>
          <strong>${this.escapeHtml(fish.individualName)}</strong>
          <em>${this.escapeHtml(this.i18n.value(fish.commonName))}</em>
          <span class="memory-detail">${this.escapeHtml(this.formatMass(fish.weightGrams))}</span>`
      };
    }

    memoryTagFront(card) {
      if (card.choiceId === TOO_SMALL_ID) {
        return {
          aria: `${this.i18n.t("tagCardType")}: ${this.i18n.t("tooSmallName")}.`,
          html: `
            <span class="memory-type">${this.escapeHtml(this.i18n.t("tagCardType"))}</span>
            <span class="memory-no-tag" aria-hidden="true">Ø</span>
            <strong>${this.escapeHtml(this.i18n.t("tooSmallName"))}</strong>
            <span class="memory-detail">${this.escapeHtml(this.i18n.t("tooSmallShort"))}</span>`
        };
      }
      const tag = this.availableTags.find((item) => item.id === card.choiceId);
      return {
        aria: `${this.i18n.t("tagCardType")}: ${this.i18n.value(tag.educationalName)}, ${tag.referenceModel}, ${this.formatNumber(tag.weightInAirGrams, 1)} g.`,
        html: `
          <span class="memory-type">${this.escapeHtml(this.i18n.t("tagCardType"))}</span>
          <span class="memory-tag-visual" style="--tag-width:${tag.visualWidth}px" aria-hidden="true"></span>
          <strong>${this.escapeHtml(tag.referenceModel)}</strong>
          <span class="memory-detail">${this.formatNumber(tag.weightInAirGrams, 1)} g · ${this.i18n.integer(tag.batteryDays)} d</span>`
      };
    }

    flipMemoryCard(cardId) {
      if (this.memoryLocked || this.memoryPreviewing || this.matchedCardIds.has(cardId) || this.flippedCardIds.includes(cardId)) return;
      this.flippedCardIds.push(cardId);
      this.audio.playSelect();
      this.renderMemory();
      if (this.flippedCardIds.length < 2) return;
      this.memoryTurns += 1;
      this.attempts = this.memoryTurns;
      this.memoryLocked = true;
      this.memoryTimeout = global.setTimeout(() => this.resolveMemoryPair(), 650);
      this.updateHud();
    }

    resolveMemoryPair() {
      const [firstId, secondId] = this.flippedCardIds;
      const first = this.memoryCards.find((card) => card.id === firstId);
      const second = this.memoryCards.find((card) => card.id === secondId);
      const isMatch = cardsFormScientificMatch(first, second, this.fish, this.availableTags);

      if (isMatch) {
        const fishCard = first.type === "fish" ? first : second;
        const fish = this.getFish(fishCard.fishId);
        const choice = getCorrectChoice(fish, this.availableTags);
        this.matchedCardIds.add(firstId);
        this.matchedCardIds.add(secondId);
        this.memoryMatches += 1;
        this.score += 100;
        this.audio.playSuccess();
        this.setFeedback(this.i18n.t("memoryMatch", {
          fish: fish.individualName,
          tag: this.choiceLabel(choice.id)
        }), "success");
      } else {
        this.memoryMismatches += 1;
        this.audio.playFailure();
        this.setFeedback(this.i18n.t("memoryNoMatch"), "error");
      }

      this.flippedCardIds = [];
      this.memoryLocked = false;
      this.memoryTimeout = null;

      if (this.memoryMatches === this.fish.length) this.completeMemoryRound();
      this.renderMemory();
      this.updateHud();
    }

    completeMemoryRound() {
      this.state = "complete";
      this.saveBestMoves();
      this.dom.matchingNextButton.hidden = this.difficulty === "hard";
      this.feedbackText = this.buildMemoryCompleteText();
      this.feedbackTone = "success";
      this.renderFeedback();
      this.renderCompletionSummary();
    }

    buildMemoryCompleteText() {
      return this.i18n.t("memoryComplete", {
        moves: this.memoryTurns,
        mismatches: this.memoryMismatches
      });
    }


    cleanupTimers() {
      if (this.memoryTimeout) global.clearTimeout(this.memoryTimeout);
      if (this.previewTimeout) global.clearTimeout(this.previewTimeout);
      this.memoryTimeout = null;
      this.previewTimeout = null;
    }

    advanceDifficulty() {
      const order = ["easy", "medium", "hard"];
      const index = order.indexOf(this.difficulty);
      if (index < order.length - 1) {
        this.dom.matchingDifficultySelect.value = order[index + 1];
        this.startRound();
      }
    }

    updateHud() {
      const order = ["easy", "medium", "hard"];
      this.dom.matchingLevelDisplay.textContent = `${order.indexOf(this.difficulty) + 1} / ${order.length}`;
      this.dom.matchingScoreDisplay.textContent = String(this.score);
      this.dom.matchingAttemptsLabel.textContent = this.i18n.t(this.mode === "memory" ? "hudMoves" : "hudAttempts");
      if (this.mode === "memory") {
        this.dom.matchingAttemptsDisplay.textContent = String(this.memoryTurns);
        this.dom.matchingProgressDisplay.textContent = `${this.memoryMatches} / ${this.fish.length}`;
      } else {
        this.dom.matchingAttemptsDisplay.textContent = String(this.attempts);
        this.dom.matchingProgressDisplay.textContent = `${this.solvedFishIds.size} / ${this.fish.length}`;
      }
      const stateKey = this.state === "complete" ? "stateComplete" : this.memoryPreviewing ? "statePreview" : "stateReady";
      this.dom.matchingStateDisplay.textContent = this.i18n.t(stateKey);
    }

    setFeedback(text, tone = "") {
      this.feedbackText = text;
      this.feedbackTone = tone;
      this.renderFeedback();
    }

    renderFeedback() {
      this.dom.matchingFeedback.textContent = this.feedbackText;
      this.dom.matchingFeedback.classList.toggle("is-success", this.feedbackTone === "success");
      this.dom.matchingFeedback.classList.toggle("is-error", this.feedbackTone === "error");
      this.dom.matchingFeedback.classList.toggle("is-hint", this.feedbackTone === "hint");
    }

    renderCompletionSummary() {
      if (this.state !== "complete") {
        this.dom.completionSummary.hidden = true;
        return;
      }
      this.dom.completionSummary.hidden = false;
      const accuracy = this.mode === "sorting"
        ? (this.fish.length / Math.max(1, this.attempts)) * 100
        : (this.memoryMatches / Math.max(1, this.memoryMatches + this.memoryMismatches)) * 100;
      const bestMoves = this.mode === "memory" ? this.readBestMoves() : null;
      const statistics = this.mode === "sorting"
        ? `
          <div><span>${this.escapeHtml(this.i18n.t("summaryScore"))}</span><strong>${this.score}</strong></div>
          <div><span>${this.escapeHtml(this.i18n.t("summaryFirstAttempts"))}</span><strong>${this.firstAttemptCorrect} / ${this.fish.length}</strong></div>
          <div><span>${this.escapeHtml(this.i18n.t("summaryAccuracy"))}</span><strong>${this.i18n.t("accuracyValue", { value: this.formatNumber(accuracy, 0) })}</strong></div>`
        : `
          <div><span>${this.escapeHtml(this.i18n.t("summaryScore"))}</span><strong>${this.score}</strong></div>
          <div><span>${this.escapeHtml(this.i18n.t("summaryMismatches"))}</span><strong>${this.memoryMismatches}</strong></div>
          <div><span>${this.escapeHtml(this.i18n.t("summaryAccuracy"))}</span><strong>${this.i18n.t("accuracyValue", { value: this.formatNumber(accuracy, 0) })}</strong></div>
          <div><span>${this.escapeHtml(this.i18n.t("summaryBest"))}</span><strong>${bestMoves ?? this.i18n.t("notAvailable")}</strong></div>`;
      const review = this.fish.map((fish) => this.reviewRow(fish)).join("");
      this.dom.completionSummary.innerHTML = `
        <h3>${this.escapeHtml(this.i18n.t("summaryHeading"))}</h3>
        <div class="summary-stats">${statistics}</div>
        <h4>${this.escapeHtml(this.i18n.t("summaryReview"))}</h4>
        <div class="review-grid">${review}</div>`;
    }

    reviewRow(fish) {
      const choice = getCorrectChoice(fish, this.availableTags);
      let calculation;
      if (choice.id === TOO_SMALL_ID) {
        const candidate = this.bestRejectedCandidate(choice.candidates);
        calculation = candidate
          ? this.reasonText(candidate.evaluation.reasons[0])
          : this.i18n.t("tooSmallShort");
      } else {
        const requirement = getStudyRequirement(fish);
        const burden = calculateTagBurdenPercent(fish, choice.tag);
        calculation = requirement.attachmentType === "internal"
          ? `${this.formatNumber(burden, 2)}% ≤ ${this.formatNumber(fish.maxTagBurdenPercent, 0)}%`
          : `${this.attachmentLabel("external")} · ${this.formatNumber(burden, 2)}%`;
      }
      return `
        <article class="review-row">
          <div>${renderFishIllustration(fish.visualKey)}</div>
          <p><strong>${this.escapeHtml(fish.individualName)}</strong><em>${this.escapeHtml(this.i18n.value(fish.commonName))}</em></p>
          <p><strong>${this.escapeHtml(this.choiceLabel(choice.id))}</strong><span>${this.escapeHtml(calculation)}</span></p>
        </article>`;
    }

    saveBestMoves() {
      if (this.mode !== "memory") return;
      const key = `telemetryBestMoves-${this.fish.length}`;
      try {
        const previous = Number(global.localStorage?.getItem(key));
        if (!Number.isFinite(previous) || previous <= 0 || this.memoryTurns < previous) {
          global.localStorage?.setItem(key, String(this.memoryTurns));
        }
      } catch (error) {
        console.warn("Best score could not be saved.", error);
      }
    }

    readBestMoves() {
      try {
        const value = Number(global.localStorage?.getItem(`telemetryBestMoves-${this.fish.length}`));
        return Number.isFinite(value) && value > 0 ? value : null;
      } catch (error) {
        return null;
      }
    }

    runDevelopmentValidation() {
      const issues = validateDataset(FISH_CARDS, TAG_CATALOGUE);
      for (const [difficulty, config] of Object.entries(DIFFICULTY_SETTINGS)) {
        const tags = config.tagIds.map((id) => TAG_CATALOGUE.find((tag) => tag.id === id)).filter(Boolean);
        const random = createSeededRandom(100 + difficulty.length);
        for (const mode of ["sorting", "memory"]) {
          const fish = generateFishSet(config, mode, random);
          for (const issue of validateLevel(fish, tags)) issues.push(`${difficulty}-${mode}:${issue}`);
        }
      }
      const totalChecks = FISH_CARDS.length + Object.keys(DIFFICULTY_SETTINGS).length * 2;
      this.dom.validationStatus.classList.toggle("is-error", issues.length > 0);
      this.dom.validationStatus.textContent = issues.length
        ? `${this.i18n.t("testFailed", { count: issues.length })} ${issues.join(" · ")}`
        : this.i18n.t("testPassed", { count: totalChecks });
      if (issues.length) console.error("Development validation issues", issues);
    }

    renderScienceContent() {
      if (!this.dom.scienceSourceList || !this.dom.visualChecklist) return;
      const sourceIds = [
        "innovasea69", "innovaseaTags", "jepsen2005", "externalAttachment2022",
        "herring", "sprat", "mackerel", "cod", "haddock", "plaice", "salmon", "eel", "seabass",
        "dogfish", "catshark", "tope", "thornback", "spottedRay", "pollack"
      ];
      this.dom.scienceSourceList.replaceChildren(this.createSourceList(sourceIds, false));
      this.dom.visualChecklist.innerHTML = VISUAL_REFERENCE_CHECKLIST.map((item) => `
        <li><strong>${this.escapeHtml(item.species)}</strong><span>${this.escapeHtml(item.traits)}</span></li>`).join("");
      this.runDevelopmentValidation();
    }

    createSourceList(sourceIds, compact) {
      const list = document.createElement("ul");
      list.className = compact ? "source-list compact-source-list" : "source-list";
      for (const sourceId of sourceIds) {
        const source = SCIENCE_SOURCES[sourceId];
        if (!source) continue;
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = source.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = source.title;
        const meta = document.createElement("span");
        meta.textContent = `${source.organization} · ${this.i18n.t("sourceAccessed", { date: source.accessedDate })}`;
        item.append(link, meta);
        list.append(item);
      }
      return list;
    }

    getFish(id) {
      return this.fish.find((fish) => fish.id === id) || FISH_CARDS.find((fish) => fish.id === id) || null;
    }

    choiceLabel(choiceId) {
      if (choiceId === TOO_SMALL_ID) return this.i18n.t("tooSmallName");
      const tag = this.availableTags.find((item) => item.id === choiceId) || TAG_CATALOGUE.find((item) => item.id === choiceId);
      return tag ? `${this.i18n.value(tag.educationalName)} (${tag.referenceModel})` : choiceId;
    }

    reasonText(reason) {
      const map = {
        "wrong-attachment": "reasonWrongAttachment",
        "fish-attachment-unsupported": "reasonFishAttachmentUnsupported",
        "too-heavy": "reasonTooHeavy",
        "external-fish-too-small": "reasonExternalFishTooSmall",
        "too-wide": "reasonTooWide",
        "too-long": "reasonTooLong",
        "battery-short": "reasonBatteryShort",
        "missing-temperature": "reasonMissingTemperature",
        "missing-depth": "reasonMissingDepth",
        "output-low": "reasonOutputLow"
      };
      return this.i18n.t(map[reason] || reason);
    }

    attachmentLabel(value) {
      return this.i18n.t(value === "external" ? "attachmentExternal" : "attachmentInternal");
    }

    outputLabel(value) {
      const map = { low: "outputLow", standard: "outputStandard", high: "outputHigh" };
      return this.i18n.t(map[value] || value);
    }

    sensorLabel(value) {
      const map = { temperature: "sensorTemperature", depth: "sensorDepth" };
      return this.i18n.t(map[value] || value);
    }

    lifeStageLabel(value) {
      const map = { juvenile: "lifeJuvenile", subadult: "lifeSubadult", adult: "lifeAdult" };
      return this.i18n.t(map[value] || value);
    }

    lengthTypeLabel(value) {
      const map = { total: "lengthTotal", fork: "lengthFork", standard: "lengthStandard", "disc-width": "lengthDiscWidth" };
      return this.i18n.t(map[value] || value);
    }

    formatLength(fish) {
      return `${this.formatNumber(fish.lengthCm, 1)} cm ${this.lengthTypeLabel(fish.lengthType)}`;
    }

    formatMass(grams) {
      if (grams >= 1000) return `${this.formatNumber(grams / 1000, grams % 1000 === 0 ? 0 : 1)} kg`;
      return `${this.formatNumber(grams, 0)} g`;
    }

    formatNumber(value, digits = 1) {
      return this.i18n.number(value, digits);
    }

    escapeHtml(value) {
      return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }
  }

  const BUILD_VERSION = "3.0.0-comic-audio";
  let matchingGame = null;

  global.addEventListener("error", (event) => showStandaloneError(event.error || event.message, BUILD_VERSION));
  global.addEventListener("unhandledrejection", (event) => showStandaloneError(event.reason, BUILD_VERSION));

  document.addEventListener("DOMContentLoaded", () => {
    try {
      languageManager.applyStaticText();
      matchingGame = new FishTagMatchingGame(languageManager, audioManager);
      matchingGame.initialize();
      matchingGame.activate();
      bindStandaloneControls(matchingGame);
      matchingGame.applyLanguage();
      global.matchingGame = matchingGame;
    } catch (error) {
      showStandaloneError(error, BUILD_VERSION);
    }
  });

  global.addEventListener("beforeunload", () => matchingGame?.deactivate());
})(globalThis);
