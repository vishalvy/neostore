import { Button, Container, Grid, Paper, Snackbar, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../constants/baseUrl';
import useStyles from './ordersummarystyles'
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from 'react-router';

function Ordersummary() {
    const classes = useStyles()
    const history = useHistory()
    const [addressList, setAddressList] = useState()
    const [productsList, setProductsList] = useState()
    const [selectedAddress, setSelectedAddress] = useState()
    const [openSnackbarPlaced, setOpenSnackbarPlaced] = useState(false);
    const [openSnackbarSelected, setOpenSnackbarSelected] = useState(false);

    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem("userdata"));
        if (userdata) {
            const token = userdata.token;
            axios.get(`${BaseUrl}/api/user/address`, {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                setAddressList(res.data.data.address)
            })


            axios.get(`${BaseUrl}/api/cart`, {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                setProductsList(res.data.data.products)
            })
        }
    }, [])


    //Snackbar
    const handleClickSnackbar = (msg) => {
        if (msg === "placed") {
            setOpenSnackbarPlaced(true);
        }
        else if (msg === "selected") {
            setOpenSnackbarSelected(true);
        }
    };
    const handleCloseSnackbarPlaced = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbarPlaced(false)
    };

    const handleCloseSnackbarSelected = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbarSelected(false);
    };

    


    const selectAddress = (id) => {
        console.log(id)
        setSelectedAddress(id)
        handleClickSnackbar("selected");
    }
    const placeOrder = () => {
        const userdata = JSON.parse(localStorage.getItem("userdata"));
        if (userdata) {
            const token = userdata.token;
            const addressID= {
                addressId: `${selectedAddress}`
            }
            axios.post(`${BaseUrl}/api/order/place`,addressID,{
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                handleClickSnackbar("placed");
                setTimeout(() => {
                    history.push('/profile')
                },2000)
            })
        }
    }


    return (
        <>
            <Container className={classes.root_container}>
                <Typography variant="h4">
                    Confirm Address
                </Typography>
                <hr className={classes.hor_rule}></hr>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={8} lg={8}>
    
                            <Container>
                                <Typography variant="h5">
                                    Products List
                                </Typography>
                                <hr className={classes.hor_rule}></hr>
                                <br />
                                
                                {
                                    productsList && productsList.map((product, index) => (
                                        <div key={index}>
                                            <Paper>
                                                <Container>
                                                    <div>
                                                        <img

                                                            src={product.productId.mainImage}
                                                            alt="" width="15%" height="15%"
                                                        />
                                                        <br/><br/>
                                                        <Typography>
                                                            {product.productId.name}
                                                        </Typography>
                                                        <br/>
                                                        <Typography>
                                                            Quantity: {product.quantity}
                                                        </Typography>
                                                    </div>      
                                                </Container>

                                            </Paper>
                                            <br/>
                                        </div>
                                    )
                                )}
                            </Container>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <Paper className={classes.root_paper}>
                            <Container>
                                <Typography variant="h5"> 
                                    Select Address
                                </Typography>
                                <hr className={classes.hor_rule}></hr>
                                <br/>
                                {
                                    addressList && addressList.map((address, index) => (
                                    <div key={index}>
                                        <Paper>
                                            <Container>
                                                <Typography>
                                                ------ Address {index + 1}-------
                                                </Typography>
                                               
                                                <Typography className={classes.address_text}>
                                                    {address.addressLine} <br />
                                                    {address.pincode} <br />
                                                    {address.city} <br />
                                                    {address.state} <br />
                                                    {address.country}
                                                    </Typography>
                                                    <br/>
                                                    <Button
                                                        onClick={() => selectAddress(address._id)}
                                                        className={classes.select_button}
                                                        size="small"
                                                        variant="contained" color="primary">
                                                        Select
                                                    </Button>
                                            </Container>
                                        </Paper> 
                                        <br />
                                    </div>
                                    )
                                )}
                                <Button
                                    onClick={placeOrder}
                                    className={classes.place_order_btn}
                                    variant="contained" color="primary">
                                    Place Order
                                </Button>
                            </Container>
                        </Paper>
                    </Grid>
                </Grid>
                <Snackbar
                    open={openSnackbarPlaced}
                    autoHideDuration={2000}
                    onClose={handleCloseSnackbarPlaced}
                >
                    <Alert onClose={handleCloseSnackbarPlaced} severity="success">
                        Order Placed
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={openSnackbarSelected}
                    autoHideDuration={2000}
                    onClose={handleCloseSnackbarSelected}
                >
                    <Alert onClose={handleCloseSnackbarSelected} severity="success">
                        Address Selected
                    </Alert>
                </Snackbar>
                
            </Container>
        </>
    )
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default Ordersummary
