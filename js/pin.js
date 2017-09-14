'use strict';
window.pin = (function () {
  var LOCATION_LIMITS = {
    'x': {
      'min': 300,
      'max': 1200
    },
    'y': {
      'min': 100,
      'max': 650
    }
  };
  var ICON_GUTTER = {
    left: 20,
    top: 40
  };
  var USER_ICON_SIZE = {
    width: 75,
    height: 94
  };
  var pin = {
    userIconGutter: {
      left: USER_ICON_SIZE.width / 2,
      top: USER_ICON_SIZE.height
    },
    MAX_PIN_COORDS: {
      x: LOCATION_LIMITS.x.max - USER_ICON_SIZE.width,
      y: LOCATION_LIMITS.y.max - USER_ICON_SIZE.height
    },
    AVATARS_DATA: {
      mainPinSrc: 'img/avatars/user01.png',
      id: 'pin-'
    },
    MIN_PIN_COORDS: {
      x: LOCATION_LIMITS.x.min,
      y: LOCATION_LIMITS.y.min
    },
    LEFT_PIN_COORDS: {
      max: LOCATION_LIMITS.x.max - USER_ICON_SIZE.width,
      min: LOCATION_LIMITS.x.min
    },
    TOP_PIN_COORDS: {
      max: LOCATION_LIMITS.y.max - USER_ICON_SIZE.height,
      min: LOCATION_LIMITS.y.min
    },
    pinTemplate: document.querySelector('#pin-template').content,
    userPin: document.querySelector('.pin__main'),
    drawPin: function (data, index) {
      var pinElement = this.pinTemplate.cloneNode(true);
      var pinItem = pinElement.querySelector('.pin');
      pinItem.setAttribute('style', 'left:' + (data.location.x - ICON_GUTTER.left) + 'px; top:' + (data.location.y - ICON_GUTTER.top) + 'px;');
      pinElement.querySelector('img').src = data.author.avatar;
      pinItem.id = pin.AVATARS_DATA.id + index;
      return pinElement;
    },
    insertFragments: function (elem, data) {
      for (var l = 0; l < data.length; l++) {
        window.data.documentFragment.appendChild(this.drawPin(data[l], l));
      }
      elem.appendChild(window.data.documentFragment);
    },
    setPosition: function (top, left) {
      pin.userPin.style.left = left + 'px';
      pin.userPin.style.top = top + 'px';
    },
    setAddressCoords: function () {
      return {
        x: pin.userPin.offsetLeft,
        y: pin.userPin.offsetTop
      };
    }
  };
  return pin;
})();
