import './Login.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Login(props) {
  return (
    <div className="login">
      <div className="login__container">
        <Link to="/">
          <img src={logo} 
          alt="логотип" 
          className="login__logo">            
          </img>
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form className="form">
          <p className="form__subtitle">E-mail</p>
          <input
            type="email"
            className="login__input"
            name="email"
            placeholder="e-mail"
            required
            id="email"
          />
          <span className="mesto-name-error form__item-error form__item-error_field_name"></span>
          <p className="form__subtitle">Пароль</p>
          <input
            type="text"
            className="login__input"
            name="password"
            placeholder="пароль"
            id="password"
            required
            minLength={2}
            maxLength={30}
          />
          <span className="mesto-name-error form__item-error form__item-error_field_name"></span>
          <button className="login__save" type="submit">
            Войти
          </button>
        </form>
        <Link to="/signup" className="login__signup">
          Ещё не зарегистрированы?{" "}
          <span className="login__another-signup login__another-signup_active">
            Регистрация
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Login;