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
        'max': 1200
      },
      'y': {
        'min': 100,
        'max': 650
      }
    },
    documentFragment: document.createDocumentFragment(),
    map: document.querySelector('.tokyo__pin-map'),
    setAdsData: function (adsData) {
      window.data.adsData = adsData;
    }
  };
  return data;
})();
