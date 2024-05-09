const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardData, delCard, likeCard, onImageClick) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardImage.loading = 'lazy'
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener("click", () => delCard(cardElement));
  likeButton.addEventListener('click', () => likeCard(likeButton))
  cardImage.addEventListener('click', () => onImageClick(cardImage))

  return cardElement;
}

function delCard(cardElement) {
  cardElement.remove();
}

function toggleCardLike(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

export {createCard, delCard, toggleCardLike};