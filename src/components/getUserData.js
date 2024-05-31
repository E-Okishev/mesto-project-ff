import {
  editProfilePopup,
  updateAvatarBtn,
  updateAvatarPopup,
  profileTitle,
  profileDescription,
  nameInput,
  jobInput,
  avatarInput,
} from "./const.js";
import {saveLoading} from "./index.js";
import {updateProfile, updateAvatar} from "./api.js";
import {closeModal} from "./modal.js";

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

// Изменяем аватар

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

export {handleProfileFormSubmit, handleEditAvatarForm};