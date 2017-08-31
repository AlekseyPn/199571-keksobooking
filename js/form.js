'use strict';
window.userForm = (function () {
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
  var userform = document.querySelector('.notice');
  var titleInput = userform.querySelector('#title');
  var addressInput = userform.querySelector('#address');
  var timein = userform.querySelector('#timein');
  var timeout = userform.querySelector('#timeout');
  var priceInput = userform.querySelector('#price');
  var roomNumber = userform.querySelector('#room_number');
  var capacity = userform.querySelector('#capacity');
  var houseTypeSelect = userform.querySelector('#type');
  var errorColor = {
    border: '#e63512',
    shadow: '0 0 4px 1px #e63512'
  };
  var validColor = {
    border: '#34b132',
    shadow: '0 0 4px 1px #34b132'
  };
  var addressCoords = {
    x: window.pin.userPin.offsetLeft,
    y: window.pin.userPin.offsetTop
  };
  var userForm = {
    timeChangeHandler: function (evt) {
      var target = evt.target;
      var targetValue = target.value;
      switch (target) {
        case timein:
          timeout.value = targetValue;
          break;
        case timeout:
          timein.value = targetValue;
          break;
      }
    },
    setMinPrice: function (price) {
      priceInput.setAttribute('min', price);
      priceInput.placeholder = price;
      priceInput.value = price;
    },
    houseTypeChangeHandler: function () {
      switch (houseTypeSelect.value) {
        case 'bungalo':
          userForm.setMinPrice(MIN_PRICE.bungalo);
          break;
        case 'flat':
          userForm.setMinPrice(MIN_PRICE.flat);
          break;
        case 'house':
          userForm.setMinPrice(MIN_PRICE.house);
          break;
        case 'palace':
          userForm.setMinPrice(MIN_PRICE.palace);
          break;
      }
    },
    roomNumberChangeHandler: function () {
      switch (roomNumber.value) {
        case ROOM_NUMBER.one:
          capacity.value = GUESTS_CAPACITY.one;
          break;
        case ROOM_NUMBER.two:
          capacity.value = GUESTS_CAPACITY.two;
          break;
        case ROOM_NUMBER.three:
          capacity.value = GUESTS_CAPACITY.three;
          break;
        case ROOM_NUMBER.oneHundred:
          capacity.value = GUESTS_CAPACITY.notForGuest;
      }
    },
    priceInputHandler: function () {
      priceInput.value = +priceInput.value;
      if (priceInput.value >= MIN_PRICE.palace) {
        houseTypeSelect.value = 'palace';
      } else if (priceInput.value >= MIN_PRICE.house) {
        houseTypeSelect.value = 'house';
      } else if (priceInput.value >= MIN_PRICE.flat) {
        houseTypeSelect.value = 'flat';
      } else if (priceInput.value >= MIN_PRICE.bungalo) {
        houseTypeSelect.value = 'bungalo';
      }
    },
    capacityChangeHandler: function () {
      switch (capacity.value) {
        case GUESTS_CAPACITY.one:
          roomNumber.value = ROOM_NUMBER.one;
          break;
        case GUESTS_CAPACITY.two:
          roomNumber.value = ROOM_NUMBER.two;
          break;
        case GUESTS_CAPACITY.three:
          roomNumber.value = ROOM_NUMBER.three;
          break;
        case GUESTS_CAPACITY.notForGuest:
          roomNumber.value = ROOM_NUMBER.oneHundred;
      }
    },
    colorizeInputValidation: function (elem, valid) {
      elem.style.borderColor = errorColor.border;
      elem.style.boxShadow = errorColor.shadow;
      if (valid) {
        elem.style.borderColor = validColor.border;
        elem.style.boxShadow = validColor.shadow;
      }
    },
    validationValueMissing: function () {
      if (this.validity.valueMissing) {
        userForm.colorizeInputValidation(this);
      } else {
        userForm.colorizeInputValidation(this, true);
      }
    },
    setAddressValue: function (elem, coords, gutter) {
      elem.value = 'x: ' + (coords.x + gutter.left) + ', y: ' + (coords.y + gutter.top);
    },
    splitAddressValue: function (value) {
      var array = value.split(',');
      for (var i = 0; i < array.length; i++) {
        array[i] = array[i].split(/\w:/)[1];
      }
      return {
        top: array[1],
        left: array[0]
      };
    },
    changePinCoords: function () {
      var pinCoords = userForm.splitAddressValue(addressInput.value);
      if (pinCoords.left > window.pin.MAX_PIN_COORDS.x || pinCoords.top > window.pin.MAX_PIN_COORDS.y) {
        addressInput.value = 'Максимум для X 1124, для Y 564, введите еще раз';
        userForm.colorizeInputValidation(addressInput);
      } else if (pinCoords.left < window.pin.MIN_PIN_COORDS.x || pinCoords.top < window.pin.MIN_PIN_COORDS.y) {
        addressInput.value = 'Минимум для X 0, для Y 100, введите еще раз';
        userForm.colorizeInputValidation(addressInput);
      } else {
        userForm.colorizeInputValidation(addressInput, true);
        window.drag.setPinPosition(pinCoords.top, pinCoords.left);
      }
    }
  };
  timein.addEventListener('change', userForm.timeChangeHandler);
  timeout.addEventListener('change', userForm.timeChangeHandler);
  houseTypeSelect.addEventListener('change', userForm.houseTypeChangeHandler);
  roomNumber.addEventListener('change', userForm.roomNumberChangeHandler);
  priceInput.addEventListener('input', userForm.priceInputHandler);
  capacity.addEventListener('change', userForm.capacityChangeHandler);
  titleInput.addEventListener('invalid', function () {
    if (titleInput.validity.valueMissing || titleInput.validity.tooShort || titleInput.validity.tooLong) {
      userForm.colorizeInputValidation(titleInput);
      if (titleInput.validity.tooShort) {
        titleInput.setCustomValidity('Слишком короткий заголовок!');
      } else if (titleInput.validity.tooLong) {
        titleInput.setCustomValidity('Слишком длинный заголовок');
      }
    }
  });
  titleInput.addEventListener('change', function () {
    if (titleInput.validity.valid) {
      userForm.colorizeInputValidation(titleInput, true);
    }
  });
  addressInput.addEventListener('invalid', userForm.validationValueMissing);
  addressInput.addEventListener('change', function () {
    if (addressInput.validity.valid) {
      userForm.colorizeInputValidation(addressInput, true);
    }
  });
  addressInput.addEventListener('blur', function (evt) {
    if (addressInput.value === '') {
      userForm.setAddressValue(addressInput, addressCoords, window.pin.userIconGutter);
    } else {
      userForm.colorizeInputValidation(addressInput, true);
      userForm.changePinCoords();
    }
  });
  userForm.setAddressValue(addressInput, addressCoords, window.pin.userIconGutter);
  return {
    setAddressValue: userForm.setAddressValue,
    addressInput: addressInput,
    addressCoords: addressCoords
  };
})();
