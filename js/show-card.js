'use strict';
window.showCard = (function () {
  var ACTIVE_CLASS = 'pin--active';
  var pinActiveElement = null;
  var showCard = {
    newCard: '',
    getElemIdNumber: function (elem) {
      return elem.id.split('-')[1];
    },
    replaceNode: function (parent, includingElem, replacedElem) {
      return parent.replaceChild(includingElem, replacedElem);
    },
    removeActiveClass: function (elem) {
      if (elem.tagName.toLowerCase() === 'img') {
        elem.parentNode.classList.remove(ACTIVE_CLASS);
      } else {
        elem.classList.remove(ACTIVE_CLASS);
      }
    },
    addActiveClass: function (elem) {
      var pinTarget = elem;
      if (elem.tagName.toLowerCase() === 'img') {
        pinTarget = elem.parentNode;
        elem.parentNode.classList.add(ACTIVE_CLASS);
      } else {
        elem.classList.add(ACTIVE_CLASS);
      }
      return pinTarget;
    },
    showRandom: function (id, data) {
      pinActiveElement = document.querySelector('#pin-' + id);
      showCard.addActiveClass(pinActiveElement);
      showCard.draw(data, id, window.dialog.dialogPanel, window.dialog.offerDialog);
    },
    draw: function (adsData, id, removeElem, offerDialog) {
      this.newCard = window.card.draw(adsData[id]);
      showCard.changeAvatar(adsData[id]);
      showCard.replaceNode(offerDialog, this.newCard, removeElem);

    },
    changeAvatar: function (data) {
      document.querySelector('.dialog__title img').src = data.author.avatar;
    },
    init: function (offerDialog, data, evt) {
      var currentDialog = document.querySelector('.dialog__panel');
      var target = evt.target;
      var pinId = null;
      if (pinActiveElement !== null) {
        showCard.removeActiveClass(pinActiveElement);
      }
      pinActiveElement = showCard.addActiveClass(target);
      pinId = showCard.getElemIdNumber(pinActiveElement);
      if (pinId) {
        offerDialog.classList.toggle('hidden', false);
        showCard.draw(data, pinId, currentDialog, offerDialog);
        document.addEventListener('keydown', window.dialog.elemEscPressHandler);
      }
    }
  };
  return {
    pinActiveElement: pinActiveElement,
    init: showCard.init,
    showRandom: showCard.showRandom,
    changeAvatar: showCard.changeAvatar
  };
})();
