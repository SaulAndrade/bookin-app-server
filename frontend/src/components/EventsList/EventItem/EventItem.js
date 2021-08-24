import React, {useState} from 'react'

import Button from '../../UI/Button'
import Modal from '../../UI/Modal';
import Backdrop from '../../UI/Backdrop';

import classes from './EventItem.module.css'

const EventItem = ({eventId, title, desc, price, date, owner, deleteEvent}) => {
  const [showModal, setShowModal] = useState(false);

  const cancelModalHandler = () => {
    setShowModal(false);
  };

  const bookEventHandler = () => {

  }
  
  return (
    <li className={classes.EventItem}>
      <div>
        <h1>{title}</h1>
        <h2>R${price} - {new Date(date).toLocaleDateString()}</h2>
      </div>
      <div>
        <div className={classes.EventActions}>
          <Button onClick={()=>{setShowModal(true)}}>detalhes</Button>
          {owner && <Button onClick={deleteEvent}>excluir</Button>}
        </div>
       {owner && <p>Este evento foi criado por você.</p>}
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