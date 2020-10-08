'use strict';

(() => {

  const {MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT, PIN_TIP_HEIGHT, mainPin, setupAddress} = window.validation;
  const {map} = window.cityPlan;

  const mapTop = 130;
  const mapBottom = 630;
  const mapLeft = 0;
  const mapRight = 1200;

  const limits = {
    top: map.offsetTop + mapTop - (MAIN_PIN_HEIGHT + PIN_TIP_HEIGHT),
    right: mapRight + Math.ceil(MAIN_PIN_WIDTH / 2) - mainPin.offsetWidth,
    bottom: mapBottom - (MAIN_PIN_HEIGHT + PIN_TIP_HEIGHT),
    left: mapLeft + Math.ceil(MAIN_PIN_WIDTH / 2) - mainPin.offsetWidth
  };


  const onMainPinMouseMove = (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // координаты после смещения мыши
      const coordinates = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      if (coordinates.x < limits.left) {
        coordinates.x = limits.left;
      } else if (coordinates.x > limits.right) {
        coordinates.x = limits.right;
      }

      if (coordinates.y < limits.top) {
        coordinates.y = limits.top;
      } else if (coordinates.y > limits.bottom) {
        coordinates.y = limits.bottom;
      }

      mainPin.style.top = `${coordinates.y}px`;
      mainPin.style.left = `${coordinates.x}px`;

      setupAddress();
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  window.move = {
    onMainPinMouseMove,
  };

})();
