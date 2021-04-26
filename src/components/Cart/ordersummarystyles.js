import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root_container: {
        marginTop: "8%"
    },
    hor_rule: {
        opacity: "0.4",
    },
    root_paper: {
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
        width: "80%"
    }
}))
export default useStyles