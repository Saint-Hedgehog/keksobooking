'use strict';

(() => {

  const map = document.querySelector(`.map`);
  const mapFilter = document.querySelector(`.map__filters`);
  const mapFilterSelects = mapFilter.querySelectorAll(`select`);
  const mapFilterInputs = mapFilter.querySelectorAll(`input`);

  window.cityPlan = {
    map,
    mapFilterSelects,
    mapFilterInputs,
  };

})();
