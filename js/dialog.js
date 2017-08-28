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
    newCard: '',
    drawDialog: function (adsData, id, removeElem, mainDialog) {
      if (mainDialog) {
        this.newCard = mainDialog;
        offerDialog.querySelector('.dialog__title img').src = window.data.avatarData.src + window.data.avatarData.numbersImages[0] + window.data.avatarData.format;
      } else {
        this.newCard = window.card.drawCard(adsData[id]);
        window.card.changeAvatar(adsData[id]);
      }
      window.computingFunctions.replaceNode(offerDialog, this.newCard, removeElem);
    },
    dialogOpen: function (evt) {
      var target = evt.target;
      var pinId = null;
      offerDialog.classList.toggle('hidden', false);
      var oldDialogPanel = offerDialog.querySelector('.dialog__panel');
      if (pinActiveElement !== null) {
        window.pin.removePinActiveClass(pinActiveElement);
      }
      pinActiveElement = window.pin.addPinActiveClass(target);
      if (pinActiveElement.classList.contains('pin__main')) {
        dialog.drawDialog(window.data.adsData, pinId, oldDialogPanel, dialogPanel);
      } else {
        pinId = window.computingFunctions.getElemIdNumber(pinActiveElement);
        dialog.drawDialog(window.data.adsData, pinId, oldDialogPanel);
      }
      document.addEventListener('keydown', dialog.elemEscPressHandler);
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
    dialog.dialogOpen(evt);
  });
  dialogClose.addEventListener('click', function () {
    dialog.dialogClose();
  });
  dialogClose.addEventListener('keydown', dialog.elemEnterPressHandler);
  window.data.map.addEventListener('keydown', dialog.elemEnterPressHandler);
  return {
    offerDialog: offerDialog,
    dialogPanel: dialogPanel
  };
})();

