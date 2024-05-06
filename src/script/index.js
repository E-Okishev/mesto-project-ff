import '../pages/index.css';
import {initialCards} from '../script/cards.js'

const cardTemp = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const editProfileBtn = document.querySelector('.profile__edit-button')
const editProfilePopup = document.querySelector('.popup_type_edit');
const createNewCardBtn = document.querySelector('.profile__add-button')
const createNewCardPopup = document.querySelector('.popup_type_new-card');
const openImagePopup = document.querySelector('.popup_type_image');

let currentBtn;
let currentModal;

const profileTitle = document.querySelector('.profile__title')
const descriptionProfile = document.querySelector('.profile__description')
const inputNameProfile = editProfilePopup.querySelector('.popup__input_type_name')
const inputDescriptionProfile = editProfilePopup.querySelector('.popup__input_type_description')
const inputNameCard = createNewCardPopup.querySelector('.popup__input_type_card-name');
const inputUrlCard = createNewCardPopup.querySelector('.popup__input_type_url');

// @todo: Функция создания карточки
function createCard(link, name, delCard) {
  const cardElement = cardTemp.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = link;
  cardImage.alt = name;
  cardImage.loading = 'lazy'
  cardTitle.textContent = name;

  deleteButton.addEventListener("click", (event) => delCard(event));

  return cardElement;
}

// @todo: Функция удаления карточки
function delCard(evt) {
  const card = evt.target.closest(".card");
  card.remove();
}

// @todo: Вывести карточки на страницу
function renderCard(array, delCard) {
  array.forEach(card => {
    placesList.append(createCard(card["link"], card["name"], delCard));
  });
}

renderCard(initialCards, delCard);

function changeCurrent(btn, modal) {
  currentBtn = btn
  currentModal = modal
}

document.addEventListener('click', (evt) => {
  if (evt.target === editProfileBtn) {
    changeCurrent(editProfileBtn, editProfilePopup)
    openModal()
  }
  if (evt.target === createNewCardBtn) {
    changeCurrent(createNewCardBtn, createNewCardPopup)
    openModal()
  }
  if (evt.target.closest('.card__image')) {
    changeCurrent(evt.target, openImagePopup);
    openModal()
    createImagePopup(evt.target)
  }
})

function createImagePopup(image) {
  const popupImage = openImagePopup.querySelector('.popup__image');
  const popupCaption = openImagePopup.querySelector('.popup__caption');
  popupImage.src = image.src;
  popupImage.alt = image.alt;
  popupCaption.textContent = image.alt;
}

function closeModal(evt) {
  const target = evt.target;
  if (target.closest('.popup__close') ||
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


