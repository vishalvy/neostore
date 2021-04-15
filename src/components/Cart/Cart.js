import { Button, Grid, Paper, Step, StepLabel, Stepper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography ,IconButton, Container} from '@material-ui/core'
import React,{useState} from 'react'
import useStyles from './styles'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';


function Cart(props) {
    const {title,image,price} = props.location.product.product

    const newprice = parseInt(price.replace(/,/g, ""))

    const [activeStep,setActiveStep] = useState(0)
    const [productCount,setProductCount] = useState(1)
    const [totalPrice,setTotalPrice] = useState(newprice)

    const defaultGST = totalPrice/100 * 5
    const [GST,setGST] = useState(defaultGST)

    const classes = useStyles()


    //Add Item function
    const Additem = () => {
        if(productCount < 10){
            setProductCount(productCount + 1)
            setTotalPrice(newprice + totalPrice)
            setGST(totalPrice/100 * 5)
        }
        
    }


    //Remove Item function
    const Removeitem = () => {
        if(productCount > 1 ){
            setProductCount(productCount - 1)
            setTotalPrice(totalPrice - newprice)
            setGST(GST - ((totalPrice/100 * 5) - GST)) 
        }
        
    }


    return (
        <>
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
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Product</TableCell>
                                            <TableCell >Quantity</TableCell>
                                            <TableCell align="center">Price</TableCell>
                                            <TableCell align="center">Total</TableCell>
                                            <TableCell align="center"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* {rows.map((row) => ( */}
                                            <TableRow>
                                                <TableCell component="th" className={classes.product_name_root}>
                                                    <span>
                                                        <img src={image.image1} width="70px" height="70px"/>
                                                    </span>
                                                    <div className={classes.product_name}>
                                                        <Typography>
                                                            {title}
                                                        </Typography>
                                                        <Typography>
                                                            Status: <span className={classes.status_color}>In Stock</span>
                                                        </Typography>
                                                    </div>                                
                                                </TableCell>

                                                <TableCell>
                                                    <div className={classes.quantity_root}>    
                                                        <IconButton 
                                                            onClick={Additem}
                                                            color="secondary" 
                                                            component="span">
                                                            <AddCircleIcon/> 
                                                        </IconButton>
                                                        {productCount}
                                                        <IconButton 
                                                            onClick={Removeitem}
                                                            color="secondary" 
                                                            component="span">
                                                            <RemoveCircleIcon/>
                                                        </IconButton>                                        
                                                    </div>  
                                                </TableCell>

                                                <TableCell>{price}</TableCell>
                                                <TableCell>{totalPrice}</TableCell>
                                                <TableCell><DeleteOutlineIcon/></TableCell>
                                            </TableRow>
                                        {/* ))} */}
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
                                        <Typography className={classes.review_heading} variant="h5">
                                            Review Order
                                        </Typography>
                                    </TableRow>
                                    
                                    </TableHead>
                                    <TableBody>
                                        <TableRow >
                                            <TableCell>
                                                Subtotal
                                            </TableCell>
                                            <TableCell align="right">{totalPrice}</TableCell>
                                        </TableRow>      
                                        <TableRow >
                                            <TableCell>
                                                GST(5%) 
                                            </TableCell>
                                            <TableCell align="right">{GST}</TableCell>
                                        </TableRow>  
                                        <TableRow >
                                            <TableCell>
                                                Order Total
                                            </TableCell>
                                            <TableCell align="right">{totalPrice + GST}</TableCell>
                                        </TableRow> 
                                        {/* <TableRow > */}
                                            <Button 
                                                onClick={() => setActiveStep(activeStep + 1)}
                                                className={classes.buy_button} 
                                                variant="contained" 
                                                color = "primary">
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


        </>
    )
}

export default Cart
