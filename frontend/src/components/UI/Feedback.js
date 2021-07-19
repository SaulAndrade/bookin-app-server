import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom'

import classes from './Feedback.module.css'

const Feedback = ({text}) => {
const element = useRef(null)

useEffect(()=>{
  element.current.classList.add(classes.Show)
  setTimeout(()=>{
    element.current.classList.replace(classes.Show, classes.Hide)
    ReactDOM.unmountComponentAtNode(element.current)
  },1500) 
})

  return ReactDOM.createPortal(
    <div className={classes.Feedback} ref={element}>
      {text}
    </div>
  ,document.getElementById('root'))
};

export default Feedback;