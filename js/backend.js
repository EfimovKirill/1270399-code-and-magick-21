'use strict';

(() => {
  const URL_GET = `https://21.javascript.pages.academy/code-and-magick/data`;
  const URL_POST = `https://21.javascript.pages.academy/code-and-magick`;
  const TIMEOUT_IN_MS = 10000;

  let StatusCode = {
    OK: 200
  };

  let load = (onLoad, onError) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });
    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`GET`, URL_GET);
    xhr.send();
  };

  let save = (data, onLoad, onError) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });
    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.open(`POST`, URL_POST);
    xhr.send(data);
  };

  window.backend = {
    load,
    save
  };

})();


