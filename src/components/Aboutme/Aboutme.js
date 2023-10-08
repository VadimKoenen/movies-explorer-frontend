import './Aboutme.css';
import img from '../../images/imageprofile.png';
import arrow from '../../images/arrow.svg';

function AboutMe() {
  return (
    <div className="about-me" id="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div>
          <h3 className="about-me__name">Vadim Koenen</h3>
          <h4 className="about-me__subtitle">Студент ЯндексПрактикум</h4>
          <p className="about-me__paragraph">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a className="about-me__git"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/VadimKoenen"
          >GitHub</a>
        </div>
        <img src={img} alt="Фото Vadim Koenen" className="about-me__img" />
      </div>
      <h5 className="about-me__another-subtitle_portfolio">
        Портфолио
      </h5>
      <ul className="about-me__list">
        <li className="about-me__site">
          <a
            href="https://VadimKoenen.github.io/how-to-learn/"
            className="about-me__link"
            target="_blank"
            rel="noreferrer"
          >
            <p className="about-me__another-site_title">
              Статичный сайт
            </p>
            <img className="about-me__strelka" alt="strelka" src={arrow} />
          </a>
        </li>
        <li className="about-me__site">
          <a
            href="https://VadimKoenen.github.io/russian-travel/"
            className="about-me__link"
            target="_blank"
            rel="noreferrer"
          >
            <p className="about-me__another-site_title">
              Адаптивный сайт
            </p>
            <img className="about-me__strelka" alt="strelka" src={arrow} />
          </a>
        </li>
        <li className="about-me__site">
          <a href="https://VadimKoenen.github.io/mesto/"
            className="about-me__link"
            target="_blank"
            rel="noreferrer">
            <p className="about-me__another-site_title">
              Одностраничное приложение
            </p>
            <img className="about-me__strelka" alt="strelka" src={arrow} />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default AboutMe;