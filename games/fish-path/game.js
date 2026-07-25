"use strict";

class FishMovementGame {
  constructor(i18n, audio) {
    this.i18n = i18n;
    this.audio = audio;
    this.active = false;
    this.difficulty = "easy";
    this.levelIndexByDifficulty = { easy: 0, medium: 0, hard: 0 };
    this.completedLevelIds = new Set();
    this.campaignFanfarePlayed = false;
    this.level = null;
    this.settings = DIFFICULTY_SETTINGS.easy;

    this.truth = {
      path: [],
      pings: [],
      receivers: []
    };

    this.player = {
      path: [],
      pings: [],
      receiverCounts: [],
      totalDistance: 0,
      nextPingDistance: 0,
      isDrawing: false,
      pointerId: null
    };

    this.session = {
      attempts: 0,
      score: 0,
      stars: 0,
      completed: false,
      campaignComplete: false,
      reviewOnly: false,
      reveal: false,
      breakdown: null,
      feedback: { key: "movementReady", params: { interval: this.settings.pingInterval }, tone: "" }
    };

    this.tutorial = {
      active: false,
      frameId: 0,
      startTime: 0,
      visiblePingCount: 0,
      counts: null,
      listeningReceiverIds: new Set(),
      previousReveal: false,
      phase: "path"
    };

    this.dom = {};
  }

  initialize() {
    this.cacheDom();
    this.bindControls();
    this.loadLevel({ autoTutorial: true });
  }

  cacheDom() {
    this.dom.difficultySelect = document.getElementById("movementDifficultySelect");
    this.dom.levelDisplay = document.getElementById("movementLevelDisplay");
    this.dom.scoreDisplay = document.getElementById("movementScoreDisplay");
    this.dom.attemptsDisplay = document.getElementById("movementAttemptsDisplay");
    this.dom.progressDisplay = document.getElementById("movementProgressDisplay");
    this.dom.stateDisplay = document.getElementById("movementStateDisplay");
    this.dom.brief = document.getElementById("movementBrief");
    this.dom.map = document.getElementById("movementMap");
    this.dom.svg = document.getElementById("movementPathSvg");
    this.dom.features = document.getElementById("movementFeatures");
    this.dom.receivers = document.getElementById("movementReceivers");
    this.dom.radiusLayer = document.getElementById("movementRadiusLayer");
    this.dom.truePath = document.getElementById("movementTruePath");
    this.dom.playerPath = document.getElementById("movementPlayerPath");
    this.dom.truePingLayer = document.getElementById("movementTruePingLayer");
    this.dom.playerPingLayer = document.getElementById("movementPlayerPingLayer");
    this.dom.animationLayer = document.getElementById("movementPingAnimationLayer");
    this.dom.markerLayer = document.getElementById("movementMarkerLayer");
    this.dom.undoButton = document.getElementById("movementUndoButton");
    this.dom.clearButton = document.getElementById("movementClearButton");
    this.dom.submitButton = document.getElementById("movementSubmitButton");
    this.dom.hintButton = document.getElementById("movementHintButton");
    this.dom.tutorialButton = document.getElementById("movementTutorialButton");
    this.dom.restartButton = document.getElementById("movementRestartButton");
    this.dom.nextButton = document.getElementById("movementNextButton");
    this.dom.feedback = document.getElementById("movementFeedback");
    this.dom.evaluation = document.getElementById("movementEvaluation");
    this.dom.tutorial = document.getElementById("movementTutorial");
    this.dom.tutorialTitle = document.getElementById("movementTutorialTitle");
    this.dom.tutorialText = document.getElementById("movementTutorialText");
    this.dom.tutorialSkipButton = document.getElementById("movementTutorialSkipButton");
    this.dom.celebration = document.getElementById("movementCelebration");
    this.dom.confetti = document.getElementById("movementConfetti");
    this.dom.celebrationTitle = document.getElementById("movementCelebrationTitle");
    this.dom.celebrationStars = document.getElementById("movementCelebrationStars");
    this.dom.celebrationScore = document.getElementById("movementCelebrationScore");
  }

  bindControls() {
    this.dom.difficultySelect.addEventListener("change", () => {
      this.difficulty = this.dom.difficultySelect.value;
      this.loadLevel();
    });
    this.dom.undoButton.addEventListener("click", () => this.undo());
    this.dom.clearButton.addEventListener("click", () => this.clearPath());
    this.dom.submitButton.addEventListener("click", () => this.submitPath());
    this.dom.hintButton.addEventListener("click", () => this.showHint());
    this.dom.tutorialButton.addEventListener("click", () => this.startTutorial());
    this.dom.tutorialSkipButton.addEventListener("click", () => this.endTutorial());
    this.dom.restartButton.addEventListener("click", () => this.restartAttempt());
    this.dom.nextButton.addEventListener("click", () => this.nextLevel());

    this.dom.map.addEventListener("pointerdown", (event) => this.handlePointerDown(event));
    this.dom.map.addEventListener("pointermove", (event) => this.handlePointerMove(event));
    this.dom.map.addEventListener("pointerup", (event) => this.handlePointerUp(event));
    this.dom.map.addEventListener("pointercancel", (event) => this.handlePointerUp(event));
    this.dom.map.addEventListener("lostpointercapture", () => this.finishDrawing());
    this.dom.map.addEventListener("contextmenu", (event) => event.preventDefault());
    this.dom.map.addEventListener("keydown", (event) => {
      if (event.key === "Escape") this.finishDrawing();
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z") {
        event.preventDefault();
        this.undo();
      }
    });
  }

  activate() {
    this.active = true;
  }

  deactivate() {
    this.active = false;
    this.finishDrawing();
    this.cancelTutorial();
    this.clearCelebration();
    this.audio.stopSwimming();
  }

  applyLanguage() {
    const optionKeys = {
      easy: "difficultyEasy",
      medium: "difficultyMedium",
      hard: "difficultyHard"
    };
    Object.entries(optionKeys).forEach(([value, key]) => {
      const option = this.dom.difficultySelect.querySelector(`[value="${value}"]`);
      if (option) option.textContent = this.i18n.t(key);
    });
    this.renderAll();
    this.renderFeedback();
    this.updateHud();
    this.updateTutorialText();
    if (this.session.completed && !this.dom.celebration.hidden) this.renderCelebration();
  }

  levelsForDifficulty() {
    return MOVEMENT_LEVELS.filter((level) => level.difficulty === this.difficulty);
  }

  currentDifficultyLevelNumber() {
    return this.levelIndexByDifficulty[this.difficulty] + 1;
  }

  shouldShowLiveCounts() {
    return this.currentDifficultyLevelNumber() <= 3;
  }

  loadLevel({ autoTutorial = false } = {}) {
    this.cancelTutorial();
    this.finishDrawing();
    this.clearCelebration();
    this.difficulty = this.dom.difficultySelect.value;
    const levels = this.levelsForDifficulty();
    const localIndex = Math.min(this.levelIndexByDifficulty[this.difficulty], levels.length - 1);
    this.levelIndexByDifficulty[this.difficulty] = Math.max(0, localIndex);
    this.level = levels[this.levelIndexByDifficulty[this.difficulty]];
    this.settings = Object.freeze({
      ...DIFFICULTY_SETTINGS[this.difficulty],
      ...(this.level.tuning ?? {})
    });

    const truePath = this.generateTruePath(this.level, this.settings);
    const truePings = this.samplePathAtInterval(truePath, this.settings.pingInterval);
    const receivers = this.generateReceivers(truePath, truePings, this.settings, this.level);

    this.truth = { path: truePath, pings: truePings, receivers };
    this.resetPlayerState();
    this.session = {
      attempts: 0,
      score: 0,
      stars: 0,
      completed: false,
      campaignComplete: false,
      reviewOnly: false,
      reveal: false,
      breakdown: null,
      feedback: { key: "movementReady", params: { interval: this.settings.pingInterval }, tone: "" }
    };
    this.dom.nextButton.hidden = true;
    this.clearAnimations();
    this.renderAll();

    if (autoTutorial && this.difficulty === "easy" && this.levelIndexByDifficulty.easy === 0) {
      requestAnimationFrame(() => this.startTutorial());
    }
  }

  resetPlayerState() {
    this.player = {
      path: [],
      pings: [],
      receiverCounts: this.truth.receivers.map(() => 0),
      totalDistance: 0,
      nextPingDistance: this.settings.pingInterval,
      startedInStartZone: false,
      isDrawing: false,
      pointerId: null
    };
  }

  restartAttempt() {
    this.cancelTutorial();
    this.finishDrawing();
    this.clearCelebration();
    if (this.session.completed || this.session.attempts >= this.settings.maxAttempts) {
      this.loadLevel();
      return;
    }
    this.resetPlayerState();
    this.session.score = 0;
    this.session.stars = 0;
    this.session.reviewOnly = false;
    this.session.reveal = false;
    this.session.breakdown = null;
    this.dom.nextButton.hidden = true;
    this.clearAnimations();
    this.setFeedback("movementRestarted");
    this.renderAll();
  }

  nextLevel() {
    const levels = this.levelsForDifficulty();
    const current = this.levelIndexByDifficulty[this.difficulty];
    if (current < levels.length - 1) {
      this.levelIndexByDifficulty[this.difficulty] = current + 1;
    } else {
      const order = ["easy", "medium", "hard"];
      const difficultyIndex = order.indexOf(this.difficulty);
      if (difficultyIndex < order.length - 1) {
        this.difficulty = order[difficultyIndex + 1];
        this.dom.difficultySelect.value = this.difficulty;
      } else {
        this.levelIndexByDifficulty = { easy: 0, medium: 0, hard: 0 };
        this.completedLevelIds.clear();
        this.campaignFanfarePlayed = false;
        this.difficulty = "easy";
        this.dom.difficultySelect.value = this.difficulty;
      }
    }
    this.loadLevel();
  }

  renderAll() {
    if (!this.level) return;
    this.dom.brief.textContent = `${this.i18n.value(this.level.name)} — ${this.i18n.value(this.level.brief)}`;
    this.renderFeatures();
    this.renderMarkers();
    this.renderRadii();
    this.renderPaths();
    this.renderReceivers();
    this.renderEvaluation();
    this.renderFeedback();
    this.updateHud();
  }

  renderFeatures() {
    const fragments = [];
    for (const feature of [...this.level.obstacles, ...this.level.features]) {
      const shapeClass = feature.shape === "circle" ? "circle" : "";
      const typeClass = feature.type || "rock";
      let style = "";
      if (feature.shape === "circle") {
        style = `left:${((feature.x - feature.radius) / MOVEMENT_MAP.width) * 100}%;top:${((feature.y - feature.radius) / MOVEMENT_MAP.height) * 100}%;width:${(feature.radius * 2 / MOVEMENT_MAP.width) * 100}%;height:${(feature.radius * 2 / MOVEMENT_MAP.height) * 100}%;`;
      } else {
        style = `left:${(feature.x / MOVEMENT_MAP.width) * 100}%;top:${(feature.y / MOVEMENT_MAP.height) * 100}%;width:${(feature.width / MOVEMENT_MAP.width) * 100}%;height:${(feature.height / MOVEMENT_MAP.height) * 100}%;`;
      }
      fragments.push(`<div class="environment-feature ${typeClass} ${shapeClass}" style="${style}"></div>`);
      if (feature.label) {
        const labelX = feature.shape === "circle" ? feature.x : feature.x + feature.width / 2;
        const labelY = feature.shape === "circle" ? feature.y : feature.y + feature.height / 2;
        fragments.push(`<span class="environment-label" style="left:${(labelX / MOVEMENT_MAP.width) * 100}%;top:${(labelY / MOVEMENT_MAP.height) * 100}%;transform:translate(-50%,-50%)">${this.escapeHtml(this.i18n.value(feature.label))}</span>`);
      }
    }
    this.dom.features.innerHTML = fragments.join("");
  }

  renderMarkers() {
    const { startRadius, endRadius } = this.settings;
    this.dom.markerLayer.innerHTML = `
      <circle class="movement-zone movement-start-zone" cx="${this.level.start.x}" cy="${this.level.start.y}" r="${startRadius}"></circle>
      <text class="movement-zone-label movement-start-label" x="${this.level.start.x}" y="${this.level.start.y + 8}">${this.escapeHtml(this.i18n.t("startShort"))}</text>
      <circle class="movement-zone movement-end-zone" cx="${this.level.end.x}" cy="${this.level.end.y}" r="${endRadius}"></circle>
      <text class="movement-zone-label movement-end-label" x="${this.level.end.x}" y="${this.level.end.y + 8}">${this.escapeHtml(this.i18n.t("endShort"))}</text>
    `;
  }

  renderRadii() {
    this.dom.radiusLayer.innerHTML = this.truth.receivers
      .map((receiver) => `<circle class="receiver-radius" cx="${receiver.x}" cy="${receiver.y}" r="${receiver.detectionRadius}"></circle>`)
      .join("");
  }

  renderPaths() {
    const showTruePath = this.session.reveal || this.tutorial.active;
    this.dom.truePath.setAttribute("d", showTruePath ? this.pathToSvg(this.truth.path) : "");
    this.dom.truePath.classList.toggle("is-tutorial", this.tutorial.active);
    this.dom.playerPath.setAttribute("d", this.pathToSvg(this.player.path));
    this.renderTruePings();
    this.renderPlayerPings();
  }

  renderTruePings() {
    if (!this.session.reveal && !this.tutorial.active) {
      this.dom.truePingLayer.innerHTML = "";
      return;
    }
    const count = this.tutorial.active ? this.tutorial.visiblePingCount : this.truth.pings.length;
    this.dom.truePingLayer.innerHTML = this.truth.pings.slice(0, count).map((ping, index) => `
      <g class="true-ping-marker">
        <circle class="ping-dot true-ping-dot" cx="${ping.x}" cy="${ping.y}" r="5"></circle>
        <text class="ping-index" x="${ping.x + 8}" y="${ping.y - 8}">${index + 1}</text>
      </g>
    `).join("");
  }

  renderPlayerPings() {
    this.dom.playerPingLayer.innerHTML = this.player.pings.map((ping) => `<circle class="ping-dot player-ping-dot" cx="${ping.x}" cy="${ping.y}" r="4.5"></circle>`).join("");
  }

  renderReceivers() {
    const showLiveCounts = this.shouldShowLiveCounts() && !this.tutorial.active;
    this.dom.receivers.replaceChildren(...this.truth.receivers.map((receiver, index) => {
      const displayedCount = this.tutorial.active && this.tutorial.counts
        ? this.tutorial.counts[index]
        : receiver.targetCount;
      const playerCount = this.player.receiverCounts[index] ?? 0;
      const compareCounts = this.session.reveal || showLiveCounts;
      const comparison = compareCounts
        ? this.i18n.t("receiverComparison", { player: playerCount })
        : "";
      const element = document.createElement("div");
      element.className = `movement-receiver ${this.detectionClass(displayedCount)}`;
      element.dataset.receiverId = receiver.id;
      if (this.tutorial.listeningReceiverIds.has(receiver.id)) element.classList.add("is-listening");
      if ((this.session.reveal || (showLiveCounts && this.player.path.length > 0))) {
        element.classList.add(playerCount === receiver.targetCount ? "is-count-match" : "is-count-mismatch");
      }
      element.style.left = `${(receiver.x / MOVEMENT_MAP.width) * 100}%`;
      element.style.top = `${(receiver.y / MOVEMENT_MAP.height) * 100}%`;
      element.setAttribute("role", "img");
      element.setAttribute("aria-label", this.i18n.t("receiverAria", {
        receiver: receiver.id,
        target: receiver.targetCount,
        comparison
      }));
      const countText = compareCounts ? `${receiver.targetCount}/${playerCount}` : String(displayedCount);
      const label = this.session.reveal
        ? `${this.escapeHtml(this.i18n.t("evaluationTarget"))}/${this.escapeHtml(this.i18n.t("evaluationPlayer"))}`
        : showLiveCounts
          ? this.escapeHtml(this.i18n.t("receiverLiveLabel"))
          : "";
      element.innerHTML = `<strong>${receiver.id}</strong><span class="receiver-count">${countText}</span><small>${label}</small>`;
      return element;
    }));
  }

  renderEvaluation() {
    const breakdown = this.session.breakdown;
    if (!breakdown) {
      this.dom.evaluation.hidden = true;
      this.dom.evaluation.innerHTML = "";
      return;
    }
    const accepted = Math.floor(breakdown.receiverCountAccuracy * 100 + 1e-9) >= Math.round(RECEIVER_PASS_ACCURACY * 100) && breakdown.startedCorrectly && breakdown.endedCorrectly;
    const receiverRows = this.truth.receivers.map((receiver, index) => {
      const playerCount = this.player.receiverCounts[index] ?? 0;
      const difference = playerCount - receiver.targetCount;
      return `<tr class="${difference === 0 ? "is-match" : "is-mismatch"}">
        <th scope="row">${receiver.id}</th>
        <td>${receiver.targetCount}</td>
        <td>${playerCount}</td>
        <td>${difference > 0 ? "+" : ""}${difference}</td>
      </tr>`;
    }).join("");

    this.dom.evaluation.hidden = false;
    this.dom.evaluation.innerHTML = `
      <div class="evaluation-heading-row">
        <h3>${this.escapeHtml(this.i18n.t("evaluationHeading"))}</h3>
        <strong class="evaluation-verdict ${accepted ? "is-accepted" : "is-rejected"}">${this.escapeHtml(this.i18n.t(accepted ? "evaluationAccepted" : "evaluationNotAccepted"))}</strong>
      </div>
      <div class="evaluation-score-grid">
        ${this.evaluationMetric(this.i18n.t("evaluationPath"), breakdown.pathSimilarity)}
        ${this.evaluationMetric(this.i18n.t("evaluationCounts"), breakdown.receiverCountAccuracy)}
        ${this.evaluationMetric(this.i18n.t("evaluationEndpoints"), breakdown.endpointAccuracy)}
        ${this.evaluationMetric(this.i18n.t("evaluationScore"), breakdown.score / 100, true)}
      </div>
      <p class="evaluation-target">${this.escapeHtml(this.i18n.t("evaluationPassTarget"))}: <strong>${Math.round(RECEIVER_PASS_ACCURACY * 100)}%</strong></p>
      <div class="evaluation-table-wrap">
        <table>
          <thead><tr>
            <th>${this.escapeHtml(this.i18n.t("evaluationReceiver"))}</th>
            <th>${this.escapeHtml(this.i18n.t("evaluationTarget"))}</th>
            <th>${this.escapeHtml(this.i18n.t("evaluationPlayer"))}</th>
            <th>${this.escapeHtml(this.i18n.t("evaluationDifference"))}</th>
          </tr></thead>
          <tbody>${receiverRows}</tbody>
        </table>
      </div>
    `;
  }

  evaluationMetric(label, value, emphasize = false) {
    const percentage = Math.round(this.clamp(value, 0, 1) * 100);
    return `<div class="evaluation-metric ${emphasize ? "is-overall" : ""}">
      <span>${this.escapeHtml(label)}</span>
      <strong>${percentage}%</strong>
      <div class="evaluation-meter" aria-hidden="true"><i style="width:${percentage}%"></i></div>
    </div>`;
  }

  updateHud() {
    if (!this.level) return;
    const globalIndex = MOVEMENT_LEVELS.indexOf(this.level) + 1;
    this.dom.levelDisplay.textContent = `${globalIndex} / ${MOVEMENT_LEVELS.length}`;
    this.dom.scoreDisplay.textContent = `${this.session.score}%`;
    this.dom.attemptsDisplay.textContent = `${this.session.attempts} / ${this.settings.maxAttempts}`;
    this.dom.progressDisplay.textContent = String(this.player.pings.length);

    const stateKey = this.tutorial.active
      ? "stateTutorial"
      : this.session.completed
        ? "stateComplete"
        : this.session.reviewOnly
          ? "stateReview"
          : this.player.isDrawing
            ? "stateDrawing"
            : "stateBuilding";
    this.dom.stateDisplay.textContent = this.i18n.t(stateKey);

    const locked = this.session.completed || this.session.reviewOnly || this.tutorial.active;
    this.dom.undoButton.disabled = this.player.path.length < 2 || locked;
    this.dom.clearButton.disabled = this.player.path.length === 0 || locked;
    this.dom.submitButton.disabled = this.player.path.length < 2 || locked;
    this.dom.tutorialButton.disabled = this.tutorial.active;
    this.dom.nextButton.hidden = !(this.session.completed || this.session.attempts >= this.settings.maxAttempts);
  }

  setFeedback(key, params = {}, tone = "") {
    this.session.feedback = { key, params, tone };
    this.renderFeedback();
  }

  renderFeedback() {
    if (!this.session.feedback) return;
    this.dom.feedback.textContent = this.i18n.t(this.session.feedback.key, this.session.feedback.params);
    this.dom.feedback.classList.toggle("is-success", this.session.feedback.tone === "success");
    this.dom.feedback.classList.toggle("is-error", this.session.feedback.tone === "error");
    this.dom.feedback.classList.toggle("is-hint", this.session.feedback.tone === "hint");
  }

  handlePointerDown(event) {
    if (!this.active || event.button !== 0 || this.session.completed || this.session.reviewOnly || this.tutorial.active) return;
    const point = this.eventToMapPoint(event);
    if (!point || !this.pointInsideMap(point)) return;

    if (this.player.path.length === 0) {
      if (this.distance(point, this.level.start) > this.settings.startRadius) {
        this.setFeedback("movementBeginAtStart", {}, "hint");
        return;
      }
      this.player.path = [{ ...this.level.start }];
      this.player.startedInStartZone = true;
      this.player.totalDistance = 0;
      this.player.nextPingDistance = this.settings.pingInterval;
    } else {
      const lastPoint = this.player.path[this.player.path.length - 1];
      if (this.distance(point, lastPoint) > this.settings.resumeRadius) {
        this.setFeedback("movementResumeAtEnd", {}, "hint");
        return;
      }
    }

    event.preventDefault();
    this.player.isDrawing = true;
    this.player.pointerId = event.pointerId;
    this.dom.map.setPointerCapture?.(event.pointerId);
    this.audio.playDrawStart();
    this.audio.startSwimming();
    this.setFeedback("movementDrawing");
    this.updateHud();
  }

  handlePointerMove(event) {
    if (!this.player.isDrawing || event.pointerId !== this.player.pointerId) return;
    event.preventDefault();
    const point = this.eventToMapPoint(event);
    if (!point || !this.pointInsideMap(point)) {
      this.setFeedback("movementOutside", {}, "error");
      return;
    }
    this.extendPlayerPath(point);
  }

  handlePointerUp(event) {
    if (!this.player.isDrawing || event.pointerId !== this.player.pointerId) return;
    event.preventDefault();
    const point = this.eventToMapPoint(event);
    if (point && this.pointInsideMap(point)) this.extendPlayerPath(point);
    const lastPoint = this.player.path[this.player.path.length - 1];
    const endedInEndZone = Boolean(lastPoint && this.distance(lastPoint, this.level.end) <= this.settings.endRadius);
    if (endedInEndZone) this.extendPlayerPath(this.level.end, true);
    this.finishDrawing();

    if (
      endedInEndZone &&
      this.player.totalDistance >= this.settings.pingInterval * 2 &&
      Math.floor(this.calculateReceiverCountAccuracy() * 100 + 1e-9) >= Math.round(RECEIVER_PASS_ACCURACY * 100)
    ) {
      requestAnimationFrame(() => this.submitPath({ automatic: true }));
    }
  }

  finishDrawing() {
    if (this.player.pointerId !== null && this.dom.map.hasPointerCapture?.(this.player.pointerId)) {
      try { this.dom.map.releasePointerCapture(this.player.pointerId); } catch (error) { /* pointer already released */ }
    }
    this.player.isDrawing = false;
    this.player.pointerId = null;
    this.audio.stopSwimming();
    this.updateHud();
  }

  extendPlayerPath(targetPoint, force = false) {
    if (this.player.path.length === 0) return;
    const startPoint = this.player.path[this.player.path.length - 1];
    const segmentLength = this.distance(startPoint, targetPoint);
    if (!force && segmentLength < this.settings.inputSampleSpacing) return;

    const steps = Math.max(1, Math.ceil(segmentLength / this.settings.inputSampleSpacing));
    let previous = startPoint;
    let blocked = false;
    for (let step = 1; step <= steps; step += 1) {
      const candidate = this.interpolate(startPoint, targetPoint, step / steps);
      if (!this.pointInsideMap(candidate)) {
        this.setFeedback("movementOutside", {}, "error");
        blocked = true;
        break;
      }
      if (this.segmentBlocked(previous, candidate)) {
        this.setFeedback("movementBlocked", {}, "error");
        blocked = true;
        break;
      }
      const segment = this.distance(previous, candidate);
      if (segment < 0.01) continue;
      const previousTotal = this.player.totalDistance;
      const nextTotal = previousTotal + segment;
      while (this.player.nextPingDistance <= nextTotal + 0.0001) {
        const ratio = (this.player.nextPingDistance - previousTotal) / segment;
        const ping = this.interpolate(previous, candidate, this.clamp(ratio, 0, 1));
        this.player.pings.push(ping);
        const heardReceiverIds = this.registerPlayerPing(ping);
        this.animatePing(ping, "player");
        this.audio.playTagPing(heardReceiverIds.length);
        this.player.nextPingDistance += this.settings.pingInterval;
      }
      this.player.path.push(candidate);
      this.player.totalDistance = nextTotal;
      previous = candidate;
    }

    this.dom.playerPath.setAttribute("d", this.pathToSvg(this.player.path));
    this.renderPlayerPings();
    this.renderReceivers();
    this.updateHud();
    if (blocked) this.finishDrawing();
  }

  undo() {
    if (this.session.completed || this.session.reviewOnly || this.tutorial.active || this.player.path.length < 2) return;
    const targetDistance = Math.max(0, this.player.totalDistance - this.settings.pingInterval);
    if (targetDistance < this.settings.inputSampleSpacing) {
      this.clearPath();
      return;
    }
    this.player.path = this.truncatePathAtDistance(this.player.path, targetDistance);
    this.rebuildPlayerMetrics();
    this.setFeedback("movementUndone");
    this.renderPaths();
    this.renderReceivers();
    this.updateHud();
  }

  clearPath() {
    if (this.session.completed || this.session.reviewOnly || this.tutorial.active) return;
    this.finishDrawing();
    this.resetPlayerState();
    this.clearAnimations();
    this.setFeedback("movementCleared");
    this.renderPaths();
    this.renderReceivers();
    this.updateHud();
  }

  rebuildPlayerMetrics() {
    this.player.totalDistance = this.pathLength(this.player.path);
    this.player.pings = this.samplePathAtInterval(this.player.path, this.settings.pingInterval);
    this.player.nextPingDistance = (this.player.pings.length + 1) * this.settings.pingInterval;
    this.player.receiverCounts = this.countPingsForReceivers(this.player.pings, this.truth.receivers);
  }

  registerPlayerPing(ping) {
    const heardIds = [];
    this.truth.receivers.forEach((receiver, index) => {
      if (this.distance(receiver, ping) <= receiver.detectionRadius) {
        this.player.receiverCounts[index] = (this.player.receiverCounts[index] ?? 0) + 1;
        heardIds.push(receiver.id);
      }
    });
    this.renderReceivers();
    for (const id of heardIds) {
      const element = [...this.dom.receivers.children].find((receiverElement) => receiverElement.dataset.receiverId === id);
      if (!element) continue;
      element.classList.remove("is-listening");
      void element.offsetWidth;
      element.classList.add("is-listening");
    }
    return heardIds;
  }

  showHint() {
    this.setFeedback("movementHint", { hint: this.i18n.value(this.level.hint) }, "hint");
  }

  submitPath({ automatic = false } = {}) {
    if (this.session.completed || this.session.reviewOnly || this.tutorial.active) return;
    this.finishDrawing();
    if (this.player.path.length < 2) {
      this.setFeedback("movementNeedPath", {}, "error");
      return;
    }
    const firstPoint = this.player.path[0];
    if (!this.player.startedInStartZone || this.distance(firstPoint, this.level.start) > this.settings.startRadius) {
      this.setFeedback("movementNeedStart", {}, "error");
      return;
    }
    const lastPoint = this.player.path[this.player.path.length - 1];
    if (this.distance(lastPoint, this.level.end) > this.settings.endRadius) {
      this.setFeedback("movementNeedEnd", {}, "error");
      return;
    }
    if (this.player.totalDistance < this.settings.pingInterval * 2) {
      this.setFeedback("movementTooShort", {}, "error");
      return;
    }

    this.player.pings = this.samplePathAtInterval(this.player.path, this.settings.pingInterval);
    this.player.receiverCounts = this.countPingsForReceivers(this.player.pings, this.truth.receivers);
    const breakdown = this.evaluatePlayerPath();
    const receiverAccuracyPercent = Math.floor(breakdown.receiverCountAccuracy * 100 + 1e-9);
    const stars = this.starCountForAccuracy(receiverAccuracyPercent);
    this.session.attempts += 1;
    this.session.score = receiverAccuracyPercent;
    this.session.stars = stars;
    this.session.breakdown = breakdown;
    this.session.reveal = true;
    this.session.reviewOnly = true;
    this.session.completed = breakdown.startedCorrectly && breakdown.endedCorrectly && receiverAccuracyPercent >= Math.round(RECEIVER_PASS_ACCURACY * 100);

    if (this.session.completed) {
      this.completedLevelIds.add(this.level.id);
      this.session.campaignComplete = this.completedLevelIds.size === MOVEMENT_LEVELS.length;
      if (this.session.campaignComplete && !this.campaignFanfarePlayed) {
        this.campaignFanfarePlayed = true;
        this.audio.playTrophyFanfare();
      } else {
        this.audio.playSuccess();
      }
      this.setFeedback(this.session.campaignComplete ? "movementCampaignComplete" : "movementResultPass", {
        score: receiverAccuracyPercent,
        stars
      }, "success");
    } else if (this.session.attempts >= this.settings.maxAttempts) {
      this.audio.playFailure();
      this.setFeedback("movementAttemptsUsed", {
        score: receiverAccuracyPercent,
        attempts: this.settings.maxAttempts
      }, "error");
    } else {
      this.audio.playFailure();
      this.setFeedback("movementResultRetry", {
        score: receiverAccuracyPercent,
        target: Math.round(RECEIVER_PASS_ACCURACY * 100)
      }, "error");
    }

    this.renderAll();
    if (this.session.completed) this.showCelebration();
  }

  evaluatePlayerPath() {
    const trueSamples = this.resamplePath(this.truth.path, this.settings.pathSampleSpacing);
    const playerSamples = this.resamplePath(this.player.path, this.settings.pathSampleSpacing);
    const comparisonCount = Math.max(24, Math.min(80, Math.max(trueSamples.length, playerSamples.length)));
    let alignedDistance = 0;
    for (let index = 0; index < comparisonCount; index += 1) {
      const fraction = comparisonCount === 1 ? 0 : index / (comparisonCount - 1);
      alignedDistance += this.distance(
        this.pointAtFraction(this.truth.path, fraction),
        this.pointAtFraction(this.player.path, fraction)
      );
    }
    alignedDistance /= comparisonCount;

    const trueToPlayer = this.averageNearestDistance(trueSamples, playerSamples);
    const playerToTrue = this.averageNearestDistance(playerSamples, trueSamples);
    const chamferDistance = (trueToPlayer + playerToTrue) / 2;
    const spatialDistance = alignedDistance * 0.65 + chamferDistance * 0.35;
    const spatialScore = this.clamp(1 - spatialDistance / this.settings.evaluationTolerance, 0, 1);

    const trueLength = this.pathLength(this.truth.path);
    const playerLength = this.pathLength(this.player.path);
    const lengthScore = this.clamp(1 - Math.abs(playerLength - trueLength) / Math.max(trueLength, 1), 0, 1);
    const pathSimilarity = spatialScore * 0.86 + lengthScore * 0.14;

    const maximumTarget = Math.max(1, ...this.truth.receivers.map((receiver) => receiver.targetCount), ...this.player.receiverCounts);
    const totalCountError = this.truth.receivers.reduce((sum, receiver, index) => {
      return sum + Math.abs(receiver.targetCount - (this.player.receiverCounts[index] ?? 0));
    }, 0);
    const receiverCountAccuracy = this.calculateReceiverCountAccuracy(this.player.receiverCounts, maximumTarget);

    const playerStart = this.player.path[0];
    const playerEnd = this.player.path[this.player.path.length - 1];
    const endpointDistance = (this.distance(playerStart, this.level.start) + this.distance(playerEnd, this.level.end)) / 2;
    const endpointAccuracy = this.clamp(1 - endpointDistance / this.settings.endpointTolerance, 0, 1);

    const weighted =
      pathSimilarity * SCORE_WEIGHTS.pathSimilarity +
      receiverCountAccuracy * SCORE_WEIGHTS.receiverCountAccuracy +
      endpointAccuracy * SCORE_WEIGHTS.endpointAccuracy;

    return {
      pathSimilarity,
      receiverCountAccuracy,
      endpointAccuracy,
      startedCorrectly: this.player.startedInStartZone && this.distance(playerStart, this.level.start) <= this.settings.startRadius,
      endedCorrectly: this.distance(playerEnd, this.level.end) <= this.settings.endRadius,
      score: Math.round(this.clamp(weighted, 0, 1) * 100),
      spatialDistance,
      totalCountError
    };
  }

  calculateReceiverCountAccuracy(counts = this.player.receiverCounts, maximumTargetOverride = null) {
    const maximumTarget = maximumTargetOverride ?? Math.max(
      1,
      ...this.truth.receivers.map((receiver) => receiver.targetCount),
      ...counts
    );
    const totalCountError = this.truth.receivers.reduce((sum, receiver, index) => {
      return sum + Math.abs(receiver.targetCount - (counts[index] ?? 0));
    }, 0);
    const maximumCountError = this.truth.receivers.length * maximumTarget;
    return this.clamp(1 - totalCountError / Math.max(maximumCountError, 1), 0, 1);
  }

  starCountForAccuracy(accuracyPercent) {
    return STAR_RATINGS.find((rating) => accuracyPercent >= rating.minimum)?.stars ?? 0;
  }

  showCelebration() {
    if (!this.session.completed) return;
    this.renderCelebration();
    this.dom.celebration.hidden = false;
    this.createConfetti({ grandFinale: this.session.campaignComplete });
  }

  renderCelebration() {
    const accuracy = this.session.score;
    const stars = this.session.stars;
    this.dom.celebrationTitle.textContent = this.i18n.t(
      this.session.campaignComplete ? "celebrationCampaignTitle" : "celebrationTitle"
    );
    this.dom.celebrationScore.textContent = this.i18n.t("celebrationAccuracy", { accuracy });
    this.dom.celebrationStars.setAttribute("aria-label", this.i18n.t("celebrationStars", { stars }));
    this.dom.celebrationStars.innerHTML = Array.from({ length: 3 }, (_, index) =>
      `<span class="celebration-star ${index < stars ? "is-earned" : ""}" aria-hidden="true">★</span>`
    ).join("");
  }

  createConfetti({ grandFinale = false } = {}) {
    this.dom.confetti.replaceChildren();
    const fragment = document.createDocumentFragment();
    const colors = ["coral", "mustard", "green", "blue", "cream", "purple"];
    const pieceCount = grandFinale ? 156 : 108;
    for (let index = 0; index < pieceCount; index += 1) {
      const piece = document.createElement("i");
      const wave = index % (grandFinale ? 4 : 3);
      piece.className = `confetti-piece confetti-${colors[index % colors.length]} confetti-wave-${wave + 1}`;
      piece.style.setProperty("--confetti-x", `${Math.random() * 100}%`);
      piece.style.setProperty("--confetti-drift", `${Math.round((Math.random() - 0.5) * (grandFinale ? 280 : 220))}px`);
      piece.style.setProperty("--confetti-delay", `${(wave * 0.34 + Math.random() * 0.42).toFixed(2)}s`);
      piece.style.setProperty("--confetti-duration", `${(2.65 + Math.random() * 1.45).toFixed(2)}s`);
      piece.style.setProperty("--confetti-turn", `${Math.round(420 + Math.random() * 1040)}deg`);
      piece.style.setProperty("--confetti-scale", `${(0.72 + Math.random() * 0.72).toFixed(2)}`);
      fragment.appendChild(piece);
    }
    this.dom.confetti.appendChild(fragment);
  }

  clearCelebration() {
    if (!this.dom.celebration) return;
    this.dom.celebration.hidden = true;
    this.dom.confetti?.replaceChildren();
  }

  startTutorial() {
    if (!this.level || this.tutorial.active) return;
    this.finishDrawing();
    this.cancelTutorial();
    this.tutorial.active = true;
    this.tutorial.startTime = performance.now();
    this.tutorial.visiblePingCount = 0;
    this.tutorial.counts = this.truth.receivers.map(() => 0);
    this.tutorial.listeningReceiverIds = new Set();
    this.tutorial.previousReveal = this.session.reveal;
    this.tutorial.phase = "path";
    this.dom.tutorial.hidden = false;
    this.renderAll();
    this.updateTutorialText();

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      this.tutorial.visiblePingCount = this.truth.pings.length;
      this.tutorial.counts = this.truth.receivers.map((receiver) => receiver.targetCount);
      this.tutorial.phase = "hidden";
      this.renderAll();
      this.updateTutorialText();
      return;
    }

    const tick = (now) => {
      if (!this.tutorial.active) return;
      const elapsed = now - this.tutorial.startTime;
      const leadIn = 900;
      const perPing = 430;
      const visibleCount = this.clamp(Math.floor((elapsed - leadIn) / perPing) + 1, 0, this.truth.pings.length);
      if (visibleCount !== this.tutorial.visiblePingCount) {
        this.tutorial.visiblePingCount = visibleCount;
        const visiblePings = this.truth.pings.slice(0, visibleCount);
        this.tutorial.counts = this.countPingsForReceivers(visiblePings, this.truth.receivers);
        const newestPing = visiblePings[visiblePings.length - 1];
        this.tutorial.listeningReceiverIds = new Set(
          newestPing
            ? this.truth.receivers.filter((receiver) => this.distance(receiver, newestPing) <= receiver.detectionRadius).map((receiver) => receiver.id)
            : []
        );
        if (newestPing) {
          this.animatePing(newestPing, "true");
          this.audio.playReceiverPulse();
        }
        this.renderRadii();
        this.renderPaths();
        this.renderReceivers();
      }

      if (elapsed < leadIn) this.tutorial.phase = "path";
      else if (visibleCount < Math.ceil(this.truth.pings.length / 2)) this.tutorial.phase = "pings";
      else if (visibleCount < this.truth.pings.length) this.tutorial.phase = "receivers";
      else this.tutorial.phase = "hidden";
      this.updateTutorialText();
      this.updateHud();

      const finishAt = leadIn + this.truth.pings.length * perPing + 1300;
      if (elapsed >= finishAt) {
        this.endTutorial();
        return;
      }
      this.tutorial.frameId = requestAnimationFrame(tick);
    };
    this.tutorial.frameId = requestAnimationFrame(tick);
  }

  updateTutorialText() {
    if (!this.dom.tutorialText || !this.tutorial.active) return;
    const keyByPhase = {
      path: "tutorialStepPath",
      pings: "tutorialStepPings",
      receivers: "tutorialStepReceivers",
      hidden: "tutorialStepHidden"
    };
    this.dom.tutorialTitle.textContent = this.i18n.t("tutorialTitle");
    this.dom.tutorialText.textContent = this.i18n.t(keyByPhase[this.tutorial.phase]);
    this.dom.tutorialSkipButton.textContent = this.i18n.t("buttonHideTutorial");
  }

  endTutorial() {
    if (!this.tutorial.active) return;
    const previousReveal = this.tutorial.previousReveal;
    this.cancelTutorial();
    this.session.reveal = previousReveal;
    this.dom.tutorial.hidden = true;
    this.setFeedback("movementTutorialComplete", {}, "hint");
    this.renderAll();
  }

  cancelTutorial() {
    if (this.tutorial.frameId) cancelAnimationFrame(this.tutorial.frameId);
    this.tutorial.frameId = 0;
    this.tutorial.active = false;
    this.tutorial.visiblePingCount = 0;
    this.tutorial.counts = null;
    this.tutorial.listeningReceiverIds = new Set();
    if (this.dom.tutorial) this.dom.tutorial.hidden = true;
  }

  animatePing(point, kind) {
    const namespace = "http://www.w3.org/2000/svg";
    const duration = this.settings.pingAnimationDuration ?? 720;
    const burst = document.createElementNS(namespace, "g");
    const typeClass = kind === "true" ? "true-ping-burst" : "player-ping-burst";
    burst.classList.add("ping-burst", typeClass);
    burst.setAttribute("transform", `translate(${point.x} ${point.y})`);

    const core = document.createElementNS(namespace, "circle");
    core.setAttribute("r", "5.5");
    core.classList.add("ping-burst-core");
    core.style.animationDuration = `${Math.max(260, Math.round(duration * 0.48))}ms`;
    burst.appendChild(core);

    const waveDelays = [0, 0.2, 0.4];
    let finalWave = null;
    waveDelays.forEach((delayRatio, index) => {
      const wave = document.createElementNS(namespace, "circle");
      wave.setAttribute("r", "7");
      wave.classList.add("ping-wave", `ping-wave-${index + 1}`);
      wave.style.animationDuration = `${Math.round(duration * 0.72)}ms`;
      wave.style.animationDelay = `${Math.round(duration * delayRatio)}ms`;
      burst.appendChild(wave);
      finalWave = wave;
    });

    const flash = document.createElementNS(namespace, "circle");
    flash.setAttribute("r", "12");
    flash.classList.add("ping-flash");
    flash.style.animationDuration = `${Math.max(280, Math.round(duration * 0.55))}ms`;
    burst.appendChild(flash);

    finalWave?.addEventListener("animationend", () => burst.remove(), { once: true });
    this.dom.animationLayer.appendChild(burst);
  }

  clearAnimations() {
    this.dom.animationLayer.replaceChildren();
  }

  generateTruePath(level, settings) {
    const baseAnchors = level.anchors.map((anchor) => ({ ...anchor }));
    for (let attempt = 0; attempt < 18; attempt += 1) {
      const random = this.seededRandom(level.seed + attempt * 977);
      const decay = Math.max(0.22, 1 - attempt * 0.045);
      const anchors = baseAnchors.map((anchor, index) => {
        if (index === 0 || index === baseAnchors.length - 1 || anchor.jitter === 0) {
          return { x: anchor.x, y: anchor.y };
        }
        const amount = settings.pathJitter * (anchor.jitter ?? 1) * decay;
        return {
          x: this.clamp(anchor.x + (random() * 2 - 1) * amount, MOVEMENT_MAP.margin, MOVEMENT_MAP.width - MOVEMENT_MAP.margin),
          y: this.clamp(anchor.y + (random() * 2 - 1) * amount, MOVEMENT_MAP.margin, MOVEMENT_MAP.height - MOVEMENT_MAP.margin)
        };
      });
      anchors[0] = { ...level.start };
      anchors[anchors.length - 1] = { ...level.end };
      const path = this.catmullRomPath(anchors, 11 + settings.pathComplexity * 5);
      if (this.pathIsValid(path)) return path;
    }
    const fallback = this.catmullRomPath(baseAnchors.map(({ x, y }) => ({ x, y })), 14);
    return fallback;
  }

  generateReceivers(path, pings, settings, level) {
    const receiverCount = settings.receiverCount;
    const defaultPatterns = {
      easy: [0.08, -0.62, 0.55, -0.12, 0.46],
      medium: [0.14, -0.44, 0.62, -0.34, 0.42, -0.22],
      hard: [0.03, -0.18, 0.22, -0.28, 0.16, -0.12, 0.3, -0.2]
    };
    const pattern = level.receiverOffsetPattern ?? defaultPatterns[level.difficulty];
    const fractions = level.receiverFractions ?? Array.from(
      { length: receiverCount },
      (_, index) => 0.12 + (index / Math.max(receiverCount - 1, 1)) * 0.76
    );
    const totalLength = this.pathLength(path);
    let fallback = [];

    for (let attempt = 0; attempt < 48; attempt += 1) {
      const random = this.seededRandom(level.seed * 31 + attempt * 1013);
      const receivers = [];
      for (let index = 0; index < receiverCount; index += 1) {
        const fraction = fractions[index] ?? (0.12 + (index / Math.max(receiverCount - 1, 1)) * 0.76);
        const alongDistance = totalLength * fraction + (random() * 2 - 1) * settings.receiverAlongJitter;
        const base = this.pointAtDistance(path, alongDistance);
        const before = this.pointAtDistance(path, Math.max(0, alongDistance - 18));
        const after = this.pointAtDistance(path, Math.min(totalLength, alongDistance + 18));
        const tangentLength = Math.max(0.001, this.distance(before, after));
        const tangent = { x: (after.x - before.x) / tangentLength, y: (after.y - before.y) / tangentLength };
        const normal = { x: -tangent.y, y: tangent.x };
        const radius = settings.detectionRadius * (0.94 + random() * 0.12);
        const patternOffset = pattern[index] ?? pattern[index % pattern.length] ?? 0;
        const offset = (patternOffset + (random() * 2 - 1) * settings.receiverOffsetJitter) * radius;
        const alongOffset = (random() * 2 - 1) * settings.receiverAlongJitter;
        let point = {
          x: base.x + normal.x * offset + tangent.x * alongOffset,
          y: base.y + normal.y * offset + tangent.y * alongOffset
        };
        point = this.keepReceiverValid(point, base, radius);
        receivers.push({
          id: String.fromCharCode(65 + index),
          x: point.x,
          y: point.y,
          detectionRadius: radius,
          targetCount: 0
        });
      }
      const counts = this.countPingsForReceivers(pings, receivers);
      receivers.forEach((receiver, index) => { receiver.targetCount = counts[index]; });
      fallback = receivers;
      if (this.receiverEvidenceIsValid(receivers, settings)) return receivers;
    }
    return fallback;
  }

  keepReceiverValid(point, base, radius) {
    const margin = Math.max(42, Math.min(70, radius * 0.45));
    let candidate = {
      x: this.clamp(point.x, margin, MOVEMENT_MAP.width - margin),
      y: this.clamp(point.y, margin, MOVEMENT_MAP.height - margin)
    };
    if (this.pointInsideSolidObstacle(candidate, 14)) {
      const opposite = {
        x: base.x - (candidate.x - base.x) * 0.7,
        y: base.y - (candidate.y - base.y) * 0.7
      };
      candidate = {
        x: this.clamp(opposite.x, margin, MOVEMENT_MAP.width - margin),
        y: this.clamp(opposite.y, margin, MOVEMENT_MAP.height - margin)
      };
    }
    if (this.pointInsideSolidObstacle(candidate, 10)) return { ...base };
    return candidate;
  }

  receiverEvidenceIsValid(receivers, settings) {
    const counts = receivers.map((receiver) => receiver.targetCount);
    const active = counts.filter((count) => count > 0).length;
    const distinct = new Set(counts).size;
    const total = counts.reduce((sum, count) => sum + count, 0);
    const maximum = Math.max(...counts, 0);
    const overlapPairs = this.countReceiverOverlapPairs(receivers);
    return (
      active >= Math.ceil(receivers.length * settings.minimumActiveRatio) &&
      distinct >= settings.minimumDistinctCounts &&
      (total === 0 || maximum <= total * settings.maximumDominance) &&
      overlapPairs >= settings.minimumOverlapPairs &&
      overlapPairs <= settings.maximumOverlapPairs
    );
  }

  countReceiverOverlapPairs(receivers) {
    let pairs = 0;
    for (let first = 0; first < receivers.length; first += 1) {
      for (let second = first + 1; second < receivers.length; second += 1) {
        const combinedRadius = receivers[first].detectionRadius + receivers[second].detectionRadius;
        if (this.distance(receivers[first], receivers[second]) <= combinedRadius * 0.9) pairs += 1;
      }
    }
    return pairs;
  }

  countPingsForReceivers(pings, receivers) {
    return receivers.map((receiver) => pings.reduce((count, ping) => {
      return count + (this.distance(receiver, ping) <= receiver.detectionRadius ? 1 : 0);
    }, 0));
  }

  pathIsValid(path) {
    if (path.some((point) => !this.pointInsideMap(point))) return false;
    for (let index = 1; index < path.length; index += 1) {
      if (this.segmentBlocked(path[index - 1], path[index])) return false;
    }
    return true;
  }

  pathToSvg(path) {
    if (!path.length) return "";
    if (path.length === 1) return `M ${path[0].x.toFixed(2)} ${path[0].y.toFixed(2)}`;
    let data = `M ${path[0].x.toFixed(2)} ${path[0].y.toFixed(2)}`;
    for (let index = 1; index < path.length - 1; index += 1) {
      const current = path[index];
      const next = path[index + 1];
      const midpoint = { x: (current.x + next.x) / 2, y: (current.y + next.y) / 2 };
      data += ` Q ${current.x.toFixed(2)} ${current.y.toFixed(2)} ${midpoint.x.toFixed(2)} ${midpoint.y.toFixed(2)}`;
    }
    const previous = path[path.length - 2];
    const last = path[path.length - 1];
    data += ` Q ${previous.x.toFixed(2)} ${previous.y.toFixed(2)} ${last.x.toFixed(2)} ${last.y.toFixed(2)}`;
    return data;
  }

  catmullRomPath(points, subdivisions) {
    if (points.length < 2) return points.map((point) => ({ ...point }));
    const result = [];
    for (let index = 0; index < points.length - 1; index += 1) {
      const p0 = points[Math.max(0, index - 1)];
      const p1 = points[index];
      const p2 = points[index + 1];
      const p3 = points[Math.min(points.length - 1, index + 2)];
      for (let step = 0; step < subdivisions; step += 1) {
        const t = step / subdivisions;
        const t2 = t * t;
        const t3 = t2 * t;
        result.push({
          x: 0.5 * ((2 * p1.x) + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
          y: 0.5 * ((2 * p1.y) + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3)
        });
      }
    }
    result.push({ ...points[points.length - 1] });
    return result;
  }

  samplePathAtInterval(path, interval) {
    if (path.length < 2 || interval <= 0) return [];
    const total = this.pathLength(path);
    const samples = [];
    for (let distance = interval; distance <= total + 0.0001; distance += interval) {
      samples.push(this.pointAtDistance(path, distance));
    }
    return samples;
  }

  resamplePath(path, spacing) {
    if (path.length === 0) return [];
    if (path.length === 1) return [{ ...path[0] }];
    const total = this.pathLength(path);
    const samples = [{ ...path[0] }];
    for (let distance = spacing; distance < total; distance += spacing) {
      samples.push(this.pointAtDistance(path, distance));
    }
    samples.push({ ...path[path.length - 1] });
    return samples;
  }

  truncatePathAtDistance(path, targetDistance) {
    if (!path.length || targetDistance <= 0) return [];
    const result = [{ ...path[0] }];
    let travelled = 0;
    for (let index = 1; index < path.length; index += 1) {
      const segment = this.distance(path[index - 1], path[index]);
      if (travelled + segment >= targetDistance) {
        const ratio = (targetDistance - travelled) / Math.max(segment, 0.0001);
        result.push(this.interpolate(path[index - 1], path[index], ratio));
        return result;
      }
      result.push({ ...path[index] });
      travelled += segment;
    }
    return result;
  }

  pointAtFraction(path, fraction) {
    return this.pointAtDistance(path, this.pathLength(path) * this.clamp(fraction, 0, 1));
  }

  pointAtDistance(path, targetDistance) {
    if (!path.length) return { x: 0, y: 0 };
    if (path.length === 1 || targetDistance <= 0) return { ...path[0] };
    let travelled = 0;
    for (let index = 1; index < path.length; index += 1) {
      const segment = this.distance(path[index - 1], path[index]);
      if (travelled + segment >= targetDistance) {
        const ratio = (targetDistance - travelled) / Math.max(segment, 0.0001);
        return this.interpolate(path[index - 1], path[index], ratio);
      }
      travelled += segment;
    }
    return { ...path[path.length - 1] };
  }

  pathLength(path) {
    let length = 0;
    for (let index = 1; index < path.length; index += 1) {
      length += this.distance(path[index - 1], path[index]);
    }
    return length;
  }

  averageNearestDistance(source, target) {
    if (!source.length || !target.length) return Number.POSITIVE_INFINITY;
    let total = 0;
    for (const point of source) {
      let nearest = Number.POSITIVE_INFINITY;
      for (const candidate of target) nearest = Math.min(nearest, this.distance(point, candidate));
      total += nearest;
    }
    return total / source.length;
  }

  eventToMapPoint(event) {
    const ctm = this.dom.svg.getScreenCTM();
    if (!ctm) return null;
    const svgPoint = this.dom.svg.createSVGPoint();
    svgPoint.x = event.clientX;
    svgPoint.y = event.clientY;
    const mapped = svgPoint.matrixTransform(ctm.inverse());
    return { x: mapped.x, y: mapped.y };
  }

  pointInsideMap(point) {
    return point.x >= 0 && point.x <= MOVEMENT_MAP.width && point.y >= 0 && point.y <= MOVEMENT_MAP.height;
  }

  pointInsideSolidObstacle(point, padding = 0) {
    return this.level.obstacles.some((obstacle) => {
      if (obstacle.passable !== false) return false;
      if (obstacle.shape === "circle") return this.distance(point, obstacle) <= obstacle.radius + padding;
      return point.x >= obstacle.x - padding && point.x <= obstacle.x + obstacle.width + padding && point.y >= obstacle.y - padding && point.y <= obstacle.y + obstacle.height + padding;
    });
  }

  segmentBlocked(start, end) {
    return this.level.obstacles.some((obstacle) => {
      if (obstacle.passable !== false) return false;
      if (obstacle.shape === "circle") {
        return this.lineIntersectsCircle(start, end, { x: obstacle.x, y: obstacle.y }, obstacle.radius + 7);
      }
      return this.lineIntersectsRect(start, end, obstacle, 7);
    });
  }

  lineIntersectsRect(start, end, rectangle, padding = 0) {
    const left = rectangle.x - padding;
    const right = rectangle.x + rectangle.width + padding;
    const top = rectangle.y - padding;
    const bottom = rectangle.y + rectangle.height + padding;
    if (this.pointInRect(start, left, right, top, bottom) || this.pointInRect(end, left, right, top, bottom)) return true;
    const corners = [
      { x: left, y: top }, { x: right, y: top },
      { x: right, y: bottom }, { x: left, y: bottom }
    ];
    return corners.some((corner, index) => this.linesIntersect(start, end, corner, corners[(index + 1) % corners.length]));
  }

  pointInRect(point, left, right, top, bottom) {
    return point.x >= left && point.x <= right && point.y >= top && point.y <= bottom;
  }

  lineIntersectsCircle(start, end, center, radius) {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const lengthSquared = dx * dx + dy * dy;
    if (lengthSquared === 0) return this.distance(start, center) <= radius;
    const projection = this.clamp(((center.x - start.x) * dx + (center.y - start.y) * dy) / lengthSquared, 0, 1);
    const closest = { x: start.x + projection * dx, y: start.y + projection * dy };
    return this.distance(closest, center) <= radius;
  }

  linesIntersect(a, b, c, d) {
    const cross = (p, q, r) => (q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x);
    const onSegment = (p, q, r) => q.x >= Math.min(p.x, r.x) - 0.0001 && q.x <= Math.max(p.x, r.x) + 0.0001 && q.y >= Math.min(p.y, r.y) - 0.0001 && q.y <= Math.max(p.y, r.y) + 0.0001;
    const c1 = cross(a, b, c);
    const c2 = cross(a, b, d);
    const c3 = cross(c, d, a);
    const c4 = cross(c, d, b);
    if (((c1 > 0 && c2 < 0) || (c1 < 0 && c2 > 0)) && ((c3 > 0 && c4 < 0) || (c3 < 0 && c4 > 0))) return true;
    if (Math.abs(c1) < 0.0001 && onSegment(a, c, b)) return true;
    if (Math.abs(c2) < 0.0001 && onSegment(a, d, b)) return true;
    if (Math.abs(c3) < 0.0001 && onSegment(c, a, d)) return true;
    if (Math.abs(c4) < 0.0001 && onSegment(c, b, d)) return true;
    return false;
  }

  detectionClass(count) {
    if (count <= 0) return "detection-count-0";
    if (count === 1) return "detection-count-1";
    if (count === 2) return "detection-count-2";
    if (count === 3) return "detection-count-3";
    return "detection-count-4plus";
  }

  seededRandom(seed) {
    let state = seed >>> 0;
    return () => {
      state += 0x6D2B79F5;
      let value = state;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }

  interpolate(start, end, ratio) {
    return { x: start.x + (end.x - start.x) * ratio, y: start.y + (end.y - start.y) * ratio };
  }

  distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  clamp(value, minimum, maximum) {
    return Math.max(minimum, Math.min(maximum, value));
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

const MOVEMENT_BUILD_VERSION = "2.5.0-eighteen-level-campaign";
let movementGame = null;

window.addEventListener("error", (event) => showStandaloneError(event.error || event.message, MOVEMENT_BUILD_VERSION));
window.addEventListener("unhandledrejection", (event) => showStandaloneError(event.reason, MOVEMENT_BUILD_VERSION));

document.addEventListener("DOMContentLoaded", () => {
  try {
    languageManager.applyStaticText();
    movementGame = new FishMovementGame(languageManager, audioManager);
    movementGame.initialize();
    movementGame.activate();
    bindStandaloneControls(movementGame);
    movementGame.applyLanguage();
  } catch (error) {
    showStandaloneError(error, MOVEMENT_BUILD_VERSION);
  }
});

window.addEventListener("beforeunload", () => movementGame?.deactivate());
