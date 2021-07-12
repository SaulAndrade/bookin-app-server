import React, { useContext } from 'react';
import useEvents from '../hooks/use-events'

import authContext from '../context/auth-context'

const EventsPage = () => {
  const { userInfo } = useContext(authContext)
  const { createEvent, error, events } = useEvents()

  return (
    <div>
      <p>Token: {userInfo.token}</p>
      <p>Error: {error}</p>
     <button onClick={async()=>{
       await createEvent('Saul event', 'my event', 10, '2021-07-12T20:59:06.634Z', userInfo.token)
       }}>
         Create Event
      </button>
    </div>
  );
};

export default EventsPage;