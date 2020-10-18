'use strict';

const MOUSE_MAIN_BUTTON = 0;
const MAIN_PIN_START_X = 570;
const MAIN_PIN_START_Y = 375;

const {map, mapFilterSelects, mapFilterInputs, onError} = window.cityPlan;
const {setupAddress, adForm, mainPin, initMainPinPosition, inputTitle, onInputTitleSetCustomValidity,
  inputPrice, onInputPriceCheckValidity, onInputPriceSetCustomValidity, selectType, onSelectTypeChange,
  selectCheckIn, onSelectCheckInChange, selectCheckOut, onSelectCheckOutChange, adFormRoomNumber,
  onAdFormRoomNumberChange} = window.validation;
const {close} = window.card;
const {load, save} = window.backend;
const {onMainPinSetAdressMouseMove} = window.shift;
const {isEscEvent} = window.util;
const {onLoad, removePins, filterForm, onFiltersSetNewAds} = window.filter;

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

const onMainPinActivateMouseDown = (evt) => {
  if (evt.button === MOUSE_MAIN_BUTTON) {
    activatePage();
  }
};

mainPin.addEventListener(`mousedown`, onMainPinActivateMouseDown);
mainPin.addEventListener(`mousedown`, onMainPinSetAdressMouseMove);

// Сообщение удачного отправления формы
const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
const success = successTemplate.cloneNode(true);
const showSuccessMessage = () => {
  map.appendChild(success);

  success.addEventListener(`click`, onBannerClick);
  document.addEventListener(`keydown`, onBannerKeyDown);
};

const onBannerClick = () => {
  closeBanner();
};

const onBannerKeyDown = (evt) => {
  isEscEvent(evt, closeBanner);
};

const closeBanner = () => {
  success.remove();

  success.removeEventListener(`click`, onBannerClick);
  document.removeEventListener(`keydown`, onBannerKeyDown);
};

// Сообщение об ошибке
const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
const error = errorTemplate.cloneNode(true);
const showErrorMessage = () => {
  map.appendChild(error);

  error.addEventListener(`click`, onBannerErrorClick);
  document.addEventListener(`keydown`, onBannerErrorKeyDown);
};

const onBannerErrorClick = () => {
  closeBannerError();
};

const onBannerErrorKeyDown = (evt) => {
  isEscEvent(evt, closeBannerError);
};

const closeBannerError = () => {
  error.remove();

  error.removeEventListener(`click`, onBannerErrorClick);
  document.removeEventListener(`keydown`, onBannerErrorKeyDown);
};

const buttonReset = document.querySelector(`.ad-form__reset`);
const onFormReset = (evt) => {
  evt.preventDefault();
  deactivatePage();
};

const deactivatePage = () => {
  close();
  removePins();
  adForm.reset();
  map.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);
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

  mainPin.addEventListener(`mousedown`, onMainPinActivateMouseDown);
  buttonReset.removeEventListener(`click`, onFormReset);

  filterForm.removeEventListener(`change`, onFiltersSetNewAds);
  inputTitle.removeEventListener(`input`, onInputTitleSetCustomValidity);
  inputPrice.removeEventListener(`invalid`, onInputPriceCheckValidity);
  inputPrice.removeEventListener(`input`, onInputPriceSetCustomValidity);
  selectType.removeEventListener(`change`, onSelectTypeChange);
  selectCheckIn.removeEventListener(`change`, onSelectCheckInChange);
  selectCheckOut.removeEventListener(`change`, onSelectCheckOutChange);
  adFormRoomNumber.removeEventListener(`change`, onAdFormRoomNumberChange);

  window.imageUpload.setDisabled();
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

  load(onLoad, onError);

  adForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    const data = new FormData(adForm);
    save(data, () => {
      deactivatePage();
      showSuccessMessage();
    }, showErrorMessage);
    document.activeElement.blur();
  });

  mainPin.removeEventListener(`mousedown`, onMainPinActivateMouseDown);
  buttonReset.addEventListener(`click`, onFormReset);

  filterForm.addEventListener(`change`, onFiltersSetNewAds);
  inputTitle.addEventListener(`input`, onInputTitleSetCustomValidity);
  inputPrice.addEventListener(`invalid`, onInputPriceCheckValidity);
  inputPrice.addEventListener(`input`, onInputPriceSetCustomValidity);
  selectType.addEventListener(`change`, onSelectTypeChange);
  selectCheckIn.addEventListener(`change`, onSelectCheckInChange);
  selectCheckOut.addEventListener(`change`, onSelectCheckOutChange);
  adFormRoomNumber.addEventListener(`change`, onAdFormRoomNumberChange);

  window.imageUpload.setEnabled();
};
