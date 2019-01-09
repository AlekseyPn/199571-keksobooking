'use strict';
window.filter = (function () {
  var DEFAULT_VALUE = 'any';
  var PRICE_VALUE = {
    middle: {
      name: 'middle',
      min: 10000,
      max: 50000
    },
    low: {
      name: 'low',
      value: 10000
    },
    high: {
      name: 'high',
      value: 50000
    }
  };
  var housingType = document.querySelector('#housing_type');
  var housingPrice = document.querySelector('#housing_price');
  var housingRoomsNumber = document.querySelector('#housing_room-number');
  var housingGuestsNumber = document.querySelector('#housing_guests-number');
  var housingFeatures = document.querySelector('#housing_features');

  var housingTypeValue = DEFAULT_VALUE;
  var housingPriceValue = DEFAULT_VALUE;
  var housingRoomsNumberValue = DEFAULT_VALUE;
  var housingGuestsNumberValue = DEFAULT_VALUE;
  var housingFeaturesValue = [];
  var filter = {
    filteredData: [],
    removePins: function () {
      var pins = document.querySelectorAll('.pin');
      for (var i = 1; i < pins.length; i++) {
        window.data.mapEl.removeChild(pins[i]);
      }
    },
    priceConditions: function (priceValue, it) {
      switch (priceValue) {
        case PRICE_VALUE.middle.name:
          return (it.offer.price >= PRICE_VALUE.middle.min) && (it.offer.price <= PRICE_VALUE.middle.max);
        case PRICE_VALUE.low.name:
          return it.offer.price <= PRICE_VALUE.low.value;
        case PRICE_VALUE.high.name:
          return it.offer.price >= PRICE_VALUE.high.value;
        default:
          return true;
      }
    },
    setFeatureValue: function (elem) {
      var featureValues = [];
      for (var i = 0; i < elem.elements.length; i++) {
        if (elem.elements[i].checked && featureValues.indexOf(elem.elements[i].value) === -1) {
          featureValues.push(elem.elements[i].value);
        }
      }
      return featureValues;
    },
    setDataValue: function (data) {
      return filter.filteredData.length !== 0 ? filter.filteredData : data;
    },
    featureCondition: function (it) {
      for (var j = 0; j < housingFeaturesValue.length; j++) {
        if (it.offer.features.indexOf(housingFeaturesValue[j]) === -1) {
          return false;
        }
      }
      return true;
    },
    filterType: function () {
      filter.filteredData = filter.filteredData.filter(function (it) {
        if (housingTypeValue === DEFAULT_VALUE) {
          return true;
        } else {
          return it.offer.type === housingTypeValue;
        }
      });
    },
    filterPrice: function () {
      filter.filteredData = filter.filteredData.filter(function (it) {
        return filter.priceConditions(housingPriceValue, it);
      });
    },
    filterRooms: function () {
      filter.filteredData = filter.filteredData.filter(function (it) {
        if (housingRoomsNumberValue === DEFAULT_VALUE) {
          return true;
        } else {
          return it.offer.rooms === +housingRoomsNumberValue;
        }
      });
    },
    filterFeature: function () {
      filter.filteredData = filter.filteredData.filter(function (it) {
        if (housingFeaturesValue.length === 0) {
          return true;
        } else {
          return filter.featureCondition(it);
        }
      });
    },
    filterGuests: function () {
      filter.filteredData = filter.filteredData.filter(function (it) {
        if (housingGuestsNumberValue === DEFAULT_VALUE) {
          return true;
        } else {
          return it.offer.guests === +housingGuestsNumberValue;
        }
      });
    },
    filterData: function (data) {
      filter.filteredData = data;
      filter.removePins();
      filter.filterType();
      filter.filterPrice();
      filter.filterRooms();
      filter.filterGuests();
      filter.filterFeature();
      window.data.mapEl.appendChild(window.pin.createPinsEl(filter.filteredData));
      window.dialog.setData(filter.filteredData);
    },
  };
  housingType.addEventListener('change', function () {
    housingTypeValue = housingType.value;
    window.debounce(filter.filterData(window.data.adsData));
  });
  housingPrice.addEventListener('change', function () {
    housingPriceValue = housingPrice.value;
    window.debounce(filter.filterData(window.data.adsData));
  });
  housingRoomsNumber.addEventListener('change', function () {
    housingRoomsNumberValue = housingRoomsNumber.value;
    window.debounce(filter.filterData(window.data.adsData));
  });
  housingGuestsNumber.addEventListener('change', function () {
    housingGuestsNumberValue = housingGuestsNumber.value;
    window.debounce(filter.filterData(window.data.adsData));
  });
  housingFeatures.addEventListener('change', function () {
    housingFeaturesValue = filter.setFeatureValue(housingFeatures);
    window.debounce(filter.filterData(window.data.adsData));
  });
})();
