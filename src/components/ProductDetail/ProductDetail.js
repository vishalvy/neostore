import {
    Tab,
    Tabs,
    Button,
    Container,
    Grid,
    Paper,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Snackbar,
} from "@material-ui/core";

import { Rating } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import ShareIcon from "@material-ui/icons/Share";
import {
    FacebookShareButton,
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon,
    EmailShareButton,
    EmailIcon,
    PinterestShareButton,
    PinterestIcon,
    TwitterShareButton,
    TwitterIcon,
} from "react-share";
import ReactImageZoom from "react-image-zoom";
import axios from "axios";
import { BaseUrl } from "../constants/baseUrl";
import MuiAlert from "@material-ui/lab/Alert";
import Loader from "../Loader";
import { connect } from 'react-redux'
import {addCart} from '../Redux/actions/actions'
import { useHistory } from "react-router";

function ProductDetail(props) {
    const newid = props.match.params.id;
    const classes = useStyles();
    const history = useHistory()
    const [tabvalue, setTabValue] = useState(0);
    const [controlledRating, setControlledRating] = useState(3);
    const [imageVal, setImage] = useState();
    const [openDailog, setOpenDailog] = useState(false);
    const [product, setProduct] = useState();
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [loading, setLoading] = useState(true)
    const [openNotLogin, setOpenNotLogin] = useState(false);
    const [cartIDs,setCartIds] = useState()

    useEffect(() => {
        axios.get(`${BaseUrl}/api/product/details/${newid}`)
            .then((res) => {
                const temp = res.data.data;
                console.log("inside useEffect", temp);
                setProduct(temp);
                setImage(temp.mainImage);
                setLoading(false)
        });
        const userdata = JSON.parse(localStorage.getItem("userdata"));
        if (userdata) {
            const token = userdata.token;
            axios.get(`${BaseUrl}/api/cart`, {
                headers: {
                    Authorization: `${token}`,
                },
            })
            .then((res) => {
                const temp = res.data.data.products;
                const arr = []
                for (let i = 0; i < temp.length; i++){
                    arr.push(temp[i].productId.id)
                } 
                setCartIds(arr)
            });
        }
    },[]);

    //Snackbar Functions    
    const handleClick = (msg) => {
        if (msg === "success") {
            setOpen(true);
        } else if (msg === "error") {
            setOpenError(true);
        }
        else if (msg === "notlogin") {
            setOpenNotLogin(true);
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
    const handleCloseNotLogin = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenNotLogin(false);
    };

    const handleAddToCart = (product_id, quantity) => {
        const userdata = JSON.parse(localStorage.getItem("userdata"));
        if (userdata) {
            const token = userdata.token;
            const cartData = {
                productId: product_id,
                quantity: quantity,
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
        } else {
            handleClick("notlogin");
        }
        
    };

    const AddToCart = () => {
        handleAddToCart(newid, 1);
    };

    const openPopup = () => {
        setOpenDailog(true);
    };
    const closePopup = () => {
        setOpenDailog(false);
    };
    const handleTabs = (event, val) => {
        setTabValue(val);
    };
    const zoomDetails = {
        width: 350,
        height: 350,
        zoomWidth: 350,
        zoomPosition: "original",
        img: `${imageVal}`,
    };
    
    return (
        <>{
            loading ? <Loader/> :
            <div>
                {product && (
                    <Container className={classes.root}>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={6} lg={6}
                                className={classes.image_grid}
                            >
                                <ReactImageZoom {...zoomDetails} />
                                <br />
                                <div className={classes.small_img_root}>
                                    <img
                                        style={(product.subImages[0] === imageVal) ? { border: "1px solid black" } : {}}
                                        onClick={(e) =>
                                            setImage(e.target.currentSrc)
                                        }
                                        className={classes.small_img}
                                        src={product.subImages[0]}
                                        alt={product.name}
                                    />

                                    <img
                                        style={(product.subImages[1] === imageVal) ? { border: "1px solid black" } : {}}
                                        onClick={(e) =>
                                            setImage(e.target.currentSrc)
                                        }
                                        className={classes.small_img}
                                        src={product.subImages[1]}
                                        alt={product.name}
                                    />

                                    <img
                                        style={(product.mainImage === imageVal) ? { border: "1px solid black" } : {}}
                                        onClick={(e) =>
                                            setImage(e.target.currentSrc)
                                        }
                                        className={classes.small_img}
                                        src={product.mainImage}
                                        alt={product.name}
                                    />
                                </div>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                lg={6}
                                className={classes.details_grid}
                            >
                                <Typography
                                    className={classes.product_title}
                                    variant={"h5"}
                                >
                                    {product.name}
                                </Typography>

                                <Rating
                                    className={classes.product_rating}
                                    value={product.avgRating}
                                    precision={0.5}
                                    readOnly
                                />

                                <hr className={classes.hor_rule}></hr>

                                <Typography className={classes.price_root}>
                                    Price: ₹
                                <span className={classes.price_color}>
                                        {product.price}
                                    </span>
                                </Typography>

                                <Typography className={classes.color_box}>
                                    Color:
                                    <div
                                        style={{backgroundColor: `brown`}}
                                        className={classes.color_display}
                                    ></div>
                                </Typography>

                                <br />

                                <Typography className={classes.share_icon}>
                                    Share <ShareIcon />
                                </Typography>

                                <br />

                                <div>
                                    {/* Share to Socials Section --------------------------------------- */}
                                    <FacebookShareButton
                                        url={`http://localhost:3000/product/${product.id}`}
                                        hashtag="#neostore"
                                        className={classes.socialMediaButton}
                                    >
                                        <FacebookIcon size={36} round={true} />
                                    </FacebookShareButton>

                                    <WhatsappShareButton
                                        url={`http://localhost:3000/product/${product.id}`}
                                        hashtag="#neostore"
                                        className={classes.socialMediaButton}
                                    >
                                        <WhatsappIcon size={36} round={true} />
                                    </WhatsappShareButton>

                                    <EmailShareButton
                                        url={`http://localhost:3000/product/${product.id}`}
                                        hashtag="#neostore"
                                        className={classes.socialMediaButton}
                                    >
                                        <EmailIcon size={36} round={true} />
                                    </EmailShareButton>

                                    <PinterestShareButton
                                        url={`http://localhost:3000/product/${product.id}`}
                                        hashtag="#neostore"
                                        className={classes.socialMediaButton}
                                    >
                                        <PinterestIcon size={36} round={true} />
                                    </PinterestShareButton>

                                    <TwitterShareButton
                                        url={`http://localhost:3000/product/${product.id}`}
                                        hashtag="#neostore"
                                        className={classes.socialMediaButton}
                                    >
                                        <TwitterIcon size={36} round={true} />
                                    </TwitterShareButton>
                                </div>

                                <br />

                                <div>
                                {/* Add to Cart Button------------------ */}
                                    {
                                        cartIDs && cartIDs.includes(newid) ?
                                        <Button
                                            onClick={() => history.push("/cart")}
                                            variant="contained"
                                            color="secondary"
                                        >
                                            Go to Cart
                                        </Button>
                                        :
                                        <Button
                                            onClick={() => AddToCart(product)}
                                            className={classes.add_cart_btn}
                                            variant="contained"
                                        >
                                            Add to Cart
                                        </Button>
                                    }

                                    {/* Rate Product Button------------------ */}
                                    <Button
                                        onClick={openPopup}
                                        className={classes.rate_product_btn}
                                        variant="contained"
                                    >
                                        Rate Product
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>

                        {/* Tab section for product description and Features---------------------------- */}
                        <Paper square className={classes.tab_root}>
                            <Tabs value={tabvalue} onChange={handleTabs}>
                                <Tab label="Description"></Tab>
                                <Tab label="Features"></Tab>
                            </Tabs>
                            <TabPanel value={tabvalue} index={0}>
                                {product.description}
                            </TabPanel>
                            <TabPanel value={tabvalue} index={1}>
                                {product.features}
                            </TabPanel>
                        </Paper>

                        {/* Rate this product Pop Up Window-------------------------------------------- */}
                        <Dialog open={openDailog} onClose={closePopup} className={classes.dailog_root}>
                            <DialogTitle>
                                <Typography variant="h4">{product.name}</Typography>
                                <hr className={classes.hor_rule}></hr>
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    <img
                                        src={product.mainImage}
                                        alt=""
                                        width="30%"
                                        height="30%"
                                    />
                                    <br />
                                    <br />
                                    <Typography variant="h5">Rate this product</Typography>
                                    <Rating
                                        size="large"
                                        value={controlledRating}
                                        onChange={(event, newValue) => {
                                            setControlledRating(newValue);
                                        }}
                                    />
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                {/* Submit Rating button----------------- */}
                                <Button
                                    onClick={closePopup}
                                    variant="outlined"
                                    color="primary"
                                    autoFocus
                                >
                                    close
                            </Button>
                                <Button
                                    className={classes.submit_rating}
                                    onClick={closePopup}
                                    variant="contained"
                                    color="primary"
                                >
                                    Submit
                            </Button>
                            </DialogActions>
                        </Dialog>

                        {/* Snackbars----------------------------------------- */}
                        <Snackbar
                            open={open}
                            autoHideDuration={3000}
                            onClose={handleClose}
                        >
                            <Alert onClose={handleClose} severity="success">
                                Product Added To Cart
                        </Alert>
                        </Snackbar>

                        <Snackbar
                            open={openError}
                            autoHideDuration={3000}
                            onClose={handleCloseError}
                        >
                            <Alert
                                onClose={handleCloseError}
                                severity="error"
                            >
                                Product is Already in Cart!
                            </Alert>
                        </Snackbar>
                        
                        <Snackbar
                            open={openNotLogin}
                            autoHideDuration={3000}
                            onClose={handleCloseNotLogin}
                        >
                            <Alert onClose={handleCloseNotLogin} severity="error">
                                Please Login to Add in Cart!
                            </Alert>
                        </Snackbar>
                    </Container>
                )}
            </div>
        }
        </>
    );
}

//Snackbar Function-------------------------------------------------------
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// TabPanel Function ----------------------------------------------
function TabPanel(props) {
    const { children, value, index } = props;
    const classes = useStyles();
    return (
        <div>
            {value === index && (
                <Typography className={classes.tab_details}>
                    {children}
                </Typography>
            )}
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    addCart: () => {
        dispatch(addCart())
    }
})

export default connect(null,mapDispatchToProps)(ProductDetail);
