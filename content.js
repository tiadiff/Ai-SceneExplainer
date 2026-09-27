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
      promptTemplate: (desc, title, time) => `L'utente sta guardando ${desc}. Titolo: "${title}". Minuto esatto in cui si trova: ${time}. Senza spoiler, scrivi 1 o 2 frasi molto brevi descrivendo il contesto di ciò che sta guardando. Rispondi in italiano. Inizia con "Probabilmente stai guardando la scena in cui...". Poi, su una nuova riga scrivi esattamente: "[DOMANDA]: " seguito da una brevissima domanda (massimo 10 parole) che suggerisce di approfondire come si è arrivati a questa scena (es. "[DOMANDA]: Come si è arrivati a questo punto?"). Non rispondere ad altro, dimmi solo questo.`,
      followupPromptTemplate: (desc, title, time, question) => `L'utente sta guardando ${desc}. Titolo: "${title}". Minuto esatto in cui si trova: ${time}. Domanda di approfondimento: "${question}". Senza spoiler su ciò che accade dopo questo minuto, spiega in 2 o 3 brevi frasi come i personaggi o la trama sono arrivati a questa situazione (gli antecedenti della scena). Rispondi in italiano. Non fare preamboli, spiega subito i fatti.`,
      followupDefault: "Come si è arrivati a questo punto?",
      followupLoading: "Ricostruendo come si è arrivati qui...",
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
      promptTemplate: (desc, title, time) => `The user is watching ${desc}. Title: "${title}". Exact timestamp: ${time}. Without spoilers, write 1 or 2 very brief sentences describing the context of what they are watching. Answer in English. Start with "You are likely watching the scene where...". Then, on a new line write exactly: "[DOMANDA]: " followed by a very brief question (max 10 words) suggesting how they got to this scene (e.g. "[DOMANDA]: How did they get to this point?"). Do not reply with anything else, only this.`,
      followupPromptTemplate: (desc, title, time, question) => `The user is watching ${desc}. Title: "${title}". Timestamp: ${time}. Follow-up question: "${question}". Without any spoilers for events after this timestamp, explain in 2 or 3 brief sentences how the characters or plot arrived at this situation (the backstory of the scene). Answer in English. No preambles, explain the facts directly.`,
      followupDefault: "How did they get to this point?",
      followupLoading: "Reconstructing the backstory...",
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
      promptTemplate: (desc, title, time) => `El usuario está viendo ${desc}. Título: "${title}". Minuto exacto: ${time}. Sin spoilers, escribe 1 o 2 frases muy breves describiendo el contexto de lo que está viendo. Responde en español. Empieza con "Probablemente estás viendo la escena en la que...". Luego, en una nueva línea escribe exactamente: "[DOMANDA]: " seguido de una pregunta muy breve (máximo 10 palabras) que sugiera cómo se llegó a esta escena (ej. "[DOMANDA]: ¿Cómo se llegó a este punto?"). No respondas a nada más, solo esto.`,
      followupPromptTemplate: (desc, title, time, question) => `El usuario está viendo ${desc}. Título: "${title}". Minuto: ${time}. Pregunta de profundización: "${question}". Sin spoilers de lo que ocurre después de este minuto, explica en 2 o 3 frases breves cómo los personajes o la trama llegaron a esta situación (los antecedentes). Responde en español. Sin rodeos, explica los hechos directamente.`,
      followupDefault: "¿Cómo se llegó a este punto?",
      followupLoading: "Reconstruyendo antecedentes...",
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
      promptTemplate: (desc, title, time) => `L'utilisateur regarde ${desc}. Titre : "${title}". Minute exacte : ${time}. Sans spoiler, rédigez 1 ou 2 phrases très courtes décrivant le contexte de ce qu'il regarde. Répondez en français. Commencez par "Vous regardez probablement la scène où...". Puis, sur une nouvelle ligne écrivez exactement : "[DOMANDA]: " suivi d'une très courte question (max 10 mots) suggérant comment on en est arrivé à cette scène (ex. "[DOMANDA]: Comment en est-on arrivé là ?"). Ne répondez à rien d'autre, seulement cela.`,
      followupPromptTemplate: (desc, title, time, question) => `L'utilisateur regarde ${desc}. Titre : "${title}". Minute : ${time}. Question d'approfondissement : "${question}". Sans aucun spoiler sur les événements postérieurs à cette minute, expliquez en 2 ou 3 phrases courtes comment les personnages ou l'intrigue en sont arrivés à cette situation (les antécédents). Répondez en français. Pas de préambule, expliquez directement les faits.`,
      followupDefault: "Comment en est-on arrivé là ?",
      followupLoading: "Reconstitution des événements...",
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
      promptTemplate: (desc, title, time) => `Der Benutzer sieht ${desc}. Titel: "${title}". Genaue Zeit: ${time}. Schreibe ohne Spoiler 1 oder 2 sehr kurze Sätze, die den Kontext der Szene beschreiben. Antworte auf Deutsch. Beginne mit "Wahrscheinlich siehst du gerade die Szene, in der...". Dann schreibe in einer neuen Zeile genau: "[DOMANDA]: " gefolgt von einer sehr kurzen Frage (max. 10 Wörter), die vertieft, wie es zu dieser Szene kam (z.B. "[DOMANDA]: Wie kam es zu diesem Punkt?"). Antworte auf nichts anderes, nur dies.`,
      followupPromptTemplate: (desc, title, time, question) => `Der Benutzer sieht ${desc}. Titel: "${title}". Zeit: ${time}. Vertiefende Frage: "${question}". Erkläre ohne Spoiler für spätere Minuten in 2 oder 3 kurzen Sätzen, wie die Charaktere oder die Handlung zu dieser Situation gelangt sind. Antworte auf Deutsch. Ohne Umschweife, direkt die Fakten.`,
      followupDefault: "Wie kam es zu diesem Punkt?",
      followupLoading: "Vorgeschichte wird rekonstruiert...",
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

  let currentTopPct = 50;
  let currentSide = 'right';
  let suppressWidgetClick = false;

  chrome.storage.local.get(['seWidgetTop', 'seWidgetSide'], (res) => {
    if (res) {
      if (typeof res.seWidgetTop === 'number') currentTopPct = res.seWidgetTop;
      if (res.seWidgetSide === 'left' || res.seWidgetSide === 'right') currentSide = res.seWidgetSide;
    }
    applyWidgetPosition(currentTopPct, currentSide);
  });

  function applyWidgetPosition(topPct, side) {
    const container = document.getElementById('se-overlay-container');
    if (!container) return;
    const clamped = Math.max(5, Math.min(88, topPct));
    container.style.top = clamped + '%';
    container.style.transform = `translateY(-${clamped}%)`;
    if (side === 'left') {
      container.classList.add('se-dock-left');
      container.classList.remove('se-dock-right');
    } else {
      container.classList.add('se-dock-right');
      container.classList.remove('se-dock-left');
    }
  }

  function setupDraggable(container, widget) {
    let startX = 0;
    let startY = 0;
    let isDragging = false;

    const onPointerDown = (e) => {
      // Solo click sinistro o tocco primario
      if (e.button !== undefined && e.button !== 0) return;

      // Ignora click su elementi interattivi interni
      if (e.target.closest('#se-close-btn, #se-settings-btn, #se-lang-select, #se-countdown-cancel, .se-followup-trigger')) {
        return;
      }

      // Se il widget è espanso, consentiamo il trascinamento solo dall'header
      if (widget.classList.contains('se-expanded') && !e.target.closest('#se-header')) {
        return;
      }

      startX = e.clientX;
      startY = e.clientY;
      isDragging = false;

      const onPointerMove = (moveEvent) => {
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        const dist = Math.hypot(dx, dy);

        if (!isDragging && dist > 5) {
          isDragging = true;
          suppressWidgetClick = true;
          document.body.classList.add('se-is-dragging');
          container.classList.add('se-dragging');
        }

        if (isDragging) {
          moveEvent.preventDefault();
          const winH = window.innerHeight || 800;
          let newTopPct = (moveEvent.clientY / winH) * 100;
          newTopPct = Math.max(5, Math.min(88, newTopPct));

          const newSide = moveEvent.clientX < (window.innerWidth / 2) ? 'left' : 'right';

          currentTopPct = newTopPct;
          currentSide = newSide;
          applyWidgetPosition(newTopPct, newSide);
        }
      };

      const onPointerUp = () => {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);

        if (isDragging) {
          document.body.classList.remove('se-is-dragging');
          container.classList.remove('se-dragging');
          chrome.storage.local.set({
            seWidgetTop: currentTopPct,
            seWidgetSide: currentSide
          });
          setTimeout(() => {
            suppressWidgetClick = false;
          }, 80);
        } else {
          suppressWidgetClick = false;
        }
      };

      window.addEventListener('pointermove', onPointerMove, { passive: false });
      window.addEventListener('pointerup', onPointerUp);
    };

    widget.addEventListener('pointerdown', onPointerDown);
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
    applyWidgetPosition(currentTopPct, currentSide);

    const widget = document.getElementById('se-widget');
    setupDraggable(container, widget);

    widget.addEventListener('click', (e) => {
      if (suppressWidgetClick) {
        e.stopPropagation();
        e.preventDefault();
        return;
      }
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

  let currentSuggestedQuestion = "";
  let lastDetectedTitle = "";
  let lastFormattedTime = "";
  let lastContextDesc = "";

  // Ascoltiamo i messaggi in arrivo dal Background Script (che a sua volta li riceve da Gemini!)
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "showExplanation") {
      expandWidget();
      const settingsBtn = document.getElementById('se-settings-btn');
      if (settingsBtn) settingsBtn.style.display = 'flex';

      if (request.isFollowup) {
        renderFollowupResult(request.text);
        startCountdown(25);
      } else {
        renderInitialExplanation(request.text);
        startCountdown(16);
      }
    }

    if (request.action === "updateUsageLimits" && request.limits) {
      renderUsageLimits(request.limits);
    }
  });

  function renderInitialExplanation(rawHtml) {
    const contentEl = document.getElementById('se-content');
    if (!contentEl) return;

    const pack = getI18n();
    let text = rawHtml || "";
    let suggestedQuestion = "";

    // Cerca il tag [DOMANDA]: ... generato da Gemini
    const questionRegex = /(?:\[|\*\*|\*|\()?DOMANDA(?:\:|\s*\:|\*\*|\*|\]|\))?\s*:?\s*([^<\n\r]+)/i;
    const match = text.match(questionRegex);

    if (match && match[1]) {
      suggestedQuestion = match[1].replace(/<\/?[^>]+(>|$)/g, '').replace(/[\]\*\)]/g, '').trim();
      text = text.replace(/(?:<p>)?(?:\[|\*\*|\*|\()?DOMANDA(?:\:|\s*\:|\*\*|\*|\]|\))?\s*:?\s*[^<\n\r]+(?:<\/p>)?/gi, '').trim();
    }

    if (!suggestedQuestion || suggestedQuestion.length < 4) {
      suggestedQuestion = pack.followupDefault;
    }

    text = text.replace(/<p>\s*<\/p>/g, '').trim();
    currentSuggestedQuestion = suggestedQuestion;

    contentEl.innerHTML = `
      <div class="se-main-explanation">${text}</div>
      <div class="se-followup-wrapper" id="se-followup-wrapper">
        <div class="se-followup-trigger" id="se-followup-trigger" role="button" tabindex="0" title="${suggestedQuestion}">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <span class="se-followup-label">${suggestedQuestion}</span>
        </div>
      </div>
    `;

    const triggerBtn = document.getElementById('se-followup-trigger');
    if (triggerBtn) {
      triggerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        executeFollowupExplanation(currentSuggestedQuestion);
      });
    }
  }

  function executeFollowupExplanation(question) {
    stopCountdown();
    const pack = getI18n();
    const wrapper = document.getElementById('se-followup-wrapper');
    if (wrapper) {
      wrapper.innerHTML = `
        <div class="se-followup-loading">
          <span class="se-loader se-loader-mini"></span>
          <i>${pack.followupLoading}</i>
        </div>
      `;
    }

    const title = lastDetectedTitle || document.title || "Video";
    const contextDesc = lastContextDesc || pack.promptStreaming;
    const timeFormatted = lastFormattedTime || "tempo corrente";

    const followupPrompt = pack.followupPromptTemplate(contextDesc, title, timeFormatted, question);

    chrome.runtime.sendMessage({
      action: "explainSceneAutomation",
      prompt: followupPrompt,
      isFollowup: true
    }, (response) => {
      if (chrome.runtime.lastError) {
        if (wrapper) {
          wrapper.innerHTML = `<span style="color:#fa5252; font-size:11px;">${pack.errorExtension}</span>`;
        }
      }
    });
  }

  function renderFollowupResult(rawHtml) {
    const wrapper = document.getElementById('se-followup-wrapper');
    if (!wrapper) return;

    let cleanText = (rawHtml || "").replace(/<p>\s*<\/p>/g, '').trim();
    cleanText = cleanText.replace(/(?:<p>)?(?:\[|\*\*|\*|\()?DOMANDA(?:\:|\s*\:|\*\*|\*|\]|\))?\s*:?\s*[^<\n\r]+(?:<\/p>)?/gi, '').trim();

    wrapper.innerHTML = `
      <div class="se-backstory-card">
        <div class="se-backstory-question">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
          <span>${currentSuggestedQuestion}</span>
        </div>
        <div class="se-backstory-body">${cleanText}</div>
      </div>
    `;
  }

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

    // Memorizziamo il contesto e il titolo per eventuali approfondimenti
    const contextDesc = isYouTube ? pack.promptYouTube : pack.promptStreaming;
    lastDetectedTitle = title;
    lastFormattedTime = timeFormatted;
    lastContextDesc = contextDesc;

    // Creiamo il prompt mirato nella lingua selezionata dall'utente
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
