import { Button, Typography } from '@material-ui/core'
import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    error_root: {
        margin: "25%",
        color: 'red'
    },
    '@media (min-width:320px) and (max-width:550px)': { 
        error_page_text: {
            fontSize: "8vh"
        }
    },
}));

export default function Error() {
    const history = useHistory()
    const classes = useStyles()
    return(
        <>
            <div className={classes.error_root}>
                <Typography variant="h2" className={classes.error_page_text}>
                    404: Page Not Found
                </Typography>
                <br/>
                <Button 
                    onClick={() => history.push("/")}
                    variant="outlined" 
                    color="secondary"
                >
                    Go to Home Page
                </Button>
            </div>
        </>
    )
}


