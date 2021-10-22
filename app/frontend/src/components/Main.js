import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main (props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">

    <section className="profile">
        
      <div className="profile__avatar">
        <img className="profile__image" src={currentUser.avatar} alt="Avatar" />
        <button className="profile__image-edit" onClick={props.onEditAvatarClick}></button>
      </div>

      <div className="profile__content">
        <div className="profile__details">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button type="button" aria-label="edit button" className="profile__edit" onClick={props.onEditProfileClick}></button>
        </div>
        <p className="profile__occupation">{currentUser.about}</p>
      </div>
      <button className="profile__add" type="button" aria-label="add button" onClick={props.onAddPlaceClick}></button>
    </section>

    <section className="elements">
      <ul className="elements__container">
        {props.cards.map((card) => {
          return (
            <Card 
              card={card}
              key={card._id} 
              name={card.name} 
              id={card._id} 
              link={card.link} 
              likes={card.likes}
              onCardDelete={props.onCardDelete}
              onCardLike={props.onCardLike}  
              onCardClick={props.onCardClick}
            />
          )
        })} 
      </ul>  
    </section>
    </main>
  )
}

export default Main;