# Memory Card Matching Game

A 4x4 memory/concentration game built with plain HTML, CSS, and JavaScript. Flip two cards at a time to find matching pairs. Track your time, moves, and score.

## Live Demo

- GitHub Pages: https://ngeshlew.github.io/memory-card-matching-game/

## Features

- 4x4 grid of cards that can be flipped
- Each card hides an emoji icon until flipped
- Players flip two cards per move to find matches
- Matching pairs remain face-up; non-matches flip back
- Game ends when all matches are found
- Timer and move counter to track performance
- Simple scoring: higher score for fewer moves and faster time
- Best score/time/moves persisted to localStorage
- Keyboard and screen reader friendly

## Tech Stack

- HTML, CSS, JavaScript (no frameworks)
- Static site; deploys to GitHub Pages via Actions

## Project Structure

```text
.
├─ index.html                # markup and UI containers
├─ styles/
│  └─ main.css               # layout, theme, card animations
├─ scripts/
│  └─ game.js                # game logic, timer, moves, scoring, persistence
├─ .github/
│  └─ workflows/
│     └─ deploy.yml          # GitHub Pages deployment workflow
├─ LICENSE                   # MIT License
└─ README.md
```

## How to Play

1. Click or focus+Enter/Space on a card to flip it
2. Flip a second card; if they match, both stay face-up
3. If they do not match, both flip back after a short delay
4. Repeat until all pairs are found

## Scoring

- Moves increment when the second card of a pair is flipped
- Score updates every second after the first flip
- Formula: `score = floor(10000 / (elapsedSeconds * moves))`, minimum 0

## Run Locally

- Easiest: open `index.html` directly in your browser, or serve the folder:

```bash
# Python
python3 -m http.server 5173
# Node (temporary static server)
npx serve .
```

Then visit `http://localhost:5173`.

## Accessibility

- Buttons for cards, reachable via keyboard
- Focus styles and `aria-live` updates
- Persistent best stats (score, time, moves) shown after winning

## Deployment (GitHub Pages)

- Automatic on every push to `main` via `.github/workflows/deploy.yml`
- The workflow uploads the repository as a Pages artifact and deploys it
- Manage deployments and logs under Actions → Deploy static site to Pages

## License

MIT — see `LICENSE`.
