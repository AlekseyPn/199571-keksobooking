'use strict';
window.backend = (function () {
  var URL = {
    server: 'https://1510.dump.academy/keksobooking',
    data: 'https://1510.dump.academy/keksobooking/data'
  };
  var RESPONSE_SUCCESS = 200;
  var SEND_METHOD = {
    post: 'POST',
    get: 'GET'
  };
  var ERROR_MSG = {
    connection: 'Произошла ошибка: Проблемы соединения',
    timeout: 'Произошла ошибка: Время таймаут истекло, попробуйте еще раз позже'
  };
  var TIMEOUT = 5000;
  var setup = function (onError, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === RESPONSE_SUCCESS) {
        onLoad(xhr.response);
      } else {
        onError(xhr.response);
      }
    });
    xhr.addEventListener('error', function () {
      onError(ERROR_MSG.connection);
    });
    xhr.timeout = TIMEOUT;
    xhr.addEventListener('timeout', function () {
      onError(ERROR_MSG.timeout);
    });
    return xhr;
  };
  var backend = {
    load: function (onError, onLoad) {
      var xhr = setup(onError, onLoad);
      xhr.open(SEND_METHOD.get, URL.data);
      xhr.send();
    },
    save: function (onError, data, onLoad) {
      var xhr = setup(onError, onLoad);
      xhr.open(SEND_METHOD.post, URL.server);
      xhr.send(data);
    }
  };
  return backend;
})();
