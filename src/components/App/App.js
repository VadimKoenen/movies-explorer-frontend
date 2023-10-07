import "./App.css";
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
  // const [isSaveFilm, setIsSaveFilm] = useState(false);
  //const [isProfile, setIsProfile] = useState(false);
  const [isMainPage, setIsMainPage] = useState(false);
  const [isSave, setIsSave] = useState(false);
  

  useEffect(() => {
    path.pathname === "/" ?
      setIsMainPage(true) :
      setIsMainPage(false);
  }, [path]);


  return (
    <div className="App">
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <Main
                isLoggedIn={true}
                isMainPage={isMainPage}
              //isFilms={isFilms}
              //isSaveFilm={isSaveFilm}
              //isProfile={isProfile}
              />
            }
          />
          <Route
          path="/movies"
          element={
            <Movies
            isLoggedIn={true}
            isMainPage={isMainPage}
          
            
            />
          }
          />
           <Route
          path="/saved-movies"
          element={
            <SavedMovies
            isLoggedIn={true}
            isMainPage={isMainPage}
            
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
        isLoggedIn={true}
        isMainPage={isMainPage}
        isSave={true}
         //signOut={signOut}
         />
       }
    />


          <Route 
          path="/error" 
          element={<Page404 />} 
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
