import React, { useState, useEffect, useRef } from 'react';
import './../App.css';
import {Grid, Typography, Paper, useMediaQuery, useTheme, Container, CardMedia, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {Link} from 'react-router-dom';
gsap.registerPlugin(ScrollTrigger);

const useStyles = makeStyles((theme) => ({
  holderText: {
    left: '200px',
    textAlign: 'left'
},
  holderImg: {
    flexGrow: '1',
    marginLeft: '20px'
},
  containerStyle:{
    marginTop: '2%',
    height: '25%'
},
  containerStyleSecond:{
    marginTop: '5%',
    marginBottom: '5%'
},
  buttonFont: {
    fontSize: 12,
    background: 'black',
    color: 'white'
  },
  titleFont: {
    fontWeight: 700
  },
  text1Style: {
    marginTop: '3%',
    marginBottom: '10%'
  }
}))


function Homepage() {

  const classes = useStyles();
  const textRef = useRef()
  const textRef2 = useRef()
  const animeRef1 = useRef()
  const animeRef2 = useRef()
  const animeRef3 = useRef()


useEffect(() =>  {
    gsap.from(
      textRef.current,
      {
        opacity:0,
        duration: 3.3
      },
    ),
    gsap.from(
      animeRef1.current,
      {
        duration: 1.9,
        y: -20,
        opacity: 0
      }
    ),
    gsap.from(
      textRef2.current,
      {
        opacity:0,
        duration: 3,
        scrollTrigger: {
          trigger: textRef2.current,
          start: "top center"
        }
      }),
    gsap.from(
      animeRef3.current,
      {
        duration: 1.9,
        opacity: 0,
        y: -20,
        scrollTrigger: {
          trigger: animeRef3.current,
          start: "top center"
        }
      }
    );
  }, []);

    return (
      <div>
        <section>
          <Container maxWidth={false} className={classes.containerStyle}>
            <Grid item xs={11}  > 
     
                  <div className={"classes.holderText"}>
                    <Typography ref={textRef} className={classes.text1Style}>
                        <h1 className={classes.titleFont}>
                        Lorem ipsum dolor sit amet.
                        </h1>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <Button to={'/shop'} component={Link} className={classes.buttonFont}>
                            Enter
                        </Button>
                    </Typography>
                  </div>
 

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
          </Container>
        </section>
        
        <section  >
          <Container maxWidth={false} className={classes.containerStyleSecond}>
            <Grid item xs={11}  > 

                    <div className={classes.holderText}>
                      <Typography ref={textRef2}>
                          <h1 className={classes.titleFont}>
                          Lorem ipsum dolor.
                          </h1>
                          <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                          </p>
                      </Typography>
                    </div>


                    <div className={classes.holderImg}>
                      <Paper ref={animeRef3}>
                          <CardMedia
                            component="img"
                            image={require(`../images/diner_portrait.jpg`)}
                          />
                      </Paper>
                    </div>


            </Grid>
           </Container>

        </section>
      </div>
    );
}

export default Homepage;
