import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const [name, setName] = React.useState();
  const [link, setLink] = React.useState();

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link
    });
    setName('');
    setLink('');
  }

  return (
    <PopupWithForm name="create" title="New place" buttonText="Create" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input id="placeTitle" className="modal__form-control modal__form-control_input_title" type="text"
        placeholder="Title" name="titleInput" required minLength="1" maxLength="30" value={name} onChange={handleNameChange}/>
      <span id="placeTitle-error" className="modal__error"></span>
      <input id="placeLink" className="modal__form-control modal__form-control_input_image" type="url"
        placeholder="Image Link" name="imageLinkInput" required value={link} onChange={handleLink} />
      <span id="placeLink-error" className="modal__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;