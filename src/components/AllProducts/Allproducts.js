import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Paper, Typography } from '@material-ui/core'
import React,{useEffect, useState} from 'react'
import useStyles from './styles'
import StarIcon from '@material-ui/icons/Star';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProductsCards from './ProductsCards'
import axios from 'axios'
import {BaseUrl} from '../constants/baseUrl'
import { Pagination } from '@material-ui/lab';
import Loader from '../Loader';

function Allproducts() {
    const classes = useStyles()
    const [productData, setProductData] = useState()
    const [categories, setCategories] = useState()
    const [colors, setColors] = useState()
    const [pageValues, setPagesValues] = useState(1)
    const [currentPage,setCurrentPage] = useState()
    const [loading,setLoading] = useState(true)

    const handlePage = (event, value) => {
        axios.get(`${BaseUrl}/api/product?limit=9&page=${value}`)
        .then((res) => {
            setProductData(res.data.data.docs)
        })
        setCurrentPage(value)
    };


    useEffect(() => {
        //All products data fetch
        axios.get(`${BaseUrl}/api/product?limit=9&page=${currentPage}`)
        .then((res) => {
            setProductData(res.data.data.docs)
            setPagesValues(res.data.data.pages)
            setLoading(false)
        })

        //Categories Data fetch
        axios.get(`${BaseUrl}/api/category`)
        .then((res) => {
            // console.log(res.data.data)
            setCategories(res.data.data)
        })

        //Colors Data fetch
        axios.get(`${BaseUrl}/api/color`)
        .then((res) => {
            // console.log(res.data.data)
            setColors(res.data.data)
        })
        

    },[currentPage])

    const sort = (order) => {
        axios.get(`${BaseUrl}/api/product?limit=9&page=${currentPage}&sortby=price&orderby=${order}`)
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
        axios.get(`${BaseUrl}/api/product?limit=100&page=1..10&color=${color_id}`)
        .then((res) => {
            const temp = res.data.data.docs
            setProductData(temp)
        })
    }
    return (
        <>{loading ? <Loader/> :
            <div>
                <hr className={classes.hor_rule}></hr>
                <div className={classes.sort_root}>
                    <Typography>
                        Sort By:
                    </Typography>
                    <Button
                        className={classes.sort_btn_color}
                        onClick={() => {
                            axios.get(`${BaseUrl}/api/product?limit=9&page=${currentPage}&sortby=rating&orderby=desc`)
                                .then((res) => {
                                    const temp = res.data.data.docs
                                    setProductData(temp)
                                })
                        }}
                    >
                        <StarIcon />
                    </Button>
                    <Button
                        className={classes.sort_btn_color}
                        onClick={() => sort("desc")}
                    >
                        ₹<ArrowUpwardIcon />
                    </Button>
                    <Button
                        className={classes.sort_btn_color}
                        onClick={() => sort("asc")}
                    >
                        ₹<ArrowDownwardIcon />
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
                                    <AccordionDetails key={index}>
                                        <Button
                                            onClick={() => getCategories(category.id)}
                                            className={classes.list_button}
                                        >
                                            {category.name}
                                        </Button>
                                    </AccordionDetails>
                                ))
                            }
                        </Accordion>

                            
                        <Accordion className={classes.colors_root}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography className={classes.heading}>Colors</Typography>
                            </AccordionSummary>
                            {
                                colors &&
                                colors.map((color, index) => (
                                    <AccordionDetails key={index}>
                                        <Button
                                            onClick={() => getColors(color.id)}
                                            className={classes.list_button}>
                                            {color.name}
                                        </Button>
                                    </AccordionDetails>
                                )
                                )}
                                
                        </Accordion>
                    </Grid>
                    <Grid item md={10} lg={10}>
                        <ProductsCards products={productData} />
                        <div className={classes.pagination_root}>
                            <Pagination count={pageValues} onChange={handlePage} shape="rounded" />
                        </div>
                    </Grid>
                </Grid>
            </div>
        }
        </>
    )
}

export default Allproducts
