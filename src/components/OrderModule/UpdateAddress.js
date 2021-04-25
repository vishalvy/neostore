// import React, { useState } from "react";
// import validateAddress from './validateAddress'

// function UpdateAddress() {
//     const [openForm, setOpenForm] = useState(false);
//     const [openSnackbar, setOpenSnackbar] = useState(false);
//     const [addressList, setAddressList] = useState();
//     const [addressLine, setAddressLine] = useState("");
//     const [pincode, setPincode] = useState("");
//     const [city, setCity] = useState("");
//     const [state, setState] = useState("");
//     const [country, setCountry] = useState("");
//     const [error, setError] = useState({});

//     const handleClickOpenForm = () => {
//         setOpenForm(true);
//     };

//     const handleCloseForm = () => {
//         setOpenForm(false);
//     };
//     const handleClickSnackbar = (msg) => {
//         if (msg === "success") {
//             setOpenSnackbar(true);
//         }
//     };
//     const handleCloseSnackbar = (event, reason) => {
//         if (reason === "clickaway") {
//             return;
//         }
//         setOpenSnackbar(false);
//     };

//     const handleFormSubmit = (e) => {
//         e.preventDefault();

//         setError(validateAddress(addressLine, pincode, city, state, country));
//         if (Object.keys(error).length === 0) {
//             setOpenForm(false);
//             // AddAddress();
//         }
//     };
//     return (
//         <>
//             <Dialog
//                 open={openForm}
//                 onClose={handleCloseForm}
//                 aria-labelledby="form-dialog-title"
//             >
//                 <DialogTitle id="form-dialog-title">Enter Address</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         autoFocus
//                         margin="dense"
//                         label="Address Line"
//                         type="text"
//                         fullWidth
//                         value={addressLine}
//                         onChange={(e) => setAddressLine(e.target.value)}
//                     />
//                     {error.addressLine && (
//                         <small className={classes.error_msg}>
//                             {error.addressLine}
//                         </small>
//                     )}
//                     <TextField
//                         margin="dense"
//                         label="Pincode"
//                         type="text"
//                         fullWidth
//                         value={pincode}
//                         onChange={(e) => setPincode(e.target.value)}
//                     />
//                     {error.pincode && (
//                         <small className={classes.error_msg}>
//                             {error.pincode}
//                         </small>
//                     )}
//                     <TextField
//                         margin="dense"
//                         label="City"
//                         type="text"
//                         fullWidth
//                         value={city}
//                         onChange={(e) => setCity(e.target.value)}
//                     />
//                     {error.city && (
//                         <small className={classes.error_msg}>
//                             {error.city}
//                         </small>
//                     )}
//                     <TextField
//                         margin="dense"
//                         label="State"
//                         type="text"
//                         fullWidth
//                         value={state}
//                         onChange={(e) => setState(e.target.value)}
//                     />
//                     {error.state && (
//                         <small className={classes.error_msg}>
//                             {error.state}
//                         </small>
//                     )}
//                     <TextField
//                         margin="dense"
//                         label="Country"
//                         type="text"
//                         fullWidth
//                         value={country}
//                         onChange={(e) => setCountry(e.target.value)}
//                     />
//                     {error.country && (
//                         <small className={classes.error_msg}>
//                             {error.country}
//                         </small>
//                     )}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button
//                         variant="outlined"
//                         onClick={handleCloseForm}
//                         color="secondary"
//                     >
//                         Cancel
//                     </Button>
//                     <Button
//                         variant="outlined"
//                         onClick={handleFormSubmit}
//                         color="primary"
//                     >
//                         Submit
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </>
//     );
// }

// export default UpdateAddress;
