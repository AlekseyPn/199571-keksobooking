'use strict';
window.userForm = (function () {
  var ERROR_MSG = {
    tooShort: 'Слишком короткий заголовок!',
    tooLong: 'Слишком длинный заголовок!'
  };
  var notice = document.querySelector('.notice');
  var titleInput = notice.querySelector('#title');
  var addressInput = notice.querySelector('#address');
  var noticeForm = notice.querySelector('.notice__form');
  var ERROR_COLOR = {
    border: '#e63512',
    shadow: '0 0 4px 1px #e63512'
  };
  var VALID_COLOR = {
    border: '#34b132',
    shadow: '0 0 4px 1px #34b132'
  };
  var addressCoords = {};
  var userForm = {
    colorizeInputValidation: function (elem, valid) {
      elem.style.borderColor = ERROR_COLOR.border;
      elem.style.boxShadow = ERROR_COLOR.shadow;
      if (valid) {
        elem.style.borderColor = VALID_COLOR.border;
        elem.style.boxShadow = VALID_COLOR.shadow;
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
  // userForm.setAddressValue(addressInput, addressCoords, window.pin.userIconGutter);
  noticeForm.addEventListener('submit', function (evt) {
    window.ApiClient.update(window.modal.setModalText, new FormData(noticeForm), userForm.sendHandler);
    evt.preventDefault();
  });
  return {
    setAddressValue: userForm.setAddressValue,
    addressInput: addressInput,
    addressCoords: addressCoords
  };
})();
