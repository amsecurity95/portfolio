// Debug Console for Mac users (F12 doesn't work)
// Captures console logs, errors, and API errors
// Hidden in production — only runs on localhost

(function() {
  'use strict';

  const isProduction = window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1' &&
    !window.location.hostname.endsWith('.local');
  if (isProduction) return;

  let logs = [];
  let isOpen = false;

  // Create debug console UI
  function createDebugConsole() {
    const container = document.createElement('div');
    container.id = 'tmDebugConsole';
    container.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 400px;
      max-height: 500px;
      background: #1a1a1a;
      color: #fff;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
      z-index: 99999;
      display: none;
      flex-direction: column;
      font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
      font-size: 12px;
    `;

    const header = document.createElement('div');
    header.style.cssText = `
      padding: 12px 16px;
      background: #2a2a2a;
      border-radius: 12px 12px 0 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: move;
    `;
    header.innerHTML = `
      <strong style="color: #1FAF6A;">🐛 Console Debug</strong>
      <div style="display: flex; gap: 8px;">
        <button id="tmDebugClear" style="background: #444; border: none; color: #fff; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 11px;">Effacer</button>
        <button id="tmDebugClose" style="background: #DC2626; border: none; color: #fff; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 11px;">✕</button>
      </div>
    `;

    const content = document.createElement('div');
    content.id = 'tmDebugContent';
    content.style.cssText = `
      flex: 1;
      overflow-y: auto;
      padding: 12px;
      max-height: 400px;
    `;

    const footer = document.createElement('div');
    footer.style.cssText = `
      padding: 8px 16px;
      background: #2a2a2a;
      border-radius: 0 0 12px 12px;
      font-size: 10px;
      color: #888;
      text-align: center;
    `;
    footer.textContent = 'Appuyez sur Cmd+Option+D pour ouvrir/fermer';

    container.appendChild(header);
    container.appendChild(content);
    container.appendChild(footer);
    document.body.appendChild(container);

    // Make draggable
    let isDragging = false;
    let currentX, currentY, initialX, initialY;

    header.addEventListener('mousedown', (e) => {
      isDragging = true;
      initialX = e.clientX - container.offsetLeft;
      initialY = e.clientY - container.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        container.style.left = currentX + 'px';
        container.style.right = 'auto';
        container.style.bottom = 'auto';
        container.style.top = currentY + 'px';
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Clear button
    document.getElementById('tmDebugClear').addEventListener('click', () => {
      logs = [];
      updateContent();
    });

    // Close button
    document.getElementById('tmDebugClose').addEventListener('click', () => {
      toggleConsole();
    });

    // Keyboard shortcut: Cmd+Option+D (Mac) or Ctrl+Shift+D
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.altKey && e.key === 'd') {
        e.preventDefault();
        toggleConsole();
      }
    });
  }

  function toggleConsole() {
    const container = document.getElementById('tmDebugConsole');
    if (!container) return;
    
    isOpen = !isOpen;
    container.style.display = isOpen ? 'flex' : 'none';
    if (isOpen) {
      updateContent();
    }
  }

  function updateContent() {
    const content = document.getElementById('tmDebugContent');
    if (!content) return;

    if (logs.length === 0) {
      content.innerHTML = '<div style="color: #888; padding: 20px; text-align: center;">Aucun log pour le moment</div>';
      return;
    }

    content.innerHTML = logs.slice(-50).map(log => {
      const color = log.type === 'error' ? '#DC2626' : 
                   log.type === 'warn' ? '#F59E0B' : 
                   log.type === 'info' ? '#1FAF6A' : '#fff';
      const icon = log.type === 'error' ? '❌' : 
                  log.type === 'warn' ? '⚠️' : 
                  log.type === 'info' ? 'ℹ️' : '📝';
      
      return `
        <div style="margin-bottom: 8px; padding: 8px; background: #2a2a2a; border-radius: 4px; border-left: 3px solid ${color};">
          <div style="color: ${color}; font-weight: bold; margin-bottom: 4px;">
            ${icon} ${log.type.toUpperCase()} - ${log.time}
          </div>
          <div style="color: #ccc; white-space: pre-wrap; word-break: break-word;">${escapeHtml(log.message)}</div>
          ${log.stack ? `<div style="color: #888; font-size: 10px; margin-top: 4px; white-space: pre-wrap;">${escapeHtml(log.stack)}</div>` : ''}
        </div>
      `;
    }).join('');
    
    content.scrollTop = content.scrollHeight;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function addLog(type, message, stack = null) {
    const time = new Date().toLocaleTimeString('fr-FR');
    logs.push({ type, message, stack, time });
    if (logs.length > 100) logs.shift(); // Keep last 100 logs
    
    // Auto-open on errors
    if (type === 'error' && !isOpen) {
      const container = document.getElementById('tmDebugConsole');
      if (container) {
        isOpen = true;
        container.style.display = 'flex';
        updateContent();
      }
    } else if (isOpen) {
      updateContent();
    }
  }

  // Intercept console methods
  const originalConsole = {
    log: console.log,
    error: console.error,
    warn: console.warn,
    info: console.info
  };

  console.log = function(...args) {
    originalConsole.log.apply(console, args);
    addLog('log', args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
  };

  console.error = function(...args) {
    originalConsole.error.apply(console, args);
    const message = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
    const stack = args.find(a => a && a.stack)?.stack || new Error().stack;
    addLog('error', message, stack);
  };

  console.warn = function(...args) {
    originalConsole.warn.apply(console, args);
    addLog('warn', args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
  };

  console.info = function(...args) {
    originalConsole.info.apply(console, args);
    addLog('info', args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
  };

  // Intercept window errors
  window.addEventListener('error', (e) => {
    addLog('error', `${e.message} (${e.filename}:${e.lineno}:${e.colno})`, e.error?.stack);
  });

  // Intercept unhandled promise rejections
  window.addEventListener('unhandledrejection', (e) => {
    const reason = e.reason?.message || String(e.reason);
    addLog('error', `Unhandled Promise Rejection: ${reason}`, e.reason?.stack);
  });

  // Intercept fetch errors
  const originalFetch = window.fetch;
  window.fetch = function(...args) {
    return originalFetch.apply(this, args)
      .then(response => {
        if (!response.ok) {
          response.clone().text().then(text => {
            try {
              const json = JSON.parse(text);
              if (json.error) {
                addLog('error', `API Error: ${json.error}`, `URL: ${args[0]}`);
              }
            } catch (e) {
              addLog('error', `HTTP ${response.status}: ${text.substring(0, 200)}`, `URL: ${args[0]}`);
            }
          }).catch(() => {});
        }
        return response;
      })
      .catch(error => {
        addLog('error', `Fetch Error: ${error.message}`, error.stack);
        throw error;
      });
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createDebugConsole);
  } else {
    createDebugConsole();
  }

  // Expose toggle function globally
  window.toggleDebugConsole = toggleConsole;
})();







