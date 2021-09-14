import React, {useContext} from 'react';

import authContext from "../../context/auth-context";
import feedbackContext from '../../context/feedback-context'
import infoContext from "../../context/info-context";

import Button from '../UI/Button'

import classes from './BookingsList.module.css'

const BookingsList = ({bookingsList}) => {
  const { cancelBooking } = useContext(infoContext);
  const { addMessage } = useContext(feedbackContext)
  const { userInfo } = useContext(authContext);
  const { token } = userInfo;

  const cancelBookingHandler = async (bookingId) => {
    const result = await cancelBooking(bookingId, token)
    addMessage(result.msg)
  }

  return (
    <ul className={classes.BkList}>
      {bookingsList.map(bk=>(
        <li key={'booking_'+bk._id}>
          {bk.event.title} - created at {new Date(bk.createdAt).toLocaleDateString()}
          <Button onClick={()=>cancelBookingHandler(bk._id)}>cancelar</Button>
        </li>
      ))}
    </ul>
  );
};

export default BookingsList;