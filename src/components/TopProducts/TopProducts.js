import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Cards from "../AllProducts/cards";
import { Container } from "@material-ui/core";
import useStyles from "./productstyles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { BaseUrl } from "../constants/baseUrl";
import axios from "axios";
import Loader from "../Loader";

function TopProducts() {
    const classes = useStyles();
    const [productData, setProductData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(
                `${BaseUrl}/api/product?limit=5&page=1&sortby=rating&orderby=desc`
            )
            .then((res) => {
                setProductData(res.data.data.docs);
                setLoading(false);
            });
    }, []);

    return (
        <>
            {loading ? <Loader /> :
            (
                <Container className={classes.top_product_container}>
                    <Typography variant="h6" className={classes.cards_header}>
                        Popular Products
                    </Typography>
                    <Link to="/allproducts">See All Products</Link>
                    <Grid container spacing={3} className={classes.card_container}>
                        {
                            productData &&
                            productData.map((product, index) => (
                                <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                                    <Cards
                                        product={product}
                                        id={product.id}
                                        image={product.mainImage}
                                        title={product.name}
                                        price={product.price}
                                        rating={product.avgRating}
                                    />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Container>
            )}
        </>
    );
}
export default TopProducts;
