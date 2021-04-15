import React from 'react'
import Grid from '@material-ui/core/Grid';
import Cards from './cards'
import { Container } from '@material-ui/core';
import Products from './products'
import useStyles from './productstyles'
import Typography from '@material-ui/core/Typography'
import {Link,useHistory} from 'react-router-dom'

function TopProducts() {
    const classes = useStyles();
    const history = useHistory()
    return (
        <Container className={classes.top_product_container}>
            <Typography variant="h6" className={classes.cards_header}>
                Popular Products
            </Typography>
            <Link onClick={() => history.push("/allproducts")}>See All</Link> 
            <Grid container spacing={3} className={classes.card_container}>
                {   
                    Products.map((product,index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                            <Cards image={product.image} title={product.title} 
                            price={product.price} rating={product.rating}/>   
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    )
}
export default TopProducts
