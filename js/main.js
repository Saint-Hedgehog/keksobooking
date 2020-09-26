'use strict';
const MAP_PINS = 8;

// Переключает карту из неактивного состояния в активное
const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

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
const getRandomItems = (items, num) => items.splice(Math.floor(Math.random() * num));

// Создаем массив сгенерированных JS объектов, добавляем элементы в конец массива и возвращаем новую длину массива.
const getPinsAdd = () => {
  const pinsData = [];
  const types = [`palace`, `flat`, `house`, `bungalo`];
  const features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const checkin = [`12:00`, `13:00`, `14:00`];
  const checkout = [`12:00`, `13:00`, `14:00`];
  const houseFotos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

  for (let i = 1; i <= MAP_PINS; i++) {
    i = (i < 10) ? i = `0` + i : i = i;

    pinsData.push(
        {
          author: {
            avatar: `img/avatars/user${i}.png`,
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
            features: getRandomItems(features, 6),
            description: `Описание`,
            photos: getRandomItems(houseFotos, 3) // Массив строк случайной длины
          },
          location: {
            x: getRandomNubmer(10, 1200),
            y: getRandomNubmer(130, 630),
          }
        }
    );
  }

  return pinsData;
};

// Создаем метки объявления и добавляем их в фрагмент
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

// Заполненный фрагмент добавляем в разметку на карте
const addMap = getPinsAdd();
map.prepend(getPins(addMap));
