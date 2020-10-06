'use strict';

(() => {

  const MAIN_PIN_WIDTH = 65;
  const MAIN_PIN_HEIGHT = 65;
  const PIN_TIP_HEIGHT = 22;
  const MOUSE_MAIN_BUTTON = 0;

  const MAP_PINS = 8;

  const map = document.querySelector(`.map`);

  // Получение случайного целого числа в заданном интервале между min и max (максимум, минимум включается)
  const getRandomNubmer = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  // Получение случайной длины элемента
  const getRandomItem = (items) => items[Math.floor(Math.random() * items.length)];

  // Получение случайных координат адресса
  const getLocation = () => {
    const locationX = Math.floor(Math.random() * (1000 - 1) + 1); // 600
    const locationY = Math.floor(Math.random() * (1000 - 1) + 1); // 350
    return `${locationX}, ${locationY}`;
  };

  // Изменяем содержимое массива, удаляя все элементы после случайного индекса(включительно)
  const getRandomItems = (items) => items.slice(getRandomNubmer(0, items.length));

  // Создаем массив сгенерированных JS объектов, добавляем элементы в конец массива и возвращаем новую длину массива.
  const getPinsAd = () => {
    const pinsData = []; // массив похожих объявлений
    const types = [`palace`, `flat`, `house`, `bungalow`];
    const features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
    const checkin = [`12:00`, `13:00`, `14:00`];
    const checkout = [`12:00`, `13:00`, `14:00`];
    const houseFotos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

    for (let i = 1; i <= MAP_PINS; i++) {

      pinsData.push(
          {
            author: {
              avatar: `img/avatars/user0${i}.png`,
            },
            offer: {
              title: `Обьявление`,
              address: getLocation(),
              price: getRandomNubmer(0, 1000000),
              type: getRandomItem(types),
              rooms: getRandomNubmer(1, 100),
              guests: getRandomNubmer(1, 3),
              checkin: getRandomItem(checkin),
              checkout: getRandomItem(checkout),
              features: getRandomItems(features),
              description: `Описание`,
              photos: getRandomItems(houseFotos) // Массив строк случайной длины
            },
            location: {
              x: getRandomNubmer(0, map.clientWidth),
              y: getRandomNubmer(130, 630),
            }
          }
      );
    }

    return pinsData;
  };

  // Находим шаблон для отрисовки пина на карте и заполняем его
  const getPins = (data) => {
    const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    const fragment = document.createDocumentFragment();

    data.forEach((pinData) => {
      const elem = pinTemplate.cloneNode(true);
      const img = elem.querySelector(`img`);
      elem.style = `left: ${pinData.location.x - img.width / 2}px; top: ${pinData.location.y - img.height}px;`;
      img.src = pinData.author.avatar;
      img.alt = pinData.offer.title;
      fragment.append(elem);
      elem.addEventListener(`click`, () => {
        openCard(pinData);
      });
    });

    return fragment;
  };

  // ------------------------------ Часть вторая --------------------------------
  const generateFeatures = (featuresCard, cardFragment) => {
    featuresCard.forEach((feature) => {
      const featureElement = document.createElement(`li`);
      featureElement.className = `popup__feature popup__feature--${feature}`;
      cardFragment.appendChild(featureElement);
    });
    return cardFragment;
  };
  // Находим шаблон модального окна с информацией об объявлении и заполняем его
  const getCard = (data) => {
    const cardTemplate = document.querySelector(`#card`).content;
    const cardElement = cardTemplate.cloneNode(true);
    const cardFragment = document.createDocumentFragment();
    const {title, address, price, rooms, guests, checkin, checkout, description, photos, features, type} = data.offer; // Деструктуризация
    const {avatar} = data.author;
    const closeCardButton = cardElement.querySelector(`.popup__close`);
    closeCardButton.addEventListener(`click`, () => {
      closeCard();
    });

    // В список .popup__features вводим все доступные удобства
    const cardFeaturesContainer = cardElement.querySelector(`.popup__features`);

    cardFeaturesContainer.innerHTML = ``;

    // В блок .popup__photos вводим все фотографии из списка offer.photos
    const renderPhotos = (popupPhotos, photosCard) => {
      const cardPhotos = popupPhotos.querySelector(`.popup__photos`);
      const cardPhoto = cardPhotos.querySelector(`img`);

      cardPhotos.innerHTML = ``;
      photosCard.forEach((photo) => {
        const newcardPhoto = cardPhoto.cloneNode(true);
        newcardPhoto.src = photo;
        cardFragment.appendChild(newcardPhoto);
      });
      cardPhotos.appendChild(cardFragment);
    };

    // В блок .popup__type вводим тип жилья
    const cardType = cardElement.querySelector(`.popup__type`);
    const Housing = {
      FLAT: `flat`,
      BUNGALOW: `bungalow`,
      HOUSE: `house`,
      PALACE: `palace`,
    };

    switch (type) {
      case (Housing.FLAT):
        cardType.textContent = `квартира`;
        break;
      case (Housing.BUNGALOW):
        cardType.textContent = `бунгало`;
        break;
      case (Housing.HOUSE):
        cardType.textContent = `дом`;
        break;
      case (Housing.PALACE):
        cardType.textContent = `дворец`;
        break;
    }

    // Вводим количество комнат для количества гостей
    const roomEnding = (roomsEnding) => {
      let lastDigit = roomsEnding;
      if (roomsEnding > 20) {
        lastDigit = roomsEnding % 10;
      }
      const ending = {
        0: ``,
        1: `а`,
        2: `ы`,
        3: `ы`,
        4: `ы`,
        5: ``,
        6: ``,
        7: ``,
        8: ``,
        9: ``,
      };
      let result = (roomsEnding >= 5 && roomsEnding <= 20) ? `` : ending[lastDigit];
      return result;
    };

    const guestEnding = (guestsEnding) => {
      const lastDigit = guestsEnding;
      if (guestsEnding >= 10) {
        lastDigit = guestsEnding % 10;
      }
      const result = (lastDigit === 1) ? `я` : `ей`;
      return result;
    };

    cardElement.querySelector(`.popup__text--capacity`).textContent = `${rooms} комнат${roomEnding(rooms)} для ${guests} гост${guestEnding(guests)}`;

    // Вводим остальные данные в шаблон
    cardElement.querySelector(`.popup__title`).textContent = title;
    cardElement.querySelector(`.popup__text--address`).textContent = address;
    cardElement.querySelector(`.popup__text--price`).textContent = `${price}₽/ночь`;
    cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
    cardFeaturesContainer.appendChild(generateFeatures(features, cardFragment));
    cardElement.querySelector(`.popup__description`).textContent = description;
    renderPhotos(cardElement, photos);
    cardElement.querySelector(`.popup__avatar`).src = avatar;
    map.insertBefore(cardElement, mapFilterContainer);
    return cardElement;
  };

  // --------------- доверяй, но проверяй (часть 1) --------------------
  const mapPins = document.querySelector(`.map__pins`);
  const mainPin = mapPins.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormSelects = adForm.querySelectorAll(`select`);
  const adFormInputs = adForm.querySelectorAll(`input`);
  const adFormTextarea = adForm.querySelector(`#description`);
  const adFormSubmit = adForm.querySelector(`.ad-form__element--submit`);
  const mapFilter = document.querySelector(`.map__filters`);
  const mapFilterSelects = mapFilter.querySelectorAll(`select`);
  const mapFilterInputs = mapFilter.querySelectorAll(`input`);

  const mapFilterContainer = document.querySelector(`.map__filters-container`);

  // Все <input>, <select>, <textarea> и кнопка опубликовать, очистить формы .ad-form и карты заблокированы с помощью атрибута disabled
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

  // Активация страницы по событиям
  mainPin.addEventListener(`click`, (evt) => {
    if (evt.button === MOUSE_MAIN_BUTTON) {
      activatePage();
    }
  });

  const onMapCardEscPress = (evt) => {
    if (evt.key === `Escape`) {
      closeCard();
    }
  };

  const openCard = (pinData) => {
    closeCard();
    getCard(pinData);
    document.addEventListener(`keydown`, onMapCardEscPress);
  };

  const closeCard = () => {
    const card = map.querySelector(`.map__card`);
    if (card) {
      card.remove();
    }
    document.removeEventListener(`keydown`, onMapCardEscPress);
  };

  function clearPins() {
    const previousPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    if (previousPins) {
      previousPins.forEach((elem) => {
        elem.parentNode.removeChild(elem);
      });
    }
  }

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

    clearPins();
    const adMap = getPinsAd();
    const adMapPins = document.querySelector(`.map__pins`);
    adMapPins.append(getPins(adMap));
  };

  // -------------------- Продолжаем валидировать ------------------------
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
  const pinCenterPositionX = Math.floor(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2);
  const pinCenterPositionY = Math.floor(mainPin.offsetTop + MAIN_PIN_HEIGHT / 2);
  const mainPinLocation = adForm.querySelector(`#address`);

  const initPinMainPosition = () => {
    mainPinLocation.value = `${pinCenterPositionX}, ${pinCenterPositionY}`;
  };
  initPinMainPosition();

  const setupAddress = () => {
    const newPinPositionY = Math.floor(mainPin.offsetTop + MAIN_PIN_HEIGHT + PIN_TIP_HEIGHT);
    mainPinLocation.value = `${pinCenterPositionX}, ${newPinPositionY}`;
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
  // --------------
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
      if (capacityValidValues[rooms].indexOf(option.value) === -1) {
        option.disabled = true;
      } else {
        option.disabled = false;
      }
    });
    if (options[adFormGuestNumber.selectedIndex].disabled) {
      adFormGuestNumber.querySelector(`option:not([disabled])`).selected = true;
    }
  };
  setFormCapacity();

  adFormRoomNumber.addEventListener(`change`, () => {
    setFormCapacity();
  });

})();
