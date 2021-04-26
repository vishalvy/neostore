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
import { useHistory } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import axios from "axios";
import { BaseUrl, rupees } from "../constants/baseUrl";
import SweetAlert from "react-bootstrap-sweetalert";

function Cart() {
    const classes = useStyles();
    const history = useHistory();
    const [activeStep, setActiveStep] = useState(0);
    const [productQuantity, setProductQuantity] = useState([]);
    const [productPrice, setProductPrice] = useState([]);
    const [grandTotal, setGrandTotal] = useState();
    const [cartProducts, setCartProducts] = useState();
    const [deleteFlag, setDeleteFlag] = useState(false);
    const [sweetAlert, setSweetAlert] = useState(null);

    const Additem = (index, price) => {
        const quantity_arr = [...productQuantity];
        const productcost = [...productPrice];
        if (quantity_arr[index] < 10) {
            quantity_arr[index] += 1;

            setProductQuantity(quantity_arr);

            const updatePrice = productcost.map((val, newindex) => {
                if (index === newindex) {
                    const newPrice = price * quantity_arr[newindex];
                    return newPrice;
                }
                return val;
            });
            setProductPrice(updatePrice);
            console.log(productPrice);
            const totalCost = updatePrice.reduce((a, b) => a + b, 0);
            setGrandTotal(totalCost);
        }
    };

    const Removeitem = (index, price) => {
        const quantity_arr = [...productQuantity];
        const productcost = [...productPrice];
        if (quantity_arr[index] > 1) {
            quantity_arr[index] -= 1;

            setProductQuantity(quantity_arr);

            const updatePrice = productcost.map((val, newindex) => {
                if (index === newindex) {
                    const newPrice = price * quantity_arr[newindex];
                    return newPrice;
                }
                return val;
            });
            setProductPrice(updatePrice);
            console.log(productPrice);
            const totalCost = updatePrice.reduce((a, b) => a - b, 0);
            setGrandTotal(Math.abs(totalCost));
        }
    };

    const deleteCartProduct = (p_id) => {
        const userdata = JSON.parse(localStorage.getItem("userdata"));
        const token = userdata.token;
        axios
            .delete(`${BaseUrl}/api/cart/${p_id}`, {
                headers: {
                    Authorization: `${token}`,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    setDeleteFlag(true);
                }
            });
        hideAlert();
    };

    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem("userdata"));
        if (userdata) {
            const token = userdata.token;
            const price_arr = [];
            axios
                .get(`${BaseUrl}/api/cart`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                })
                .then((res) => {
                    const temp = res.data.data.products;
                    setCartProducts(temp);
                    setGrandTotal(res.data.data.grandTotal);
                    if (res.status === 200) {
                        const q_arr = new Array(
                            res.data.data.products.length
                        ).fill(1);
                        setProductQuantity(q_arr);
                        temp.map((val) => {
                            price_arr.push(val.productId.price);
                        });
                        setProductPrice(price_arr);
                    }
                });
        }
    }, [deleteFlag]);

    const deleteProduct = (id) => {
        const getAlert = () => (
            <SweetAlert
                warning
                showCancel
                confirmBtnText="Yes, remove it!"
                confirmBtnBsStyle="danger"
                title="Are you sure?"
                onConfirm={() => deleteCartProduct(id)}
                onCancel={() => hideAlert()}
                focusCancelBtn
            >
                Are you sure, want to remove this product?
            </SweetAlert>
        );
        setSweetAlert(getAlert());
    };
    const hideAlert = () => {
        setSweetAlert(null);
    };
    return (
        <>
            {cartProducts && (
                <div>
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
                                                    <TableCell>
                                                        Product
                                                    </TableCell>
                                                    <TableCell>
                                                        Quantity
                                                    </TableCell>
                                                    <TableCell>Price</TableCell>
                                                    <TableCell>Total</TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {cartProducts &&
                                                    cartProducts.map(
                                                        (
                                                            cartProduct,
                                                            index
                                                        ) => (
                                                            <TableRow
                                                                key={index}
                                                            >
                                                                <TableCell
                                                                    component="th"
                                                                    className={
                                                                        classes.product_name_root
                                                                    }
                                                                >
                                                                    <span>
                                                                        <img
                                                                            src={
                                                                                cartProduct
                                                                                    .productId
                                                                                    .mainImage
                                                                            }
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
                                                                            {
                                                                                cartProduct
                                                                                    .productId
                                                                                    .name
                                                                            }
                                                                        </Typography>
                                                                        <Typography>
                                                                            Status:{" "}
                                                                            <span
                                                                                className={
                                                                                    classes.status_color
                                                                                }
                                                                            >
                                                                                In
                                                                                Stock
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
                                                                            onClick={() =>
                                                                                Additem(
                                                                                    index,
                                                                                    cartProduct
                                                                                        .productId
                                                                                        .price
                                                                                )
                                                                            }
                                                                            color="secondary"
                                                                            component="span"
                                                                        >
                                                                            <AddCircleIcon />
                                                                        </IconButton>
                                                                        {
                                                                            productQuantity[
                                                                            index
                                                                            ]
                                                                        }
                                                                        <IconButton
                                                                            onClick={() =>
                                                                                Removeitem(
                                                                                    index,
                                                                                    cartProduct
                                                                                        .productId
                                                                                        .price
                                                                                )
                                                                            }
                                                                            color="secondary"
                                                                            component="span"
                                                                        >
                                                                            <RemoveCircleIcon />
                                                                        </IconButton>
                                                                    </div>
                                                                </TableCell>

                                                                <TableCell>
                                                                    {rupees}
                                                                    {
                                                                        cartProduct
                                                                            .productId
                                                                            .price
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    {rupees}
                                                                    {
                                                                        productPrice[
                                                                        index
                                                                        ]
                                                                    }
                                                                </TableCell>

                                                                <TableCell>
                                                                    <IconButton
                                                                        onClick={() =>
                                                                            deleteProduct(
                                                                                cartProduct.id
                                                                            )
                                                                        }
                                                                        color="secondary"
                                                                        component="span"
                                                                    >
                                                                        <DeleteOutlineIcon />
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    )}
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
                                                    <TableCell>
                                                        Subtotal
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {rupees}
                                                        {grandTotal}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>
                                                        GST(5%)
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {rupees}
                                                        {(
                                                            (grandTotal / 100) *
                                                            5
                                                        ).toFixed(2)}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>
                                                        Order Total
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {rupees}
                                                        {(
                                                            grandTotal -
                                                            (grandTotal / 100) *
                                                            5
                                                        ).toFixed(2)}
                                                    </TableCell>
                                                </TableRow>

                                                <TableCell align="center"
                                                    className={
                                                        classes.buy_button_root
                                                    }
                                                >
                                                    <Button
                                                        onClick={() => {
                                                            setActiveStep(
                                                                activeStep + 1
                                                            );
                                                            history.push(
                                                                "/ordersummary"
                                                            );
                                                        }}  
                                                        className={
                                                            classes.buy_button
                                                        }
                                                        variant="contained"
                                                        color="primary"
                                                    >
                                                        Proceed to Buy
                                                    </Button>
                                                </TableCell>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Container>
                            </Grid>
                        </Grid>
                    </div>

                    {/* Sweet Alert----------------------------------------- */}
                    {sweetAlert}
                </div>
            )}
        </>
    );
}

export default Cart;
