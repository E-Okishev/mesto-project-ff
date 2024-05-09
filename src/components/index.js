import '../pages/index.css';
import {initialCards} from './cards.js'
import {createCard, delCard, toggleCardLike} from "./card.js";
import {openModal, closeModal, changeCurrent, setCloseModalByClickListeners} from "./modal.js";

const cardsContainer = document.querySelector(".places__list");

const editProfileBtn = document.querySelector('.profile__edit-button')
const editProfilePopup = document.querySelector('.popup_type_edit');
const createNewCardBtn = document.querySelector('.profile__add-button')
const createNewCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');

const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

const popupList = [editProfilePopup, createNewCardPopup, imagePopup]

// Вывести карточки на страницу
function renderCards(array, delCard, likeCard, onImageClick) {
  array.forEach(card => {
    cardsContainer.append(createCard(card, delCard, likeCard, onImageClick));
  });
}

renderCards(initialCards, delCard, toggleCardLike, onImageClick);
setCloseModalByClickListeners(popupList)

// функция подставляет в открытую модалку фотографию
function onImageClick(image) {
  popupImage.src = image.src;
  popupImage.alt = image.alt;
  popupCaption.textContent = image.alt;
  changeCurrent(image, imagePopup);
  openModal(imagePopup)
}

// вешаем обработчики на окно редактирования имени профили и на окно добавления карточки
editProfileBtn.addEventListener('click', () => {
  changeCurrent(editProfileBtn, editProfilePopup)
  // изменение имени профиля и добавление новой карточки
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  openModal(editProfilePopup)
})

createNewCardBtn.addEventListener('click', () => {
  changeCurrent(createNewCardBtn, createNewCardPopup)
  openModal(createNewCardPopup)
})

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfilePopup);
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault()
  const newItem = {
    name: cardNameInput.value,
    link: cardUrlInput.value
  }
  cardsContainer.prepend(createCard(newItem, delCard, toggleCardLike, onImageClick));
  cardNameInput.value = '';
  cardUrlInput.value = '';
  closeModal(createNewCardPopup);
}

editProfilePopup.addEventListener("submit", handleFormSubmit);
createNewCardPopup.addEventListener("submit", handleNewCardFormSubmit);