"use strict";
(function () {
  const EventChannel = function () {
    this._subscribers = {};
  }
  EventChannel.prototype = {
    subscribe(event, callback) {
      if (
        this._subscribers[event] === undefined ||
        this._subscribers[event] === null
      ) {
        this._subscribers[event] = [];
      }

      const index = this._subscribers[event].push(callback) - 1;

      return () => {
        this._subscribers[event][index] = null;
      };
    },
    dispatch(event, data) {
      const subscribers = this._subscribers[event];

      if (subscribers === undefined || subscribers === null) return;
      subscribers.forEach(callback => {
        if (typeof callback === "function") {
          callback(data);
        }
      });
    }
  }
  window.EventChannel = new EventChannel();
})()
