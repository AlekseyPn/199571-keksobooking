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
    dialogData: [],
    setDialogData: function (value) {
      window.dialog.dialogData = value;
    },
    dialogClose: function () {
      offerDialog.classList.add('hidden');
      if (pinActiveElement !== null) {
        pinActiveElement.classList.remove('pin--active');
        pinActiveElement = null;
      }
      document.removeEventListener('keydown', dialog.elemEscPressHandler);
    },
    elemEscPressHandler: function (evt) {
      if (evt.keyCode === keyCode.ESC) {
        dialog.dialogClose();
      }
    },
    elemEnterPressHandler: function (evt) {
      if (evt.keyCode === keyCode.ENTER) {
        if (this === dialogClose) {
          dialog.dialogClose();
        } else {
          dialog.dialogOpen(evt);
        }
      }
    }
  };
  window.data.map.addEventListener('click', function (evt) {
    window.showCard.show(offerDialog, dialogPanel, window.dialog.dialogData, evt);
  });
  dialogClose.addEventListener('click', function () {
    dialog.dialogClose();
  });
  dialogClose.addEventListener('keydown', dialog.elemEnterPressHandler);
  window.data.map.addEventListener('keydown', dialog.elemEnterPressHandler);
  return {
    setDialogData: dialog.setDialogData,
    dialogData: dialog.dialogData,
    offerDialog: offerDialog,
    dialogPanel: dialogPanel,
    elemEscPressHandler: dialog.elemEscPressHandler
  };
})();
