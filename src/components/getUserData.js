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
import { saveLoading } from "./index.js";
import { updateProfile, updateAvatar } from "./api.js";
import { closeModal } from "./modal.js";

// Отображаем полученные имя профиля и аватар

function getUserData(userData) {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  updateAvatarBtn.style.backgroundImage = `url('${userData.avatar}')`;
}

// Изменяем имя профиля

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const popupElement = document.querySelector(".popup_is-opened");
  saveLoading(true, popupElement);

  updateProfile({
    name: nameInput.value,
    about: jobInput.value,
  })
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      closeModal(editProfilePopup);
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    })
    .finally(() => {
      saveLoading(false, popupElement);
    });
}

function handleEditAvatarForm(evt) {
  evt.preventDefault();
  const popupElement = document.querySelector(".popup_is-opened");
  saveLoading(true, popupElement);

  updateAvatar(avatarInput.value)
    .then((data) => {
      updateAvatarBtn.style.backgroundImage = `url('${data.avatar}')`;
      closeModal(updateAvatarPopup);
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    })
    .finally(() => {
      saveLoading(false, popupElement);
    });
}

export { getUserData, handleProfileFormSubmit, handleEditAvatarForm };
