import React from 'react'
import { Switch, Route } from 'react-router-dom'

import AuthPage from './pages/AuthPage'
import EventsPage from './pages/EventsPage'
import BookingsPage from './pages/BookingsPage'

import './App.css';

const App = (props) => {
  return (
    <Switch>
      <Route path='/auth' component={AuthPage} />
      <Route path='/events' component={EventsPage} />
      <Route path='/bookings' component={BookingsPage} />
      <Route path='/' component={AuthPage} />
     </Switch>
  );
}

export default App;
