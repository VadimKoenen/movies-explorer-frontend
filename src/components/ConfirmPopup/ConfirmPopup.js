import React from 'react';
import './ConfirmPopup.css';

function ConfirmPopup({ isConfirmPopupOpen, closeConfirmPopup, messagePopup, onOverlayClick }) {


  return (
    <section
      className={`popup ${isConfirmPopupOpen ? 'popup_opened' : ''}`}
      id="popup-info-tooltip"
      onClick={onOverlayClick}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={closeConfirmPopup}
        />
        <p className="popup__info">{messagePopup}</p>
      </div>
    </section>
  );
}

export default ConfirmPopup;