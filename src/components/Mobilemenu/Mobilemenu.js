import React from "react";
import './Mobilemenu.css';
import { NavLink } from 'react-router-dom';


function Mobilemenu({ isMobileMenuOpen, handleClose }) {

  return (
    <>
      <div
        className={`mobilemenu ${isMobileMenuOpen ? "mobilemenu_open" : ""
          }`}
      >
        <div className="mobilemenu__container">

          <div className="mobilemenu__links">
            <NavLink
              className={({ isActive }) => `mobilemenu__link ${isActive ? "mobilemenu__link_active" : ""}`}
              //className='mobilemenu__link'
              aria-label="link to main page"
              to="/"
            >
              Главная
            </NavLink>
            <NavLink
              className={({ isActive }) => `mobilemenu__link ${isActive ? "mobilemenu__link_active" : ""}`}
              aria-label="link to main page"
              to="/movies"
            >
              Фильмы
            </NavLink>
            <NavLink
              className={({ isActive }) => `mobilemenu__link ${isActive ? "mobilemenu__link_active" : ""}`}
              aria-label="link to main page"
              to="/saved-movies"
            >
              Сохранённые фильмы
            </NavLink>
            <NavLink
              to="/profile"
              aria-label="link to main page"
              className="mobilemenu__link-account"
            >
              <p className="mobilemenu__button-account"></p>
            </NavLink>
            <button
              className="mobilemenu__close"
              type="button"
              onClick={handleClose}
            ></button>

          </div>
        </div>
      </div>
    </>
  );
}

export default Mobilemenu;