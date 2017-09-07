'use strict';
window.map = (function () {

  var render = function (data) {
    window.dialog.setDialogData(data);
    var randomStartCard = window.computingFunctions.getRandomElement(data);
    var previewStartCard = window.card.drawCard(randomStartCard);
    window.pin.insertPinFragments(window.data.map, data);
    window.showCard.changeAvatar(randomStartCard);
    window.computingFunctions.replaceNode(window.dialog.offerDialog, previewStartCard, window.dialog.dialogPanel);
  };
  var loadDataHandler = function (data) {
    window.data.setAdsData(data);
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
