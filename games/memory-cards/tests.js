"use strict";

(function runTelemetryTests(global) {
  if (typeof module !== "undefined" && module.exports && !global.GameData) {
    require("./game-data.js");
    require("./compatibility.js");
    require("./illustrations.js");
  }

  const { FISH_CARDS, TAG_CATALOGUE, DIFFICULTY_SETTINGS, STUDY_REQUIREMENTS, TOO_SMALL_ID } = global.GameData;
  const {
    calculateTagBurdenPercent,
    evaluateTagForFish,
    getCorrectChoice,
    generateFishSet,
    createMemoryCards,
    cardsFormScientificMatch,
    createSeededRandom,
    validateDataset,
    validateLevel,
    isMemoryBoardSolvable,
    createMemoryState,
    flipMemoryState,
    resolveMemoryState
  } = global.TelemetryLogic;

  const tests = [];
  function test(name, callback) { tests.push({ name, callback }); }
  function assert(condition, message = "Assertion failed") { if (!condition) throw new Error(message); }
  function equal(actual, expected, message = "Values differ") {
    if (actual !== expected) throw new Error(`${message}: expected ${expected}, received ${actual}`);
  }
  function near(actual, expected, tolerance = 1e-9, message = "Values differ") {
    if (Math.abs(actual - expected) > tolerance) throw new Error(`${message}: expected ${expected}, received ${actual}`);
  }
  const fish = (id) => FISH_CARDS.find((item) => item.id === id);
  const tag = (id) => TAG_CATALOGUE.find((item) => item.id === id);

  test("Tag burden is calculated correctly", () => {
    near(calculateTagBurdenPercent({ weightGrams: 200 }, { weightInAirGrams: 3.6 }), 1.8);
  });

  test("An overweight internal tag is rejected", () => {
    const result = evaluateTagForFish(fish("herring-rose"), tag("v6"), STUDY_REQUIREMENTS.shortPresence);
    assert(!result.valid);
    assert(result.reasons.includes("too-heavy"));
  });

  test("An incompatible attachment type is rejected", () => {
    const result = evaluateTagForFish(fish("dogfish-otto"), tag("v13"), STUDY_REQUIREMENTS.externalLong);
    assert(!result.valid);
    assert(result.reasons.includes("wrong-attachment"));
  });

  test("Insufficient battery life is rejected", () => {
    const result = evaluateTagForFish(fish("cod-peter"), tag("v9tp"), STUDY_REQUIREMENTS.longTemperature);
    assert(!result.valid);
    assert(result.reasons.includes("battery-short"));
  });

  test("A missing required sensor is rejected", () => {
    const result = evaluateTagForFish(fish("mackerel-marta"), tag("v6"), STUDY_REQUIREMENTS.temperatureSeason);
    assert(!result.valid);
    assert(result.reasons.includes("missing-temperature"));
  });

  test("The smallest suitable tag is selected", () => {
    equal(getCorrectChoice(fish("mackerel-marta"), TAG_CATALOGUE).id, "v7tp");
  });

  test("Too small to tag is returned correctly", () => {
    equal(getCorrectChoice(fish("sprat-noor"), TAG_CATALOGUE).id, TOO_SMALL_ID);
  });

  test("Every fish record produces one defensible answer", () => {
    equal(validateDataset(FISH_CARDS, TAG_CATALOGUE).length, 0);
    for (const record of FISH_CARDS) assert(Boolean(getCorrectChoice(record, TAG_CATALOGUE).id));
  });

  test("Every generated Direct Match level is solvable", () => {
    for (const [name, config] of Object.entries(DIFFICULTY_SETTINGS)) {
      const tags = config.tagIds.map(tag);
      for (let seed = 1; seed <= 20; seed += 1) {
        const level = generateFishSet(config, "sorting", createSeededRandom(seed));
        equal(level.length, config.directMatchFishCount, `${name} fish count`);
        equal(validateLevel(level, tags).length, 0, `${name} validation`);
      }
    }
  });

  test("Every generated Memory board is solvable", () => {
    for (const [name, config] of Object.entries(DIFFICULTY_SETTINGS)) {
      const tags = config.tagIds.map(tag);
      for (let seed = 1; seed <= 20; seed += 1) {
        const level = generateFishSet(config, "memory", createSeededRandom(seed));
        const board = createMemoryCards(level, tags, createSeededRandom(seed + 500));
        equal(level.length, config.memoryPairCount, `${name} pair count`);
        assert(isMemoryBoardSolvable(board, level, tags), `${name} seed ${seed} is unsolvable`);
      }
    }
  });

  test("Duplicate tag classes remain interchangeable", () => {
    const level = [fish("mackerel-marta"), fish("plaice-raya")];
    const tags = TAG_CATALOGUE;
    const board = createMemoryCards(level, tags, createSeededRandom(9));
    const fishCard = board.find((card) => card.type === "fish" && card.fishId === "mackerel-marta");
    const duplicateTag = board.find((card) => card.type === "tag" && card.choiceId === "v7tp");
    assert(cardsFormScientificMatch(fishCard, duplicateTag, level, tags));
    equal(board.filter((card) => card.type === "tag" && card.choiceId === "v7tp").length, 2);
  });

  test("No more than two memory cards can be revealed", () => {
    let state = createMemoryState();
    state = flipMemoryState(state, "a");
    state = flipMemoryState(state, "b");
    const afterThird = flipMemoryState(state, "c");
    equal(afterThird.flippedCardIds.length, 2);
    assert(afterThird.locked);
  });

  test("Incorrect memory cards turn face down", () => {
    const level = [fish("herring-henk"), fish("mackerel-marta")];
    const board = createMemoryCards(level, TAG_CATALOGUE, createSeededRandom(5));
    const first = board.find((card) => card.type === "fish" && card.fishId === "herring-henk");
    const wrong = board.find((card) => card.type === "tag" && card.choiceId === "v7tp");
    let state = createMemoryState();
    state = flipMemoryState(state, first.id);
    state = flipMemoryState(state, wrong.id);
    state = resolveMemoryState(state, board, level, TAG_CATALOGUE);
    equal(state.flippedCardIds.length, 0);
    equal(state.matchedCardIds.length, 0);
    equal(state.mismatches, 1);
  });

  test("Correct memory pairs remain matched", () => {
    const level = [fish("herring-henk")];
    const board = createMemoryCards(level, TAG_CATALOGUE, createSeededRandom(7));
    const fishCard = board.find((card) => card.type === "fish");
    const tagCard = board.find((card) => card.type === "tag");
    let state = createMemoryState();
    state = flipMemoryState(state, fishCard.id);
    state = flipMemoryState(state, tagCard.id);
    state = resolveMemoryState(state, board, level, TAG_CATALOGUE);
    equal(state.matchedCardIds.length, 2);
    assert(state.matchedCardIds.includes(fishCard.id));
    assert(state.matchedCardIds.includes(tagCard.id));
  });

  test("Restart state clears transient card state", () => {
    const state = createMemoryState();
    equal(state.flippedCardIds.length, 0);
    equal(state.matchedCardIds.length, 0);
    equal(state.turns, 0);
    equal(state.mismatches, 0);
    assert(!state.locked);
  });


  test("Fish records no longer contain fun facts", () => {
    for (const record of FISH_CARDS) assert(!Object.prototype.hasOwnProperty.call(record, "funFact"), `${record.id} still contains funFact`);
  });

  test("Every species uses embedded SVG illustration code", () => {
    const render = global.FishIllustrations?.renderFishIllustration;
    assert(typeof render === "function", "Illustration renderer unavailable");
    for (const record of FISH_CARDS) {
      const svg = render(record.visualKey);
      assert(svg.startsWith("<svg"), `${record.id} did not render SVG`);
      assert(svg.includes(`species-svg--${record.visualKey}`), `${record.id} used the wrong species drawing`);
    }
  });

  test("Memory logic contains no elapsed-time state", () => {
    const state = createMemoryState();
    assert(!Object.prototype.hasOwnProperty.call(state, "elapsedSeconds"));
    assert(!Object.prototype.hasOwnProperty.call(state, "timerStartedAt"));
    assert(!Object.prototype.hasOwnProperty.call(state, "timerInterval"));
  });

  test("Difficulty produces configured fish and pair counts", () => {
    for (const config of Object.values(DIFFICULTY_SETTINGS)) {
      equal(generateFishSet(config, "sorting", createSeededRandom(1)).length, config.directMatchFishCount);
      equal(generateFishSet(config, "memory", createSeededRandom(2)).length, config.memoryPairCount);
    }
  });

  const results = tests.map(({ name, callback }) => {
    try {
      callback();
      return { name, passed: true, error: "" };
    } catch (error) {
      return { name, passed: false, error: error instanceof Error ? error.message : String(error) };
    }
  });

  function renderResults() {
    const container = document.getElementById("testResults");
    const summary = document.getElementById("testSummary");
    if (!container || !summary) return;
    const passed = results.filter((result) => result.passed).length;
    summary.textContent = `${passed} / ${results.length} tests passed`;
    summary.className = passed === results.length ? "test-summary passed" : "test-summary failed";
    container.innerHTML = results.map((result) => `
      <li class="${result.passed ? "passed" : "failed"}">
        <strong>${result.passed ? "✓" : "✕"} ${escapeHtml(result.name)}</strong>
        ${result.error ? `<pre>${escapeHtml(result.error)}</pre>` : ""}
      </li>`).join("");
  }

  function escapeHtml(value) {
    return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", renderResults);
    else renderResults();
  }

  if (typeof module !== "undefined" && module.exports) {
    const failed = results.filter((result) => !result.passed);
    for (const result of results) console.log(`${result.passed ? "PASS" : "FAIL"} ${result.name}${result.error ? ` — ${result.error}` : ""}`);
    if (failed.length) process.exitCode = 1;
    module.exports = results;
  }
})(globalThis);
