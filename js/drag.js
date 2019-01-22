'use strict';
window.drag = (function () {
  // модуль отвечает за drag'n'drop а связан с пином
  const initialState = {
    x: 0,
    y: 0
  }
  const initialCoords = {
    top: 0,
    left: 0,
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
      // относиться к форме, попробовать сделать реактивным
      // window.userForm.addressCoords = window.pin.setAddressCoords();
      // window.userForm.setAddressValue(window.userForm.addressInput, window.userForm.addressCoords, window.pin.userIconGutter);
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
    mouseUpHandler: function (evt) {
      evt.preventDefault();
      document.removeEventListener('mousemove', window.drag.mouseMoveHandler);
      document.removeEventListener('mouseup', window.drag.mouseUpHandler);
    }
  };
  const DragNDrop = function () {
    this.state = initialState;
    this.coords = initialCoords;

    this.setState = (x, y) => {
      this.state = {
        x: x,
        y: y
      }
    };
    this.setCoords = (top, left) => {
      this.coords = {
        top: top,
        left: left
      }
    };
    this.mouseMoveHandler = (evt) => {
      evt.preventDefault();
    };
    this.mouseUpHandler = (evt) => {
      this.removeEventListener(evt);
    };
    this.removeListeners = (evt) => {
      evt.preventDefault()
      document.removeEventListener('mousemove', this.mouseMoveHandler);
      document.removeEventListener('mouseup', this.mouseUpHandler);
    };
  }
  return drag;
})();
