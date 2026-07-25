# Fish and Acoustic Tag Lab — Updated Edition

A framework-free educational browser game for matching individual fish with the smallest acoustic transmitter that meets a simplified research mission and welfare constraints.

## What changed in this edition

- Removed every fish fun-fact field and all fun-fact rendering.
- Added the supplied lo-fi MP3 as looping background music.
- Kept the soundtrack user-controlled because browsers block unsolicited audio playback.
- Removed elapsed-time tracking, timer display, time-based completion text and the untimed-mode toggle from Memory Mode.
- Rebuilt every species illustration as detailed inline SVG code.
- The SVG artwork is embedded directly in `illustrations.js`; no fish image files are required.
- Preserved turn counting, mismatches and best-turn tracking because those measure Memory efficiency without time pressure.

## Run in VS Code

The game uses classic browser scripts and does not require a build step.

1. Open this folder in VS Code.
2. Start a local server, for example with the **Live Server** extension, or run:

   ```bash
   python3 -m http.server 8000
   ```

3. Open `http://localhost:8000/index.html`.
4. Press **Music: off** once to start the soundtrack. This explicit click is required by normal browser autoplay policy.

Opening `index.html` directly also works in many browsers, but a local server is recommended.

## Automated tests

Run the logic tests with Node:

```bash
node tests.js
```

Or open `tests.html` in a browser.

The suite checks:

- tag-burden calculation;
- mass, anatomy, attachment, battery, output and sensor rejection;
- smallest-valid-tag selection;
- “Too small to tag” selection;
- all 18 fish records;
- Direct Match and Memory level solvability;
- duplicate tag classes;
- two-card locking and mismatch reset;
- correct-pair retention;
- clean restart state;
- difficulty-specific fish and pair counts.

## Project structure

- `index.html` — accessible page shell, controls, dialogs, game containers and the soundtrack element
- `style.css` — responsive field-notebook design and SVG illustration styling
- `core.js` — English/German localization, MP3 soundtrack controller, lightweight audio feedback and global error handling
- `game-data.js` — scientific source metadata, transmitter catalogue, missions, 18 fish individuals and difficulty configuration
- `illustrations.js` — original inline SVG comic-realistic drawings with species-specific morphology
- `compatibility.js` — burden calculation, compatibility rules, best-fit selection, seeded level generation and validation
- `game.js` — Direct Match and untimed Memory state machines, rendering, scoring, feedback and progression
- `assets/music/field-notes-lofi.mp3` — the user-provided soundtrack
- `tests.js` / `tests.html` — automated validation

## Illustration design

The fish artwork remains code. Each SVG includes species-specific body proportions and diagnostic visual features, including:

- deep silver clupeid bodies for herring and sprat;
- sprat ventral scutes;
- mackerel dorsal bands, two dorsal fins and finlets;
- three dorsal and two anal fins plus a chin barbel for Atlantic cod;
- the dark lateral line and shoulder mark of haddock;
- right-side eyes and orange spots for European plaice;
- the adipose fin and upper-body spots of Atlantic salmon;
- continuous median fins for European eel;
- separate dorsal fins for European sea bass;
- dorsal spines and no anal fin for spiny dogfish;
- rear-set dorsal fins and dense spots for small-spotted catshark;
- distinct shark and ray tail/disc forms;
- thorn rows and species-specific spotting on rays;
- the strongly curved lateral line and projecting lower jaw of pollack.

The drawings are educational comic illustrations, not diagnostic taxonomic plates.

## Scientific model

For internal tags, the introductory game uses:

```text
tag burden (%) = tag mass in air / fish body mass × 100
```

The default teaching threshold is 2%. The game states prominently that this is a conservative educational rule of thumb, not a universal biological law or a field protocol. Anatomy, attachment type, battery duration, sensor needs and output class are also checked.

## Soundtrack rights

`assets/music/field-notes-lofi.mp3` is the exact audio file supplied for this update. Confirm that you have the necessary license or permission before publishing or redistributing the game.

## Important limitations

- The named fish are constructed teaching individuals, not measured study animals.
- Their sizes and masses are chosen to be plausible within species profiles and to create uniquely defensible answers under the stated simplified rules.
- Real transmitter selection requires species- and life-stage-specific evidence, permits, ethical approval, trained personnel, study-specific range testing and manufacturer consultation.
- The original SVG drawings are educational card illustrations, not diagnostic taxonomic plates.

All source records include an access date and are available in the in-game **About the science** panel and on each fish card.
