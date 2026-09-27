document.addEventListener('DOMContentLoaded', () => {
  const sceneCountEl = document.getElementById('sceneCount');

  // Carica il contatore dalla memoria del browser
  chrome.storage.local.get(['totalScenesExplained'], (result) => {
    sceneCountEl.innerText = result.totalScenesExplained || 0;
  });
});
