import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    TextField,
    Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import CancelPresentationOutlinedIcon from "@material-ui/icons/CancelPresentationOutlined";
import validateAddress from "./validateAddress";
import axios from "axios";
import { BaseUrl } from "../constants/baseUrl";
import SweetAlert from "react-bootstrap-sweetalert";
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Loader from "../Loader";
import SnackbarAlert from "../constants/SnackbarAlert";


function Address() {
    const classes = useStyles();
    const [openForm, setOpenForm] = useState(false);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openUpdateSnackbar, setOpenUpdateSnackbar] = useState(false);
    const [addressList, setAddressList] = useState();
    const [error, setError] = useState({});
    const [sweetAlert, setSweetAlert] = useState(null);
    const [addressId, setAddressId] = useState()
    const [loading, setLoading] = useState(true)
    
    const [addressData, setAddressData] = useState({
        addressLine: "",
        pincode: "",
        city: "",
        state: "",
        country: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddressData({
            ...addressData,
            [name]: value
        })
    }

    //Snackbar Functions--------------
    const handleClickSnackbar = (msg) => {
        if (msg === "added") {
            setOpenSnackbar(true);
        }
        else if (msg === "updated") {
            setOpenUpdateSnackbar(true)
        }
    };
    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbar(false);
    };
    
    const handleCloseUpdateSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenUpdateSnackbar(false);
    };

    // Add Address form handleSubmit 
    const handleFormSubmit = (e) => {
        e.preventDefault();

        setError(validateAddress(addressData.addressLine, addressData.pincode, addressData.city, addressData.state, addressData.country));
        if (Object.keys(error).length === 0) {
            setOpenForm(false);
            AddAddress();
        }
    };

    //Add address function
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
                handleClickSnackbar("added");
            });
        }   
    };

    // Edit Address form function
    const handleEditFormSubmit = (e) => {
        e.preventDefault();

        setError(validateAddress(addressData.addressLine, addressData.pincode, addressData.city, addressData.state, addressData.country));
        if (Object.keys(error).length === 0) {
            setOpenEditForm(false);
            EditAddress();
        }
    };

    const handleEdit = (address) => {
        setAddressData({
            addressLine: address.addressLine,
            pincode: address.pincode,
            city: address.city,
            state: address.state,
            country: address.country,
        })
        setAddressId(address._id)
        handleOpenEditForm(true)
    }

    const EditAddress = () => {
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
            .put(`${BaseUrl}/api/user/address/${addressId}`, address, {
                headers: {
                    Authorization: `${token}`,
                },
            })
            .then(() => {
                handleClickSnackbar("updated");
            });
        }
        
    };


    // Delete Address Functions----------------
    const deleteAddressCall = (address_id) => {
        const userdata = JSON.parse(localStorage.getItem("userdata"));
        if (userdata) {
            const token = userdata.token;
            axios
            .delete(`${BaseUrl}/api/user/address/${address_id}`, {
                headers: {
                    Authorization: `${token}`,
                },
            })
        hideAlert();
        }
        
    };

    const deleteAddress = (id) => {
        const getAlert = () => (
            <SweetAlert
                warning
                showCancel
                confirmBtnText="Yes, remove it!"
                confirmBtnBsStyle="danger"
                title="Are you sure?"
                onConfirm={() => deleteAddressCall(id)}
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


    //Form Open and Close Function--------------
    const handleOpenForm = () => {
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
    };

    const handleOpenEditForm = () => {
        setOpenEditForm(true);
    };

    const handleCloseEditForm = () => {
        setOpenEditForm(false);
    };


    // UseEffect 
    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem("userdata"));
        if (userdata) {
            const token = userdata.token;
            axios
                .get(`${BaseUrl}/api/user/address`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                })
                .then((res) => {
                    const temp = res.data.data.address;
                    setAddressList(temp);
                    setLoading(false)
                })
        }
    }, [addressList]);

    return (
        <>{
            loading ? <Loader/> :
            <div>
                <Paper className={classes.address_root_paper}>
                    <Container>
                        <Typography className={classes.address_heading}>
                            Address
                    </Typography>
                        <hr className={classes.hor_rule}></hr>
                        <Button
                            onClick={handleOpenForm}
                            className={classes.add_address_btn}
                            variant="contained"
                        >
                            <AddIcon /> Add
                    </Button>
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
                                            {address.city} - {address.pincode}
                                            <br />
                                            {address.state} <br />
                                            {address.country}
                                        </Typography>

                                        <Button
                                            onClick={() => handleEdit(address)}
                                            variant="contained" color="primary">
                                            <EditIcon fontSize="small" />Edit
                                        </Button>
                                        <br />
                                        <br />
                                    </Container>
                                </Paper>
                            ))}
                        <hr className={classes.hor_rule}></hr>
                    
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

                <Dialog
                    open={openEditForm}
                    onClose={handleCloseEditForm}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Edit Address</DialogTitle>
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
                        {error.addressLine && <small className={classes.error_msg}>{error.addressLine}</small>}
                        <TextField
                            margin="dense"
                            label="Pincode"
                            name="pincode"
                            type="text"
                            fullWidth
                            value={addressData.pincode}
                            onChange={handleChange}
                       
                        />
                        {error.pincode && <small className={classes.error_msg}>{error.pincode}</small>}
                        <TextField
                            margin="dense"
                            label="City"
                            name="city"
                            type="text"
                            fullWidth
                            value={addressData.city}
                            onChange={handleChange}
                        />
                        {error.city && <small className={classes.error_msg}>{error.city}</small>}
                        <TextField
                            margin="dense"
                            label="State"
                            name="state"
                            type="text"
                            fullWidth
                            value={addressData.state}
                            onChange={handleChange}
                    
                        />
                        {error.state && <small className={classes.error_msg}>{error.state}</small>}
                        <TextField
                            margin="dense"
                            label="Country"
                            name="country"
                            type="text"
                            fullWidth
                            value={addressData.country}
                            onChange={handleChange}
                       
                        />
                        {error.country && <small className={classes.error_msg}>{error.country}</small>}
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="outlined"
                            onClick={handleCloseEditForm}
                            color="secondary"
                        >
                            Cancel
                    </Button>
                        <Button
                            variant="outlined"
                            onClick={handleEditFormSubmit}
                            color="primary"
                        >
                            Submit
                    </Button>
                    </DialogActions>
                </Dialog>


                <SnackbarAlert open={openSnackbar} close={handleCloseSnackbar} type={"success"} msg={"Address has been Added"} />
                <SnackbarAlert open={openUpdateSnackbar} close={handleCloseUpdateSnackbar} type={"success"} msg={"Address has been Updated"} />
                
                {/* Sweet Alert Call */}
                {sweetAlert}
            </div>
        }
    </>
    );
}

export default Address;