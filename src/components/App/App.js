import './App.css';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as auth from '../../utils/auth';
import * as moviesApi from '../../utils/MoviesApi';
import MainApi from '../../utils/MainApi';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main.js';
import Page404 from '../Page404/Page404.js';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const path = useLocation();
  const [isMainPage, setIsMainPage] = useState(false);
  const [isMoviePage, setIsMoviePage] = useState(false);
  const [isSearch, setSearch] = useState(false);
  // функционал
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });

  const [tokenChecked, setTokenChecked] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [errorProfile, setErrorProfile] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const [errorRegister, setErrorRegister] = useState("");

  const [moviesForShow, setMoviesForShow] = useState([]);
  const [savedMovies, setSavedMovies] = useState(JSON.parse(localStorage.getItem("savedMovies")) || []);
  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem("movies")) || []);
  const [isShortMovies, setIsShortMovies] = useState(JSON.parse(localStorage.getItem("isShortMovies")) || false);
  const [savedFilteredMovies, setSavedFilteredMovies] = useState([]);
  const [isShortSavedMovies, setIsShortSavedMovies] = useState(JSON.parse(localStorage.getItem("isShortSavedMovies")) || false);
  const [basicMovies, setBasicMovies] = useState([]);


  //useEffect
  // проверка страниц
  useEffect(() => {
    path.pathname === "/" ?
      setIsMainPage(true) :
      setIsMainPage(false);
  }, [path]);

  useEffect(() => {
    path.pathname === "/movies" ?
      setIsMoviePage(true) :
      setIsMoviePage(false);
  }, [path]);


  // авторизован ли пользователь
  useEffect(() => {
    auth
      .checkToken()
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch((err) => {
        setIsLoggedIn(false);
        setCurrentUser({
          name: "",
          email: "",
        });
        localStorage.removeItem("isShortMovies");
        localStorage.removeItem("movies");
        localStorage.removeItem("savedMovies");
        localStorage.removeItem("moviesSearchQuery");
        localStorage.removeItem("isShortMovies");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("savedFilteredMovies");
        localStorage.removeItem("basicMovies");
        console.log(err);
        navigate('/')
      })
      .finally(() => {
        setTokenChecked(true);
      });
  }, []);


  //получение сохраненных фильмов
  useEffect(() => {
    if (isLoggedIn) {
      MainApi
        .getInitialMovies()
        .then((movies) => {
          const deleteIconMovies = movies.map((movie) => {
            return {
              ...movie, type: "delete", key: movie._id
            }
          })
          setSavedMovies(deleteIconMovies);
          localStorage.setItem("savedMovies", JSON.stringify(deleteIconMovies))
        })
        .catch(console.error)
    }
  }, [isLoggedIn])

  //Список фильмов для отражения
  useEffect(() => {
    if (path.pathname === "/movies") {
      localStorage.setItem("movies", JSON.stringify(movies));
      if (movies.length > 0) {
        setMoviesForShow(isShortMovies ? (
          movies.filter((movie) => {
            return (
              movie.duration <= 40
            )
          })
        ) : movies)
      } else if (movies.length === 0) {
        setMoviesForShow([]);       
      }

    } else {
      const films = savedFilteredMovies.length > 0 ? savedFilteredMovies : savedMovies
      if (films.length > 0) {
        setMoviesForShow(isShortSavedMovies ? (
          films.filter((film) => {
            return (
              film.duration <= 40
            )
          })
        ) : films)

      } else if (films.length === 0) {
        setMoviesForShow([]);
      }
    }
  }, [
    path,
    savedFilteredMovies,
    savedMovies,
    movies,
    isShortMovies,
    isShortSavedMovies,
    isLoggedIn
  ]);


  // новые функции

  function handleRegister({ name, email, password }) {
    setIsLoading(true);
    auth
      .register({ name, email, password })
      .then((res) => {
        setIsLoading(false);
        handleLogin({ email, password });
        setSearch(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 409) {
          setErrorRegister("Пользователь с таким email уже существует");
        } else {
          setErrorRegister("При регистрации пользователя произошла ошибка");
        };
        setIsLoading(false);
      })
      .finally(() => {
      });
  };

  //авторизация 
  function handleLogin({ email, password }) {
    setIsLoading(true);
    auth
      .login({ email, password })
      .then((res) => {
        setIsLoading(false);
        setIsLoggedIn(true);
        setCurrentUser(res);
      })
      .then(() => {
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        if (err.status === 401) {
          setErrorLogin("Вы ввели неправильный логин или пароль");
        } else if (err.status === 429) {
          setErrorLogin("Превышен лимит запросов");
        } else {
          setErrorLogin(
            "При авторизации произошла ошибка. Переданный токен некорректен."
          );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //изменить данные пользователя в профайл
  function handleChangeProfile({ name, email }) {
    auth
      .updateUser({ name, email })
      .then((res) => {
        setIsLoading(true);
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 409) {
          setErrorProfile("Пользователь с таким email уже существует");
        } else {
          setErrorProfile("При обновлении профиля произошла ошибка");
        }
      })
      .finally(() => {
        setIsLoading(false)
      });
  }

  //выйти
  function handleDeleteToken() {
    auth.logout()
      .then(() => setCurrentUser({
        name: "",
        email: "",
      }))
      .then(() => setIsLoggedIn(false))
      .then(() => setSearch(false))
      .then(() => {
        localStorage.clear();
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
      });
  };



  // функции фильмов
  function handleSaveMovie(movie) {
    MainApi
      .saveMovie(movie)
      .then((newMovie) => {
        setMovies((state) => state.map((elem) => {
          return elem.id === newMovie.movieId ? { ...elem, type: "liked", key: elem.id } : elem
        }));
        setSavedFilteredMovies((state) => state.map((elem) => elem.id === newMovie.movieId ? { ...elem, type: "liked", key: elem.id } : elem));
        newMovie.type = "delete"
        setSavedMovies((state) => [...state, newMovie])
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //удаление фильма
  function handleDeleteMovie(id) {
    const deleteMovie = savedMovies.find((savedMovie) => savedMovie.movieId === id)
    MainApi
      .deleteMovie(deleteMovie._id)
      .then(() => {
        setMovies((state) => state.map((elem) => elem.id === id ? { ...elem, type: "unliked", key: elem.id } : elem))
        setSavedMovies((state) => state.filter((c) => c._id !== deleteMovie._id))
        setSavedFilteredMovies((state) => {
          console.log(state, 'state')
          return state.map((elem) => {
            console.log(elem, 'elem', id, 'id')
            return elem.movieId === id ?
              { ...elem, type: "unliked", key: elem.id } :
              elem
          }
          )
        })
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // получение списка фильмов от Api
  function getBasicMovies() {
    return moviesApi
      .getMovies()
      .then((cards) => {
        setBasicMovies(cards)
        localStorage.setItem("basicMovies", JSON.stringify({ cards }))
        return cards
      })
  }

  //установка лайка каждому фильму от Api
  function setLikeStatus(movies) {
    return movies.map((movie) => {
      const savedMovieLike = savedMovies.find((savedMovie) => savedMovie.movieId === movie.id)
      if (savedMovieLike) {
        return {
          ...movie, type: "liked", key: movie.id
        }
      }
      return { ...movie, type: "unliked", key: movie.id }
    })
  }


  // поиск
  function searchFilm(movies, string) {
    return movies.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(string.toLowerCase())
        || movie.nameEN.toLowerCase().includes(string.toLowerCase())
      )
    })
  }

  // поиск на странице с сохраненными фильмами
  function handleSearchSavedMovie(string, e) {
    e.preventDefault();
    const films = searchFilm(savedMovies, string);
    if (films.length === 0) {
      setSavedFilteredMovies([]);
    } else {
      setSavedFilteredMovies(films);
    }

  }

  function searchMovies(movies, string) {
    const setLikeStatusMovies = setLikeStatus(movies);
    const films = searchFilm(setLikeStatusMovies, string);
    if (films.length === 0) {

      setMovies([]);
      localStorage.setItem("movies", JSON.stringify([]));
    } else {
      setMovies(films);
      localStorage.setItem("movies", JSON.stringify(films));
    }
  }

  function handleSearchMovie(string, e) {
    e.preventDefault();
    if (basicMovies.length === 0) {
      setIsLoading(true);
      getBasicMovies()
        .then((basicMovies) => {
          searchMovies(basicMovies, string)
        })
        .catch((err) => {
          console.log(err)

        })
        .finally(() => {
          setIsLoading(false);
          setSearch(true);
        })
    }
    else {
      searchMovies(basicMovies, string)
    }
  };


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Main
                isLoggedIn={isLoggedIn}
                isMainPage={isMainPage}
              />
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={() => (
                  <>
                    <Movies
                      isLoggedIn={isLoggedIn}
                      isMainPage={isMainPage}
                      isMoviePage={isMoviePage}
                      isLoading={isLoading}
                      movies={moviesForShow}
                      handleSaveMovie={handleSaveMovie}
                      handleSearchMovie={handleSearchMovie}
                      handleDeleteMovie={handleDeleteMovie}
                      isShortMovies={isShortMovies}
                      setIsShortMovies={setIsShortMovies}
                      isShortSavedMovies={isShortSavedMovies}
                      setIsShortSavedMovies={setIsShortSavedMovies}
                      isSearch={isSearch}
                      setSearch={setSearch}
                    />
                  </>
                )}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={() => (
                  <>
                    <SavedMovies
                      isLoggedIn={isLoggedIn}
                      isLoading={isLoading}
                      isMainPage={isMainPage}
                      isMoviePage={isMoviePage}
                      handleSearchMovie={handleSearchSavedMovie}
                      handleDeleteMovie={handleDeleteMovie}
                      isShortMovies={isShortSavedMovies}
                      setIsShortMovies={setIsShortSavedMovies}
                      isShortSavedMovies={isShortSavedMovies}
                      setIsShortSavedMovies={setIsShortSavedMovies}
                      movies={moviesForShow}
                      isSearch={isSearch}
                      setSearch={setSearch}
                    />
                  </>
                )}
              />
            }
          />
          <Route
            path="/signin"
            element={
              isLoggedIn ? <Navigate to="/" /> : (
                <Login
                  handleLogin={handleLogin}
                  setIsLoggedIn={setIsLoggedIn}
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                  setErrorLogin={setErrorRegister}
                  errorLogin={errorLogin}
                />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isLoggedIn ? <Navigate to="/" /> : (
                <Register
                  handleRegister={handleRegister}
                  isLoading={isLoading}
                  setIsLoggedIn={setIsLoggedIn}
                  isLoggedIn={isLoggedIn}
                  setErrorRegister={setErrorRegister}
                  errorRegister={errorRegister}
                />
              )
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={() => (
                  <>
                    <Profile
                      isLoggedIn={isLoggedIn}
                      isMainPage={isMainPage}
                      handleChangeProfile={handleChangeProfile}
                      handleDeleteToken={handleDeleteToken}
                      setErrorProfile={setErrorProfile}
                      errorProfile={errorProfile}
                    />
                  </>
                )}
              />

            }
          />
          <Route
            path="*"
            element={<Page404 />}
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
