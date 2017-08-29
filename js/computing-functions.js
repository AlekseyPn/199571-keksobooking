'use strict';
window.computingFunctions = (function () {
  var computingFunctions = {
    countRandomInteger: function (min, max) {
      return Math.round(min + Math.random() * (max - min + 1));
    },
    getRandomElement: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
    randomizeOrder: function (array) {
      var arrayClone = array.slice(0, array.length);
      return arrayClone.sort(window.computingFunctions.compareRandom);
    },
    compareRandom: function () {
      return Math.random() - 0.5;
    },
    getRandomArrayLength: function (arr) {
      var array = [];
      var minMaxNumbers = [this.countRandomInteger(0, 3), this.countRandomInteger(3, arr.length)];
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
    },
    replaceNode: function (parent, includingElem, replacedElem) {
      return parent.replaceChild(includingElem, replacedElem);
    }
  };
  return computingFunctions;
})();
