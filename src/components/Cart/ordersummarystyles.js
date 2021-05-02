import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root_container: {
        marginTop: "8%"
    },
    hor_rule: {
        opacity: "0.4",
    },
    address_text: {
        textAlign: "left",
        display: "flex"
    },
    product_text: {
        display: "flex",
        justifyContent: 'center'
    },
    select_button: {
        textTransform: "none",
        marginBottom: "2%"
    },
    place_order_btn: {
        marginBottom: "4%",
        width: "40%"
    },
    no_ordersummary: {
        margin: "20% 0"
    },
    add_address_btn: {
        display: "flex",
        marginBottom: "2%"
    },
    error_msg: {
        color: "red"
    },


    //Media Query 
    ['@media (min-width:320px) and (max-width:550px)']: { 
        root_container: {
            marginTop: "25%"
        },
    },
    ['@media (min-width:550px) and (max-width:750px)']: { 
        root_container: {
            marginTop: "20%"
        },
    },
    ['@media (min-width:750px) and (max-width:950px)']: { 
        root_container: {
            marginTop: "13%"
        },
    },
}))
export default useStyles