const cardsContainer = document.querySelector(".places__list");

const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const buttonOpenPopupNewCard = document.querySelector(".profile__add-button");
const buttonOpenPopupAvatar = document.querySelector(".profile__image");

const popupProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupAvatar = document.querySelector(".popup_type_update-avatar");
const popupDelete = document.querySelector(".popup_type_confirm-delete");
const popupList = [
  popupProfile,
  popupNewCard,
  popupImage,
  popupAvatar,
  popupDelete,
];

const popupFullImage = popupImage.querySelector(".popup__image"); // Изображение в модалке
const popupCaption = popupImage.querySelector(".popup__caption"); // Подпись под картинкой в модалке

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const inputName = document.querySelector(".popup__input_type_name");
const inputJob = document.querySelector(".popup__input_type_description");
const inputCardName = document.querySelector(".popup__input_type_card-name");
const inputCardUrl = document.querySelector(".popup__input_type_url");
const inputAvatar = document.querySelector(".popup__input_avatar");

const editProfileForm = document.querySelector('.popup__form[name="edit-profile"]');
const newPlaceForm = document.querySelector('.popup__form[name="new-place"]');
const updateAvatarForm = document.querySelector('.popup__form[name="update-avatar"]');
const deleteForm = document.querySelector('.popup__form[name="delete-card"]');

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export {
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
  inputName,
  inputJob,
  inputCardName,
  inputCardUrl,
  inputAvatar,
  popupFullImage,
  popupCaption,
  popupList,
  editProfileForm,
  newPlaceForm,
  updateAvatarForm,
  deleteForm,
  validationConfig,
};
