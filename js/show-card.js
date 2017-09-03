'use strict';
window.showCard = (function () {
  var helpersFunction = {
    newCard: '',
    removePinActiveClass: function (elem) {
      if (elem.tagName.toLowerCase() === 'img') {
        elem.parentNode.classList.remove('pin--active');
      } else {
        elem.classList.remove('pin--active');
      }
    },
    addPinActiveClass: function (elem) {
      var pinTarget = elem;
      if (elem.tagName.toLowerCase() === 'img') {
        pinTarget = elem.parentNode;
        elem.parentNode.classList.add('pin--active');
      } else {
        elem.classList.add('pin--active');
      }
      return pinTarget;
    },
    drawDialog: function (adsData, id, removeElem, offerDialog, mainDialog) {
      if (mainDialog) {
        this.newCard = mainDialog;
        offerDialog.querySelector('.dialog__title img').src = window.data.avatarData.src + window.data.avatarData.numbersImages[0] + window.data.avatarData.format;
      } else {
        this.newCard = window.card.drawCard(adsData[id]);
        helpersFunction.changeAvatar(adsData[id]);
      }
      window.computingFunctions.replaceNode(offerDialog, this.newCard, removeElem);
    },
    changeAvatar: function (array) {
      document.querySelector('.dialog__title img').src = array.author.avatar;
    }
  };
  var pinActiveElement = null;
  var showCard = function (offerDialog, dialogPanel, data, evt) {
    var target = evt.target;
    var pinId = null;
    offerDialog.classList.toggle('hidden', false);
    var oldDialogPanel = offerDialog.querySelector('.dialog__panel');
    if (pinActiveElement !== null) {
      helpersFunction.removePinActiveClass(pinActiveElement);
    }
    pinActiveElement = helpersFunction.addPinActiveClass(target);
    if (pinActiveElement.classList.contains('pin__main')) {
      helpersFunction.drawDialog(data, pinId, oldDialogPanel, offerDialog, dialogPanel);
    } else {
      pinId = window.computingFunctions.getElemIdNumber(pinActiveElement);
      helpersFunction.drawDialog(data, pinId, oldDialogPanel, offerDialog);
    }
    document.addEventListener('keydown', window.dialog.elemEscPressHandler);
  };
  return {
    show: showCard,
    changeAvatar: helpersFunction.changeAvatar
  };
})();
