'use strict';

const {openPopup} = window.card;

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
      openPopup(pinData);
    });
  });

  return fragment;
};

window.marker = {
  getPins,
};
