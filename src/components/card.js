import {deletedCardFromServer} from "./api";
import {deletePopup} from "./const.js";
import {closeModal} from "./modal.js";
import {saveLoading, openDeletePopup, handleLikeCard} from "./index.js";

const cardTemplate = document.querySelector("#card-template").content;

function createCard(
  name,
  link,
  likes,
  ownerId,
  cardId,
  handleLikeCard,
  onImageClick,
  userId
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeCount = cardElement.querySelector(".card__like-counter");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  likeCount.textContent = likes.length;

  cardImage.src = link;
  cardImage.alt = name;
  cardImage.loading = "lazy";
  cardTitle.textContent = name;

  if (ownerId !== userId) {
    deleteButton.style.display = "none";
  }

  if (likes.some((user) => user._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  deleteButton.addEventListener("click", () =>
    openDeletePopup(cardElement, cardId)
  );
  likeButton.addEventListener("click", () => checkStatusLike(likeButton, cardId));
  cardImage.addEventListener("click", () => onImageClick(cardImage));

  return cardElement;
}

function deleteCard(cardElement, cardId) {
  saveLoading(true, deletePopup);

  deletedCardFromServer(cardId)
    .then(() => {
      cardElement.remove();
      closeModal(deletePopup);
    })
    .catch((error) => {
      console.log("Произошла ошибка:", error);
    })
    .finally(() => {
      saveLoading(false, deletePopup);
    });
}

function checkStatusLike(likeButton, cardId, likeCount) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  handleLikeCard(isLiked, cardId, likeCount, likeButton)
}

function changeLike(res) {
  const likeCount = document.querySelector(".card__like-counter");
  likeCount.textContent = res.likes.length;
  const likeButton = document.querySelector('.card__like-button');
  likeButton.classList.toggle("card__like-button_is-active");
}

export {createCard, deleteCard, changeLike};
