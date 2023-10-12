import './Header.css';
import logo from '../../images/logo.svg';
import { useLocation, Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Mobilemenu from '../Mobilemenu/Mobilemenu';

function Header({ props, isMainPage, userEmail, deleteToken, isLoggedIn, isPopup, handleClose, isOpen }) {

  const location = useLocation();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handMobileMenuOpen() {
    setMobileMenuOpen(true)
  }

  function handleClose() {
    setMobileMenuOpen(false);
  }

  return (
    <header className={isMainPage ? "header header_main" : "header"}>
      <div className="header__container">
        <Link to="/">
          <img src={logo} 
          alt="логотип" 
          className="header__logo">            
          </img>
        </Link>


        {isLoggedIn ? (
          <>
            <div className="header__info">
              <NavLink
                className={({ isActive }) => `header__button header__button-movies ${isActive ? "header__button-active" : ""}`}
                to="/movies"
              >
                {'Фильмы'}
              </NavLink>
              <NavLink
                className={({ isActive }) => `header__button header__button-savedmovies  ${isActive ? "header__button-active" : ""}`}
                to="/saved-movies"
              >
                {'Сохраненные фильмы'}
              </NavLink>
              <Link
                className="header__link-account"
                to="/profile"
              >
                <div className="header__button-account"></div>
              </Link>
              <button
                type="button"
                className='header__burger'
                onClick={handMobileMenuOpen}
              >
              </button>
              <Mobilemenu
                handleClose={handleClose}
                isMobileMenuOpen={isMobileMenuOpen}
              />
            </div>
          </>
        ) : (
          <>
            <div className="header__info header__info-unloggin">
              <NavLink
                className="header__button header__button-unloggin"
                to="/signup"
                activeClassName="header__button-active"
              >
                {'Регистрация'}
              </NavLink>
              <NavLink
                className="header__button header__button-signin header__button-unloggin "
                to="/signin"
                activeClassName="header__button-active"
              >
                {'Войти'}
              </NavLink>


            </div>
          </>
        )}
      </div>

    </header>
  )
}

export default Header;