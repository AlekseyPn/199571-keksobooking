'use strict';
window.synchronizeFields = (function () {
  var MAX_GUESTS_VALUE = 3;
  var GUESTS_CAPACITY = {
    one: '1',
    two: '2',
    three: '3',
    notForGuest: '0'
  };
  var ROOMS_NUMBER = {
    one: '1',
    two: '2',
    three: '3',
    oneHundred: '100'
  };
  var MIN_PRICES = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var HOUSES_TYPES = {
    bungalo: 'bungalo',
    flat: 'flat',
    house: 'house',
    palace: 'palace'
  };
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var capacityOptions = capacity.querySelectorAll('option');
  var houseTypeSelect = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var removeOptions = function () {
    var removedOptions = capacity.querySelectorAll('option');
    for (var i = 0; i < removedOptions.length; i++) {
      capacity.removeChild(removedOptions[i]);
    }
  };
  var insertOptions = function (data, elem) {
    removeOptions();
    for (var i = 0; i < data.length; i++) {
      window.data.documentFragment.appendChild(data[i]);
    }
    elem.appendChild(window.data.documentFragment);
  };
  var setOptions = function (elem, value) {
    var availableOptions = [].map.call(capacityOptions, function (it) {
      return it;
    });
    switch (value) {
      case ROOMS_NUMBER.oneHundred:
        availableOptions = availableOptions.slice(MAX_GUESTS_VALUE);
        break;
      default:
        availableOptions = availableOptions.slice(MAX_GUESTS_VALUE - +value, MAX_GUESTS_VALUE);
    }
    insertOptions(availableOptions, elem);
  };
  var syncValues = function (elem, value) {
    setOptions(elem, value);
    switch (value) {
      case ROOMS_NUMBER.oneHundred:
        elem.value = GUESTS_CAPACITY.notForGuest;
        break;
      default:
        elem.value = value;
    }
  };
  var syncValueWithMin = function (elem, value) {
    var houseTypeValue = value;
    switch (value) {
      case HOUSES_TYPES.bungalo:
        houseTypeValue = MIN_PRICES.bungalo;
        break;
      case HOUSES_TYPES.flat:
        houseTypeValue = MIN_PRICES.flat;
        break;
      case HOUSES_TYPES.house:
        houseTypeValue = MIN_PRICES.house;
        break;
      case HOUSES_TYPES.palace:
        houseTypeValue = MIN_PRICES.palace;
        break;
    }
    elem.min = houseTypeValue;
    elem.value = elem.min;
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
  houseTypeSelect.addEventListener('change', function () {
    synchronizeFields(houseTypeSelect, priceInput, syncValueWithMin);
  });
  return {
    HOUSES_TYPES: HOUSES_TYPES
  };
})();
