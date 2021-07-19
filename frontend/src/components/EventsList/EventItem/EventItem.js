import React from 'react'
import Button from '../../UI/Button'

import classes from './EventItem.module.css'

const EventItem = ({title, desc, price, date, owner, deleteEvent}) => {
  return (
    <li className={classes.EventItem}>
      <div>
        <h1>{title}</h1>
        <h2>R$ {price}</h2>
      </div>
      <div>
        <div className={classes.EventActions}>
          <Button>detalhes</Button>
          {owner && <Button onClick={deleteEvent}>excluir</Button>}
        </div>
       {owner && <p>Este evento foi criado por você.</p>}
      </div>
    </li>
  );
};

export default EventItem;