import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesList from '../MoviesList/MoviesList';
import MainApi from '../../utils/MainApi';

function SavedMovies({
    isMainPage,
    isLoggedIn,
    isLoading,
    isMoviePage,
    isSearch,
    setSearch,
    openConfirmPopup,
    isSavedMoviePage,
    //новые
    userMovies,
    setIsLoading,
}) {

    const [searchMovies, setSearchMovies] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [inputShortsMovieValue, setInputShortsMovieValue] = useState('');

    const [savedMovies, setSavedMovies] = useState(userMovies)
    const [filteredSavedMovies, setFilteredSavedMovies] = useState(savedMovies);
    const path = useLocation().pathname;
    const navigate = useNavigate();


    useEffect(() => {
        setSavedMovies(userMovies);
    }, [userMovies, navigate]);


    useEffect(() => {
        setFilteredSavedMovies(savedMovies);
    }, [])



    function handleSearchMovies(keywords, searchShortsMovies) {
        setIsLoading(true);
        setFilteredSavedMovies(filterMovies(savedMovies, keywords, searchShortsMovies));
        console.log('поиск сохраненных фильмов');
        setIsLoading(false);
        if (filterMovies(savedMovies, keywords, searchShortsMovies).length === 0) {
            openConfirmPopup('Ничего не найдено');
            console.log('Ничего не найдено')
        }
    }

    function filterMovies(moviesList, keywords, isShortMovies) {
        const filteredArray = moviesList.filter((item) => {
            if (isShortMovies) {
                return item.duration <= 40 &&
                    (item['nameRU'].toLowerCase().includes(keywords.toLowerCase()) ||
                        item['nameEN'].toLowerCase().includes(keywords.toLowerCase()))
            } else {
                return item['nameRU'].toLowerCase().includes(keywords.toLowerCase()) ||
                    item['nameEN'].toLowerCase().includes(keywords.toLowerCase())
            }
        })

        return filteredArray;

    }

    function handleGetSavedMovies() {
        MainApi
            .getInitialMovies()
            .then((movies) => setFilteredSavedMovies(movies))
            .catch((err) => {
                console.log(err);
            })
    }


    function handleDelete(cardInfo) {
        MainApi.deleteMovie(cardInfo._id)
            .then((res) => {
         setFilteredSavedMovies(filteredSavedMovies.filter((filteredSavedMovie) => filteredSavedMovie._id !== cardInfo._id))
            })
            .catch((err) => {
                console.log(err);
            })
    }

    console.log(savedMovies)
    console.log(filteredSavedMovies)

    return (
        <>
            <Header
                isMainPage={isMainPage}
                isLoggedIn={isLoggedIn}>
            </Header>
            <main className="saved-movies">
                <SearchForm
                    // новые
                    isSearch={isSearch}
                    setSearch={setSearch}
                    openConfirmPopup={openConfirmPopup}
                    onSubmit={handleSearchMovies}
                    searchText={searchText}
                    inputShortsMovieValue={inputShortsMovieValue}
                    setInputShortsMovieValue={setInputShortsMovieValue}
                    isLoading={isLoading}
                />
                {isLoading ? <Preloader />
                    : <MoviesList
                        isMoviePage={isMoviePage}
                        isLoggedIn={isLoggedIn}
                        isSavedMoviePage={isSavedMoviePage}
                        isSavedMovies={true}
                        savedMovies={savedMovies}
                        onDelete={handleDelete}
                        movies={filteredSavedMovies}

                    />}
            </main>
            <Footer />
        </>
    );
}

export default SavedMovies;