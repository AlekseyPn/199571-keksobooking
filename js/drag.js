'use strict';
window.drag = (function () {
  // модуль отвечает за drag'n'drop а связан с пином
  const initialState = {
    x: 0,
    y: 0
  }
  var drag = {
    state: initialState,
    coords: {
      top: 0,
      left: 0
    },
    setCoords(x, y) {
      this.state.x = x;
      this.state.y = y;
    },
    setChangedPosition: function (top, left) {
      drag.coords.top = top;
      drag.coords.left = left;
    },
    mouseMoveHandler: function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: drag.state.x - moveEvt.clientX,
        y: drag.state.y - moveEvt.clientY
      };
      drag.setCoords(moveEvt.clientX, moveEvt.clientY);
      var pinShiftPosition = {
        left: window.pin.userPin.offsetLeft - shift.x,
        top: window.pin.userPin.offsetTop - shift.y
      };
      drag.setChangedPosition(window.pin.userPin.offsetTop, window.pin.userPin.offsetLeft);
      window.userForm.addressCoords = window.pin.setAddressCoords();
      window.userForm.setAddressValue(window.userForm.addressInput, window.userForm.addressCoords, window.pin.userIconGutter);
      if (drag.coords.left >= window.pin.MAX_PIN_COORDS.x && shift.x < 0) {
        window.pin.setPosition(pinShiftPosition.top, window.pin.MAX_PIN_COORDS.x);
      } else if (drag.coords.top >= window.pin.MAX_PIN_COORDS.y && shift.y < 0) {
        window.pin.setPosition(window.pin.MAX_PIN_COORDS.y, pinShiftPosition.y);
      } else if (drag.coords.left <= window.pin.MIN_PIN_COORDS.x && shift.x > 0) {
        window.pin.setPosition(pinShiftPosition.top, window.pin.MIN_PIN_COORDS.x);
      } else if (drag.coords.top <= window.pin.MIN_PIN_COORDS.y && shift.y > 0) {
        window.pin.setPosition(window.pin.MIN_PIN_COORDS.y, pinShiftPosition.y);
      } else {
        window.pin.setPosition(pinShiftPosition.top, pinShiftPosition.left);
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
