# Scene Explainer - Opera GX Extension 🎬🤖

Un'estensione "hacker" per browser (creata per Opera GX) che ti permette di ricevere spiegazioni immediate sulle scene dei film che stai guardando su siti di streaming come StreamingCommunity, utilizzando direttamente il tuo account Google Gemini Advanced in modo invisibile e gratuito.

## Funzionalità
- **Overlay Cinematico:** Un elegante bottone rosso in stile Netflix e un box di spiegazione trasparente ("glassmorphism/cinematic") integrato direttamente nel player del film.
- **Scraping Silenzioso:** Utilizza un trucco hacker per interrogare la pagina web di `gemini.google.com` (sfruttando il tuo abbonamento personale) senza dover pagare per l'accesso alle API. Nessun limite di token!
- **Teletrasporto Intelligente:** Aggira i blocchi "anti-risparmio energetico" dei browser moderni aprendo temporaneamente Gemini e teletrasportandoti istantaneamente indietro al film.
- **Dashboard Statistiche:** Un popup dedicato per tenere traccia di quante scene l'IA ti ha spiegato finora, con un look oscuro da vera sala cinematografica.

## Come installare l'estensione localmente
1. Scarica o clona questa repository.
2. Apri Opera GX (o Google Chrome) e vai alla pagina delle estensioni digitando `opera://extensions` (o `chrome://extensions`).
3. Attiva la **Modalità Sviluppatore** (in alto a destra).
4. Clicca su **Carica estensione non pacchettizzata** (Load unpacked).
5. Seleziona la cartella `SceneExplainer`.
6. L'estensione è ora attiva e pronta all'uso!

## Struttura del Codice
- `manifest.json`: Il cuore dell'estensione (Manifest V3).
- `content.js` e `content.css`: Gestiscono l'interfaccia utente incollata sopra al player del film (il bottone "Spiega Scena" e la notifica finale).
- `background.js`: Il direttore d'orchestra che coordina la comunicazione tra il film e la pagina di Gemini.
- `gemini_scraper.js`: Lo script ninja che si inietta nella pagina di Gemini, simula l'incolla (bypassando i blocchi anti-bot) e preme invio.
- `popup.html`, `popup.css`, `popup.js`: La dashboard delle statistiche dell'estensione, realizzata con uno stile premium.

---
*Creato per un'esperienza di visione senza interruzioni.*
