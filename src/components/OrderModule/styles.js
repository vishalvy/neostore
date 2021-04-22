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
        textAlign: "left"
    },


    ///addresss styling
    address_root_paper: {
        textAlign:"left"
    }
}))
export default useStyles