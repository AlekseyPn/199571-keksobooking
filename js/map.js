'use strict';
window.map = (function () {
  const ELEMENT_NUMBER = 0;
  const render = (data) => {
    var randomData = window.computingFunctions.randomizeOrder(data);
    randomData = randomData.slice(0, 3);
    window.dialog.setData(randomData);
    window.pin.insertFragments(window.data.map, randomData);
    window.showCard.showRandom(ELEMENT_NUMBER, randomData);
  };
  var loadDataHandler = function (data) {
    window.data.setData(data);
    render(window.data.adsData);
  };
  window.backend.load(window.modal.errorMsgHandler, loadDataHandler);
  window.pin.userPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    window.drag.setCoords(evt.clientX, evt.clientY);
    document.addEventListener('mousemove', window.drag.mouseMoveHandler);
    document.addEventListener('mouseup', window.drag.mouseUpHandler);
  });
})();
