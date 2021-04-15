import { Paper } from '@material-ui/core'
import useStyles from './carouselstyles'
import {useHistory} from 'react-router-dom'
function Slides(props)
{
    const classes = useStyles();
    const history = useHistory();
    return (
        <Paper variant="outlined" className={classes.carousel} onClick={() => history.push("/allproducts")}>
            <img className={classes.carousel_img} src={props.image.image} width="100%" height="100%"/>
        </Paper>
    )
}
export default Slides