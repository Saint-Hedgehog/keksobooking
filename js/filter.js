'use strict';

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

const {getPins} = window.marker;
const {map} = window.cityPlan;
const {closePopup} = window.card;
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

const updateAds = (data) => {
  removePins();
  mapPins.append(getPins(data.slice(0, PIN_COUNT)));
};

const updateDebouncedAds = window.debounce(updateAds);

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

  closePopup();
  updateDebouncedAds(newAds);
};

const filterHousingType = (ad) => housingType.value === ad.offer.type
    || housingType.value === FILTER_ANY_VALUE;

const filterHousingPrice = (ad) => (housingPrice.value === PriceKey.LOW && ad.offer.price < PriceValue.MIDDLE)
    || (housingPrice.value === PriceKey.MIDDLE && ad.offer.price >= PriceValue.MIDDLE && ad.offer.price < PriceValue.HIGH)
    || (housingPrice.value === PriceKey.HIGH && ad.offer.price >= PriceValue.HIGH)
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
