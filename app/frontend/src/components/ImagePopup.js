import React from 'react';

function ImagePopup(props) {

  return (
    <div className={`modal modal_type_image ${props.card ? "modal_opened" : ""}`}>
      <div className="modal__container modal__container_preview">
          <button className="modal__close-button  modal__close-button_preview" type="button"
            aria-label="close button" onClick={props.onClose}></button>
          <figure>
            <img className="modal__image" src={props.card?.link} alt={props.card?.name} />
            <figcaption className="modal__image-title">{props.card?.name}</figcaption>
          </figure>
      </div>
    </div>
  )
}

export default ImagePopup;