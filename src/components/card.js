import { deletedCardFromServer, addLike, delLike } from "./api";
import { deletePopup } from "./const.js";
import { closeModal } from "./modal.js";
import { deleteLoading, openDeletePopup } from "./index.js";

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
  // likeButton.addEventListener("click", () =>
  //   toggleCardLike(likeButton, cardId, likeCount)
  // );
  likeButton.addEventListener("click", () => handleLikeCard(checkStatusLike));
  cardImage.addEventListener("click", () => onImageClick(cardImage));

  return cardElement;
}

function deleteCard(cardElement, cardId) {
  const popupElement = document.querySelector(".popup_is-opened");
  deleteLoading(true, popupElement);

  deletedCardFromServer(cardId)
    .then(() => {
      cardElement.remove();
      closeModal(deletePopup);
    })
    .catch((error) => {
      console.log("Произошла ошибка:", error);
    })
    .finally(() => {
      deleteLoading(false, popupElement);
    });
}
function checkStatusLike() {
  console.log('checkStatusLike', likeButton.classList.contains("card__like-button_is-active"));
  return likeButton.classList.contains("card__like-button_is-active");
}
function changeLike() {
  likeCount = res.likes.length;
  likeButton.classList.toggle("card__like-button_is-active");
}
// function toggleCardLike(likeButton, cardId, likeCount) {
//   const isLiked = likeButton.classList.contains("card__like-button_is-active")
//     ? delLike
//     : addLike;
//   isLiked(cardId)
//     .then((res) => {
//       likeCount = res.likes.length;
//       likeButton.classList.toggle("card__like-button_is-active");
//     })
//     .catch((error) => {
//       console.log("Произошла ошибка:", error);
//     });
// }

export { createCard, deleteCard, changeLike };
