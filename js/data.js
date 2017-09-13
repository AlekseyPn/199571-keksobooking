'use strict';
window.data = (function () {
  var data = {
    adsData: [],
    AVATARS_DATA: {
      mainPinSrc: 'img/avatars/user01.png',
      id: 'pin-'
    },
    documentFragment: document.createDocumentFragment(),
    map: document.querySelector('.tokyo__pin-map'),
    setData: function (adsData) {
      window.data.adsData = adsData;
    }
  };
  return data;
})();
