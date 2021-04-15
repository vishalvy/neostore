import { Button, Typography } from '@material-ui/core'
import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    error_root: {
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center"
        margin: "25%",
        color: 'red'
    }
}));

export default function Error() {
    const history = useHistory()
    const classes = useStyles()
    return(
        <>
            <div className={classes.error_root}>
                <Typography variant="h2">
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


