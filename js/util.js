'use strict';

(() => {

  const isEscEvent = (evt, callback) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      callback();
    }
  };

  const isEnterEvent = (evt, callback) => {
    if (evt.key === `Enter`) {
      callback();
    }
  };

  window.util = {
    isEscEvent,
    isEnterEvent,
  };

})();
