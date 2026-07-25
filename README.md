# Telemetry Games — combined GitHub Pages site

This project combines three independent browser games into one website:

1. **Receiver Array** — `games/receiver-array/`
2. **Fish Path Reconstruction** — `games/fish-path/`
3. **Fish Tag Matching / Memory** — `games/memory-cards/`

The main `index.html` is the game hub. Three small icons in the upper-right corner switch between the games. They are part of the game page and scroll out of view normally; they are not fixed or sticky. Each game runs in an `iframe`, so its JavaScript and CSS remain separate from the other games.

## Project structure

```text
TelemetryGames-GitHub-Pages/
├── index.html                 main page and game switcher
├── hub.css                    switcher and page layout
├── hub.js                     game-switching logic
├── .nojekyll                  serves the files as a plain static site
├── 404.html                   simple page-not-found screen
└── games/
    ├── receiver-array/
    ├── fish-path/
    └── memory-cards/
```

## Test on your computer first

Do not rely only on double-clicking `index.html`. A local web server behaves more like GitHub Pages and avoids browser restrictions connected with `file://` addresses.

### Easy method: VS Code Live Server

1. Extract the ZIP file.
2. Open the extracted `TelemetryGames-GitHub-Pages` folder in VS Code.
3. Open the **Extensions** view on the left.
4. Search for **Live Server** by Ritwick Dey and install it.
5. In VS Code's file list, right-click the root `index.html`.
6. Select **Open with Live Server**.
7. Test all three switcher buttons, language controls, audio controls, and game interactions.

### Alternative: Python local server

Open a terminal in the project folder and run:

```bash
python -m http.server 8000
```

Then open this address in a browser:

```text
http://localhost:8000
```

Stop the server with `Ctrl + C`.

# Publish with GitHub Pages

## Method A — upload through the GitHub website

This is the easiest method when you do not want to use Git commands.

### 1. Create the repository

1. Sign in to GitHub.
2. Select the **+** menu in the upper-right corner.
3. Select **New repository**.
4. Enter a repository name, for example `telemetry-games`.
5. Choose the repository visibility you want and that your GitHub plan supports for Pages.
6. Select **Create repository**.

### 2. Upload the site files

1. Extract `TelemetryGames-GitHub-Pages.zip` on your computer.
2. Open the extracted folder.
3. In the empty GitHub repository, select **uploading an existing file** or **Add file → Upload files**.
4. Upload the **contents inside** the extracted folder.
5. Make sure the GitHub repository's first level directly contains:
   - `index.html`
   - `hub.css`
   - `hub.js`
   - `games`
6. Do not upload one extra outer folder around those files. GitHub Pages must be able to find `index.html` at the selected publishing root.
7. Enter a commit message such as `Add combined telemetry games`.
8. Select **Commit changes**.

### 3. Turn on GitHub Pages

1. Open the repository.
2. Select **Settings**.
3. In the left sidebar, under **Code and automation**, select **Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
5. Select branch **main**.
6. Select folder **/(root)**.
7. Select **Save**.
8. Return to this Pages screen after the deployment completes. GitHub displays the published address there.

For a repository called `telemetry-games`, the normal project-site address is:

```text
https://YOUR-USERNAME.github.io/telemetry-games/
```

## Method B — upload with Git in the VS Code terminal

Use this when Git is installed and you want an easier update workflow later.

### 1. Create an empty GitHub repository

Create a repository such as `telemetry-games`. To make the first push simpler, do not add a README, `.gitignore`, or license while creating it, because this project already contains files.

### 2. Open the correct folder

In VS Code, open the extracted `TelemetryGames-GitHub-Pages` folder. Open **Terminal → New Terminal**. The terminal must be inside the folder that directly contains `index.html`.

### 3. Create the local Git repository

Run these commands one at a time:

```bash
git init
git add .
git commit -m "Add combined telemetry games"
git branch -M main
```

### 4. Connect it to GitHub

Copy your repository URL from GitHub, then run:

```bash
git remote add origin https://github.com/YOUR-USERNAME/telemetry-games.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username. GitHub may ask you to sign in through the browser or use your configured authentication method.

### 5. Enable Pages

Use **Settings → Pages → Deploy from a branch → main → /(root) → Save**.

# Updating the website later

## With Git

After changing files in VS Code, run:

```bash
git add .
git commit -m "Update telemetry games"
git push
```

GitHub Pages automatically starts a new deployment from the configured branch.

## Without Git

Open the GitHub repository, select the file that needs changing, or use **Add file → Upload files**, then commit the replacement files.

# Important rules

- Keep `index.html`, `hub.css`, and `hub.js` at the repository root.
- Keep the three game folders inside `games/`.
- GitHub Pages file names are case-sensitive. `Game.js` and `game.js` are different names.
- Keep each game folder's own `index.html` and relative asset paths.
- `.nojekyll` tells GitHub Pages to serve this as a normal static site without Jekyll processing.
- The Receiver Array game loads p5.js from jsDelivr and automatically tries unpkg if the first CDN fails. It still needs an internet connection unless you later add a local p5.js file.
- The projects load Google Fonts from the internet. They still use fallback fonts if Google Fonts cannot load.
- Do not use absolute local computer paths such as `C:\Users\...` in HTML, CSS, or JavaScript.

# Troubleshooting

## The website shows a 404 page

- Confirm Pages is enabled for `main` and `/(root)`.
- Confirm `index.html` is directly at the repository root.
- Confirm you opened the complete project URL, including the repository name.
- Check the repository's **Actions** tab for a failed Pages deployment.

## The main page opens but a game is blank

- Open the browser developer tools with `F12` and inspect the **Console** tab.
- Check that the relevant folder still contains its `index.html`, CSS, JavaScript, and assets.
- Check capitalization in every path.
- For the Receiver Array game, confirm the browser can access either jsDelivr or unpkg. If both are blocked, the page now shows a clear drawing-library error instead of remaining behind the hub loading screen.

## Changes are not visible

- Wait for the newest Pages deployment to finish.
- Refresh with `Ctrl + F5` on Windows/Linux or `Cmd + Shift + R` on macOS.
- Confirm your latest commit is on the branch configured under **Settings → Pages**.

# Keyboard shortcuts in the game hub

- `1` — Receiver Array
- `2` — Fish Path
- `3` — Memory Cards
