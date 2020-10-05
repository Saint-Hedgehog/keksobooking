'use strict';

(() => {

  const MAIN_PIN_WIDTH = 65;
  const MAIN_PIN_HEIGHT = 65;
  const PIN_TIP_HEIGHT = 22;
  const MOUSE_MAIN_BUTTON = 0;

  const MAP_PINS = 8;
  const map = document.querySelector(`.map`);

  // Получение случайного целого числа в заданном интервале между min и max (максимум не включается, минимум включается)
  const getRandomNubmer = (min, max) => Math.floor(Math.random() * (max - min) + min);

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
    const types = [`palace`, `flat`, `house`, `bungalo`];
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
              price: getRandomNubmer(1000, 10000),
              type: getRandomItem(types),
              rooms: getRandomNubmer(1, 10),
              guests: getRandomNubmer(1, 5),
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
    });

    return fragment;
  };

  // Заполненный фрагмент добавляем его разметку на карте
  const adMap = getPinsAd();
  const adMapPins = document.querySelector(`.map__pins`);

  //   // ------------------------------ Часть вторая --------------------------------
  //   const generateFeatures = (featuresCard, cardFragment) => {
  //     featuresCard.forEach((feature) => {
  //       const featureElement = document.createElement(`li`);
  //       featureElement.className = `popup__feature popup__feature--${feature}`;
  //       cardFragment.appendChild(featureElement);
  //     });
  //     return cardFragment;
  //   };
  //   // Находим шаблон модального окна с информацией об объявлении и заполняем его
  //   const getCard = (data) => {
  //     const cardTemplate = document.querySelector(`#card`).content;
  //     const cardElement = cardTemplate.cloneNode(true);
  //     const cardFragment = document.createDocumentFragment();
  //     const {title, address, price, rooms, guests, checkin, checkout, description, photos, features, type} = data.offer; // Деструктуризация
  //     const {avatar} = data.author;

  //     // В список .popup__features вводим все доступные удобства
  //     const cardFeaturesContainer = cardElement.querySelector(`.popup__features`);

  //     cardFeaturesContainer.innerHTML = ``;

  //     // В блок .popup__photos вводим все фотографии из списка offer.photos
  //     const renderPhotos = (popupPhotos, photosCard) => {
  //       const cardPhotos = popupPhotos.querySelector(`.popup__photos`);
  //       const cardPhoto = cardPhotos.querySelector(`img`);

  //       cardPhotos.innerHTML = ``;
  //       photosCard.forEach((photo) => {
  //         const newcardPhoto = cardPhoto.cloneNode(true);
  //         newcardPhoto.src = photo;
  //         cardFragment.appendChild(newcardPhoto);
  //       });
  //       cardPhotos.appendChild(cardFragment);
  //     };

  //     // В блок .popup__type вводим тип жилья
  //     const cardType = cardElement.querySelector(`.popup__type`);
  //     const Housing = {
  //       FLAT: `flat`,
  //       BUNGALO: `bungalo`,
  //       HOUSE: `house`,
  //       PALACE: `palace`,
  //     };

  //     switch (type) {
  //       case (Housing.FLAT):
  //         cardType.textContent = `квартира`;
  //         break;
  //       case (Housing.BUNGALO):
  //         cardType.textContent = `бунгало`;
  //         break;
  //       case (Housing.HOUSE):
  //         cardType.textContent = `дом`;
  //         break;
  //       case (Housing.PALACE):
  //         cardType.textContent = `дворец`;
  //         break;
  //     }

  //     // Вводим остальные данные в шаблон
  //     cardElement.querySelector(`.popup__title`).textContent = title;
  //     cardElement.querySelector(`.popup__text--address`).textContent = address;
  //     cardElement.querySelector(`.popup__text--price`).textContent = `${price}₽/ночь`;
  //     cardElement.querySelector(`.popup__text--capacity`).textContent = `${rooms} комнаты для ${guests} гостей`;
  //     cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  //     cardFeaturesContainer.appendChild(generateFeatures(features, cardFragment));
  //     cardElement.querySelector(`.popup__description`).textContent = description;
  //     renderPhotos(cardElement, photos);
  //     cardElement.querySelector(`.popup__avatar`).src = avatar;
  //     return cardElement;
  //   };

  //   // Вставляем полученный DOM-элемент в блок .map перед блоком.map__filters-container
  //   const mapFilterContainer = document.querySelector(`.map__filters-container`);
  //   map.insertBefore(getCard(adMap[0]), mapFilterContainer);

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
  const mainPinLocation = adForm.querySelector(`#address`);
  const pinCenterPositionX = Math.floor(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2);
  const pinCenterPositionY = Math.floor(mainPin.offsetTop + MAIN_PIN_HEIGHT / 2);
  const adFormRoomNumber = adForm.querySelector(`#room_number`);
  const adFormGuestNumber = adForm.querySelector(`#capacity`);

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

  // Заполнение поля адреса
  const initPinMainPosition = () => {
    mainPinLocation.value = `${pinCenterPositionX}, ${pinCenterPositionY}`;
  };
  initPinMainPosition();

  const setupAddress = () => {
    const newPinPositionY = Math.floor(mainPin.offsetTop + MAIN_PIN_HEIGHT + PIN_TIP_HEIGHT);
    mainPinLocation.value = `${pinCenterPositionX}, ${newPinPositionY}`;
  };

  // Активация страницы по событиям
  mainPin.addEventListener(`mousedown`, (evt) => {
    if (evt.button === MOUSE_MAIN_BUTTON) {
      activatePage();
    }
  });

  const onMainPinEnterPress = (evt) => {
    if (evt.key === `Enter`) {
      activatePage();
    }
  };

  mainPin.addEventListener(`keydown`, onMainPinEnterPress);

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
    adMapPins.append(getPins(adMap));

    mainPin.removeEventListener(`keydown`, onMainPinEnterPress);
  };

  // Валидация: зависимость кол-ва гостей от кол-ва комнат
  // Проверяем количество комнат
  const checkRoomNumber = (roomNumber) => {
    switch (roomNumber) {
      case `1`:
        roomNumber = 1;
        break;
      case `2`:
        roomNumber = 2;
        break;
      case `3`:
        roomNumber = 3;
        break;
      case `100`:
        roomNumber = 100;
        break;
    }
    return roomNumber;
  };

  // Проверяем количество гостей
  const checkGuestNumber = (guestNumber) => {
    switch (guestNumber) {
      case `1`:
        guestNumber = 1;
        break;
      case `2`:
        guestNumber = 2;
        break;
      case `3`:
        guestNumber = 3;
        break;
      case `0`:
        guestNumber = 100;
        break;
    }
    return guestNumber;
  };

  // Устанавливаем выбор количества доступных гостей
  const setGuestNumber = (roomNumber, guestNumber) => {
    switch (roomNumber) {
      case 1:
        if (roomNumber !== guestNumber) {
          adFormGuestNumber.setCustomValidity(`1 комната для 1 гостя`);
        } else {
          adFormGuestNumber.setCustomValidity(``);
        }
        break;
      case 2:
        if (!(roomNumber >= guestNumber)) {
          adFormGuestNumber.setCustomValidity(`2 комнаты для 2 гостей или для 1 гостя`);
        } else {
          adFormGuestNumber.setCustomValidity(``);
        }
        break;
      case 3:
        if (!(roomNumber >= guestNumber)) {
          adFormGuestNumber.setCustomValidity(`3 комнаты для 3 гостей, для 2 гостей или для 1 гостя`);
        } else {
          adFormGuestNumber.setCustomValidity(``);
        }
        break;
      case 100:
        if (roomNumber !== guestNumber) {
          adFormGuestNumber.setCustomValidity(`не для гостей`);
        } else {
          adFormGuestNumber.setCustomValidity(``);
        }
    }
  };

  const setGuestNumbers = () => {
    const roomNumber = checkRoomNumber(adFormRoomNumber.value);
    const guestNumber = checkGuestNumber(adFormGuestNumber.value);
    return setGuestNumber(roomNumber, guestNumber);
  };
  setGuestNumbers();

  // Проверяем изменение количества комнат
  adFormRoomNumber.addEventListener(`change`, () => {
    setGuestNumbers();
  });

  // Проверяем изменение количества гостей
  adFormGuestNumber.addEventListener(`change`, () => {
    setGuestNumbers();
  });

})();
