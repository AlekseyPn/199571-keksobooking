'use strict';
window.form = (function () {
  var randomStartCard = window.computingFunctions.getRandomElement(window.data.adsData);
  var previewStartCard = window.card.drawCard(randomStartCard);
  window.pin.insertPinFragments(window.data.map, window.data.adsData);
  window.card.changeAvatar(randomStartCard, window.dialog.offerDialog);
  window.computingFunctions.replaceNode(window.dialog.offerDialog, previewStartCard, window.dialog.dialogPanel);
  window.pin.userPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    window.drag.setStartCoords(evt.clientX, evt.clientY);
    document.addEventListener('mousemove', window.drag.mouseMoveHandler);
    document.addEventListener('mouseup', window.drag.mouseUpHandler);
  });
})();
