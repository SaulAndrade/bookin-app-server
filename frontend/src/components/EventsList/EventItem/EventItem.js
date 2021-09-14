import React, {useState, useContext} from 'react'

import infoContext from '../../../context/info-context'
import authContext from '../../../context/auth-context'
import feedbackContext from '../../../context/feedback-context'

import Button from '../../UI/Button'
import Modal from '../../UI/Modal';
import Backdrop from '../../UI/Backdrop';

import classes from './EventItem.module.css'

const EventItem = ({eventId, title, desc, price, date, owner, deleteEvent}) => {
  const { bookEvent } = useContext(infoContext);
  const { addMessage } = useContext(feedbackContext)
  const { userInfo } = useContext(authContext);
  const { token } = userInfo;

  const [showModal, setShowModal] = useState(false);

  const cancelModalHandler = () => {
    setShowModal(false);
  };

  const bookEventHandler = async() => {
    const booking = await bookEvent(eventId, token)
    addMessage(booking.msg)
    cancelModalHandler()
  }
  
  return (
    <li className={classes.EventItem}>
      <div>
        <h1>{title}</h1>
        <h2>R${price} - {new Date(date).toLocaleDateString()}</h2>
      </div>
      <div>
        <div className={classes.EventActions}>
          {!owner && <Button onClick={()=>{setShowModal(true)}}>detalhes</Button>}
          {owner && <Button onClick={deleteEvent}>excluir</Button>}
          {owner && <p>Este evento foi criado por você.</p>}
        </div>
      </div>

      {/* though they are here, will actually render via portal to <div id=root /> */}
      <Backdrop show={showModal} clicked={cancelModalHandler} />
      <Modal
        title="Detalhes"
        show={showModal}
        canConfirm
        confirmText='agendar'
        onConfirm={bookEventHandler}
      >
        <h1>{title}</h1>
        <h1>R${price} - {new Date(date).toLocaleDateString()}</h1>
        {desc}
      </Modal>

    </li>
  );
};

export default EventItem;