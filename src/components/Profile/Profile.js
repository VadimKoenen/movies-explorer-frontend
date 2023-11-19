import React, { useState } from 'react';
import { useEffect } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import useValidation from '../../hooks/useValidation';


function Profile({
  isMainPage,
  isLoggedIn,
  handleSave,
  handleChangeProfile,
  handleDeleteToken,
  errorProfile,
}) {

  const currentUser = React.useContext(CurrentUserContext);
  
  const {
    values,
    errors,
    handleChange,
    isValid,
    resetForm,
    setValues
  } = useValidation();

  const [isSave, setIsSave] = useState(false)

  

  function handleSave() {
    setIsSave(true);
  }


  useEffect(() => {
    setValues({name: currentUser.name, 
      email: currentUser.email})
    }, [isSave]);



  const handleSubmit = (e) => {
    e.preventDefault();
    handleChangeProfile(values);
    setIsSave(false);
  };

  console.log(values);

  return (
    <>
      <Header
        isMainPage={isMainPage}
        isLoggedIn={isLoggedIn}>
      </Header>
      <section className="profile">
        <div className="profile__content">
          <h1 className="profile__title">Привет, {currentUser.name}!</h1>
          <form
            className="profile__form"
            name="profile"
            onSubmit={handleSubmit}
          >
            <div className="profile__container">
              <label className="profile__label"
                htmlFor="profile__profile-name-input">
                Имя
              </label>
              <input
                type="text"
                name="name"
                className="profile__input"
                id="profile__profile-name-input"
                placeholder="Введите имя"
                required
                minLength="2"
                maxLength="20"
                onChange={handleChange}
                pattern="[a-zA-Zа-яА-ЯёЁ\s\-]+"
                value={isSave ? values.name : currentUser.name}
                readOnly={!isSave}
              />

            </div>
            <span className="profile__input-error">
              {errors.name}
            </span>
            <div className="profile__container profile__container-email">
              <label className="profile__label">
                E-mail
              </label>
              <input
                type="text"
                name="email"
                className="profile__input"
                placeholder="Введите e-mail"
                required
                minLength="2"
                maxLength="20"
                id="profile__profile-email-input`"
                onChange={handleChange}
                pattern="^[a-zA-Z0-9\-.]{1,}@[a-zA-Z0-9\-.]{1,}\.[a-zA-Z]{2,5}$"
                value={isSave ? values.email : currentUser.email}
                readOnly={!isSave}
              />

            </div>
            <span className="profile__input-error profile__input-error_type_bottom">
              {errors.email || errorProfile}
            </span>
            <div className='profile__buttons'>
              <button
                className={isSave ? "profile__disabled" : "profile__change-data"}
                type="button"
                aria-label="change data"
                onClick={handleSave}
              >
                Редактировать
              </button>
              <Link
                to='/logout'
                aria-label="logout"
                className={isSave ? "profile__disabled" : "profile__logout"}
                onClick={handleDeleteToken}
              >
                Выйти из аккаунта
              </Link>
              <span className={isSave ? "profile__error" : "profile__disabled"}
              ></span>
              <button
                type="submit"
                aria-label="save"
                disabled={!isValid || currentUser.name === values.name || currentUser.email === values.email}
                className={isSave ? "profile__save" : "profile__disabled"}
              >
                Сохранить
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Profile;