'use strict';
window.map = (function () {
  const ELEMENT_NUMBER = 0;
  let render = (data) => {
    let randomData = utility.randomizeDataOrder(data);
    randomData = randomData.slice(0, 3);
    window.dialog.setData(randomData);
    window.data.mapEl.appendChild(window.pin.createPinsEl(randomData));
    window.showCard.showRandom(ELEMENT_NUMBER, randomData);
  };
  let successCb = (data) => {
    window.data.setData(data);
    render(window.data.adsData);
  };
  ApiClient.fetch(window.modal.errorMessageCb, successCb);
  window.pin.userPin.addEventListener('mousedown', (evt) => {
    evt.preventDefault();
    window.drag.setCoords(evt.clientX, evt.clientY);
    document.addEventListener('mousemove', window.drag.mouseMoveHandler);
    document.addEventListener('mouseup', window.drag.mouseUpHandler);
  });
})();
