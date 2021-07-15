import React from 'react'
import ReactDOM from 'react-dom'

import classes from './Backdrop.module.css'

const Backdrop = ({show, clicked}) => {

  const appliedClasses = [classes.Backdrop]
  show && appliedClasses.push(classes.Show)

  return ReactDOM.createPortal(
    <div className={appliedClasses.join(' ')} onClick={clicked}>
    </div>
  ,document.getElementById('root'));
};

export default Backdrop;