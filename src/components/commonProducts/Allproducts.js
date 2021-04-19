import { Button, Grid, Paper, Typography } from '@material-ui/core'
import React,{useEffect, useState} from 'react'
// import {Link} from 'react-router-dom'
import useStyles from './styles'
import Categories from './categories'  
import Colors from './colors'
import StarIcon from '@material-ui/icons/Star';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ProductsCards from './ProductsCards'
import Data from './Data'
import axios from 'axios'
import {BaseUrl} from '../constants/baseUrl'

function Commonproducts() {
    const classes = useStyles()
    // const [products,setProducts] = useState(Data)
    const [productData,setProductData] = useState()

    // const sortProducts = (data,parameter) => {
    //     let list = []
    //     if(parameter === "ascending"){
    //         list = data.sort((a,b) => {
    //             return a.price - b.price
    //         })
    //     }
    //     else if(parameter === "descending"){
    //         list = data.sort((a,b) => {
    //             return b.price - a.price
    //         }) 
    //     }
    //     else if(parameter === 'Rating'){
    //         list = data.sort((a,b) => {
    //             return b.avgRating - a.avgRating
    //         })
    //         console.log(list)
    //     }
    //     setProductData([...list])
    // }

    useEffect(() => {
        axios.get(`${BaseUrl}/api/product`)
        .then((res) => {
            setProductData(res.data.data.docs)
        })
    },[])
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
                        axios.get(`${BaseUrl}/api/product?limit=5&page=1&sortby=rating&orderby=desc`)
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
                    onClick={() => {
                        axios.get(`${BaseUrl}/api/product?sortby=price&rating&orderby=desc`)
                        .then((res) => {
                            const temp = res.data.data.docs
                            setProductData(temp)
                        })
                    }}
                >   
                    ₹<ArrowUpwardIcon/>
                </Button>
                <Button 
                    className={classes.sort_btn_color}
                    onClick={() => {
                        axios.get(`${BaseUrl}/api/product?sortby=price&orderby=asc`)
                        .then((res) => {
                            const temp = res.data.data.docs
                            setProductData(temp)
                        })
                    }}
                >
                    ₹<ArrowDownwardIcon/>
                </Button>
            </div>
             
                    
            <Grid container className={classes.allproducts_root}>
                    <Grid item lg={2} className={classes.grid1}>
                        <Paper className={classes.allproducts_paper}>
                            <Button 
                                className={classes.allproducts_link}
                                onClick={() => {
                                    axios.get(`${BaseUrl}/api/product`)
                                    .then((res) => {
                                        const temp = res.data.data.docs
                                        setProductData(temp)
                                    })
                                }}
                            >
                                All Products
                            </Button>
                        </Paper>
                        <Categories/>
                        <Colors/>
                    </Grid>
                <Grid item lg={10}>
                    <ProductsCards products={productData}/>
                </Grid>
            </Grid>
        </>
    )
}

export default Commonproducts
