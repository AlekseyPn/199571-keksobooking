'use strict';
window.modalDialogs = (function () {
  var SUCCESS_MSG = 'Ваши данные успешно отправлены. Спасибо!';
  var modalNode = document.querySelector('#modal');
  var overlay = document.querySelector('#overlay');
  var close = document.querySelector('#modal-close');
  var modalDialogs = {
    showNode: function (elem) {
      elem.classList.remove('hidden');
    },
    hiddenNode: function (elem) {
      elem.classList.add('hidden');
    },
    errorMsgHandler: function (error) {
      modalNode.querySelector('.modal__text').textContent = error[0].errorMessage;
      modalDialogs.showNode(overlay);
      modalDialogs.showNode(modalNode);
    },
    closeHandler: function () {
      modalDialogs.hiddenNode(overlay);
      modalDialogs.hiddenNode(modalNode);
      document.removeEventListener('click', modalDialogs.closeHandler);
    },
    successMsgHandler: function () {
      modalNode.querySelector('.modal__text').textContent = SUCCESS_MSG;
      modalDialogs.showNode(overlay);
      modalDialogs.showNode(modalNode);
    }
  };
  close.addEventListener('click', modalDialogs.closeHandler);
  return modalDialogs;
})();
