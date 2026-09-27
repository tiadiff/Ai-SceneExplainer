# Scene Explainer - Opera GX Extension 🎬

A browser extension (designed for Opera GX) that gives you immediate explanations of movie scenes you are watching on streaming sites like StreamingCommunity. It does this by silently querying your personal Google Gemini Advanced account, completely free and invisible.

<img width="321" height="154" alt="{24340832-EB8C-4349-9A94-E1A165BF364C}" src="https://github.com/user-attachments/assets/0e6c47cc-174d-4fda-bf80-2988530ae043" />

## Features
- **Cinematic Overlay:** An elegant, Netflix-style red button and a glassmorphism explanation box directly integrated into the video player.
- **Silent Scraping:** Uses a clever trick to query the `gemini.google.com` web interface (utilizing your active subscription) without paying for Developer APIs. No token limits!
- **Smart Teleportation:** Bypasses modern browsers' background tab throttling by temporarily launching Gemini in the active tab and instantly teleporting you back to the movie.
- **Statistics Dashboard:** A dedicated popup to track how many scenes the AI has explained for you, featuring a dark cinematic aesthetic.

## How to install locally
1. Download or clone this repository.
2. Open Opera GX (or Google Chrome) and go to the extensions page by typing `opera://extensions` (or `chrome://extensions`).
3. Enable **Developer Mode** (top right corner).
4. Click on **Load unpacked**.
5. Select the `SceneExplainer` folder.
6. The extension is now active and ready to use!

## Code Structure
- `manifest.json`: The core of the extension (Manifest V3).
- `content.js` and `content.css`: Manage the UI overlay injected on top of the movie player (the "Spiega Scena" button and final notification).
- `background.js`: The orchestrator that coordinates communication between the movie tab and the Gemini page.
- `gemini_scraper.js`: The ninja script that injects into the Gemini page, simulates paste (bypassing anti-bot protections), and presses enter.
- `popup.html`, `popup.css`, `popup.js`: The extension's statistics dashboard, designed with a premium style.

---
*Built for an uninterrupted viewing experience.*
