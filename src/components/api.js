import {cardsContainer} from "./const";
import {createCard, delCard, toggleCardLike} from "./card";
import {onImageClick} from "./index";


function fetchData(auth) {
  return fetch(`https://nomoreparties.co/v1/${auth.idCohort}/cards`, {
    headers: {
      authorization: auth.token
    }
  })
    .then(res => res.json())
    .then((result) => {
      result.forEach((card) => {
        cardsContainer.append(createCard(card, delCard, toggleCardLike, onImageClick));
      })
    });
}

export {fetchData}
