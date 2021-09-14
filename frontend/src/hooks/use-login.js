import { useState, useEffect, useCallback } from 'react'
import { sendQuery } from '../utils/query'

const useLogin = () => {
  const [userInfo, setUserInfo] = useState({
    userId:null, 
    tokenExpiration:null, 
    token:null, 
    msg:'not logged in'
  })

  const getUserInfo = useCallback(() => {
    const userInfo = localStorage.getItem('bookingApp-user')
    if (userInfo) {
      return JSON.parse(userInfo)
    }
    return {
      userId:null, 
      tokenExpiration:null, 
      token:null, 
      msg:'not logged in'
    }
  }, [])

  useEffect(()=>{
    const userInfo = getUserInfo()
    setUserInfo(userInfo)
  },[ getUserInfo ])

  const login = async (email, password) => {
    const loginQuery = `
      query{ 
        login(email:"${email}", password:"${password}"){
          userId
          token
          tokenExpiration
        } 
      }`
  
    const response = await sendQuery(loginQuery)

    if (response.msg !== 'ok'){
      setUserInfo ({
        userId:null, 
        tokenExpiration:null, 
        token:null, 
        msg:response.msg
      })
    }
    else{
      const formattedResponse = {
        ...response.data.login, 
        msg:response.msg
      }
    
      localStorage.setItem('bookingApp-user', JSON.stringify(formattedResponse))
      setUserInfo(formattedResponse)
    }
  }
  
  const logout = () => {
    localStorage.removeItem('bookingApp-user')
    setUserInfo ({
      userId:null, 
      tokenExpiration:null, 
      token:null, 
      msg:'logged out'
    })
  }

  const createUser = async (email, password) => {
    const query = `
      mutation{ 
        createUser( userInput:{ email:"${email}", password:"${password}" } ){
          _id
        } 
      }`
  
    const response = await sendQuery(query)
    return response
  }

  return {
    login,
    logout,
    createUser,
    userInfo
  }
} 

export default useLogin