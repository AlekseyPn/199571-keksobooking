'use strict';
window.synchronizeFields = (function () {
  var GUESTS_CAPACITY = {
    one: '1',
    two: '2',
    three: '3',
    notForGuest: '0'
  };
  var ROOM_NUMBER = {
    one: '1',
    two: '2',
    three: '3',
    oneHundred: '100'
  };
  var MIN_PRICE = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var houseTypeSelect = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var syncValues = function (elem, value) {
    if (value === ROOM_NUMBER.oneHundred) {
      elem.value = GUESTS_CAPACITY.notForGuest;
    } else if (value === GUESTS_CAPACITY.notForGuest) {
      elem.value = ROOM_NUMBER.oneHundred;
    } else {
      elem.value = value;
    }
  };
  var syncValueWithMin = function (elem, value) {
    var houseTypeValue = value;
    switch (value) {
      case 'bungalo':
        houseTypeValue = MIN_PRICE.bungalo;
        break;
      case 'flat':
        houseTypeValue = MIN_PRICE.flat;
        break;
      case 'house':
        houseTypeValue = MIN_PRICE.house;
        break;
      case 'palace':
        houseTypeValue = MIN_PRICE.palace;
        break;
    }
    elem.min = houseTypeValue;
  };
  var syncPriceWithType = function (elem, value) {
    var priceValue = +value;
    if (priceValue >= MIN_PRICE.palace) {
      elem.value = 'palace';
    } else if (priceValue >= MIN_PRICE.house) {
      elem.value = 'house';
    } else if (priceValue >= MIN_PRICE.flat) {
      elem.value = 'flat';
    } else if (priceValue >= MIN_PRICE.bungalo) {
      elem.value = 'bungalo';
    }
  };
  var synchronizeFields = function (elem1, elem2, callback) {
    if (elem1.value !== elem2.value) {
      callback(elem2, elem1.value);
    }
  };
  timein.addEventListener('change', function () {
    synchronizeFields(timein, timeout, syncValues);
  });
  timeout.addEventListener('change', function () {
    synchronizeFields(timeout, timein, syncValues);
  });
  roomNumber.addEventListener('change', function () {
    synchronizeFields(roomNumber, capacity, syncValues);
  });
  capacity.addEventListener('change', function () {
    synchronizeFields(capacity, roomNumber, syncValues);
  });
  houseTypeSelect.addEventListener('change', function () {
    synchronizeFields(houseTypeSelect, priceInput, syncValueWithMin);
  });
  priceInput.addEventListener('input', function () {
    synchronizeFields(priceInput, houseTypeSelect, syncPriceWithType);
  });
})();
