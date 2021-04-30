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
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import { BaseUrl } from '../constants/baseUrl';
import {loginUser} from '../Redux/actions/CartAction'
import {connect} from 'react-redux'


function Login(props) {
    const classes = useStyles()
    const history = useHistory()
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
        if(email !== "" && password !== ""){
            const user = {
                email : email,
                password: password
            }
            axios.post(`${BaseUrl}/api/auth/login`,user)
            .then((res) => {
                localStorage.setItem('userdata', JSON.stringify(res.data.data))
                // localStorage.setItem('isLoggedIn',true)
                if (res.request.status === 200) {
                    console.log("Before",props)
                    props.loginUser()
                    history.push('/')
                }
                
            })
            .catch(() => {
                alert("Invalid Email or Password")
            })
        }
    }
    console.log(props,"Outside")
    return (
        <>
        <Grid className={classes.grid_container}>
            <Paper elevation={2} className={classes.login_paper}>
                <Container>
                <form
                    onSubmit={handleLogin}
                    className={classes.form_root}>
                    <Typography 
                        className={classes.login_form_heading}
                        variant="h4">
                            Login to Neo<span style={{ color: "red" }}>STORE</span>
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
                        type="submit"
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

const mapStateToProps = (state) => ({
    isLogin : state.perReducer.isLogin
})

const mapDispatchToProps = (dispatch) => ({
    loginUser: () => {
        dispatch(loginUser())
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Login)
