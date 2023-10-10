import React from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import Header from '../Header/Header'

const currentUser = { name: "Vadim", email: "mail@mail.com" }

function Profile({ isMainPage, isLoggedIn, handleInputChange, isEdit, isSave, isDisabled }) {

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
        >
          <div className="profile__container">
            <label className="profile__label"
              for="profile__profile-name-input">
              Имя
            </label>
            <input
              type="text"
              name="name"
              className="profile__input"
              id="profile__profile-name-input"
              placeholder="Имя"
              required
              minLength="2"
              maxLength="20"
              onChange={handleInputChange}
            />
          </div>

          <div className="profile__container profile__container-email">
            <label className="profile__label">
              E-mail
            </label>
            <input
              type="text"
              name="email"
              className="profile__input"
              placeholder="e-mail"
              required
              minLength="2"
              maxLength="20"
              id="profile__profile-email-input`"
            />
          </div>
          <div className='profile__buttons'>
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
            <span className={isSave ? "profile__error" : "profile__disabled"}
            ></span>
            <button
              type="submit"
              aria-label="save"
              disabled={isDisabled}
              className={isSave ? "profile__save" : "profile__disabled"}
            >
              Сохранить
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Profile;