import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser?._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser?._id);

  const cardDeleteButtonClassName = (
    `elements__delete-button ${isOwn ? 'elements__delete-button_visible' : 'elements__delete-button_hidden'}`
  ); 

  const cardLikeButtonClassName = (
    `elements__like ${isLiked ? 'elements__like_active' : ''}`
  )

  function handleClick() {
    props.onCardClick(props.card);
  }  

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return(
    <li className="elements__item">
      <img className="elements__image" alt={props.name} src={props.link} onClick={handleClick} />
        <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
        <div className="elements__heading">
          <h2 className="elements__title">{props.name}</h2>
          <div className="elements__like-container">
            <button className={cardLikeButtonClassName} type="button" aria-label="like button" onClick={handleLikeClick}></button>
            <p className="elements__like-counter">{props.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;