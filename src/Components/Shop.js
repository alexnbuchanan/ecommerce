import React, { useState, useEffect } from 'react';
import './../App.css';
import * as ReactBootStrap from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Grid, Paper, CssBaseline, Button, Typography, useMediaQuery, useTheme} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import TopMenu from './TopMenu';

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
  const data = await fetch('https://fakestoreapi.com/products');
  const items = await data.json();
  setProducts(items)
  setLoading(true)
}

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
}
}));

// const TopMenu = () => {
//   const [clicked, setClick] = useState(false)
//   const toggleClick = () => setClick(clicked => !clicked);
//   return (
//     <Typography>
//       <Button onClick={toggleClick} className={classes.buttonFont}>
//         All items
//       </Button>
//
//     {clicked ? (
//       <div>
//         <Button onClick={() => setItem("men clothing")} className={classes.buttonFont} >
//           Men clothing
//         </Button><br/>
//         <Button onClick={() => setItem("women clothing")} className={classes.buttonFont} >
//           Women clothing
//         </Button><br/>
//         <Button onClick={() => setItem("jewelery")} className={classes.buttonFont} >
//           Jewelery
//         </Button><br/>
//         <Button onClick={() => setItem("electronics")} className={classes.buttonFont} >
//           Electronics
//         </Button>
//       </div>
//     ) : null}
//   </Typography>
//   );
// }

const BottomMenu = () => {
  const [clicked, setClick] = useState(false)
  const toggleClick = () => setClick(clicked => !clicked);
  return (
    <Typography>
      <Button onClick={toggleClick} className={classes.buttonFont}>
        Sort by Price
      </Button>

    {clicked ? (
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
  );
}

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();
    return (
        <div>
         <CssBaseline />
           <Grid container spacing={1} direction="column">
            <Grid item xs={12} container>

                <Grid item xs={3} />

                <Grid item xs={6} >
                  <Typography>
                    {isMatch ? <TopMenu setItem={setItem} />  : (
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
                {isMatch ? <BottomMenu /> : (
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
              <div className="gridContainer">
                {loading ?
                            (filterProducts.map((a, index) => (
                              <Link to={`/Item/${a.id}`}>
                                <div key={index} className="productStyle">
                                  <img src={a.image} className="productImage"></img>
                                  <p>{a.title}</p>
                                  <p>${priceUSD(a.price)}</p>
                                </div>
                              </Link>
                          )))  : (<ReactBootStrap.Spinner className="spinner" animation="border" />)
                          }
              </div>
        </div>
    )
}

export default Shop;
