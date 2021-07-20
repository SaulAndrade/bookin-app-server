import React, { useContext } from 'react';

import authContext from '../../context/auth-context';

import EventItem from './EventItem/EventItem';

import classes from './EventsList.module.css'

const EventsList = ({events, deleteEvent}) => {
  const { userInfo } = useContext(authContext)
  const userId = userInfo.userId

  return (
    <ul className={classes.EventsList}>
      {events.map( ev => <EventItem
          key={ev._id}
          deleteEvent={()=>deleteEvent(ev._id)} 
          title={ev.title} 
          desc={ev.description}
          date={ev.date}
          price={ev.price}
          owner={userId===ev.creator._id} /> )}
    </ul>
  );
};

export default EventsList;