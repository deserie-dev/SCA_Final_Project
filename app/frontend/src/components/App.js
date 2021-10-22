import React from 'react'; 
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';
import ImagePopup from './ImagePopup';
import Login from './Login'
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import Register from './Register';
import api from '../utils/api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {
  const history = useHistory();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [cardToDelete, setCardToDelete] = React.useState();

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [token, setToken] = React.useState(localStorage.getItem('token'));
    
  //////////////////////////////////////////////////////////////////  

  React.useEffect(() => {
    if (token) {
      auth.checkToken(token)
      .then((res) => {
        setLoggedIn(true);
        setEmail(res.user.email);
        history.push('/');   
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [history, token]);

  React.useEffect(() => {
    api.getUserInfo(token)
      .then((res) => {
        setCurrentUser(res.user)
      })
      .catch((err) => {
        console.log(err)
      })
  },[token, currentUser?._id])

  React.useEffect(() => {
    api.getInitialCards(token)
      .then((res) => {
        setCards(res.data);
      })  
      .catch((err) => {
        console.log(err);
      })
  }, [token]);

  ////////////////////////////////////////////////////////////////////

  function handleUpdateUser(values) {
    api.editProfile(values, token)
      .then((values) => {
        setCurrentUser(values)
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleUpdateAvatar(avatar) {
    api.editAvatar(avatar, token)
      .then((avatar) => {
        setCurrentUser(avatar)
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleAddPlaceSubmit({name, link}) {
    api.addCard({name, link}, token)
      .then((newCard) => {
        setCards([newCard.data, ...cards])
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (!isLiked) {
      api.addLike(card._id, token)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
        })
        .catch((err) => {
          console.log(err);
        })
    }
    else {
      api.removeLike(card._id, token)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  function handleDeleteCard(card) {
    api.deleteCard(card._id, token)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }    

  ////////////////////////////////////////////////////////////////////////////////////////
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick(clickedCard) {
    setIsDeleteCardOpen(true);
    setCardToDelete(clickedCard);
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
  }

  function handleToolTipModal() {
    setIsInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }  

  /////////////////////////////////////////////////////////////////////////////

  function handleRegister (email, password) {
    if (!email || !password) {
      return;
    }
    auth.register(email, password)
    .then((res) => {
      if (res) {
        setIsRegistered(true);
        handleToolTipModal();
        history.push('/signin');
      } else {
        setIsRegistered(false);
        handleToolTipModal();
      }    
    })
    .then(handleToolTipModal)
    .catch((err) => {
      setIsRegistered(false);
      handleToolTipModal();
      console.log(err);
    });
    
  }

  function handleLogin(email, password) {
    if(!email || !password) {
      return;
    }
    auth.authorize(email, password)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setLoggedIn(true);
        setEmail(email); 
        history.push('/main')
      }     
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function onLogOut() {
    history.push('/signin');
    setLoggedIn(false);
    setEmail('');
    localStorage.removeItem('token');
  }

  /////////////////////////////////////////////////////////////////////////////    

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='root'>

      <Switch>    

        <ProtectedRoute 
          path='/main' 
          loggedIn={loggedIn}
        >

          <Header 
            link='/signin'
            linkText='Log out' 
            email={email}
            loggedIn={loggedIn}
            onLogOut={onLogOut}
          />

          <Main
            onLogOut={onLogOut}
            component={Main}
            onEditAvatarClick={handleEditAvatarClick} 
            onEditProfileClick={handleEditProfileClick} 
            onAddPlaceClick={handleAddPlaceClick} 
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
            onCardClick={handleCardClick} 
            cards={cards}
            email={email}
            onClose={closeAllPopups}
          />

          <Footer />

          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup 
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <DeleteCardPopup
            cardToDelete={cardToDelete}
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleDeleteCard}
          />

          <ImagePopup 
            card={selectedCard} 
            onClose={closeAllPopups}
          />

        </ProtectedRoute>

        <Route path='/signin'>
          <Login handleLogin={handleLogin}/>
        </Route>
        <Route path='/signup'>
          <Register handleRegister={handleRegister}/>
        </Route>
        <Route exact path='/'>
          {loggedIn ? <Redirect to='/main' /> : <Redirect to='/signin' />}
        </Route> 

      </Switch>   

        <InfoTooltip
          isRegistered={isRegistered}
          isOpen={isInfoTooltipOpen}  
          onClose={closeAllPopups}
        /> 
      </div>  
    </CurrentUserContext.Provider>
  );
}

export default App;