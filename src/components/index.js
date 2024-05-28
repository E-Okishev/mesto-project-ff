import '../pages/index.css';
import {createCard, delCard, toggleCardLike} from "./card.js";
import {openModal, closeModal, setCloseModalByClickListeners} from "./modal.js";
import {
  cardsContainer,
  editProfileBtn,
  editProfilePopup,
  createNewCardBtn,
  createNewCardPopup,
  imagePopup,
  profileTitle,
  profileDescription,
  nameInput,
  jobInput,
  cardNameInput,
  cardUrlInput,
  popupImage,
  popupCaption,
  popupList,
  editProfileForm,
  newPlaceForm,
  validationConfig
} from "./const.js"
import {enableValidation, clearValidation} from "./validation.js";

import { user, fetchData, updateProfile } from "./api.js";

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
  jobInput.value = profileDescription.textContent;
  openModal(editProfilePopup)
  clearValidation(editProfileForm, validationConfig)
})

createNewCardBtn.addEventListener('click', () => {
  openModal(createNewCardPopup)
  clearValidation(newPlaceForm, validationConfig)
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
  cardsContainer.prepend(createCard(newItem, delCard, toggleCardLike, onImageClick, userId));
  evt.target.reset()
  closeModal(createNewCardPopup);
}

editProfilePopup.addEventListener("submit", handleProfileFormSubmit);
createNewCardPopup.addEventListener("submit", handleNewCardFormSubmit);

enableValidation(validationConfig)