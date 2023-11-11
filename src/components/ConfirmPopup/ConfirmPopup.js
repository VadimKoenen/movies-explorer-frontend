import React from 'react';
import PopupWithForm from './PopupWithForm';


function ConfirmPopup({ card, isOpen, onClose, isLoading, onCardDelete }) {

//удаление
    function deleteCard(e) {
        e.preventDefault();
        onCardDelete(card);
    };

    return (
        <PopupWithForm
            name={"confirm"}
            title={"Вы уверены?"}
            isOpen={isOpen}
            onClose={onClose}
            buttonName={isLoading ? "Удаление..." : "Да"}
            onSubmit={deleteCard}
            card={card}
        >
        </PopupWithForm>
    );
};

export default ConfirmPopup;