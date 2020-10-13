'use strict';

(() => {

  const MOUSE_MAIN_BUTTON = 0;
  const MAIN_PIN_START_X = 570;
  const MAIN_PIN_START_Y = 375;

  const {map, mapFilterSelects, mapFilterInputs, onError} = window.cityPlan;
  const {setupAddress, adForm, mainPin, initMainPinPosition} = window.validation;
  const {close} = window.card;
  const {getPins} = window.marker;
  const {load, save} = window.backend;
  const {onMainPinMouseMove} = window.shift;
  const {isEscEvent} = window.util;

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

  // Сообщение удачного отправления формы
  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const success = successTemplate.cloneNode(true);
  const showSuccessMessage = () => {
    map.appendChild(success);

    document.addEventListener(`click`, bannerClickHendler);
    document.addEventListener(`keydown`, bannerKeyDownHendler);
  };

  const bannerClickHendler = () => {
    closeBanner();
  };

  const bannerKeyDownHendler = (evt) => {
    isEscEvent(evt, closeBanner);
  };

  const closeBanner = () => {
    const messageSuccess = document.querySelector(`.success`);
    messageSuccess.remove();

    document.removeEventListener(`click`, bannerClickHendler);
    document.removeEventListener(`keydown`, bannerKeyDownHendler);
  };

  // Сообщение об ошибке
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const error = errorTemplate.cloneNode(true);
  const showErrorMessage = () => {
    map.appendChild(error);

    document.addEventListener(`click`, bannerErrorClickHendler);
    document.addEventListener(`keydown`, bannerErrorKeyDownHendler);
  };

  const bannerErrorClickHendler = () => {
    closeBannerError();
  };

  const bannerErrorKeyDownHendler = (evt) => {
    isEscEvent(evt, closeBannerError);
  };

  const closeBannerError = () => {
    const message = document.querySelector(`.error`);
    message.remove();

    document.removeEventListener(`click`, bannerErrorClickHendler);
    document.removeEventListener(`keydown`, bannerErrorKeyDownHendler);
  };

  const removePins = () => {
    const currentPins = map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    currentPins.forEach(function (currentPin) {
      currentPin.remove();
    });
  };

  const buttonReset = document.querySelector(`.ad-form__reset`);
  const resetForm = () => {
    adForm.reset();
  };

  const deactivatePage = () => {
    map.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);
    adForm.reset();
    close();
    removePins();
    setupAddress();

    mainPin.style.left = `${MAIN_PIN_START_X}px`;
    mainPin.style.top = `${MAIN_PIN_START_Y}px`;
    initMainPinPosition();
    setStatusDisabled(mapFilterSelects);
    setStatusDisabled(mapFilterInputs);
    setStatusDisabled(adSelects);
    setStatusDisabled(adInputs);
    adTextarea.setAttribute(`disabled`, `true`);
    adSubmit.setAttribute(`disabled`, `true`);

    mainPin.addEventListener(`mousedown`, onMainPinClick);
    mainPin.removeEventListener(`mousedown`, onMainPinMouseMove);
    buttonReset.removeEventListener(`click`, resetForm);
  };

  const activatePage = () => {
    adForm.classList.remove(`ad-form--disabled`);
    map.classList.remove(`map--faded`);

    setupAddress();
    setStatusActive(adInputs);
    setStatusActive(adSelects);
    setStatusActive(mapFilterSelects);
    setStatusActive(mapFilterInputs);
    adTextarea.removeAttribute(`disabled`, `true`);
    adSubmit.removeAttribute(`disabled`, `true`);

    const onLoad = (data) => {
      const adMapPins = document.querySelector(`.map__pins`);
      adMapPins.append(getPins(data));
    };
    load(onLoad, onError);

    adForm.addEventListener(`submit`, (evt) => {
      save(new FormData(adForm), () => {
        deactivatePage();
        showSuccessMessage();
      }, showErrorMessage);
      evt.preventDefault();
    });

    mainPin.removeEventListener(`mousedown`, onMainPinClick);
    mainPin.addEventListener(`mousedown`, onMainPinMouseMove);

    buttonReset.addEventListener(`click`, resetForm);
  };

})();
