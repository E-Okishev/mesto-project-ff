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

// получили данные о карточках

function fetchData() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
  .then(handleResponse);
}

// получили данные пользователя

function user() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
  .then(handleResponse);
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
  })
  .then(handleResponse);
};



export { user, fetchData, updateProfile };