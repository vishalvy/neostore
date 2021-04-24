import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Snackbar,
    TextField,
    Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import CancelPresentationOutlinedIcon from "@material-ui/icons/CancelPresentationOutlined";
import validateAddress from "./validateAddress";
import axios from "axios";
import { BaseUrl } from "../constants/baseUrl";
import MuiAlert from "@material-ui/lab/Alert";
import SweetAlert from "react-bootstrap-sweetalert";

function Address() {
    const classes = useStyles();
    const [openForm, setOpenForm] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [addressList, setAddressList] = useState();
    const [addressLine, setAddressLine] = useState("");
    const [pincode, setPincode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [error, setError] = useState({});
    const [sweetAlert, setSweetAlert] = useState(null);

    const handleClickOpenForm = () => {
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
    };
    const handleClickSnackbar = (msg) => {
        if (msg === "success") {
            setOpenSnackbar(true);
        }
    };
    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        setError(validateAddress(addressLine, pincode, city, state, country));
        if (Object.keys(error).length === 0) {
            setOpenForm(false);
            AddAddress();
        }
    };

    const userdata = JSON.parse(localStorage.getItem("userdata"));
    const token = userdata.token;
    const AddAddress = () => {
        const address = {
            addressLine: addressLine,
            pincode: pincode,
            city: city,
            state: state,
            country: country,
        };

        axios
            .post(`${BaseUrl}/api/user/address`, address, {
                headers: {
                    Authorization: `${token}`,
                },
            })
            .then(() => {
                handleClickSnackbar("success");
            });
    };

    const deleteCall = (address_id) => {
        axios
            .delete(`${BaseUrl}/api/user/address/${address_id}`, {
                headers: {
                    Authorization: `${token}`,
                },
            })
        hideAlert();
    };

    const deleteAddress = (id) => {
        const getAlert = () => (
            <SweetAlert
                warning
                showCancel
                confirmBtnText="Yes, remove it!"
                confirmBtnBsStyle="danger"
                title="Are you sure?"
                onConfirm={() => deleteCall(id)}
                onCancel={() => hideAlert()}
                focusCancelBtn
            >
                Are you sure, want to remove this Address?
            </SweetAlert>
        );
        setSweetAlert(getAlert());
    };
    const hideAlert = () => {
        setSweetAlert(null);
    };

    useEffect(() => {
        axios
            .get(`${BaseUrl}/api/user/address`, {
                headers: {
                    Authorization: `${token}`,
                },
            })
            .then((res) => {
                console.log(res.data.data.address);
                const temp = res.data.data.address;
                setAddressList(temp);
            });
    }, [addressList]);

    return (
        <>
            <Paper className={classes.address_root_paper}>
                <Container>
                    <Typography className={classes.address_heading}>
                        Address
                    </Typography>
                    <hr className={classes.hor_rule}></hr>
                    {addressList &&
                        addressList.map((address, index) => (
                            <Paper
                                className={classes.address_paper}
                                key={index}
                            >
                                <Container>
                                    <IconButton
                                        className={classes.cancel_icon}
                                        color="secondary"
                                        component="span"
                                        onClick={() =>
                                            deleteAddress(address._id)
                                        }
                                    >
                                        <CancelPresentationOutlinedIcon />
                                    </IconButton>
                                    <Typography
                                        className={classes.address_text}
                                    >
                                        {address.addressLine},<br />
                                        {address.city}:-{address.pincode}
                                        <br />
                                        {address.state} <br />
                                        {address.country}
                                    </Typography>

                                    <Button variant="contained" color="primary">
                                        Edit
                                    </Button>
                                    <br />
                                    <br />
                                </Container>
                            </Paper>
                        ))}
                    <hr className={classes.hor_rule}></hr>
                    <Button
                        onClick={handleClickOpenForm}
                        className={classes.add_address_btn}
                        variant="contained"
                    >
                        Add Address
                    </Button>
                </Container>
            </Paper>

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
                        type="text"
                        fullWidth
                        value={addressLine}
                        onChange={(e) => setAddressLine(e.target.value)}
                    />
                    {error.addressLine && (
                        <small className={classes.error_msg}>
                            {error.addressLine}
                        </small>
                    )}
                    <TextField
                        margin="dense"
                        label="Pincode"
                        type="text"
                        fullWidth
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                    />
                    {error.pincode && (
                        <small className={classes.error_msg}>
                            {error.pincode}
                        </small>
                    )}
                    <TextField
                        margin="dense"
                        label="City"
                        type="text"
                        fullWidth
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    {error.city && (
                        <small className={classes.error_msg}>
                            {error.city}
                        </small>
                    )}
                    <TextField
                        margin="dense"
                        label="State"
                        type="text"
                        fullWidth
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                    {error.state && (
                        <small className={classes.error_msg}>
                            {error.state}
                        </small>
                    )}
                    <TextField
                        margin="dense"
                        label="Country"
                        type="text"
                        fullWidth
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
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

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="success">
                    Address has been Added
                </Alert>
            </Snackbar>

            {sweetAlert}
        </>
    );
}
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default Address;
