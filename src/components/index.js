import '../pages/index.css';
import {initialCards} from './cards.js'
import {createCard, delCard, toggleCardLike} from "./card.js";
import {changeCurrent, openModal} from "./modal.js";

const placesList = document.querySelector(".places__list");

const editProfileBtn = document.querySelector('.profile__edit-button')
const editProfilePopup = document.querySelector('.popup_type_edit');
const createNewCardBtn = document.querySelector('.profile__add-button')
const createNewCardPopup = document.querySelector('.popup_type_new-card');
const openImagePopup = document.querySelector('.popup_type_image');

const formElement = document.querySelectorAll('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');

// добавляем на все попапы на странице класс для плавного открытия и закрытия
const popups = document.querySelectorAll('.popup')
popups.forEach((popup) => {
  popup.classList.add('popup_is-animated')
})

// Вывести карточки на страницу
function renderCard(array, delCard, likeCard, onImageClick) {
  array.forEach(card => {
    placesList.append(createCard(card, delCard, likeCard, onImageClick));
  });
}

renderCard(initialCards, delCard, toggleCardLike, onImageClick);


// функция подставляет в открытую модалку фотографию
function onImageClick(image) {
  const popupImage = openImagePopup.querySelector('.popup__image');
  const popupCaption = openImagePopup.querySelector('.popup__caption');
  popupImage.src = image.src;
  popupImage.alt = image.alt;
  popupCaption.textContent = image.alt;
}

// вешаем обработчик на весь документ, смотрим куда кликаем и открываем нужную модалку
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
  }
})

// изменение имени профиля и добавление новой карточки
nameInput.value = document.querySelector('.profile__title').textContent;
jobInput.value = document.querySelector('.profile__description').textContent;

function handleFormSubmit(evt) {
  evt.preventDefault();
  let formName = evt.target.getAttribute('name')
  if (formName === 'edit-profile') {
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
  }
  if (formName === 'new-place') {
    let newItem = {
      name: cardNameInput.value,
      link: cardUrlInput.value
    }
    placesList.prepend(createCard(newItem.link, newItem.name, delCard, toggleCardLike));
  }
}

// Вешаем обработчик на формы
formElement.forEach((form) => {
  form.addEventListener('submit', handleFormSubmit)
})