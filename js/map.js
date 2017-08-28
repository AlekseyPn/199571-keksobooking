'use strict';
var SYMBOL_ROUBLE = '\u20bd';
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
var ICON_GUTTER = {
  left: 20,
  top: 40
};
var GUESTS_NUMBER = {
  min: 1,
  max: 30
};
var GUESTS_CAPACITY = {
  one: '1',
  two: '2',
  three: '3',
  notForGuest: '0'
};
var ROOM_NUMBER = {
  one: '1',
  two: '2',
  three: '3',
  oneHundred: '100'
};
var MIN_PRICE = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};
var keyCode = {
  ESC: 27,
  ENTER: 13
};
var errorColor = {
  border: '#e63512',
  shadow: '0 0 4px 1px #e63512'
};
var ADS_INIT = {
  newLodge: '',
  randomAdsData: '',
  generateAds: function (titles, avatars, times, types, features, count, rooms, price, coordinates) {
    var ads = [];
    var titlesList = COMPUTING_FUNCTIONS.randomizeOrder(titles);
    var avatarsNumbersList = COMPUTING_FUNCTIONS.randomizeOrder(avatars.numbersImages);
    for (var i = 0; i < count; i++) {
      ads[i] = {
        'author': {
          'avatar': avatars.src + avatarsNumbersList[i] + avatars.format
        },
        'offer': {
          'title': titlesList[i],
          'address': '',
          'price': COMPUTING_FUNCTIONS.countRandomInteger(price.min, price.max),
          'type': COMPUTING_FUNCTIONS.getRandomElement(types),
          'rooms': COMPUTING_FUNCTIONS.countRandomInteger(rooms.min, rooms.max),
          'guests': COMPUTING_FUNCTIONS.countRandomInteger(GUESTS_NUMBER.min, GUESTS_NUMBER.max),
          'checkin': COMPUTING_FUNCTIONS.getRandomElement(times),
          'checkout': COMPUTING_FUNCTIONS.getRandomElement(times),
          'features': COMPUTING_FUNCTIONS.getRandomArrayLength(features),
          'description': '',
          'photos': []
        },
        'location': {
          'x': COMPUTING_FUNCTIONS.countRandomInteger(coordinates.x.min, coordinates.x.max),
          'y': COMPUTING_FUNCTIONS.countRandomInteger(coordinates.y.min, coordinates.y.max)
        }
      };
      ads[i].offer.address += ads[i].location.x + ', ' + ads[i].location.y;
    }
    return ads;
  },
  drawFeature: function (array) {
    var featureItem = featureItemTemp.cloneNode(true);
    var featureClass = 'feature__image--' + array;
    featureItem.querySelector('.feature__image').classList.add(featureClass);
    return featureItem;
  },
  insertFeatureFragments: function (fragment, array) {
    for (var k = 0; k < array.length; k++) {
      fragment.appendChild(this.drawFeature(array[k]));
    }
    return fragment;
  },
  changeAvatar: function (array, elem) {
    elem.querySelector('.dialog__title img').src = array.author.avatar;
  },
  drawLodge: function (array) {
    var lodgeElement = dialogTemplate.cloneNode(true);
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
    lodgeElement.querySelector('.lodge__price').textContent = array.offer.price + SYMBOL_ROUBLE + '/ночь';
    lodgeElement.querySelector('.lodge__type').textContent = houseType;
    lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + array.offer.guests + ' гостей в ' + array.offer.rooms + ' комнатах';
    lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + array.offer.checkin + ', выезд до ' + array.offer.checkout;
    lodgeElement.querySelector('.lodge__features').appendChild(this.insertFeatureFragments(documentFragment, array.offer.features));
    lodgeElement.querySelector('.lodge__description').textContent = array.offer.description;
    return lodgeElement;
  },
  replaceNode: function (parent, includingElem, replacedElem) {
    return parent.replaceChild(includingElem, replacedElem);
  },
  init: function (adsData, fragment, map, dialog, removeElem) {
    this.randomAdsData = COMPUTING_FUNCTIONS.getRandomElement(adsData);
    PINS_FUNCTIONS.insertPinFragments(fragment, map, adsData);
    this.newLodge = this.drawLodge(this.randomAdsData);
    this.changeAvatar(this.randomAdsData, dialog);
    this.replaceNode(dialog, this.newLodge, removeElem);
  }
};
var PINS_FUNCTIONS = {
  newLodge: '',
  drawPin: function (array, index) {
    var pinElement = pin.cloneNode(true);
    var pinItem = pinElement.querySelector('.pin');
    pinItem.setAttribute('style', 'left:' + (array.location.x - ICON_GUTTER.left) + 'px; top:' + (array.location.y - ICON_GUTTER.top) + 'px;');
    pinElement.querySelector('img').src = array.author.avatar;
    pinItem.id = AVATARS_SRC.id + index;
    return pinElement;
  },
  insertPinFragments: function (fragment, elem, array) {
    for (var l = 0; l < array.length; l++) {
      fragment.appendChild(this.drawPin(array[l], l));
    }
    elem.appendChild(fragment);
  },
  removePinActiveClass: function (elem) {
    if (elem.tagName.toLowerCase() === 'img') {
      elem.parentNode.classList.remove('pin--active');
    } else {
      elem.classList.remove('pin--active');
    }
  },
  addPinActiveClass: function (elem) {
    var pinTarget = elem;
    if (elem.tagName.toLowerCase() === 'img') {
      pinTarget = elem.parentNode;
      elem.parentNode.classList.add('pin--active');
    } else {
      elem.classList.add('pin--active');
    }
    return pinTarget;
  }
};
var COMPUTING_FUNCTIONS = {
  countRandomInteger: function (min, max) {
    return Math.round(min + Math.random() * (max - min + 1));
  },
  getRandomElement: function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },
  randomizeOrder: function (array) {
    var arrayClone = array.slice(0, array.length);
    return arrayClone.sort(COMPUTING_FUNCTIONS.compareRandom);
  },
  compareRandom: function () {
    return Math.random() - 0.5;
  },
  getRandomArrayLength: function (arr) {
    var array = [];
    var minMaxNumbers = [COMPUTING_FUNCTIONS.countRandomInteger(0, 3), COMPUTING_FUNCTIONS.countRandomInteger(3, arr.length)];
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
  },
  getElemIdNumber: function (elem) {
    return elem.id.split('-')[1];
  }
};
var dialogFunctions = {
  drawDialog: function (adsData, id, dialog, removeElem, mainDialog) {
    if (mainDialog) {
      this.newLodge = mainDialog;
      dialog.querySelector('.dialog__title img').src = AVATARS_SRC.src + AVATARS_SRC.numbersImages[0] + AVATARS_SRC.format;
    } else {
      this.newLodge = ADS_INIT.drawLodge(adsData[id]);
      ADS_INIT.changeAvatar(adsData[id], dialog);
    }
    ADS_INIT.replaceNode(dialog, this.newLodge, removeElem);
  },
  dialogOpen: function (evt) {
    var target = evt.target;
    var pinId = null;
    dialog.classList.toggle('hidden', false);
    var oldDialogPanel = dialog.querySelector('.dialog__panel');
    if (pinActiveElement !== null) {
      PINS_FUNCTIONS.removePinActiveClass(pinActiveElement);
    }
    pinActiveElement = PINS_FUNCTIONS.addPinActiveClass(target);
    if (pinActiveElement.classList.contains('pin__main')) {
      dialogFunctions.drawDialog(adsData, pinId, dialog, oldDialogPanel, dialogPanel);
    } else {
      pinId = COMPUTING_FUNCTIONS.getElemIdNumber(pinActiveElement);
      dialogFunctions.drawDialog(adsData, pinId, dialog, oldDialogPanel);
    }
    document.addEventListener('keydown', dialogFunctions.elemEscPressHandler);
  },
  dialogClose: function () {
    dialog.classList.add('hidden');
    if (pinActiveElement !== null) {
      pinActiveElement.classList.remove('pin--active');
      pinActiveElement = null;
    }
    document.removeEventListener('keydown', dialogFunctions.elemEscPressHandler);
  },
  elemEscPressHandler: function (evt) {
    if (evt.keyCode === keyCode.ESC) {
      dialogFunctions.dialogClose();
    }
  },
  elemEnterPressHandler: function (evt) {
    if (evt.keyCode === keyCode.ENTER) {
      if (this === dialogClose) {
        dialogFunctions.dialogClose();
      } else {
        dialogFunctions.dialogOpen(evt);
      }
    }
  }
};
var userForm = {
  timeChangeHandler: function (evt) {
    var target = evt.target;
    var targetValue = target.value;
    switch (target) {
      case timein:
        timeout.value = targetValue;
        break;
      case timeout:
        timein.value = targetValue;
        break;
    }
  },
  setMinPrice: function (price) {
    priceInput.setAttribute('min', price);
    priceInput.value = price;
  },
  houseTypeChangeHandler: function () {
    switch (houseTypeSelect.value) {
      case 'bungalo':
        userForm.setMinPrice(MIN_PRICE.bungalo);
        break;
      case 'flat':
        userForm.setMinPrice(MIN_PRICE.flat);
        break;
      case 'house':
        userForm.setMinPrice(MIN_PRICE.house);
        break;
      case 'palace':
        userForm.setMinPrice(MIN_PRICE.palace);
        break;
    }
  },
  roomNumberChangeHandler: function () {
    switch (roomNumber.value) {
      case ROOM_NUMBER.one:
        capacity.value = GUESTS_CAPACITY.one;
        break;
      case ROOM_NUMBER.two:
        capacity.value = GUESTS_CAPACITY.two;
        break;
      case ROOM_NUMBER.three:
        capacity.value = GUESTS_CAPACITY.three;
        break;
      case ROOM_NUMBER.oneHundred:
        capacity.value = GUESTS_CAPACITY.notForGuest;
    }
  },
  priceInputHandler: function () {
    priceInput.value = +priceInput.value;
    if (priceInput.value >= MIN_PRICE.palace) {
      houseTypeSelect.value = 'palace';
    } else if (priceInput.value >= MIN_PRICE.house) {
      houseTypeSelect.value = 'house';
    } else if (priceInput.value >= MIN_PRICE.flat) {
      houseTypeSelect.value = 'flat';
    } else if (priceInput.value >= MIN_PRICE.bungalo) {
      houseTypeSelect.value = 'bungalo';
    }
  },
  capacityChangeHandler: function () {
    switch (capacity.value) {
      case GUESTS_CAPACITY.one:
        roomNumber.value = ROOM_NUMBER.one;
        break;
      case GUESTS_CAPACITY.two:
        roomNumber.value = ROOM_NUMBER.two;
        break;
      case GUESTS_CAPACITY.three:
        roomNumber.value = ROOM_NUMBER.three;
        break;
      case GUESTS_CAPACITY.notForGuest:
        roomNumber.value = ROOM_NUMBER.oneHundred;
    }
  },
  colorizeErrorInput: function (elem) {
    elem.style.borderColor = errorColor.border;
    elem.style.boxShadow = errorColor.shadow;
  },
  validationValueMissing: function () {
    if (this.validity.valueMissing) {
      userForm.colorizeErrorInput(this);
    }
  }
};
var documentFragment = document.createDocumentFragment();
var map = document.querySelector('.tokyo__pin-map');
var dialog = document.querySelector('#offer-dialog');
var dialogPanel = dialog.querySelector('.dialog__panel');
var dialogClose = dialog.querySelector('.dialog__close');
var dialogTemplate = document.querySelector('#lodge-template').content;
var featureItemTemp = document.querySelector('#feature-item-template').content;
var pin = document.querySelector('#pin-template').content;
var pinActiveElement = null;
var form = document.querySelector('.notice');
var titleInput = form.querySelector('#title');
var addressInput = form.querySelector('#address');
var timein = form.querySelector('#timein');
var timeout = form.querySelector('#timeout');
var priceInput = form.querySelector('#price');
var roomNumber = form.querySelector('#room_number');
var capacity = form.querySelector('#capacity');
var houseTypeSelect = form.querySelector('#type');
var adsData = ADS_INIT.generateAds(OFFER_TITLES, AVATARS_SRC, TIMES, HOUSE_TYPES, FEATURES, MAX_ADS_COUNT, MAX_ROOMS, APARTMENT_PRICE, LOCATION_LIMITS);
ADS_INIT.init(adsData, documentFragment, map, dialog, dialogPanel);
map.addEventListener('click', function (evt) {
  dialogFunctions.dialogOpen(evt);
});
dialogClose.addEventListener('click', function () {
  dialogFunctions.dialogClose();
});
dialogClose.addEventListener('keydown', dialogFunctions.elemEnterPressHandler);
map.addEventListener('keydown', dialogFunctions.elemEnterPressHandler);
timein.addEventListener('change', userForm.timeChangeHandler);
timeout.addEventListener('change', userForm.timeChangeHandler);
houseTypeSelect.addEventListener('change', userForm.houseTypeChangeHandler);
roomNumber.addEventListener('change', userForm.roomNumberChangeHandler);
priceInput.addEventListener('input', userForm.priceInputHandler);
capacity.addEventListener('change', userForm.capacityChangeHandler);
titleInput.addEventListener('invalid', function () {
  if (titleInput.validity.valueMissing || titleInput.validity.tooShort || titleInput.validity.tooLong) {
    userForm.colorizeErrorInput(titleInput);
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Слишком короткий заголовок!');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Слишком длинный заголовок');
    }
  }
});
addressInput.addEventListener('invalid', userForm.validationValueMissing);

