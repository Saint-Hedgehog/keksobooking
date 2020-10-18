'use strict';

const map = document.querySelector(`.map`);
const mapFilter = document.querySelector(`.map__filters`);
const mapFilterSelects = mapFilter.querySelectorAll(`select`);
const mapFilterInputs = mapFilter.querySelectorAll(`input`);

const setStatusDisabled = (elements) => {
  elements.forEach((element) => {
    element.setAttribute(`disabled`, `true`);
  });
};

// ошибка при получении или отправке данных
const onError = (errorMessage) => {
  const error = document.createElement(`div`);
  error.style = `z-index: 100; margin: 0 auto; text-align: center`;
  error.style.width = `790px`;
  error.style.height = `90px`;
  error.style.paddingTop = `20px`;
  error.style.backgroundColor = `navy`;
  error.style.color = `tomato`;
  error.style.border = `5px solid white`;
  error.style.position = `absolute`;
  error.style.top = `180px`;
  error.style.left = 0;
  error.style.right = 0;
  error.style.fontSize = `35px`;
  error.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, error);
  error.addEventListener(`click`, () => {
    error.remove();
  });
  setStatusDisabled(mapFilterSelects);
  setStatusDisabled(mapFilterInputs);
};

window.cityPlan = {
  map,
  mapFilterSelects,
  mapFilterInputs,
  onError,
};
