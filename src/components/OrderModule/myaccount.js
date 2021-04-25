import { Button, Container, Grid, Typography } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import useStyles from './styles'
import SortIcon from '@material-ui/icons/Sort';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import HomeIcon from '@material-ui/icons/Home';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Order from './Order';
import Address from './Address';
import Profile from './Profile';
import ChangePass from './ChangePass'

function Myaccount() {
    const classes = useStyles()
    const [isOrder, setIsOrder] = useState(false)
    const [isAddress, setIsAddress] = useState(false)
    const [isProfile, setIsProfile] = useState(true)
    const [isChangePass, setIsChangePass] = useState(false)
    const [userInfo,setUserInfo] = useState()

    const borderStyle = {
        border: "1px solid black"
    }

    const handleOrderPage = () => {
        setIsOrder(true)
        setIsProfile(false)
        setIsChangePass(false)
        setIsAddress(false)
    }
    const handleAddressPage = () => {
        setIsOrder(false)
        setIsProfile(false)
        setIsChangePass(false)
        setIsAddress(true)
    }
    const handleProfilePage = () => {
        setIsAddress(false)
        setIsOrder(false)
        setIsChangePass(false)
        setIsProfile(true)
        
    }
    const handleChangePassPage = () => {
        setIsAddress(false)
        setIsOrder(false)
        setIsProfile(false)
        setIsChangePass(true)
    }

    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem("userdata"));
        if (userdata) {
            setUserInfo(userdata)
        }
    })
    
    return (
        <>
            <Container className={classes.root}>
                <Typography 
                    className={classes.root_heading}
                    variant="h4">
                    My Account
                </Typography>
                <hr className={classes.hor_rule}></hr>
                <Grid container>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <img 
                            className={classes.profile_img}
                            src="https://i.stack.imgur.com/l60Hf.png"
                            alt= ""
                        />

                        <Typography
                            className={classes.account_username}
                            variant="h5">
                            {userInfo && userInfo.firstName} {userInfo && userInfo.lastName}
                        </Typography>
                        <br/>
                        <Typography className={classes.order_root} component="">
                            <Button
                                style={isOrder ? {backgroundColor: "#EFC768", border: "1px solid black"} : {}}
                                onClick={() => handleOrderPage()}
                                className={classes.order_btn}>
                                <SortIcon color="primary"/> Order
                            </Button>

                            
                        </Typography>
                        <br/>
                        <Typography className={classes.order_root}>
                            <Button
                                style={isProfile ? {backgroundColor: "#EFC768", border: "1px solid black"} : {}}
                                onClick={() => handleProfilePage()}
                                className={classes.order_btn}>
                                <AccountBoxIcon color="primary"/> Profile
                            </Button>
                            
                        </Typography>
                        <br/>
                        <Typography className={classes.order_root}>
                            <Button
                                style={isAddress? {backgroundColor: "#EFC768", border: "1px solid black"} : {}}
                                onClick={() => handleAddressPage()}
                                className={classes.order_btn}>
                                <HomeIcon color="primary"/> Address
                            </Button>
                        </Typography>
                        <br/>
                        <Typography className={classes.order_root}>
                            <Button
                                style={isChangePass ? {backgroundColor: "#EFC768", border: "1px solid black"} : {}}
                                onClick={() => handleChangePassPage()}
                                className={classes.order_btn}>
                                <VpnKeyIcon color="primary"/> Change Password
                            </Button>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} lg={8}>
                        {isOrder ? <Order/> : null }
                        {isAddress ? <Address/> : null }
                        {isProfile ? <Profile/> : null }
                        {isChangePass ? <ChangePass/> : null}
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Myaccount
