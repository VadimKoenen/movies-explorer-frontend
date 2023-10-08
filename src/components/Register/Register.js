import './Register.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Register(props) {
  return (
    <div className="register">
      <div className="register__container">
        <Link to="/">
          <img src={logo} alt="логотип" className="register__logo"></img>
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <form className="form">
          <p className="form__subtitle">Имя</p>
          <input
            type="text"
            className="register__input"
            name="name"
            required
            id="name"
          />
          <span className="mesto-name-error form__item-error form__item-error_field_name"></span>
          <p className="form__subtitle">E-mail</p>
          <input
            type="email"
            className="register__input"
            name="email"
            required
            id="email"
          />
          <span className="mesto-name-error form__item-error form__item-error_field_name"></span>
          <p className="form__subtitle">Пароль</p>
          <input
            type="text"
            className="register__input"
            name="password"
            id="password"
            required
            minLength={2}
            maxLength={30}
          />
          <span className="mesto-name-error form__item-error form__item-error_field_name"></span>
          <button className="register__save" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <Link to="/signin" className="register__signup">
          Уже зарегистрированы?{" "}
          <span className="register__another-signup register__another-signup_active">
            Войти
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Register;