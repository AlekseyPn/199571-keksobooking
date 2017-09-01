'use strict';
window.drag = (function () {
  var drag = {
    startCoords: {
      x: 0,
      y: 0
    },
    setPinPosition: function (top, left) {
      window.pin.userPin.style.left = left + 'px';
      window.pin.userPin.style.top = top + 'px';
    },
    setCoords: function (x, y) {
      drag.startCoords.x = x;
      drag.startCoords.y = y;
    },
    mouseMoveHandler: function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: drag.startCoords.x - moveEvt.clientX,
        y: drag.startCoords.y - moveEvt.clientY
      };
      drag.startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var pinPosition = {
        left: window.pin.userPin.offsetLeft - shift.x,
        top: window.pin.userPin.offsetTop - shift.y
      };
      if (window.userForm.addressCoords.x >= window.pin.MAX_PIN_COORDS.x && shift.x < 0) {
        window.drag.setPinPosition(pinPosition.top, window.pin.MAX_PIN_COORDS.x);
      } else if (window.userForm.addressCoords.y >= window.pin.MAX_PIN_COORDS.y && shift.y < 0) {
        window.drag.setPinPosition(window.pin.MAX_PIN_COORDS.y, pinPosition.y);
      } else if (window.userForm.addressCoords.x <= window.pin.MIN_PIN_COORDS.x && shift.x > 0) {
        window.drag.setPinPosition(pinPosition.top, window.pin.MIN_PIN_COORDS.x);
      } else if (window.userForm.addressCoords.y <= window.pin.MIN_PIN_COORDS.y && shift.y > 0) {
        window.drag.setPinPosition(window.pin.MIN_PIN_COORDS.y, pinPosition.y);
      } else {
        window.drag.setPinPosition(pinPosition.top, pinPosition.left);
      }
      window.userForm.addressCoords = {
        x: window.pin.userPin.offsetLeft,
        y: window.pin.userPin.offsetTop
      };
      window.userForm.setAddressValue(window.userForm.addressInput, window.userForm.addressCoords, window.pin.userIconGutter);
    },
    mouseUpHandler: function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', window.drag.mouseMoveHandler);
      document.removeEventListener('mouseup', window.drag.mouseUpHandler);
    }
  };
  return drag;
})();
