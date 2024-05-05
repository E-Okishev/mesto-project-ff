import '../pages/index.css';
import {initialCards} from '../script/cards.js'

const cardTemp = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const editProfileBtn = document.querySelector('.profile__edit-button')
const editProfilePopup = document.querySelector('.popup_type_edit');
const createNewCardBtn = document.querySelector('.profile__add-button')
const createNewCardPopup = document.querySelector('.popup_type_new-card');
const openImagePopup = document.querySelector('.popup_type_image')

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

document.addEventListener('click', (evt) => {
  evt.target === editProfileBtn ? openModal(editProfilePopup) : null;
  evt.target === createNewCardBtn ? openModal(createNewCardPopup) : null;
  evt.target.closest('.card') ? createImagePopup(evt) : null
})

// document.addEventListener('keydown', (evt) => {
//   if (evt.key === 'Escape') {
//     closeModal()
//   }
// })

function createImagePopup(evt) {
  const popupImage = openImagePopup.querySelector('.popup__image');
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  console.log(popupImage)
}

function openModal(evt) {
  evt.classList.add('popup_is-opened')
  document.addEventListener('click', closeModal)
}

function closeModal(evt) {
  if (evt.target.closest('.popup__close') || (!evt.target.closest('.popup__content') && evt.target !== editProfileBtn)) {
    let event = evt.target.closest('.popup');
    event.classList.remove('popup_is-opened')
    document.removeEventListener('click', closeModal)
  }
}