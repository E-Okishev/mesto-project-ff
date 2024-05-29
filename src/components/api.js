const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-14",
  headers: {
    authorization: "67c3b6ba-e04b-434d-81f3-8a123b402586",
    "Content-Type": "application/json",
  },
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Получили данные о карточках

function fetchData() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResponse);
}

// Получили данные пользователя

function user() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleResponse);
}

// Редактирование профиля

function updateProfile(nameInput, jobInput) {
  return fetch(`${configAPI.baseUrl}/users/me`, {
    method: "PATCH",
    headers: configAPI.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value,
    }),
  }).then(handleResponse);
}

// Отправили новую картчоку на сервер

function createNewCard(cardNameInput, cardUrlInput) {
  return fetch(`${configAPI.baseUrl}/cards`, {
    method: "POST",
    headers: configAPI.headers,
    body: JSON.stringify({
      name: cardNameInput.value,
      link: cardUrlInput.value,
    }),
  }).then(handleResponse);
}

// Удалили карточку с сервера

function deletedCardFromServer(cardId) {
  return fetch(`${configAPI.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: configAPI.headers,
  }).then(handleResponse);
}

// Отправили и удалили лайк у картчки

function toggleLikeButton(cardId, isLiked) {
  if (isLiked) {
    return fetch(`${configAPI.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: configAPI.headers,
    }).then(handleResponse);
  } else {
    return fetch(`${configAPI.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: configAPI.headers,
    }).then(handleResponse);
  }
}

// Редактирование аватара

function updateAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  })
    .then(handleResponse)
}

export { fetchData, user, updateProfile, createNewCard, deletedCardFromServer, toggleLikeButton, updateAvatar };
