document.addEventListener('DOMContentLoaded', () => {
  const sceneCountEl = document.getElementById('sceneCount');

  // Carica il contatore dalla memoria del browser
  chrome.storage.local.get(['totalScenesExplained'], (result) => {
    sceneCountEl.innerText = result.totalScenesExplained || 0;
  });

  fetchUsageLimits();

  chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "updateUsageLimits" && request.limits) {
      const usageLimitsEl = document.getElementById('usageLimits');
      if (usageLimitsEl) {
        usageLimitsEl.innerHTML = request.limits.replace(/\n+/g, '<br>');
      }
    }
  });
});

function fetchUsageLimits() {
  const usageLimitsEl = document.getElementById('usageLimits');
  chrome.runtime.sendMessage({ action: "getUsageLimits" }, (response) => {
    if (response && response.limits) {
      usageLimitsEl.innerHTML = response.limits.replace(/\n+/g, '<br>');
    } else {
      usageLimitsEl.innerText = "Caricamento limiti...";
    }
  });
}
