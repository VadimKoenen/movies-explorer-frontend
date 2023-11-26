import { MAIN_BASEURL, MOVIES_URL } from './constants';

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

    let newMovie = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: MOVIES_URL + movie.image.url,
      //image: movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: MOVIES_URL + movie.image.formats.thumbnail.url,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      movieId: String(movie.id),
    };


    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify(newMovie),
    }).then((res) => this._checkResponse(res));
  }

  deleteMovie(_id) {
    return fetch(`${this._baseUrl}/movies/${_id}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._checkResponse(res));
  }

}

const mainApi = new MainApi({
  baseUrl: MAIN_BASEURL,
  headers: {
    'Content-Type': 'application/json',
  }
})

export default mainApi;