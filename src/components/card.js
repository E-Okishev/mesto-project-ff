const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardData, delCard, likeCard, onImageClick, userId) {
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

  deleteButton.addEventListener("click", () => delCard(cardElement));
  likeButton.addEventListener("click", () => {
    likeCard(likeButton, cardData, userId);
  });
  cardImage.addEventListener("click", () => onImageClick(cardImage));
  cardElement.querySelector(".card__like-counter").textContent = likeCounter;

  return cardElement;
}

function delCard(cardElement) {
  cardElement.remove();
}

function toggleCardLike(likeButton, cardData, userId) {
  likeButton.classList.toggle("card__like-button_is-active");
  sendLikeRequest(cardData, userId);
}

function sendLikeRequest(cardData, userId) {
  console.log("cardData", cardData);
  console.log("userId", userId);
}

export { createCard, delCard, toggleCardLike };
