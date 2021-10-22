import React from 'react';
import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({email, link, linkText, onLogOut}) {
  const url = useLocation().pathname
  
  if (url === "/signin") {
    linkText = "Sign up";
    link = "/signup"
  } else if (url === "/signup") {
    linkText = "Log in";
    link = "/signin"
  } else if (url === "/") {
    linkText = 'Log out'
    link = "/signin"
  }

  return (
    <header className="header">
    <img className="header__logo" src={logo} alt="Around The World" />
      <div className="header__menu">
        <p className="header__menu-item">{email}</p>
        <Link className="header__menu-item" to={link} onClick={onLogOut} >{linkText}</Link>
      </div>  
    </header>
  )
}

export default Header;