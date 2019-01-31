'use strict';
window.ApiClient = (function () {
  const BASE_URL = ' https://js.dump.academy/keksobooking';
  const URL = BASE_URL + '/data';
  const SUCCESS_STATUS_CODE = 200;
  const METHOD_TYPE = {
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

    const _setupXhr = function (errorHandler, successHandler) {
      xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (xhr.status === SUCCESS_STATUS_CODE) {
          successHandler(xhr.response);
        } else {
          errorHandler(xhr.response);
        }
      });
      xhr.addEventListener('error', () => {
        errorHandler(ERROR_MSG.connection);
      });
      xhr.timeout = TIMEOUT;
      xhr.addEventListener('timeout', () => {
        errorHandler(ERROR_MSG.timeout);
      });
    };

    this.get = function (errorHandler, successHandler) {
      fetch(URL).then(response => {
        successHandler(response.json());
      }).catch((error) => {

      })
    };

    this.post = function (errorHanlder, data, successHandler) {
      fetch(BASE_URL, {
        method: METHOD_TYPE.POST,
        body: data,
      }).then(response => {
        successHandler(response.json())
      })
    };
  };
  return new ApiClient();
})();
