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

const formEditProfile = document.querySelector(
  '.popup__form[name="edit-profile"]'
);
const formNewPlace = document.querySelector('.popup__form[name="new-place"]');
const formUpdateAvatar = document.querySelector(
  '.popup__form[name="update-avatar"]'
);
const formDelete = document.querySelector('.popup__form[name="delete-card"]');

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
  inputAvatar,
  formEditProfile,
  formNewPlace,
  formUpdateAvatar,
  formDelete,
  validationConfig,
};
