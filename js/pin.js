'use strict';
window.pin = (function () {
  const ICON_GUTTER = {
    left: 20,
    top: 40
  };
  const USER_ICON_SIZE = {
    width: 75,
    height: 94
  };
  const PIN_ID_PREFIX = "pin-";
  const PIN_POSITION_LIMITS = {
    x: {
      min: 300,
      max: 1200
    },
    y: {
      min: 100,
        max: 650
    }
  };
  const pinTemplateContent = document.getElementById('pin-template').content;
  const documentFragment = document.createDocumentFragment();
  const pin = {
    userIconGutter: {
      left: USER_ICON_SIZE.width / 2,
      top: USER_ICON_SIZE.height
    },
    // todo вообще не относиться к текущему файлу, эти лимиты используются для перетаскивания
    MAX_PIN_COORDS: {
      x: PIN_POSITION_LIMITS.x.max - USER_ICON_SIZE.width,
      y: PIN_POSITION_LIMITS.y.max - USER_ICON_SIZE.height
    },
    MIN_PIN_COORDS: {
      x: PIN_POSITION_LIMITS.x.min,
      y: PIN_POSITION_LIMITS.y.min
    },
    userPin: document.querySelector('.pin__main'),
    drawPin: function (data, index) {
      let pinElement = pinTemplateContent.cloneNode(true);
      let pinItem = pinElement.querySelector('.pin');
      pinItem.setAttribute('style', 'left:' + (data.location.x - ICON_GUTTER.left) + 'px; top:' + (data.location.y - ICON_GUTTER.top) + 'px;');
      pinElement.querySelector('img').src = data.author.avatar;
      pinItem.id = PIN_ID_PREFIX + index;
      return pinElement;
    },
    createPinsEl: function (data) {
      data.forEach((item, idx) => {
        documentFragment.appendChild(this.drawPin(item, idx));
      });
      return documentFragment;
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
