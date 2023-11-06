import React, { useState, useEffect } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesList from '../MoviesList/MoviesList';
import { useResize } from "../../hooks/useResize";
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
  setShortFilteredMovies,
 }) {

  const [addMovies, setAddMovies] = useState(0);
  const [isRenderedLearnMore, setIsRenderedLearnMore] = useState(false);

  const [query, setQuery] = useState(
    localStorage.getItem("moviesSearchQuery") || "",
  );

  const { isWideScreen, isMiddleScreen } = useResize();

//сколько показывать фильмов по кнопке "еще"?
function handlerMoreFilms() {
  isWideScreen ?
    setAddMovies(addMovies + 3) :
    isMiddleScreen ?
      setAddMovies(addMovies + 2) :
      setAddMovies(addMovies + 2);
}

function findShowedMovies() {
  //количество карточек на странице при первой отрисовке
  const count = isWideScreen ?
    12 :
    isMiddleScreen ?
      8 :
      5;
  //сколько карточек показано сейчас?
  return count + addMovies;
}

const showedMovies = findShowedMovies();

//определить количество карточек к показу
function moviesForRender() {
  if (movies.length > 0) {
    return movies.slice(0, showedMovies);
  } else {
    // !isRenderedLearnMore && isLoggedIn && openPopup('Ничего не найдено'); // работает но не закрывается подумать как объединить с юзэффектом ниже
    return [];
  }
};

useEffect(() => {
  const moviesToRender = movies.length - showedMovies;
  if (moviesToRender > 0) {
    setIsRenderedLearnMore(true)
  } else {
    setIsRenderedLearnMore(false);
    // openPopup('Ничего не найдено');
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [movies, showedMovies]);

function handleSearch(query, e) {
  e.preventDefault();
  if (query.length === 0) {
    //openPopup("Нужно ввести ключевое слово");
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
              
        />
        {isLoading ? <Preloader />
          : <MoviesList
          isMoviePage={isMoviePage}
          movies={moviesForRender()} 
          isLoggedIn={isLoggedIn}
          handleSaveMovie={handleSaveMovie}
          handleSearchMovie={handleSearchMovie}
          // requestMessage={requestMessage}
          handleDeleteMovie={handleDeleteMovie}
          >
          <More/>
          </MoviesList>
             
             }
      </main>
      <Footer />
    </>
  );
}

export default Movies;