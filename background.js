let pendingExplainerTabId = null;
let pendingExplainerWindowId = null;
let movieTabId = null;
let currentPrompt = "";
let isFollowupRequest = false;

let pendingUsageTabId = null;

// Eliminiamo qualsiasi valore precedentemente salvato nella cache locale
chrome.storage.local.remove(['cachedLimits', 'lastFetchTime']);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "explainSceneAutomation") {
    // Se c'era una finestra rimasta aperta da una richiesta precedente, chiudiamola
    if (pendingExplainerWindowId) {
      try {
        chrome.windows.remove(pendingExplainerWindowId);
      } catch (e) {}
      pendingExplainerWindowId = null;
      pendingExplainerTabId = null;
    }

    // Salviamo l'ID della scheda del film
    movieTabId = sender.tab.id;
    currentPrompt = request.prompt;
    isFollowupRequest = !!request.isFollowup;
    
    // Estrapoliamo sempre i limiti di consumo live a ogni spiegazione scena, senza cache
    triggerUsageLimitsScrape();

    // Apriamo Gemini in una finestrella popup piccola (ma abbastanza larga da non attivare la versione mobile!)
    chrome.windows.create({ 
      url: 'https://gemini.google.com/app', 
      type: 'popup',
      width: 850,
      height: 550,
      focused: true 
    }, (createdWin) => {
      if (chrome.runtime.lastError || !createdWin) {
        sendResponse({ success: false });
        return;
      }
      pendingExplainerWindowId = createdWin.id;
      if (createdWin.tabs && createdWin.tabs.length > 0) {
        pendingExplainerTabId = createdWin.tabs[0].id;
      } else {
        chrome.tabs.query({ windowId: createdWin.id }, (tabs) => {
          if (tabs && tabs.length > 0) {
            pendingExplainerTabId = tabs[0].id;
          }
        });
      }
      startExplainerGuardian();
      sendResponse({ success: true });
    });
    return true; 
  }
  
  if (request.action === "geminiScraperReady") {
    const isMatchingTab = sender.tab && (
      sender.tab.id === pendingExplainerTabId || 
      (pendingExplainerWindowId && sender.tab.windowId === pendingExplainerWindowId)
    );
    if (isMatchingTab) {
      if (sender.tab) pendingExplainerTabId = sender.tab.id;
      sendResponse({ hasTask: true, prompt: currentPrompt });
    } else {
      sendResponse({ hasTask: false });
    }
    return true;
  }

  // Quando lo scraper ha finito di leggere la risposta dell'IA in background
  if (request.action === "geminiResponse") {
    const isMatchingTab = sender.tab && (
      sender.tab.id === pendingExplainerTabId || 
      (pendingExplainerWindowId && sender.tab.windowId === pendingExplainerWindowId)
    );
    if (isMatchingTab) {
      stopExplainerGuardian();

      if (movieTabId) {
        chrome.tabs.sendMessage(movieTabId, { 
          action: "showExplanation", 
          text: request.text, 
          isFollowup: isFollowupRequest 
        });
      }
      
      chrome.storage.local.get(['totalScenesExplained'], (result) => {
        let currentCount = result.totalScenesExplained || 0;
        chrome.storage.local.set({ totalScenesExplained: currentCount + 1 });
      });
      
      // Chiudiamo la finestrella di Gemini
      if (pendingExplainerWindowId) {
        chrome.windows.remove(pendingExplainerWindowId);
      } else if (pendingExplainerTabId) {
        chrome.tabs.remove(pendingExplainerTabId);
      }
      
      pendingExplainerTabId = null;
      pendingExplainerWindowId = null;
      movieTabId = null;
      currentPrompt = "";
      isFollowupRequest = false;
    }
    return true;
  }
  
  if (request.action === "getUsageLimits" || request.action === "refreshUsageLimits") {
    triggerUsageLimitsScrape();
    sendResponse({ status: "scraping_started" });
    return true; 
  }

  if (request.action === "usageLimitsScraped") {
    if (request.limits) {
      // Inviamo i limiti freschi a tutte le schede aperte, SENZA salvare in cache
      broadcastLimits(request.limits);
    }

    if (sender.tab && sender.tab.id) {
      chrome.tabs.remove(sender.tab.id).catch(() => {});
    } else if (pendingUsageTabId) {
      chrome.tabs.remove(pendingUsageTabId).catch(() => {});
    }
    pendingUsageTabId = null;
    sendResponse({ success: true });
    return true;
  }

  if (request.action === "geminiWindowHidden") {
    restoreExplainerWindow();
    sendResponse({ success: true });
    return true;
  }
});

function triggerUsageLimitsScrape() {
  openSilentUsageTab();
}

function openSilentUsageTab() {
  // Se c'è già una scheda di scansione in sospeso, chiudiamola per avviarne una fresca
  if (pendingUsageTabId) {
    chrome.tabs.remove(pendingUsageTabId).catch(() => {});
    pendingUsageTabId = null;
  }

  chrome.tabs.create({ url: 'https://gemini.google.com/usage?hl=it', active: false }, (tab) => {
    pendingUsageTabId = tab.id;
    setTimeout(() => {
      if (pendingUsageTabId === tab.id) {
        chrome.tabs.remove(tab.id).catch(() => {});
        pendingUsageTabId = null;
      }
    }, 7000);
  });
}

function broadcastLimits(limits) {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach(t => {
      chrome.tabs.sendMessage(t.id, { action: "updateUsageLimits", limits: limits }).catch(() => {});
    });
  });
}

let explainerGuardianInterval = null;

function checkAndRestoreExplainerWindow() {
  if (!pendingExplainerWindowId) return;
  chrome.windows.get(pendingExplainerWindowId, (win) => {
    if (chrome.runtime.lastError || !win) {
      return;
    }
    // Se la finestra con Gemini viene abbassata (minimizzata), ripristiniamola immediatamente
    if (win.state === 'minimized') {
      restoreExplainerWindow();
    }
  });
}

function restoreExplainerWindow() {
  if (!pendingExplainerWindowId) return;
  chrome.windows.update(pendingExplainerWindowId, { state: 'normal', focused: true }, () => {
    if (chrome.runtime.lastError) {
      chrome.windows.update(pendingExplainerWindowId, { state: 'normal' }, () => {
        chrome.windows.update(pendingExplainerWindowId, { focused: true });
      });
    }
  });
}

function startExplainerGuardian() {
  stopExplainerGuardian();
  explainerGuardianInterval = setInterval(checkAndRestoreExplainerWindow, 300);
}

function stopExplainerGuardian() {
  if (explainerGuardianInterval) {
    clearInterval(explainerGuardianInterval);
    explainerGuardianInterval = null;
  }
}

// Ripristina immediatamente se la finestra perde focus o viene minimizzata
chrome.windows.onFocusChanged.addListener(() => {
  if (pendingExplainerWindowId) {
    checkAndRestoreExplainerWindow();
  }
});

chrome.windows.onBoundsChanged.addListener((win) => {
  if (pendingExplainerWindowId && win.id === pendingExplainerWindowId) {
    if (win.state === 'minimized') {
      restoreExplainerWindow();
    }
  }
});

chrome.windows.onRemoved.addListener((windowId) => {
  if (windowId === pendingExplainerWindowId) {
    stopExplainerGuardian();
    pendingExplainerWindowId = null;
    pendingExplainerTabId = null;
    isFollowupRequest = false;
  }
});
