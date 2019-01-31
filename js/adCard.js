'use strict';
window.showCard = (function () {
  const PIN_ACTIVE_CLASS = 'pin--active';
  let pinActiveElement = null;
  // вообще какой то ненужный файл эти действия относятся
  const showCard = {
    newCard: '',
    removeActiveClass: function (elem) {
      if (elem.tagName.toLowerCase() === 'img') {
        elem.parentNode.classList.remove(PIN_ACTIVE_CLASS);
      } else {
        elem.classList.remove(PIN_ACTIVE_CLASS);
      }
    },
    addActiveClass: function (elem) {
      let pinTarget = elem;
      if (elem.tagName.toLowerCase() === 'img') {
        pinTarget = elem.parentNode;
        elem.parentNode.classList.add(PIN_ACTIVE_CLASS);
      } else {
        elem.classList.add(PIN_ACTIVE_CLASS);
      }
      return pinTarget;
    },
    showRandom: function (idx, data) {
      pinActiveElement = document.querySelector(`[data-index='${idx}']`);
      showCard.addActiveClass(pinActiveElement);
      showCard.draw(data, idx, window.dialog.dialogPanel, window.dialog.offerDialog);
    },
    draw: function (adsData, id, removeElem, offerDialog) {
      this.newCard = Card.draw(adsData[id]);
      showCard.changeAvatar(adsData[id]);
      offerDialog.replaceChild(this.newCard, removeElem);
    },
    changeAvatar: function (data) {
      document.querySelector('.dialog__title img').src = data.author.avatar;
    },
    init: function (offerDialog, data, evt) {
      let target = evt.target;
      if (target.classList.contains('pin__main') || target.parentNode.classList.contains('pin__main')) return;
      offerDialog.classList.toggle('hidden', false);
      if (pinActiveElement !== null) {
        showCard.removeActiveClass(pinActiveElement);
      }
      pinActiveElement = showCard.addActiveClass(target);
      let pinId = utility.getElemIdNumber(pinActiveElement);
      showCard.draw(data, pinId, window.dialog.dialogPanel, offerDialog);
      document.addEventListener('keydown', window.dialog.elemEscPressHandler);
    }
  };
  return {
    init: showCard.init,
    showRandom: showCard.showRandom,
    changeAvatar: showCard.changeAvatar
  };
})();
