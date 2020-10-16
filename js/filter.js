'use strict';

(() => {
  const PIN_COUNT = 5;
  const {getPins} = window.marker;
  const {map} = window.cityPlan;

  const removePins = () => {
    const currentPins = map.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    currentPins.forEach((currentPin) => {
      currentPin.remove();
    });
  };

  let ads;
  const onLoad = (data) => {
    ads = data;
    updateAds(data);
  };

  const adMapPins = document.querySelector(`.map__pins`);
  const updateAds = (data) => {
    removePins();
    adMapPins.append(getPins(data.slice(0, PIN_COUNT)));
  };

  const housingType = document.querySelector(`#housing-type`);
  let housingTypeValue = ``;
  const ANY_HOUSING = `any`;
  housingType.addEventListener(`change`, () => {
    close();
    housingTypeValue = housingType.value;
    let newAds = [];
    ads.forEach((itemAd) => {
      if (housingTypeValue === ANY_HOUSING || itemAd.offer.type === housingTypeValue) {
        newAds.push(itemAd);
      }
    });
    updateAds(newAds);
  });

  window.filter = {
    onLoad,
  };
})();
