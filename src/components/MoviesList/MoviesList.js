import React from 'react';
import './MoviesList.css';
import Movie from "../Movie/Movie";
import More from "../More/More";

function MoviesList(isMoviePage) {
    return (
        <section className="movie-list">

            <ul className="movie-list__size-container size-container">
                <Movie
                    isMoviePage={isMoviePage}
                />
                <Movie
                    isMoviePage={isMoviePage}
                />
                <Movie
                    isMoviePage={isMoviePage}
                />
                <Movie
                    isMoviePage={isMoviePage}
                />
                <Movie
                    isMoviePage={isMoviePage}
                />
                <Movie
                    isMoviePage={isMoviePage}
                />
                <Movie
                    isMoviePage={isMoviePage}
                />
                <Movie
                    isMoviePage={isMoviePage}
                />
            </ul>

            <More />

        </section>
    );
}

export default MoviesList;