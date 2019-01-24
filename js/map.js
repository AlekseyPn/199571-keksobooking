'use strict';
window.tokyoMap = (function () {
  const ELEMENT_NUMBER = 0;
  const el = document.querySelector('.tokyo__pin-map');
  // нужен будет глобально
  const userPin = new UserPin(el);
  const dragNDrop = new DragNDrop(userPin);
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
  userPin.el.addEventListener('mousedown', (evt) => {
    evt.preventDefault();
    dragNDrop.setCoords(evt.clientX, evt.clientY);
    document.addEventListener('mousemove', dragNDrop.mouseMoveHandler);
    document.addEventListener('mouseup', dragNDrop.mouseUpHandler);
  });

  return {
    el: el
  }
})();
