import './Page404.css';
import { Link } from 'react-router-dom';

function ServerError() {
  return (
    <div className='page404'>
      <h2 className='page404__title'>404</h2>
      <p className='page404__message'>Страница не найдена</p>
      <Link to='/' className='page404__link'>Назад</Link>
    </div>
  );
}

export default ServerError;