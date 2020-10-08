'use strict';

(() => {

  const MAP_PINS = 8;

  const {map} = window.cityPlan;

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

  window.data = {
    getPinsAd,
  };

})();
