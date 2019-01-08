'use strict';
window.Card = (function () {
  const SYMBOL_ROUBLE = '\u20bd';
  const LOCALIZED_HOUSE_TYPE= {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };
  const documentFragment = document.createDocumentFragment();
  const cardFeatureTemplate = document.querySelector('#feature-item-template').content;
  const cardTemplate = document.querySelector('#lodge-template').content;
  const fillFeatureFragment = (features) => {
      features.forEach(item => {
        documentFragment.appendChild(createFeatureEl(item));
      });
      return documentFragment;
  };

  const createFeatureEl = (feature) => {
    const fragment = cardFeatureTemplate.cloneNode(true);
    fragment.querySelector('.feature__image').classList.add('feature__image--' + feature);
    return fragment;
  };
  const elementsForFill = [
    {
      selector: '.lodge__title',
      getContent: (data) => data.offer.title,
    },
    {
      selector: '.lodge__address',
      getContent: (data) => data.offer.address,
    },
    {
      selector: '.lodge__price',
      getContent: (data) => data.offer.price + SYMBOL_ROUBLE + '/ночь',
    },
    {
      selector: '.lodge__type',
      getContent: (data) => LOCALIZED_HOUSE_TYPE[data.offer.type],
    },
    {
      selector: '.lodge__rooms-and-guests',
      getContent: (data) => 'Для ' + data.offer.guests + ' гостей в ' + data.offer.rooms + ' комнатах',
    },
    {
      selector: '.lodge__checkin-time',
      getContent: (data) => 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout,
    },
    {
      selector: '.lodge__description',
      getContent: (data) => data.offer.description,
    },
  ];
  const fillElTextContent = function(selector, content, element) {
    element.querySelector(selector).textContent = content;
  };
  const Card = function () {
    let cardElement = null;
    this.draw = function (data) {
      cardElement = cardTemplate.cloneNode(true);
      elementsForFill.forEach(el => {
        fillElTextContent(el.selector, el.getContent(data), cardElement);
      });
      cardElement.querySelector('.lodge__features').appendChild(fillFeatureFragment(data.offer.features));
      return cardElement;
    };
  };
  return new Card();
})();
