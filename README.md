# El Pollo Loco 🐔

A 2D jump-and-run browser game built with vanilla JavaScript, HTML5 Canvas, and CSS — developed as part of the **Developer Akademie** web development training program.

---

## About the Project

El Pollo Loco is a classic side-scrolling game where you control **Pepe**, a character who fights through waves of chickens and ultimately faces the fearsome end boss — El Pollo Loco himself. Collect coins and salsa bottles, throw bottles at enemies, and survive to win!

---

## Features

- **Object-Oriented JavaScript** — Game logic built entirely with ES6 classes
- **HTML5 Canvas** rendering
- **3 Difficulty Levels** — Easy, Medium, Hard (affects enemy count, collectibles, and level length)
- **Audio System** — Background music and sound effects with volume control and mute option
- **Multiple Themes** — Customizable visual themes
- **Full Screen Support**
- **Pause / Resume** functionality
- **Mobile Ready** — On-screen touch controls and portrait-mode warning
- **Settings persisted** via `localStorage`
- **JSDoc** documentation included

---

## Gameplay

### Objective

Navigate through the level, collect coins and bottles, defeat enemies by jumping on them or throwing bottles, and beat the end boss to win.

### Keyboard Controls

| Key | Action |
|-----|--------|
| `→` Arrow Right | Move right |
| `←` Arrow Left | Move left |
| `Space` / `↑` Arrow Up | Jump |
| `D` | Throw bottle |

### Mobile Controls

On-screen buttons are provided for moving left/right, jumping, and throwing.

---

## Project Structure

```
el-pollo-loco/
├── index.html          # Start screen
├── game.html           # Game canvas & controls
├── options.html        # Difficulty, audio & theme settings
├── help.html           # Controls & gameplay guide
├── impressum.html      # Legal notice
├── privacy.html        # Privacy policy
├── classes/            # All game classes (OOP)
│   ├── character.class.js
│   ├── endboss.class.js
│   ├── chicken.class.js
│   ├── bottle.class.js
│   ├── coin.class.js
│   ├── world.class.js
│   └── ...
├── js/                 # Game logic & utilities
│   ├── game.js
│   ├── difficultySettings.js
│   ├── localStorage.js
│   └── ...
├── styles/             # CSS stylesheets
├── audio/              # Sound files
├── img/                # Game sprites & backgrounds
└── jsDocs/             # Generated JSDoc documentation
```

---

## Getting Started

No build tools or dependencies required. Simply open `index.html` in a modern browser.

```bash
# Clone the repository
git clone https://github.com/enricohoffmann/el-pollo-loco.git

# Open the start page
open index.html
```

> For full audio support, serve the project via a local web server (e.g. VS Code Live Server, `npx serve`, or similar) rather than opening the file directly in the browser.

---

## Technologies Used

- HTML5 / CSS3
- JavaScript (ES6+, OOP, Canvas API)
- Web Audio API
- localStorage API

---

## Educational Context

This project was developed as a graded portfolio project during the **web development training at [Developer Akademie](https://developerakademie.com/)**. The goal was to demonstrate proficiency in object-oriented JavaScript, game loop design, and DOM manipulation without the use of any external libraries or frameworks.

---

## License

This project is for educational purposes. Game assets (sprites, audio) are provided by Developer Akademie and remain their respective property.
