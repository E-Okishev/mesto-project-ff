import {
  editProfilePopup,
  buttonOpenPopupAvatar,
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
  saveLoading(true, editProfilePopup);

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
      saveLoading(false, editProfilePopup);
    });
}

// Изменяем аватар

function handleEditAvatarForm(evt) {
  evt.preventDefault();
  saveLoading(true, updateAvatarPopup);

  updateAvatar(avatarInput.value)
    .then((data) => {
      buttonOpenPopupAvatar.style.backgroundImage = `url('${data.avatar}')`;
      closeModal(updateAvatarPopup);
      evt.target.reset()
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    })
    .finally(() => {
      saveLoading(false, updateAvatarPopup);
    });
}

export {handleProfileFormSubmit, handleEditAvatarForm};
