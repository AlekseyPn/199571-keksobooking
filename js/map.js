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
var maxCount = 8;
var maxRooms = {
  max: 5,
  min: 1
};
var apartmentPrice = {
  min: 1000,
  max: 1000000
};
var locationCoords = {
  'x': {
    'min': 300,
    'max': 900
  },
  'y': {
    'min': 100,
    'max': 500
  }
};
var iconGutter = {
  left: 20,
  top: 40
};
var guestNumbers = {
  min: 1,
  max: 30
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
var countRandomNumber = function (multiplier) {
  return Math.round(Math.random() * multiplier);
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
var createAdArray = function (titles, avatar, times, types, features, count, rooms, price, coors) {
  var options = [];
  for (var i = 0; i < count; i++) {
    options[i] = {
      'author': {
        'avatar': avatar.src + countRandomInteger(avatar.min, avatar.max - 1) + avatar.format
      },
      'offer': {
        'title': titles[i],
        'address': '',
        'price': countRandomInteger(price.min, price.max),
        'type': types[countRandomNumber(types.length - 1)],
        'rooms': countRandomInteger(rooms.min, rooms.max),
        'guests': countRandomInteger(guestNumbers.min, guestNumbers.max),
        'checkin': times[countRandomNumber(times.length - 1)],
        'checkout': times[countRandomNumber(times.length - 1)],
        'features': getRandomArrayLength(features),
        'description': '',
        'photos': []
      },
      'location': {
        'x': countRandomInteger(coors.x.min, coors.x.max),
        'y': countRandomInteger(coors.y.min, coors.y.max)
      }
    };
    options[i].offer.address += options[i].location.x + ', ' + options[i].location.y;
  }
  return options;
};
var drawLabel = function (array) {
  var pinElement = pin.cloneNode(true);
  var pinItem = pinElement.querySelector('.pin');
  pinItem.setAttribute('style', 'left:' + (array.location.x - iconGutter.left) + 'px; top:' + (array.location.y - iconGutter.top) + 'px;');
  pinElement.querySelector('img').src = array.author.avatar;
  return pinElement;
};
var insertLabelFragments = function (fragment, elem, array) {
  for (var l = 0; l < array.length; l++) {
    fragment.appendChild(drawLabel(array[l]));
  }
  elem.appendChild(fragment);
};
var drawFeature = function (array) {
  var featureItem = featureItemTemp.cloneNode(true);
  var featureClass = 'feature__image--' + array;
  featureItem.querySelector('.feature__image').classList.add(featureClass);
  return featureItem;
};
var insertFeatureFragments = function (fragment, array) {
  for (var l = 0; l < array.length; l++) {
    fragment.appendChild(drawFeature(array[l]));
  }
  return fragment;
};
var changeAvatar = function (array, elem) {
  elem.querySelector('.dialog__title img').src = array.author.avatar;
};
var drawLodge = function (array) {
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
  lodgeElement.querySelector('.lodge__features').appendChild(insertFeatureFragments(documentFragment, array.offer.features));
  lodgeElement.querySelector('.lodge__description').textContent = array.offer.description;
  return lodgeElement;
};
var offerDataArray = createAdArray(OFFER_TITLES, AVATARS_SRC, TIMES, HOUSE_TYPES, FEATURES, maxCount, maxRooms, apartmentPrice, locationCoords);
insertLabelFragments(documentFragment, map, offerDataArray);
var newLodge = drawLodge(offerDataArray[0]);
changeAvatar(offerDataArray[0], dialog);
dialog.removeChild(dialogPanel);
dialog.appendChild(newLodge);
