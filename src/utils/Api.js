class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //проверка запроса
  _checkResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // получение карточек
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._checkResponce(res));
  }

  // получить информацию пользователя
  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._checkResponce(res));
  }

  //установка данных юзера
  setUser(data) {
    //{name, about}
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify(data),
    }).then((res) => this._checkResponce(res));
  }

  // изменение аватара
  changeAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => this._checkResponce(res));
  }

  // добавление карточки
  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify(data),
    }).then((res) => this._checkResponce(res));
  } //addCard

  // добавление лайка
  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      credentials: "include",
      headers: this._headers,
    }).then((res) => this._checkResponce(res));
  }

  // удаление лайка
  // removeLike(id) {
  //   return fetch(`${this._baseUrl}/cards/${id}/likes`, {
  //     method: "DELETE",
  //     headers: this._headers,
  //   }).then((res) => this._checkResponce(res));
  //}

  //удаление карточки
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then((res) => this._checkResponce(res));
  }

  //изменение лайка из брифа
  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      credentials: "include",
      headers: this._headers,
    }).then((res) => this._checkResponce(res));
  }
}

const api = new Api(
  'https://api.vkoenen.mesto.nomoredomainsicu.ru',
  ///'http://localhost:3000',
  {
    /// authorization: '21c86474-3905-4048-88a1-12bd6a91973a',
    "Content-Type": "application/json",
  }
);

export default api;