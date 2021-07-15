import React, {Fragment, useContext} from 'react';
import { NavLink } from 'react-router-dom';

import authContext from '../../context/auth-context';

import classes from './MainNavigation.module.css'

const MainNavigation = (props) => {
  const { userInfo, logout } = useContext(authContext)
  return (
    <header className={classes.MainNavigation}>
      <div className={classes.NavLogo}>
        <h1>EasyBooking</h1>
      </div>
      <nav className={classes.NavItems}>
        <ul>
          {!userInfo.token?
            <Fragment>
              <li><NavLink to='/auth' exact activeClassName={classes.ActiveLink}>Authenticate</NavLink></li>
              <li><NavLink to='/events' exact activeClassName={classes.ActiveLink}>Eventos</NavLink></li>
            </Fragment>
            :
            <Fragment>
              <li><NavLink to='/events' exact activeClassName={classes.ActiveLink}>Eventos</NavLink></li>
              <li><NavLink to='/bookings' exact activeClassName={classes.ActiveLink}>Agendamentos</NavLink></li>
              <li><button onClick={logout}>logout</button></li>
            </Fragment>
          }
        </ul>
      </nav >
    </header>
  );
};

export default MainNavigation;