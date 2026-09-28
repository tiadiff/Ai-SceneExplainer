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
      dragHint: "Trascina per riposizionare",
      langLabel: "Lingua",
      langHint: "Il prompt inviato a Gemini e tutti i testi si adatteranno alla lingua scelta.",
      observing: "Osservando la scena...",
      keepOpen: "Tieni aperta la pagina che appare..",
      noVideo: "Nessun video in riproduzione rilevato. <br>Fai <b>Play</b> sul video, aspetta un paio di secondi e riprova.",
      cancelClose: "annulla",
      closeCancelled: "Chiusura annullata",
      refreshingLimits: "Aggiornamento limiti...",
      errorExtension: "Errore. L'estensione non risponde. (F5)",
      promptYouTube: "su YouTube",
      promptStreaming: "in streaming",
      promptTemplate: (desc, title, time) => `Video: "${title}" (${desc}) al minuto ${time}. Senza spoiler, descrivi la scena in 1 sola frase. Inizia con "Probabilmente stai guardando la scena in cui...". Poi a capo scrivi esattamente: "[DOMANDA]: " seguito da una brevissima domanda per approfondire gli antecedenti. Solo testo puro, zero link o media.`,
      followupPromptTemplate: (desc, title, time, question) => `Video: "${title}" (${desc}) al minuto ${time}. Domanda: "${question}". Senza spoiler futuri, spiega gli antecedenti in 1 o 2 frasi brevissime. Zero preamboli, solo fatti essenziali in puro testo.`,
      customPromptTemplate: (desc, title, time, question) => `Video: "${title}" (${desc}) al minuto ${time}. Domanda: "${question}". Senza spoiler futuri, rispondi in 1 o 2 frasi brevissime. Zero preamboli, solo fatti essenziali in puro testo.`,
      followupDefault: "Come si è arrivati a questo punto?",
      followupLoading: "Ricostruendo come si è arrivati qui...",
      askLabel: "Chiedi qualcosa..",
      askPlaceholder: "Fai una domanda sulla scena...",
      askLoading: "Cercando la risposta...",
      timeFormat: (m, s) => `${m} minuti e ${s} secondi`
    },
    en: {
      title: "Explain Scene",
      settingsTitle: "Settings",
      close: "Close",
      dragHint: "Drag to reposition",
      langLabel: "Language",
      langHint: "The prompt sent to Gemini and all app labels will adapt to the chosen language.",
      observing: "Observing scene...",
      keepOpen: "Keep the opened window open..",
      noVideo: "No active video detected. <br>Press <b>Play</b> on the video, wait a moment and try again.",
      cancelClose: "cancel",
      closeCancelled: "Auto-close cancelled",
      refreshingLimits: "Updating limits...",
      errorExtension: "Error. Extension not responding. (F5)",
      promptYouTube: "on YouTube",
      promptStreaming: "streaming",
      promptTemplate: (desc, title, time) => `Video: "${title}" (${desc}) at timestamp ${time}. Without spoilers, describe the scene in 1 single sentence. Start with "You are likely watching the scene where...". Then on a new line write exactly: "[DOMANDA]: " followed by a very brief question to explore the backstory. Plain text only, zero links or media.`,
      followupPromptTemplate: (desc, title, time, question) => `Video: "${title}" (${desc}) at timestamp ${time}. Question: "${question}". Without future spoilers, explain the backstory in 1 or 2 very brief sentences. Zero preambles, only essential facts in plain text.`,
      customPromptTemplate: (desc, title, time, question) => `Video: "${title}" (${desc}) at timestamp ${time}. Question: "${question}". Without future spoilers, answer in 1 or 2 very brief sentences. Zero preambles, only essential facts in plain text.`,
      followupDefault: "How did they get to this point?",
      followupLoading: "Reconstructing the backstory...",
      askLabel: "Ask something..",
      askPlaceholder: "Ask a question about the scene...",
      askLoading: "Searching for the answer...",
      timeFormat: (m, s) => `${m} minutes and ${s} seconds`
    },
    es: {
      title: "Explicar Escena",
      settingsTitle: "Ajustes",
      close: "Cerrar",
      dragHint: "Arrastra para mover",
      langLabel: "Idioma",
      langHint: "El prompt enviado a Gemini y todos los textos se adaptarán al idioma elegido.",
      observing: "Observando la escena...",
      keepOpen: "Mantén abierta la ventana que aparece..",
      noVideo: "No se detectó ningún video en reproducción. <br>Dale al <b>Play</b>, espera un momento y vuelve a intentarlo.",
      cancelClose: "cancelar",
      closeCancelled: "Cierre automático cancelado",
      refreshingLimits: "Actualizando límites...",
      errorExtension: "Error. La extensión no responde. (F5)",
      promptYouTube: "en YouTube",
      promptStreaming: "en streaming",
      promptTemplate: (desc, title, time) => `Video: "${title}" (${desc}) en el minuto ${time}. Sin spoilers, describe la escena en 1 sola frase. Empieza con "Probablemente estás viendo la escena en la que...". Luego en nueva línea escribe exactamente: "[DOMANDA]: " seguido de una pregunta muy breve para profundizar los antecedentes. Solo texto plano, cero enlaces o medios.`,
      followupPromptTemplate: (desc, title, time, question) => `Video: "${title}" (${desc}) en el minuto ${time}. Pregunta: "${question}". Sin spoilers futuros, explica los antecedentes en 1 o 2 frases muy breves. Cero preámbulos, solo hechos esenciales en texto plano.`,
      customPromptTemplate: (desc, title, time, question) => `Video: "${title}" (${desc}) en el minuto ${time}. Pregunta: "${question}". Sin spoilers futuros, responde en 1 o 2 frases muy breves. Cero preámbulos, solo hechos esenciales en texto plano.`,
      followupDefault: "¿Cómo se llegó a este punto?",
      followupLoading: "Reconstruyendo antecedentes...",
      askLabel: "Pregunta algo..",
      askPlaceholder: "Haz una pregunta sobre la escena...",
      askLoading: "Buscando la respuesta...",
      timeFormat: (m, s) => `${m} minutos y ${s} segundos`
    },
    fr: {
      title: "Expliquer la Scène",
      settingsTitle: "Paramètres",
      close: "Fermer",
      dragHint: "Glisser pour déplacer",
      langLabel: "Langue",
      langHint: "Le prompt envoyé à Gemini et tous les textes s'adapteront à la langue choisie.",
      observing: "Observation de la scène...",
      keepOpen: "Gardez la fenêtre ouverte..",
      noVideo: "Aucune vidéo en lecture détectée. <br>Lancez la <b>Lecture</b>, patientez un instant et réessayez.",
      cancelClose: "annuler",
      closeCancelled: "Fermeture automatique annulée",
      refreshingLimits: "Mise à jour des limites...",
      errorExtension: "Erreur. L'extension ne répond pas. (F5)",
      promptYouTube: "sur YouTube",
      promptStreaming: "en streaming",
      promptTemplate: (desc, title, time) => `Vidéo : "${title}" (${desc}) à la minute ${time}. Sans spoiler, décrivez la scène en 1 seule phrase. Commencez par "Vous regardez probabilmente la scène où...". Puis à la ligne écrivez exactement : "[DOMANDA]: " suivi d'une très courte question pour approfondir les antécédents. Texte brut uniquement, zéro lien ou média.`,
      followupPromptTemplate: (desc, title, time, question) => `Vidéo : "${title}" (${desc}) à la minute ${time}. Question : "${question}". Sans spoiler sur la suite, expliquez les antécédents en 1 ou 2 phrases très courtes. Zéro préambule, uniquement les faits essentiels en texte brut.`,
      customPromptTemplate: (desc, title, time, question) => `Vidéo : "${title}" (${desc}) à la minute ${time}. Question : "${question}". Sans spoiler sur la suite, répondez en 1 ou 2 phrases très courtes. Zéro préambule, uniquement les faits essentiels en texte brut.`,
      followupDefault: "Comment en est-on arrivé là ?",
      followupLoading: "Reconstitution des événements...",
      askLabel: "Demandez quelque chose..",
      askPlaceholder: "Posez une question sur la scène...",
      askLoading: "Recherche de la réponse...",
      timeFormat: (m, s) => `${m} minutes et ${s} secondes`
    },
    de: {
      title: "Szene Erklären",
      settingsTitle: "Einstellungen",
      close: "Schließen",
      dragHint: "Ziehen zum Verschieben",
      langLabel: "Sprache",
      langHint: "Der Prompt für Gemini und alle App-Texte passen sich der gewählten Sprache an.",
      observing: "Szene wird beobachtet...",
      keepOpen: "Halte das geöffnete Fenster offen..",
      noVideo: "Kein aktives Video erkannt. <br>Drücke <b>Play</b>, warte kurz und versuche es erneut.",
      cancelClose: "abbrechen",
      closeCancelled: "Automatisches Schließen abgebrochen",
      refreshingLimits: "Limits werden aktualisiert...",
      errorExtension: "Fehler. Erweiterung antwortet nicht. (F5)",
      promptYouTube: "auf YouTube",
      promptStreaming: "im Streaming",
      promptTemplate: (desc, title, time) => `Video: "${title}" (${desc}) bei Minute ${time}. Ohne Spoiler, beschreibe die Szene in nur 1 Satz. Beginne mit "Wahrscheinlich siehst du gerade die Szene, in der...". Dann in einer neuen Zeile schreibe genau: "[DOMANDA]: " gefolgt von einer sehr kurzen Frage zur Vorgeschichte. Nur reiner Text, null Links oder Medien.`,
      followupPromptTemplate: (desc, title, time, question) => `Video: "${title}" (${desc}) bei Minute ${time}. Frage: "${question}". Ohne Spoiler für spätere Szenen, erkläre die Vorgeschichte in 1 oder 2 sehr kurzen Sätzen. Keine Einleitung, nur wesentliche Fakten in reinem Text.`,
      customPromptTemplate: (desc, title, time, question) => `Video: "${title}" (${desc}) bei Minute ${time}. Frage: "${question}". Ohne Spoiler für spätere Szenen, antworte in 1 oder 2 sehr kurzen Sätzen. Keine Einleitung, nur wesentliche Fakten in reinem Text.`,
      followupDefault: "Wie kam es zu diesem Punkt?",
      followupLoading: "Vorgeschichte wird rekonstruiert...",
      askLabel: "Frag etwas..",
      askPlaceholder: "Stelle eine Frage zur Szene...",
      askLoading: "Antwort wird gesucht...",
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

    const dragZone = document.getElementById('se-header-drag-zone');
    if (dragZone && pack.dragHint) dragZone.setAttribute('title', pack.dragHint);

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
    let startTopPct = 50;
    let isDragging = false;
    let hasCaptured = false;

    const onPointerDown = (e) => {
      // Solo click sinistro o tocco primario
      if (e.button !== undefined && e.button !== 0) return;

      // Ignora click su elementi interattivi interni
      if (e.target.closest('#se-close-btn, #se-settings-btn, #se-lang-select, #se-countdown-cancel, .se-followup-trigger, .se-custom-ask-trigger, .se-custom-ask-wrapper, a, button, select, input, option')) {
        return;
      }

      // Se il widget è espanso, consentiamo il trascinamento dall'header o da aree esterne a #se-content
      // In questo modo l'utente può selezionare e copiare comodamente il testo dell'esposizione
      if (widget.classList.contains('se-expanded') && e.target.closest('#se-content')) {
        return;
      }

      startX = e.clientX;
      startY = e.clientY;
      startTopPct = currentTopPct;
      isDragging = false;

      // Imposta il pointer capture per non perdere il tracciamento anche sopra ad iframe video o fuori dallo schermo
      try {
        widget.setPointerCapture(e.pointerId);
        hasCaptured = true;
      } catch (err) {
        hasCaptured = false;
      }

      const onPointerMove = (moveEvent) => {
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        const dist = Math.hypot(dx, dy);

        if (!isDragging && dist > 4) {
          isDragging = true;
          suppressWidgetClick = true;
          document.body.classList.add('se-is-dragging');
          container.classList.add('se-dragging');
        }

        if (isDragging) {
          moveEvent.preventDefault();
          const winH = window.innerHeight || 800;
          // Calcola il delta relativo per evitare salti o scatti improvvisi
          const deltaPct = (dy / winH) * 100;
          let newTopPct = startTopPct + deltaPct;
          newTopPct = Math.max(5, Math.min(88, newTopPct));

          const winW = window.innerWidth || 1200;
          const newSide = moveEvent.clientX < (winW / 2) ? 'left' : 'right';

          currentTopPct = newTopPct;
          currentSide = newSide;
          applyWidgetPosition(newTopPct, newSide);
        }
      };

      const onPointerUp = (upEvent) => {
        if (hasCaptured) {
          try {
            widget.releasePointerCapture(upEvent.pointerId);
          } catch (err) { }
          hasCaptured = false;
        }

        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('pointercancel', onPointerUp);

        if (isDragging) {
          document.body.classList.remove('se-is-dragging');
          container.classList.remove('se-dragging');
          chrome.storage.local.set({
            seWidgetTop: currentTopPct,
            seWidgetSide: currentSide
          });
          setTimeout(() => {
            suppressWidgetClick = false;
          }, 120);
        } else {
          suppressWidgetClick = false;
        }
      };

      window.addEventListener('pointermove', onPointerMove, { passive: false });
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerUp);
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
          <div id="se-header-drag-zone" title="${pack.dragHint || 'Trascina per riposizionare'}">
            <svg class="se-drag-dots" width="8" height="14" viewBox="0 0 8 14" fill="currentColor">
              <circle cx="2" cy="2" r="1.2"/>
              <circle cx="6" cy="2" r="1.2"/>
              <circle cx="2" cy="7" r="1.2"/>
              <circle cx="6" cy="7" r="1.2"/>
              <circle cx="2" cy="12" r="1.2"/>
              <circle cx="6" cy="12" r="1.2"/>
            </svg>
            <span id="se-header-title">${pack.title}</span>
          </div>
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

  function cleanExplanationHtml(rawHtml) {
    if (!rawHtml) return "";
    let html = rawHtml;

    // Rimuove tag [DOMANDA]: ... e varianti
    html = html.replace(/(?:<p>)?(?:\[|\*\*|\*|\()?DOMANDA(?:\:|\s*\:|\*\*|\*|\]|\))?\s*:?\s*[^<\n\r]+(?:<\/p>)?/gi, '');

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // 1. Rimuove categoricamente TUTTI gli elementi multimediali (immagini, svg, video, canvas, audio, iframe, picture, figure)
      const mediaSelectors = [
        'img',
        'svg',
        'video',
        'iframe',
        'audio',
        'canvas',
        'picture',
        'figure',
        'embed',
        'object'
      ];
      mediaSelectors.forEach(sel => {
        doc.querySelectorAll(sel).forEach(el => el.remove());
      });

      // 2. Rimuove blocchi speciali di Gemini: card YouTube, rich cards, caroselli, citazioni esterne
      const cardSelectors = [
        'youtube-card',
        'rich-card',
        'grounding-card',
        'source-card',
        'url-card',
        'fact-check-view',
        'sources-carousel',
        'sources-carousel-inline',
        'sources-list',
        'source-chip',
        'grounding-chip',
        'citation-container',
        'mat-icon',
        '.grounding-sources',
        '.youtube-card',
        '.rich-card',
        '[class*="video-card"]',
        '[class*="preview-card"]',
        '[class*="rich-preview"]',
        '[data-test-id*="video"]',
        '[data-test-id*="source"]',
        '[data-test-id*="grounding"]'
      ];
      cardSelectors.forEach(sel => {
        doc.querySelectorAll(sel).forEach(el => el.remove());
      });

      // 3. Gestione link: rimuove i link dei video e converte tutti gli altri in puro testo (nessun link deve apparire)
      doc.querySelectorAll('a').forEach(a => {
        const href = (a.getAttribute('href') || '').toLowerCase();
        const text = (a.textContent || '').trim().toLowerCase();

        // Se è un link a YouTube o pulsanti correlati
        if (href.includes('youtube.com') ||
          href.includes('youtu.be') ||
          text.startsWith('apri in') ||
          text.startsWith('open in') ||
          text.includes('visualizzazioni') ||
          text.includes('views')) {
          // Rimuove il contenitore SOLO se è una specifica card video/preview (MAI rimuovere p o div contenitore del testo!)
          const cardParent = a.closest('youtube-card, rich-card, .youtube-card, .rich-card, [class*="video-card"], [class*="preview-card"], [class*="rich-preview"]');
          if (cardParent && cardParent !== doc.body) {
            cardParent.remove();
          } else {
            a.remove();
          }
        } else {
          // Converte qualsiasi link in testo semplice (rimuove il tag <a> preservando il testo)
          a.replaceWith(document.createTextNode(a.textContent || ''));
        }
      });

      // 4. Rimuove righe isolate di testo residuo (es. pulsanti "YouTube", "Apri in ...", conteggio visualizzazioni)
      doc.querySelectorAll('p, div, span, button, a').forEach(el => {
        if (el.children.length === 0) {
          const t = el.textContent.trim().toLowerCase();
          if (t === 'youtube' ||
            t.startsWith('apri in ') ||
            t.startsWith('open in ') ||
            /^\d+(\.\d+)?\s*[kmb]?\s*(visualizzazioni|views)$/i.test(t)) {
            el.remove();
          }
        }
      });

      // 5. Rimuove contenitori rimasti vuoti
      doc.querySelectorAll('p, div, span, blockquote').forEach(el => {
        if (el.children.length === 0 && el.textContent.trim() === '') {
          el.remove();
        }
      });

      html = doc.body.innerHTML;
    } catch (err) {
      console.warn("[Scene Explainer] HTML cleanup warning:", err);
    }

    let cleaned = html.replace(/<p>\s*<\/p>/g, '')
      .replace(/<div>\s*<\/div>/g, '')
      .trim();

    // Fallback di sicurezza: se la pulizia ha rimosso tutto ma rawHtml conteneva del testo,
    // estrae il puro testo privo di tag per garantire che la risposta non rimanga mai vuota
    if (!cleaned) {
      const stripped = (rawHtml || "")
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
        .replace(/(?:<p>)?(?:\[|\*\*|\*|\()?DOMANDA(?:\:|\s*\:|\*\*|\*|\]|\))?\s*:?\s*[^<\n\r]+(?:<\/p>)?/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
        .replace(/\s+/g, ' ')
        .trim();
      if (stripped) {
        cleaned = `<p>${stripped}</p>`;
      }
    }

    return cleaned;
  }

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
    }

    text = cleanExplanationHtml(text);

    if (!suggestedQuestion || suggestedQuestion.length < 4) {
      suggestedQuestion = pack.followupDefault;
    }

    currentSuggestedQuestion = suggestedQuestion;

    contentEl.innerHTML = `
      <div class="se-main-explanation">${text}</div>
      <div class="se-followup-wrapper" id="se-followup-wrapper">
        <div class="se-followup-trigger" id="se-followup-trigger" role="button" tabindex="0" title="${suggestedQuestion}">
          <span class="se-followup-label">${suggestedQuestion}</span>
        </div>
        <div id="se-qa-history" class="se-qa-history"></div>
        <div class="se-custom-ask-wrapper" id="se-custom-ask-wrapper">
          <div class="se-custom-ask-trigger" role="button" tabindex="0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
            <span>${pack.askLabel || "Chiedi qualcosa.."}</span>
          </div>
          <div class="se-custom-ask-box" style="display: none;">
            <input type="text" class="se-custom-ask-input" placeholder="${pack.askPlaceholder || 'Fai una domanda sulla scena...'}" maxlength="160" />
            <button type="button" class="se-custom-ask-submit" title="Invia">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
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

    attachCustomAskHandlers(contentEl);

    const mainView = document.getElementById('se-main-view');
    if (mainView) mainView.scrollTop = 0;
  }

  function executeFollowupExplanation(question) {
    stopCountdown();
    const pack = getI18n();

    // Nasconde il pulsante della domanda suggerita
    const triggerBtn = document.getElementById('se-followup-trigger');
    if (triggerBtn) triggerBtn.style.display = 'none';

    // Aggiunge il loader alla cronologia Q&A senza cancellare il resto
    const historyContainer = document.getElementById('se-qa-history');
    if (historyContainer) {
      const existingLoading = document.getElementById('se-qa-loading');
      if (existingLoading) existingLoading.remove();

      const loadingEl = document.createElement('div');
      loadingEl.id = 'se-qa-loading';
      loadingEl.className = 'se-followup-loading';
      loadingEl.innerHTML = `
        <span class="se-loader se-loader-mini"></span>
        <i>${pack.followupLoading}</i>
      `;
      historyContainer.appendChild(loadingEl);
    }

    currentSuggestedQuestion = question;

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
        const loadingEl = document.getElementById('se-qa-loading');
        if (loadingEl) {
          loadingEl.innerHTML = `<span style="color:#fa5252; font-size:11px;">${pack.errorExtension}</span>`;
        }
      }
    });
  }

  function executeCustomAsk(question) {
    stopCountdown();
    const pack = getI18n();

    // Nasconde l'eventuale domanda suggerita se non ancora risposta
    const triggerBtn = document.getElementById('se-followup-trigger');
    if (triggerBtn) triggerBtn.style.display = 'none';

    // Reset immediato dell'input per permettere subito altre domande future
    const askTrigger = document.querySelector('.se-custom-ask-trigger');
    const askBox = document.querySelector('.se-custom-ask-box');
    const askInput = document.querySelector('.se-custom-ask-input');
    if (askBox) askBox.style.display = 'none';
    if (askTrigger) askTrigger.style.display = 'inline-flex';
    if (askInput) askInput.value = '';

    // Aggiunge il loader in coda alla cronologia
    const historyContainer = document.getElementById('se-qa-history');
    if (historyContainer) {
      const existingLoading = document.getElementById('se-qa-loading');
      if (existingLoading) existingLoading.remove();

      const loadingEl = document.createElement('div');
      loadingEl.id = 'se-qa-loading';
      loadingEl.className = 'se-followup-loading';
      loadingEl.innerHTML = `
        <span class="se-loader se-loader-mini"></span>
        <i>${pack.askLoading}</i>
      `;
      historyContainer.appendChild(loadingEl);
    }

    currentSuggestedQuestion = question;

    const title = lastDetectedTitle || document.title || "Video";
    const contextDesc = lastContextDesc || pack.promptStreaming;
    const timeFormatted = lastFormattedTime || "tempo corrente";

    const customPrompt = pack.customPromptTemplate(contextDesc, title, timeFormatted, question);

    chrome.runtime.sendMessage({
      action: "explainSceneAutomation",
      prompt: customPrompt,
      isFollowup: true
    }, (response) => {
      if (chrome.runtime.lastError) {
        const loadingEl = document.getElementById('se-qa-loading');
        if (loadingEl) {
          loadingEl.innerHTML = `<span style="color:#fa5252; font-size:11px;">${pack.errorExtension}</span>`;
        }
      }
    });
  }

  function attachCustomAskHandlers(parentEl) {
    if (!parentEl) return;
    const askTrigger = parentEl.querySelector('.se-custom-ask-trigger');
    const askBox = parentEl.querySelector('.se-custom-ask-box');
    const askInput = parentEl.querySelector('.se-custom-ask-input');
    const askBtn = parentEl.querySelector('.se-custom-ask-submit');

    if (askTrigger && askBox && askInput) {
      askTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        stopCountdown();
        askTrigger.style.display = 'none';
        askBox.style.display = 'flex';
        askInput.focus();
      });

      const submitQuestion = () => {
        const q = askInput.value.trim();
        if (!q) {
          askInput.focus();
          return;
        }
        executeCustomAsk(q);
      };

      if (askBtn) {
        askBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          submitQuestion();
        });
      }

      askInput.addEventListener('keydown', (e) => {
        stopCountdown();
        if (e.key === 'Enter') {
          e.preventDefault();
          e.stopPropagation();
          submitQuestion();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          e.stopPropagation();
          askBox.style.display = 'none';
          askTrigger.style.display = 'inline-flex';
          askInput.value = '';
        }
      });

      askInput.addEventListener('click', (e) => {
        e.stopPropagation();
        stopCountdown();
      });
    }
  }

  function renderFollowupResult(rawHtml) {
    const wrapper = document.getElementById('se-followup-wrapper');
    if (!wrapper) return;

    const pack = getI18n();
    let cleanText = cleanExplanationHtml(rawHtml || "");

    // Rimuove il loader
    const loadingEl = document.getElementById('se-qa-loading');
    if (loadingEl) loadingEl.remove();

    // Costruisce la card Q&A
    const cardEl = document.createElement('div');
    cardEl.className = 'se-backstory-card';

    const questionEl = document.createElement('div');
    questionEl.className = 'se-backstory-question';
    questionEl.textContent = currentSuggestedQuestion;

    const bodyEl = document.createElement('div');
    bodyEl.className = 'se-backstory-body';
    bodyEl.innerHTML = cleanText;

    cardEl.appendChild(questionEl);
    cardEl.appendChild(bodyEl);

    const historyContainer = document.getElementById('se-qa-history');
    if (historyContainer) {
      historyContainer.appendChild(cardEl);
    } else {
      wrapper.appendChild(cardEl);
    }

    // Assicura che il box custom ask sia ancora presente in fondo
    let customAskWrapper = wrapper.querySelector('.se-custom-ask-wrapper');
    if (!customAskWrapper) {
      const askDiv = document.createElement('div');
      askDiv.className = 'se-custom-ask-wrapper';
      askDiv.id = 'se-custom-ask-wrapper';
      askDiv.innerHTML = `
        <div class="se-custom-ask-trigger" role="button" tabindex="0">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
          <span>${pack.askLabel || "Chiedi qualcosa.."}</span>
        </div>
        <div class="se-custom-ask-box" style="display: none;">
          <input type="text" class="se-custom-ask-input" placeholder="${pack.askPlaceholder || 'Fai una domanda sulla scena...'}" maxlength="160" />
          <button type="button" class="se-custom-ask-submit" title="Invia">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      `;
      wrapper.appendChild(askDiv);
      attachCustomAskHandlers(wrapper);
    }

    // Scorre la vista verso il basso per mostrare l'ultima risposta
    const mainView = document.getElementById('se-main-view');
    if (mainView) {
      setTimeout(() => {
        mainView.scrollTop = mainView.scrollHeight;
      }, 50);
    }
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
