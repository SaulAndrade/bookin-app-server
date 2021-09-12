import { useState, useCallback} from 'react'

import { sendQuery } from '../utils/query'

const useBookings = () => {
  const [bookings, setBookings] = useState([])

  const bookEvent = async(eventId, token='') => {
    const query = `
      mutation {
        bookEvent( eventId:"${eventId}") {
          _id
          event{
            _id,
            title
          }
          user{
            _id
            email
          }
          createdAt
          updatedAt
        }
      }
    `
    const response = await sendQuery(query, token)

    if (response.msg !== 'ok'){
      return {data:null, msg:response.msg}
    }

    const newBooking = {...response.data.bookEvent}
    setBookings( prevState => [...prevState, newBooking] )
    return {data: newBooking, msg:response.msg} 
  }

  const cancelBooking = async(bookingId, token='') => {
    const query = `
      mutation {
        cancelBooking( bookingId:"${bookingId}" ) {
          _id
          event{
            _id,
            title
          }
          user{
            _id
            email
          }
          createdAt
          updatedAt
        }
      }
    `
    const response = await sendQuery(query, token)

    if (response.msg !== 'ok'){
      return {data:null, msg:response.msg}
    }

    const deletedBooking = {...response.data.cancelBooking}
    setBookings( prevState => prevState.filter( bk => bk._id!==bookingId) )
    return {data: deletedBooking, msg:response.msg}
  }

  const getBookings = useCallback( async (token) => {
    const query = `
      query {
        bookings{
          _id
          event{
            _id,
            title
          }
          user{
            _id
            email
          }
          createdAt
          updatedAt
        }
      }
    `
    const response = await sendQuery(query, token)

    if (response.msg !== 'ok'){
      return {data:null, msg:response.msg}
    }

    const fetchedBookings = [...response.data.bookings]
    setBookings( fetchedBookings )
    return {data: fetchedBookings, msg:response.msg}
  },[])

  return {
    bookings,
    getBookings,
    bookEvent,
    cancelBooking
  }
}

export default useBookings