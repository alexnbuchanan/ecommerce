import React, { useState, useEffect } from 'react';
import './../App.css';
import * as ReactBootStrap from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { getQuantity, getTotal } from '../helpers/helperTools';
import {Grid, Typography,useMediaQuery, useTheme, Container, Button, ButtonGroup, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cartEmptyStyle: {
    marginTop: '50px'
  },
    continueShopping: {
      color: 'black'
},
    productImage: {
      width: '5em'
},
    removeButton: {
      color: '#808080',
      fontSize: '.8rem'
},
    totalPrice: {
      textAlign: "right",
      padding: '16px',
      fontWeight: 'bold'
},
    totalCheckoutButton: {
      height: '5em',
      backgroundColor: 'black',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#666666'
}
}}))



function Cart({ setQty: setParentQty }) {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('xs'));

    const classes = useStyles();
    const [products, setProducts] = useState([]);

    function updateQty(products){
        setParentQty({ quantity: getQuantity(products) });
      }

    useEffect(function() {
      const storageItems = JSON.parse(localStorage.getItem('product'));
      const products = storageItems || [];
      setProducts(products);
      updateQty(products);
    }, []);

    function decreaseQuantity(index) {
      if (products[index]){
        const newProducts = products.map((a, b) => {
          if (b === index) return {...a, quantity: a.quantity - 1}
          else return a
        });

        setProducts(newProducts);
        localStorage.setItem('product', JSON.stringify(newProducts))
        updateQty(newProducts)
      }
    }

    function increaseQuantity(index) {
        if (!products[index]) return;

        const newProducts = products.map((a, b) => {
          if (b === index) return {...a, quantity: a.quantity + 1}
          else return a
        })

        setProducts(newProducts)
        localStorage.setItem('product', JSON.stringify(newProducts))
        updateQty(newProducts);
    }

    function removeItem(index){
      const product = products[index];

      if (!product) return;

      const newProducts = products.filter((v, z) => z !== index);
      setProducts(newProducts);

      localStorage.setItem('product', JSON.stringify(newProducts));

      updateQty(newProducts);
    }

     if (products.length === 0) {
       return (
         <div className={classes.cartEmptyStyle}>
            <Typography>
              Cart Empty
            </Typography>

            <Box m={2}>
              <Link to={`/`} style={{ textDecoration: 'underline', textDecorationColor: 'black' }}>
                <Typography variant="title" className={classes.continueShopping}>
                    Continue shopping
                </Typography>
              </Link>
            </Box>

         </div>)
     }

    return (
      <div className="App">
        {products.map((item, index) => (
          <Grid container>
                <Grid item xs={isMatch ? 0 : 3} />
                <Grid item xs={isMatch ? 12 : 6} >

          <TableContainer>
            <Table aria-label="simple table">
              <colgroup>
                <col width="20%" />
                <col width="20%" />
                <col width="5%" />
                <col width="5%" />
                <col width="5%" />
              </colgroup>
              <TableBody>

                  <TableRow>
                    <TableCell align="center">
                      <img src={require(`../images/${item.image}`)} className={classes.productImage}>
                      </img>
                    </TableCell>
                    <TableCell align="left">
                      <Typography>
                        {item.title}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <ButtonGroup size="small">
                        <Button
                          type="button"
                          onClick={
                            item.quantity > 1 ? () => decreaseQuantity(index) : null
                          }
                        >
                          -
                        </Button>
                        <Button>{item.quantity}</Button>
                        <Button type="button" onClick={() => increaseQuantity(index)}>
                          +
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                    <TableCell align="center">
                      <Button onClick={() => removeItem(index)} className={classes.removeButton}>
                        Remove
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Typography style={{ fontWeight: "bold"}}>
                        ${(item.quantity * item.price).toFixed(2)}
                      </Typography>
                    </TableCell>
                  </TableRow>
              </TableBody>
            </Table>

          </TableContainer>
                </Grid>
                <Grid item xs={isMatch ? 0 : 3} />
                </Grid>

        ))}

        <Grid container>
              <Grid item xs={isMatch ? 0 : 3} />

              <Grid item xs={isMatch ? 12 : 6} >
                <Typography className={classes.totalPrice}>
                  Total Price: ${getTotal(products)}
                </Typography>

                <Link to={`/Checkout`} style={{ textDecoration: 'none' }}>
                  <Button fullWidth className={classes.totalCheckoutButton}>
                      Proceed to checkout
                  </Button>
                </Link>

                <Box m={2}>
                  <Link to={`/`} style={{ textDecoration: 'underline', textDecorationColor: 'black' }}>
                    <Typography variant="title" className={classes.continueShopping}>
                        Continue shopping
                    </Typography>
                  </Link>
                </Box>
              </Grid>

              <Grid item xs={isMatch ? 0 : 3} />

        </Grid>


      </div>

    );
}

export default Cart;
