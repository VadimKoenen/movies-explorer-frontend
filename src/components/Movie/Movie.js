import React from 'react';
import { Link, useLocation, useNavigate, } from 'react-router-dom';
import './Movie.css';
import { useState, useEffect } from "react";
import { MOVIES_URL } from "../../utils/constants";

function Movie({
  isMoviePage,
  //новые
  cardInfo,
  onLike,
  savedMovies,
  onDelete,
}) {

  const navigate = useNavigate();
  const path = useLocation;

  const [isLiked, setIsLiked] = useState(false);
  const [savedCard, setSavedCard] = useState('');
  console.log(savedCard);


  const { nameRU, duration, trailerLink, movieId, id } = cardInfo;
  let movieDuration = `${Math.floor(duration / 60)}ч ${duration % 60}м`;


  useEffect(() => {
    savedMovies.forEach((card) => {
      if (card.movieId === cardInfo.id) {
        setSavedCard(card);
        setIsLiked(true);
      }
    })
  }, [savedCard, savedMovies])


  function handleLike() {
    setIsLiked(!isLiked);
    onLike(cardInfo, isLiked, savedCard);
  }

  function handleDelete() {
    onDelete(cardInfo)
  }

  return (
    <div className="movie">
      <Link
        to={trailerLink}
        aria-label="link trailer"
        target="_blank"
      >
        <img
          src={`${isMoviePage ? (MOVIES_URL + cardInfo.image.url) : (cardInfo.image)}`}
          className="movie__image"
          alt={nameRU}
        />
      </Link>
      <div className="movie__info">
        <div className="movie__description">
          <h2 className="movie__header">{nameRU}</h2>
          <p className="movie__subtitle">{movieDuration}</p>
        </div>

        {isMoviePage ? (
          <button className={`movie__icon  ${isLiked ? "movie__icon_type_save_active" : "movie__icon_type_save"}`
          } onClick={handleLike}
          ></button>
        ) :
          (
            <button className="movie__icon movie__icon_type_delete" onClick={handleDelete}></button>
          )
        }


      </div>
    </div>
  );
}

export default Movie;