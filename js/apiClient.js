'use strict';
window.ApiClient = (function () {
  const URL = {
    server: ' https://js.dump.academy/keksobooking',
    data: 'https://js.dump.academy/keksobooking/data'
  };
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
    this.xhr = null;
  };

  ApiClient.prototype.load = function (onError, onLoad) {
    _setupXhr(onError, onLoad);
    this.xhr.open(SEND_METHOD_TYPE.get, URL.data);
    this.xhr.send();
  };

  ApiClient.prototype.save = function (onError, data, onLoad) {
    _setupXhr(onError, onLoad);
    this.xhr.open(SEND_METHOD_TYPE.post, URL.server);
    this.xhr.send(data);
  };

  let apiClient = new ApiClient();

  let _setupXhr = (function (onError, onLoad) {
    this.xhr = new XMLHttpRequest();
    this.xhr.responseType = 'json';
    this.xhr.addEventListener('load', () => {
      if (this.xhr.status === SUCCESS_STATUS_CODE) {
        onLoad(this.xhr.response);
      } else {
        onError(this.xhr.response);
      }
    });
    this.xhr.addEventListener('error', () => {
      onError(ERROR_MSG.connection);
    });
    this.xhr.timeout = TIMEOUT;
    this.xhr.addEventListener('timeout', () => {
      onError(ERROR_MSG.timeout);
    });
  }).bind(apiClient);

  return apiClient
})();
