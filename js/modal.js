'use strict';
window.modal = (function () {
  var SUCCESS_MSG = 'Ваши данные успешно отправленны! Спасибо.';
  var modalNode = document.querySelector('#modal');
  var overlay = document.querySelector('#overlay');
  var close = document.querySelector('#modal-close');
  var modal = {
    showNode: function (node) {
      node.classList.remove('hidden');
    },
    hiddenNode: function (node) {
      node.classList.add('hidden');
    },
    errorMsgHandler: function (error) {
      modalNode.querySelector('.modal__text').textContent = error;
      modal.showNode(overlay);
      modal.showNode(modalNode);
    },
    closeModal: function () {
      modal.hiddenNode(overlay);
      modal.hiddenNode(modalNode);
    },
    successMsgHandler: function () {
      modalNode.querySelector('.modal__text').textContent = SUCCESS_MSG;
      modal.showNode(overlay);
      modal.showNode(modalNode);
    }
  };
  close.addEventListener('click', modal.closeModal);
  return modal;
})();
