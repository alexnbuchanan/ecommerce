import React, { useState, useEffect, useRef } from 'react';
import './../App.css';
import {Grid, Typography, Paper, useMediaQuery, useTheme, Container, CardMedia, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const useStyles = makeStyles((theme) => ({
  holderText: {
    left: '200px',
    textAlign: 'left',
    paddingTop: '50px'
},
  holderImg: {
    flexGrow: '1',
    marginLeft: '20px'
},
  containerStyle:{
    marginTop: '30px'
},
  containerStyleSecond:{
    marginTop: '100px',
    marginBottom: '100px'
},
  buttonFont: {
    fontSize: 12
  }
}))


function Homepage() {

  const classes = useStyles();
  const textRef = useRef()
  const textRef2 = useRef()
  const animeRef1 = useRef()
  const animeRef2 = useRef()
  const animeRef3 = useRef()

  useEffect(() => {
    gsap.from(
      textRef.current,
      {
        opacity:0,
        x: -80,
        duration: 3
      },
    ),
    gsap.from(
      animeRef1.current,
      {
        duration: 1.2,
        opacity: 0, 
        y: -30
      }
    ),
    gsap.from(
      animeRef2.current,
      {
        duration: 1.5,
        opacity: 0,
        y: -20
      }
    ),
    gsap.from(
      textRef2.current,
      {
        opacity:0,
        x: -80,
        duration: 3,
        scrollTrigger: {
          trigger: textRef2.current,
          start: "top center"
        }
      }),
    gsap.from(
      animeRef3.current,
      {
        duration: 1.5,
        opacity: 0,
        y: -20,
        scrollTrigger: {
          trigger: animeRef3.current,
          start: "top center",
          markers: true
        }
      }
    );
  }, []);


    return (
      <div>
        <section>
          <Container maxWidth={false} className={classes.containerStyle}>
            <Grid item xs={12} container > 
              <Grid item xs={1} />
              <Grid item xs={3} >
                  <div className={"classes.holderText"}>
                    <Typography ref={textRef}>
                        <h1>
                        Lorem ipsum dolor sit amet.
                        </h1>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <Button to={'/shop'} className={classes.buttonFont}>
                            Enter
                        </Button>
                    </Typography>
                  </div>
              </Grid>
             <Grid item xs={4} >
                  <div className={classes.holderImg} >
                    <div className="first">
                      <div className="firstP">
                    <Paper ref={animeRef1}>
                        <CardMedia
                          component="img"
                          image={require(`../images/LA_night_car.jpg`)}                          
                        />
                    </Paper>
                    </div>
                    </div>
                  </div>
             </Grid>
              <Grid item xs={2}>
                <Paper className={classes.holderImg} ref={animeRef2}>
                    <CardMedia
                      component="img"
                      image={require(`../images/skater.jpg`)}
                    />
                </Paper>
              </Grid>
              <Grid item xs={4} />
           </Grid>
          </Container>
        </section>
        <section  >
          <Container maxWidth={false} className={classes.containerStyleSecond} >
            <Grid item xs={12} container > 
                <Grid item xs={1} />
                <Grid item xs={4}>
                    <div className={classes.holderText}>
                      <Typography ref={textRef2}>
                          <h1 >
                          Lorem ipsum dolor.
                          </h1>
                          <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                          </p>
                      </Typography>
                    </div>
                </Grid>
              <Grid item xs={4} >
                    <div className={classes.holderImg}>
                      <Paper ref={animeRef3}>
                          <CardMedia
                            component="img"
                            image={require(`../images/diner_portrait.jpg`)}
                          />
                      </Paper>
                    </div>
              </Grid>
                <Grid item xs={3} />
            </Grid>
           </Container>

        </section>
      </div>
    );
}

export default Homepage;
