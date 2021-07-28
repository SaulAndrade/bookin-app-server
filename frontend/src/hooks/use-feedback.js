import { useState } from 'react';

const useFeedback = (time=2000) => {
  const [messageList, setMessageList] = useState([])
  const [id, setId] = useState(0)

  const addMessage = (message) => {
    setMessageList((prevList) => [...prevList, {msg:message, id:id}])

    setTimeout(() => {
      setMessageList((prevList) => prevList.filter(msgItem => msgItem.id!==id));
    },time);

    setId(prevId => prevId+1)
  }

  return {
    addMessage: addMessage,
    messageList: messageList
  }
};

export default useFeedback;