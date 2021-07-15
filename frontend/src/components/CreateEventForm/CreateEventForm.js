import React, { useRef, useEffect, useCallback } from 'react'

import classes from './CreateEventForm.module.css'

const CreateEventForm = ({onSubmit, shouldSubmit, token}) => {
  const form = useRef(null)
  const title = useRef(null)
  const desc = useRef(null)
  const price = useRef(null)

  const submitHandler = useCallback(async () => {
    const date = new Date().toISOString()
    await onSubmit(title.current.value, desc.current.value, price.current.value, date)
  },[ onSubmit ])

  useEffect(()=>{
    if (shouldSubmit){
      submitHandler()
    }
  }, [shouldSubmit, submitHandler])

  return (
    <form ref={form} className={classes.Form}>
    <div className={classes.FormControl}>
      <label htmlFor='title'>Título</label>
      <input type='text' id='title' ref={title}/>
    </div>
    <div className={classes.FormControl}>
      <label htmlFor='desc'>Descrição</label>
      <input type='text' id='desc' ref={desc}/>
    </div>
    <div className={classes.FormControl}>
      <label htmlFor='price'>Preço</label>
      <input type='text' id='price' ref={price}/>
    </div>
  </form>
  );
};

export default CreateEventForm;