import React, { useEffect } from 'react'
import useEvents from '../hooks/use-events'
// import useBookings from '../hooks/use-bookings'

const infoContext = React.createContext({
  events: [],
  bookings: [],
  getEvents: ()=>{},
  createEvent: (title, desc, price, date, token)=>{},
  deleteEvent: (eventId, token)=>{},
  addBooking: (bookingData)=>{},
  delBooking: (bookingId)=>{}
})

export const InfoContextProvider = (props) => {
  const { events, getEvents, createEvent, deleteEvent } = useEvents()
  // const { bookings, addBooking, delBooking } = useBookings()

  useEffect(()=>{
    getEvents()
  }, [getEvents])

  return (
  <infoContext.Provider value={{
    events: events,
    getEvents: getEvents,
    createEvent: createEvent,
    deleteEvent: deleteEvent,
    // bookings: bookings,
    // addBooking: addBooking,
    // delBooking: delBooking
  }}>
    {props.children}
  </infoContext.Provider>
  )
}

export default infoContext