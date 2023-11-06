import React from 'react';
import { Link } from 'react-router-dom';
import './Movie.css';
import { useState, useEffect } from "react";
import { MOVIES_URL } from "../../utils/constants";

function Movie({
  isMoviePage,
  movie,
  handleSaveMovie,
  handleDeleteMovie
}) {

  const { id, nameRU, duration, trailerLink, movieId } = movie;
  let movieDuration = `${Math.floor(duration / 60)}ч ${duration % 60}м`


  function saveOrDelete(e) {
    e.preventDefault();
    movie.buttonLikeType === "unliked" ? handleSaveMovie(movie) : handleDeleteMovie(isMoviePage ? id : movieId)
    //всегда если класс анлайк, нужно сохранить карточку, во всех остальных случаях удалять
  }
  

  return (
    <li className="movie">
      <Link
        to={trailerLink}
        aria-label="link trailer"
        target="_blank"
      >
        <img
          src={`${isMoviePage ? (MOVIES_URL + movie.image.url) : (movie.image)}`}
          className="movie__image"
          alt={nameRU}
        />
      </Link>
      <div className="movie__info">
        <div className="movie__description">
          <h2 className="movie__header">{nameRU}</h2>
          <p className="movie__subtitle">{movieDuration}</p>
        </div>
        <button
          className={`movie__icon ${isMoviePage ? "movie__icon_type_save" : "movie__icon_type_delete"}`}
          onClick={isMoviePage ? handleSaveMovie : handleDeleteMovie}
        ></button>
      </div>
    </li>
  );
}

export default Movie;