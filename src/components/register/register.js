import React,{useState} from 'react'
import { 
    Container, 
    Grid, 
    Paper, 
    Typography,
    OutlinedInput,
    InputAdornment,
    Radio,
    RadioGroup,
    FormControlLabel,
    Button,
 } from '@material-ui/core'
import Social from '../login/social'
import useStyles from './registerstyles'
import TextFieldsIcon from '@material-ui/icons/TextFields';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import validate from './validate'
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import { BaseUrl } from '../constants/baseUrl';

function Register() {
    const classes = useStyles()
    const history = useHistory()
    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword,setshowConfirmPassword] = useState(false)
    // const [values,setValues] = useState({
    //     fname: "",
    //     lname: "",
    //     email: "",
    //     password: "",
    //     confirmpassword: "",
    //     mobile: "",
    //     gender: "male"
    // })
    const [fname,setFname] = useState("")
    const [lname,setLname] = useState("")
    const [email,setREmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmpassword,setConfirmPassword] = useState("")
    const [mobile,setMobile] = useState("")
    const [gender, setGender] = useState('male');
    const [error,setError] = useState({})

    const togglePassword = () => {
        setShowPassword(showPassword ? false : true)
    }
    const toggleConfirmPassword = () => {
        setshowConfirmPassword(showConfirmPassword ? false : true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError(validate(fname,lname,email,password,confirmpassword,mobile))
        if(fname !== "" && lname!== "" && email!== "" && password!== "" && confirmpassword!== ""){
        // if(error === {}) {
            const userData = {
                firstName: fname,
                lastName: lname,
                email: email,
                mobile: mobile,
                gender: gender,
                password: password,
                confirm_password: confirmpassword
            }
            axios.post(`${BaseUrl}/api/auth/register`,userData)
            .then((res) => {
                console.log(res)
                history.push('/login')
            })
            .catch((err) => {
                // console.log(err)
                alert("Already Register")
            })
        }
    }

    return (
        <>  
            <div className={classes.register_social}>
                <Social/>
            </div>
            <hr className={classes.hor_rule}></hr>
            <br/>

            <Grid className={classes.register_root}>
                <Paper elevation={2} className={classes.register_paper}>
                    <Container>
                        <form onSubmit={handleSubmit}>
                            <Typography 
                                className={classes.register_heading}
                                variant="h5" 
                            >
                                Register to NeoSTORE
                            </Typography>
                            <OutlinedInput
                                className={classes.input_field}
                                value={fname}
                                onChange={(e)=> {setFname(e.target.value)}}
                                placeholder="First Name"
                                endAdornment={
                                <InputAdornment>
                                    <TextFieldsIcon/>
                                </InputAdornment>
                                }
                            />
                            {error.fname && <small className={classes.error_tag}>{error.fname}</small>}
                            <br/><br/>

                            <OutlinedInput
                                className={classes.input_field}
                                value={lname}
                                onChange={(e)=> {setLname(e.target.value)}}
                                placeholder="Last Name"
                                endAdornment={
                                <InputAdornment>
                                    <TextFieldsIcon/>
                                </InputAdornment>
                                }
                            />
                            {error.lname && <small className={classes.error_tag}>{error.lname}</small>}
                            <br/><br/>
                            
                            <OutlinedInput
                                className={classes.input_field}
                                value={email}
                                onChange={(e)=> {setREmail(e.target.value)}}
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
                                className={classes.input_field}
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e)=> {setPassword(e.target.value)}}
                                placeholder="Password"
                                endAdornment={
                                <InputAdornment onClick={togglePassword}>
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </InputAdornment>
                                }
                            />
                            {error.password && <small className={classes.error_tag}>{error.password}</small>}
                            <small className={classes.password_helper}>8-12 Alphanumric characters</small>
                            
                            <br/><br/>

                            <OutlinedInput
                                className={classes.input_field}
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmpassword}
                                onChange={(e)=> {setConfirmPassword(e.target.value)}}
                                placeholder="Confirm Password"
                                endAdornment={
                                <InputAdornment onClick={toggleConfirmPassword}>
                                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                </InputAdornment>
                                }
                            />
                            {error.confirmpassword && <small className={classes.error_tag}>{error.confirmpassword}</small>}
                            <small className={classes.password_helper}>8-12 Alphanumric characters</small>
                            <br/><br/>

                            <OutlinedInput
                                className={classes.input_field}
                                value={mobile}
                                type = "number"
                                onChange={(e)=> {
                                    setMobile(e.target.value)}}
                                placeholder="Mobile No."
                                inputProps={{maxLength: 10}}
                                endAdornment={
                                <InputAdornment>
                                    <PhoneIcon/>
                                </InputAdornment>
                                }
                            />
                            <small className={classes.max10}>Max 10</small>
                            <small className={classes.counter}>{mobile.length}/10</small>
                            <br/><br/>
                            
                            <RadioGroup 
                                className={classes.radio_button} 
                                name="gender" value={gender} 
                                onChange={(e)=> {setGender(e.target.value)}}
                            >
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />                            
                            </RadioGroup>
        
                            <Button
                                className={classes.register_button}
                                variant="contained"
                                color="primary" 
                                type="submit"
                            >
                                Register
                            </Button>
                        </form>
                    </Container>
                </Paper>
            </Grid>
        </>
    )
}

export default Register
