const cardTemp = document.querySelector("#card-template").content;

function createCard(link, name, delCard, isLike) {
  const cardElement = cardTemp.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = link;
  cardImage.alt = name;
  cardImage.loading = 'lazy'
  cardTitle.textContent = name;

  deleteButton.addEventListener("click", (event) => delCard(event));
  likeButton.addEventListener('click', (event) => isLike(event))

  return cardElement;
}

function delCard(evt) {
  const card = evt.target.closest(".card");
  card.remove();
}

function isLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export {createCard, delCard, isLike};