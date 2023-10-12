import './App.css';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Main from '../Main/Main.js';
import Page404 from '../Page404/Page404.js';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import { useState, useEffect } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const path = useLocation();
  //const [isFilms, setIsFilms] = useState(false);
  //const [isProfile, setIsProfile] = useState(false);
  const [isMainPage, setIsMainPage] = useState(false);
  const [isMoviePage, setIsMoviePage] = useState(false);
  const [isDisabled, setIsDisabled] = useState (false);
  const [isSave, setIsSave] = useState(false)



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


  function handleSave() {
    setIsSave(true);
      }


  return (
    <div className="App">      
        <Routes>
          <Route
            path="/"
            element={
              <Main
                isLoggedIn={true}
                isMainPage={isMainPage}
              />
            }
          />
          <Route
            path="/movies"
            element={
              <Movies
                isLoggedIn={true}
                isMainPage={isMainPage}
                isMoviePage={isMoviePage}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <SavedMovies
                isLoggedIn={true}
                isMainPage={isMainPage}
                isMoviePage={isMoviePage}
              />
            }
          />
          <Route
            path="/signin"
            element={<Login />}
          />
          <Route
            path="/signup"
            element={<Register />}
          />
          <Route
            path="/profile"
            element={
              <Profile
                setIsSave={setIsSave}
                isLoggedIn={true}
                isMainPage={isMainPage}
                handleSave={handleSave}
                isDisabled={isDisabled}
                isSave={isSave}
              //signOut={signOut}
              />
            }
          />
          <Route
            path="*"
            element={<Page404 />}
          />
        </Routes>
      </div>   
  );
}

export default App;
