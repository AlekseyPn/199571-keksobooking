'use strict';
window.userForm = (function () {
  var ERROR_MSG = {
    maxError: 'Максимум для X 1124, для Y 564, введите еще раз',
    minError: 'Минимум для X 0, для Y 100, введите еще раз',
    tooShort: 'Слишком короткий заголовок!',
    tooLong: 'Слишком длинный заголовок!'
  };
  var notice = document.querySelector('.notice');
  var titleInput = notice.querySelector('#title');
  var addressInput = notice.querySelector('#address');
  var noticeForm = notice.querySelector('.notice__form');
  var errorColor = {
    border: '#e63512',
    shadow: '0 0 4px 1px #e63512'
  };
  var validColor = {
    border: '#34b132',
    shadow: '0 0 4px 1px #34b132'
  };
  var addressCoords = window.pin.setAddressCoords();
  var userForm = {
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
        addressInput.value = ERROR_MSG.maxError;
        userForm.colorizeInputValidation(addressInput);
      } else if (pinCoords.left < window.pin.MIN_PIN_COORDS.x || pinCoords.top < window.pin.MIN_PIN_COORDS.y) {
        addressInput.value = ERROR_MSG.minError;
        userForm.colorizeInputValidation(addressInput);
      } else {
        userForm.colorizeInputValidation(addressInput, true);
        window.drag.setPinPosition(pinCoords.top, pinCoords.left);
      }
    },
    formData: new FormData(noticeForm),
    sendHandler: function () {
      window.modal.successMsgHandler();
      noticeForm.reset();
    }
  };
  titleInput.addEventListener('invalid', function () {
    if (titleInput.validity.valueMissing || titleInput.validity.tooShort || titleInput.validity.tooLong) {
      userForm.colorizeInputValidation(titleInput);
      if (titleInput.validity.tooShort) {
        titleInput.setCustomValidity(ERROR_MSG.tooShort);
      } else if (titleInput.validity.tooLong) {
        titleInput.setCustomValidity(ERROR_MSG.tooLong);
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
  addressInput.addEventListener('blur', function () {
    if (addressInput.value === '') {
      userForm.setAddressValue(addressInput, addressCoords, window.pin.userIconGutter);
    } else {
      userForm.colorizeInputValidation(addressInput, true);
      userForm.changePinCoords();
    }
  });
  userForm.setAddressValue(addressInput, addressCoords, window.pin.userIconGutter);
  noticeForm.addEventListener('submit', function (evt) {
    window.backend.save(window.modal.errorMsgHandler, new FormData(noticeForm), userForm.sendHandler);
    evt.preventDefault();
  });
  return {
    setAddressValue: userForm.setAddressValue,
    addressInput: addressInput,
    addressCoords: addressCoords
  };
})();
