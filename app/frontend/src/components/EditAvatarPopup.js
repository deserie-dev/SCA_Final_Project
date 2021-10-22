import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
          avatar: avatarRef.current.value
        });
  }


  return(
    <PopupWithForm name="avatar" title="Change Profile Picture" buttonText="Save" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input ref={avatarRef} id="avatar-url" className="modal__form-control modal__form-control_avatar" type="url" placeholder="Image Link" name="avatarInput" required/>
      <span id="avatar-url-error" className="modal__error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;