import React, { useContext, useEffect, Fragment } from 'react'
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
        <Switch>
          {!userInfo.token? 
            <Fragment>
              <Route path='/auth' component={AuthPage} />
              <Route path='/events' component={EventsPage} />
              <Redirect to='/auth' />
            </Fragment>
            :
            <Fragment>
              <Route path='/events' component={EventsPage} />
              <Route path='/bookings' component={BookingsPage} />
              <Redirect to='/events' />
            </Fragment>
          }
        </Switch>
      </main>
     </div>
  );
}

export default App;
