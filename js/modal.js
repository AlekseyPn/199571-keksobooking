'use strict';
window.modal = (function () {
  var SUCCESS_MSG = 'Ваши данные успешно отправленны! Спасибо.';
  var modalNode = document.querySelector('#modal');
  var overlay = document.querySelector('#overlay');
  var close = document.querySelector('#modal-close');
  var modal = {
    show: function (elem) {
      elem.classList.remove('hidden');
    },
    hide: function (elem) {
      elem.classList.add('hidden');
    },
    setModalText(text) {
      modalNode.querySelector('.modal__text').textContent = text;
      modal.show(overlay);
      modal.show(modalNode);
    },
    closeButtonHandler: function () {
      modal.hide(overlay);
      modal.hide(modalNode);
      document.removeEventListener('click', modal.closeButtonHandler);
    },
  };
  close.addEventListener('click', modal.closeButtonHandler);
  return modal;
})();
