import React, { useContext, useRef } from "react";
import ReactDOM from "react-dom";

import feedbackContext from "../../context/feedback-context";

import classes from "./Feedback.module.css";

const Feedback = () => {
  const { messageList } = useContext(feedbackContext);
  const msgEl = useRef(null)

  let mappedMsgs = null
  if(messageList) {
    mappedMsgs =  messageList.map(msgItem => {
      return (
        <div className={classes.FeedbackItem} key={'feedback'+msgItem.id} ref={msgEl}>
          {msgItem.msg}
        </div>
      )
    })
  }
  
  return ReactDOM.createPortal(
    <div className={classes.Feedback}>
      {mappedMsgs}
    </div>,
    document.getElementById("root")
  );
};

export default Feedback;
