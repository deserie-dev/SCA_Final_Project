import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const[name, setName] = React.useState('');
  const[description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]); 

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description
    });
  } 

  return(
    <PopupWithForm name="edit" title="Edit Profile" buttonText="Save" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input value={name || ''} id="profileName" className="modal__form-control modal__form-control_input_name" type="text"
        placeholder="Name" name="profileNameInput" required minLength="2" maxLength="40" onChange={handleNameChange}/>
      <span id="profileName-error" className="modal__error"></span>
      <input value={description || ''} id="profileOccupation" className="modal__form-control modal__form-control_input_occupation" type="text"
        placeholder="Occupation" name="profileOccupationInput" required minLength="2" maxLength="200" onChange={handleDescriptionChange} />
      <span id="profileOccupation-error" className="modal__error"></span>    
    </PopupWithForm>
  );
}

export default EditProfilePopup;