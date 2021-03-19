import React, { useState } from 'react';
import {Button, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    logo: {
    color: 'black'
},
    buttonFont: {
    fontSize: 12
}
}));




const TopMenu = ({setItem}) => {
  const [clicked, setClick] = useState(false)
  const toggleClick = () => setClick(clicked => !clicked);
    const classes = useStyles();

  return (
    <Typography>
      <Button onClick={toggleClick} className={classes.buttonFont}>
        All items
      </Button>

    {clicked ? (
      <div>
        <Button onClick={() => setItem("men clothing")} className={classes.buttonFont} >
          Men clothing
        </Button><br/>
        <Button onClick={() => setItem("women clothing")} className={classes.buttonFont} >
          Women clothing
        </Button><br/>
        <Button onClick={() => setItem("jewelery")} className={classes.buttonFont} >
          Jewelery
        </Button><br/>
        <Button onClick={() => setItem("electronics")} className={classes.buttonFont} >
          Electronics
        </Button>
      </div>
    ) : null}
  </Typography>
  );
}

export default TopMenu;
