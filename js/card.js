'use strict';
window.card = (function () {
  var SYMBOL_ROUBLE = '\u20bd';
  var cardFeatureTemplate = document.querySelector('#feature-item-template').content;
  var cardTemplate = document.querySelector('#lodge-template').content;
  var card = {
    drawFeature: function (array) {
      var featureItem = cardFeatureTemplate.cloneNode(true);
      var featureClass = 'feature__image--' + array;
      featureItem.querySelector('.feature__image').classList.add(featureClass);
      return featureItem;
    },
    insertFragments: function (fragment, array) {
      for (var k = 0; k < array.length; k++) {
        fragment.appendChild(this.drawFeature(array[k]));
      }
      return fragment;
    },
    draw: function (array) {
      var cardElement = cardTemplate.cloneNode(true);
      var houseType;
      switch (array.offer.type) {
        case 'flat':
          houseType = 'Квартира';
          break;
        case 'bungalo':
          houseType = 'Бунгало';
          break;
        case 'house':
          houseType = 'Дом';
          break;
      }
      cardElement.querySelector('.lodge__title').textContent = array.offer.title;
      cardElement.querySelector('.lodge__address').textContent = array.offer.address;
      cardElement.querySelector('.lodge__price').textContent = array.offer.price + SYMBOL_ROUBLE + '/ночь';
      cardElement.querySelector('.lodge__type').textContent = houseType;
      cardElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + array.offer.guests + ' гостей в ' + array.offer.rooms + ' комнатах';
      cardElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + array.offer.checkin + ', выезд до ' + array.offer.checkout;
      cardElement.querySelector('.lodge__features').appendChild(this.insertFragments(window.data.documentFragment, array.offer.features));
      cardElement.querySelector('.lodge__description').textContent = array.offer.description;
      return cardElement;
    }
  };
  return card;
})();
