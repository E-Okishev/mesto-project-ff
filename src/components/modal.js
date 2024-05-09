let currentBtn;
let currentModal;

function changeCurrent(btn, modal) {
  currentBtn = btn
  currentModal = modal
}

function closeModal(modal) {
  modal.classList.toggle('popup_is-opened')
  document.removeEventListener('keydown', closeModal);
}

function handleCloseModalByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.popup_is-opened')
    closeModal(openedModal)
  }
}

function handleCloseModalByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target)
  }
}

function setCloseModalByClickListeners(popupList) {
  popupList.forEach(popup => {
    // находим кнопку закрытия попапа
    const closeButton = popup.querySelector('.popup__close')
    // вешаем обработчик закрытия на кнопку, тут достаточно вызвать closeModal
    closeButton.addEventListener('click', () => closeModal(popup))

    // вешаем обработчик закрытия на оверлей
    popup.addEventListener('click', handleCloseModalByOverlay)
  })
}

function openModal(modal) {
  modal.classList.toggle('popup_is-opened')
  document.addEventListener('keydown', handleCloseModalByEsc);
}

export {openModal, closeModal, changeCurrent, setCloseModalByClickListeners}