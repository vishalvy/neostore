import { Grid } from '@material-ui/core';
import React from 'react'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import useStyles from './loginstyles'
function Social() {
    const classes = useStyles()
    const responseFacebook = (response) => {
        // console.log(response);
    }
  
    const responseGoogle = (response) => {
        // console.log(response);
    }
    return (
        <>
            <Grid container spacing={2} className={classes.social_container}>
                <Grid item >
                    <FacebookLogin
                        cssClass={classes.facebook_button}
                        appId="455134109051912"
                        fields="name,email,picture"
                        callback={responseFacebook}
                        icon={"fa-facebook"}
                        textButton= " Login with Facebook"
                    />
                </Grid>
                <Grid item >
                    <GoogleLogin
                        className={classes.google_button}
                        clientId="55337348065-iiujmn8cfnbr3sguu5irimvt6c6v3dhj.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                        buttonText="Login with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        theme = "dark"
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default Social
