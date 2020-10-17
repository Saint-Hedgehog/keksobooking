'use strict';

(() => {
  const PIN_COUNT = 5;
  const FILTER_ANY_VALUE = `any`;

  const PriceKey = {
    LOW: `low`,
    MIDDLE: `middle`,
    HIGH: `high`,
  };
  const PriceValue = {
    MIDDLE: 10000,
    HIGH: 50000,
  };

  const LOW_PRICE_KEY = PriceKey.LOW;
  const MIDDLE_PRICE_KEY = PriceKey.MIDDLE;
  const HIGH_PRICE_KEY = PriceKey.HIGH;

  const MIDDLE_PRICE_VALUE = PriceValue.MIDDLE;
  const HIGH_PRICE_VALUE = PriceValue.HIGH;

  const {getPins} = window.marker;
  const {map} = window.cityPlan;
  const {close} = window.card;
  const {mapPins} = window.validation;

  const filterForm = document.querySelector(`.map__filters`);
  const housingType = filterForm.querySelector(`#housing-type`);
  const housingPrice = filterForm.querySelector(`#housing-price`);
  const housingRoom = filterForm.querySelector(`#housing-rooms`);
  const housingGuest = filterForm.querySelector(`#housing-guests`);
  const featuresBlock = filterForm.querySelector(`.map__features`);

  let ads;
  const onLoad = (data) => {
    ads = data;
    updateAds(data);
  };

  const removePins = () => {
    const currentPins = map.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    currentPins.forEach((currentPin) => {
      currentPin.remove();
    });
  };

  const updateAds = window.debounce((data) => {
    removePins();
    mapPins.append(getPins(data.slice(0, PIN_COUNT)));
  });

  const onFiltersSetNewAds = () => {
    let newAds = [];

    ads.forEach((ad) => {
      if (filterHousingType(ad)
          && filterHousingPrice(ad)
          && filterHousingRooms(ad)
          && filterHousingGuests(ad)
          && filterHousingFeatures(ad)) {
        newAds.push(ad);
      }
    });

    close();
    updateAds(newAds);
  };

  const filterHousingType = (ad) => housingType.value === ad.offer.type
    || housingType.value === FILTER_ANY_VALUE;

  const filterHousingPrice = (ad) => (housingPrice.value === LOW_PRICE_KEY && ad.offer.price < MIDDLE_PRICE_VALUE)
    || (housingPrice.value === MIDDLE_PRICE_KEY && ad.offer.price >= MIDDLE_PRICE_VALUE && ad.offer.price < HIGH_PRICE_VALUE)
    || (housingPrice.value === HIGH_PRICE_KEY && ad.offer.price >= HIGH_PRICE_VALUE)
    || (housingPrice.value === ad.offer.price
      || housingPrice.value === FILTER_ANY_VALUE);

  const filterHousingRooms = (ad) => (+housingRoom.value === ad.offer.rooms)
    || (housingRoom.value === FILTER_ANY_VALUE);

  const filterHousingGuests = (ad) => (+housingGuest.value === ad.offer.guests)
    || (housingGuest.value === FILTER_ANY_VALUE);

  const filterHousingFeatures = (ad) => {
    const checkedFeatures = featuresBlock.querySelectorAll(`.map__checkbox:checked`);

    return Array.from(checkedFeatures).every((checkedFeature) => ad.offer.features.includes(checkedFeature.value));
  };

  window.filter = {
    onLoad,
    removePins,
    filterForm,
    onFiltersSetNewAds,
  };
})();
