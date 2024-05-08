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


// @todo: Функция создания карточки
function createCard(link, name, delCard, isLike) {
  const cardElement = cardTemp.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = link;
  cardImage.alt = name;
  cardImage.loading = 'lazy'
  cardTitle.textContent = name;

  deleteButton.addEventListener("click", (event) => delCard(event));
  likeButton.addEventListener('click', (event) => isLike(event))

  return cardElement;
}

// @todo: Функция удаления карточки
function delCard(evt) {
  const card = evt.target.closest(".card");
  card.remove();
}

//лайкаем фотографию
function isLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

// @todo: Вывести карточки на страницу
function renderCard(array, delCard, isLike) {
  array.forEach(card => {
    placesList.append(createCard(card["link"], card["name"], delCard, isLike));
  });
}

renderCard(initialCards, delCard, isLike);

function changeCurrent(btn, modal) {
  currentBtn = btn
  currentModal = modal
}

// вешаем обработчик на весь документ и смотрим куда кликаем
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

// функция подставляет в открытую модалку фотографию
function createImagePopup(image) {
  const popupImage = openImagePopup.querySelector('.popup__image');
  const popupCaption = openImagePopup.querySelector('.popup__caption');
  popupImage.src = image.src;
  popupImage.alt = image.alt;
  popupCaption.textContent = image.alt;
}

// функция закрытия модалки
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

// функция открытия модалки
function openModal() {
  currentModal.classList.add('popup_is-opened')
  document.addEventListener('click', closeModal);
  document.addEventListener('keydown', closeModal);
}

// изменение имени профиля и добавление новой карточки
const formElement = document.querySelectorAll('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');

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
    placesList.prepend(createCard(newItem.link, newItem.name, delCard, isLike));
  }
}

formElement.forEach((form) => {
  form.addEventListener('submit', handleFormSubmit)
})
