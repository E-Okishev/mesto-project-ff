let currentBtn;
let currentModal;

function changeCurrent(btn, modal) {
  currentBtn = btn
  currentModal = modal
}

function closeModal(evt) {
  const target = evt.target;
  if (target.closest('.popup__close') ||
    target.closest('.popup__button') ||
    (!target.closest('.popup__content') &&
      target !== currentBtn) ||
    evt.key === 'Escape'
  ) {
    currentModal.classList.remove('popup_is-opened')
    document.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', closeModal);
  }
}

function openModal() {
  currentModal.classList.add('popup_is-opened')
  document.addEventListener('click', closeModal);
  document.addEventListener('keydown', closeModal);
}

export {changeCurrent, openModal}