'use strict';
window.card = (function () {
  var SYMBOL_ROUBLE = '\u20bd';
  var HOUSES_TYPES_RU = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };
  var cardFeatureTemplate = document.querySelector('#feature-item-template').content;
  var cardTemplate = document.querySelector('#lodge-template').content;
  var card = {
    drawFeature: function (data) {
      var featureItem = cardFeatureTemplate.cloneNode(true);
      var featureClass = 'feature__image--' + data;
      featureItem.querySelector('.feature__image').classList.add(featureClass);
      return featureItem;
    },
    insertFragments: function (fragment, data) {
      for (var k = 0; k < data.length; k++) {
        fragment.appendChild(this.drawFeature(data[k]));
      }
      return fragment;
    },
    draw: function (data) {
      var cardElement = cardTemplate.cloneNode(true);
      var houseType = '';
      switch (data.offer.type) {
        case window.synchronizeFields.HOUSES_TYPES.flat:
          houseType = HOUSES_TYPES_RU.flat;
          break;
        case window.synchronizeFields.HOUSES_TYPES.bungalo:
          houseType = HOUSES_TYPES_RU.bungalo;
          break;
        case window.synchronizeFields.HOUSES_TYPES.house:
          houseType = HOUSES_TYPES_RU.house;
          break;
      }
      cardElement.querySelector('.lodge__title').textContent = data.offer.title;
      cardElement.querySelector('.lodge__address').textContent = data.offer.address;
      cardElement.querySelector('.lodge__price').textContent = data.offer.price + SYMBOL_ROUBLE + '/ночь';
      cardElement.querySelector('.lodge__type').textContent = houseType;
      cardElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + data.offer.guests + ' гостей в ' + data.offer.rooms + ' комнатах';
      cardElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
      cardElement.querySelector('.lodge__features').appendChild(this.insertFragments(window.data.documentFragment, data.offer.features));
      cardElement.querySelector('.lodge__description').textContent = data.offer.description;
      return cardElement;
    }
  };
  return card;
})();
