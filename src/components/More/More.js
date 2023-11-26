import React from 'react';
import './More.css';

function More({ 
  handleMoreFilms, 
  isRenderedMore 
  
}) {


  return (
    <div className="more container">

      {isRenderedMore ?
        <button
          className="more__button"
          aria-label="show more films"
          onClick={handleMoreFilms}
        >Ещё
        </button>

        : ""}
    </div>

  );
}

export default More;