'use strict';
window.form = (function () {
  window.pin.userPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    window.drag.setCoords(evt.clientX, evt.clientY);
    document.addEventListener('mousemove', window.drag.mouseMoveHandler);
    document.addEventListener('mouseup', window.drag.mouseUpHandler);
  });
})();
