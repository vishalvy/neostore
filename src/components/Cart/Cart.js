import {
    Button,
    Grid,
    Paper,
    Step,
    StepLabel,
    Stepper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    IconButton,
    Container,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import axios from "axios";
import { BaseUrl } from "../constants/baseUrl";

function Cart(props) {
    // const { name, mainImage, price } = props.location.product.product;

    // const newprice = price

    const [activeStep, setActiveStep] = useState(0);
    const [productCount, setProductCount] = useState(1);
    const [totalPrice, setTotalPrice] = useState();
    const [cartProducts,setCartProducts] = useState()

    // const defaultGST = (totalPrice / 100) * 5;
    // const [GST, setGST] = useState(defaultGST);

    const classes = useStyles();

    // //Add Item function
    // const Additem = () => {
    //     if (productCount < 10) {
    //         setProductCount(productCount + 1);
    //         setTotalPrice(price + totalPrice);
    //         setGST((totalPrice / 100) * 5);
    //     }
    // };
    const Additem = () => {
        if (productCount < 10) {
            setProductCount(productCount + 1)
        }
    }
    const Removeitem = () => {
        if (productCount > 1) {
            setProductCount(productCount - 1)
        }
    }

    // //Remove Item function
    // const Removeitem = () => {
    //     if (productCount > 1) {
    //         setProductCount(productCount - 1);
    //         setTotalPrice(totalPrice - price);
    //         setGST(GST - ((totalPrice / 100) * 5 - GST));
    //     }
    // };
    
    // const deleteCartProduct = (p_id) => {
    //     const userdata = JSON.parse(localStorage.getItem("userdata"));
    //     const token = userdata.token;
    //     axios.delete(`${BaseUrl}/api/cart/${p_id}`, {
    //         headers: {
    //             Authorization: `${token}`
    //         }
    //     })
    // }


    

    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem("userdata"));
        const token = userdata.token;
        // console.log(token)
        axios.get(`${BaseUrl}/api/cart`,{
            headers: {
                Authorization: `${token}`
            }
        })
        .then((res) => {
            console.log("Response data",res.data.data.products)
            const temp = res.data.data.products
            setCartProducts(temp)
            // console.log(temp.productId.price)
            // setTotalPrice(temp.productId.price)
            
            
        })
    },[]);
    console.log(cartProducts)
    return (
        <>
        {cartProducts && <div>
            <div className={classes.stepper_root}>
                <Stepper activeStep={activeStep}>
                    <Step>
                        <StepLabel>Cart</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Delivery Address</StepLabel>
                    </Step>
                </Stepper>
            </div>

            <div>
                <Grid container>
                    <Grid item xs={12} sm={12} md={8}>
                        <Container>
                            <TableContainer component={Paper}>
                                <Table
                                    className={classes.table}
                                    aria-label="simple table"
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Product</TableCell>
                                            <TableCell>Quantity</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Total</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {cartProducts && cartProducts.map((cartProduct,index) => (
                                        <TableRow key={index}>
                                                
                                            <TableCell
                                                component="th"
                                                className={
                                                    classes.product_name_root
                                                }
                                            >
                                                <span>
                                                    <img
                                                        src={cartProduct.productId.mainImage}
                                                        alt=""
                                                        width="70px"
                                                        height="70px"
                                                    />
                                                </span>
                                                <div
                                                    className={
                                                        classes.product_name
                                                    }
                                                >
                                                    <Typography>
                                                        {cartProduct.productId.name}
                                                    </Typography>
                                                    <Typography>
                                                        Status:{" "}
                                                        <span
                                                            className={
                                                                classes.status_color
                                                            }
                                                        >
                                                            In Stock
                                                        </span>
                                                    </Typography>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <div
                                                    className={
                                                        classes.quantity_root
                                                    }
                                                >
                                                    <IconButton
                                                        onClick={Additem}
                                                        color="secondary"
                                                        component="span"
                                                    >
                                                        <AddCircleIcon />
                                                    </IconButton>
                                                    {productCount}
                                                    <IconButton
                                                        onClick={Removeitem}
                                                        color="secondary"
                                                        component="span"
                                                    >
                                                        <RemoveCircleIcon />
                                                    </IconButton>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                {cartProduct.productId.price}
                                            </TableCell>
                                            <TableCell>
                                                {cartProduct.productId.totalPrice}
                                            </TableCell>
                                            
                                            <TableCell>
                                                <IconButton
                                                    // onClick={deleteCartProduct(cartProduct.id)}
                                                    color="secondary"
                                                    component="span"
                                                >
                                                    <DeleteOutlineIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Container>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <Container>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <Typography
                                                className={
                                                    classes.review_heading
                                                }
                                                variant="h5"
                                            >
                                                Review Order
                                            </Typography>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Subtotal</TableCell>
                                            <TableCell align="right">
                                                {/* {totalPrice} */}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>GST(5%)</TableCell>
                                            <TableCell align="right">
                                                {/* {GST} */}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Order Total</TableCell>
                                            <TableCell align="right">
                                                {/* {totalPrice + GST} */}
                                            </TableCell>
                                        </TableRow>
                                        {/* <TableRow > */}
                                        <Button
                                            onClick={() =>
                                                setActiveStep(activeStep + 1)
                                            }
                                            className={classes.buy_button}
                                            variant="contained"
                                            color="primary"
                                        >
                                            Proceed to Buy
                                        </Button>
                                        {/* </TableRow>  */}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Container>
                    </Grid>
                </Grid>
                </div>
            </div>
            }
        </>
    );
}

export default Cart;
