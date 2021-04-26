import { Button, Container, Paper, Typography } from "@material-ui/core";
import React, { useState,useEffect } from "react";
import useStyles from './styles'
import { BaseUrl, rupees } from '../constants/baseUrl';
import axios from "axios";


function Order() {
    const classes = useStyles()
    const [orderProducts,setOrderProducts] = useState()

    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem("userdata"));
        const token = userdata.token;
        axios
            .get(`${BaseUrl}/api/order`, {
                headers: {
                    Authorization: `${token}`
                }
            })
            .then((res) => {
                console.log(res.data.data.orders)
                const temp = res.data.data.orders
                setOrderProducts(temp)
            })
    },[])
    return (
        <>
            {
                orderProducts && orderProducts.map((order,index) => (
                    <Paper className={classes.order_paper} key={index}>
                        <Container>
                            <Typography variant="h6">
                                <span className={classes.transit_text}>TRANSIT</span>
                                Order By: {order.id}
                            </Typography>
                            <small>
                                Posted on: {order.createdAt.substr(0,10)} /
                                <span className={classes.price_text}>
                                    {rupees}{order.items[0].productId.price}
                                </span>
                            </small>
                            <hr className={classes.hor_rule}></hr>
                            <img
                                // src={product.productId.mainImage}
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
                ))}
        </>
    );
}

export default Order;
