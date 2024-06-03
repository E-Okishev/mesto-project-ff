import {
  popupProfile,
  buttonOpenPopupAvatar,
  popupAvatar,
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
  saveLoading(true, popupProfile);

  updateProfile({
    name: nameInput.value,
    about: jobInput.value,
  })
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      closeModal(popupProfile);
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    })
    .finally(() => {
      saveLoading(false, popupProfile);
    });
}

// Изменяем аватар

function handleEditAvatarForm(evt) {
  evt.preventDefault();
  saveLoading(true, popupAvatar);

  updateAvatar(avatarInput.value)
    .then((data) => {
      buttonOpenPopupAvatar.style.backgroundImage = `url('${data.avatar}')`;
      closeModal(popupAvatar);
      evt.target.reset()
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    })
    .finally(() => {
      saveLoading(false, popupAvatar);
    });
}

export {handleProfileFormSubmit, handleEditAvatarForm};
