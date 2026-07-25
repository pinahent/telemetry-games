"use strict";

(function exposeTelemetryLogic(global) {
  const { DEFAULT_MAX_TAG_BURDEN_PERCENT, STUDY_REQUIREMENTS, FISH_CARDS, TOO_SMALL_ID } = global.GameData;
  const OUTPUT_RANK = Object.freeze({ low: 0, standard: 1, high: 2 });

  function calculateTagBurdenPercent(fish, tag) {
    if (!fish || !tag || !Number.isFinite(fish.weightGrams) || fish.weightGrams <= 0) return Number.NaN;
    return (tag.weightInAirGrams / fish.weightGrams) * 100;
  }

  function effectiveDimensions(tag, attachmentType) {
    if (attachmentType === "external") {
      return {
        diameterMm: tag.externalDiameterMm ?? tag.diameterMm,
        lengthMm: tag.externalLengthMm ?? tag.lengthMm
      };
    }
    return { diameterMm: tag.diameterMm, lengthMm: tag.lengthMm };
  }

  function evaluateTagForFish(fish, tag, requirement) {
    const reasons = [];
    const burdenPercent = calculateTagBurdenPercent(fish, tag);
    const dimensions = effectiveDimensions(tag, requirement.attachmentType);

    if (!tag.attachmentTypes.includes(requirement.attachmentType)) {
      reasons.push("wrong-attachment");
    }
    if (!fish.allowedAttachmentTypes.includes(requirement.attachmentType)) {
      reasons.push("fish-attachment-unsupported");
    }

    if (requirement.attachmentType === "internal") {
      const threshold = fish.maxTagBurdenPercent ?? DEFAULT_MAX_TAG_BURDEN_PERCENT;
      if (burdenPercent > threshold) reasons.push("too-heavy");
    } else if (
      Number.isFinite(fish.minimumExternalFishWeightGrams) &&
      fish.weightGrams < fish.minimumExternalFishWeightGrams
    ) {
      reasons.push("external-fish-too-small");
    }

    if (
      Number.isFinite(fish.anatomicalTagDiameterLimitMm) &&
      dimensions.diameterMm > fish.anatomicalTagDiameterLimitMm
    ) {
      reasons.push("too-wide");
    }
    if (
      Number.isFinite(fish.anatomicalTagLengthLimitMm) &&
      dimensions.lengthMm > fish.anatomicalTagLengthLimitMm
    ) {
      reasons.push("too-long");
    }
    if (tag.batteryDays < requirement.minimumBatteryDays) {
      reasons.push("battery-short");
    }
    for (const sensor of requirement.requiredSensors) {
      if (!tag.sensors.includes(sensor)) reasons.push(`missing-${sensor}`);
    }
    if ((OUTPUT_RANK[tag.outputClass] ?? -1) < (OUTPUT_RANK[requirement.outputClass] ?? 0)) {
      reasons.push("output-low");
    }

    return Object.freeze({
      valid: reasons.length === 0,
      reasons: Object.freeze(reasons),
      burdenPercent,
      dimensions
    });
  }

  function selectBestTag(fish, tags, requirement) {
    const evaluated = tags.map((tag) => ({ tag, evaluation: evaluateTagForFish(fish, tag, requirement) }));
    const valid = evaluated
      .filter((candidate) => candidate.evaluation.valid)
      .sort((a, b) =>
        a.tag.weightInAirGrams - b.tag.weightInAirGrams ||
        a.evaluation.dimensions.diameterMm - b.evaluation.dimensions.diameterMm ||
        a.evaluation.dimensions.lengthMm - b.evaluation.dimensions.lengthMm ||
        a.tag.batteryDays - b.tag.batteryDays
      );

    if (valid.length === 0) {
      return Object.freeze({
        id: TOO_SMALL_ID,
        type: "too-small",
        tag: null,
        evaluation: null,
        candidates: Object.freeze(evaluated)
      });
    }

    return Object.freeze({
      id: valid[0].tag.id,
      type: "tag",
      tag: valid[0].tag,
      evaluation: valid[0].evaluation,
      candidates: Object.freeze(evaluated)
    });
  }

  function getStudyRequirement(fish) {
    return STUDY_REQUIREMENTS[fish.studyRequirementId];
  }

  function getCorrectChoice(fish, tags) {
    return selectBestTag(fish, tags, getStudyRequirement(fish));
  }

  function createSeededRandom(seed = Date.now()) {
    let state = normalizeSeed(seed);
    return function random() {
      state += 0x6D2B79F5;
      let value = state;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }

  function normalizeSeed(seed) {
    if (Number.isFinite(seed)) return Number(seed) >>> 0;
    return String(seed).split("").reduce((accumulator, character) => {
      return Math.imul(accumulator ^ character.charCodeAt(0), 16777619) >>> 0;
    }, 2166136261);
  }

  function shuffle(items, random = Math.random) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const target = Math.floor(random() * (index + 1));
      [copy[index], copy[target]] = [copy[target], copy[index]];
    }
    return copy;
  }

  function generateFishSet(config, mode, random = Math.random) {
    const count = mode === "memory" ? config.memoryPairCount : config.directMatchFishCount;
    const fishById = new Map(FISH_CARDS.map((fish) => [fish.id, fish]));
    const mandatory = config.mandatoryFishIds.map((id) => fishById.get(id)).filter(Boolean);
    const mandatoryIds = new Set(mandatory.map((fish) => fish.id));
    const candidates = shuffle(
      config.fishPoolIds.map((id) => fishById.get(id)).filter((fish) => fish && !mandatoryIds.has(fish.id)),
      random
    );
    const result = [...mandatory, ...candidates.slice(0, Math.max(0, count - mandatory.length))];
    return shuffle(result, random).slice(0, count);
  }

  function createMemoryCards(fishCards, tags, random = Math.random) {
    const fishEntries = fishCards.map((fish) => ({
      id: `fish-${fish.id}`,
      type: "fish",
      fishId: fish.id
    }));

    const choiceCounts = new Map();
    const tagEntries = fishCards.map((fish) => {
      const choice = getCorrectChoice(fish, tags);
      const sequence = (choiceCounts.get(choice.id) || 0) + 1;
      choiceCounts.set(choice.id, sequence);
      return {
        id: `tag-${choice.id}-${sequence}`,
        type: "tag",
        choiceId: choice.id
      };
    });

    return shuffle([...fishEntries, ...tagEntries], random);
  }

  function cardsFormScientificMatch(firstCard, secondCard, fishCards, tags) {
    if (!firstCard || !secondCard || firstCard.type === secondCard.type) return false;
    const fishCard = firstCard.type === "fish" ? firstCard : secondCard;
    const tagCard = firstCard.type === "tag" ? firstCard : secondCard;
    const fish = fishCards.find((item) => item.id === fishCard.fishId);
    return Boolean(fish && getCorrectChoice(fish, tags).id === tagCard.choiceId);
  }

  function validateFishRecord(fish, allTags) {
    const errors = [];
    const requiredTextFields = ["id", "individualName", "scientificName", "visualKey", "studyRequirementId"];
    for (const field of requiredTextFields) {
      if (!fish[field] || typeof fish[field] !== "string") errors.push(`missing-${field}`);
    }
    if (!Number.isFinite(fish.lengthCm) || fish.lengthCm <= 0) errors.push("invalid-length");
    if (!Number.isFinite(fish.weightGrams) || fish.weightGrams <= 0) errors.push("invalid-weight");
    if (!Array.isArray(fish.sourceIds) || fish.sourceIds.length === 0) errors.push("missing-sources");
    const requirement = getStudyRequirement(fish);
    if (!requirement) errors.push("missing-requirement");
    if (requirement) {
      const choice = selectBestTag(fish, allTags, requirement);
      if (!choice || !choice.id) errors.push("missing-choice");
      const validChoices = allTags.filter((tag) => evaluateTagForFish(fish, tag, requirement).valid);
      if (choice.type === "tag" && validChoices.length === 0) errors.push("choice-inconsistent");
      if (choice.type === "too-small" && validChoices.length > 0) errors.push("too-small-inconsistent");
    }
    return errors;
  }

  function validateDataset(fishCards, tags) {
    const errors = [];
    const ids = new Set();
    for (const fish of fishCards) {
      if (ids.has(fish.id)) errors.push(`${fish.id}:duplicate-id`);
      ids.add(fish.id);
      for (const error of validateFishRecord(fish, tags)) errors.push(`${fish.id}:${error}`);
    }
    return errors;
  }

  function validateLevel(fishCards, tags) {
    const errors = [];
    for (const fish of fishCards) {
      const choice = getCorrectChoice(fish, tags);
      if (!choice || !choice.id) errors.push(`${fish.id}:no-answer`);
    }
    const memoryCards = createMemoryCards(fishCards, tags, createSeededRandom(73));
    if (!isMemoryBoardSolvable(memoryCards, fishCards, tags)) errors.push("memory-board-unsolvable");
    return errors;
  }

  function isMemoryBoardSolvable(memoryCards, fishCards, tags) {
    const required = new Map();
    for (const fish of fishCards) {
      const choiceId = getCorrectChoice(fish, tags).id;
      required.set(choiceId, (required.get(choiceId) || 0) + 1);
    }
    const available = new Map();
    for (const card of memoryCards) {
      if (card.type !== "tag") continue;
      available.set(card.choiceId, (available.get(card.choiceId) || 0) + 1);
    }
    if (memoryCards.filter((card) => card.type === "fish").length !== fishCards.length) return false;
    for (const [choiceId, count] of required) {
      if ((available.get(choiceId) || 0) !== count) return false;
    }
    return true;
  }


  function createMemoryState() {
    return Object.freeze({
      flippedCardIds: Object.freeze([]),
      matchedCardIds: Object.freeze([]),
      locked: false,
      turns: 0,
      mismatches: 0
    });
  }

  function flipMemoryState(state, cardId) {
    if (state.locked || state.matchedCardIds.includes(cardId) || state.flippedCardIds.includes(cardId) || state.flippedCardIds.length >= 2) {
      return state;
    }
    const flippedCardIds = [...state.flippedCardIds, cardId];
    return Object.freeze({
      ...state,
      flippedCardIds: Object.freeze(flippedCardIds),
      locked: flippedCardIds.length === 2,
      turns: state.turns + (flippedCardIds.length === 2 ? 1 : 0)
    });
  }

  function resolveMemoryState(state, memoryCards, fishCards, tags) {
    if (state.flippedCardIds.length !== 2) return state;
    const [firstId, secondId] = state.flippedCardIds;
    const first = memoryCards.find((card) => card.id === firstId);
    const second = memoryCards.find((card) => card.id === secondId);
    const matched = cardsFormScientificMatch(first, second, fishCards, tags);
    return Object.freeze({
      ...state,
      flippedCardIds: Object.freeze([]),
      matchedCardIds: matched
        ? Object.freeze([...state.matchedCardIds, firstId, secondId])
        : state.matchedCardIds,
      locked: false,
      mismatches: state.mismatches + (matched ? 0 : 1)
    });
  }

  global.TelemetryLogic = Object.freeze({
    OUTPUT_RANK,
    calculateTagBurdenPercent,
    effectiveDimensions,
    evaluateTagForFish,
    selectBestTag,
    getStudyRequirement,
    getCorrectChoice,
    createSeededRandom,
    shuffle,
    generateFishSet,
    createMemoryCards,
    cardsFormScientificMatch,
    validateFishRecord,
    validateDataset,
    validateLevel,
    isMemoryBoardSolvable,
    createMemoryState,
    flipMemoryState,
    resolveMemoryState
  });
})(globalThis);
