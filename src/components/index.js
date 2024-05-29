import "../pages/index.css";
import { createCard, delCard, toggleCardLike } from "./card.js";
import {
  openModal,
  closeModal,
  setCloseModalByClickListeners,
} from "./modal.js";
import {
  cardsContainer,
  editProfileBtn,
  editProfilePopup,
  createNewCardBtn,
  updateAvatarBtn,
  createNewCardPopup,
  imagePopup,
  updateAvatarPopup,
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
  updateAvatarForm,
  validationConfig,
} from "./const.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  fetchData,
  user,
  updateProfile,
  createNewCard,
  deletedCardFromServer,
  toggleLikeButton,
  updateAvatar,
} from "./api.js";
import { getUserData, handleProfileFormSubmit } from "./getUserData.js";

setCloseModalByClickListeners(popupList);

// функция подставляет в открытую модалку фотографию
function onImageClick(image) {
  popupImage.src = image.src;
  popupImage.alt = image.alt;
  popupCaption.textContent = image.alt;
  openModal(imagePopup);
}

// вешаем обработчики на:
// окно редактирования имени профили
editProfileBtn.addEventListener("click", () => {
  // Подставляем в инпуты текущее имя и описание профиля
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editProfilePopup);
  clearValidation(editProfileForm, validationConfig);
});
// окно добавления карточки
createNewCardBtn.addEventListener("click", () => {
  openModal(createNewCardPopup);
  clearValidation(newPlaceForm, validationConfig);
});
// окно редактирования аватара
updateAvatarBtn.addEventListener("click", () => {
  openModal(updateAvatarPopup);
  clearValidation(updateAvatarForm, validationConfig);
});

// Создаем новую карточку и отображаем её вверху списка карточек

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const newItem = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
  };
  cardsContainer.prepend(
    createCard(newItem, delCard, toggleCardLike, onImageClick)
  );
  evt.target.reset();
  closeModal(createNewCardPopup);
}

// Получаем данные о профиле и карточках и отоображаем на странице полученные карточки

Promise.all([user(), fetchData()])
.then(([userData, cardsData]) => {
  getUserData(userData);

  cardsData.forEach((cardData) => {
    cardsContainer.append(
      createCard(cardData, delCard, toggleCardLike, onImageClick, userData)
    );
  });
})
.catch((error) => {
  throw new Error('Ошибка:', error);
});

editProfilePopup.addEventListener("submit", handleProfileFormSubmit);
createNewCardPopup.addEventListener("submit", handleNewCardFormSubmit);
enableValidation(validationConfig);