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
    setChangedPosition: function (top, left) {
      drag.pinChangedCoords.top = top;
      drag.pinChangedCoords.left = left;
    },
    mathPosition: function (coords, shift) {
      return Math.max(coords.min, Math.min(shift, coords.max));
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
      drag.setChangedPosition(window.pin.userPin.offsetTop, window.pin.userPin.offsetLeft);
      window.userForm.addressCoords = window.pin.setAddressCoords();
      window.userForm.setAddressValue(window.userForm.addressInput, window.userForm.addressCoords, window.pin.userIconGutter);

      window.pin.setPosition(drag.mathPosition(window.pin.TOP_PIN_COORDS, pinShiftPosition.top), drag.mathPosition(window.pin.LEFT_PIN_COORDS, pinShiftPosition.left));
    },
    mouseUpHandler: function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', window.drag.mouseMoveHandler);
      document.removeEventListener('mouseup', window.drag.mouseUpHandler);
    }
  };
  window.pin.userPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    drag.setCoords(evt.clientX, evt.clientY);
    document.addEventListener('mousemove', drag.mouseMoveHandler);
    document.addEventListener('mouseup', drag.mouseUpHandler);
  });
  return drag;
})();
