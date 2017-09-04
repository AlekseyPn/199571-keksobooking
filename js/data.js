'use strict';
window.data = (function () {
  var data = {
    adsData: [],
    AVATARS_DATA: {
      mainPinSrc: 'img/avatars/user01.png',
      id: 'pin-'
    },
    LOCATION_LIMITS: {
      'x': {
        'min': 300,
        'max': 900
      },
      'y': {
        'min': 100,
        'max': 500
      }
    },
    documentFragment: document.createDocumentFragment(),
    map: document.querySelector('.tokyo__pin-map'),
    cityMap: document.querySelector('.tokyo'),
  };
  var loadDataHandler = function (responseData) {
    data.adsData = responseData;
    var randomStartCard = window.computingFunctions.getRandomElement(data.adsData);
    var previewStartCard = window.card.drawCard(randomStartCard);
    window.pin.insertPinFragments(data.map, data.adsData);
    window.showCard.changeAvatar(randomStartCard);
    window.computingFunctions.replaceNode(window.dialog.offerDialog, previewStartCard, window.dialog.dialogPanel);
  };
  window.backend.load(window.modal.errorMsgHandler, loadDataHandler);
  return data;
})();
