import "./Nav.css";
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className="navigation">
      <div className="navigation__size-container size-container ">
      
        <Link
          to="#promo"
          reloadDocument
          className="navigation__text"
          aria-label="navigate to about project info"
        >О проекте</Link>

        <Link
          to="#techs"
          reloadDocument
          className="navigation__text"
          aria-label="navigate to used technologies"
        >Технологии</Link>

        <Link
          to="#about-me"
          reloadDocument
          className="navigation__text"
          aria-label="navigate to info about student"
        >Студент</Link>

      </div>
    </div>
  );
}

export default Nav;