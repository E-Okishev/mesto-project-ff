// @todo: Темплейт карточки
const cardTemp = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(link, name, delCard) {
  const cardElement = cardTemp.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").alt = name;

  deleteButton.addEventListener("click", (event) => delCard(event));

  placesList.append(cardElement);
}

// @todo: Функция удаления карточки
function delCard(event) {
  const card = event.target.closest(".card");
  card.remove();
}

// @todo: Вывести карточки на страницу
function renderCard(array, delCard) {
  array.forEach(card => {
    createCard(card["link"], card["name"], delCard);
  });
}

renderCard(initialCards, delCard);