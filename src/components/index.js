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
  popupImage,
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
  popupImage.src = image.src;
  popupImage.alt = image.alt;
  popupCaption.textContent = image.alt;
  openModal(imagePopup);
}

// вешаем обработчики на:
// окно редактирования имени профили
buttonOpenPopupProfile.addEventListener("click", () => {
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
  saveLoading(true, createNewCardPopup);

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
          handleLikeCard,
          onImageClick,
          userId
        )
      );
    })
    .then(() => {
      closeModal(createNewCardPopup);
      evt.target.reset();
    })
    .catch((error) => {
      console.log("Произошла ошибка:", error);
    })
    .finally(() => {
      saveLoading(false, createNewCardPopup);
    });
}

// Получаем данные о профиле и карточках и отоображаем на странице полученные карточки

Promise.all([user(), fetchData()])
  .then(([userData, cardsData]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    updateAvatarBtn.style.backgroundImage = `url('${userData.avatar}')`;
    userId = userData._id;

    cardsData.forEach((cardData) => {
      cardsContainer.append(
        createCard(
          cardData.name,
          cardData.link,
          cardData.likes,
          cardData.owner._id,
          cardData._id,
          handleLikeCard,
          onImageClick,
          userId
        )
      );
    });
  })
  .catch((error) => {
    console.log("Произошла ошибка:", error);
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
    activeButton.textContent = activeButton.dataset.text;
  }
}

function openDeletePopup(cardElement, cardId) {
  openModal(deletePopup);
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

export {saveLoading, openDeletePopup, handleLikeCard};
