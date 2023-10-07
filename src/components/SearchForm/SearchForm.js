import "./SearchForm.css";
import logo from "../../images/search-icon.svg";

function SearchForm(props) {
  function handleChangeFilm(e) {
    props.setNameFilm(e.target.value);
  }
  return (
    <section className="search-section">
    <form className="search">
      <img className="search__logo" alt="лупа" src={logo} />
      <div className="search__form">
        <form className="form form_films">
          <input
            value={props.nameFilm}
            onChange={handleChangeFilm}
            placeholder="Фильм"
            type="text"
            className="input"
            required
          />
          <button
            onClick={props.handleSubmitFilms}
            className="form__button"
            type="submit"
          >          
          </button>
        </form>
      </div>
      <div className="search__vline"></div>
      <div className="search__container">
        <input
          className="search__button"
          type="checkbox"
          id='shortfilm'
          onClick={props.handleKorot}
        >
        </input>
        <label for="shortfilm" className="search__korot">Короткометражки</label>
      </div>
      </form>
    <div className="search__gline"></div>
    </section>
  );
}

export default SearchForm;