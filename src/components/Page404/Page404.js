import './Page404.css';
import { Link } from 'react-router-dom';

function ServerError() {

  

  return (
    <div className='page404'>
      <div className='page404__content'>
      <h2 className='page404__title'>404</h2>
      <p className='page404__message'>Страница не найдена</p>
      <Link to={-1} className='page404__link'>Назад</Link>
      </div>
    </div>
  );
}

export default ServerError;