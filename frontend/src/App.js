import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import MainNavigation from './components/Navigation/MainNavigation'
import AuthPage from './pages/AuthPage'
import EventsPage from './pages/EventsPage'
import BookingsPage from './pages/BookingsPage'
import authContext from './context/auth-context'

import classes from './App.module.css';

const App = (props) => {
  const { userInfo } = useContext(authContext)

  return (
    <div className={classes.LayoutContainer}>
      <MainNavigation />
      <main>
          {!userInfo.token? 
            <Switch>
              <Route path='/auth' exact component={AuthPage} />
              <Route path='/events' exact component={EventsPage} />
              <Redirect to='/auth' />
            </Switch>
            :
            <Switch>
              <Route path='/events' exact component={EventsPage} />
              <Route path='/bookings' exact component={BookingsPage} />
              <Redirect to='/events' />
            </Switch>
          }
      </main>
     </div>
  );
}

export default App;
