import {
    Button,
    Container,
    InputAdornment,
    OutlinedInput,
    Paper,
    Snackbar,
    Typography,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import axios from "axios";
import React, { useState } from "react";
import { BaseUrl } from "../constants/baseUrl";
import useStyles from "./styles";
import {useHistory} from 'react-router-dom'
import validatePassword from "./validateChangePass";
import MuiAlert from "@material-ui/lab/Alert";
import { connect } from 'react-redux'
import { logoutUser } from '../Redux/actions/actions'

function ChangePass(props) {
    const classes = useStyles();
    const history = useHistory()
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);
    const [oldPass, setOldPass] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const togglePassword = (msg) => {
        if (msg === "newpass") {
            setShowNewPassword(showNewPassword ? false : true);
        } else if (msg === "confirmpass") {
            setshowConfirmPassword(showConfirmPassword ? false : true);
        } else if (msg === "oldpass") {
            setShowOldPassword(showOldPassword ? false : true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(validatePassword(oldPass, newPassword, confirmPassword));
        if (Object.keys(error).length === 0) {
            ChangePassword();
        }
    };

    const ChangePassword = () => {
        const userdata = JSON.parse(localStorage.getItem("userdata"));
        if (userdata) {
            const token = userdata.token;
            const pass = {
                password: oldPass,
                newPassword: newPassword
            }
            axios.post(`${BaseUrl}/api/user/change-password`, pass, {
                headers: {
                    Authorization: token
                }
            })
            .then(() => {
                if (newPassword === confirmPassword) {
                    handleClickSnackbar("success");
                    localStorage.removeItem("userdata");
                    // props.logoutUser()
                    // history.push("/login");
                }
            })
            .catch(() => {
                alert("Old Password is Incorrect")
            })
        }
    }
    //Snackbar functions
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
    return (
        <>
            <Paper elevation={2} className={classes.ChangePass_root_paper}>
                <Container>
                    <Typography
                        className={classes.recover_heading}
                        variant="h4"
                    >
                        Change Password
                    </Typography>
                    <hr className={classes.hor_rule}></hr>
                    <br />

                    <OutlinedInput
                        className={classes.input_field}
                        type={showOldPassword ? "text" : "password"}
                        value={oldPass}
                        onChange={(e) => {
                            setOldPass(e.target.value);
                        }}
                        placeholder="Old Password"
                        endAdornment={
                            <InputAdornment
                                onClick={() => togglePassword("oldpass")}
                            >
                                {showOldPassword ? (
                                    <Visibility />
                                ) : (
                                    <VisibilityOff />
                                )}
                            </InputAdornment>
                        }
                    />
                    <br/>
                    {error.oldPass && (
                        <small className={classes.error_msg}>
                            {error.oldPass}
                        </small>
                    )}

                    <br />
                    <br />

                    <OutlinedInput
                        className={classes.input_field}
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => {
                            setNewPassword(e.target.value);
                        }}
                        placeholder="New Password"
                        endAdornment={
                            <InputAdornment
                                onClick={() => togglePassword("newpass")}
                            >
                                {showNewPassword ? (
                                    <Visibility />
                                ) : (
                                    <VisibilityOff />
                                )}
                            </InputAdornment>
                        }
                    />
                    <br/>
                    {error.newPassword && (
                        <small className={classes.error_msg}>
                            {error.newPassword}
                        </small>
                    )}

                    <br />
                    <br />

                    <OutlinedInput
                        className={classes.input_field}
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                        placeholder="Confirm Password"
                        endAdornment={
                            <InputAdornment
                                onClick={() => togglePassword("confirmpass")}
                            >
                                {showConfirmPassword ? (
                                    <Visibility />
                                ) : (
                                    <VisibilityOff />
                                )}
                            </InputAdornment>
                        }
                    />
                    <br/>
                    {error.confirmPassword && (
                        <small className={classes.error_msg}>
                            {error.confirmPassword}
                        </small>
                    )}
                    <br />
                    <br />

                    <Button
                        className={classes.recover_button}
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Container>
            </Paper>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="success">
                    Password has been Changed
                </Alert>
            </Snackbar>
        </>
    );
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => {
        dispatch(logoutUser())
    }
})
export default connect(null, mapDispatchToProps)(ChangePass)
