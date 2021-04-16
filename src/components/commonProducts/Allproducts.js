import { Button, Grid, Paper, Typography } from '@material-ui/core'
import React,{useState} from 'react'
// import {Link} from 'react-router-dom'
import useStyles from './styles'
import Categories from './categories'  
import Colors from './colors'
import StarIcon from '@material-ui/icons/Star';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ProductsCards from './ProductsCards'
import Data from './Data'

function Commonproducts() {
    const classes = useStyles()
    const [products,setProducts] = useState(Data)

    const sortProducts = (data,parameter) => {
        let list = []
        if(parameter === "ascending"){
            list = data.sort((a,b) => {
                return a.price.replace(/,/g, "") - b.price.replace(/,/g, "")
            })
        }
        else if(parameter === "descending"){
            list = data.sort((a,b) => {
                return b.price.replace(/,/g, "") - a.price.replace(/,/g, "")
            }) 
        }
        else if(parameter === 'Rating'){
            list = data.sort((a,b) => {
                return b.rating - a.rating
            })
            console.log(list)
        }else if(parameter === 'allproducts'){
            list = data.sort((a,b) => {
                return a.id - b.id
            })
        }
        setProducts([...list])
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
                    onClick={() => sortProducts(Data,"Rating")}
                >
                    <StarIcon/>
                </Button>
                <Button 
                    className={classes.sort_btn_color}
                    onClick={() => sortProducts(Data,"descending")}
                >   
                    ₹<ArrowUpwardIcon/>
                </Button>
                <Button 
                    className={classes.sort_btn_color}
                    onClick={() => sortProducts(Data,"ascending")}
                >
                    ₹<ArrowDownwardIcon/>
                </Button>
            </div>
             
                    
            <Grid container className={classes.allproducts_root}>
                    <Grid item lg={2} className={classes.grid1}>
                        <Paper className={classes.allproducts_paper}>
                            <Button 
                                className={classes.allproducts_link}
                                onClick={() => sortProducts(Data,'allproducts')}
                            >
                                All Products
                            </Button>
                        </Paper>
                        <Categories/>
                        <Colors/>
                    </Grid>
                <Grid item lg={10}>
                    <ProductsCards products={products}/>
                </Grid>
            </Grid>
        </>
    )
}

export default Commonproducts
