'use strict';
window.drag = (function () {
  var drag = {
    startCoords: {
      x: 0,
      y: 0
    },
    pinChangedCoords: {
      top: 0,
      left: 0
    },
    setCoords: function (x, y) {
      drag.startCoords.x = x;
      drag.startCoords.y = y;
    },
    setPinChangedPosition: function (top, left) {
      drag.pinChangedCoords.top = top;
      drag.pinChangedCoords.left = left;
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
      var pinShiftPosition = {
        left: window.pin.userPin.offsetLeft - shift.x,
        top: window.pin.userPin.offsetTop - shift.y
      };
      drag.setPinChangedPosition(window.pin.userPin.offsetTop, window.pin.userPin.offsetLeft);
      window.userForm.addressCoords = window.pin.setAddressCoords();
      window.userForm.setAddressValue(window.userForm.addressInput, window.userForm.addressCoords, window.pin.userIconGutter);
      if (drag.pinChangedCoords.left >= window.pin.MAX_PIN_COORDS.x && shift.x < 0) {
        window.pin.setPinPosition(pinShiftPosition.top, window.pin.MAX_PIN_COORDS.x);
      } else if (drag.pinChangedCoords.top >= window.pin.MAX_PIN_COORDS.y && shift.y < 0) {
        window.pin.setPinPosition(window.pin.MAX_PIN_COORDS.y, pinShiftPosition.y);
      } else if (drag.pinChangedCoords.left <= window.pin.MIN_PIN_COORDS.x && shift.x > 0) {
        window.pin.setPinPosition(pinShiftPosition.top, window.pin.MIN_PIN_COORDS.x);
      } else if (drag.pinChangedCoords.top <= window.pin.MIN_PIN_COORDS.y && shift.y > 0) {
        window.pin.setPinPosition(window.pin.MIN_PIN_COORDS.y, pinShiftPosition.y);
      } else {
        window.pin.setPinPosition(pinShiftPosition.top, pinShiftPosition.left);
      }
    },
    mouseUpHandler: function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', window.drag.mouseMoveHandler);
      document.removeEventListener('mouseup', window.drag.mouseUpHandler);
    }
  };
  return drag;
})();
