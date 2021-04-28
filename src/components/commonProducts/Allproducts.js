import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Paper, Typography } from '@material-ui/core'
import React,{useEffect, useState} from 'react'
import useStyles from './styles'
// import Categories from './categories'  
// import Colors from './colors'
import StarIcon from '@material-ui/icons/Star';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProductsCards from './ProductsCards'
import axios from 'axios'
import {BaseUrl} from '../constants/baseUrl'

function Commonproducts() {
    const classes = useStyles()
    const [productData, setProductData] = useState()
    const [categories,setCategories] = useState()

    useEffect(() => {
        axios.get(`${BaseUrl}/api/product?limit=9&page=1`)
        .then((res) => {
            setProductData(res.data.data.docs)
        })

        axios.get(`${BaseUrl}/api/category`)
        .then((res) => {
            console.log(res.data.data)
            setCategories(res.data.data)
        })
    },[])

    const sort = (order) => {
        axios.get(`${BaseUrl}/api/product?limit=9&page=1&sortby=price&orderby=${order}`)
        .then((res) => {
            const temp = res.data.data.docs
            setProductData(temp)
        })
    }

    const getCategories = (category_id) => {
        console.log(category_id)
        axios.get(`${BaseUrl}/api/product?limit=100&page=1..10&category=${category_id}`)
        .then((res) => {
            const temp = res.data.data.docs
            setProductData(temp)
        })
    }

    const getColors = (color_id) => {
        axios.get(`${BaseUrl}/api/product?page=1&limit=9&color=${color_id}`)
        .then((res) => {
            const temp = res.data.data.docs
            setProductData(temp)
        })
    }
    return (
        <>
            <hr className={classes.hor_rule}></hr>
            <div className={classes.sort_root}>
                <Typography>
                    Sort By: 
                </Typography>
                <Button 
                    className={classes.sort_btn_color}
                    onClick={() => {
                        axios.get(`${BaseUrl}/api/product?limit=9&page=1&sortby=rating&orderby=desc`)
                        .then((res) => {
                            const temp = res.data.data.docs
                            setProductData(temp)
                        })
                    }}
                >
                    <StarIcon/>
                </Button>
                <Button 
                    className={classes.sort_btn_color}
                    onClick={() => sort("desc")}
                >   
                    ₹<ArrowUpwardIcon/>
                </Button>
                <Button 
                    className={classes.sort_btn_color}
                    onClick={() => sort("asc")}
                >
                    ₹<ArrowDownwardIcon/>
                </Button>
            </div>
             
                    
            <Grid container className={classes.allproducts_root}>
                    <Grid item md={2} lg={2} className={classes.grid1}>
                        <Paper className={classes.allproducts_paper}>
                            <Button 
                                className={classes.allproducts_link}
                                onClick={() => {
                                    axios.get(`${BaseUrl}/api/product?limit=9&page=1`)
                                    .then((res) => {
                                        const temp = res.data.data.docs
                                        setProductData(temp)
                                    })
                                }}
                            >
                                All Products
                            </Button>
                        </Paper>


                        <Accordion className={classes.categories_root}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography className={classes.heading}>Categories</Typography>
                            </AccordionSummary>
                            {
                                categories &&
                                categories.map((category, index) => (
                                <AccordionDetails>
                                    <Button
                                        onClick={() => getCategories(category.id)}
                                        className={classes.list_button}
                                    >
                                        {category.name}
                                    </Button>
                                </AccordionDetails>    
                                ))
                            }
                            
                            {/* <AccordionDetails>
                                <Button 
                                    onClick={() => getColors("6065ca24cec0196a6fe56e3d")}
                                    className={classes.list_button}>
                                    Sofa
                                </Button>
                            </AccordionDetails>
                            <AccordionDetails>
                                <Button 
                                    onClick={() => getColors("6065ca24cec0196a6fe56e3d")}
                                    className={classes.list_button}>
                                    Bed
                                </Button>
                            </AccordionDetails>
                            <AccordionDetails>
                                <Button 
                                    onClick={() => getColors("6065ca24cec0196a6fe56e3d")}
                                    className={classes.list_button}>
                                    Cupboard
                                </Button>
                            </AccordionDetails> */}
                        </Accordion>

                        
                        <Accordion className={classes.colors_root}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography className={classes.heading}>Colors</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Button 
                                    onClick={() => getColors("6065c425f45ada6429eb42c9")}
                                    className={classes.list_button}>
                                    Brown
                                </Button>
                            </AccordionDetails>
                            <AccordionDetails>
                                <Button 
                                    onClick={() => getColors("6065c425f45ada6429eb42c9")}
                                    className={classes.list_button}>
                                    Blue
                                </Button>
                            </AccordionDetails>
                            <AccordionDetails>
                                <Button 
                                    onClick={() => getColors("6065c425f45ada6429eb42c9")}
                                    className={classes.list_button}>
                                    Black
                                </Button>
                            </AccordionDetails>
                            <AccordionDetails>
                                <Button 
                                    onClick={() => getCategories("6065c425f45ada6429eb42c9")}
                                    className={classes.list_button}>
                                    White
                                </Button>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                <Grid item md={10} lg={10}>
                    <ProductsCards products={productData}/>
                </Grid>
            </Grid> 
        </>
    )
}

export default Commonproducts
