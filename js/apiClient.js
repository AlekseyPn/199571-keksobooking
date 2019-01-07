'use strict';
window.ApiClient = (function () {
  const BASE_URL = ' https://js.dump.academy/keksobooking';
  const URL = BASE_URL + '/data';
  const SUCCESS_STATUS_CODE = 200;
  const SEND_METHOD_TYPE = {
    post: 'POST',
    get: 'GET'
  };
  const ERROR_MSG = {
    connection: 'Произошла ошибка: Проблемы соединения',
    timeout: 'Произошла ошибка: Время таймаут истекло, попробуйте еще раз позже'
  };
  const TIMEOUT = 5000;

  const ApiClient = function () {
    let xhr = null;

    const _setupXhr = function (onError, onLoad) {
      xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (xhr.status === SUCCESS_STATUS_CODE) {
          onLoad(xhr.response);
        } else {
          onError(xhr.response);
        }
      });
      xhr.addEventListener('error', () => {
        onError(ERROR_MSG.connection);
      });
      xhr.timeout = TIMEOUT;
      xhr.addEventListener('timeout', () => {
        onError(ERROR_MSG.timeout);
      });
    };

    this.fetch = function (onError, onLoad) {
      _setupXhr(onError, onLoad);
      xhr.open(SEND_METHOD_TYPE.get, URL);
      xhr.send();
    };

  this.update = function (onError, data, onLoad) {
      _setupXhr(onError, onLoad);
      xhr.open(SEND_METHOD_TYPE.post, BASE_URL);
      xhr.send(data);
    };
  };
  return new ApiClient();
})();
