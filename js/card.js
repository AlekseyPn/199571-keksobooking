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
      getContent: (ad) => ad.offer.title,
    },
    {
      selector: '.lodge__address',
      getContent: (ad) => ad.offer.address,
    },
    {
      selector: '.lodge__price',
      getContent: (ad) => ad.offer.price + SYMBOL_ROUBLE + '/ночь',
    },
    {
      selector: '.lodge__type',
      getContent: (ad) => LOCALIZED_HOUSE_TYPE[ad.offer.type],
    },
    {
      selector: '.lodge__rooms-and-guests',
      getContent: (ad) => 'Для ' + ad.offer.guests + ' гостей в ' + ad.offer.rooms + ' комнатах',
    },
    {
      selector: '.lodge__checkin-time',
      getContent: (ad) => 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout,
    },
    {
      selector: '.lodge__description',
      getContent: (ad) => ad.offer.description,
    },
  ];

  // todo метод плюрализации для гостей и комнат
  const fillElTextContent = function(selector, content, element) {
    element.querySelector(selector).textContent = content;
  };
  const Card = function () {
    let cardElement = null;
    this.draw = function (ad) {
      cardElement = cardTemplate.cloneNode(true);
      elementsForFill.forEach(el => {
        fillElTextContent(el.selector, el.getContent(ad), cardElement);
      });
      cardElement.querySelector('.lodge__features').appendChild(fillFeatureFragment(ad.offer.features));
      return cardElement;
    };
  };
  return new Card();
})();
