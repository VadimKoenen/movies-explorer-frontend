import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Movie.css';

function Movie(isMoviePage, trailer) { 

  return (
    <li className="movie">

<Link
        to={trailer}
        aria-label="link trailer"       
      >
        <img
          src="https://www.zastavki.com/pictures/originals/2019_Characters_of_the_movie_Game_of_Thrones_Season_8_135337_.jpg"
          className="movie__image"
          alt="Movie"
        />
      </Link>
    
        <div className="movie__info">
          <div className="movie__description">
            <h2 className="movie__header">33 слова о дизайне</h2>
            <p className="movie__subtitle">1ч 47м</p>
          </div>
            <button
            className={`movie__icon ${isMoviePage ? "movie__icon_type_save" : "movie__icon_type_delete"}`}
             /*card__icon_type_save_active класс добавится на этапе добавления функционала*/
            // alt={saveOrDeleteText}
            // aria-label={saveOrDeleteText}
            ></button>
        </div>
        
        
    </li>
  );
}

export default Movie;