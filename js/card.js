'use strict';

const Housing = {
  FLAT: `flat`,
  BUNGALOW: `bungalow`,
  HOUSE: `house`,
  PALACE: `palace`,
};

const {isEscEvent} = window.util;
const {map} = window.cityPlan;

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
  const closeButton = cardElement.querySelector(`.popup__close`);
  closeButton.addEventListener(`click`, () => {
    closePopup();
  });

  // В список .popup__features вводим все доступные удобства
  const cardFeaturesContainer = cardElement.querySelector(`.popup__features`);

  cardFeaturesContainer.innerHTML = ``;

  // В блок .popup__photos вводим все фотографии из списка offer.photos
  const renderPhotos = (popupPhotos, photoSources) => {
    const cardPhotos = popupPhotos.querySelector(`.popup__photos`);
    const cardPhoto = cardPhotos.querySelector(`img`);

    cardPhotos.innerHTML = ``;
    photoSources.forEach((photo) => {
      const newcardPhoto = cardPhoto.cloneNode(true);
      newcardPhoto.src = photo;
      cardFragment.appendChild(newcardPhoto);
    });
    cardPhotos.appendChild(cardFragment);
  };

  // В блок .popup__type вводим тип жилья
  const cardType = cardElement.querySelector(`.popup__type`);

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
    return (roomsEnding >= 5 && roomsEnding <= 20) ? `` : ending[lastDigit];
  };

  const guestEnding = (guestsEnding) => {
    let lastDigit = guestsEnding;
    if (guestsEnding >= 10) {
      lastDigit = guestsEnding % 10;
    }
    return (lastDigit === 1) ? `я` : `ей`;
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

  const mapFilterContainer = document.querySelector(`.map__filters-container`);
  map.insertBefore(cardElement, mapFilterContainer);
  return cardElement;
};

const openPopup = (pinData) => {
  closePopup();
  getCard(pinData);
  document.addEventListener(`keydown`, onMapEscPress);
};

const onMapEscPress = (evt) => {
  isEscEvent(evt, closePopup);
};

const closePopup = () => {
  const card = map.querySelector(`.map__card`);
  if (card) {
    card.remove();
    document.removeEventListener(`keydown`, onMapEscPress);
  }
};

window.card = {
  openPopup,
  closePopup,
};
