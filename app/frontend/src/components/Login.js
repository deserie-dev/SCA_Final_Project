import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Login (props) { 
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleLogin(email, password);
  }  
  
  return (
    <>
      <Header link="/signup" linkText="Sign up"></Header>
      <div className="modal__form_container">
        <form className="modal__form" onSubmit={handleSubmit} >
          <h3 className="modal__form_heading">Log in</h3>
          <input className="modal__form_input" placeholder="Email" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input className="modal__form_input" placeholder="Password" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button className="modal__form_submit" type="submit">Log In</button>
          <Link className="modal__link" to="/signup">Not a member yet? Sign up here!</Link>
        </form>
      </div>
    </>
  );
       
}

export default Login;