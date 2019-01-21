'use strict';
window.map = (function () {
  const ELEMENT_NUMBER = 0;
  const el = document.querySelector('.tokyo__pin-mapEl');
  let render = (data) => {
    let randomData = utility.randomizeDataOrder(data);
    randomData = randomData.slice(0, 3);
    window.dialog.setData(randomData);
    el.appendChild(PinsCreator.getPins(randomData));
    window.showCard.showRandom(ELEMENT_NUMBER, randomData);
  };
  let successCb = (data) => {
    window.data.setData(data);
    render(window.data.adsData);
  };
  ApiClient.fetch(window.modal.errorMessageCb, successCb);
  UserPin.el.addEventListener('mousedown', (evt) => {
    evt.preventDefault();
    window.drag.setCoords(evt.clientX, evt.clientY);
    document.addEventListener('mousemove', window.drag.mouseMoveHandler);
    document.addEventListener('mouseup', window.drag.mouseUpHandler);
  });

  return {
    el: el
  }
})();
