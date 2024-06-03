import {deletedCardFromServer} from "./api";
import {popupDelete} from "./const.js";
import {closeModal} from "./modal.js";
import {saveLoading, openPopupDelete, handleLikeCard} from "./index.js";

const cardTemplate = document.querySelector("#card-template").content;

function createCard(
  name,
  link,
  likes,
  ownerId,
  cardId,
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
    openPopupDelete(cardElement, cardId)
  );
  likeButton.addEventListener("click", () =>
    checkStatusLike(likeButton, likeCount, cardId)
  );
  cardImage.addEventListener("click", () => onImageClick(cardImage));

  return cardElement;
}

function deleteCard(cardElement, cardId) {
  saveLoading(true, popupDelete);

  deletedCardFromServer(cardId)
    .then(() => {
      cardElement.remove();
      closeModal(popupDelete);
    })
    .catch((error) => {
      console.log("Произошла ошибка:", error);
    })
    .finally(() => {
      saveLoading(false, popupDelete);
    });
}

function checkStatusLike(likeButton, likeCount, cardId) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  handleLikeCard(isLiked, likeButton, likeCount, cardId)
}

function changeLike(res, likeButton, likeCount) {
  likeCount.textContent = res.likes.length;
  likeButton.classList.toggle("card__like-button_is-active");
}

export {createCard, deleteCard, changeLike};
