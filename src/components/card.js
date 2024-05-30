import { deletedCardFromServer, addLike, delLike } from "./api";
import { deletePopup, deleteForm } from "./const.js";
import { openModal } from "./modal.js";
import { deleteLoading } from "./index.js"

const cardTemplate = document.querySelector("#card-template").content;
let tempCardElement;
let tempCardId;

function createCard(cardData, openDeletePopup, toggleCardLike, onImageClick, userData) {
  const ownerId = cardData.owner._id;
  const userId = userData._id;
  const cardId = cardData._id;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeCount = cardElement.querySelector('.card__like-counter')
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  likeCount.textContent = cardData.likes.length;
  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardImage.loading = "lazy";
  cardTitle.textContent = cardData.name;
  

  if (ownerId !== userId) {
    deleteButton.style.display = "none";
  }

  if (cardData.likes.some((user) => user._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  deleteButton.addEventListener("click", () => openDeletePopup(cardElement, cardId));
  likeButton.addEventListener("click", () =>
    toggleCardLike(likeButton, cardId, likeCount)
  );
  cardImage.addEventListener("click", () => onImageClick(cardImage));

  return cardElement;
}

function openDeletePopup(cardElement, cardId) {
  openModal(deletePopup)
  tempCardElement = cardElement;
  tempCardId = cardId;
}

deleteForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  deleteCard(tempCardElement, tempCardId);
});

function deleteCard(cardElement, cardId) {
  const popupElement = document.querySelector(".popup_is-opened");
  deleteLoading(true, popupElement);  

  deletedCardFromServer(cardId)
    .then(() => {
      cardElement.remove();
      closeModal(deletePopup);
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    })
    .finally(() => {
      deleteLoading(false, popupElement)
    })
}

function toggleCardLike(likeButton, cardId, likeCount) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active")
    ? delLike
    : addLike;
  isLiked(cardId)
    .then((res) => {
      likeCount = res.likes.length;
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.log(err);
    });
}

export { createCard, openDeletePopup, toggleCardLike };
