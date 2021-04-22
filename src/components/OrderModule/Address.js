import { Container, Paper, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './styles'

function Address() {
    const classes = useStyles()
    return (
        <>
            <Paper className={classes.address_root_paper}>
                <Container>
                    <Typography variant="h5">
                        Address
                    </Typography>
                    <hr className={classes.hor_rule}></hr>
                </Container>
            </Paper>
        </>
    )
}

export default Address
