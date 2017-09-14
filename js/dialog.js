'use strict';
window.dialog = (function () {
  var pinActiveElement = null;
  var offerDialog = document.querySelector('#offer-dialog');
  var dialogPanel = document.querySelector('.dialog__panel');
  var dialogClose = offerDialog.querySelector('.dialog__close');
  var keyCode = {
    ESC: 27,
    ENTER: 13
  };
  var dialog = {
    dialogsData: [],
    setData: function (value) {
      window.dialog.dialogsData = value;
    },
    open: function (evt) {
      window.showCard.init(offerDialog, window.dialog.dialogsData, evt);
    },
    close: function () {
      offerDialog.classList.add('hidden');
      if (pinActiveElement !== null) {
        pinActiveElement.classList.remove('pin--active');
        pinActiveElement = null;
      }
      document.removeEventListener('keydown', dialog.elemEscPressHandler);
    },
    elemEscPressHandler: function (evt) {
      if (evt.keyCode === keyCode.ESC) {
        dialog.close();
      }
    },
  };
  window.data.map.addEventListener('click', function (evt) {
    dialog.open(evt);
  });
  dialogClose.addEventListener('click', function () {
    dialog.close();
  });
  return {
    setData: dialog.setData,
    dialogPanel: dialogPanel,
    dialogsData: dialog.dialogsData,
    offerDialog: offerDialog,
    elemEscPressHandler: dialog.elemEscPressHandler
  };
})();
