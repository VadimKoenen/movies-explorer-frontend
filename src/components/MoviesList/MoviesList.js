import React from 'react';
import './MoviesList.css';
import Movie from '../Movie/Movie';

function MoviesList({
    isMoviePage,
    movies,
    isLoggedIn,
    handleSaveMovie,
    requestMessage,
    handleDeleteMovie,
}) {
    return (
        <section className="movie-list">

            <ul className="movie-list__container">
                {movies.length > 0 && movies.map((movie, index) => (
                    <li key={index}>
                        <Movie
                            key={index}
                            isMoviePage={isMoviePage}
                            movie={movie}
                            handleSaveMovie={handleSaveMovie} //попадает из movies
                            handleDeleteMovie={handleDeleteMovie}
                        />
                    </li>
                ))}
            </ul>



        </section>
    );
}

export default MoviesList;