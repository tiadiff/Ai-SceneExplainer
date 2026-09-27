let overlayInjected = false;
const isMainFrame = window.self === window.top;
let lastKnownVideoTime = 0;

// 1. SE SIAMO IN UN IFRAME (dove si nasconde il video)
if (!isMainFrame) {
  // Controlliamo ogni secondo se c'è un video in riproduzione
  setInterval(() => {
    const video = document.querySelector('video');
    if (video && video.currentTime > 0) {
      // Se c'è, gridiamo il tempo attuale alla pagina principale!
      window.top.postMessage({ type: 'se-video-time', time: video.currentTime }, '*');
    }
  }, 1000);
} 
// 2. SE SIAMO NELLA PAGINA PRINCIPALE
else {
  // Ascoltiamo i "gridi" provenienti dall'iframe
  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'se-video-time') {
      lastKnownVideoTime = event.data.time; // Aggiorniamo il tempo in memoria
    }
  });
}

function injectOverlay() {
  if (overlayInjected) return;
  
  const container = document.createElement('div');
  container.id = 'se-overlay-container';
  container.innerHTML = `
    <div id="se-toast" class="se-hidden">
      <div id="se-toast-close">×</div>
      <div id="se-toast-content">...</div>
    </div>
    <div id="se-button">🧠 Spiega Scena</div>
  `;
  document.body.appendChild(container);
  
  document.getElementById('se-button').addEventListener('click', explainCurrentScene);
  
  document.getElementById('se-toast-close').addEventListener('click', () => {
    document.getElementById('se-toast').classList.add('se-hidden');
  });
  
  overlayInjected = true;
}

// Ascoltiamo i messaggi in arrivo dal Background Script (che a sua volta li riceve da Gemini!)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "showExplanation") {
    const toast = document.getElementById('se-toast');
    const toastContent = document.getElementById('se-toast-content');
    if (toast && toastContent) {
      toastContent.innerHTML = request.text;
    }
  }
});

async function explainCurrentScene() {
  const toast = document.getElementById('se-toast');
  const toastContent = document.getElementById('se-toast-content');
  
  toast.classList.remove('se-hidden');
  toastContent.innerHTML = '<span class="se-loader"></span> <i>Osservando la scena...</i>';

  // Usiamo il tempo ricevuto dall'iframe, oppure cerchiamo un video locale
  let currentTime = lastKnownVideoTime;
  const localVideo = document.querySelector('video');
  if (localVideo && localVideo.currentTime > currentTime) {
    currentTime = localVideo.currentTime;
  }

  // Se il tempo è ancora 0, significa che non ha trovato nulla o il video è in pausa all'inizio
  if (currentTime === 0) {
    toastContent.innerHTML = 'Nessun video in riproduzione rilevato. <br>Fai <b>Play</b> sul film, aspetta un paio di secondi e riprova.';
    setTimeout(() => toast.classList.add('se-hidden'), 6000);
    return;
  }

  let title = document.title || "Film Sconosciuto";
  const h1 = document.querySelector('h1');
  if (h1 && h1.innerText) {
    title = h1.innerText;
  }
  
  title = title.replace(/StreamingCommunity/gi, '').replace(/Guarda/gi, '').replace(/HD/g, '').trim();

  // Calcoliamo i minuti formattati
  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);
  const timeFormatted = `${minutes} minuti e ${seconds} secondi`;

  // Creiamo il prompt
  const prompt = `L'utente sta guardando un film o una serie su un sito di streaming. Titolo: "${title}". Minuto esatto in cui si trova: ${timeFormatted}. Senza spoiler, scrivi 1 o 2 frasi molto brevi descrivendo il contesto di ciò che sta guardando. Inizia con "Probabilmente stai guardando la scena in cui...". Non rispondere ad altro, dimmi solo questo.`;

  // Inviamo il prompt al Background Script per avviare l'automazione
  chrome.runtime.sendMessage({
    action: "explainSceneAutomation",
    prompt: prompt
  }, (response) => {
    if (chrome.runtime.lastError) {
       toastContent.innerHTML = `<span style="color:#fa5252">Errore. L'estensione non risponde. (F5)</span>`;
    }
  });
}

setTimeout(() => {
  // Inietta il bottone SOLO nella pagina principale, per non averlo duplicato negli iframe
  if (isMainFrame) {
    injectOverlay();
  }
}, 3000);
