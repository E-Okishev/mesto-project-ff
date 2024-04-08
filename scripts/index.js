// @todo: Темплейт карточки
const cardTemp = document.querySelector('#card-template').content;

// @todo: DOM узлы
const places = document.querySelector('.places')
const placesList = places.querySelector('.places__list');
const deleteButton = placesList.querySelector('.card__delete-button')

// @todo: Функция создания карточки
function createCard(image, title) {
  const cardElement = cardTemp.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = image;
  cardElement.querySelector('.card__title').textContent = title;
  cardElement.querySelector('.card__image').alt = title;

  deleteButton.addEventListener('click', delCard)

  placesList.append(cardElement);
}

// @todo: Функция удаления карточки
function delCard() {
  const cards = document.querySelectorAll('.card');

  for (let card of cards) {
    card.addEventListener('click', function () {
      card.remove();
    });
  }
}

// @todo: Вывести карточки на страницу
function renderCard(arr) {
  for (let i = 0; i < arr.length; i++) {
    createCard(arr[i]["link"], arr[i]["name"]);
  }
}

renderCard(initialCards);

