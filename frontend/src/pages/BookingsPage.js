import React, { useEffect, useContext } from "react";

import authContext from "../context/auth-context";
import feedbackContext from "../context/feedback-context";
import infoContext from "../context/info-context";

const BookingsPage = () => {
  const { bookings, getBookings } = useContext(infoContext);
  const { userInfo } = useContext(authContext);
  const { token } = userInfo;

  const onLoad = async()=>{
    const booking = await getBookings(token)
    console.log(booking)
  }

  useEffect(()=>{
    onLoad()
  }, [])

  return (
    <div>
      bookings page
    </div>
  );
};

export default BookingsPage;