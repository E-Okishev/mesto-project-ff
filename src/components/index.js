import '../pages/index.css';
import {initialCards} from './cards.js'
import {createCard, delCard, toggleCardLike} from "./card.js";
import {openModal, closeModal, setCloseModalByClickListeners} from "./modal.js";

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
  openModal(imagePopup)
}

// вешаем обработчики на окно редактирования имени профили и на окно добавления карточки
editProfileBtn.addEventListener('click', () => {
  // изменение имени профиля и добавление новой карточки
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileTitle.textContent;
  openModal(editProfilePopup)
})

createNewCardBtn.addEventListener('click', () => {
  openModal(createNewCardPopup)
})

function handleProfileFormSubmit(evt) {
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
  evt.target.reset()
  closeModal(createNewCardPopup);
}

editProfilePopup.addEventListener("submit", handleProfileFormSubmit);
createNewCardPopup.addEventListener("submit", handleNewCardFormSubmit);