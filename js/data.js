'use strict';
window.data = (function () {
  var data = {
    adsData: [],
    documentFragment: document.createDocumentFragment(),
    map: document.querySelector('.tokyo__pin-map'),
    setData: function (adsData) {
      window.data.adsData = adsData;
    }
  };
  return data;
})();
