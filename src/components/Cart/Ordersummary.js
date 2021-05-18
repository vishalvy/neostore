import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../constants/baseUrl";
import useStyles from "./ordersummarystyles";
import AddIcon from "@material-ui/icons/Add";
import validateAddress from "../OrderModule/validateAddress";
import Loader from "../Loader";
import SnackbarAlert from "../constants/SnackbarAlert";
import Googlepay from "./Googlepay";
import {connect} from 'react-redux'
import PaymentIcon from '@material-ui/icons/Payment';
import { useHistory } from "react-router";


function Ordersummary(props) {
    const classes = useStyles();
    const history = useHistory()
    const [addressList, setAddressList] = useState();
    const [activeStep, setActiveStep] = useState(1);
    const [selectedAddress, setSelectedAddress] = useState();
    const [openSnackbarPlaced, setOpenSnackbarPlaced] = useState(false);
    const [openSnackbarSelected, setOpenSnackbarSelected] = useState(false);
    const [openSnackbarError, setOpenSnackbarError] = useState(false);
    const [error, setError] = useState({});
    const [openForm, setOpenForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [addressPage, setAddressPage] = useState(true)
    const [paymentPage,setPaymentPage] = useState(false)

    const [addressData, setAddressData] = useState({
        addressLine: "",
        pincode: "",
        city: "",
        state: "",
        country: "",
    });

    //Select Address Function
    const AddAddress = () => {
        /**
         * @author Vishal Yadav
         * @param userdata                      Store logged In userdata from localstorage  
         * @function address                    To send the Address Data along with Post Request
         * @function handleClickSnackbar        Call the Success Snackbar Function
         * @package axios                       Library to make HTTP request 
        */
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
    //Select Address Function
    const selectAddress = (id) => {
        /**
         * @author Vishal Yadav
         * @param id                            ID of Selected Address
         * @function setSelectedAddress         useState() hook function call to update the Selected Address Id
         * @function handleClickSnackbar        Call the Selected Success Snackbar 
         * @function setPaymentPage             useState() hook function call to make visible the payment page
         * @function setAddressPage             useState() hook function call to Hide the Address page
         * @function setActiveStep              useState() hook function call to increment the Active step of stepper
         * 
        */
        setSelectedAddress(id);
        handleClickSnackbar("selected");
        setTimeout(() => {
            setPaymentPage(true)
            setAddressPage(false)
        },1000)
        setActiveStep(activeStep + 1)
    };

    //Add Address Form Submit Function
    const handleFormSubmit = (e) => {
        e.preventDefault();
        setError(
            validateAddress(
                addressData.addressLine,
                addressData.pincode,
                addressData.city,
                addressData.state,
                addressData.country
            )
        );
        if (Object.keys(error).length === 0) {
            setOpenForm(false);
            AddAddress();
        }
    };

    //Add Address  Form handle Change Function
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddressData({
            ...addressData,
            [name]: value,
        });
    };

    //Add Address Handle Open Form functions
    const handleOpenForm = () => {
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
    };

    

    //Order Summary UseEffect
    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem("userdata"));
        if (userdata) {
            const token = userdata.token;
            //get Address data
            axios
                .get(`${BaseUrl}/api/user/address`, {
                    headers: {
                        Authorization: token,
                    },
                })
                .then((res) => {
                    setAddressList(res.data.data.address);
                    setLoading(false);
                });
        }
        if (props.isLogin) {
            history.push("/ordersummary")
        }
        else {
            history.push("/login")
        }
    }, [addressList,history]);

    //Snackbar Functions
    const handleClickSnackbar = (msg) => {
        if (msg === "placed") {
            setOpenSnackbarPlaced(true);
        } else if (msg === "selected") {
            setOpenSnackbarSelected(true);
        } else if (msg === "error") {
            setOpenSnackbarError(true);
        }
    };
    const handleCloseSnackbarPlaced = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbarPlaced(false);
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


    return (
        <>
            {
                loading ? <Loader /> :
                <div>
                    <Container className={classes.root_container}>
                        <div className={classes.stepper_root}>
                            <Stepper style={{backgroundColor: "rgb(243, 241, 241)"}} activeStep={activeStep}>
                                <Step>
                                    <StepLabel>Cart</StepLabel>
                                </Step>
                                <Step>
                                    <StepLabel>
                                        Delivery Address
                                    </StepLabel>
                                </Step>
                            </Stepper>
                        </div>
 
                        { addressPage &&
                            <Paper className={classes.root_paper_address}>
                                <Container>
                                    <Typography
                                        variant="h5"
                                        style={{ paddingTop: "1%" ,fontWeight: "bold" ,fontSize: "4.5vh" }}
                                    >
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
                                        <AddIcon />
                                        Add
                                    </Button>
                                    {addressList &&
                                        addressList.map((address, index) => (
                                            <div key={index}>
                                                <Paper>
                                                    <Container
                                                        style={
                                                            selectedAddress === address._id ? {backgroundColor:"#EFC768",} : {}
                                                        }
                                                    >
                                                        <Typography style={{fontWeight: "bold"}}>
                                                            ------ Address{" "}{index + 1} -------
                                                        </Typography>
                                                        
                                                        <Typography className={classes.address_text}>
                                                            {address.addressLine}{" "}
                                                            <br />
                                                            {address.pincode}{" "}
                                                            <br />
                                                            {address.city}{" "}
                                                            <br />
                                                            {address.state}{" "}
                                                            <br />
                                                            {address.country}
                                                        </Typography>
                                                        <br />
                                                        <Button
                                                            onClick={() =>
                                                                selectAddress(address._id)
                                                            }
                                                            className={
                                                                classes.select_button
                                                            }
                                                            size="small"
                                                            variant="contained"
                                                            color="primary"
                                                        >
                                                            Select
                                                        </Button>
                                                    </Container>
                                                </Paper>
                                                <br />
                                            </div>
                                            )
                                        )}
                                    </Container>
                                </Paper>
                      
                            }

                            { paymentPage &&
                                <Paper className={classes.root_paper_payment}>
                                <Container>
                                        <Typography
                                            variant="h5"
                                            className={classes.select_payment_text}
                                        >
                                            Select Payment Gateway 
                                        </Typography>
                                        <hr className={classes.hor_rule}></hr>
                                        <br />

                                        <Paper className={classes.googlepay_paper}>
                                            <Container>
                                                <Typography className={classes.googlepay_text}>
                                                    Pay with Google Pay <PaymentIcon fontSize="large"/>
                                                </Typography>
                                                    <Googlepay selectedAddress={selectedAddress}/>
                                                <br />
                                                <br />
                                            </Container>
                                        </Paper>
                                        <br/>                 
                                    </Container>
                                </Paper>
                       
                            }
                  

                        <SnackbarAlert 
                            open={openSnackbarPlaced} close={handleCloseSnackbarPlaced} 
                            type={"success"} msg={"Order Placed"}
                        />
                        <SnackbarAlert
                            open={openSnackbarSelected} close={handleCloseSnackbarSelected}
                            type={"success"} msg={"Address Selected"}
                        />
                        <SnackbarAlert
                            open={openSnackbarError} close={handleCloseSnackbarError}
                            type={"error"} msg={"Please Select Address"}
                        />
                    </Container>

                    <Dialog
                        open={openForm}
                        onClose={handleCloseForm}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">
                            Enter Address
                        </DialogTitle>
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
                </div>
            }
        </>
    );
}

const mapStateToProps = (state) => ({
    isLogin : state.perReducer.isLogin
})

export default connect(mapStateToProps,null)(Ordersummary);
