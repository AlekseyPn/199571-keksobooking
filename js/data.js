'use strict';
window.data = (function () {
  var AVATARS_SRC = {
    src: 'img/avatars/user0',
    format: '.png',
    numbersImages: [1, 2, 3, 4, 5, 6, 7, 8],
    id: 'pin-'
  };
  var TIMES = ['12:00', '13:00', '14:00'];
  var HOUSE_TYPES = ['flat', 'house', 'bungalo'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var MAX_ADS_COUNT = 8;
  var MAX_ROOMS = {
    max: 5,
    min: 1
  };
  var APARTMENT_PRICE = {
    min: 1000,
    max: 1000000
  };
  var LOCATION_LIMITS = {
    'x': {
      'min': 300,
      'max': 900
    },
    'y': {
      'min': 100,
      'max': 500
    }
  };
  var GUESTS_NUMBER = {
    min: 1,
    max: 30
  };
  var ADS_INIT = {
    newLodge: '',
    randomAdsData: '',
    generateAds: function (titles, avatars, times, types, features, count, rooms, price, coordinates) {
      var ads = [];
      var titlesList = window.computingFunctions.randomizeOrder(titles);
      var avatarsNumbersList = window.computingFunctions.randomizeOrder(avatars.numbersImages);
      for (var i = 0; i < count; i++) {
        ads[i] = {
          'author': {
            'avatar': avatars.src + avatarsNumbersList[i] + avatars.format
          },
          'offer': {
            'title': titlesList[i],
            'address': '',
            'price': window.computingFunctions.countRandomInteger(price.min, price.max),
            'type': window.computingFunctions.getRandomElement(types),
            'rooms': window.computingFunctions.countRandomInteger(rooms.min, rooms.max),
            'guests': window.computingFunctions.countRandomInteger(GUESTS_NUMBER.min, GUESTS_NUMBER.max),
            'checkin': window.computingFunctions.getRandomElement(times),
            'checkout': window.computingFunctions.getRandomElement(times),
            'features': window.computingFunctions.getRandomArrayLength(features),
            'description': '',
            'photos': []
          },
          'location': {
            'x': window.computingFunctions.countRandomInteger(coordinates.x.min, coordinates.x.max),
            'y': window.computingFunctions.countRandomInteger(coordinates.y.min, coordinates.y.max)
          }
        };
        ads[i].offer.address += ads[i].location.x + ', ' + ads[i].location.y;
      }
      return ads;
    }
  };
  return {
    adsData: ADS_INIT.generateAds(OFFER_TITLES, AVATARS_SRC, TIMES, HOUSE_TYPES, FEATURES, MAX_ADS_COUNT, MAX_ROOMS, APARTMENT_PRICE, LOCATION_LIMITS),
    avatarData: AVATARS_SRC,
    documentFragment: document.createDocumentFragment(),
    map: document.querySelector('.tokyo__pin-map'),
    cityMap: document.querySelector('.tokyo')
  };
})();
