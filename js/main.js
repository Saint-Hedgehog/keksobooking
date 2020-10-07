'use strict';

(() => {

  const MOUSE_MAIN_BUTTON = 0;

  const {map, mapFilterSelects, mapFilterInputs} = window.map;
  const {setupAddress, adForm, mainPin} = window.form;
  const {closeCard} = window.card;
  const {getPins} = window.pin;
  const {getPinsAd} = window.data;

  const adFormSelects = adForm.querySelectorAll(`select`);
  const adFormInputs = adForm.querySelectorAll(`input`);
  const adFormTextarea = adForm.querySelector(`#description`);
  const adFormSubmit = adForm.querySelector(`.ad-form__element--submit`);

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
  setStatusDisabled(adFormSelects);
  setStatusDisabled(adFormInputs);
  adFormTextarea.setAttribute(`disabled`, `true`);
  adFormSubmit.setAttribute(`disabled`, `true`);

  const onMainPinClick = (evt) => {
    if (evt.button === MOUSE_MAIN_BUTTON) {
      activatePage();
      closeCard();
    }
  };

  mainPin.addEventListener(`click`, onMainPinClick);

  const activatePage = () => {
    adForm.classList.remove(`ad-form--disabled`);
    map.classList.remove(`map--faded`);

    setStatusActive(adFormInputs);
    setStatusActive(adFormSelects);
    setStatusActive(mapFilterSelects);
    setStatusActive(mapFilterInputs);
    setupAddress();
    adFormTextarea.removeAttribute(`disabled`, `true`);
    adFormSubmit.removeAttribute(`disabled`, `true`);

    const adMap = getPinsAd();
    const adMapPins = document.querySelector(`.map__pins`);
    adMapPins.append(getPins(adMap));
    mainPin.removeEventListener(`click`, onMainPinClick);
  };

})();
