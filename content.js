(function () {
  // Escludiamo categoricamente Gemini
  if (window.location.hostname.includes('gemini.google.com')) {
    return;
  }

  const I18N = {
    it: {
      title: "Spiegami la scena",
      settingsTitle: "Impostazioni",
      close: "Chiudi",
      langLabel: "Lingua",
      langHint: "Il prompt inviato a Gemini e tutti i testi si adatteranno alla lingua scelta.",
      observing: "Osservando la scena...",
      keepOpen: "Tieni aperta la pagina che appare..",
      noVideo: "Nessun video in riproduzione rilevato. <br>Fai <b>Play</b> sul video, aspetta un paio di secondi e riprova.",
      cancelClose: "annulla",
      closeCancelled: "Chiusura annullata",
      refreshingLimits: "Aggiornamento limiti...",
      errorExtension: "Errore. L'estensione non risponde. (F5)",
      promptYouTube: "un video su YouTube",
      promptStreaming: "un film o una serie su un sito di streaming",
      promptTemplate: (desc, title, time) => `L'utente sta guardando ${desc}. Titolo: "${title}". Minuto esatto in cui si trova: ${time}. Senza spoiler, scrivi 1 o 2 frasi molto brevi descrivendo il contesto di ciò che sta guardando. Rispondi in italiano. Inizia con "Probabilmente stai guardando la scena in cui...". Non rispondere ad altro, dimmi solo questo.`,
      timeFormat: (m, s) => `${m} minuti e ${s} secondi`
    },
    en: {
      title: "Explain Scene",
      settingsTitle: "Settings",
      close: "Close",
      langLabel: "Language",
      langHint: "The prompt sent to Gemini and all app labels will adapt to the chosen language.",
      observing: "Observing scene...",
      keepOpen: "Keep the opened window open..",
      noVideo: "No active video detected. <br>Press <b>Play</b> on the video, wait a moment and try again.",
      cancelClose: "cancel",
      closeCancelled: "Auto-close cancelled",
      refreshingLimits: "Updating limits...",
      errorExtension: "Error. Extension not responding. (F5)",
      promptYouTube: "a YouTube video",
      promptStreaming: "a movie or series on a streaming site",
      promptTemplate: (desc, title, time) => `The user is watching ${desc}. Title: "${title}". Exact timestamp: ${time}. Without spoilers, write 1 or 2 very brief sentences describing the context of what they are watching. Answer in English. Start with "You are likely watching the scene where...". Do not reply with anything else, only this.`,
      timeFormat: (m, s) => `${m} minutes and ${s} seconds`
    },
    es: {
      title: "Explicar Escena",
      settingsTitle: "Ajustes",
      close: "Cerrar",
      langLabel: "Idioma",
      langHint: "El prompt enviado a Gemini y todos los textos se adaptarán al idioma elegido.",
      observing: "Observando la escena...",
      keepOpen: "Mantén abierta la ventana que aparece..",
      noVideo: "No se detectó ningún video en reproducción. <br>Dale al <b>Play</b>, espera un momento y vuelve a intentarlo.",
      cancelClose: "cancelar",
      closeCancelled: "Cierre automático cancelado",
      refreshingLimits: "Actualizando límites...",
      errorExtension: "Error. La extensión no responde. (F5)",
      promptYouTube: "un video en YouTube",
      promptStreaming: "una película o serie en un sitio de streaming",
      promptTemplate: (desc, title, time) => `El usuario está viendo ${desc}. Título: "${title}". Minuto exacto: ${time}. Sin spoilers, escribe 1 o 2 frases muy breves describiendo el contexto de lo que está viendo. Responde en español. Empieza con "Probablemente estás viendo la escena en la que...". No respondas a nada más, solo esto.`,
      timeFormat: (m, s) => `${m} minutos y ${s} segundos`
    },
    fr: {
      title: "Expliquer la Scène",
      settingsTitle: "Paramètres",
      close: "Fermer",
      langLabel: "Langue",
      langHint: "Le prompt envoyé à Gemini et tous les textes s'adapteront à la langue choisie.",
      observing: "Observation de la scène...",
      keepOpen: "Gardez la fenêtre ouverte..",
      noVideo: "Aucune vidéo en lecture détectée. <br>Lancez la <b>Lecture</b>, patientez un instant et réessayez.",
      cancelClose: "annuler",
      closeCancelled: "Fermeture automatique annulée",
      refreshingLimits: "Mise à jour des limites...",
      errorExtension: "Erreur. L'extension ne répond pas. (F5)",
      promptYouTube: "une vidéo sur YouTube",
      promptStreaming: "un film ou une série sur un site de streaming",
      promptTemplate: (desc, title, time) => `L'utilisateur regarde ${desc}. Titre : "${title}". Minute exacte : ${time}. Sans spoiler, rédigez 1 ou 2 phrases très courtes décrivant le contexte de ce qu'il regarde. Répondez en français. Commencez par "Vous regardez probablement la scène où...". Ne répondez à rien d'autre, seulement cela.`,
      timeFormat: (m, s) => `${m} minutes et ${s} secondes`
    },
    de: {
      title: "Szene Erklären",
      settingsTitle: "Einstellungen",
      close: "Schließen",
      langLabel: "Sprache",
      langHint: "Der Prompt für Gemini und alle App-Texte passen sich der gewählten Sprache an.",
      observing: "Szene wird beobachtet...",
      keepOpen: "Halte das geöffnete Fenster offen..",
      noVideo: "Kein aktives Video erkannt. <br>Drücke <b>Play</b>, warte kurz und versuche es erneut.",
      cancelClose: "abbrechen",
      closeCancelled: "Automatisches Schließen abgebrochen",
      refreshingLimits: "Limits werden aktualisiert...",
      errorExtension: "Fehler. Erweiterung antwortet nicht. (F5)",
      promptYouTube: "ein Video auf YouTube",
      promptStreaming: "einen Film oder eine Serie auf einer Streaming-Seite",
      promptTemplate: (desc, title, time) => `Der Benutzer sieht ${desc}. Titel: "${title}". Genaue Zeit: ${time}. Schreibe ohne Spoiler 1 oder 2 sehr kurze Sätze, die den Kontext der Szene beschreiben. Antworte auf Deutsch. Beginne mit "Wahrscheinlich siehst du gerade die Szene, in der...". Antworte auf nichts anderes, nur dies.`,
      timeFormat: (m, s) => `${m} Minuten und ${s} Sekunden`
    }
  };

  let currentLang = 'it';
  chrome.storage.local.get(['appLanguage'], (res) => {
    if (res && res.appLanguage && I18N[res.appLanguage]) {
      currentLang = res.appLanguage;
    }
    updateUILanguage();
  });

  function getI18n() {
    return I18N[currentLang] || I18N.it;
  }

  function updateUILanguage() {
    const pack = getI18n();
    const iconView = document.getElementById('se-icon-view');
    if (iconView) iconView.setAttribute('title', pack.title);

    const headerTitle = document.getElementById('se-header-title');
    const settingsView = document.getElementById('se-settings-view');
    if (headerTitle) {
      if (settingsView && settingsView.style.display === 'flex') {
        headerTitle.textContent = pack.settingsTitle;
      } else {
        headerTitle.textContent = pack.title;
      }
    }

    const settingsBtn = document.getElementById('se-settings-btn');
    if (settingsBtn) settingsBtn.setAttribute('title', pack.settingsTitle);

    const closeBtn = document.getElementById('se-close-btn');
    if (closeBtn) closeBtn.setAttribute('title', pack.close);

    const langLabel = document.getElementById('se-lang-label');
    if (langLabel) langLabel.textContent = pack.langLabel;

    const langHint = document.getElementById('se-lang-hint');
    if (langHint) langHint.textContent = pack.langHint;

    const langSelect = document.getElementById('se-lang-select');
    if (langSelect && langSelect.value !== currentLang) {
      langSelect.value = currentLang;
    }

    const cancelBtn = document.getElementById('se-countdown-cancel');
    if (cancelBtn) cancelBtn.textContent = pack.cancelClose;
  }

  let overlayInjected = false;
  const isMainFrame = window.self === window.top;
  let lastKnownVideoTime = 0;
  let videoDetectedInIframe = false;

  // 1. SE SIAMO IN UN IFRAME (dove spesso si nasconde il player video, es. StreamingCommunity)
  if (!isMainFrame) {
    // Controlliamo ogni secondo se c'è un video presente o in riproduzione
    setInterval(() => {
      const video = document.querySelector('video');
      if (video) {
        window.top.postMessage({ type: 'se-video-detected', time: video.currentTime || 0 }, '*');
        if (video.currentTime > 0) {
          window.top.postMessage({ type: 'se-video-time', time: video.currentTime }, '*');
        }
      }
    }, 1000);
  }
  // 2. SE SIAMO NELLA PAGINA PRINCIPALE
  else {
    // Ascoltiamo i messaggi provenienti dall'iframe
    window.addEventListener('message', (event) => {
      if (event.data && (event.data.type === 'se-video-time' || event.data.type === 'se-video-detected')) {
        videoDetectedInIframe = true;
        if (event.data.time) {
          lastKnownVideoTime = event.data.time;
        }
        if (!overlayInjected) {
          injectOverlay();
        }
      }
    });

    // Controllo immediato: se c'è un video, inietta subito il pulsante
    if (hasActiveVideo()) {
      injectOverlay();
    }

    // Rilevatore continuo per video caricati asincronamente
    const videoDetector = setInterval(() => {
      if (hasActiveVideo()) {
        injectOverlay();
        clearInterval(videoDetector);
      }
    }, 1000);

    // Per YouTube e SPA: monitora la navigazione tra video senza ricaricamento pagina
    window.addEventListener('yt-navigate-finish', () => {
      setTimeout(() => {
        if (hasActiveVideo()) {
          injectOverlay();
        }
      }, 500);
    });
  }

  function hasActiveVideo() {
    // 1. StreamingCommunity o domini di streaming noti
    if (window.location.hostname.includes('streamingcommunity')) {
      return true;
    }

    // 2. YouTube (se siamo nella pagina di un video o c'è un elemento video)
    if (window.location.hostname.includes('youtube.com')) {
      if (window.location.pathname.includes('/watch') || document.querySelector('video')) {
        return true;
      }
    }

    // 3. Qualsiasi sito con un elemento <video>
    if (document.querySelector('video')) {
      return true;
    }

    // 4. Abbiamo ricevuto conferma di un video dall'iframe
    if (videoDetectedInIframe || lastKnownVideoTime > 0) {
      return true;
    }

    return false;
  }

  function injectOverlay() {
    if (overlayInjected) return;

    const pack = getI18n();
    const container = document.createElement('div');
    container.id = 'se-overlay-container';
    container.innerHTML = `
    <div id="se-widget" class="se-collapsed">
      <div id="se-icon-view" title="${pack.title}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2"/>
          <path d="M7 3v18"/>
          <path d="M17 3v18"/>
          <path d="M3 7.5h4"/>
          <path d="M3 12h4"/>
          <path d="M3 16.5h4"/>
          <path d="M17 7.5h4"/>
          <path d="M17 12h4"/>
          <path d="M17 16.5h4"/>
          <path d="m12 8 1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2Z" fill="currentColor"/>
        </svg>
      </div>
      <div id="se-expanded-view">
        <div id="se-header">
          <span id="se-header-title">${pack.title}</span>
          <div id="se-header-actions">
            <span id="se-settings-btn" title="${pack.settingsTitle}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </span>
            <span id="se-close-btn" title="${pack.close}">×</span>
          </div>
        </div>
        <div id="se-main-view">
          <div id="se-content">
            <span class="se-loader"></span> <i>${pack.observing}</i>
          </div>
          <div id="se-countdown" style="display: none;"></div>
          <div id="se-usage-limits"></div>
        </div>
        <div id="se-settings-view" style="display: none;">
          <div class="se-settings-row">
            <label id="se-lang-label" class="se-settings-label" for="se-lang-select">${pack.langLabel}</label>
            <div class="se-select-wrapper">
              <select id="se-lang-select">
                <option value="it">Italiano</option>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>
          <div class="se-settings-hint" id="se-lang-hint">${pack.langHint}</div>
        </div>
      </div>
    </div>
  `;
    document.body.appendChild(container);

    const widget = document.getElementById('se-widget');
    widget.addEventListener('click', (e) => {
      // Se è nello stato compresso (solo icona), cliccandolo espandiamo e avviamo la spiegazione
      if (widget.classList.contains('se-collapsed')) {
        explainCurrentScene();
      }
    });

    const closeBtn = document.getElementById('se-close-btn');
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Evita che il click sulla 'x' riapra il widget
      stopCountdown();
      collapseWidget();
    });

    const settingsBtn = document.getElementById('se-settings-btn');
    const mainView = document.getElementById('se-main-view');
    const settingsView = document.getElementById('se-settings-view');
    const headerTitle = document.getElementById('se-header-title');

    settingsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      stopCountdown(); // Se stavamo contando, ferma il conto alla rovescia mentre si regolano le impostazioni
      const isShowingSettings = settingsView.style.display === 'flex';
      if (isShowingSettings) {
        settingsView.style.display = 'none';
        mainView.style.display = 'flex';
        settingsBtn.classList.remove('se-active');
        headerTitle.textContent = getI18n().title;
      } else {
        mainView.style.display = 'none';
        settingsView.style.display = 'flex';
        settingsBtn.classList.add('se-active');
        headerTitle.textContent = getI18n().settingsTitle;
      }
    });

    const langSelect = document.getElementById('se-lang-select');
    if (langSelect) {
      langSelect.value = currentLang;
      langSelect.addEventListener('change', (e) => {
        e.stopPropagation();
        currentLang = e.target.value;
        chrome.storage.local.set({ appLanguage: currentLang });
        updateUILanguage();
      });
      langSelect.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    overlayInjected = true;
  }

  let countdownInterval = null;

  function startCountdown(seconds = 16) {
    stopCountdown();
    let remaining = seconds;
    const countdownEl = document.getElementById('se-countdown');
    if (!countdownEl) return;

    const pack = getI18n();
    countdownEl.style.display = 'flex';
    countdownEl.innerHTML = `
    <span id="se-countdown-num">${remaining}..</span>
    <span id="se-countdown-cancel">${pack.cancelClose}</span>
  `;

    const cancelBtn = document.getElementById('se-countdown-cancel');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        stopCountdown();
      });
    }

    countdownInterval = setInterval(() => {
      remaining--;
      if (remaining > 0) {
        const numEl = document.getElementById('se-countdown-num');
        if (numEl) {
          numEl.textContent = `${remaining}..`;
        }
      } else {
        stopCountdown();
        collapseWidget();
      }
    }, 1000);
  }

  function stopCountdown() {
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
    const countdownEl = document.getElementById('se-countdown');
    if (countdownEl) {
      countdownEl.style.display = 'none';
      countdownEl.innerHTML = '';
    }
  }

  function expandWidget() {
    const widget = document.getElementById('se-widget');
    if (widget) {
      widget.classList.remove('se-collapsed');
      widget.classList.add('se-expanded');
    }
  }

  function collapseWidget() {
    stopCountdown();
    const widget = document.getElementById('se-widget');
    if (widget) {
      widget.classList.remove('se-expanded');
      widget.classList.add('se-collapsed');
    }
    const mainView = document.getElementById('se-main-view');
    const settingsView = document.getElementById('se-settings-view');
    const settingsBtn = document.getElementById('se-settings-btn');
    const headerTitle = document.getElementById('se-header-title');
    if (settingsView && mainView) {
      settingsView.style.display = 'none';
      mainView.style.display = 'flex';
      if (settingsBtn) settingsBtn.classList.remove('se-active');
      if (headerTitle) headerTitle.textContent = getI18n().title;
    }
  }

  function renderUsageLimits(text) {
    const limitsEl = document.getElementById('se-usage-limits');
    if (!limitsEl || !text) return;
    const formatted = text.replace(/\n+/g, '<br>')
      .replace(/\s*[-–—]\s*(?=<br>)/g, ' -')
      .replace(/\s*[-–—]\s*(?=Si resetta|si resetta)/g, ' -<br>');
    limitsEl.innerHTML = formatted;
  }

  // Ascoltiamo i messaggi in arrivo dal Background Script (che a sua volta li riceve da Gemini!)
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "showExplanation") {
      expandWidget();
      const contentEl = document.getElementById('se-content');
      if (contentEl) {
        contentEl.innerHTML = request.text;
      }
      const settingsBtn = document.getElementById('se-settings-btn');
      if (settingsBtn) settingsBtn.style.display = 'flex';
      // Avviamo il conto alla rovescia di 16 secondi per la chiusura automatica
      startCountdown(16);
    }

    if (request.action === "updateUsageLimits" && request.limits) {
      renderUsageLimits(request.limits);
    }
  });

  async function explainCurrentScene() {
    stopCountdown();
    expandWidget();

    // Se eravamo nelle impostazioni, resettiamo alla vista normale
    const mainView = document.getElementById('se-main-view');
    const settingsView = document.getElementById('se-settings-view');
    const settingsBtn = document.getElementById('se-settings-btn');
    const headerTitle = document.getElementById('se-header-title');
    if (settingsView && mainView) {
      settingsView.style.display = 'none';
      mainView.style.display = 'flex';
      if (settingsBtn) settingsBtn.classList.remove('se-active');
      if (headerTitle) headerTitle.textContent = getI18n().title;
    }

    const pack = getI18n();
    const contentEl = document.getElementById('se-content');
    if (contentEl) {
      contentEl.innerHTML = `
      <div><span class="se-loader"></span> <i>${pack.observing}</i></div>
      <div class="se-keep-open-notice">${pack.keepOpen}</div>
    `;
    }

    // Mostriamo il testo e avviamo l'estrapolazione live dei limiti di consumo a ogni click
    const limitsEl = document.getElementById('se-usage-limits');
    if (limitsEl) {
      limitsEl.innerHTML = `<i>${pack.refreshingLimits}</i>`;
    }

    if (settingsBtn) settingsBtn.style.display = 'none';

    // Usiamo il tempo ricevuto dall'iframe, oppure cerchiamo un video locale
    let currentTime = lastKnownVideoTime;
    const localVideo = document.querySelector('video');
    if (localVideo && localVideo.currentTime > currentTime) {
      currentTime = localVideo.currentTime;
    }

    // Se il tempo è ancora 0, significa che non ha trovato nulla o il video è in pausa all'inizio
    if (currentTime === 0) {
      if (contentEl) {
        contentEl.innerHTML = pack.noVideo;
      }
      if (settingsBtn) settingsBtn.style.display = 'flex';
      return;
    }

    let title = document.title || "Video Sconosciuto";
    const ytTitle = document.querySelector('h1.ytd-watch-metadata, #title h1, h1.title');
    if (ytTitle && ytTitle.innerText.trim()) {
      title = ytTitle.innerText.trim();
    } else {
      const h1 = document.querySelector('h1');
      if (h1 && h1.innerText.trim()) {
        title = h1.innerText.trim();
      }
    }

    const isYouTube = window.location.hostname.includes('youtube.com');
    title = title.replace(/- YouTube$/i, '')
      .replace(/StreamingCommunity/gi, '')
      .replace(/Guarda/gi, '')
      .replace(/HD/g, '')
      .trim();

    // Calcoliamo i minuti formattati
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    const timeFormatted = pack.timeFormat(minutes, seconds);

    // Creiamo il prompt mirato nella lingua selezionata dall'utente
    const contextDesc = isYouTube ? pack.promptYouTube : pack.promptStreaming;
    const prompt = pack.promptTemplate(contextDesc, title, timeFormatted);

    // Inviamo il prompt al Background Script per avviare l'automazione
    chrome.runtime.sendMessage({
      action: "explainSceneAutomation",
      prompt: prompt
    }, (response) => {
      if (chrome.runtime.lastError) {
        if (contentEl) {
          contentEl.innerHTML = `<span style="color:#fa5252">${pack.errorExtension}</span>`;
        }
        if (settingsBtn) settingsBtn.style.display = 'flex';
      }
    });
  }
})();
