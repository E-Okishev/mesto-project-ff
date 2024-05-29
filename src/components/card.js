import { toggleLikeButton } from "./api";

const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardData, delCard, likeCard, onImageClick, userData) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeCounter = cardData.likes.length;
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardImage.loading = "lazy";
  cardTitle.textContent = cardData.name;

  if (cardData.owner._id !== userData._id) {
    deleteButton.style.display = "none";
  }

  if (cardData.likes.some((user) => user._id === userData._id)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  deleteButton.addEventListener("click", () => delCard(cardElement, cardData._id));
  likeButton.addEventListener("click", () => {
    likeCard(likeButton, cardData._id, likeCounter);
  });
  cardImage.addEventListener("click", () => onImageClick(cardImage));

  return cardElement;
}

function delCard(cardElement, cardId) {
  openModal(deletePopup);
}



function toggleCardLike(likeButton, cardData, userId) {
  likeButton.classList.toggle("card__like-button_is-active");
}

export { createCard, delCard, toggleCardLike };
