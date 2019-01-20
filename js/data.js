'use strict';
window.data = (function () {
  const data = {
    adsData: [],
    documentFragment: document.createDocumentFragment(),
    setData: function (adsData) {
      window.data.adsData = adsData;
    }
  };
  return data;
})();
