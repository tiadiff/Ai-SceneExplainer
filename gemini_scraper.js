// Chiediamo al background se c'è un lavoro in sospeso per noi
chrome.runtime.sendMessage({ action: "geminiScraperReady" }, (response) => {
  if (response && response.hasTask) {
    runScraper(response.prompt);
  }
});

function runScraper(prompt) {
  // 1. Aspettiamo che l'interfaccia di Gemini si carichi e cerchiamo la casella di testo
  const waitInput = setInterval(() => {
    // Cerchiamo l'editor di testo (Gemini usa div contenteditable o un tag specifico)
    const inputBox = document.querySelector('div[contenteditable="true"], rich-textarea');
    
    if (inputBox) {
      clearInterval(waitInput);
      
      // Diamo il focus
      inputBox.focus();
      
      // Il Piano C definitivo: Simuliamo fisicamente il comando "Incolla" (Ctrl+V)
      // I siti complessi come Gemini reagiscono perfettamente all'incolla perché attiva tutti i loro sensori interni
      const dataTransfer = new DataTransfer();
      dataTransfer.setData('text/plain', prompt);
      const pasteEvent = new ClipboardEvent('paste', {
        clipboardData: dataTransfer,
        bubbles: true,
        cancelable: true
      });
      inputBox.dispatchEvent(pasteEvent);
      
      // Se per qualche assurdo motivo non dovesse aver incollato, forziamo l'inserimento nel tag <p> interno
      setTimeout(() => {
        if (inputBox.textContent.trim() === "") {
          const paragraph = inputBox.querySelector('p');
          if (paragraph) paragraph.textContent = prompt;
          else inputBox.textContent = prompt;
          
          inputBox.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }, 200);
      
      // Aspettiamo un attimo che il bottone Invia diventi cliccabile dopo l'incolla
      setTimeout(() => {
        // Cerchiamo il bottone Invia. In Gemini spesso ha la classe send-button o un aria-label con "Invia" o "Send"
        const buttons = Array.from(document.querySelectorAll('button'));
        const sendBtn = buttons.find(b => {
           const label = (b.getAttribute('aria-label') || '').toLowerCase();
           return label.includes('invia') || label.includes('send');
        });
        
        const finalBtn = sendBtn || document.querySelector('.send-button');

        if (finalBtn && !finalBtn.disabled) {
          finalBtn.click();
        } else {
          // Se non lo trova o è bloccato, spariamo un "Invio" virtuale
          inputBox.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, cancelable: true }));
        }
        
        // Iniziamo a spiare la risposta
        waitForResponse();
      }, 1000); // 1 secondo di pausa prima di premere invio
    }
  }, 1000); // Controlla ogni secondo se la pagina ha caricato
}

function waitForResponse() {
  // Aspettiamo un paio di secondi prima di iniziare a leggere, così diamo tempo a Gemini di creare il "fumetto" della risposta
  setTimeout(() => {
    let lastText = "";
    let unchangedCount = 0;
    
    const checkInterval = setInterval(() => {
      // Cerchiamo i blocchi di risposta dell'IA. Gemini usa tag specifici come message-content o attributi model
      const messages = document.querySelectorAll('message-content, [data-message-author-role="model"], .model-response-text');
      
      if (messages.length > 0) {
        // Prendiamo l'ultimo messaggio della chat (quello appena generato)
        const lastMessage = messages[messages.length - 1];
        let currentText = lastMessage.innerText.trim();
        
        // Se il testo è uguale all'ultima volta che lo abbiamo letto
        if (currentText && currentText === lastText) {
          unchangedCount++;
          
          // Se il testo non cambia per 3 cicli (1.5 secondi totali), vuol dire che Gemini ha finito di scrivere!
          if (unchangedCount >= 3) {
             clearInterval(checkInterval);
             
             // Formattiamo il testo in HTML per renderlo carino nella notifica
             const formattedText = lastMessage.innerHTML; 
             
             // Invia la risposta finale al Background Script
             chrome.runtime.sendMessage({ action: "geminiResponse", text: formattedText });
          }
        } else {
          // Il testo sta ancora cambiando (Gemini sta scrivendo), resettiamo il contatore
          lastText = currentText;
          unchangedCount = 0;
        }
      }
    }, 500); // Legge il testo ogni mezzo secondo
  }, 2000);
}
