# Fish Movement Reconstruction — Build 2.5.0

A dependency-free browser game for reconstructing a tagged fish route from fixed-distance tag pings and receiver detection counts.

## Current architecture

- `index.html`: interface shell, SVG map layers, controls, tutorial, result panel, and celebration.
- `style.css`: responsive field-notes theme, receiver radii, sonar pings, compact celebration, and multi-wave confetti.
- `core.js`: English/German localization and the Web Audio lo-fi soundtrack/effects engine.
- `game-data.js`: deterministic level templates, per-difficulty defaults, and per-level evidence tuning.
- `game.js`: path generation, receiver placement, Pointer Events drawing, scoring, progression, celebration, and campaign completion.

## Build 2.5.0 change

The campaign now contains **18 individual levels**:

| Difficulty | Levels | Evidence profile |
| --- | ---: | --- |
| Easy | 6 | 4–5 mostly separated receivers, 8–11 pings, broad readable paths |
| Medium | 6 | 5–6 receivers, moderate overlap, 11–14 pings, channel and obstacle decisions |
| Hard | 6 | 7–9 densely overlapping receivers, 15–22 pings, multi-obstacle route constraints |

### Easy campaign

1. Lagoon arc
2. River bend
3. Reed sweep
4. Open-water wave
5. Harbor glide
6. Delta lane

### Medium campaign

1. Rocky detour
2. Island channel
3. Sandbar turn
4. Twin islets
5. Marsh corridor
6. Current switchback

### Hard campaign

1. Estuary gates
2. Coastal thread
3. Reef maze
4. Tidal slalom
5. Gate weave
6. Research labyrinth

Each level has a unique seed, start and end orientation, path geometry, receiver placement profile, receiver count, radius, ping interval, environmental features, and obstacle arrangement.

## Preserved mechanics

- The route must start inside S and finish inside E.
- Receiver-count accuracy must reach at least 90%.
- 90–94% earns one star, 95–99% earns two stars, and 100% earns three stars.
- Route similarity remains diagnostic and does not block progression.
- Receiver radii remain visible at every difficulty.
- Target/live receiver counts are shown while drawing in levels 1–3 of each difficulty and hidden in levels 4–6.
- The newer lo-fi background soundtrack and distinct sound effects are unchanged.
- Every passed level launches confetti and the compact cheering-fish celebration.
- Completing all 18 unique levels launches the larger grand-finale confetti burst and trophy fanfare.
- After Hard level 6, the campaign resets to Easy level 1 and re-arms the final trophy fanfare.

## Run in VS Code

1. Open this folder in VS Code.
2. Start a local server, for example with the Live Server extension or `python -m http.server 8000`.
3. Open the served `index.html` in a modern browser.
4. Enable sound with the sound button after the page loads; browsers require a user gesture before Web Audio can begin.

## Focused test checklist

- Confirm the HUD begins at `1 / 18`.
- Play or advance through six Easy levels before Medium begins.
- Confirm Medium contains six levels before Hard begins.
- Confirm Hard level 6 is Research labyrinth and triggers the trophy fanfare after all previous levels have been completed.
- Compare level geometry and receiver patterns; no two levels should use the same route and obstacle layout.
- Verify live target/current counts appear only in levels 1–3 within each difficulty.
- Draw from S to E and verify receiver accuracy of at least 90% passes.
- Confirm ordinary level completion keeps the existing confetti, stars, cheering fish, and lo-fi soundtrack.
- Confirm the eighteenth unique completion creates the grand-finale confetti and trophy fanfare.
- Test English and German text, desktop and mobile widths, and the browser console.

## Verification

- `core.js`, `game-data.js`, and `game.js` pass `node --check`.
- The data set contains exactly 6 Easy, 6 Medium, and 6 Hard levels with 18 unique IDs.
- All 18 generated true paths remain inside the map and avoid solid obstacles.
- All 18 generated receiver sets satisfy their difficulty-specific active-count, count-variety, dominance, and overlap constraints.
- Sequential progression visits every level once, then resets to Easy level 1 and re-arms the final fanfare.
- See `TEST-RESULTS.txt` for the deterministic profile of every level.
