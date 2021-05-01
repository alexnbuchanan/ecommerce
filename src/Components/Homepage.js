import React, { useState, useEffect, useRef } from 'react';
import './../App.css';
import {Grid, Typography, Paper, useMediaQuery, useTheme, Container, CardMedia} from '@material-ui/core';
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
    marginTop: '200px',
    marginBottom: '200px'
}
}))


function Homepage() {

  const classes = useStyles();
  const animeRef = useRef()

  useEffect(() => {
    gsap.from(
      animeRef.current,
      {
        opacity:0,
        x: -80,
        duration: 3,

        scrollTrigger: {
          trigger: animeRef.current,
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
                    <Typography>
                        <h1>
                        Lorem ipsum dolor sit amet.
                        </h1>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <p>
                        Shop Now
                        </p>
                    </Typography>
                  </div>
              </Grid>
             <Grid item xs={4} >
                  <div className={classes.holderImg} >
                    <div className="first">
                      <div className="firstP">
                    <Paper>
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
                <Paper className={classes.holderImg}>
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
        <section>
          <Container maxWidth={false} className={classes.containerStyleSecond}>
            <Grid item xs={12} container > 
                <Grid item xs={1} />
                <Grid item xs={4}>
                    <div className={classes.holderText}>
                      <Typography ref={animeRef}>
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
                      <Paper>
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
