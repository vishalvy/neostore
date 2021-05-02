import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    nav_logo:{
        // display: "flex",
        // justifyContent: "flex-start",
        // // fontSize: "25px",
        fontWeight: "bold",
        ['@media (min-width:320px) and (max-width:550px)']: { 
            marginLeft: "100px"
        }
    },
    logo_store: {
        color: "red"
    },
    appbar: {
        background: "black",
    },
    nav_items: {
        flexGrow: 1,
    },
    nav_textfield: {
        display: "flex",
        justifyContent: "center",
        background: "white",
        borderRadius: "4px",
        height: "35px",
        width: "40vh"
    },
    nav_cart_btn: {
        background: "white",
        textTransform: "none",
        margin: "2vh",
        height: "35px",
    },
    nav_dropdown_btn: {
        background: "white",
        textTransform: "none",
        height: "35px",
    },
    nav_cart_container: {
        flexGrow: 1
    }
    
}));
export default useStyles