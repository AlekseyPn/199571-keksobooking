'use strict';
window.data = (function () {
  const data = {
    adsData: [],
    documentFragment: document.createDocumentFragment(),
    mapEl: document.querySelector('.tokyo__pin-mapEl'),
    setData: function (adsData) {
      window.data.adsData = adsData;
    }
  };
  return data;
})();
