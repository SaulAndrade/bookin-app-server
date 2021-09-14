import React, { useRef, useContext, useState } from 'react';

import authContext from '../context/auth-context';
import feedbackContext from '../context/feedback-context';

import Modal from '../components/UI/Modal'
import Backdrop from '../components/UI/Backdrop'

import classes from './AuthPage.module.css'

const AuthPage = () => {
  const { login, createUser } = useContext(authContext)
  const { addMessage } = useContext(feedbackContext)
  
  const email = useRef('')
  const password = useRef('')
  
  const newEmail = useRef('')
  const newPassword = useRef('')
  
  const [showModal, setShowModal] = useState(false)

  const loginHandler = async (event) => {
    event.preventDefault()
    await login(email.current.value, password.current.value)
  }

  const newUserHandler = async() => {
    const response = await createUser(newEmail.current.value, newPassword.current.value)
    addMessage(response.msg)
  }

  return (
    <React.Fragment>
      <Backdrop show={showModal} clicked={()=>setShowModal(false)} />
      <Modal
        canConfirm
        title='Novo Usuário'
        confirmText='cadastrar'
        onConfirm={newUserHandler}
        show={showModal}
      >
        <form className={classes.Form}>
          <div className={classes.FormControl}>
            <label htmlFor='newEmail'>E-mail</label>
            <input type='newEmail' id='newEmail' ref={newEmail}/>
          </div>
          <div className={classes.FormControl}>
           <label htmlFor='newPassword'>Password</label>
            <input type='newPassword' id='newPassword' ref={newPassword} />
          </div>
        </form>
      </Modal>


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
          <button type='button' onClick={()=>{setShowModal(true)}}>Primeiro acesso</button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default AuthPage;