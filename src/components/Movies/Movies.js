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
import * as moviesApi from '../../utils/MoviesApi'


function Movies({
  isMainPage,
  isLoggedIn,
  isLoading,
  setIsLoading,
  isMoviePage,  
  setSearch,
  isSearch,
  openConfirmPopup,  
  //новые
   isSavedMoviePage,
  userMovies,
}) {


  //новое
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [inputShortsMovieValue, setInputShortsMovieValue] = useState('');
  
  const [savedMovies, setSavedMovies] = useState([])
  const [filteredSavedMovies, setFilteredSavedMovies] = useState(savedMovies);
  const path = useLocation()
  const navigate = useNavigate();

  useEffect(() => {
    setSavedMovies(userMovies);
  }, [userMovies, navigate]);


  useEffect(() => {
    setFilteredSavedMovies(savedMovies);
    const historyRequest = JSON.parse(localStorage.getItem('search'));
    if (historyRequest && path.pathname === '/movies') {
      setSearchMovies(historyRequest['search-result']);
      setSearchText(historyRequest['search-text']);
      setInputShortsMovieValue(historyRequest['search-short-input']);
    } else {
      setSearchMovies([]);
      setSearchText('');
      setInputShortsMovieValue(false);
    }
  }, [path])



  function handleGetSavedMovies() {
    MainApi
      .getInitialMovies()
      .then((movies) => setSavedMovies(movies))
      .catch((err) => {
        console.log(err);
      })
  }



  function handleLike(cardInfo, isLiked, savedCard) {
    if (isLiked) {
      handleDelete(savedCard);
    } else {
      MainApi.saveMovie(cardInfo)
      .then((res) => {
           handleGetSavedMovies()
        //    console.log({res})
        })
    }

  }

  function handleDelete(cardInfo) {
    MainApi.deleteMovie(cardInfo._id)
      .then((res) => {      
      })
      .catch((err) => {
        console.log(err);
      })
  }


  function handleSearchMovies(keywords, searchShortsMovies) {
    setIsLoading(true);
    console.log('setIsLoading(true)');
    if (path === '/saved-movies') {
      setFilteredSavedMovies(
        filterMovies(savedMovies, keywords, searchShortsMovies)
      )
      setIsLoading(false);
      console.log('setIsLoading(false)');
    } else {
      if (JSON.parse(localStorage.getItem('movies'))) {
        const movies = JSON.parse(localStorage.getItem('movies'));
        const filteredMovies = filterMovies(movies, keywords, searchShortsMovies);
        handleFilter(filteredMovies, keywords, searchShortsMovies);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        console.log('setIsLoading(true)');
        moviesApi.getMovies()
          .then((res) => {
            localStorage.setItem('movies', JSON.stringify(res));
            const filteredMovies = filterMovies(res, keywords, searchShortsMovies);
            handleFilter(filteredMovies, keywords, searchShortsMovies);
            setIsLoading(false);
            console.log('setIsLoading(false)');
          })
          .catch((err) => {
            console.log(err);
            setSearchMovies([])
            openConfirmPopup("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
          })
          .finally(() => {
            setIsLoading(false);
            console.log('setIsLoading(false)');
          })
      }
    }
  }


  function handleFilter(movies, keywords, checkbox) {
    if (movies.length === 0) {
      setSearchMovies([]);
      openConfirmPopup('Ничего не найдено');
      setSearchText('');
    } else {
      setSearchMovies(filterMovies(movies, keywords, checkbox));
      localStorage.setItem('search', JSON.stringify({
        'search-text': keywords,
        'search-short-input': checkbox,
        'search-result': filterMovies(movies, keywords, checkbox)
      }))
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



  const [addMovies, setAddMovies] = useState(0);
 const [isRenderedMore, setIsRenderedMore] = useState(false);
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
  

//определить количество карточек к показу
    function moviesForRender() {
      if (searchMovies.length > 0) {
        return searchMovies.slice(0, showedMovies);
      } else {
        return [];
      }
    };

 useEffect(() => {
      const moviesToRender = searchMovies.length - showedMovies;
      if (moviesToRender > 0) {
        setIsRenderedMore(true)
      } else {
        setIsRenderedMore(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      searchMovies,
      showedMovies]);


  return (
    <>
      <Header
        isMainPage={isMainPage}
        isLoggedIn={isLoggedIn}>
      </Header>
      <main className="movies">
        <SearchForm
          isSearch={isSearch}
          setSearch={setSearch}
          openConfirmPopup={openConfirmPopup}
          //новые
          onSubmit={handleSearchMovies}
          searchText={searchText}
          inputShortsMovieValue={inputShortsMovieValue}
          setInputShortsMovieValue={setInputShortsMovieValue}
        />
        {isLoading ?
          (<Preloader />)
          :
          //movies.length > 0 ?
          (<><MoviesList
            isMoviePage={isMoviePage}
            isSavedMoviePage={isSavedMoviePage}
           isLoggedIn={isLoggedIn}
            
            // новые
            savedMovies={savedMovies}
            searchMovies={searchMovies}
            onLike={handleLike}
            movies={moviesForRender()}
            
            
          >
          </MoviesList>
          <More
              handleMoreFilms={handleMoreFilms}
              isRenderedMore={isRenderedMore}
            />
          </>)          
        }




      </main>
      <Footer />
    </>
  );
}

export default Movies;