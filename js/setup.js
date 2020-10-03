`use strick`;

let numberOfWizards = 4;
let wizardNames = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
let wizardSurnames = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
let wizardCoats = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
let wizardEyes = [`black`, `red`, `blue`, `yellow`, `green`];

let wizards = [];

let userDialog = document.querySelector(`.setup`);
userDialog.classList.remove(`hidden`);
userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);

let similarListElement = userDialog.querySelector(`.setup-similar-list`);
let similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

let getRandomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let renderWizard = function(wizard) {
  let wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

let renderWizardIdentity = function () {
  let fragment = document.createDocumentFragment();

  for (let i = 0; i < numberOfWizards; i++) {
    wizards.push({
      name: wizardNames[getRandomNumber(0, wizardNames.length - 1)] + ` ` + wizardSurnames[getRandomNumber(0, wizardSurnames.length - 1)],
      coatColor: wizardCoats[getRandomNumber(0, wizardCoats.length - 1)],
      eyesColor: wizardEyes[getRandomNumber(0, wizardEyes.length - 1)]
    });
    fragment.appendChild(renderWizard(wizards[i]));
  };
  similarListElement.appendChild(fragment);
};

renderWizardIdentity();






