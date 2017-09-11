'use strict';
window.dialog = (function () {
  var pinActiveElement = null;
  var offerDialog = document.querySelector('#offer-dialog');
  var dialogPanel = offerDialog.querySelector('.dialog__panel');
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
    elemEnterPressHandler: function (evt) {
      if (evt.keyCode === keyCode.ENTER) {
        if (this === dialogClose) {
          dialog.close();
        } else {
          dialog.open(evt);
        }
      }
    }
  };
  window.data.map.addEventListener('click', function (evt) {
    dialog.open(evt);
  });
  dialogClose.addEventListener('click', function () {
    dialog.close();
  });
  dialogClose.addEventListener('keydown', dialog.elemEnterPressHandler);
  window.data.map.addEventListener('keydown', dialog.elemEnterPressHandler);
  return {
    setData: dialog.setData,
    dialogsData: dialog.dialogsData,
    offerDialog: offerDialog,
    dialogPanel: dialogPanel,
    elemEscPressHandler: dialog.elemEscPressHandler
  };
})();
