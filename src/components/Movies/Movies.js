import React, { useState, useEffect } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesList from '../MoviesList/MoviesList';
import { useResize } from '../../hooks/useResize';
import More from '../More/More';


function Movies({
  isMainPage,
  isLoggedIn,
  isLoading,
  isMoviePage,
  movies,
  handleSaveMovie,
  handleSearchMovie,
  isShortMovies,
  setIsShortMovies,
  handleDeleteMovie,
  isShortSavedMovies,
  setIsShortSavedMovies,
  setSearch,
  isSearch,
}) {

  const [addMovies, setAddMovies] = useState(0);
  const [isRenderedMore, setIsRenderedMore] = useState(false);

  const [query, setQuery] = useState(
    localStorage.getItem("moviesSearchQuery") || "",
  );

  const { isWideScreen, isMiddleScreen } = useResize();



  //количество фильмов по мнопке "еще"?
  function handleMoreFilms() {
    isWideScreen ?
      setAddMovies(addMovies + 3) :
      isMiddleScreen ?
        setAddMovies(addMovies + 2) :
        setAddMovies(addMovies + 2);
  }
  //первоначальное количество фильмов при первой отрисовке
  function findShowedMovies() {

    const count = isWideScreen ?
      12 :
      isMiddleScreen ?
        8 :
        5;
   return count + addMovies;
  }

  const showedMovies = findShowedMovies();

  //определить количество карточек к показу
  function moviesForRender() {
    if (movies.length > 0) {
      return movies.slice(0, showedMovies);
    } else {

      return [];
    }
  };

  useEffect(() => {
    const moviesToRender = movies.length - showedMovies;
    if (moviesToRender > 0) {
      setIsRenderedMore(true)
    } else {
      setIsRenderedMore(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies, showedMovies]);

  function handleSearch(query, e) {
    e.preventDefault();

    if (query.length === 0) {
      return;
    }
    handleSearchMovie(query, e)
    setQuery(query);
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
          movies.length > 0 ?
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
            </>
            ) : movies.length === 0 ? (
              <p className="movies__notfound">{!isSearch ? "" : "Ничего не найдено"}</p>
            ) : (
              <p className="movies__notfound">
                Во время запроса произошла ошибка. Возможно, проблема с соединением
                или сервер недоступен. Подождите немного и попробуйте ещё раз
              </p>
            )

        }




      </main>
      <Footer />
    </>
  );
}

export default Movies;