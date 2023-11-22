import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesList from '../MoviesList/MoviesList';

function SavedMovies({
    isMainPage,
    isLoggedIn,
    isLoading,
    isMoviePage,
    handleDeleteMovie,
    handleSearchMovie,
    isShortMovies,
    setIsShortMovies,
    isShortSavedMovies,
    setIsShortSavedMovies,
    movies,
    isSearch,
    setSearch,
    openConfirmPopup,
    isSavedMoviePage
}) {


    //новый стейт по замечаниям
   // const [newFilms, setNewFilms] = useState([])

    //console.log(newFilms)



    const [savedQuery, setSavedQuery] = useState("");

    function handleSearch(query, e) {
        e.preventDefault();
        if (query.length === 0) {
            console.log("Нужно ввести ключевое слово");
            openConfirmPopup("Нужно ввести ключевое слово");
            return;
        }
        handleSearchMovie(query, e);
        setSavedQuery(query);
    }

   // useEffect(() => {
   //     setNewFilms(movies);
  //  }, []);

    return (
        <>
            <Header
                isMainPage={isMainPage}
                isLoggedIn={isLoggedIn}>
            </Header>
            <main className="saved-movies">
                <SearchForm
                    handleSearchMovie={handleSearchMovie}
                    setIsShortMovies={setIsShortMovies}
                    isShortMovies={isShortMovies}
                    onSavedSearch={handleSearch}
                    setSavedQuery={setSavedQuery}
                    isShortSavedMovies={isShortSavedMovies}
                    setIsShortSavedMovies={setIsShortSavedMovies}
                    isSearch={isSearch}
                    setSearch={setSearch}
                    savedQuery={savedQuery}
                />
                {isLoading ? <Preloader />
                    : <MoviesList
                        isMoviePage={isMoviePage}
                        movies={movies}
                        isLoggedIn={isLoggedIn}
                        handleDeleteMovie={handleDeleteMovie}
                        handleSearchMovie={handleSearchMovie}
                        isSavedMoviePage={isSavedMoviePage}
                    />}
            </main>
            <Footer />
        </>
    );
}

export default SavedMovies;