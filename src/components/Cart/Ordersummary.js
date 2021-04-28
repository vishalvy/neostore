import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, Snackbar, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../constants/baseUrl';
import useStyles from './ordersummarystyles'
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from 'react-router';
import AddIcon from '@material-ui/icons/Add';
import validateAddress from '../OrderModule/validateAddress'

function Ordersummary() {
    const classes = useStyles()
    const history = useHistory()
    const [addressList, setAddressList] = useState()
    const [productsList, setProductsList] = useState()
    const [selectedAddress, setSelectedAddress] = useState()
    const [openSnackbarPlaced, setOpenSnackbarPlaced] = useState(false);
    const [openSnackbarSelected, setOpenSnackbarSelected] = useState(false);
    const [openSnackbarError, setOpenSnackbarError] = useState(false);
    const [error, setError] = useState({});
    const [openForm, setOpenForm] = useState(false);
    const [addressData, setAddressData] = useState({
        addressLine: "",
        pincode: "",
        city: "",
        state: "",
        country: "",
    })

    //Add Address  Form handle Change Function
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddressData({
            ...addressData,
            [name]: value
        })
    }

    //Add Address Handle Open Form functions
    const handleOpenForm = () => {
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
    };

    //Add Address Form Submit Function 
    const handleFormSubmit = (e) => {
        e.preventDefault();

        setError(validateAddress(addressData.addressLine, addressData.pincode, addressData.city, addressData.state, addressData.country));
        if (Object.keys(error).length === 0) {
            setOpenForm(false);
            AddAddress();
        }
    };


    const AddAddress = () => {
        const userdata = JSON.parse(localStorage.getItem("userdata"));
        const address = {
            addressLine: addressData.addressLine,
            pincode: addressData.pincode,
            city: addressData.city,
            state: addressData.state,
            country: addressData.country,
        };
        if (userdata) {
            const token = userdata.token;
            axios
            .post(`${BaseUrl}/api/user/address`, address, {
                headers: {
                    Authorization: `${token}`,
                },
            })
            .then(() => {
                handleClickSnackbar("success");
            });
        }   
    };


    //Order Summary UseEffect
    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem("userdata"));
        if (userdata) {
            const token = userdata.token;
            //get Address data
            axios.get(`${BaseUrl}/api/user/address`, {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                setAddressList(res.data.data.address)
            })

            //get products data
            axios.get(`${BaseUrl}/api/cart`, {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                setProductsList(res.data.data.products)
            })
        }
    }, [addressList])


    //Snackbar Functions
    const handleClickSnackbar = (msg) => {
        if (msg === "placed") {
            setOpenSnackbarPlaced(true);
        }
        else if (msg === "selected") {
            setOpenSnackbarSelected(true);
        }
        else if (msg === "error") {
            setOpenSnackbarError(true);
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
    const handleCloseSnackbarError = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbarError(false);
    };

    

    //Select Address Function
    const selectAddress = (id) => {
        console.log(id)
        setSelectedAddress(id)
        handleClickSnackbar("selected");
    }

    //Place Order Function
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
            .then(() => {
                handleClickSnackbar("placed");
                setTimeout(() => {
                    history.push('/profile')
                },2000)
            })
            .catch(() => {
                handleClickSnackbar("error");
            })
        }
    }


    return (
        <>
            <Container className={classes.root_container}>
                <Typography variant="h4" style={{ fontWeight: "bold" }}>
                    Confirm Address
                </Typography>
                <hr className={classes.hor_rule}></hr>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={7} lg={7}>

                    <Paper className={classes.root_paper}>
                            <Container>
                                <Typography variant="h5" style={{ fontWeight: "bold" }}> 
                                    Select Address
                                </Typography>

                                <hr className={classes.hor_rule}></hr>
                                <br />

                                <Button
                                    onClick={handleOpenForm}
                                    className={classes.add_address_btn}
                                    variant="contained"
                                    color="primary"
                                >
                                    <AddIcon />Add
                                </Button>
                                {
                                    addressList && addressList.map((address, index) => (
                                    <div key={index}>
                                        <Paper>
                                            <Container style={(selectedAddress === address._id ? {backgroundColor: "#EFC768"} : {})}>
                                                <Typography style={{ fontWeight: "bold" }}>
                                                ------ Address {index + 1}-------
                                                </Typography>
                                               {/* <br/> */}
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

                    <Grid item xs={12} sm={12} md={5} lg={5}>
                        <Container>
                            <Typography variant="h5" style={{ fontWeight: "bold" }}>
                                Products Summary
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
                                                        alt="" width="35%" height="35%"
                                                    />
                                                    <br/><br/>
                                                    <Typography style={{ fontWeight: "bold" }}>
                                                        {product.productId.name}
                                                    </Typography>
                                                    
                                                    <Typography style={{ color: "green" }}>
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
                <Snackbar
                    open={openSnackbarError}
                    autoHideDuration={2000}
                    onClose={handleCloseSnackbarError}
                >
                    <Alert onClose={handleCloseSnackbarError} severity="error">
                        Please Select Address
                    </Alert>
                </Snackbar>
            </Container>

            <Dialog
                open={openForm}
                onClose={handleCloseForm}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Enter Address</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Address Line"
                        name="addressLine"
                        type="text"
                        fullWidth
                        value={addressData.addressLine}
                        onChange={handleChange}
                        // onChange={(e) => setAddressLine(e.target.value)}
                    />
                    {error.addressLine && (
                        <small className={classes.error_msg}>
                            {error.addressLine}
                        </small>
                    )}
                    <TextField
                        margin="dense"
                        label="Pincode"
                        name="pincode"
                        type="text"
                        fullWidth
                        value={addressData.pincode}
                        onChange={handleChange}
                        // onChange={(e) => setPincode(e.target.value)}
                    />
                    {error.pincode && (
                        <small className={classes.error_msg}>
                            {error.pincode}
                        </small>
                    )}
                    <TextField
                        margin="dense"
                        label="City"
                        name="city"
                        type="text"
                        fullWidth
                        value={addressData.city}
                        onChange={handleChange}
                        // onChange={(e) => setCity(e.target.value)}
                    />
                    {error.city && (
                        <small className={classes.error_msg}>
                            {error.city}
                        </small>
                    )}
                    <TextField
                        margin="dense"
                        label="State"
                        name="state"
                        type="text"
                        fullWidth
                        value={addressData.state}
                        onChange={handleChange}
                        // onChange={(e) => setState(e.target.value)}
                    />
                    {error.state && (
                        <small className={classes.error_msg}>
                            {error.state}
                        </small>
                    )}
                    <TextField
                        margin="dense"
                        label="Country"
                        name="country"
                        type="text"
                        fullWidth
                        value={addressData.country}
                        onChange={handleChange}
                        // onChange={(e) => setCountry(e.target.value)}
                    />
                    {error.country && (
                        <small className={classes.error_msg}>
                            {error.country}
                        </small>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={handleCloseForm}
                        color="secondary"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={handleFormSubmit}
                        color="primary"
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default Ordersummary
