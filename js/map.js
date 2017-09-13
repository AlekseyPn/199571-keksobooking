'use strict';
window.map = (function () {
  var ELEMENT_NUMBER = 0;
  var randomizeOrder = function (data) {
    var dataClone = data.slice(0, data.length);
    return dataClone.sort(function () {
      return Math.random() - 0.5;
    });
  };
  var render = function (data) {
    var randomData = randomizeOrder(data);
    randomData = randomData.slice(0, 3);
    window.dialog.setData(randomData);
    window.pin.insertFragments(window.data.map, randomData);
    window.showCard.showRandom(ELEMENT_NUMBER, randomData);
  };
  var loadDataHandler = function (data) {
    window.data.setData(data);
    render(window.data.adsData);
  };
  window.backend.load(window.modalDialogs.errorMsgHandler, loadDataHandler);
})();
