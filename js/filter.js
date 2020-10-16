'use strict';

(function () {
  const PIN_COUNT = 5;
  const {getPins} = window.marker;
  const {map} = window.cityPlan;

  const removePins = () => {
    const currentPins = map.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    currentPins.forEach(function (currentPin) {
      currentPin.remove();
    });
  };

  let ads;
  const onLoad = function (data) {
    ads = data;
    updateAds(data);
  };

  const adMapPins = document.querySelector(`.map__pins`);
  const updateAds = function (data) {
    removePins();
    adMapPins.append(getPins(data.slice(0, PIN_COUNT)));
  };

  const housingType = document.querySelector(`#housing-type`);
  let housingTypeValue = ``;
  const ANY_HOUSING = `any`;
  housingType.addEventListener(`change`, function () {
    close();
    housingTypeValue = housingType.value;
    let newAds = [];
    ads.forEach(function (itemAd) {
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
