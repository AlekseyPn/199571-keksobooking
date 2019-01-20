'use strict';
(function () {
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
  const Pin = function (pinData, idx) {
    this.data = pinData;
    this.idx = idx;
    this.template = document.getElementById('pin-template').content;
    this.gutter = {
      left: 20,
      top: 40
    };
  }
  Pin.prototype = {
    getEl() {
      let pinElement = this.template.cloneNode(true);
      let pinItem = pinElement.querySelector('.pin');
      pinItem.style = {
        left: (this.data.location.x - this.gutter.left) + 'px',
        top: (this.data.location.y - this.gutter.top) + 'px',
      }
      pinElement.querySelector('img').src = this.data.author.avatar;
      pinItem.dataset.index = this.idx;
      return pinElement;
    },
  }
  const UserPin = function () {
    this.el = document.querySelector('.pin__main')
    let rect = this.el.getBoundingClientRect()
    let mapRect = map.el.getBoundingClientRect();
    const Limit = {
      Left: 300,
      Top: 100,
    }
    this.gutter = {
      left: rect.width / 2,
      top: rect.height
    }
    this.COORD_LIMIT = {
      left: {
        max: mapRect.width - rect.width,
        min: Limit.Left
      },
      top: {
        max: mapRect.height - rect.height,
        min: Limit.top,
      }
    }
  }
  UserPin.prototype = {
    setPosition(top, left) {
      this.el.style.top = this.getPositionValue(top, 'top') + 'px';
      this.el.style.left = this.getPositionValue(left, 'left') + 'px';
    },
    getPositionValue(value, propKey) {
      return Math.min(Math.max(this.COORD_LIMIT[propKey].min, value), this.COORD_LIMIT[propKey].max)
    }
  }
  const pin = {
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

  window.Pin = Pin;
  window.UserPin = UserPin;
})();
