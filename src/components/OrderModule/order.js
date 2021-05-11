import { Button, Container, Paper, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { BaseUrl, rupees } from "../constants/baseUrl";
import axios from "axios";
import { useHistory } from "react-router";
import Loader from "../Loader";
import NoOrders from '../../noorder.jpeg'
import { connect } from 'react-redux'
import { addCart } from '../Redux/actions/actions'
import SnackbarAlert from "../constants/SnackbarAlert";

function Order(props) {
    const classes = useStyles();
    const history = useHistory();
    const [orderProducts, setOrderProducts] = useState();
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);


    //Snackbar Functions
    const handleClick = (msg) => {
        if (msg === "success") {
            setOpen(true);
        } else if (msg === "error") {
            setOpenError(true);
        }
    };
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };
    const handleCloseError = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenError(false);
    };

    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem("userdata"));
        if (userdata) {
            const token = userdata.token;
            axios.get(`${BaseUrl}/api/order`, {
                headers: {  
                    Authorization: `${token}`,
                },
            })
            .then((res) => {
                const temp = res.data.data.orders;
                setOrderProducts(temp);
                setLoading(false);
            });
        }
    },[]);

    const ProductDetail = (id) => {
        history.push({
            pathname: `product/${id}`,
        });
    };


    const orderAgain = (items) => {
        items.map((item) => {
            const userdata = JSON.parse(localStorage.getItem("userdata"));
            if (userdata) {
                const token = userdata.token;
                const cartData = {
                    productId: item.productId.id,
                    quantity: 1,
                };
                axios
                    .post(`${BaseUrl}/api/cart`, cartData, {
                        headers: {
                            Authorization: token,
                        },
                    })
                    .then(() => {
                        handleClick("success");
                        props.addCart()
                    })
                    .catch(() => {  
                        handleClick("error");
                    });
            }
        })
    }

    
    return (
        <>
            {loading ? <Loader />: 
                <div>
                    {orderProducts.length !==0 ?
                        <div>
                            {orderProducts &&
                                orderProducts.map((order, index) => (
                                    <Paper className={classes.order_paper} key={index}>
                                        <Container>
                                            <Typography variant="h6">
                                                <span className={classes.transit_text}>
                                                    TRANSIT
                                                </span>
                                                Order ID: {order.id}
                                            </Typography>
                                            <small>
                                                Posted on:{" "}
                                                {order.createdAt.substr(0, 10)}{" "}
                                                /
                                                <span className={classes.price_text}>
                                                    {rupees}
                                                    {
                                                        order.items[0].productId.price
                                                    }
                                                </span>
                                            </small>
                                            <hr className={classes.hor_rule}></hr>
                                            {order.items.map((item,index) => (
                                                <div
                                                    key={index}
                                                    className={classes.orderlist_images}>
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
                                            ))}
                                            
                                            
                                            <Button
                                                // onClick={PdfGenerate}
                                                className={classes.download_invoice_btn}
                                                variant="contained"
                                                color="primary"
                                            >
                                                Download Invoice as PDF
                                            </Button>
                                                

                                            <Button
                                                onClick={() => orderAgain(order.items)}
                                                className={classes.buy_again_btn}
                                                variant="contained"
                                                color="primary"
                                            >
                                                Buy Again
                                            </Button>
                                            <br />
                                            <br />
                                        </Container>
                                        <SnackbarAlert
                                            open={open}
                                            close={handleClose}
                                            type={"success"}
                                            msg={"Product Added To Cart"}
                                        />
                                        <SnackbarAlert
                                            open={openError}
                                            close={handleCloseError}
                                            type={"error"}
                                            msg={"Product is Already in Cart!"}
                                        />
                                    </Paper>
                                ))}
                        </div> : 
                                <div>
                                    <img
                                        className={classes.no_order_img}
                                        src={NoOrders}
                                        alt="You have No Orders"
                                    />
                                </div> 
                    }
                </div>
            }
        </>
    );
}

const mapStateToProps = (state) => ({
    Idarr: state.CartPerReducer.Idarr
})

const mapDispatchToProps = (dispatch) => ({
    addCart: () => {
        dispatch(addCart())
    },
})

export default connect(mapStateToProps,mapDispatchToProps)(Order);
