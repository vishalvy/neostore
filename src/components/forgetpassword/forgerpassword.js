import React, { useState } from "react";
import {
    Container,
    Grid,
    Paper,
    Typography,
    OutlinedInput,
    InputAdornment,
    Button,
} from "@material-ui/core";
import useStyles from "./forgetpasswordstyles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InfoIcon from "@material-ui/icons/Info";
import validate from "./validate";
import axios from "axios";
import { BaseUrl } from "../constants/baseUrl";

function ForgetPassword() {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({});
    const [codeMsg, setCodeMsg] = useState(false);

    const togglePassword = () => {
        setShowPassword(showPassword ? false : true);
    };
    const toggleConfirmPassword = () => {
        setshowConfirmPassword(showConfirmPassword ? false : true);
    };

    const handleSubmit = (e) => {
        setError(validate(password, confirmpassword));
        e.preventDefault();
    };

    const sendCode = () => {
        setCodeMsg(true);
        const user_email = {
            email: email,
        };
        axios.post(`${BaseUrl}/api/auth/forgot-password}`, user_email);
    };
    return (
        <>
            <Paper elevation={2} className={classes.recover_paper}>
                <Container>
                    <Typography
                        className={classes.recover_heading}
                        variant="h4"
                    >
                        Recover Password
                    </Typography>
                    <hr className={classes.hor_rule}></hr>
                    {codeMsg && (
                        <small className={classes.code_sent_message}>
                            <InfoIcon />
                            Verification code has been sent to your registered
                            Mail ID
                        </small>
                    )}

                    {codeMsg === false && (
                        <>
                            {" "}
                            <OutlinedInput
                                className={classes.input_field}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                placeholder="Enter Email"
                            />
                            <Button
                                onClick={sendCode}
                                className={classes.getcode_btn}
                                variant="contained"
                                color="primary"
                            >
                                Get Code
                            </Button>
                        </>
                    )}
                    <br />
                    <br />

                    <OutlinedInput
                        className={classes.input_field}
                        value={code}
                        onChange={(e) => {
                            setCode(e.target.value);
                        }}
                        placeholder="Verification Code"
                    />

                    <br />
                    <br />

                    <OutlinedInput
                        className={classes.input_field}
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        placeholder="Password"
                        endAdornment={
                            <InputAdornment onClick={togglePassword}>
                                {showPassword ? (
                                    <Visibility />
                                ) : (
                                    <VisibilityOff />
                                )}
                            </InputAdornment>
                        }
                    />
                    {error.password && (
                        <small className={classes.error_tag}>
                            {error.password}
                        </small>
                    )}

                    <small className={classes.password_helper}>
                        8-12 Alphanumric characters
                    </small>
                    <br />
                    <br />

                    <OutlinedInput
                        className={classes.input_field}
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmpassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                        placeholder="Confirm Password"
                        endAdornment={
                            <InputAdornment onClick={toggleConfirmPassword}>
                                {showConfirmPassword ? (
                                    <Visibility />
                                ) : (
                                    <VisibilityOff />
                                )}
                            </InputAdornment>
                        }
                    />
                    {error.confirmpassword && (
                        <small className={classes.error_tag}>
                            {error.confirmpassword}
                        </small>
                    )}
                    <small className={classes.password_helper}>
                        8-12 Alphanumric characters
                    </small>
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
        </>
    );
}

export default ForgetPassword;
