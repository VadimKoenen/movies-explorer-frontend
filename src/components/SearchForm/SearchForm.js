import './SearchForm.css';
import logo from '../../images/search-icon.svg';
import React, { useEffect, useState } from 'react';

function SearchForm(
  {   
    openConfirmPopup,
    //новые
    onSubmit,
    searchText,
    inputShortsMovieValue,   
  }) {
  
  const [movievalue, setmovieValue] = useState(searchText);
  const [searchShortsMovies, setSearchShortsMovies] = useState(false);

  const searchRef = React.useRef();

  useEffect(() => {
    setmovieValue(searchText)
  }, [searchText])


  const handleMovieChange = (evt) => {
    evt.preventDefault();
    setmovieValue(evt.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (searchRef.current.value) {
      onSubmit(movievalue, searchShortsMovies)
      console.log('нажатие на кнопку поиска')
      console.log(movievalue)
      console.log(searchShortsMovies)
    } else {      
      openConfirmPopup('Нужно ввести ключевое слово');
      setmovieValue('');        
    }
  }

  const handleShortsInput = (value) => {
    setSearchShortsMovies(value)
  }


  const [inputShortsMovieValue2, setInputShortsMovieValue2] = useState(inputShortsMovieValue);

  useEffect(() => {
    setInputShortsMovieValue2(inputShortsMovieValue)
  }, [inputShortsMovieValue])


  useEffect(() => {
    handleShortsInput(inputShortsMovieValue2);
  }, [inputShortsMovieValue2])

  const handleShortsMovieChange2 = (evt) => {
    setInputShortsMovieValue2(evt.target.checked);
  }


  return (
    <section className="search-section">
      <form
        className="search"
        onSubmit={handleSubmit}
        noValidate
      >
        <img className="search__logo" alt="лупа" src={logo} />
        <div className="search__form">
          <div className="form_films">
            <input
              placeholder="Фильм"
              type="text"
              className="input"
              required
              // {...register("search")}

              //новые
              ref={searchRef}
              onChange={handleMovieChange}
              value={movievalue}
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
            onChange={handleShortsMovieChange2}
            checked={inputShortsMovieValue2}
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