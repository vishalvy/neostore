import { Button, Container, Paper, Typography } from "@material-ui/core";
import React from "react";
import useStyles from './styles'
import { rupees } from '../constants/baseUrl';


function Order() {
    const classes = useStyles()
    return (
        <>
            <Paper className={classes.order_paper}>
                <Container>
                    <Typography variant="h6">
                        <span className={classes.transit_text}>TRANSIT</span>
                        Order By: ORDERNO_1
                    </Typography>
                    <small>
                        Posted on: 21/05/2021 /
                        <span className={classes.price_text}>
                            {rupees}34543
                        </span>
                    </small>
                    <hr className={classes.hor_rule}></hr>
                    <img
                        src="https://images-na.ssl-images-amazon.com/images/I/71Z0WIYvgmL._SL1500_.jpg"
                        width="15%"
                        height="15%"
                        alt=""
                    />
                    <hr className={classes.hor_rule}></hr>

                    <Button
                        className={classes.download_invoice_btn}
                        variant="contained"
                        color="primary"
                    >
                        Download Invoice as PDF
                    </Button>
                    <br />
                    <br />
                </Container>
            </Paper>
        </>
    );
}

export default Order;
