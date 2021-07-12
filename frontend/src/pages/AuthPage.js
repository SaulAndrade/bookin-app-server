import React, { useRef, useContext } from 'react';
import authContext from '../context/auth-context';

import classes from './AuthPage.module.css'

const AuthPage = () => {
  const { login } = useContext(authContext)
  
  const email = useRef('')
  const password = useRef('')
  

  const loginHandler = async (event) => {
    event.preventDefault()
    await login(email.current.value, password.current.value)
  }

  return (
    <form className={classes.Form} onSubmit={loginHandler}>
      <div className={classes.FormControl}>
        <label htmlFor='email'>E-mail</label>
        <input type='email' id='email' ref={email}/>
      </div>
      <div className={classes.FormControl}>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' ref={password} />
      </div>
      <div className={classes.FormActions}>
        <button type='submit' >Entrar</button>
        <button type='button'>Primeiro acesso</button>
      </div>
    </form>
  );
};

export default AuthPage;