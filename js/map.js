'use strict';
var AVATARS_SRC = {
  src: 'img/avatars/user0',
  format: '.png',
  max: 8,
  min: 1
};
var TIMES = ['12:00', '13:00', '14:00'];
var HOUSE_TYPES = ['flat', 'house', 'bungalo'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var MAX_ADS_COUNT = 8;
var MAX_ROOMS = {
  max: 5,
  min: 1
};
var APARTMENT_PRICE = {
  min: 1000,
  max: 1000000
};
var LOCATION_COORS = {
  'x': {
    'min': 300,
    'max': 900
  },
  'y': {
    'min': 100,
    'max': 500
  }
};
var ICON_GUTTER = {
  left: 20,
  top: 40
};
var GUESTS_NUMBER = {
  min: 1,
  max: 30
};
var ADS_INIT = {
  newLodge: '',
  getRandomAds: function (titles, avatar, times, types, features, count, rooms, price, coors) {
    var ads = [];
    var titlesList = getRandomArr(titles);
    for (var i = 0; i < count; i++) {
      ads[i] = {
        'author': {
          'avatar': avatar.src + countRandomInteger(avatar.min, avatar.max - 1) + avatar.format
        },
        'offer': {
          'title': titlesList[i],
          'address': '',
          'price': countRandomInteger(price.min, price.max),
          'type': getRandomElement(types),
          'rooms': countRandomInteger(rooms.min, rooms.max),
          'guests': countRandomInteger(GUESTS_NUMBER.min, GUESTS_NUMBER.max),
          'checkin': getRandomElement(times),
          'checkout': getRandomElement(times),
          'features': getRandomArrayLength(features),
          'description': '',
          'photos': []
        },
        'location': {
          'x': countRandomInteger(coors.x.min, coors.x.max),
          'y': countRandomInteger(coors.y.min, coors.y.max)
        }
      };
      ads[i].offer.address += ads[i].location.x + ', ' + ads[i].location.y;
    }
    return ads;
  },
  drawLabel: function (array) {
    var pinElement = pin.cloneNode(true);
    var pinItem = pinElement.querySelector('.pin');
    pinItem.setAttribute('style', 'left:' + (array.location.x - ICON_GUTTER.left) + 'px; top:' + (array.location.y - ICON_GUTTER.top) + 'px;');
    pinElement.querySelector('img').src = array.author.avatar;
    return pinElement;
  },
  insertLabelFragments: function (fragment, elem, array) {
    for (var l = 0; l < array.length; l++) {
      fragment.appendChild(this.drawLabel(array[l]));
    }
    elem.appendChild(fragment);
  },
  drawFeature: function (array) {
    var featureItem = featureItemTemp.cloneNode(true);
    var featureClass = 'feature__image--' + array;
    featureItem.querySelector('.feature__image').classList.add(featureClass);
    return featureItem;
  },
  insertFeatureFragments: function (fragment, array) {
    for (var l = 0; l < array.length; l++) {
      fragment.appendChild(this.drawFeature(array[l]));
    }
    return fragment;
  },
  changeAvatar: function (array, elem) {
    elem.querySelector('.dialog__title img').src = array.author.avatar;
  },
  drawLodge: function (array) {
    var lodgeElement = lodgeTemplate.cloneNode(true);
    var houseType;
    switch (array.offer.type) {
      case 'flat':
        houseType = 'Квартира';
        break;
      case 'bungalo':
        houseType = 'Бунгало';
        break;
      case 'house':
        houseType = 'Дом';
        break;
    }
    lodgeElement.querySelector('.lodge__title').textContent = array.offer.title;
    lodgeElement.querySelector('.lodge__address').textContent = array.offer.address;
    lodgeElement.querySelector('.lodge__price').innerHTML = array.offer.price + rouble + '/ночь';
    lodgeElement.querySelector('.lodge__type').textContent = houseType;
    lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + array.offer.guests + ' гостей в ' + array.offer.rooms + ' комнатах';
    lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + array.offer.checkin + ', выезд до ' + array.offer.checkout;
    lodgeElement.querySelector('.lodge__features').appendChild(this.insertFeatureFragments(documentFragment, array.offer.features));
    lodgeElement.querySelector('.lodge__description').textContent = array.offer.description;
    return lodgeElement;
  },
  replaceElem: function (parent, elemIncl, elemDel) {
    return parent.replaceChild(elemIncl, elemDel);
  },
  init: function (adsArray, fragment, map, dialog, removeElem) {
    this.insertLabelFragments(fragment, map, adsArray);
    this.newLodge = this.drawLodge(getRandomElement(adsArray));
    this.changeAvatar(getRandomElement(adsArray), dialog);
    this.replaceElem(dialog, this.newLodge, removeElem);
  }
};
var documentFragment = document.createDocumentFragment();
var lodgeTemplate = document.querySelector('#lodge-template').content;
var pin = document.querySelector('#pin-template').content;
var map = document.querySelector('.tokyo__pin-map');
var dialog = document.querySelector('#offer-dialog');
var dialogPanel = dialog.querySelector('.dialog__panel');
var featureItemTemp = document.querySelector('#feature-item-template').content;
var rouble = '&#x20bd;';
var countRandomInteger = function (min, max) {
  return Math.round(min + Math.random() * (max - min + 1));
};
var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};
var compareRandom = function () {
  return Math.random() - 0.5;
};
var getRandomArr = function (array) {
  return array.sort(compareRandom);
};
var getRandomArrayLength = function (arr) {
  var array = [];
  var minMaxNumbers = [countRandomInteger(0, 3), countRandomInteger(3, arr.length)];
  var min = 1;
  var max;
  var count = 0;
  if (minMaxNumbers[0] > minMaxNumbers[1]) {
    max = minMaxNumbers[0];
    min = minMaxNumbers[1];
  } else {
    max = minMaxNumbers[1];
    min = minMaxNumbers[0];
  }
  for (var j = min; j < max; j++) {
    array[count] = arr[j];
    count++;
  }
  return array;
};
var offerDataArray = ADS_INIT.getRandomAds(OFFER_TITLES, AVATARS_SRC, TIMES, HOUSE_TYPES, FEATURES, MAX_ADS_COUNT, MAX_ROOMS, APARTMENT_PRICE, LOCATION_COORS);
ADS_INIT.init(offerDataArray, documentFragment, map, dialog, dialogPanel);