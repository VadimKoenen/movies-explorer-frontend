import './App.css';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';

import { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as auth from "../../utils/auth";
import * as moviesApi from "../../utils/MoviesApi";
import MainApi from "../../utils/MainApi";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";

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
  //const [isFilms, setIsFilms] = useState(false);
  //const [isProfile, setIsProfile] = useState(false);
  const [isMainPage, setIsMainPage] = useState(false);
  const [isMoviePage, setIsMoviePage] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);


  // новые фичи
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });
  const [showPreloader, setShowPreloader] = useState(false);
  const [tokenChecked, setTokenChecked] = useState(false);
  const navigate = useNavigate();
  const [isOpenConfirmationPopup, setIsOpenConfirmationPopup] = useState(false);
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


  // старые useEffect
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


  // новые useEffect
  // проверка авторизован ли пользователь
  useEffect(() => {
    auth
      .checkToken()
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch((err) => {
        // если кука истекла, удалить все данные как при разлогировании
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
      })
      .finally(() => {
        setTokenChecked(true);
      });
  }, []);




  /// фильмы


  //получение сохраненных фильмов из бд
  useEffect(() => {
    if (isLoggedIn) {
      MainApi
        .getInitialMovies()
        .then((films) => {
          const deleteIconMovies = films.map((film) => {
            return {
              ...film, buttonLikeType: "delete", key: film._id
              //доп свойство для присваивания класса type delete
            }
          })
          setSavedMovies(deleteIconMovies); //измененные фильмы с иконкой удаления savedMovies
          localStorage.setItem("savedMovies", JSON.stringify(deleteIconMovies)) //savedMovies
        })
        .catch(console.error)
    }
  }, [isLoggedIn])

  //Определить фильмы для отображения 
  useEffect(() => {
    if (path.pathname === "/movies") {
      localStorage.setItem("movies", JSON.stringify(movies)); //нов не факт что нужно
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
        // isLoggedIn && openPopup("Ничего не найдено"); //здесь это нельзя размещать из-за проблем при регистрации
      }

    } else {  //записать значение сохраненных или отфильтрованных соханенных
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
        // isLoggedIn && openPopup("Ничего не найдено");  //здесь это нельзя размещать из-за проблем при регистрации
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



  //старые функции



  // новые функции

  function handleRegister({ name, email, password }) {
    setIsLoading(true);
    auth
      .register({ name, email, password })
      .then((res) => {
        console.log(res, 'res')
        setIsLoading(false);
        handleLogin({ email, password })
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
      });
  }

  //изменить данные профиля
  function handleChangeProfile({ name, email }) {
    auth
      .updateUser({ name, email })
      .then((res) => {
        setCurrentUser(res)
        // openPopup('Данные успешно изменены');
        // уведомление в профиле
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
      .then(() => {
        //TO DO: проверить лишние
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
        // setMovies((state) => state.map((elem) => elem.id === newMovie.movieId ? { ...elem, buttonLikeType: "liked", key: elem.id } : elem));
        // // setShortFilteredMovies((state) => state.map((elem) => elem.id === newMovie.movieId ? { ...elem, buttonLikeType: "liked", key: elem.id } : elem));
        // setSavedFilteredMovies((state) => state.map((elem) => elem.id === newMovie.movieId ? { ...elem, buttonLikeType: "liked", key: elem.id } : elem));
        // newMovie.buttonLikeType = "delete"
        // setSavedMovies((state) => [...state, newMovie])
        // // setShortFilteredSavedMovies((state) => [...state, newMovie]);
        // //прибавляет новый фильм к массиву имеющихся
        // //обновить в LS этот массив
        // localStorage.setItem("savedMovies", JSON.stringify(savedMovies));

        setMovies((state) => state.map((elem) => {
          return elem.id === newMovie.movieId ? { ...elem, buttonLikeType: "liked", key: elem.id } : elem
        }));
        setSavedFilteredMovies((state) => state.map((elem) => elem.id === newMovie.movieId ? { ...elem, buttonLikeType: "liked", key: elem.id } : elem));
        newMovie.buttonLikeType = "delete"
        setSavedMovies((state) => [...state, newMovie])
        // setShortFilteredSavedMovies((state) => [...state, newMovie]);
        //прибавляет новый фильм к массиву имеющихся
        //обновить в LS этот массив
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies));

      })
      // .then(() => {
      //   localStorage.setItem("movies", JSON.stringify(movies)); //нов не факт что нужно
      // })
      .catch((err) => {
        console.log(err);
      })
  }


  function handleDeleteMovie(id) {
    const deleteMovie = savedMovies.find((savedMovie) => savedMovie.movieId === id)
    MainApi
      .deleteCard(deleteMovie._id)
      .then(() => {
        setMovies((state) => state.map((elem) => elem.id === id ? { ...elem, buttonLikeType: "unliked", key: elem.id } : elem))
        setSavedMovies((state) => state.filter((c) => c._id !== deleteMovie._id))
        setSavedFilteredMovies((state) => {
          console.log(state, 'state')
          return state.map((elem) => {
            console.log(elem, 'elem', id, 'id')
            return elem.movieId === id ?
              { ...elem, buttonLikeType: "unliked", key: elem.id } :
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

  // получение списка фильмов от moviesApi, вызывается только при первом поиске
  function getBasicMovies() {
    return moviesApi
      .getMovies()
      .then((cards) => {
        setBasicMovies(cards)
        localStorage.setItem("basicMovies", JSON.stringify({ cards }))
        return cards
      })
  }

  //установление свойства buttonLikeType каждому фильму из базовых для отображения его статуса
  function setLikeStatus(movies) {
    return movies.map((movie) => {
      const savedMovieLike = savedMovies.find((savedMovie) => savedMovie.movieId === movie.id)
      if (savedMovieLike) {
        return {
          ...movie, buttonLikeType: "liked", key: movie.id
        }
      }
      return { ...movie, buttonLikeType: "unliked", key: movie.id }
    })
  }




  // повторяющаяся функция фильтрации массива по ключевому слову
  function searchFilm(movies, string) {
    // console.log(movies)
    return movies.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(string.toLowerCase())
        || movie.nameEN.toLowerCase().includes(string.toLowerCase())
      )
    })
  }

  //механика поиска для основной функции поиска фильмов
  function searchMovies(movies, string) {
    const setLikeStatusMovies = setLikeStatus(movies);
    const films = searchFilm(setLikeStatusMovies, string);
    if (films.length === 0) {

      setMovies([]);
      localStorage.setItem("movies", JSON.stringify([]));
    } else {
      setMovies(films); // || []
      localStorage.setItem("movies", JSON.stringify(films)); // || []
    }
  }

  function handleSearchMovie(string, e) {
    e.preventDefault();
    // если карточек нет, получить
    if (basicMovies.length === 0) {
      setShowPreloader(true);
      getBasicMovies()
        .then((basicMovies) => {
          // отфильтровать по ключевому слову и записать их в localStorage, стейт movies
          searchMovies(basicMovies, string)
        })
        .catch((err) => {
          console.log(err)

        })
        .finally(() => {
          setShowPreloader(false);
        })
    }
    else {
      // отфильтровать по ключевому слову и записать их в localStorage, стейт movies
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
                      movies={moviesForShow}
                      handleSaveMovie={handleSaveMovie}
                      handleSearchMovie={handleSearchMovie}
                      handleDeleteMovie={handleDeleteMovie}
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
                      isMainPage={isMainPage}
                      isMoviePage={isMoviePage}
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
                      isDisabled={isDisabled}
                      handleChangeProfile={handleChangeProfile}
                      handleDeleteToken={handleDeleteToken}
                      setErrorProfile={setErrorProfile}
                      errorProfile={errorProfile}
                    //signOut={signOut}
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
