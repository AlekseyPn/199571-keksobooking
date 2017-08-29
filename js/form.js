'use strict';
window.form = (function () {
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
  var form = document.querySelector('.notice');
  var titleInput = form.querySelector('#title');
  var addressInput = form.querySelector('#address');
  var timein = form.querySelector('#timein');
  var timeout = form.querySelector('#timeout');
  var priceInput = form.querySelector('#price');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var houseTypeSelect = form.querySelector('#type');
  var errorColor = {
    border: '#e63512',
    shadow: '0 0 4px 1px #e63512'
  };
  var validColor = {
    border: '#34b132',
    shadow: '0 0 4px 1px #34b132'
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
})();
