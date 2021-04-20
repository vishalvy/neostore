import { Container, Grid, Link, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './styles'
import SortIcon from '@material-ui/icons/Sort';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import HomeIcon from '@material-ui/icons/Home';

function Orderdetail() {
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
                        />

                        <Typography variant="h5">
                            Vishal Yadav
                        </Typography>
                        <br/>
                        <Typography className={classes.order_root} component="">
                            <Link className={classes.order_link}>
                                <SortIcon color="primary"/> Order
                            </Link>

                            
                        </Typography>
                        <br/>
                        <Typography className={classes.profile_root}>
                            <AccountBoxIcon color="primary"/> Profile
                        </Typography>
                        <br/>
                        <Typography className={classes.address_root}>
                            <HomeIcon color="primary"/> Address
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} lg={8}>
            
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Orderdetail
