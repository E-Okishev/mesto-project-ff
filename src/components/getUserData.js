import {profileTitle, profileDescription, updateAvatarBtn} from "./const.js"

// Отображаем полученные имя профиля и аватар

function getUserData(userData) {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  updateAvatarBtn.style.backgroundImage = `url('${userData.avatar}')`;
}


// Изменяем имя профиля

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfilePopup);
}

export {getUserData, handleProfileFormSubmit}