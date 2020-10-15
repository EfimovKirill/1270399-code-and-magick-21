'use strict';
(function () {

  let form = document.querySelector('.setup-wizard-form');
  let userDialog = document.querySelector(`.setup`);
  let dialogHandle = userDialog.querySelector(`.upload`);

  dialogHandle.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    let onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userDialog.style.top = (userDialog.offsetTop - shift.y) + `px`;
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + `px`;

    };

    let onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        let onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener(`click`, onClickPreventDefault);
        };
        dialogHandle.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  let successHandler = function () {
    userDialog.classList.add('hidden');
  }

  let errorHandler = (errorMessage) => {
    let element = document.createElement('div');

    element.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    element.style.position = 'absolute';
    element.style.left = 0;
    element.style.right = 0;
    element.style.fontSize = '30px';

    element.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', element);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), successHandler, errorHandler);
  });

})();
