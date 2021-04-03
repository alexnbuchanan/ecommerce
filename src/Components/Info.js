import React, { useState } from 'react';
import './../App.css';
import {Grid, Typography, Paper, useMediaQuery, useTheme, Container, CardMedia} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

    const useStyles = makeStyles((theme) => ({
        info: {
          marginTop: '20px',
          textAlign: 'left'
    },
        cardStyle: {
          margin: 'auto',
          marginTop: '20px'
    },
        paperStyle: {
          padding: '30px'
        },
        marginFromTop: {
          marginTop: '20px'
        }
    }))

function Info() {
  const classes = useStyles();

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('sm'));

    return (
      <div className="App">
        <Typography className={classes.marginFromTop}><h3>About Us</h3></Typography>
        <Container maxWidth={false} style={{marginTop: '20px'}}>
          <Grid item sm={isMatch ? 11 : 3} className={classes.cardStyle}>

            <Paper className={classes.paperStyle}>
              <CardMedia
               className={classes.media}
                component="img"
                image={require(`../images/storeImage.jpg`)}
               />
              <Typography className={classes.info}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/><br/>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
            </Paper>
          </Grid>
        </Container>
      </div>
    );
}

export default Info;
