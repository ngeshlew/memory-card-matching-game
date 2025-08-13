# Memory Card Matching Game

A classic concentration/pairs game. Flip two cards at a time to find matching pairs. Clear the board with the fewest moves and fastest time.

## Live Demo

- Add a link here once deployed (e.g., GitHub Pages or Vercel)

## Features

- Multiple board sizes (4x4, 6x6, 8x8)
- Card sets (emoji, icons, numbers); easily add your own
- Timer, move counter, and best-score persistence (localStorage)
- Optional hint/preview mode and shuffle/restart
- Keyboard and screen reader friendly (ARIA, focus management)
- Light/Dark/System theme toggle
- Sound effects toggle (optional)

## How to Play

1. Click or select a card to flip it
2. Flip a second card; if they match, they remain face-up
3. If not a match, both flip back after a short delay
4. Repeat until all pairs are found

## Tech Stack

- HTML, CSS, and JavaScript
- No framework required; can be enhanced with a bundler (e.g., Vite) if desired

## Project Structure (suggested)

```text
.
├─ index.html
├─ src/
│  ├─ scripts/
│  │  ├─ game.(js|ts)        # game loop, matching logic
│  │  ├─ state.(js|ts)       # game state, timer, moves, persistence
│  │  └─ ui.(js|ts)          # DOM rendering and events
│  ├─ styles/
│  │  └─ main.css            # layout, themes, animations
│  ├─ assets/
│  │  └─ icons/              # card faces (SVG/PNG) or emoji mapping
│  └─ config.(js|ts)         # configurable options (board size, set, etc.)
├─ tests/
│  └─ game.spec.(js|ts)      # unit tests (optional)
├─ public/                   # static assets (optional)
├─ package.json              # only if using Node tooling
└─ README.md
```

## Getting Started

### Prerequisites

- Any modern browser
- Optional (for dev tooling): Node.js 18+ and npm/pnpm/yarn

### Run Locally (no tooling)

- Open `index.html` directly in your browser, or serve the folder via a simple static server, for example:

```bash
# Python
python3 -m http.server 5173
# or Node static server
npx serve .
```

Then open `http://localhost:5173`.

### Run Locally (with Node tooling)

```bash
# install dependencies (if package.json is present)
npm install

# start a dev server (if using a bundler like Vite)
npm run dev

# build for production
npm run build

# preview production build
npm run preview
```

## Configuration

Centralize game options in `src/config.(js|ts)`:

```ts
export const gameConfig = {
	boardSize: 4,              // 4, 6, or 8
	cardSet: "emoji",          // "emoji" | "icons" | "numbers" | custom
	shuffleSeed: null,         // number | null for random shuffles
	allowHints: true,          // enable hint/preview
	showTimer: true,
	soundsEnabled: true,
	theme: "system"            // "light" | "dark" | "system"
};
```

## Accessibility

- All interactive elements are reachable via keyboard (Tab/Shift+Tab)
- ARIA roles/states (e.g., `aria-pressed`, `aria-live`) for announcements
- Focus is managed when cards flip and when the game is won
- Color contrast meets WCAG AA; color-blind friendly palette options

## Testing (optional)

If tests are included:

```bash
npm test
```

## Deployment

- Static hosting works out-of-the-box (GitHub Pages, Netlify, Vercel)
- GitHub Pages: enable Pages (Settings → Pages) for the `main` branch or `docs/` folder
- If using a bundler, deploy the `dist/` output after `npm run build`

## Contributing

- Fork the repo and create a feature branch
- Add/adjust tests where appropriate
- Run linting and formatting before submitting a PR

```bash
npm run lint
npm run format
```

## Roadmap

- Additional themes and card sets
- Daily challenge mode (seeded puzzles)
- Multiplayer/versus mode

## License

MIT. Add a `LICENSE` file to confirm.