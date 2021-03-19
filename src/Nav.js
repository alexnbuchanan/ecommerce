import React, { useState, useEffect } from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import {AppBar, CssBaseline, Toolbar, Typography, Button, Grid} from '@material-ui/core';
import useStyles from './styles.js';




function Nav({ qty }) {
  const classes = useStyles();
    return (
        <div>


            <CssBaseline />

            <AppBar position="relative" elevation={0}>


                <Toolbar className={classes.navBar}>
                  <Grid container>
                      <Grid item xs={4} md={2}>
                        <Typography className={classes.logo}>
                          Logo
                        </Typography>
                      </Grid>


                      <Grid item xs={1} md={7} />

                      <Grid item xs={7} md={3} >
                        <Typography>
                          <Button to={'/'} component={Link} className={classes.buttonFont}>
                            Shop
                          </Button>

                          <Button to={'/info'} component={Link} className={classes.buttonFont}>
                            Info
                          </Button>

                          <Button to={'/cart'} component={Link} className={classes.buttonFont}>
                            {qty ? `Cart (${qty})` : "Cart"}
                          </Button>

                        </Typography>
                     </Grid>
                  </Grid>
                </Toolbar>


            </AppBar>



        </div>


      // <nav className="Nav">
      //   <h3>Logo</h3>
      //   <ul className="nav-links">
      //     <Link to="/">
      //       <li>Shop</li>
      //     </Link>
      //     <Link to="/info">
      //       <li>Info</li>
      //     </Link>
      //     <Link to="/cart">
      //       <li>Cart {qty}</li>
      //     </Link>
      //   </ul>
      // </nav>
  )
}

export default Nav;
