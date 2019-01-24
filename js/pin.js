'use strict';
(function () {
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
      pinItem.style.left = (this.data.location.x - this.gutter.left) + 'px';
      pinItem.style.top = (this.data.location.y - this.gutter.top) + 'px';
      pinElement.querySelector('img').src = this.data.author.avatar;
      pinItem.dataset.index = this.idx;
      return pinElement;
    },
  }
  const UserPin = function (map) {
    this.el = document.querySelector('.pin__main')
    let rect = this.el.getBoundingClientRect()
    let mapRect = map.getBoundingClientRect();
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
      // подумать чо нить с этим числом
      top: {
        max: 600 - rect.height,
        min: Limit.Top,
      }
    }
    this.setPosition = (shift) => {
      this.el.style.top = this.calcPosition(shift.y, 'top') + 'px';
      this.el.style.left = this.calcPosition(shift.x, 'left') + 'px';
    }
    this.isCursorOnPin = () => {
      if (DragNDrop.coords.x > this.COORD_LIMIT.left.max
        || DragNDrop.coords.x < this.COORD_LIMIT.left.min
        || DragNDrop.coords.y > this.COORD_LIMIT.top.max || DragNDrop.coords.y < this.COORD_LIMIT.top.min) {
        Event.EventChannel("REMOVE_LISTENERS");
      }
    }
    this.calcPosition = (shift, propKey) => {
      const pos = this.el[`offset${propKey[0].toUpperCase() + propKey.slice(1)}`] - shift;
      // this.isCursorOnPin();
      return this.getPositionValue(pos, propKey);
    }
    this.getPositionValue = function (value, propKey) {
      return Math.min(Math.max(this.COORD_LIMIT[propKey].min, value), this.COORD_LIMIT[propKey].max)
    }
    this.unsubribe = EventChannel.subscribe("SET_POSITION", this.setPosition);
  }

  const PinsCreator = function () {
    this.el = document.createDocumentFragment()
    this.getPins = function (data) {
      data.forEach((item, idx) => {
        this.el.appendChild((new Pin(item, idx)).getEl());
      });
      return this.el;
    }
  }

  window.UserPin = UserPin;
  window.PinsCreator = new PinsCreator();
})();
