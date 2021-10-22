import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup(props) {

  function handleSubmit(e) {
    e.preventDefault()
    props.onSubmit(props.cardToDelete);
  }

  return(
    <PopupWithForm name="deleteConfirmation" title="Are you sure?" buttonText="Yes" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}></PopupWithForm>
  );
}

export default DeleteCardPopup;
