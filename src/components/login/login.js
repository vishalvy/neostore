import React,{useState} from 'react'
import useStyles from './loginstyles'
import validate from './validate'

import { 
    Typography,
    OutlinedInput,
    InputAdornment, 
    Button,
    Grid,
    Paper,
    Container
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import EmailIcon from '@material-ui/icons/Email';
import Social from './social'
import {Link} from 'react-router-dom'



function Login() {
    const classes = useStyles()
    const [showPassword,setshowPassword] = useState(false)
    const [error,setError] = useState({});
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')


    const togglePassword = () => {
        setshowPassword(showPassword ? false : true)   
    }
    const handleLogin = (e) => {
        e.preventDefault();
        setError(validate(email,password));
    }

    return (
        <>
        <Grid className={classes.grid_container}>
            <Paper elevation={2} className={classes.login_paper}>
                <Container>
                <form
                    className={classes.form_root}>
                    <Typography 
                        className={classes.login_form_heading}
                        variant="h4">
                        Login to NeoSTORE
                    </Typography>
                    <br/>
                    <OutlinedInput
                        className={classes.email_field}
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        endAdornment={
                        <InputAdornment>
                            <EmailIcon/>
                        </InputAdornment>
                        }
                    />
                    {error.email && <small className={classes.error_tag}>{error.email}</small>}
                    <br/><br/>
                    <OutlinedInput
                        className={classes.email_field}
                        type={showPassword ? 'text' : 'password'}
                        name = "password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        endAdornment={
                        <InputAdornment onClick={togglePassword}>
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </InputAdornment>
                        }
                    />
                    {error.password && <small className={classes.error_tag}>{error.password}</small>}
                    <br/><br/><br/>
                    <Button
                        className={classes.login_button}
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                    <Typography>
                        <Link className={classes.forget_link} to="/recoverPassword"> Forget Password?</Link>
                    </Typography>
                    <br/><br/><br/>
                    <div className={classes.new_user_container}>
                        <Typography>
                            New User? <Link className={classes.new_user_link} to="/register"> Register</Link>
                        </Typography> 
                    </div>
                </form>
                </Container>
                <br/>
                
            </Paper>
        </Grid>
        <br/><br/>
            <Social/>
        </>
    )
}

export default Login
