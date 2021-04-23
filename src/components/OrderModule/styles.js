import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "8%"
    },
    hor_rule: {
       opacity: "0.3"
    },
    root_heading: {
        display: "flex"
    },
    profile_img: {
        width: "220px",
        height: "200px",
        borderRadius: "50%"
    },
    order_root: {
        display: "flex",
        justifyContent: "center",

    },
    order_btn: {
        display: "flex",
        justifyContent: "center",
        color: "black"
    },
    transit_text: {
        color: "brown",
        paddingRight: "1%"
    },
    price_text: {
        color: "green",
        paddingLeft: "1%"
    },
    order_paper: {
        textAlign: "left",
        margin: "3%"
    },


    ///addresss styling
    address_root_paper: {
        textAlign:"left"
    },
    address_paper: {
        margin: "3% 0"
    },
    address_heading: {
        fontSize: "5vh",
        padding: "1%"
    },
    cancel_icon: {
        float: "right"
    },
    address_text: {
        padding: "2% 0"
    },
    add_address_btn: {
        margin: "2% 0",
        textTransform: "none"
    },
    error_msg: {
        color: "red"
    }
}))
export default useStyles