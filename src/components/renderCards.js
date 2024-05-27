import { createCard, delCard, toggleCardLike } from "./card.js";
import { onImageClick } from "./index.js";
import { cardsContainer } from "./const.js";

export function renderCards(array, userId) {
  array.forEach((card) => {
    cardsContainer.append(
      createCard(card, delCard, toggleCardLike, onImageClick, userId)
    );
  });
}
