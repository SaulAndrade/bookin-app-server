import React, { useCallback, useState, useContext } from 'react';
import useEvents from '../hooks/use-events'

import authContext from '../context/auth-context';

import Backdrop from '../components/UI/Backdrop'
import Modal from '../components/UI/Modal'
import Button from '../components/UI/Button';
import CreateEventForm from '../components/CreateEventForm/CreateEventForm';

import classes from './EventsPage.module.css'

const EventsPage = () => {
  const { createEvent, events } = useEvents()
  const { userInfo } = useContext(authContext)
  const { token } = userInfo

  const [ showModal, setShowModal ] = useState(false)
  const [ submitCreateEventForm, setSubmitCreateEventForm ] = useState(false)
  const [ opLoading, setOpLoading ] = useState(false)


  const cancelModalHandler = () => {
    setShowModal(false)
    setSubmitCreateEventForm(false)
  }

  const confirmModalHandler = async() => {
    setSubmitCreateEventForm(true)
  }

  const createEventHandler = useCallback( async(title, desc, price, date) => {
    setSubmitCreateEventForm(false)
    setOpLoading(true)

    const result = await createEvent(
      title, 
      desc, 
      price, 
      date
    )
    
    console.log(result.msg)

    setOpLoading(false)
    cancelModalHandler()
  },[createEvent])

  return (
    <React.Fragment>
      <div> Events:
        {events.map(ev => <div key={ev._id}>
              <hr></hr>
              <p>{ev.title}</p>
              <p>{ev.description}</p>
              <p>{ev.price}</p>
            </div>)}
      </div>
    
      {token?
        <div className={classes.EventsControl}>
          <Backdrop show={showModal} clicked={cancelModalHandler}/>

          <Modal 
          title='Novo Evento' 
          show={showModal}
          canCancel 
          canConfirm
          onCancel={cancelModalHandler}
          onConfirm={confirmModalHandler}>
            {!opLoading?
              <CreateEventForm
                onSubmit={createEventHandler} 
                shouldSubmit={submitCreateEventForm} 
              />
              :
              <div>Loading...</div>
            }
          </Modal>

          <p>Compartilhe seus eventos!</p>

          <Button onClick={()=>{setShowModal(true)}}>
            Create Event
          </Button>
        </div>
        :null}
    </React.Fragment>
  );
};

export default EventsPage;