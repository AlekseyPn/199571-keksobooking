'use strict';
window.synchronizeFields = (function () {
  const GUESTS_CAPACITY = {
    one: '1',
    two: '2',
    three: '3',
    notForGuest: '0'
  };
  const ROOMS_NUMBER = {
    one: '1',
    two: '2',
    three: '3',
    oneHundred: '100'
  };
  const MIN_PRICES = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  const HOUSES_TYPES = {
    bungalo: 'bungalo',
    flat: 'flat',
    house: 'house',
    palace: 'palace'
  };
  let timein = document.querySelector('#timein');
  let timeout = document.querySelector('#timeout');
  let roomNumber = document.querySelector('#room_number');
  let capacity = document.querySelector('#capacity');
  let houseTypeSelect = document.querySelector('#type');
  let priceInput = document.querySelector('#price');
  let syncValues = function (elem, value) {
    // сделать словарь
    if (value === ROOMS_NUMBER.oneHundred) {
      elem.value = GUESTS_CAPACITY.notForGuest;
    } else if (value === GUESTS_CAPACITY.notForGuest) {
      elem.value = ROOMS_NUMBER.oneHundred;
    } else {
      elem.value = value;
    }
  };
  let syncValueWithMin = function (elem, value) {
    let houseTypeValue = value;
    // сделать словарь
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
  let syncValueWithType = function (elem, value) {
    let priceValue = parseInt(value, 10);
    // сделать resolver который будет возвращать нужно значение в зависимости от условия
    if (priceValue >= MIN_PRICES.palace) {
      elem.value = HOUSES_TYPES.palace;
    } else if (priceValue >= MIN_PRICES.house) {
      elem.value = HOUSES_TYPES.house;
    } else if (priceValue >= MIN_PRICES.flat) {
      elem.value = HOUSES_TYPES.flat;
    } else if (priceValue >= MIN_PRICES.bungalo) {
      elem.value = HOUSES_TYPES.bungalo;
    }
  };
  let synchronizeFields = function (elem1, elem2, callback) {
    if (elem1.value !== elem2.value) {
      callback(elem2, elem1.value);
    }
  };
  // сделать массив исходя из обьекта данных которого он будет навешивать эвенты
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
    synchronizeFields(priceInput, houseTypeSelect, syncValueWithType);
  });
  return {
    HOUSES_TYPES: HOUSES_TYPES
  };
})();
