(() => {
  "use strict";

  const games = {
    "receiver-array": {
      label: "Receiver Array",
      path: "games/receiver-array/index.html",
      title: "Receiver Array game",
      icon: `
        <circle cx="8" cy="10" r="2.4"></circle>
        <circle cx="16" cy="7" r="2.4"></circle>
        <circle cx="24" cy="11" r="2.4"></circle>
        <circle cx="11" cy="22" r="2.4"></circle>
        <circle cx="22" cy="23" r="2.4"></circle>
        <path d="M4 10c2-4 6-6 12-6s10 2 12 7M5 24c4 3 8 4 12 4 5 0 9-1 11-4"></path>`
    },
    "fish-path": {
      label: "Fish Path",
      path: "games/fish-path/index.html",
      title: "Fish Path Reconstruction game",
      icon: `
        <path d="M5 25c3-9 6-15 12-15 4 0 5 3 8 3 2 0 3-2 3-5"></path>
        <circle cx="5" cy="25" r="2.6"></circle>
        <circle cx="17" cy="10" r="2.6"></circle>
        <circle cx="28" cy="8" r="2.6"></circle>
        <path d="m23 6 5 2-3 5"></path>`
    },
    "memory-cards": {
      label: "Memory Cards",
      path: "games/memory-cards/index.html",
      title: "Fish Tag Matching and Memory game",
      icon: `
        <rect x="5" y="8" width="15" height="19" rx="2"></rect>
        <rect x="12" y="5" width="15" height="19" rx="2"></rect>
        <path d="M17 12h5M17 16h5M10 15l2 2 4-5"></path>`
    }
  };

  const frame = document.getElementById("gameFrame");
  let activeGame = "receiver-array";

  function validGameName(value) {
    return Object.prototype.hasOwnProperty.call(games, value) ? value : null;
  }

  function requestedGame() {
    const hashGame = validGameName(window.location.hash.replace(/^#/, ""));
    if (hashGame) return hashGame;

    try {
      return validGameName(window.localStorage.getItem("telemetry-active-game"));
    } catch (error) {
      return null;
    }
  }

  function switcherStyles() {
    return `
      .telemetry-game-switcher {
        position: absolute;
        z-index: 1000;
        top: 8px;
        right: max(10px, calc((100% - 1500px) / 2 + 10px));
        display: flex;
        gap: 5px;
        margin: 0;
        padding: 0;
      }

      .telemetry-game-switcher button {
        width: 34px;
        height: 34px;
        display: grid;
        place-items: center;
        padding: 0;
        border: 1px solid rgba(24, 49, 59, 0.28);
        border-radius: 50%;
        color: #18313b;
        background: rgba(255, 253, 247, 0.7);
        box-shadow: 1px 2px 0 rgba(24, 49, 59, 0.1);
        cursor: pointer;
        opacity: 0.72;
        transition: opacity 120ms ease, background 120ms ease, transform 120ms ease;
      }

      .telemetry-game-switcher button:hover,
      .telemetry-game-switcher button:focus-visible {
        opacity: 1;
        background: rgba(255, 253, 247, 0.96);
        outline: 2px solid rgba(23, 111, 135, 0.45);
        outline-offset: 2px;
        transform: translateY(-1px);
      }

      .telemetry-game-switcher button[aria-pressed="true"] {
        color: #fffdf7;
        border-color: #18313b;
        background: #18313b;
        opacity: 0.92;
      }

      .telemetry-game-switcher svg {
        width: 20px;
        height: 20px;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.8;
        stroke-linecap: round;
        stroke-linejoin: round;
        pointer-events: none;
      }

      @media (max-width: 620px) {
        .telemetry-game-switcher {
          top: 5px;
          right: 7px;
          gap: 4px;
        }

        .telemetry-game-switcher button {
          width: 31px;
          height: 31px;
        }

        .telemetry-game-switcher svg {
          width: 18px;
          height: 18px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .telemetry-game-switcher button { transition: none; }
      }
    `;
  }

  function injectSwitcher() {
    const doc = frame.contentDocument;
    if (!doc || !doc.body || !doc.head) return;

    const oldSwitcher = doc.getElementById("telemetryGameSwitcher");
    if (oldSwitcher) oldSwitcher.remove();

    const oldStyles = doc.getElementById("telemetryGameSwitcherStyles");
    if (oldStyles) oldStyles.remove();

    const style = doc.createElement("style");
    style.id = "telemetryGameSwitcherStyles";
    style.textContent = switcherStyles();
    doc.head.appendChild(style);

    const nav = doc.createElement("nav");
    nav.id = "telemetryGameSwitcher";
    nav.className = "telemetry-game-switcher";
    nav.setAttribute("aria-label", "Choose a game");

    Object.entries(games).forEach(([gameName, game]) => {
      const button = doc.createElement("button");
      button.type = "button";
      button.dataset.game = gameName;
      button.title = game.label;
      button.setAttribute("aria-label", game.label);
      button.setAttribute("aria-pressed", String(gameName === activeGame));
      button.innerHTML = `<svg viewBox="0 0 32 32" aria-hidden="true">${game.icon}</svg>`;
      button.addEventListener("click", () => showGame(gameName));
      nav.appendChild(button);
    });

    doc.body.prepend(nav);
  }

  function showGame(gameName, options = {}) {
    const game = games[gameName];
    if (!game) return;

    const changed = activeGame !== gameName || frame.getAttribute("src") !== game.path;
    activeGame = gameName;
    frame.title = game.title;
    document.title = `${game.label} · Telemetry Games`;

    if (changed) {
      frame.src = game.path;
      watchFrameDocument();
    } else {
      watchFrameDocument();
    }

    if (!options.keepHash && window.location.hash !== `#${gameName}`) {
      history.replaceState(null, "", `#${gameName}`);
    }

    try {
      window.localStorage.setItem("telemetry-active-game", gameName);
    } catch (error) {
      // The hub still works when storage is unavailable.
    }
  }

  let frameWatchTimer = null;

  function watchFrameDocument() {
    if (frameWatchTimer) window.clearInterval(frameWatchTimer);

    const startedAt = Date.now();
    frameWatchTimer = window.setInterval(() => {
      try {
        const doc = frame.contentDocument;
        if (doc && doc.head && doc.body && doc.URL !== "about:blank") {
          injectSwitcher();
          window.clearInterval(frameWatchTimer);
          frameWatchTimer = null;
        }
      } catch (error) {
        // This website uses same-origin local pages, but keep the hub safe if that changes.
      }

      if (Date.now() - startedAt > 15000 && frameWatchTimer) {
        window.clearInterval(frameWatchTimer);
        frameWatchTimer = null;
      }
    }, 50);
  }

  frame.addEventListener("load", () => {
    injectSwitcher();
  });

  window.addEventListener("hashchange", () => {
    const hashGame = validGameName(window.location.hash.replace(/^#/, ""));
    if (hashGame && hashGame !== activeGame) showGame(hashGame, { keepHash: true });
  });

  window.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const shortcuts = { "1": "receiver-array", "2": "fish-path", "3": "memory-cards" };
    const gameName = shortcuts[event.key];
    if (!gameName) return;
    event.preventDefault();
    showGame(gameName);
  });

  showGame(requestedGame() || "receiver-array");
})();
