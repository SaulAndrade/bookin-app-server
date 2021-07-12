import React from 'react'

import useLogin from '../hooks/use-login'

const authContext = React.createContext({
  login: async (email, pwd)=>{},
  logout: ()=>{},
  userInfo: null
})

export const AuthContextProvider = (props) => {
  const { login, logout, userInfo } = useLogin()

  return (
  <authContext.Provider value={{
    login: login,
    logout: logout,
    userInfo: userInfo
  }}>
    {props.children}
  </authContext.Provider>
  )
}

export default authContext