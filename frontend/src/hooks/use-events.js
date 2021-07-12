import { useState } from 'react'
import { sendQuery } from '../utils/query'

const useEvents = () => {
  const [events, setEvents] = useState([])
  const [error, setError] = useState(null)

  const createEvent = async(title, desc, price, date, token) => {
    const query = `
      mutation {
        createEvent( eventInput:{ title:"${title}", description:"${desc}", price:${price}, date:"${date}" }) {
          _id
          title
        }
      }
    `
    const response = await sendQuery(query, token)

    if (response.msg !== 'ok'){
      setError(response.msg)
    }
    else{
      setEvents( prevState => [...prevState, {...response.data.createEvent}] )
      setError(null)
    }
  }

  return {
    events,
    createEvent,
    error
  }
}

export default useEvents