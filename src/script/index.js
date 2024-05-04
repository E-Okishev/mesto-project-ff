import '../pages/index.css';
import {initialCards} from '../script/cards.js'
// @todo: Темплейт карточки
const cardTemp = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(link, name, delCard) {
  const cardElement = cardTemp.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = link;
  cardImage.alt = name;
  cardImage.loading = 'lazy'
  cardTitle.textContent = name;

  deleteButton.addEventListener("click", (event) => delCard(event));

  return cardElement;
}

// @todo: Функция удаления карточки
function delCard(event) {
  const card = event.target.closest(".card");
  card.remove();
}

// @todo: Вывести карточки на страницу
function renderCard(array, delCard) {
  array.forEach(card => {
    placesList.append(createCard(card["link"], card["name"], delCard));
  });
}

renderCard(initialCards, delCard);