import { Button } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router'
import useStyles from './styles'
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EmptyCartImage from '../../emptycart.png'

function EmptyCart() {
    const history = useHistory()
    const classes = useStyles()
    return (
        <>
           <img
                className={classes.empty_cart}
                src={EmptyCartImage}
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
