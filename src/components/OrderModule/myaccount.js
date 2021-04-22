import { Button, Container, Grid, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './styles'
import SortIcon from '@material-ui/icons/Sort';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import HomeIcon from '@material-ui/icons/Home';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Order from './order';
import Address from './Address';

function Myaccount() {
    const classes = useStyles()
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

                        <Typography variant="h5">
                            Vishal Yadav
                        </Typography>
                        <br/>
                        <Typography className={classes.order_root} component="">
                            <Button className={classes.order_btn}>
                                <SortIcon color="primary"/> Order
                            </Button>

                            
                        </Typography>
                        <br/>
                        <Typography className={classes.order_root}>
                            <Button className={classes.order_btn}>
                                <AccountBoxIcon color="primary"/> Profile
                            </Button>
                            
                        </Typography>
                        <br/>
                        <Typography className={classes.order_root}>
                            <Button className={classes.order_btn}>
                                <HomeIcon color="primary"/> Address
                            </Button>
                        </Typography>
                        <br/>
                        <Typography className={classes.order_root}>
                            <Button className={classes.order_btn}>
                                <VpnKeyIcon color="primary"/> Change Password
                            </Button>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} lg={8}>
                        <Order/>
                        {/* <Address/> */}
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Myaccount
