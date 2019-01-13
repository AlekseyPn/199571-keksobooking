'use strict';
window.modal = (function () {
  var SUCCESS_MSG = 'Ваши данные успешно отправленны! Спасибо.';
  var modalNode = document.querySelector('#modal');
  var overlay = document.querySelector('#overlay');
  var close = document.querySelector('#modal-close');
  var modal = {
    showNode: function (elem) {
      elem.classList.remove('hidden');
    },
    hiddenNode: function (elem) {
      elem.classList.add('hidden');
    },
    errorMessageCb: function (error) {
      modalNode.querySelector('.modal__text').textContent = error;
      modal.showNode(overlay);
      modal.showNode(modalNode);
    },
    closeHandler: function () {
      modal.hiddenNode(overlay);
      modal.hiddenNode(modalNode);
      document.removeEventListener('click', modal.closeHandler);
    },
    successMsgHandler: function () {
      modalNode.querySelector('.modal__text').textContent = SUCCESS_MSG;
      modal.showNode(overlay);
      modal.showNode(modalNode);
    }
  };
  close.addEventListener('click', modal.closeHandler);
  return modal;
})();
