import './Register.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import useValidation from '../../hooks/useValidation';

function Register({
  handleRegister,
  isLoading,
  errorRegister,
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
    handleRegister(values)
    resetForm();
  };


  return (
    <div className="register">
      <div className="register__container">
        <Link to="/">
          <img src={logo} alt="логотип" className="register__logo"></img>
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <form
          className="form"
          onSubmit={(e) => handleSubmit(e)}
          disabled={!isValid}
        >
          <p className="form__subtitle">Имя</p>
          <input
            type="text"
            className="register__input"
            name="name"
            required
            id="name"
            placeholder="Введите имя"
            minLength="2"
            maxLength="20"
            value={values.name || ''}
            onChange={handleChange}
          />
          <span className="register__error">
            {errors.name}
          </span>
          <p className="form__subtitle">E-mail</p>
          <input
            type="email"
            className="register__input"
            name="email"
            placeholder="Введите e-mail"
            required
            id="email"
            value={values.email || ''}
            onChange={handleChange}
            minLength="2"
            maxLength="20"
            pattern="^[a-zA-Z0-9\-.]{1,}@[a-zA-Z0-9\-.]{1,}\.[a-zA-Z]{2,5}$"
          />
          <span className="register__error">
            {errors.email}
          </span>
          <p className="form__subtitle">Пароль</p>
          <input
            type="password"
            className="register__input"
            name="password"
            id="password"
            placeholder="Введите пароль"
            required
            minLength={2}
            maxLength={20}
            value={values.password || ''}
            onChange={handleChange}
          />
          <span className="register__error">
            {errors.password || errorRegister}
          </span>
          <button
            className="register__save"
            type="submit"
            disabled={!isValid}
          >
            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
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