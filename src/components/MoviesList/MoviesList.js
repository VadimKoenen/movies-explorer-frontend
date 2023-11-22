import React from 'react';
import './MoviesList.css';
import Movie from '../Movie/Movie';

function MoviesList({
    isMoviePage,
    movies,
    handleSaveMovie,
    handleDeleteMovie,
    isSavedMoviePage
}) {
    return (
        <section className="movie-list">

            <ul className="movie-list__container">
                {movies.length > 0 && movies.map((movie) => (
                    <li key={movie.id}>
                        <Movie                            
                            isMoviePage={isMoviePage}
                            movie={movie}
                            handleSaveMovie={handleSaveMovie}
                            handleDeleteMovie={handleDeleteMovie}
                            isSavedMoviePage={isSavedMoviePage}
                        />
                    </li>
                ))}
            </ul>



        </section>
    );
}

export default MoviesList;