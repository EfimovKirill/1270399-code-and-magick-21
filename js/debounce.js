'use strict';

(() => {
  let DEBOUNCE_INTERVAL = 300; // ms

  window.debounce = (cb) => {
    let lastTimeout = null;

    return () => {
      let parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
          cb.apply(null, parameters);
        }, DEBOUNCE_INTERVAL);
    };
  };
})();
