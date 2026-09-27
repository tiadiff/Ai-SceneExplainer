// If on the usage limits page (https://gemini.google.com/usage)
if (window.location.href.includes('/usage')) {
  console.log("[Scene Explainer] Injected in /usage page, starting live scan...");

  let attempts = 0;
  const usageInterval = setInterval(() => {
    attempts++;
    const bodyText = document.body ? document.body.innerText : '';
    const limits = extractUsageFromLiveDOM(document, bodyText);

    if (limits) {
      clearInterval(usageInterval);
      console.log("[Scene Explainer] Limits extracted from live DOM:", limits);
      chrome.runtime.sendMessage({
        action: "usageLimitsScraped",
        limits: limits
      });
    } else if (attempts >= 25) {
      clearInterval(usageInterval);
      console.warn("[Scene Explainer] Limits not found after 25 attempts.");
      chrome.runtime.sendMessage({
        action: "usageLimitsScraped",
        limits: "Limits temporarily unavailable"
      });
    }
  }, 200);
} else {
  // Otherwise on the regular chat page (gemini.google.com/app)
  // Check with background script if there is a pending task
  chrome.runtime.sendMessage({ action: "geminiScraperReady" }, (response) => {
    if (response && response.hasTask) {
      // If the user attempts to minimize or hide the window, notify the background script to restore it immediately
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          chrome.runtime.sendMessage({ action: "geminiWindowHidden" }, () => {
            chrome.runtime.lastError;
          });
        }
      });

      // Immediately activate the lock shield preventing any user interference
      enableAutomationLockShield();
      runScraper(response.prompt);
    }
  });
}

/**
 * Creates and displays a full-screen lock shield over the Gemini page.
 * Completely disables all physical user interactions (clicks, keyboard, wheel, selections, context menu)
 * to prevent interference with the automated prompt typing and model selection process.
 */
function enableAutomationLockShield() {
  // 1. Intercept and block all physical user events at the source (e.isTrusted === true)
  // Synthetic programmatic events (e.isTrusted === false) continue to execute normally.
  const blockTrustedEvent = (e) => {
    if (e.isTrusted) {
      e.stopImmediatePropagation();
      e.preventDefault();
      return false;
    }
  };

  const eventsToBlock = [
    'click', 'dblclick', 'mousedown', 'mouseup', 'pointerdown', 'pointerup',
    'keydown', 'keyup', 'keypress',
    'contextmenu', 'selectstart', 'dragstart', 'drop',
    'wheel', 'touchstart', 'touchend'
  ];

  eventsToBlock.forEach(eventType => {
    window.addEventListener(eventType, blockTrustedEvent, { capture: true, passive: false });
    document.addEventListener(eventType, blockTrustedEvent, { capture: true, passive: false });
  });

  // 2. Create CSS style for the shield overlay banner
  const style = document.createElement('style');
  style.id = 'se-lock-style';
  style.textContent = `
    #se-lock-shield {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      background: rgba(15, 17, 23, 0.94) !important;
      backdrop-filter: blur(12px) !important;
      -webkit-backdrop-filter: blur(12px) !important;
      z-index: 2147483647 !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: center !important;
      align-items: center !important;
      color: #ffffff !important;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      cursor: wait !important;
      user-select: none !important;
      -webkit-user-select: none !important;
      pointer-events: all !important;
    }

    .se-lock-card {
      background: transparent !important;
      border: none !important;
      padding: 20px !important;
      max-width: 420px !important;
      width: 90% !important;
      text-align: center !important;
      box-shadow: none !important;
      animation: seCardPop 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
    }

    @keyframes seCardPop {
      from { opacity: 0; transform: scale(0.92) translateY(8px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }

    .se-lock-status-badge {
      display: inline-flex !important;
      align-items: center !important;
      gap: 10px !important;
      background: transparent !important;
      border: none !important;
      padding: 0 !important;
      font-size: 13px !important;
      font-weight: 500 !important;
      color: #e4e4e7 !important;
    }

    .se-lock-spinner {
      width: 14px !important;
      height: 14px !important;
      border: 2.5px solid rgba(255, 255, 255, 0.25) !important;
      border-top-color: #ffffff !important;
      border-radius: 50% !important;
      animation: seSpin 0.9s linear infinite !important;
      flex-shrink: 0 !important;
    }

    @keyframes seSpin {
      to { transform: rotate(360deg); }
    }

    .se-lock-footer {
      font-size: 11.5px !important;
      color: #71717a !important;
      line-height: 1.5 !important;
      margin-top: 18px !important;
      text-align: left !important;
    }
  `;
  document.head ? document.head.appendChild(style) : document.documentElement.appendChild(style);

  // 3. Create the visual shield element
  const shield = document.createElement('div');
  shield.id = 'se-lock-shield';
  shield.innerHTML = `
    <div class="se-lock-card">
      <div class="se-lock-status-badge">
        <span class="se-lock-spinner"></span>
        <span id="se-lock-status-label">Initializing Gemini...</span>
      </div>
      <div class="se-lock-footer" style="text-align: left;">
        Manual controls are disabled. <br>The window will close automatically in a few moments.
      </div>
    </div>
  `;

  if (document.body) {
    document.body.appendChild(shield);
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild(shield);
    });
  }
}

function updateShieldStatus(statusText) {
  const label = document.getElementById('se-lock-status-label');
  if (label) {
    label.textContent = statusText;
  }
}

function extractUsageFromLiveDOM(doc, text) {
  if (!text) return null;

  const clean = text.replace(/\s+/g, ' ').trim();

  // Find percentages
  let currentPct = null;
  let weeklyPct = null;

  // Look for specific labels
  const currentMatch = clean.match(/(?:utilizzo\s+attuale|current|today|oggi).*?(\d+(?:\.\d+)?)\s*%/i);
  if (currentMatch) currentPct = currentMatch[1];

  const weeklyMatch = clean.match(/(?:limite\s+settimanale|weekly(?:\s+limit)?|settimana).*?(\d+(?:\.\d+)?)\s*%/i);
  if (weeklyMatch) weeklyPct = weeklyMatch[1];

  // If specific labels fail, grab the first two percentages in the text
  if (!currentPct || !weeklyPct) {
    const allPcts = Array.from(clean.matchAll(/(\d+(?:\.\d+)?)\s*%/g)).map(m => m[1]);
    if (allPcts.length >= 2) {
      if (!currentPct) currentPct = allPcts[0];
      if (!weeklyPct) weeklyPct = allPcts[1];
    } else if (allPcts.length === 1 && !currentPct) {
      currentPct = allPcts[0];
    }
  }

  // Find the date
  let dateText = null;
  // Try to find a date pattern like "29 set, 09:36" or "29 Sep, 09:36" or "29 set alle ore 09:36"
  const datePattern = clean.match(/(\d{1,2}\s+(?:gen|feb|mar|apr|mag|giu|lug|ago|set|ott|nov|dic|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*(?:\s+alle\s+ore|\s+alle|\s+ore|\s*,|\s*-|\s+at)?\s*\d{1,2}:\d{2})/i);
  if (datePattern) {
    dateText = datePattern[1].trim();
    dateText = dateText.replace(/\s+(?:alle\s+ore|alle|ore|al|il|at)\s+/gi, ', ').replace(/,\s*,/g, ',').replace(/\s+,\s+/g, ', ');
  } else {
    // Fallback: look for reset indicator and grab the next date/time-like string (e.g. "at 15:36", "alle 15:36", "in 12 hours")
    const rstMatch = clean.match(/(?:si\s+(?:resetta|azzera|rinnova)|resets|renews|expires|fino\s+al|scade).*?((?:alle\s+ore\s+|alle\s+|ore\s+|at\s+|tra\s+|in\s+)?\d{1,2}(?::\d{2}|\s+(?:ore|hours)))/i);
    if (rstMatch) {
      dateText = rstMatch[1].replace(/^(?:il\s+|alle\s+ore\s+|alle\s+|ore\s+|at\s+)/i, '').trim();
    }
  }

  // Fallback to progress bars if percentages not found in text
  if (!currentPct) {
    const progressBars = doc.querySelectorAll('[role="progressbar"], mat-progress-bar, progress');
    if (progressBars.length >= 2) {
      currentPct = progressBars[0].getAttribute('aria-valuenow') || currentPct;
      weeklyPct = progressBars[1].getAttribute('aria-valuenow') || weeklyPct;
    } else if (progressBars.length === 1) {
      currentPct = progressBars[0].getAttribute('aria-valuenow') || currentPct;
    }
  }

  if (currentPct && weeklyPct && dateText) {
    return `Current: ${currentPct}%, Weekly: ${weeklyPct}% until ${dateText}`;
  } else if (currentPct && weeklyPct) {
    return `Current: ${currentPct}%, Weekly: ${weeklyPct}%`;
  } else if (currentPct && dateText) {
    return `Current: ${currentPct}% until ${dateText}`;
  } else if (currentPct) {
    return `Current: ${currentPct}%`;
  }

  // Fallback for generic remaining limits
  const alt = clean.match(/\b\d{1,4}\s+(?:requests?|prompts?|richieste)\s+(?:remaining|left|available|rimanent\w*|disponibil\w*|usat\w*)\b/i);
  if (alt) return alt[0].trim();

  return null;
}

function runScraper(prompt) {
  updateShieldStatus("Loading Gemini interface...");

  // 1. Wait for the Gemini interface to load
  const waitInput = setInterval(async () => {
    // Look for text editor or model selector to see if page is ready
    const inputBox = document.querySelector('div[contenteditable="true"], rich-textarea');

    if (inputBox) {
      clearInterval(waitInput);

      console.log("[Scene Explainer] Gemini interface loaded. Checking model selection...");
      updateShieldStatus("Selecting Gemini 3.8 Flash model...");

      // 2. Select Gemini 3.8 Flash instead of 3.1 Pro before typing prompt
      try {
        await selectFlashModel();
      } catch (err) {
        console.warn("[Scene Explainer] Error during model selection, proceeding anyway:", err);
      }

      // Brief pause to allow the DOM to stabilize after any model change
      setTimeout(() => {
        updateShieldStatus("Entering and sending prompt...");
        // Re-acquire text box (might have been re-rendered by Angular/Wiz)
        const activeInputBox = document.querySelector('div[contenteditable="true"], rich-textarea') || inputBox;

        // Focus the input box
        activeInputBox.focus();

        // Simulate physical "Paste" command (Ctrl+V)
        const dataTransfer = new DataTransfer();
        dataTransfer.setData('text/plain', prompt);
        const pasteEvent = new ClipboardEvent('paste', {
          clipboardData: dataTransfer,
          bubbles: true,
          cancelable: true
        });
        activeInputBox.dispatchEvent(pasteEvent);

        // Fallback: if not pasted, force insertion into inner <p> tag
        setTimeout(() => {
          if (activeInputBox.textContent.trim() === "") {
            const paragraph = activeInputBox.querySelector('p');
            if (paragraph) paragraph.textContent = prompt;
            else activeInputBox.textContent = prompt;

            activeInputBox.dispatchEvent(new Event('input', { bubbles: true }));
          }
        }, 200);

        // Wait a moment for Send button to become enabled after pasting
        setTimeout(() => {
          const buttons = Array.from(document.querySelectorAll('button'));
          const sendBtn = buttons.find(b => {
            const label = (b.getAttribute('aria-label') || '').toLowerCase();
            return label.includes('invia') || label.includes('send');
          });

          const finalBtn = sendBtn || document.querySelector('.send-button');

          if (finalBtn && !finalBtn.disabled) {
            finalBtn.click();
          } else {
            // If not found or blocked, dispatch virtual "Enter" keydown
            activeInputBox.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, cancelable: true }));
          }

          updateShieldStatus("Generating explanation...");
          // Begin monitoring for response
          waitForResponse();
        }, 1000); // 1 second pause before clicking send
      }, 500);
    }
  }, 1000); // Check every second if the page has loaded
}

/**
 * Intelligent function that selects Gemini 3.8 Flash instead of Gemini 3.1 Pro.
 * Handles both native <select> elements and custom Gemini dropdown menus (Material/Wiz).
 */
async function selectFlashModel() {
  console.log("[Scene Explainer] Attempting to select Gemini 3.8 Flash...");

  // Strategy 1: Check for native <select> or <mat-select>
  const selects = Array.from(document.querySelectorAll('select'));
  for (const sel of selects) {
    const options = Array.from(sel.options);
    const flashIndex = options.findIndex(opt => {
      const text = (opt.text || opt.value || '').toLowerCase();
      return (text.includes('3.8') && text.includes('flash')) ||
        (text.includes('flash') && !text.includes('pro')) ||
        text.includes('3.8');
    });

    if (flashIndex !== -1) {
      if (sel.selectedIndex !== flashIndex) {
        sel.selectedIndex = flashIndex;
        sel.dispatchEvent(new Event('change', { bubbles: true }));
        sel.dispatchEvent(new Event('input', { bubbles: true }));
        console.log("[Scene Explainer] Selected Gemini 3.8 Flash via native <select>!");
      } else {
        console.log("[Scene Explainer] Gemini 3.8 Flash already selected in native <select>.");
      }
      return true;
    }
  }

  // Strategy 2: Search for model picker button in the Gemini interface
  const triggerSelectors = [
    '.model-picker-container button',
    '.model-picker-container',
    'bard-mode-switcher button',
    'bard-mode-switcher',
    '[data-test-id*="model-picker"]',
    '[data-test-id*="model-select"]',
    'button[aria-label*="modello" i]',
    'button[aria-label*="model" i]',
    'button[aria-label*="gemini" i]',
    'button[aria-haspopup="menu"]',
    'button[aria-haspopup="listbox"]'
  ];

  let triggerBtn = null;
  for (const sel of triggerSelectors) {
    const el = document.querySelector(sel);
    if (el) {
      const btn = el.tagName === 'BUTTON' ? el : el.querySelector('button') || el;
      if (btn) {
        triggerBtn = btn;
        break;
      }
    }
  }

  // Fallback scan if known CSS selectors find nothing
  if (!triggerBtn) {
    const allButtons = Array.from(document.querySelectorAll('button, div[role="button"], div[tabindex="0"]'));
    triggerBtn = allButtons.find(b => {
      const text = (b.innerText || b.textContent || '').trim().toLowerCase();
      return (text.includes('3.1') && text.includes('pro')) ||
        (text.includes('pro') && (text.includes('gemini') || text.includes('3.1'))) ||
        (text.includes('3.8') && text.includes('flash')) ||
        (text.includes('flash') && text.includes('gemini'));
    });
  }

  if (triggerBtn) {
    const currentText = (triggerBtn.innerText || triggerBtn.textContent || '').toLowerCase();
    console.log("[Scene Explainer] Found model picker trigger:", currentText);

    // Check if Gemini 3.8 Flash is ALREADY selected
    if ((currentText.includes('3.8') && currentText.includes('flash')) ||
      (currentText.includes('flash') && !currentText.includes('pro'))) {
      console.log("[Scene Explainer] Gemini 3.8 Flash is already active, no click needed.");
      return true;
    }

    // If another model is selected (e.g. 3.1 Pro), open the menu
    console.log("[Scene Explainer] Clicking to open model menu...");
    triggerBtn.click();

    // Wait for menu to open and click the Gemini 3.8 Flash option
    const success = await waitForAndClickModelOption();
    if (success) {
      console.log("[Scene Explainer] Model switched to Gemini 3.8 Flash!");
      await new Promise(r => setTimeout(r, 600));
      return true;
    } else {
      console.warn("[Scene Explainer] Gemini 3.8 Flash option not found in open menu.");
      // Close menu with Escape to prevent it from overlaying the text box
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', keyCode: 27, bubbles: true }));
    }
  } else {
    console.warn("[Scene Explainer] Model picker trigger not found on the page.");
  }

  return false;
}

/**
 * Waits for the dropdown menu with models to appear in the DOM and selects the 3.8 Flash option
 */
function waitForAndClickModelOption() {
  return new Promise((resolve) => {
    let attempts = 0;
    const maxAttempts = 25; // 25 attempts x 100ms = 2.5 seconds

    const checkInterval = setInterval(() => {
      attempts++;

      const candidateSelectors = [
        '[role="menuitem"]',
        '[role="option"]',
        'mat-option',
        '.mat-mdc-menu-item',
        'div.cdk-overlay-pane button',
        'div.cdk-overlay-pane div[role="button"]',
        '[role="menu"] button',
        '[role="listbox"] [role="option"]',
        '.mat-menu-content button'
      ];

      let menuItems = Array.from(document.querySelectorAll(candidateSelectors.join(',')));

      if (menuItems.length === 0) {
        menuItems = Array.from(document.querySelectorAll('.cdk-overlay-container button, div[role="menu"] *, .mat-mdc-menu-panel *'));
      }

      // 1. Highest priority: contains both "3.8" and "flash"
      let targetItem = menuItems.find(item => {
        const text = (item.innerText || item.textContent || '').toLowerCase();
        return text.includes('3.8') && text.includes('flash');
      });

      // 2. Second priority: contains "3.8" (without "pro")
      if (!targetItem) {
        targetItem = menuItems.find(item => {
          const text = (item.innerText || item.textContent || '').toLowerCase();
          return text.includes('3.8') && !text.includes('pro');
        });
      }

      // 3. Third priority: contains "flash" (without "pro")
      if (!targetItem) {
        targetItem = menuItems.find(item => {
          const text = (item.innerText || item.textContent || '').toLowerCase();
          return text.includes('flash') && !text.includes('pro');
        });
      }

      if (targetItem) {
        clearInterval(checkInterval);
        console.log("[Scene Explainer] Clicking found option:", targetItem.innerText || targetItem.textContent);

        // Simulate full click cycle for frameworks like Angular/Wiz
        targetItem.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
        targetItem.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true }));
        targetItem.click();

        resolve(true);
        return;
      }

      if (attempts >= maxAttempts) {
        clearInterval(checkInterval);
        resolve(false);
      }
    }, 100);
  });
}

function waitForResponse() {
  // Wait a couple seconds before reading to give Gemini time to render response bubble
  setTimeout(() => {
    let lastText = "";
    let unchangedCount = 0;

    const checkInterval = setInterval(() => {
      // Look for AI response blocks. Gemini uses specific tags like message-content or model attributes
      const messages = document.querySelectorAll('message-content, [data-message-author-role="model"], .model-response-text');

      if (messages.length > 0) {
        // Take the latest chat message (the one just generated)
        const lastMessage = messages[messages.length - 1];
        let currentText = lastMessage.innerText.trim();

        // If the text is the same as the last time we checked
        if (currentText && currentText === lastText) {
          unchangedCount++;

          // If text remains unchanged for 3 cycles (1.5 seconds total), Gemini has finished writing!
          if (unchangedCount >= 3) {
            clearInterval(checkInterval);
            updateShieldStatus("Explanation completed! Closing window...");

            // Format text in HTML for clean display in notification
            const formattedText = lastMessage.innerHTML;

            // Send final response to Background Script
            chrome.runtime.sendMessage({ action: "geminiResponse", text: formattedText });
          }
        } else {
          // Text is still streaming (Gemini is writing), reset counter
          lastText = currentText;
          unchangedCount = 0;
        }
      }
    }, 500); // Check text every half second
  }, 2000);
}
