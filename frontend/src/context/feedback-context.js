import React from 'react'

import Feedback from '../components/UI/Feedback'

import useFeedback from '../hooks/use-feedback'

const feedbackContext = React.createContext({
  addMessage: (msg)=>{},
  messageList: []
})

export const FeedbackContextProvider = (props) => {
  const { addMessage, messageList } = useFeedback(2000)

  return (
  <feedbackContext.Provider value={{
    addMessage: addMessage,
    messageList: messageList
  }}>
    <Feedback />
    {props.children}
  </feedbackContext.Provider>
  )
}

export default feedbackContext