import React from 'react'

import useLogin from '../hooks/use-login'

const authContext = React.createContext({
  login: async (email, pwd)=>{},
  logout: ()=>{},
  createUser: async (email, pwd)=>{},
  userInfo: null
})

export const AuthContextProvider = (props) => {
  const { login, logout, createUser, userInfo } = useLogin()

  return (
  <authContext.Provider value={{
    login: login,
    logout: logout,
    createUser: createUser,
    userInfo: userInfo
  }}>
    {props.children}
  </authContext.Provider>
  )
}

export default authContext