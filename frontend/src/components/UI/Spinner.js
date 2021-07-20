import React from "react";

import classes from './Spinner.module.css'

const Spinner = () => {
  return (
    <div className={classes.Container}>
      <div className={classes.LdsRipple}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
