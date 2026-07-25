# Receiver Array — updated build

## Run in VS Code

1. Open this folder in VS Code.
2. Start a local web server. The VS Code **Live Server** extension works, or run:
   ```bash
   python3 -m http.server 8000
   ```
3. Open `http://localhost:8000` in a browser.

The project retains its existing p5.js CDN dependency, so the browser needs network access when the page first loads.

## Focused test checklist

- Select Easy, Medium, and Hard before starting; confirm receiver totals, radius footprints, HUD difficulty, and targets update. Hard must show 80%.
- Complete a level; confirm one cheering-fish/confetti celebration appears, the Next level button remains usable, and the effect disappears automatically.
- In multi-fish levels, click a moving fish; confirm the gold ping transfers immediately and follows that fish.
- Reach Level 5 to compare the smooth Lagoon Glider with the faster, sharper Reef Darter.
- Reach Level 9 to compare the pause-and-burst Looping Bream with the first two species.
- Retry, reset, advance levels, change difficulty, and restart from Level 1 while watching the browser console for errors.
- Enable the operating system's reduced-motion preference and repeat a successful level; the celebration and ping should use restrained/static motion.
