import "../pages/index.css";
import { createCard, openDeletePopup, toggleCardLike } from "./card.js";
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
  deletePopup,
  profileTitle,
  profileDescription,
  nameInput,
  jobInput,
  cardNameInput,
  cardUrlInput,
  avatarInput,
  popupImage,
  popupCaption,
  popupList,
  editProfileForm,
  newPlaceForm,
  updateAvatarForm,
  deleteForm,
  validationConfig,
} from "./const.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  fetchData,
  user,
  updateProfile,
  createNewCard,
  deletedCardFromServer,
  addLike,
  delLike,
  updateAvatar,
} from "./api.js";
import {
  getUserData,
  handleProfileFormSubmit,
  handleEditAvatarForm,
} from "./getUserData.js";

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
  openModal(editProfilePopup);
  clearValidation(editProfileForm, validationConfig);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
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
  const popupElement = document.querySelector(".popup_is-opened");
  saveLoading(true, popupElement);

  createNewCard({
    name: cardNameInput.value,
    url: cardUrlInput,
  })
    .then((newItem) => {
      cardsContainer.prepend(
        createCard(newItem, openDeletePopup, toggleCardLike, onImageClick)
      );
    })
    .then(() => {
      closeModal(createNewCardPopup);
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    })
    .finally(() => {
      saveLoading(false, popupElement);
    });
  evt.target.reset();
}

// Получаем данные о профиле и карточках и отоображаем на странице полученные карточки

Promise.all([user(), fetchData()])
  .then(([userData, cardsData]) => {
    getUserData(userData);

    cardsData.forEach((cardData) => {
      cardsContainer.append(
        createCard(
          cardData,
          openDeletePopup,
          toggleCardLike,
          onImageClick,
          userData
        )
      );
    });
  })
  .catch((error) => {
    console.error("Произошла ошибка:", error);
  });

editProfilePopup.addEventListener("submit", handleProfileFormSubmit);
createNewCardPopup.addEventListener("submit", handleNewCardFormSubmit);
updateAvatarForm.addEventListener("submit", handleEditAvatarForm);
enableValidation(validationConfig);

function saveLoading(isLoading, popupElement) {
  const activeButton = popupElement.querySelector(".popup__button");
  if (isLoading) {
    activeButton.textContent = "Сохранение...";
  } else {
    activeButton.textContent = "Сохранить";
  }
}

function deleteLoading(isLoading, popupElement) {
  const activeButton = popupElement.querySelector(".popup__button");
  if (isLoading) {
    activeButton.textContent = "Удаление...";
  } else {
    activeButton.textContent = "Да";
  }
}

export { saveLoading, deleteLoading };
