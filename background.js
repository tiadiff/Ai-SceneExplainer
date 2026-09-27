let pendingExplainerTabId = null;
let pendingExplainerWindowId = null;
let movieTabId = null;
let currentPrompt = "";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "explainSceneAutomation") {
    // Salviamo l'ID della scheda del film
    movieTabId = sender.tab.id;
    currentPrompt = request.prompt;
    
    // Apriamo Gemini in una finestrella popup piccola (ma abbastanza larga da non attivare la versione mobile!)
    chrome.windows.create({ 
      url: 'https://gemini.google.com/app', 
      type: 'popup',
      width: 700,
      height: 450,
      focused: true 
    }, (window) => {
      pendingExplainerWindowId = window.id;
      pendingExplainerTabId = window.tabs[0].id;
      sendResponse({ success: true });
    });
    return true; 
  }
  
  if (request.action === "geminiScraperReady") {
    if (sender.tab && sender.tab.id === pendingExplainerTabId) {
      sendResponse({ hasTask: true, prompt: currentPrompt });
    } else {
      sendResponse({ hasTask: false });
    }
    return true;
  }

  // Quando lo scraper ha finito di leggere la risposta dell'IA in background
  if (request.action === "geminiResponse") {
    if (sender.tab && sender.tab.id === pendingExplainerTabId) {
      if (movieTabId) {
        chrome.tabs.sendMessage(movieTabId, { action: "showExplanation", text: request.text });
      }
      
      chrome.storage.local.get(['totalScenesExplained'], (result) => {
        let currentCount = result.totalScenesExplained || 0;
        chrome.storage.local.set({ totalScenesExplained: currentCount + 1 });
      });
      
      // Chiudiamo la finestrella di Gemini
      if (pendingExplainerWindowId) {
        chrome.windows.remove(pendingExplainerWindowId);
      } else {
        chrome.tabs.remove(pendingExplainerTabId);
      }
      
      pendingExplainerTabId = null;
      pendingExplainerWindowId = null;
      movieTabId = null;
      currentPrompt = "";
    }
    return true;
  }
});
