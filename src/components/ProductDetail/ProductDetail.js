import {Tab,Tabs, Button, Container, Grid, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import { Rating,} from '@material-ui/lab'
import React,{useState} from 'react'
import {useParams} from 'react-router-dom'
import useStyles from './styles'
import ShareIcon from '@material-ui/icons/Share';
import {FacebookShareButton, FacebookIcon, 
    WhatsappShareButton,WhatsappIcon,
    EmailShareButton,EmailIcon,
    PinterestShareButton,PinterestIcon,
    TwitterShareButton,TwitterIcon
} 
from "react-share";
import {useHistory} from 'react-router-dom'
import ReactImageZoom from 'react-image-zoom';

function ProductDetail(props) {
    const history = useHistory()
    const {id,title,rating,price,color,image} = props.location.product.product

    const classes = useStyles()
    const defaultImage = `${image.image1}`
    const [tabvalue, setTabValue] = useState(0);
    const [controlledRating, setControlledRating] = useState(2);
    const [imageVal,setImage] = useState(defaultImage)

    const style = {
        backgroundColor: `${color}`
    };

    const handleTabs = (event, val) => {
        setTabValue(val);
    };

    const AddToCart = (product) => {
        history.push({
            pathname: "/getcartdata",
            product: {product}
        })
    }

    const  zoomDetails = {
        width: 350, height: 350, 
        zoomWidth: 350 ,zoomPosition:'original', 
        img: `${imageVal}`
    };

    const [open, setOpen] = useState(false);

    const openPopup = () => {
        setOpen(true);
    };

    const closePopup = () => {
        setOpen(false);
    };
    return (
        <>
            <Container className={classes.root}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={6} lg={6} className={classes.image_grid}>

                        <ReactImageZoom {...zoomDetails} />
                        <br/>
                        <div className={classes.small_img_root}>
                            <img 
                                onClick={(e) => setImage(e.target.currentSrc)}
                                className={classes.small_img} 
                                src={image.image2}
                            />

                            <img 
                                onClick={(e) => setImage(e.target.currentSrc)}
                                className={classes.small_img} 
                                src={image.image3}
                            />
                    
                            <img 
                                onClick={(e) => setImage(e.target.currentSrc)}
                                className={classes.small_img} 
                                src={image.image4}
                            />
                        </div>
                    </Grid>
                    
                    <Grid item xs={12} sm={12} md={6} lg={6} className={classes.details_grid}>
                        <Typography 
                            className={classes.product_title}
                            variant={'h5'}> 
                            {title}
                        </Typography>

                        <Rating className={classes.product_rating} defaultValue={rating} precision={0.5} readOnly />

                        <hr className={classes.hor_rule}></hr>

                        <Typography className={classes.price_root}>
                            Price: ₹<span className={classes.price_color}>{price}</span>
                        </Typography>

                        <Typography className={classes.color_box}>
                            Color: 
                            <div style={style} className={classes.color_display}></div>
                        </Typography>

                        <br/>

                        <Typography className={classes.share_icon}>
                            Share <ShareIcon/>
                        </Typography>
                        
                        <br/>

                        <div>
                            {/* Share to Socials Section --------------------------------------- */}
                            <FacebookShareButton 
                                url={`http://localhost:3000/product/${id}`}
                                hashtag="#neostore"
                                className={classes.socialMediaButton}
                            >
                                <FacebookIcon size={36} round={true}/>
                            </FacebookShareButton>

                            <WhatsappShareButton 
                                url={`http://localhost:3000/product/${id}`}
                                hashtag="#neostore"
                                className={classes.socialMediaButton}
                            >
                                <WhatsappIcon size={36} round={true}/>
                            </WhatsappShareButton>

                            <EmailShareButton 
                                url={`http://localhost:3000/product/${id}`}
                                hashtag="#neostore"
                                className={classes.socialMediaButton}
                            >
                                <EmailIcon size={36} round={true}/>
                            </EmailShareButton>

                            <PinterestShareButton 
                                url={`http://localhost:3000/product/${id}`}
                                hashtag="#neostore"
                                className={classes.socialMediaButton}
                            >
                                <PinterestIcon size={36} round={true}/>
                            </PinterestShareButton>

                            <TwitterShareButton 
                                url={`http://localhost:3000/product/${id}`}
                                hashtag="#neostore"
                                className={classes.socialMediaButton}
                            >
                                <TwitterIcon size={36} round={true}/>
                            </TwitterShareButton>
                        </div>

                        <br/>

                        <div>
                            {/* Add to Cart Button------------------ */}
                            <Button
                                onClick = {() => AddToCart(props.location.product.product)}
                                className={classes.add_cart_btn}
                                variant="contained" 
                            >
                                Add to Cart
                            </Button>

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

                {/* Tab section for product description and Features-------------------------------- */}
                <Paper square className={classes.tab_root}>
                    <Tabs value={tabvalue} onChange={handleTabs}>
                        <Tab label="Description"></Tab>
                        <Tab label="Features"></Tab>
                    </Tabs>
                    <TabPanel value={tabvalue} index={0}>
                        Upgrade your living space with this exclusive Dreamzz Furniture Wing Back Chair which will add luxurious 
                        & Royal look to your Home. With Tufted High Back 
                        & craftfully upholstered Fabric gives you the Royal Look from every angle. Comfort is one the best part that you can always talk about of this chair. 
                        Curvy Teakwood legs makes an astonishing statement
                    </TabPanel>
                    <TabPanel value={tabvalue} index={1}>
                        Material:  Polyster
                    </TabPanel>
                </Paper>

            </Container>


            {/* Rate this product Pop Up Window-------------------------------------------------- */}
            <div>
                <Dialog
                    open={open}
                    onClose={closePopup}
                >
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Typography className={classes.price_root}>
                                Price: ₹<span className={classes.price_color}>{price}</span>
                            </Typography>
                            <br/>
                            <Typography>Rate this product</Typography>
                            <Rating
                                value={controlledRating}
                                onChange={(event, newValue) => {
                                    setControlledRating(newValue);
                                }}
                            />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {/* Submit Rating button----------------- */}
                        <Button onClick={closePopup} variant="outlined" color="primary" autoFocus>
                            close
                        </Button>
                        <Button 
                            className={classes.submit_rating}
                            onClick={closePopup} 
                            variant="contained" 
                            color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}



// TabPanel Function --------------------------------------------------------------
function TabPanel(props){
    const {children,value,index} = props
    const classes = useStyles()
    return (
        <div>
            {
                value==index && (<Typography className={classes.tab_details}>{children}</Typography>)
            }
        </div>
    )
}


export default ProductDetail
