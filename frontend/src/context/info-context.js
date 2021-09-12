import React, { useEffect } from 'react'
import useEvents from '../hooks/use-events'
import useBookings from '../hooks/use-bookings'

const infoContext = React.createContext({
  events: [],
  bookings: [],
  getEvents: ()=>{},
  createEvent: (title, desc, price, date, token)=>{},
  deleteEvent: (eventId, token)=>{},
  getBookings: (token)=>{},
  bookEvent: (eventId, token)=>{},
  cancelBooking: (bookingId, token)=>{}
})

export const InfoContextProvider = (props) => {
  const { events, getEvents, createEvent, deleteEvent } = useEvents()
  const { bookings, getBookings, bookEvent, cancelBooking } = useBookings()

  useEffect(()=>{
    getEvents()
  }, [getEvents])

  return (
  <infoContext.Provider value={{
    events: events,
    getEvents: getEvents,
    createEvent: createEvent,
    deleteEvent: deleteEvent,
    bookings,
    getBookings,
    bookEvent,
    cancelBooking
  }}>
    {props.children}
  </infoContext.Provider>
  )
}

export default infoContext