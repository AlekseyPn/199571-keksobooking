'use strict';
window.pin = (function () {
  var ICON_GUTTER = {
    left: 20,
    top: 40
  };
  var pin = {
    userIconGutter: {
      left: 75 / 2,
      top: 94
    },
    MAX_PIN_COORDS: {
      x: 1124,
      y: 564
    },
    MIN_PIN_COORDS: {
      x: 0,
      y: 100
    },
    pinTemplate: document.querySelector('#pin-template').content,
    userPin: document.querySelector('.pin__main'),
    drawPin: function (array, index) {
      var pinElement = this.pinTemplate.cloneNode(true);
      var pinItem = pinElement.querySelector('.pin');
      pinItem.setAttribute('style', 'left:' + (array.location.x - ICON_GUTTER.left) + 'px; top:' + (array.location.y - ICON_GUTTER.top) + 'px;');
      pinElement.querySelector('img').src = array.author.avatar;
      pinItem.id = window.data.avatarData.id + index;
      return pinElement;
    },
    insertPinFragments: function (elem, array) {
      for (var l = 0; l < array.length; l++) {
        window.data.documentFragment.appendChild(this.drawPin(array[l], l));
      }
      elem.appendChild(window.data.documentFragment);
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
  return pin;
})();
