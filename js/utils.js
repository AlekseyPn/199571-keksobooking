'use strict';
const utility = (function () {
    return {
    // getRandomInteger: function (min, max) {
    //   return Math.round(min + Math.random() * (max - min + 1));
    // },
    // getRandomElementFromData: function (data) {
    //   return data[Math.floor(Math.random() * data.length)];
    // },
    randomizeDataOrder: function (data) {
      let dataClone = data.slice(0, data.length);
      return dataClone.sort(() => Math.random() - 0.5);
    },
    getElemIdNumber: function (elem) {
      return elem.id.split('-')[1];
    },
    replaceChildInternal: function (parent, newChild, oldChild) {
      return parent.replaceChild(newChild, oldChild);
    }
  };
})();
