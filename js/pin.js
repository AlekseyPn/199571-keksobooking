'use strict';
window.pin = (function () {
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
      x: window.data.LOCATION_LIMITS.x.max - USER_ICON_SIZE.width,
      y: window.data.LOCATION_LIMITS.y.max - USER_ICON_SIZE.height
    },
    MIN_PIN_COORDS: {
      x: window.data.LOCATION_LIMITS.x.min,
      y: window.data.LOCATION_LIMITS.y.min
    },
    pinTemplate: document.querySelector('#pin-template').content,
    userPin: document.querySelector('.pin__main'),
    drawPin: function (data, index) {
      let pinElement = this.pinTemplate.cloneNode(true);
      let pinItem = pinElement.querySelector('.pin');
      pinItem.setAttribute('style', 'left:' + (data.location.x - ICON_GUTTER.left) + 'px; top:' + (data.location.y - ICON_GUTTER.top) + 'px;');
      pinElement.querySelector('img').src = data.author.avatar;
      pinItem.id = window.data.AVATARS_DATA.id + index;
      return pinElement;
    },
    insertFragments: function (elem, data) {
      for (let l = 0; l < data.length; l++) {
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
