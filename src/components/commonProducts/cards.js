import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import useStyles from '../TopProducts/productstyles'
import {useHistory} from 'react-router-dom'


export default function MediaCard(props) {
    const classes = useStyles();
    const history = useHistory()
    
    const handleCards = (product) => {
        history.push({
            pathname: `/product/${product.id}`,
            product: {product}
        })
    }

    const AddToCart = (product) => {
        history.push({
            pathname: "/getcartdata",
            product: {product}
        })
    }


  return (
    <Card className={classes.root}>
        <CardActionArea onClick={() => handleCards(props.product)}>
            <CardMedia
                onClick={() => handleCards(props.product)}
                className={classes.media}
                image={props.image}
            />
            <CardContent>
                <Typography gutterBottom className={classes.card_title}>
                    {props.title}
                </Typography>
            </CardContent>
        </CardActionArea>
        <div>
            <Typography gutterBottom variant="h6">
                ₹ {props.price}
            </Typography>
            <Button 
                onClick={() => AddToCart(props.product)}
                variant="contained" 
                size="small" 
                color="primary">
                Add to Cart
            </Button>
            <br/><br/>
            <Rating defaultValue={props.rating} precision={0.5} readOnly />
        </div>
    </Card>
  );
}
