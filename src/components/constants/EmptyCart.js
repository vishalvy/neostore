import { Button } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router'
import useStyles from './styles'
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function EmptyCart() {
    const history = useHistory()
    const classes = useStyles()
    return (
        <>
           <img
                className={classes.empty_cart}
                src="https://www.kindpng.com/picc/m/174-1749396_empty-cart-your-cart-is-empty-hd-png.png"
                alt="Cart Is Empty"
            />
            <br />
            <br />
            <Button
                onClick={() => history.push("/allproducts")}
                variant="outlined"
                color="primary"
            >
                <ArrowBackIcon />
                Get Products
            </Button> 
        </>
    )
}

export default EmptyCart
