'use strict';

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

const setStatusDisabled = (elements) => {
  elements.forEach((element) => {
    element.setAttribute(`disabled`, `true`);
  });
};

const setStatusActive = (elements) => {
  elements.forEach((element) => {
    element.removeAttribute(`disabled`);
  });
};

window.util = {
  isEscEvent,
  isEnterEvent,
  setStatusDisabled,
  setStatusActive,
};
