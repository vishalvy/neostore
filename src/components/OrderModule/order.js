import { Button, Container, Paper, Typography } from "@material-ui/core";
import React, { useState,useEffect } from "react";
import useStyles from './styles'
import { BaseUrl, rupees } from '../constants/baseUrl';
import axios from "axios";
import { useHistory } from "react-router";
import Loader from "../Loader";


function Order() {
    const classes = useStyles()
    const history = useHistory()
    const [orderProducts, setOrderProducts] = useState()
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem("userdata"));
        if (userdata) {
            const token = userdata.token;
            axios.get(`${BaseUrl}/api/order`, {
                headers: {
                    Authorization: `${token}`
                }
            })
            .then((res) => {
                console.log(res.data.data.orders)
                const temp = res.data.data.orders
                setOrderProducts(temp)
                setLoading(false)
            })
        }
        
    },[])


    const ProductDetail = (id) => {
        history.push({
            pathname: `product/${id}`
        });
    };
    return (
        <>{
            loading ? <Loader/> :
            <div>
            {
                orderProducts && orderProducts.map((order,index) => (
                    <Paper className={classes.order_paper} key={index}>
                        <Container>
                            <Typography variant="h6">
                                <span className={classes.transit_text}>TRANSIT</span>
                                Order ID: {order.id}
                            </Typography>
                            <small>
                                Posted on: {order.createdAt.substr(0,10)} /
                                <span className={classes.price_text}>
                                    {rupees}{order.items[0].productId.price}
                                </span>
                            </small>
                            <hr className={classes.hor_rule}></hr>
                            {
                                order.items.map((item) => (
                                    <div className={classes.orderlist_images}>
                                        <img
                                            onClick={() => ProductDetail(item.productId.id)}
                                            src={item.productId.mainImage}
                                            width="100px"
                                            height="100px"
                                            alt=""
                                        />
                                        <Typography>
                                            {item.productId.name}
                                        </Typography>
                                        <hr className={classes.hor_rule}></hr>
                                    </div>
                                    
                                ))
                            }
                            
                            {/* <hr className={classes.hor_rule}></hr> */}

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
            </div>
        }
        </>
    );
}

export default Order;
