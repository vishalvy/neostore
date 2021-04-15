import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    stepper_root:{
        marginTop: "8%"
    },
    product_name_root:{
        display: "flex",
    },
    product_name:{
        marginLeft: "12px",
        width: "50%",
    },
    status_color:{
        color: "green"
    },
    quantity_root: {
        marginLeft: "-15%"
    },
    review_heading:{
        margin: "3% 0",
        marginLeft: "35%"
    },
    buy_button: {
        margin: "5% 0",
        marginLeft: "25%",
        width: "90%"
    },
}))
export default useStyles