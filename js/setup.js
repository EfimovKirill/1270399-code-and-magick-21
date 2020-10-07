'use strict';

let wizardsCount = 4;
let wizardNames = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
let wizardSurnames = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
let wizardCoats = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
let wizardEyes = [`black`, `red`, `blue`, `yellow`, `green`];
let fireballColors = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 25;

let wizards = [];

let userDialog = document.querySelector(`.setup`);
userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);

let similarListElement = userDialog.querySelector(`.setup-similar-list`);
let similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

let getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let renderWizard = function (wizard) {
  let wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

let renderWizardIdentity = function () {
  let fragment = document.createDocumentFragment();

  for (let i = 0; i < wizardsCount; i++) {
    wizards.push({
      name: wizardNames[getRandomNumber(0, wizardNames.length - 1)] + ` ` + wizardSurnames[getRandomNumber(0, wizardSurnames.length - 1)],
      coatColor: wizardCoats[getRandomNumber(0, wizardCoats.length - 1)],
      eyesColor: wizardEyes[getRandomNumber(0, wizardEyes.length - 1)]
    });
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

renderWizardIdentity();

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
}

let openPopup = function () {
  userDialog.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onPopupEscPress);
}

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
    setupUserName.setCustomValidity(`Ещё ` + (MIN_NAME_LENGTH - valueLength) +` симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    setupUserName.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_NAME_LENGTH) +` симв.`);
  } else {
    setupUserName.setCustomValidity(``);
  }

  setupUserName.reportValidity();
});

let onCoatClick = function () {
  wizardCoat.style.fill = wizardCoats[getRandomNumber(0, wizardCoats.length - 1)];
  inputCoat.value = wizardCoats[getRandomNumber(0, wizardCoats.length - 1)];
};

let onEyesClick = function () {
  wizardEyesElement.style.fill = wizardEyes[getRandomNumber(0, wizardEyes.length - 1)];
  inputEyes.value = wizardEyes[getRandomNumber(0, wizardEyes.length - 1)];
};

let onFireballClick = function () {
  wizardFireball.style.background = fireballColors[getRandomNumber(0, fireballColors.length - 1)];
  inputFireball.value = fireballColors[getRandomNumber(0, fireballColors.length - 1)];
};

wizardCoat.addEventListener(`click`, onCoatClick);
wizardEyesElement.addEventListener(`click`, onEyesClick);
wizardFireball.addEventListener(`click`, onFireballClick);
