import './SearchForm.css';
import logo from '../../images/search-icon.svg';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AuthForm from '../../utils/AuthForm';

function SearchForm(
  {    
    handleChangeFilm,
    handleSubmitFilms,
    handleSearchMovie,
    setIsShortMovies,
    isShortMovies,
    onSearch,
    setQuery,
    setSavedQuery,
    onSavedSearch,
    isShortSavedMovies,
    setIsShortSavedMovies,
    isSearch,
    setSearch,
    savedQuery
  }) {

  const { register, errors, handleSubmit, watch, setValue } = AuthForm();
  const location = useLocation();

  
  const onSubmit = (data, e) => {
    e.preventDefault();
    if (location.pathname === "/movies") {
      onSearch(data.search, e);
    } else {
      onSavedSearch(data.search, e);
    }
    setSearch(true);
  };

  const savedString = watch("search", "");
  const query = watch("search", localStorage.getItem("moviesSearchQuery") || "");

  


  //короткометражки
  function handleChange(e) {
    if (location.pathname === "/movies") {
      localStorage.setItem("isShortMovies", JSON.stringify(!isShortMovies));
      return setIsShortMovies(!isShortMovies);
    } else {
      localStorage.setItem("isShortSavedMovies", JSON.stringify(!isShortSavedMovies));
      return setIsShortSavedMovies(!isShortSavedMovies);
    }
  }


  useEffect(() => {
    if (location.pathname === "/movies") {
      localStorage.setItem("moviesSearchQuery", query || "");
      setQuery(query);
    } else {
     setSavedQuery(savedString); 
    }
     }, [query, savedString]);



  useEffect(() => {
    if (location.pathname === "/movies") {
      setValue("search", localStorage.getItem("moviesSearchQuery") || ""); 
    } else {
      setValue("search", savedString || ""); 
    }
  }, []);



  return (
    <section className="search-section">
      <form
        className="search"
        onSubmit= {handleSubmit(onSubmit)}
        noValidate
      >
        <img className="search__logo" alt="лупа" src={logo} />
        <div className="search__form">
          <div className="form_films">
            <input
              onChange={handleChangeFilm}
              placeholder="Фильм"
              type="text"
              className="input"
              required
              {...register("search")}
            />
            <button              
              className="form__button"
              type="submit"
            >
            </button>
          </div>
        </div>
        <div className="search__vline"></div>
        <div className="search__container">
          <input
            className="search__button"
            type="checkbox"
            id='shortfilm'
            onChange={(e) => handleChange(e)}
            checked={isShortMovies}
          >
          </input>
          <label htmlFor="shortfilm" className="search__korot">Короткометражки</label>
        </div>
      </form>
      <div className="g-line"></div>
    </section>
  );
}

export default SearchForm;