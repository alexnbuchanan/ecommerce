import React, { useState, useEffect } from 'react';
import './../App.css';
import * as ReactBootStrap from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Grid, Paper, CssBaseline, Button, Typography, useMediaQuery, useTheme, Card, CardContent, CardMedia, Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ShopMobile from './ShopMobile';

function Shop() {

const [products, setProducts] = useState([]);
const [filterProducts, setFilteredProducts] = useState([]);
const [item, setItem] = useState('');
const [currentSort, setCurrentSort] = useState('');
const [loading, setLoading] = useState(false);

useEffect(async () => {
  fetchItems();
}, [])

const fetchItems = async () => {
  const data = await fetch('http://localhost:8000/items');
  const items = await data.json();
  setProducts(items)
  setLoading(true)
}

// Notes: (from ecomm/ecomm) json-server --watch db.json --port 8000

function priceUSD(change){
  return change.toFixed(2)
}

useEffect(() => {
  const filteredItems = products.filter((a) => {
    if (item === '') {return a} else {return a.category === item}
  });
  setFilteredProducts(filteredItems);
}, [item, products])

 useEffect(() => {
  if (currentSort === '') {
    return
  }
  const sortedItems = filterProducts.sort((a, b) => {
    return currentSort === 'ASE' ? a.price - b.price : b.price - a.price
  });
  setFilteredProducts([...sortedItems]);
}, [currentSort])


const useStyles = makeStyles((theme) => ({
    logo: {
    color: 'black'
},
    buttonFont: {
    fontSize: 12
},
    cardText: {
    fontSize: 14,
    textAlign: 'left',
    color: 'black'
}
}));

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();

    return (
      isMatch ? <ShopMobile />:  <div>
         <CssBaseline />
           <Grid container spacing={1} direction="column" >
            <Grid item xs={12} container>

                <Grid item xs={3} />

                <Grid item xs={6} >
                  <Typography>
                    {(
                      <div>
                        <Button onClick={() => setItem("")} className={classes.buttonFont} >
                          All items
                        </Button>
                        <Button onClick={() => setItem("men clothing")} className={classes.buttonFont} >
                          Men clothing
                        </Button>
                        <Button onClick={() => setItem("women clothing")} className={classes.buttonFont} >
                          Women clothing
                        </Button>
                        <Button onClick={() => setItem("jewelery")} className={classes.buttonFont} >
                          Jewelery
                        </Button>
                        <Button onClick={() => setItem("electronics")} className={classes.buttonFont} >
                          Electronics
                        </Button>
                      </div>
                    )}
                  </Typography>
                </Grid>

               <Grid item xs={3} />
            </Grid>

            <Grid item xs={12} container>
            <Grid item xs={3} />
            <Grid item xs={6} >
              <Typography>
                {(
                  <div>
                    <Button onClick={() => setCurrentSort('DESC')} className={classes.buttonFont}>
                      Highest
                    </Button>
                    <Button onClick={() => setCurrentSort('ASE')} className={classes.buttonFont}>
                      Lowest
                    </Button>
                  </div>
                )}
              </Typography>
            </Grid>
           <Grid item xs={3} />
            </Grid>
           </Grid>

                {loading ?

        <Container maxWidth={false} style={{marginTop: '10px'}}>
              <Grid
              container
                spacing={3}
                >

                {filterProducts.map((a, index) => (
                                        <Grid item xs={3}>
                                          <Card>
                                            <CardContent >
                                                <Link to={`/Item/${a.id}`} style={{ textDecoration: 'none' }}>
                                                  <div key={index} className="productStyle">
                                                    <CardMedia
                                                      component="img"
                                                      image={require(`../images/${a.image}`)}
                                                     />
                                                    <Typography className={classes.cardText}>
                                                      <div>{a.title}</div>
                                                      <div>${priceUSD(a.price)}</div>
                                                    </Typography>
                                                  </div>
                                                </Link>
                                            </CardContent>
                                          </Card>
                                      </Grid>

                                  )) }
                                    </Grid>
        </Container>
                          : (<ReactBootStrap.Spinner className="spinner" animation="border" />)
                          }
      </div>


    )
}

export default Shop;
