import "../pages/index.css";
import {createCard, changeLike} from "./card.js";
import {
  openModal,
  closeModal,
  setCloseModalByClickListeners,
} from "./modal.js";
import {
  cardsContainer,
  buttonOpenPopupProfile,
  buttonOpenPopupNewCard,
  buttonOpenPopupAvatar,
  popupProfile,
  popupNewCard,
  popupImage,
  popupAvatar,
  popupDelete,
  popupList,
  popupFullImage,
  popupCaption,
  profileTitle,
  profileDescription,
  inputName,
  inputJob,
  inputCardName,
  inputCardUrl,
  formEditProfile,
  formNewPlace,
  formUpdateAvatar,
  formDelete,
  validationConfig,
} from "./const.js";
import {enableValidation, clearValidation} from "./validation.js";
import {fetchData, user, createNewCard, addLike, delLike, deletedCardFromServer} from "./api.js";
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
  clearValidation(formEditProfile, validationConfig);
  inputName.value = profileTitle.textContent;
  inputJob.value = profileDescription.textContent;
});
// окно добавления карточки
buttonOpenPopupNewCard.addEventListener("click", () => {
  openModal(popupNewCard);
  clearValidation(formNewPlace, validationConfig);
});
// окно редактирования аватара
buttonOpenPopupAvatar.addEventListener("click", () => {
  openModal(popupAvatar);
  clearValidation(formUpdateAvatar, validationConfig);
});

// Создаем новую карточку и отображаем её вверху списка карточек

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  saveLoading(true, popupNewCard);

  createNewCard({
    name: inputCardName.value,
    link: inputCardUrl.value,
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
formUpdateAvatar.addEventListener("submit", handleEditAvatarForm);
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

formDelete.addEventListener("submit", function (evt) {
  evt.preventDefault();
  deleteCard(tempCardElement, tempCardId);
});

function deleteCard(cardElement, cardId) {
  saveLoading(true, popupDelete);

  deletedCardFromServer(cardId)
    .then(() => {
      cardElement.remove();
      closeModal(popupDelete);
    })
    .catch((error) => {
      console.log("Произошла ошибка:", error);
    })
    .finally(() => {
      saveLoading(false, popupDelete);
    });
}

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
