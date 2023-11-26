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
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup.js';




function App() {
   //навигация
  const navigate = useNavigate();
  const path = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem('loggedIn') || false));
  //страницы
  const [isMainPage, setIsMainPage] = useState(false);
  const [isMoviePage, setIsMoviePage] = useState(false);
  const [isSavedMoviePage, setIsSavedMoviePage] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isSearch, setSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenChecked, setTokenChecked] = useState(false);


  //ошибки
  const [errorProfile, setErrorProfile] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const [errorRegister, setErrorRegister] = useState("");
  const [messagePopup, setMessagePopup] = useState('');
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);

  const [userMovies, setUserMovies] = useState([]);

  // функции
  function handleRegister({ name, email, password }) {
    setIsLoading(true);
    auth
      .register({ name, email, password })
      .then((res) => {
        setIsLoading(false);
        handleLogin({ email, password });
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
        localStorage.setItem('loggedIn', JSON.stringify(true));
        setIsLoggedIn(true);
        console.log(JSON.parse(localStorage.getItem('loggedIn')));
        setCurrentUser(res);
        console.log(res);
      })
      .then(() => {
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem('loggedIn');
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
        openConfirmPopup('Данные успешно изменены')
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
        localStorage.removeItem("isShortMovies");
        localStorage.removeItem("movies");
        localStorage.removeItem("savedMovies");
        localStorage.removeItem("moviesSearchQuery");
        localStorage.removeItem("isShortMovies");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("savedFilteredMovies");
        localStorage.removeItem("basicMovies");
        localStorage.removeItem('loggedIn');
        localStorage.removeItem("moviesSearchQuery");
        //setMovies([])
        localStorage.clear();
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
      });
  };

  //функции фильмов

  // получение списка фильмов от Api
  function getBasicMovies() {
    return moviesApi
      .getMovies()
      .then((cards) => {
       // setSavedMovies(cards)
        return cards
          .catch((err) => {
            console.log(err);
          })
      })

  }

  // функции попапа
  function openConfirmPopup(string) {
    setMessagePopup(string);
    setConfirmPopupOpen(true)
  }

  function closeConfirmPopup() {
    setConfirmPopupOpen(false);
  }

  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      closeConfirmPopup();
    }
  };

  // авторизован ли пользователь
  useEffect(() => {
    console.log(isLoggedIn);
    auth
      .checkToken()
      .then((res) => {
        localStorage.setItem('loggedIn', JSON.stringify(true));
        setIsLoggedIn(true);
        setCurrentUser(res);
        console.log(res);
        console.log("токен проверен");
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
        localStorage.removeItem('loggedIn');
        console.log(err);
        navigate('/')
        console.log("нет токена");
      })
      .finally(() => {
        setTokenChecked(true);
        console.log(isLoggedIn);
      });
  }, []);


  //который потом определяет параметры удаления и иконку кнопки
  useEffect(() => {
    MainApi
      .getInitialMovies()
      .then((movies) => setUserMovies(movies))
      .catch((err) => {
        console.log(err);
      })
  }, [navigate])

  // проверка страниц
  //главная
  useEffect(() => {
    path.pathname === "/" ?
      setIsMainPage(true) :
      setIsMainPage(false);
  }, [path]);

  //фильмы
  useEffect(() => {
    path.pathname === "/movies" ?
      setIsMoviePage(true) :
      setIsMoviePage(false);
  }, [path]);

  //сохраненные фильмы
  useEffect(() => {
    path.pathname === "/saved-movies" ?
      setIsSavedMoviePage(true) :
      setIsSavedMoviePage(false);

  }, [path]);


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
                      setIsLoading={setIsLoading}                     
                      isSearch={isSearch}
                      setSearch={setSearch}
                      openConfirmPopup={openConfirmPopup}
                      userMovies={userMovies}                 
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
                      isSearch={isSearch}
                      setSearch={setSearch}
                      openConfirmPopup={openConfirmPopup}
                      userMovies={userMovies}
                      isSavedMoviePage={isSavedMoviePage}
                      setIsLoading={setIsLoading}
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

        <ConfirmPopup
          isConfirmPopupOpen={isConfirmPopupOpen}
          closeConfirmPopup={closeConfirmPopup}
          messagePopup={messagePopup}
          onOverlayClick={handleOverlayClick}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
