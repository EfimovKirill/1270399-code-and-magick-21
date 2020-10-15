'use strict';

(function () {
  let wizardsCount = 4;
  let wizardCoats = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
  let wizardEyes = [`black`, `red`, `blue`, `yellow`, `green`];
  let fireballColors = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];

  const MIN_NAME_LENGTH = 2;
  const MAX_NAME_LENGTH = 25;

  let userDialog = document.querySelector(`.setup`);
  userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);

  let similarListElement = userDialog.querySelector(`.setup-similar-list`);
  let similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

  let getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  let addWizardToFragment = function (fragment) {
    return function (wizard) {
      return fragment.appendChild(renderWizard(wizard));
    };
  };

  let renderWizard = function ( { name, colorCoat, colorEyes } ) {
    let wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector(`.setup-similar-label`).textContent = name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = colorCoat;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = colorEyes;

    return wizardElement;
  };

  let setupOpen = document.querySelector(`.setup-open`);
  let setupClose = document.querySelector(`.setup-close`);
  let setupUserName = document.querySelector(`.setup-user-name`);
  let wizardCoat = document.querySelector(`.wizard-coat`);
  let wizardEyesElement = document.querySelector(`.wizard-eyes`);
  let wizardFireball = document.querySelector(`.setup-fireball-wrap`);
  let inputCoatColor = document.querySelector(`input[name="coat-color"]`);
  let inputEyesColor = document.querySelector(`input[name="eyes-color"]`);
  let inputFireballColor = document.querySelector(`input[name="fireball-color"]`);

  let onPopupEscPress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closePopup();
    }
  };

  let openPopup = function () {
    userDialog.style.top = `80px`;
    userDialog.style.left = `50%`;
    userDialog.classList.remove(`hidden`);

    document.addEventListener(`keydown`, onPopupEscPress);
  };

  let closePopup = function () {
    userDialog.classList.add(`hidden`);

    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  setupOpen.addEventListener(`click`, function () {
    openPopup();
  });

  setupOpen.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      openPopup();
    }
  });

  setupClose.addEventListener(`click`, function () {
    closePopup();
  });

  setupClose.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      closePopup();
    }
  });

  setupUserName.addEventListener(`invalid`, function () {
    if (setupUserName.validity.tooShort) {
      setupUserName.setCustomValidity(`Имя должно состоять минимум из 2-х символов`);
    } else if (setupUserName.validity.tooLong) {
      setupUserName.setCustomValidity(`Имя не должно превышать 25-ти символов`);
    } else if (setupUserName.validity.valueMissing) {
      setupUserName.setCustomValidity(`Обязательное поле`);
    } else {
      setupUserName.setCustomValidity(``);
    }
  });

  setupUserName.addEventListener(`input`, function () {
    let valueLength = setupUserName.value.length;

    if (valueLength < MIN_NAME_LENGTH) {
      setupUserName.setCustomValidity(`Ещё ` + (MIN_NAME_LENGTH - valueLength) + ` симв.`);
    } else if (valueLength > MAX_NAME_LENGTH) {
      setupUserName.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_NAME_LENGTH) + ` симв.`);
    } else {
      setupUserName.setCustomValidity(``);
    }

    setupUserName.reportValidity();
  });

  let onCoatClick = function () {
    wizardCoat.style.fill = wizardCoats[getRandomNumber(0, wizardCoats.length - 1)];
    inputCoatColor.value = wizardCoats[getRandomNumber(0, wizardCoats.length - 1)];
  };

  let onEyesClick = function () {
    wizardEyesElement.style.fill = wizardEyes[getRandomNumber(0, wizardEyes.length - 1)];
    inputEyesColor.value = wizardEyes[getRandomNumber(0, wizardEyes.length - 1)];
  };

  let onFireballClick = function () {
    wizardFireball.style.background = fireballColors[getRandomNumber(0, fireballColors.length - 1)];
    inputFireballColor.value = fireballColors[getRandomNumber(0, fireballColors.length - 1)];
  };

  wizardCoat.addEventListener(`click`, onCoatClick);
  wizardEyesElement.addEventListener(`click`, onEyesClick);
  wizardFireball.addEventListener(`click`, onFireballClick);

  let successHandler = function (wizards) {
    let fragment = document.createDocumentFragment();
    wizards.slice(0, wizardsCount).forEach(addWizardToFragment(fragment));
    similarListElement.appendChild(fragment);
  };

  let errorHandler = function (errorMessage) {
    let element = document.createElement(`div`);

    element.style.position = `absolute`;
    element.style.left = 0;
    element.style.right = 0;
    element.style.zIndex = 1;
    element.style.backgroundColor = `black`;
    element.style.textAlign = `center`;
    element.style.fontSize = `15px`;

    element.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, element);
  };

  window.backend.load(successHandler, errorHandler);
})();
