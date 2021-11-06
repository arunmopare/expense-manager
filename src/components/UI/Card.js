import React from 'react';

import './Card.css';

const CardList = (props) => {
  const classes = 'card ' + props.className;

  return <div className={classes}>{props.children}</div>;
};

export default CardList;
