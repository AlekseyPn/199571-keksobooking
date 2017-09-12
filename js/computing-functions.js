'use strict';
window.computingFunctions = (function () {
  var computingFunctions = {
    countRandomInteger: function (min, max) {
      return Math.round(min + Math.random() * (max - min + 1));
    },
    getRandomElement: function (data) {
      return data[Math.floor(Math.random() * data.length)];
    },
    randomizeOrder: function (data) {
      var dataClone = data.slice(0, data.length);
      return dataClone.sort(window.computingFunctions.compareRandom);
    },
    compareRandom: function () {
      return Math.random() - 0.5;
    },
    getElemIdNumber: function (elem) {
      return elem.id.split('-')[1];
    },
    replaceNode: function (parent, includingElem, replacedElem) {
      return parent.replaceChild(includingElem, replacedElem);
    }
  };
  return computingFunctions;
})();
