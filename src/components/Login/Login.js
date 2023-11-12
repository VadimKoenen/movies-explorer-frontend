import './Login.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import useValidation from '../../hooks/useValidation';

function Login({
  handleLogin,
  isLoading,
  errorLogin,
}) {

  const {
    values,
    errors,
    handleChange,
    isValid,
    resetForm
  } = useValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values);
    resetForm();

  };

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
        <form className="form"
          onSubmit={handleSubmit}
          disabled={!isValid}
        >
          <p className="form__subtitle">E-mail</p>
          <input
            type="email"
            className="login__input"
            name="email"
            placeholder="Введите e-mail"
            required
            id="email"
            value={values.email || ''}
            onChange={handleChange}
            disabled={isLoading}
          />
          <span
            className="login__error"
          >
            {errors.email}
          </span>
          <p className="form__subtitle">Пароль</p>
          <input
           type="password"
            className="login__input"
            name="password"
            placeholder="Введите пароль"
            id="password"
            required
            minLength={2}
            maxLength={30}
            value={values.password || ''}
            onChange={handleChange}
            disabled={isLoading}
          />
          <span
            className="login__error"
          >
            {errors.password || errorLogin}
          </span>
          <button className="login__save"
            type="submit"
            disabled={!isValid}>
            {isLoading ? 'Вход...' : 'Войти'}
          </button>
        </form>
        <Link
          to="/signup"
          className="login__signup"
        >
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