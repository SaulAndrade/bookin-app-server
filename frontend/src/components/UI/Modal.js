import React from 'react';
import ReactDOM from 'react-dom'
import Button from './Button'

import classes from './Modal.module.css'

const Modal = ({show, title, canCancel, canConfirm, onCancel, onConfirm, confirmText, children}) => {
  const appliedClasses = [classes.Modal]
  show && appliedClasses.push(classes.Show)

  return ReactDOM.createPortal(
    <div className={appliedClasses.join(' ')}>

      <header>
        <h1>{title}</h1>
      </header>

      <section className={classes.Content}>
        {children}
      </section>

      <section className={classes.Actions}>
        {canCancel && <Button onClick={onCancel}>cancelar</Button>}
        {canConfirm && <Button onClick={onConfirm}>{confirmText}</Button>}
      </section>

    </div>
  , document.getElementById('root'));
};

export default Modal;