import React, { useEffect, useState, useContext, useCallback } from "react";

import authContext from "../context/auth-context";
import infoContext from "../context/info-context";

import BookingsList from "../components/BookingsList/BookingsList";
import BookingsChart from "../components/BookingsChart/BookingsChart";
import Spinner from "../components/UI/Spinner";

import classes from './BookingsPage.module.css'

const BookingsPage = () => {
  const { bookings, getBookings } = useContext(infoContext);
  const { userInfo } = useContext(authContext);
  const { token } = userInfo;

  const [loadBookings, setLoadBookings] = useState(true)
  const [outputType, setOutputType] = useState('list')

  const changeOutputTypeHandler = outputType => {
    if (outputType === 'list'){
      setOutputType('list')
    }
    else {
      setOutputType('chart')
    }
  }

  const onLoad = useCallback( 
    async()=>{
      await getBookings(token)
      setLoadBookings(false)
    }
  ,[token, getBookings])

  useEffect(()=>{
    onLoad()
  }, [onLoad])

  let content = <Spinner />
  if (!loadBookings) {
    content = (
      <React.Fragment>
        <div className={classes.TabControls}>
          <button 
            className={outputType==='list'?classes.Active:null} 
            onClick={()=>{changeOutputTypeHandler('list')}}>
              List
          </button>

          <button
            className={outputType==='chart'?classes.Active:null} 
            onClick={()=>{changeOutputTypeHandler('chart')}}>
              Chart
          </button>
        </div>
        <div>
          {outputType==='list' && <BookingsList bookingsList={bookings} />}
          {outputType==='chart' && <BookingsChart bookingsList={bookings}/>}
        </div>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      {content}
    </React.Fragment>
  );
};

export default BookingsPage;