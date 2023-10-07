import React from 'react';
import './Profile.css';
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Header from '../Header/Header'

const currentUser = { name: "Vadim", email: "mail@mail.com" }

function Profile({ isMainPage, isLoggedIn, handleInputChange, isEdit, isSave }) {
  //currentUser.name currentUser.email
  return (
    <>
      <Header
        isMainPage={isMainPage}
        isLoggedIn={isLoggedIn}>
      </Header>
      <section className="profile">

        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form
          className="profile__form"
          name="profile"
        // onSubmit={onSubmit}
        >
          <div className="profile__container">
            <label className="profile__label">
              Имя
            </label>
            <input
              type="text"
              name="name"
              className="profile__input"
              placeholder="Имя" //currentUser.name
              required
              minLength="2"
              maxLength="20"
              id="profile__profile-name-input"
              onChange={handleInputChange}
              readOnly={!isEdit}
            // onChange={(e) => handleChangeName(e)}
            // value={name || ""} //currentUser.name
            />
          </div>
          <div className="profile__container">
            <label className="profile__label profile__label_type_grid3">
              E-mail
            </label>
            <input
              type="text"
              name="email"
              className="profile__input"
              placeholder="mail@mail.com" //currentUser.name
              required
              minLength="2"
              maxLength="20"
              id="profile__profile-email-input`"
            // onChange={(e) => handleChangeName(e)}
            // value={name || ""} //currentUser.name
            />
          </div>
          <button
            className={isSave ? "profile__disabled" : "profile__change-data"}
            type="submit"
            aria-label="change data"
          >
            Редактировать
          </button>
          <Link
            to='/logout'
            aria-label="logout"
            className={isSave ? "profile__disabled" : "profile__logout"}
          >
            Выйти из аккаунта
          </Link>
          <span className="name-input-error profile__item-error profile__item-error_field_name"></span>

          <button
            type="submit"
            aria-label="save"
            className={isSave ? "profile__save" : "profile__disabled"}
          >
            Сохранить
          </button>
        </form>
      </section>
    </>
  );
}

export default Profile;