import React,{useState} from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import useStyles from './footerstyles'
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField'
import TnC from '../../PDF.pdf'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';

function Footer() {
    const classes = useStyles()

    const [open, setOpen] = useState(false);
    const [footerEmail,setFooterEmail] = useState("")

    const validateSubscribe = (footerEmail) => {
        if (footerEmail === "") {
            alert("Enter Email Before Subscribing!")
        }
        else if (!/^(([^<>!@#$%&^*()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(footerEmail)) {
            alert("Enter Email Valid Email")
        }
        else {
            setOpen(true);
        }
    }
        


    const handleSubscribe = () => {
        validateSubscribe(footerEmail)
    }

    const closePopup = () => {
        setOpen(false);
    };
    const closePopup2 = () => {
        setFooterEmail("")
        setOpen(false);
    };
    return (
        <>
            <div className={classes.footer_container}>
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={12} md={4} lg={4} className={classes.footer_grid}>
                        <Typography 
                            variant="h5"
                            className={classes.footer_heading}
                        >
                            About Company
                        </Typography>
                        <br/>
                        <Typography className={classes.about_text}>
                            NeoSOFT Technologies is here at your quick and easy service
                            for shopping. <br/>
                            Contact information <br/>
                            Email: contact@neosoftmail.com <br/>
                            Phone: +91 0000000000 <br/>
                            MUMBAI, INDIA
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} className={classes.footer_grid}> 
                    <Typography 
                        variant="h5"
                        className={classes.footer_heading}
                    >
                        Information
                    </Typography> 
                    <br/>
                    <Typography className={classes.information_text}>
                        <Link className={classes.footer_links} 
                            href={TnC} 
                            target="_blank" 
                            rel="noopener"
                        >Terms and Conditions
                        </Link> 

                        <br/>
                        Guarantee and Return Policy <br/>
                        Contact US <br/>
                        Privacy Policy <br/>
                        <Link className={classes.footer_links} 
                            href="https://goo.gl/maps/tBqraJsB1gPru5dW7"
                            target="_blank" 
                            rel="noopener"
                        >
                            Locate Us
                        </Link>
                    </Typography>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4} className={classes.footer_grid}>
                        <Typography 
                            variant="h5"
                            className={classes.footer_heading}
                        >
                            Newsletter
                        </Typography> 
                        <br/>
                        <Typography className={classes.newsletter_text}>
                            Signup to get exclusive offer from our favourite brands and 
                            to be well in the news.
                        </Typography>
                        
                        <br/>

                        <form>
                            <TextField
                                value={footerEmail}
                                onChange={(e) => setFooterEmail(e.target.value)}
                                placeholder="Your Email.."
                                className={classes.footer_textfield}    
                            >

                            </TextField>
                            <br/> <br/>
                            <Button 
                                onClick={handleSubscribe}
                                variant="contained"
                                className={classes.footer_button}
                                size="small"
                            >
                                Subscribe
                            </Button>
                        </form>
                        
                    </Grid>
                </Grid>
                <br/>
                <Typography className={classes.credit_text}>
                Copyright 2017 NeoSOFT Technologies All rights reserved | Designed By Vishal Yadav
                </Typography>
            </div>

            <Dialog open={open} onClose={closePopup}>
                <DialogContent>
                    <DialogContentText>
                            <Typography variant="h4">
                                Thank You for registering
                            </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closePopup2} variant="outlined" color="primary" autoFocus>
                        close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Footer
