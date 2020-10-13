'use strict';

(() => {

  // Валидация и заполнение формы
  const MAIN_PIN_WIDTH = 65;
  const MAIN_PIN_HEIGHT = 65;
  const PIN_TIP_HEIGHT = 22;

  const adForm = document.querySelector(`.ad-form`);

  // Проверка заполнения заголовка объявления
  const inputTitle = adForm.querySelector(`#title`);

  let minTitleLength = inputTitle.minLength;
  let maxTitleLengtn = inputTitle.maxLength;

  inputTitle.addEventListener(`input`, () => {
    let valueLength = inputTitle.value.length;

    if (valueLength < minTitleLength) {
      inputTitle.setCustomValidity(`Минимальная длина — 30 символов, ещё ${minTitleLength - valueLength} символов`);
    } else if (valueLength > maxTitleLengtn) {
      inputTitle.setCustomValidity(`Максимальная длина — 100 символов, удалите лишние ${valueLength - maxTitleLengtn} символов`);
    } else {
      inputTitle.setCustomValidity(``);
    }
    inputTitle.reportValidity();
  });

  // Заполнение поля адреса
  const mapPins = document.querySelector(`.map__pins`);
  const mainPin = mapPins.querySelector(`.map__pin--main`);

  const pinCenterPositionX = Math.floor(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2);
  const pinCenterPositionY = Math.floor(mainPin.offsetTop + MAIN_PIN_HEIGHT / 2);
  const mainPinLocation = adForm.querySelector(`#address`);

  const initMainPinPosition = () => {
    mainPinLocation.value = `${pinCenterPositionX}, ${pinCenterPositionY}`;
  };
  initMainPinPosition();

  const setupAddress = () => {
    const newPinCenterPositionX = Math.floor(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2);
    const newPinPositionY = Math.floor(mainPin.offsetTop + MAIN_PIN_HEIGHT + PIN_TIP_HEIGHT);
    mainPinLocation.value = `${newPinCenterPositionX}, ${newPinPositionY}`;
  };
  mainPinLocation.setAttribute(`readonly`, `true`);

  // Зависимость, цена за ночь от типа жилья
  const inputPrice = adForm.querySelector(`#price`);

  const validationPrice = () => {
    if (inputPrice.validity.valueMissing) {
      inputPrice.setCustomValidity(`Обязательное поле`);
    } else if (inputPrice.validity.badInput) {
      inputPrice.setCustomValidity(`Пожалуйста, введите число`);
    } else if (inputPrice.validity.rangeUnderflow) {
      inputPrice.setCustomValidity(`Пожалуйста, не меньше ${inputPrice.min}`);
    } else if (inputPrice.validity.rangeOverflow) {
      inputPrice.setCustomValidity(`Пожалуйста, не больше ${inputPrice.max}`);
    } else {
      inputPrice.setCustomValidity(``);
    }
  };

  inputPrice.addEventListener(`invalid`, () => {
    validationPrice();

  });
  inputPrice.addEventListener(`input`, () => {
    validationPrice();
  });

  const mapTypeToPrice = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };

  const setMinPrice = (minPrice) => {
    inputPrice.setAttribute(`min`, minPrice);
    inputPrice.setAttribute(`placeholder`, minPrice);
  };

  const selectType = adForm.querySelector(`#type`);

  let minPrice = mapTypeToPrice[selectType.value];
  setMinPrice(minPrice);

  selectType.addEventListener(`change`, () => {
    inputPrice.value = ``;
    minPrice = mapTypeToPrice[selectType.value];
    setMinPrice(minPrice);
  });

  // Зависимость времени заезда от время выезда
  const selectCheckIn = adForm.querySelector(`#timein`);
  const selectCheckOut = adForm.querySelector(`#timeout`);

  const changeCheckIn = (checkIn) => {
    selectCheckIn.value = checkIn;
  };
  const changeCheckOut = (checkOut) => {
    selectCheckOut.value = checkOut;
  };
  selectCheckIn.addEventListener(`change`, () => {
    changeCheckOut(selectCheckIn.value);
  });
  selectCheckOut.addEventListener(`change`, () => {
    changeCheckIn(selectCheckOut.value);
  });

  // Зависимость кол-ва гостей от кол-ва комнат
  const adFormRoomNumber = adForm.querySelector(`#room_number`);
  const adFormGuestNumber = adForm.querySelector(`#capacity`);

  const capacityValidValues = {
    '1': [`1`],
    '2': [`1`, `2`],
    '3': [`1`, `2`, `3`],
    '100': [`0`]
  };

  const setFormCapacity = () => {
    let rooms = adFormRoomNumber.value;
    let options = adFormGuestNumber.querySelectorAll(`option`);
    options.forEach((option) => {
      option.disabled = capacityValidValues[rooms].indexOf(option.value) === -1;
    });
    if (options[adFormGuestNumber.selectedIndex].disabled) {
      adFormGuestNumber.querySelector(`option:not([disabled])`).selected = true;
    }
  };
  setFormCapacity();

  adFormRoomNumber.addEventListener(`change`, () => {
    setFormCapacity();
  });

  window.validation = {
    MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT,
    PIN_TIP_HEIGHT,
    setupAddress,
    adForm,
    mainPin,
    initMainPinPosition,
  };

})();
