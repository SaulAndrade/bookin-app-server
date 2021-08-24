import React, { useContext, useCallback } from 'react';

import authContext from '../../context/auth-context';
import feedbackContext from '../../context/feedback-context';
import infoContext from '../../context/info-context';

import EventItem from './EventItem/EventItem';

import classes from './EventsList.module.css'

const EventsList = ({events}) => {
  const { deleteEvent } = useContext(infoContext)
  const { addMessage } = useContext(feedbackContext)
  const { userInfo } = useContext(authContext)
  const { userId, token } = userInfo

  const deleteEventHandler = useCallback (async (eventId) => {
    const response = await deleteEvent(eventId, token)
    addMessage(response.msg)
},[addMessage, deleteEvent, token])

  return (
    <ul className={classes.EventsList}>
      {events.map( ev => <EventItem
          key={ev._id}
          eventId = {ev._id}
          deleteEvent={()=>deleteEventHandler(ev._id)} 
          title={ev.title} 
          desc={ev.description}
          date={ev.date}
          price={ev.price}
          owner={userId===ev.creator._id} /> )}
    </ul>
  );
};

export default EventsList;