import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import './../App.css';
import * as ReactBootStrap from 'react-bootstrap';
import { saveProducts } from '../helpers/helperTools';
import {Grid, Paper, CssBaseline, Button, ButtonGroup, Typography, useMediaQuery, useTheme, Card, CardContent, CardMedia, Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

function Item(props) {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cost, setCost] = useState([]);

  useEffect(async () => {
    fetchItems();
  }, [])

  const itemId = props.match.params.item;
  const fetchItems = async () => {
    const data = await fetch('http://localhost:8000/items/' + itemId);
    const items = await data.json();
    setProduct(items)
    setLoading(true)
    setCost(items.price.toFixed(2))
  }

  function priceUSD(change){
    return change.toFixed(2)
  }

  function saveProduct(item) {
    const itemData = JSON.parse(localStorage.getItem('product')) || [];
    var obj = item;
    var duplicate = false;
    Object.assign(obj, {quantity})

    for (let i = 0; i < itemData.length; i++){
      if (itemData[i].title === obj.title){
        itemData[i]['quantity'] = itemData[i]['quantity'] + obj['quantity'];
        duplicate = true
      }
    }

    if (!duplicate){itemData.push(obj)}
    saveProducts(itemData);
    duplicate = false

  }

  useEffect(() => {
    const newCost = quantity * product.price;
    setCost(priceUSD(newCost))
  }, [quantity])

    const useStyles = makeStyles((theme) => ({
        cardStyle: {
          margin: 'auto',
          fontWeight: 500
    },
        cardText: {
          fontSize: 12
    },
        media: {
          width: '60%',
          margin: 'auto'
    },
        buttonStyle: {
          marginTop: 20,
          backgroundColor: 'black',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#666666'
    }
}


    }));

    const classes = useStyles();

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'));

    return (
      <div className="App">
          {loading ?
                      (

        <Container maxWidth={false} style={{marginTop: '20px'}}>
                      <Grid item sm={isMatch ? 11 : 3} className={classes.cardStyle}>
                        <Card key={itemId}>
                          <CardContent >
                          <CardMedia
                            className={classes.media}
                            component="img"
                            image={require(`../images/${product.image}`)}
                          />
                          <Typography>
                            <p className={classes.cardStyle}>{product.title}</p>
                            <p className={classes.cardText}>{product.description}</p>
                            <p>${priceUSD(product.price)}</p>
                          </Typography>

                            <div>
                            <ButtonGroup size="small">
                              <Button onClick={quantity > 1 ? () => setQuantity(quantity - 1) : null}>-</Button>
                              <Button>{quantity}</Button>
                              <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
                            </ButtonGroup>
                            </div>

                            <Link to={`/Cart/`} style={{ textDecoration: 'none' }}>
                              <Button onClick={() => saveProduct(product)} type="button" className={classes.buttonStyle} >
                                Add to shopping cart ${cost}
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      </Grid>
        </Container>

                      ): (<ReactBootStrap.Spinner className="spinner" animation="border" />)
                    }
        </div>

    );
}

export default Item;
