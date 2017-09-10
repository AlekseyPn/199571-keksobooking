'use strict';
window.showCard = (function () {
  var pinActiveElement = null;
  var showCard = {
    newCard: '',
    removeActiveClass: function (elem) {
      if (elem.tagName.toLowerCase() === 'img') {
        elem.parentNode.classList.remove('pin--active');
      } else {
        elem.classList.remove('pin--active');
      }
    },
    addActiveClass: function (elem) {
      var pinTarget = elem;
      if (elem.tagName.toLowerCase() === 'img') {
        pinTarget = elem.parentNode;
        elem.parentNode.classList.add('pin--active');
      } else {
        elem.classList.add('pin--active');
      }
      return pinTarget;
    },
    draw: function (adsData, id, removeElem, offerDialog, mainDialog) {
      if (mainDialog) {
        this.newCard = mainDialog;
        offerDialog.querySelector('.dialog__title img').src = window.data.AVATARS_DATA.mainPinSrc;
      } else {
        this.newCard = window.card.draw(adsData[id]);
        showCard.changeAvatar(adsData[id]);
      }
      window.computingFunctions.replaceNode(offerDialog, this.newCard, removeElem);
    },
    changeAvatar: function (array) {
      document.querySelector('.dialog__title img').src = array.author.avatar;
    },
    init: function (offerDialog, dialogPanel, data, evt) {
      var target = evt.target;
      var pinId = null;
      offerDialog.classList.toggle('hidden', false);
      var oldDialogPanel = offerDialog.querySelector('.dialog__panel');
      if (pinActiveElement !== null) {
        showCard.removeActiveClass(pinActiveElement);
      }
      pinActiveElement = showCard.addActiveClass(target);
      if (pinActiveElement.classList.contains('pin__main')) {
        showCard.draw(data, pinId, oldDialogPanel, offerDialog, dialogPanel);
      } else {
        pinId = window.computingFunctions.getElemIdNumber(pinActiveElement);
        showCard.draw(data, pinId, oldDialogPanel, offerDialog);
      }
      document.addEventListener('keydown', window.dialog.elemEscPressHandler);
    }
  };
  return {
    init: showCard.init,
    changeAvatar: showCard.changeAvatar
  };
})();
