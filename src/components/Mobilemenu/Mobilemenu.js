import React from "react";
import './Mobilemenu.css';
//import usePopupClose from "../hooks/usePopupClose";
import { NavLink } from "react-router-dom";


function Mobilemenu({ isMobileMenuOpen, handleClose }) {

  // function 

  //usePopupClose({ isOpen, handleOpenClosePopup }); // , targetLink: "popup__link"
  
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
                className='mobilemenu__link'
                aria-label="link to main page"
                to="/movies"
                              >
                Фильмы
              </NavLink>
              <NavLink
                className='mobilemenu__link'
                aria-label="link to main page"
                to="/saved-movies"
                             >
                Сохранённые фильмы
              </NavLink>
              <button className="mobilemenu__button-account"></button>
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