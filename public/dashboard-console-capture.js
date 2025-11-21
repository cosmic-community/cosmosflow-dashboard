(function() {
  // Only run in iframe context
  if (window.self === window.top) return;
  
  const logs = [];
  const MAX_LOGS = 500;
  
  // Store original console methods
  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug
  };
  
  // Helper to serialize arguments
  function serializeArgs(args) {
    return Array.from(args).map(arg => {
      if (typeof arg === 'object' && arg !== null) {
        try {
          return JSON.stringify(arg, (key, value) => {
            if (typeof value === 'function') return '[Function]';
            if (value instanceof Error) return value.toString();
            return value;
          }, 2);
        } catch (e) {
          return '[Object]';
        }
      }
      return String(arg);
    }).join(' ');
  }
  
  // Capture log function
  function captureLog(level, args) {
    const timestamp = new Date().toISOString();
    const message = serializeArgs(args);
    
    const logEntry = {
      timestamp,
      level,
      message,
      url: window.location.href
    };
    
    // Store in memory
    logs.push(logEntry);
    if (logs.length > MAX_LOGS) {
      logs.shift();
    }
    
    // Send to parent
    try {
      window.parent.postMessage({
        type: 'console-log',
        log: logEntry
      }, '*');
    } catch (e) {
      // Silent fail
    }
  }
  
  // Override console methods
  console.log = function() {
    originalConsole.log.apply(console, arguments);
    captureLog('log', arguments);
  };
  
  console.warn = function() {
    originalConsole.warn.apply(console, arguments);
    captureLog('warn', arguments);
  };
  
  console.error = function() {
    originalConsole.error.apply(console, arguments);
    captureLog('error', arguments);
  };
  
  console.info = function() {
    originalConsole.info.apply(console, arguments);
    captureLog('info', arguments);
  };
  
  console.debug = function() {
    originalConsole.debug.apply(console, arguments);
    captureLog('debug', arguments);
  };
  
  // Capture unhandled errors
  window.addEventListener('error', function(event) {
    captureLog('error', [`Unhandled Error: ${event.message} at ${event.filename}:${event.lineno}:${event.colno}`]);
  });
  
  // Capture unhandled promise rejections
  window.addEventListener('unhandledrejection', function(event) {
    captureLog('error', [`Unhandled Promise Rejection: ${event.reason}`]);
  });
  
  // Send ready message
  function sendReady() {
    try {
      window.parent.postMessage({
        type: 'console-capture-ready',
        url: window.location.href,
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {
      // Silent fail
    }
  }
  
  // Send route change message
  function sendRouteChange() {
    try {
      window.parent.postMessage({
        type: 'route-change',
        route: {
          pathname: window.location.pathname,
          search: window.location.search,
          hash: window.location.hash,
          href: window.location.href
        },
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {
      // Silent fail
    }
  }
  
  // Monitor route changes
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function() {
    originalPushState.apply(history, arguments);
    sendRouteChange();
  };
  
  history.replaceState = function() {
    originalReplaceState.apply(history, arguments);
    sendRouteChange();
  };
  
  window.addEventListener('popstate', sendRouteChange);
  window.addEventListener('hashchange', sendRouteChange);
  
  // Send ready and initial route on load
  if (document.readyState === 'complete') {
    sendReady();
    sendRouteChange();
  } else {
    window.addEventListener('load', function() {
      sendReady();
      sendRouteChange();
    });
  }
})();