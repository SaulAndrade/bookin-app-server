import { useState, useCallback} from 'react'

import { sendQuery } from '../utils/query'

const useEvents = () => {
  const [events, setEvents] = useState([])

  const createEvent = async(title, desc, price, date, token='') => {
    const query = `
      mutation {
        createEvent( eventInput:{ title:"${title}", description:"${desc}", price:${price}, date:"${date}" }) {
          _id
          title
          description
          price
          date
          creator {
            _id
          }
        }
      }
    `
    const response = await sendQuery(query, token)

    if (response.msg !== 'ok'){
      return {data:null, msg:response.msg}
    }

    const newEvent = {...response.data.createEvent}
    setEvents( prevState => [...prevState, newEvent] )
    return {data: newEvent, msg:response.msg} 
  }

  const deleteEvent = async(eventId, token='') => {
    const query = `
      mutation {
        deleteEvent( eventId:"${eventId}" ) {
          _id
          title
        }
      }
    `
    const response = await sendQuery(query, token)

    if (response.msg !== 'ok'){
      return {data:null, msg:response.msg}
    }

    const deletedEvent = {...response.data.deleteEvent}
    setEvents( prevState => prevState.filter( ev => ev._id!==eventId) )
    return {data: deletedEvent, msg:response.msg}
  }

  const getEvents = useCallback( async () => {
    const query = `
      query {
        events{
          _id
          title
          description
          price
          date
          creator {
            _id
          }
        }
      }
    `
    const response = await sendQuery(query)

    if (response.msg !== 'ok'){
      return {data:null, msg:response.msg}
    }

    const fetchedEvents = [...response.data.events]
    setEvents( fetchedEvents )
    return {data: fetchedEvents, msg:response.msg}
  },[])

  return {
    events,
    createEvent,
    getEvents,
    deleteEvent,
  }
}

export default useEvents