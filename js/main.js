'use strict';

(() => {

  const MOUSE_MAIN_BUTTON = 0;

  const {map, mapFilterSelects, mapFilterInputs} = window.cityPlan;
  const {setupAddress, adForm, mainPin} = window.validation;
  const {close} = window.card;
  const {getPins} = window.marker;
  const {getPinsAd} = window.data;
  const {onMainPinMouseMove} = window.shift;

  const adSelects = adForm.querySelectorAll(`select`);
  const adInputs = adForm.querySelectorAll(`input`);
  const adTextarea = adForm.querySelector(`#description`);
  const adSubmit = adForm.querySelector(`.ad-form__element--submit`);

  const setStatusDisabled = (elements) => {
    elements.forEach((element) => {
      element.setAttribute(`disabled`, `true`);
    });
  };

  const setStatusActive = (elements) => {
    elements.forEach((element) => {
      element.removeAttribute(`disabled`, `true`);
    });
  };

  setStatusDisabled(mapFilterSelects);
  setStatusDisabled(mapFilterInputs);
  setStatusDisabled(adSelects);
  setStatusDisabled(adInputs);
  adTextarea.setAttribute(`disabled`, `true`);
  adSubmit.setAttribute(`disabled`, `true`);

  const onMainPinClick = (evt) => {
    if (evt.button === MOUSE_MAIN_BUTTON) {
      activatePage();
      close();
    }
  };

  mainPin.addEventListener(`mousedown`, onMainPinClick);

  const activatePage = () => {
    adForm.classList.remove(`ad-form--disabled`);
    map.classList.remove(`map--faded`);

    setStatusActive(adInputs);
    setStatusActive(adSelects);
    setStatusActive(mapFilterSelects);
    setStatusActive(mapFilterInputs);
    setupAddress();
    adTextarea.removeAttribute(`disabled`, `true`);
    adSubmit.removeAttribute(`disabled`, `true`);

    const adMap = getPinsAd();
    const adMapPins = document.querySelector(`.map__pins`);
    adMapPins.append(getPins(adMap));
    mainPin.removeEventListener(`mousedown`, onMainPinClick);
    mainPin.addEventListener(`mousedown`, onMainPinMouseMove);
  };

})();
