'use strict';
(function () {
  // модуль отвечает за drag'n'drop а связан с пином
  const initialState = {
    x: 0,
    y: 0
  };
  const DragNDrop = function (el) {
    this.el = el;
    this.coords = initialState;
  }
  DragNDrop.prototype = {
    setCoords: (x, y) => {
      this.coords = {
        x: x,
        y: y
      }
    },
    mouseMoveHandler: (evt) => {
      evt.preventDefault();
      var shift = {
        x: this.coords.x - evt.clientX,
        y: this.coords.y - evt.clientY
      };
      this.setCoords(evt.clientX, evt.clientY);
      this.el.setPosition(shift);
    },
    mouseUpHandler: (evt) => {
      evt.preventDefault()
      this.removeListeners(evt);
    },
    removeListeners: () => {
      document.removeEventListener('mousemove', this.mouseMoveHandler);
      document.removeEventListener('mouseup', this.mouseUpHandler);
    },
  }
  window.DragNDrop = DragNDrop
})();
