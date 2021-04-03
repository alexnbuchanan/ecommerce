import React, { useState, useEffect } from 'react';
import './../App.css';
import * as ReactBootStrap from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Grid, Paper, CssBaseline, Button, Typography, useMediaQuery, useTheme} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';

function Shop() {

const [products, setProducts] = useState([]);
const [filterProducts, setFilteredProducts] = useState([]);
const [item, setItem] = useState('');
const [currentSort, setCurrentSort] = useState('');
const [loading, setLoading] = useState(false);
const [clickedItems, setClickItems] = useState(false);
const [clickedPrice, setClickPrice] = useState(false);
const toggleClickItems = () => setClickItems(clicked => !clicked);
const toggleClickPrice = () => setClickPrice(clicked => !clicked);

useEffect(async () => {
  fetchItems();
}, [])

const fetchItems = async () => {
  const data = await fetch('http://localhost:8000/items');
  const items = await data.json();
  setProducts(items)
  setLoading(true)
}

// Notes: (from alex) json-server --watch db.json --port 8000

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
},
    buttonText: {
      textDecoration: 'underline',
      fontSize: 12
    }
}));

  const theme = useTheme();

  const classes = useStyles();

    return (
      <div>
    <Typography>
      <Button onClick={toggleClickItems} className={classes.buttonFont}>
        {clickedItems ? <Typography className={classes.buttonText}>All items</Typography> : "All items"}
      </Button>

    {clickedItems ? (
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

  <Typography>
    <Button onClick={toggleClickPrice} className={classes.buttonFont}>
      {clickedPrice? <Typography className={classes.buttonText}>Sort by price</Typography> : "Sort by Price"}
    </Button>

  {clickedPrice ? (
    <div>
      <Button onClick={() => setCurrentSort('DESC')} className={classes.buttonFont}>
        Highest
      </Button><br/>
      <Button onClick={() => setCurrentSort('ASE')} className={classes.buttonFont}>
        Lowest
      </Button><br/>
    </div>
  ) : null}
</Typography>





{loading ?
                    <Container maxWidth={false} style={{marginTop: '10px'}}>
                        <Grid
                        container
                          spacing={3}
                          >

                          {filterProducts.map((a, index) => (
                                                  <Grid item >
                                                    <Card className={classes.cardSize}>
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


                                            ))}
                            </Grid>
                            </Container>
                          : (<ReactBootStrap.Spinner className="spinner" animation="border" />)
                        }
      </div>


    )
}

export default Shop;
