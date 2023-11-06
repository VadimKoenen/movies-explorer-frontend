import { MAIN_BASEURL } from './constants';

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => this._checkResponse(res));
  }


  saveMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify(movie),
    }).then((res) => this._checkResponse(res));
  }

  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._checkResponse(res));
  }

}

const mainApi = new MainApi ({
  baseUrl: MAIN_BASEURL,
  headers: {
    'Content-Type': 'application/json',
  }
})

export default mainApi;