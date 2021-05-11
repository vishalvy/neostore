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
        marginLeft: "35%",
        fontWeight: "bold"
    },
    buy_button_root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    buy_button: {
        margin: "5% 0",
        marginLeft: "30%",
        textTransform: "none"
    },

    '@media (min-width:320px) and (max-width:550px)': { 
        stepper_root: {
            marginTop: "20%"
        },
        order_summary_grid: {
            marginTop: "5%"
        },
        review_heading: {
            fontSize: "4vh"
        }
    },
    '@media (min-width:550px) and (max-width:750px)': { 
        stepper_root: {
            marginTop: "15%"
        },
        order_summary_grid: {
            marginTop: "5%"
        },
        review_heading: {
            fontSize: "5vh"
        }
    },
    '@media (min-width:750px) and (max-width:960px)': { 
        stepper_root: {
            marginTop: "10%"
        },
        order_summary_grid: {
            marginTop: "5%"
        },
        review_heading: {
            fontSize: "5.5vh"
        }
    },
}))
export default useStyles