import { Container, Grid, } from '@material-ui/core'
import React from 'react'
import Cards from './cards'
import useStyles from './styles'
import { Pagination } from '@material-ui/lab'

function CommonProductsCards(props) {
    const classes = useStyles()
    return (
        <>
            <Container>
                <Grid container spacing={3} className={classes.card_container}>
                    {   
                       props.products.map((product,index) => (
                            <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                                <Cards product={product}
                                    image={product.image.image1} title={product.title} 
                                    price={product.price} rating={product.rating}/>   
                            </Grid>
                        ))
                    }
                </Grid>
                <div className={classes.pagination_root}>
                    <Pagination count={10} shape="rounded" />
                </div>
            </Container>
        </>
    )
}

export default CommonProductsCards
