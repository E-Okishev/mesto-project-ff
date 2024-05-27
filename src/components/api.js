import { updateUserInfo } from "./updateUserInfo.js";
import { renderCards } from "./renderCards.js";

async function fetchData(auth) {
  return fetch(`https://nomoreparties.co/v1/${auth.idCohort}/cards`, {
    headers: {
      authorization: auth.token,
    },
  });
}

async function user(auth) {
  return fetch(`https://nomoreparties.co/v1/${auth.idCohort}/users/me`, {
    headers: {
      authorization: auth.token,
    },
  });
}

async function updateProfile(auth, formData) {
  return fetch(`https://nomoreparties.co/v1/${auth.idCohort}/users/me`, {
  method: 'PATCH',
  headers: {
    authorization: auth.token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: formData.get('name'),
    about: formData.get('about')
  })
});
}

async function getAllData(auth) {
  try {
    const responce = await Promise.all([user(auth), fetchData(auth)]);
    const userInfo = await responce[0].json();
    updateUserInfo(userInfo);
    const cardList = await responce[1].json();
    renderCards(cardList, userInfo._id);
  } catch (error) {
    throw new Error(error);
  }
}

async function changeUserData(auth, formData) {
  try {
    const responce = await updateProfile(auth, formData);
    if(responce.status === 200) {
      await getAllData(auth)
    }
  } catch (error) {
    throw new Error(error);
  }
}

export { getAllData, changeUserData };
