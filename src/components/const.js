const cardsContainer = document.querySelector(".places__list");

const editProfileBtn = document.querySelector('.profile__edit-button')
const createNewCardBtn = document.querySelector('.profile__add-button')

const editProfilePopup = document.querySelector('.popup_type_edit');
const createNewCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const popupList = [editProfilePopup, createNewCardPopup, imagePopup];

const popupImage = imagePopup.querySelector('.popup__image'); // Изображение в модалке
const popupCaption = imagePopup.querySelector('.popup__caption'); // Подпись под картинкой в модалке

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');

export {
    cardsContainer, 
    editProfileBtn,
    editProfilePopup,
    createNewCardBtn, 
    createNewCardPopup, 
    imagePopup, 
    profileTitle, 
    profileDescription, 
    nameInput, 
    jobInput, 
    cardNameInput, 
    cardUrlInput, 
    popupImage, 
    popupCaption, 
    popupList
}