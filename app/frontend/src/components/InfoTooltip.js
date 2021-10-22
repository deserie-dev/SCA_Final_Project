import React from 'react';
import successIcon from '../images/successIcon.svg';
import errorIcon from '../images/errorIcon.svg';

function InfoTooltip(props) {
  return (
    <div className={`modal modal_type_tooltip ${props.isOpen && 'modal_opened'}`}>
      <div className='modal__container modal__type_tooltip'>
        <img className='modal__icon' src={props.isRegistered ? successIcon : errorIcon} alt='success or error icon' />
        <p className='modal__message' >{props.isRegistered ? 'Success! You have now been registered.' : 'Oops, something went wrong! Please try again.'}</p>  
        <button className='modal__close-button' type='button' aria-label='close button' onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default InfoTooltip;