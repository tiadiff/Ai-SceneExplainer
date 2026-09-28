# Scene Explainer - Opera GX Extension

A lightweight, cinematic browser extension (designed for Opera GX and Chromium browsers) that gives you immediate, spoiler-free explanations of movie and series scenes you are watching on streaming sites (such as StreamingCommunity and YouTube). It silently queries your personal Google Gemini account in the background—completely free, with zero API token costs.

<img width="303" height="264" alt="{06B3925D-481F-4E4C-9E3F-964DF816EE8F}" src="https://github.com/user-attachments/assets/85834a94-6740-406a-aa6e-7d7f78c6ca42" />


## Features

- **Cinematic Overlay:** An elegant, Netflix-inspired dark glassmorphism card directly integrated into the video player interface.
- **Draggable & Dockable Widget:** Freely drag the widget vertically along the screen. Dragging towards the left or right half automatically docks and mirrors the widget flush against the corresponding viewport edge. Your preferred position and docked side are saved automatically in browser storage.
- **Scene Backstory & Suggested Follow-up:** Every scene explanation concludes with an intelligent follow-up question suggested by Gemini. Clicking the suggested text prompts the AI to explain the backstory and events leading up to that exact moment without spoiling future scenes.
- **Custom Scene Questions ("Ask something.."):** In addition to the AI-suggested follow-up, users can click "Ask something.." to open an input field and submit any custom question about the current scene, receiving immediate, spoiler-free answers from Gemini.
- **Multilingual Settings:** Built-in language picker supporting **English**, **Italian**, **Spanish**, **French**, and **German**. All UI text and prompts sent to Gemini adapt dynamically to the chosen language.
- **Real-Time Account Usage Limits:** Scrapes and displays your active Gemini account usage quotas (current percentage, weekly limit, and renewal timestamp) directly within the card.
- **Intelligent Auto-Close Timer:** Displays an unobtrusive countdown (with instant cancel option) before auto-collapsing back to its compact icon state.
- **Silent Scraping & Automation:** Automates queries through the `gemini.google.com` web interface using Gemini 3.8 Flash, bypassing background tab throttling while keeping physical interactions locked during generation.
- **Statistics Dashboard:** Dedicated popup dashboard tracking total scenes explained and current account limits.

## How to Install Locally

1. Download or clone this repository.
2. Open Opera GX (or Google Chrome) and navigate to the extensions page (`opera://extensions` or `chrome://extensions`).
3. Enable **Developer Mode** (toggle in top right corner).
4. Click **Load unpacked**.
5. Select the `SceneExplainer` folder.
6. The extension is now active and ready to use!

## Code Structure

- `manifest.json`: Manifest V3 configuration defining content scripts, permissions, and background service worker.
- `content.js`: Main in-page script managing video detection, overlay injection, dragging mechanics, follow-up interactions, and localized prompt formatting.
- `content.css`: Custom CSS styling for the glassmorphism overlay, responsive docking states (left/right), countdown timer, and typography.
- `background.js`: Service worker orchestrating communication between video tabs and the automated Gemini session.
- `gemini_scraper.js`: Automation script running in the Gemini session that selects the model, submits prompts, monitors output stream, and extracts account usage quotas.
- `popup.html`, `popup.css`, `popup.js`: Extension popup displaying statistics and live usage limits.

---
*Built for an uninterrupted viewing experience.*
