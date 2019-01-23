'use strict';
(function () {
  // модуль отвечает за drag'n'drop а связан с пином
  const initialState = {
    x: 0,
    y: 0
  };
  const DragNDrop = function () {
    this.coords = initialState;
    // this.unsubscribe = EventChannel.subscribe("REMOVE_LISTENERS", this.removeListeners)

    this.setCoords = (x, y) => {
      this.coords = {
        x: x,
        y: y
      }
    };
    this.mouseMoveHandler = (evt) => {
      evt.preventDefault();
      var shift = {
        x: this.coords.x - evt.clientX,
        y: this.coords.y - evt.clientY
      };
      this.setCoords(evt.clientX, evt.clientY);
      EventChannel.dispatch("SET_POSITION", shift);
    };
    this.mouseUpHandler = (evt) => {
      evt.preventDefault()
      this.removeListeners(evt);
    };
    this.removeListeners = () => {
      document.removeEventListener('mousemove', this.mouseMoveHandler);
      document.removeEventListener('mouseup', this.mouseUpHandler);
    };
  }
  window.DragNDrop = new DragNDrop();
})();
