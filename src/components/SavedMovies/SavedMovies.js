import React, { useState, useEffect } from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesList from '../MoviesList/MoviesList';


function SavedMovies({ isMainPage, isLoggedIn, isLoading, movies }) {


    return (
        <>
            <Header
                isMainPage={isMainPage}
                isLoggedIn={isLoggedIn}>
            </Header>
            <main className="saved-movies">
                <SearchForm />
                {isLoading ? <Preloader />
                    : <MoviesList
                        isMoviePage={true}
                        movies={movies}
                    />}
            </main>
            <Footer />
        </>
    );
}

export default SavedMovies;