import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesList from '../MoviesList/MoviesList';
import { useResize } from '../../hooks/useResize';
import More from '../More/More';
import MainApi from '../../utils/MainApi';


function Movies({
  isMainPage,
  isLoggedIn,
  isLoading,
  isMoviePage,
  movies,
  handleSearchMovie,
  isShortMovies,
  setIsShortMovies,
  handleDeleteMovie,
  isShortSavedMovies,
  setIsShortSavedMovies,
  setSearch,
  isSearch,
  openConfirmPopup,
  setSavedFilteredMovies,
  setSavedMovies
}) {

  const [addMovies, setAddMovies] = useState(0);
  const [isRenderedMore, setIsRenderedMore] = useState(false);
  const path = useLocation();
  const navigate = useNavigate();
  //новый стейт по замечаниям
  const [newFilms, setNewFilms] = useState([])

  console.log(newFilms)


  const [query, setQuery] = useState(
    localStorage.getItem("moviesSearchQuery") || "",
  );
  console.log(query)

  useEffect(() => {
    setNewFilms(movies);
  }, [movies, navigate]);


  const { isWideScreen, isMiddleScreen, isSubMiddleScreen } = useResize();

  //количество фильмов по мнопке "еще"?
  function handleMoreFilms() {
    isWideScreen ?
      setAddMovies(addMovies + 4) :
      isSubMiddleScreen ?
        setAddMovies(addMovies + 3) :
        isMiddleScreen ?
          setAddMovies(addMovies + 2) :
          setAddMovies(addMovies + 2);
  }
  //первоначальное количество фильмов при первой отрисовке
  function findShowedMovies() {
    const count = isWideScreen ?
      16 :
      isSubMiddleScreen ?
        12 :
        isMiddleScreen ?
          8 :
          5
    return count + addMovies;
  }

  const showedMovies = findShowedMovies();

  // функции фильмов
  function handleSaveMovie(movie) {
    MainApi
      .saveMovie(movie)
      .then((newMovie) => {
        setNewFilms((state) =>
          state.map((elem) => {
            return elem.id === newMovie.movieId
              ? { ...elem, type: "liked", key: elem.id }
              : elem
          }));    
           
      })
      .catch((err) => {
        console.log(err);
      })
  }


  //определить количество карточек к показу
  function moviesForRender() {
    if (newFilms.length > 0) {
      return newFilms.slice(0, showedMovies);
    } else {
      return [];
    }
  };


  useEffect(() => {
    const moviesToRender = newFilms.length - showedMovies;
    if (moviesToRender > 0) {
      setIsRenderedMore(true)
    } else {
      setIsRenderedMore(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    newFilms,
    showedMovies]);

  function handleSearch(query, e) {
    e.preventDefault();
    if (query.length === 0) {
      openConfirmPopup("Нужно ввести ключевое слово");
      return;
    }
    handleSearchMovie(query, e);
    setQuery(query);
    console.log(query)
    localStorage.setItem("moviesSearchQuery", query);
  }


  return (
    <>
      <Header
        isMainPage={isMainPage}
        isLoggedIn={isLoggedIn}>
      </Header>
      <main className="movies">
        <SearchForm
          handleSearchMovie={handleSearchMovie}
          setIsShortMovies={setIsShortMovies}
          isShortMovies={isShortMovies}
          onSearch={handleSearch}
          setQuery={setQuery}
          isShortSavedMovies={isShortSavedMovies}
          setIsShortSavedMovies={setIsShortSavedMovies}
          isSearch={isSearch}
          setSearch={setSearch}
        />
        {isLoading ?
          (<Preloader />)
          :
          //movies.length > 0 ?
          (<><MoviesList
            isMoviePage={isMoviePage}
            movies={moviesForRender()}
            isLoggedIn={isLoggedIn}
            handleSaveMovie={handleSaveMovie}
            handleSearchMovie={handleSearchMovie}
            handleDeleteMovie={handleDeleteMovie}
          >
          </MoviesList>
            <More
              handleMoreFilms={handleMoreFilms}
              isRenderedMore={isRenderedMore}
            />
          </>)
          // ) : movies.length === 0 ? (
          //   <p className="movies__notfound">{!isSearch ? "" : "Ничего не найдено"}</p>
          // ) : (
          //   <p className="movies__notfound">
          //     Во время запроса произошла ошибка. Возможно, проблема с соединением
          //     или сервер недоступен. Подождите немного и попробуйте ещё раз
          //   </p>
          //  )

        }




      </main>
      <Footer />
    </>
  );
}

export default Movies;