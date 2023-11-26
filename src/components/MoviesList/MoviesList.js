import React from 'react';
import './MoviesList.css';
import Movie from '../Movie/Movie';

function MoviesList({
    isMoviePage,
    handleSaveMovie,
    handleDeleteMovie,
    isSavedMoviePage,

    //новые
    onLike,
    savedMovies,
    searchMovies,
    onDelete,
    movies,
    key,
})
{


    return (
        <section className="movie-list">

            <ul className="movie-list__container">
                {movies.length > 0 && movies.map((cardInfo) => (
                    <li  key={ isMoviePage ? cardInfo.id : cardInfo.movieId }>
                        <Movie
                            isMoviePage={isMoviePage}                          
                            handleSaveMovie={handleSaveMovie}
                            handleDeleteMovie={handleDeleteMovie}
                            isSavedMoviePage={isSavedMoviePage}
                            //новые
                            onLike={onLike}                            
                            savedMovies={savedMovies}
                            cardInfo = {cardInfo}
                            onDelete={onDelete}
                        />
                    </li>
                ))}
            </ul>

          

        </section>
    );
}

export default MoviesList;