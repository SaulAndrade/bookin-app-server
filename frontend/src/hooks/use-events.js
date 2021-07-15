import { useState, useCallback, useEffect, useContext } from 'react'

import authContext from '../context/auth-context'

import { sendQuery } from '../utils/query'

const useEvents = () => {
  const { userInfo } = useContext(authContext)
  const { token } = userInfo

  const [events, setEvents] = useState([])
  const [error, setError] = useState(null)

  const createEvent = useCallback(async(title, desc, price, date) => {
    const query = `
      mutation {
        createEvent( eventInput:{ title:"${title}", description:"${desc}", price:${price}, date:"${date}" }) {
          _id
          title
          description
          price
          date
        }
      }
    `
    const response = await sendQuery(query, token)

    if (response.msg !== 'ok'){
      setError(response.msg)
      return {data:null, msg:response.msg}
    }
    else{
      const newEvent = {...response.data.createEvent}
      setEvents( prevState => [...prevState, newEvent] )
      setError(null)
      return {data: newEvent, msg:response.msg}
    }
  },[token])

  const getEvents = useCallback( async () => {
    const query = `
      query {
        events{
          _id
          title
          description
          price
          date
        }
      }
    `
    const response = await sendQuery(query)

    if (response.msg !== 'ok'){
      setError(response.msg)
    }
    else{
      setEvents( [...response.data.events] )
      setError(null)
    }

  },[])

  useEffect(()=>{
    getEvents()
  }, [getEvents])

  return {
    events,
    createEvent,
    getEvents,
    error
  }
}

export default useEvents