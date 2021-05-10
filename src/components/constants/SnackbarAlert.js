import { Snackbar } from '@material-ui/core'
import React from 'react'
import MuiAlert from "@material-ui/lab/Alert";

function SnackbarAlert(props) {
    return (
        <>
            <Snackbar open={props.open} autoHideDuration={3000} onClose={props.close}>
                <Alert onClose={props.close} severity={props.type}style={{boxShadow: "none"}}>
                    {props.msg}
                </Alert>
            </Snackbar>
        </>
    )
}
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default SnackbarAlert
