import "../pages/index.css";
import {createCard, deleteCard, changeLike} from "./card.js";
import {
  openModal,
  closeModal,
  setCloseModalByClickListeners,
} from "./modal.js";
import {
  cardsContainer,
  buttonOpenPopupProfile,
  popupProfile,
  buttonOpenPopupNewCard,
  buttonOpenPopupAvatar,
  popupNewCard,
  popupImage,
  popupAvatar,
  popupDelete,
  profileTitle,
  profileDescription,
  nameInput,
  jobInput,
  cardNameInput,
  cardUrlInput,
  popupFullImage,
  popupCaption,
  popupList,
  editProfileForm,
  newPlaceForm,
  updateAvatarForm,
  deleteForm,
  validationConfig,
} from "./const.js";
import {enableValidation, clearValidation} from "./validation.js";
import {fetchData, user, createNewCard, addLike, delLike} from "./api.js";
import {
  handleProfileFormSubmit,
  handleEditAvatarForm,
} from "./getUserData.js";

let userId;
let tempCardElement;
let tempCardId;

setCloseModalByClickListeners(popupList);

// функция подставляет в открытую модалку фотографию
function onImageClick(image) {
  popupFullImage.src = image.src;
  popupFullImage.alt = image.alt;
  popupCaption.textContent = image.alt;
  openModal(popupImage);
}

// вешаем обработчики на:
// окно редактирования имени профили
buttonOpenPopupProfile.addEventListener("click", () => {
  // Подставляем в инпуты текущее имя и описание профиля
  openModal(popupProfile);
  clearValidation(editProfileForm, validationConfig);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});
// окно добавления карточки
buttonOpenPopupNewCard.addEventListener("click", () => {
  openModal(popupNewCard);
  clearValidation(newPlaceForm, validationConfig);
});
// окно редактирования аватара
buttonOpenPopupAvatar.addEventListener("click", () => {
  openModal(popupAvatar);
  clearValidation(updateAvatarForm, validationConfig);
});

// Создаем новую карточку и отображаем её вверху списка карточек

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  saveLoading(true, popupNewCard);

  createNewCard({
    name: cardNameInput.value,
    link: cardUrlInput.value,
  })
    .then((newItem) => {
      cardsContainer.prepend(
        createCard(
          newItem.name,
          newItem.link,
          newItem.likes,
          newItem.owner._id,
          newItem._id,
          onImageClick,
          userId
        )
      );
    })
    .then(() => {
      closeModal(popupNewCard);
      evt.target.reset();
    })
    .catch((error) => {
      console.log("Произошла ошибка:", error);
    })
    .finally(() => {
      saveLoading(false, popupNewCard);
    });
}

// Получаем данные о профиле и карточках и отоображаем на странице полученные карточки

Promise.all([user(), fetchData()])
  .then(([userData, cardsData]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    buttonOpenPopupAvatar.style.backgroundImage = `url('${userData.avatar}')`;
    userId = userData._id;

    cardsData.forEach((cardData) => {
      cardsContainer.append(
        createCard(
          cardData.name,
          cardData.link,
          cardData.likes,
          cardData.owner._id,
          cardData._id,
          onImageClick,
          userId
        )
      );
    });
  })
  .catch((error) => {
    console.log("Произошла ошибка:", error);
  });

popupProfile.addEventListener("submit", handleProfileFormSubmit);
popupNewCard.addEventListener("submit", handleNewCardFormSubmit);
updateAvatarForm.addEventListener("submit", handleEditAvatarForm);
enableValidation(validationConfig);

function saveLoading(isLoading, popupElement) {
  const activeButton = popupElement.querySelector(".popup__button");
  if (isLoading) {
    activeButton.textContent = "Сохранение...";
  } else {
    activeButton.textContent = activeButton.dataset.text;
  }
}

function openPopupDelete(cardElement, cardId) {
  openModal(popupDelete);
  tempCardElement = cardElement;
  tempCardId = cardId;
}

deleteForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  deleteCard(tempCardElement, tempCardId);
});

function handleLikeCard(status, likeButton, likeCount, cardId) {
  !status
    ? addLike(cardId)
      .then((res) => changeLike(res, likeButton, likeCount))
      .catch((error) => {
        console.log("Произошла ошибка:", error);
      })
    : delLike(cardId)
      .then((res) => changeLike(res, likeButton, likeCount))
      .catch((error) => {
        console.log("Произошла ошибка:", error);
      });
}

export {saveLoading, openPopupDelete, handleLikeCard};
